import Image from "next/image";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { services } from "@/lib/content";

type IconProps = { className?: string };

function RingsIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <circle cx="9" cy="14" r="5.5" stroke="currentColor" strokeWidth="1.4" />
      <circle cx="15" cy="14" r="5.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function CapIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="M12 4 2 9l10 5 10-5-10-5Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M6 11.5V16c0 1.4 2.7 3 6 3s6-1.6 6-3v-4.5" stroke="currentColor" strokeWidth="1.4" />
      <path d="M21 9v6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    </svg>
  );
}

function PartyIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <path
        d="m4 20 3.5-9.5c3 .5 6 3.5 6.5 6.5L4 20Z"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
      />
      <path d="M12 4v2M17 5.5l-1.2 1.6M20.5 9l-1.9.9" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      <circle cx="9" cy="15" r="0.9" fill="currentColor" />
    </svg>
  );
}

function BriefcaseIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="8" width="18" height="11" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 8V6a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M3 13h18" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function CameraIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="7" width="18" height="13" rx="2" stroke="currentColor" strokeWidth="1.4" />
      <path d="M8 7l1.5-2.5h5L16 7" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <circle cx="12" cy="13.5" r="3.5" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}

function QRIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden="true">
      <rect x="3" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="14" y="3" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="3" y="14" width="7" height="7" rx="1" stroke="currentColor" strokeWidth="1.4" />
      <rect x="14.5" y="14.5" width="2.5" height="2.5" fill="currentColor" />
      <rect x="18.5" y="14.5" width="2.5" height="2.5" fill="currentColor" />
      <rect x="14.5" y="18.5" width="2.5" height="2.5" fill="currentColor" />
      <rect x="18.5" y="18.5" width="2.5" height="2.5" fill="currentColor" />
    </svg>
  );
}

const serviceIcons: Record<string, (props: IconProps) => React.ReactElement> = {
  bodas: RingsIcon,
  egresados: CapIcon,
  eventos: PartyIcon,
  empresas: BriefcaseIcon,
  "fotografia-video": CameraIcon,
  "total-pics": QRIcon,
};

export function Services() {
  return (
    <section id="servicios" className="px-6 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <Reveal>
          <SectionHeading
            eyebrow="Lo que hacemos"
            title="Nuestros servicios"
            description="Cobertura fotográfica y audiovisual para cada tipo de celebración, con un estilo que combina lo espontáneo y lo cuidado."
          />
        </Reveal>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-7">
          {services.map((service, index) => {
            const Icon = serviceIcons[service.slug];
            return (
              <Reveal key={service.slug} delay={index * 80}>
                <div className="group relative flex aspect-[3/4] flex-col justify-end overflow-hidden rounded-xl border border-border">
                  {service.image ? (
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      sizes="(min-width: 1024px) 16vw, (min-width: 640px) 30vw, 45vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <>
                      <div className="absolute inset-0 bg-gradient-to-br from-background-elevated via-background-soft to-background" />
                      {Icon ? (
                        <div className="absolute inset-0 flex items-center justify-center pb-8">
                          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-gold/25 text-gold/70 transition-colors duration-300 group-hover:border-gold/60 group-hover:text-gold">
                            <Icon className="h-5 w-5" />
                          </span>
                        </div>
                      ) : null}
                    </>
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent transition-colors group-hover:from-black/90" />
                  <span className="pointer-events-none absolute inset-0 border border-transparent transition-colors duration-300 group-hover:border-gold/40" />
                  <span className="relative flex flex-col px-3 pb-4 text-center">
                    <span className="text-xs font-semibold uppercase tracking-[0.1em] text-foreground sm:text-sm">
                      {service.title}
                    </span>
                    {service.subtitle ? (
                      <span className="mt-0.5 text-[0.6rem] uppercase tracking-[0.1em] text-gold/80">
                        {service.subtitle}
                      </span>
                    ) : null}
                  </span>
                </div>
              </Reveal>
            );
          })}
        </div>

        <Button href="#contacto" variant="outline" className="mx-auto">
          Ver todos los servicios
        </Button>
      </div>
    </section>
  );
}
