"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { setLike } from "@/app/invitacion/[slug]/actions";
import { getLikedPhotoIds, getVisitorId, saveLikedPhotoIds } from "@/lib/visitor";
import type { DriveImage } from "@/lib/drive";

type LikeState = Record<string, { count: number; liked: boolean }>;

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 20.5s-7.5-4.6-10-9.2C.5 8 2 4.5 5.5 4c2-.3 3.8.7 4.9 2.3.4.6.6.9.6.9s.2-.3.6-.9C12.7 4.7 14.5 3.7 16.5 4 20 4.5 21.5 8 20 11.3c-2.5 4.6-10 9.2-10 9.2Z" strokeLinejoin="round" />
    </svg>
  );
}

function DownloadIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 4v11m0 0-4-4m4 4 4-4M5 20h14" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PhotoGrid({
  eventId,
  photos,
  initialLikes,
}: {
  eventId: string;
  photos: DriveImage[];
  initialLikes: Record<string, number>;
}) {
  const [visitorId, setVisitorId] = useState("");
  const [likes, setLikes] = useState<LikeState>({});

  useEffect(() => {
    setVisitorId(getVisitorId());
    const likedIds = getLikedPhotoIds();

    const initial: LikeState = {};
    for (const photo of photos) {
      initial[photo.id] = {
        count: initialLikes[photo.id] ?? 0,
        liked: likedIds.has(photo.id),
      };
    }
    setLikes(initial);
    // Se arma una sola vez con los datos iniciales del servidor.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function toggleLike(photoId: string) {
    if (!visitorId) return;

    const current = likes[photoId] ?? { count: initialLikes[photoId] ?? 0, liked: false };
    const nextLiked = !current.liked;
    const next = { ...likes, [photoId]: { count: current.count + (nextLiked ? 1 : -1), liked: nextLiked } };
    setLikes(next);

    const likedIds = new Set(Object.entries(next).filter(([, v]) => v.liked).map(([id]) => id));
    saveLikedPhotoIds(likedIds);

    setLike(eventId, photoId, visitorId, nextLiked).catch(() => {
      setLikes((prev) => ({ ...prev, [photoId]: current }));
    });
  }

  if (photos.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-muted">
        Todavía no hay fotos cargadas para este evento.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
      {photos.map((photo) => {
        const state = likes[photo.id] ?? { count: initialLikes[photo.id] ?? 0, liked: false };
        return (
          <div
            key={photo.id}
            className="group relative aspect-square overflow-hidden rounded-xl border border-border"
          >
            {photo.thumbnailLink ? (
              <Image
                src={photo.thumbnailLink}
                alt={photo.name}
                fill
                unoptimized
                sizes="(min-width: 1024px) 24vw, (min-width: 640px) 32vw, 48vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            ) : (
              <div className="absolute inset-0 bg-background-elevated" />
            )}
            <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-black/75 to-transparent" />

            <div className="absolute inset-x-2 bottom-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => toggleLike(photo.id)}
                aria-pressed={state.liked}
                className={`flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold backdrop-blur-sm transition-colors ${
                  state.liked
                    ? "bg-gold text-[#171207]"
                    : "bg-black/50 text-white hover:bg-black/70"
                }`}
              >
                <HeartIcon filled={state.liked} />
                {state.count}
              </button>

              <a
                href={`/api/drive/${photo.id}/download?name=${encodeURIComponent(photo.name)}`}
                className="rounded-full bg-black/50 p-1.5 text-white backdrop-blur-sm transition-colors hover:bg-black/70"
                aria-label={`Descargar ${photo.name}`}
              >
                <DownloadIcon />
              </a>
            </div>
          </div>
        );
      })}
    </div>
  );
}
