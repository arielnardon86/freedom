import Image from "next/image";
import { instagramHandle, instagramImages, instagramUrl } from "@/lib/content";

export function InstagramFeed() {
  return (
    <section className="px-6 py-24 sm:px-10 lg:py-28">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          Seguinos en Instagram
        </span>
        <a
          href={instagramUrl}
          target="_blank"
          rel="noreferrer"
          className="font-display text-2xl font-semibold text-foreground transition-colors hover:text-gold"
        >
          {instagramHandle}
        </a>

        <div className="grid w-full grid-cols-3 gap-2 sm:grid-cols-6">
          {instagramImages.map((src, i) => (
            <a
              key={`${src}-${i}`}
              href={instagramUrl}
              target="_blank"
              rel="noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg border border-border"
            >
              <Image
                src={src}
                alt="Publicación de Instagram de Freedom Fotografía"
                fill
                sizes="(min-width: 640px) 16vw, 32vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 transition-colors group-hover:bg-black/20" />
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
