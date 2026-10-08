"use client";

import Image from "next/image";
import { useEffect } from "react";
import { driveThumbnailUrl } from "@/lib/drive";
import type { DriveImage } from "@/lib/drive";

function CloseIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="m6 6 12 12M18 6 6 18" strokeLinecap="round" />
    </svg>
  );
}

function ChevronIcon({ direction }: { direction: "left" | "right" }) {
  return (
    <svg viewBox="0 0 24 24" className="h-6 w-6" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path
        d={direction === "left" ? "M15 5l-7 7 7 7" : "M9 5l7 7-7 7"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function HeartIcon({ filled }: { filled: boolean }) {
  return (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M12 20.5s-7.5-4.6-10-9.2C.5 8 2 4.5 5.5 4c2-.3 3.8.7 4.9 2.3.4.6.6.9.6.9s.2-.3.6-.9C12.7 4.7 14.5 3.7 16.5 4 20 4.5 21.5 8 20 11.3c-2.5 4.6-10 9.2-10 9.2Z" strokeLinejoin="round" />
    </svg>
  );
}

export function PhotoLightbox({
  photo,
  onClose,
  onPrev,
  onNext,
  hasPrev,
  hasNext,
  like,
  onToggleLike,
}: {
  photo: DriveImage;
  onClose: () => void;
  onPrev?: () => void;
  onNext?: () => void;
  hasPrev?: boolean;
  hasNext?: boolean;
  like?: { count: number; liked: boolean };
  onToggleLike?: () => void;
}) {
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && hasPrev && onPrev) onPrev();
      if (e.key === "ArrowRight" && hasNext && onNext) onNext();
    }
    document.addEventListener("keydown", onKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
    };
  }, [onClose, onPrev, onNext, hasPrev, hasNext]);

  const bigSrc = driveThumbnailUrl(photo.thumbnailLink, 1600);

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col bg-black/95 backdrop-blur-sm"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div className="flex items-center justify-end px-4 py-3 sm:px-6">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onClose();
          }}
          aria-label="Cerrar"
          className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20"
        >
          <CloseIcon />
        </button>
      </div>

      <div className="relative flex flex-1 items-center justify-center px-4 pb-6 sm:px-16">
        {hasPrev ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onPrev?.();
            }}
            aria-label="Foto anterior"
            className="absolute left-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:left-4"
          >
            <ChevronIcon direction="left" />
          </button>
        ) : null}

        <div
          className="relative flex h-full max-h-[80vh] w-full max-w-4xl items-center justify-center"
          onClick={(e) => e.stopPropagation()}
        >
          {bigSrc ? (
            <Image
              src={bigSrc}
              alt={photo.name}
              fill
              unoptimized
              sizes="90vw"
              className="object-contain"
            />
          ) : null}
        </div>

        {hasNext ? (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onNext?.();
            }}
            aria-label="Foto siguiente"
            className="absolute right-2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white/20 sm:right-4"
          >
            <ChevronIcon direction="right" />
          </button>
        ) : null}
      </div>

      {onToggleLike ? (
        <div className="flex justify-center pb-6">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onToggleLike();
            }}
            aria-pressed={like?.liked}
            className={`flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition-colors ${
              like?.liked ? "bg-gold text-[#171207]" : "bg-white/10 text-white hover:bg-white/20"
            }`}
          >
            <HeartIcon filled={Boolean(like?.liked)} />
            {like?.count ?? 0}
          </button>
        </div>
      ) : null}
    </div>
  );
}
