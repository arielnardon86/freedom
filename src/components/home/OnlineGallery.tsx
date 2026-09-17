import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { galeriaOnlineFeatures } from "@/lib/content";

function CheckIcon() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 flex-none fill-gold" aria-hidden="true">
      <path d="M8.2 13.6 4.6 10l-1.4 1.4 5 5 9-9-1.4-1.4z" />
    </svg>
  );
}

export function OnlineGallery() {
  return (
    <section className="px-6 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal delay={150} className="relative aspect-video overflow-hidden rounded-2xl border border-border lg:order-2">
          <Image
            src="/images/galeria-ambar.jpg"
            alt="Ejemplo de galería online de Freedom Fotografía"
            fill
            sizes="(min-width: 1024px) 46vw, 90vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
        </Reveal>

        <Reveal className="flex flex-col gap-6 lg:order-1">
          <SectionHeading
            align="left"
            eyebrow="Después del evento"
            title="Todos tus recuerdos, en un solo lugar."
            description="Las fotografías quedan disponibles en una galería online personalizada, con acceso desde cualquier dispositivo mediante un link."
          />

          <ul className="flex flex-col gap-3">
            {galeriaOnlineFeatures.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-sm text-foreground/85">
                <CheckIcon />
                {feature}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
