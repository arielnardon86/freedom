import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { galleries } from "@/lib/content";

export function Galleries() {
  return (
    <section id="galerias" className="bg-background-soft px-6 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <Reveal>
          <SectionHeading
            eyebrow="Trabajos recientes"
            title="Galerías destacadas"
            description="Un vistazo a algunos de los eventos que tuvimos el gusto de cubrir."
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {galleries.map((gallery, index) => (
            <Reveal key={gallery.slug} delay={index * 80} className="flex flex-col gap-3">
              <div className="group flex flex-col gap-3">
                <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border">
                  {gallery.image ? (
                    <Image
                      src={gallery.image}
                      alt={gallery.title}
                      fill
                      sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-background-elevated via-background-soft to-background" />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>
                <div>
                  <h3 className="font-display text-base font-semibold text-foreground">
                    {gallery.title}
                  </h3>
                  <p className="text-xs uppercase tracking-[0.1em] text-muted">{gallery.date}</p>
                </div>
              </div>
            </Reveal>
          ))}

          <Reveal delay={galleries.length * 80} className="flex flex-col gap-3">
            <div className="flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-xl border border-dashed border-border-strong px-6 text-center">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/25 text-gold/70">
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" aria-hidden="true">
                  <path
                    d="M12 5v14M5 12h14"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
              <p className="text-sm font-medium text-foreground">Sumando más categorías</p>
              <p className="text-xs leading-relaxed text-muted">
                Bodas, egresos y eventos corporativos, muy pronto acá.
              </p>
            </div>
          </Reveal>
        </div>

        <Button href="#contacto" variant="outline" className="mx-auto">
          Ver más galerías
        </Button>
      </div>
    </section>
  );
}
