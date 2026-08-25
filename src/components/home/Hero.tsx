import Image from "next/image";
import { Button } from "@/components/ui/Button";

export function Hero() {
  return (
    <section id="inicio" className="relative flex min-h-[100svh] items-center overflow-hidden">
      <Image
        src="/images/hero-15-anos.jpg"
        alt="Sesión de fotos de Freedom Fotografía"
        fill
        priority
        className="object-cover object-[50%_15%]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/30" />
      <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/20 to-transparent" />

      <div className="relative mx-auto flex w-full max-w-7xl flex-col gap-7 px-6 pt-24 pb-20 sm:px-10 lg:pt-32">
        <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.35em] text-gold">
          <span className="h-px w-10 bg-gold-dark" />
          Fotografía &amp; video de eventos
        </span>

        <h1 className="max-w-2xl font-display text-5xl leading-[1.05] font-semibold text-foreground sm:text-6xl md:text-7xl">
          Cada foto
          <br />
          cuenta{" "}
          <span className="font-script text-gold text-6xl font-normal sm:text-7xl md:text-8xl">
            una historia
          </span>
        </h1>

        <p className="max-w-md text-base leading-relaxed text-muted sm:text-lg">
          Capturamos momentos únicos para que los recuerdes toda la vida.
        </p>

        <div className="mt-3 flex flex-wrap items-center gap-4">
          <Button href="#contacto" variant="primary">
            Reservar Fecha
          </Button>
          <Button href="#nosotros" variant="outline">
            Ver Video
          </Button>
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-8 hidden flex-col items-center gap-2 text-[0.65rem] uppercase tracking-[0.3em] text-muted sm:flex">
        <span>Scroll para ver más</span>
        <span className="h-9 w-px animate-pulse bg-gold-dark" />
      </div>
    </section>
  );
}
