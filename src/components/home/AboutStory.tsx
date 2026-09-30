import { Reveal } from "@/components/ui/Reveal";
import { AboutCarousel } from "@/components/home/AboutCarousel";
import { sobreNosotrosImages } from "@/lib/content";

export function AboutStory() {
  return (
    <section id="nosotros" className="px-6 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <Reveal className="flex flex-col gap-6">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            ¿Quiénes somos?
          </span>
          <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
            Contamos historias que se sienten.
          </h2>
          <p className="text-[0.95rem] leading-relaxed text-muted">
            Somos Freedom, una productora de fotografía y video con más de 10 años
            de trayectoria. Nacimos de una pasión por la imagen y fuimos creciendo
            junto a cada persona, familia, empresa y evento que confió en nosotros.
          </p>
          <p className="text-[0.95rem] leading-relaxed text-muted">
            Hoy somos mucho más que fotografía: combinamos experiencia, creatividad,
            tecnología y una mirada propia para crear contenido y capturar momentos
            de una manera diferente. No solamente registramos lo que sucede: lo
            vivimos, lo producimos y lo contamos.
          </p>
        </Reveal>

        <Reveal delay={150} className="relative aspect-video overflow-hidden rounded-2xl border border-border">
          <AboutCarousel images={sobreNosotrosImages} />
        </Reveal>
      </div>
    </section>
  );
}
