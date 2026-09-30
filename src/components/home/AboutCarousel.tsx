"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const INTERVAL_MS = 3000;

export function AboutCarousel({ images }: { images: string[] }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (images.length <= 1) return;
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % images.length);
    }, INTERVAL_MS);
    return () => clearInterval(id);
  }, [images.length]);

  return (
    <>
      {images.map((src, i) => (
        <Image
          key={src}
          src={src}
          alt="Detrás de escena de Freedom Fotografía"
          fill
          priority={i === 0}
          sizes="(min-width: 1024px) 46vw, 90vw"
          className={`object-cover transition-opacity duration-1000 ${
            i === index ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      <div className="absolute inset-0 bg-black/35" />
    </>
  );
}
