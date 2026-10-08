"use client";

import Image from "next/image";
import { useState } from "react";
import { PhotoLightbox } from "@/components/invitacion/PhotoLightbox";
import type { DriveImage } from "@/lib/drive";

export function MostLiked({
  photos,
  likeCounts,
}: {
  photos: DriveImage[];
  likeCounts: Record<string, number>;
}) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  if (photos.length === 0) return null;

  const activePhoto = activeIndex !== null ? photos[activeIndex] : null;

  return (
    <section className="border-t border-border px-6 py-16 sm:px-10">
      <div className="mx-auto flex max-w-5xl flex-col gap-8">
        <div className="flex flex-col items-center gap-2 text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Las favoritas
          </span>
          <h2 className="font-display text-2xl font-semibold text-foreground">
            Fotos con más likes
          </h2>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          {photos.map((photo, index) => (
            <div
              key={photo.id}
              role="button"
              tabIndex={0}
              onClick={() => setActiveIndex(index)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setActiveIndex(index);
                }
              }}
              className="relative aspect-square cursor-pointer overflow-hidden rounded-xl border border-border"
            >
              {photo.thumbnailLink ? (
                <Image
                  src={photo.thumbnailLink}
                  alt={photo.name}
                  fill
                  unoptimized
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 45vw"
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 bg-background-elevated" />
              )}
              <span className="absolute bottom-2 right-2 rounded-full bg-black/60 px-2 py-0.5 text-[0.65rem] font-semibold text-gold backdrop-blur-sm">
                ♥ {likeCounts[photo.id] ?? 0}
              </span>
            </div>
          ))}
        </div>
      </div>

      {activePhoto ? (
        <PhotoLightbox
          photo={activePhoto}
          onClose={() => setActiveIndex(null)}
          onPrev={() => setActiveIndex((i) => (i !== null ? i - 1 : i))}
          onNext={() => setActiveIndex((i) => (i !== null ? i + 1 : i))}
          hasPrev={activeIndex !== null && activeIndex > 0}
          hasNext={activeIndex !== null && activeIndex < photos.length - 1}
        />
      ) : null}
    </section>
  );
}
