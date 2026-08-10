import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { services } from "@/lib/content";

export function Services() {
  return (
    <section id="servicios" className="px-6 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <SectionHeading
          eyebrow="Lo que hacemos"
          title="Nuestros servicios"
          description="Cobertura fotográfica y audiovisual para cada tipo de celebración, con un estilo que combina lo espontáneo y lo cuidado."
        />

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {services.map((service) => (
            <div
              key={service.slug}
              className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-xl border border-border"
            >
              {service.image ? (
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 45vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              ) : (
                <div className="absolute inset-0 bg-gradient-to-br from-background-elevated via-background-soft to-background" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-colors group-hover:from-black/90" />
              <span className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-300 group-hover:border-gold/40" />
              <span className="relative px-3 pb-4 text-center text-xs font-semibold uppercase tracking-[0.1em] text-foreground sm:text-sm">
                {service.title}
              </span>
            </div>
          ))}
        </div>

        <Button href="#contacto" variant="outline" className="mx-auto">
          Ver todos los servicios
        </Button>
      </div>
    </section>
  );
}
