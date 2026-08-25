import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";

export function AboutStory() {
  return (
    <section id="nosotros" className="px-6 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="flex flex-col gap-6">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Somos Fotos Freedom
          </span>
          <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Contamos historias que se sienten.
          </h2>
          <p className="text-[0.95rem] leading-relaxed text-muted">
            Más que fotógrafos, somos parte del recuerdo. Nos apasiona capturar
            emociones auténticas en cada instante de tu evento, para que cada foto te
            devuelva justo a como se sintió vivirlo. Recorré el sitio y conocé nuestro
            trabajo.
          </p>
          <Button href="#contacto" variant="primary" className="w-fit">
            Conocer más sobre nosotros
          </Button>
        </Reveal>

        <Reveal delay={150} className="relative aspect-video overflow-hidden rounded-2xl border border-border">
          <Image
            src="/images/sobre-nosotros.jpg"
            alt="Detrás de escena de Freedom Fotografía"
            fill
            sizes="(min-width: 1024px) 46vw, 90vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/35" />
          <button
            type="button"
            aria-label="Ver video de presentación"
            className="absolute inset-0 flex items-center justify-center"
          >
            <span className="flex h-16 w-16 items-center justify-center rounded-full border border-gold-light/60 bg-background/60 backdrop-blur-sm transition-transform hover:scale-105 sm:h-20 sm:w-20">
              <svg
                viewBox="0 0 24 24"
                className="ml-1 h-6 w-6 fill-gold sm:h-7 sm:w-7"
                aria-hidden="true"
              >
                <path d="M8 5v14l11-7z" />
              </svg>
            </span>
          </button>
        </Reveal>
      </div>
    </section>
  );
}
