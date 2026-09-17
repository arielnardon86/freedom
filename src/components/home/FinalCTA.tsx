import Image from "next/image";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { contact } from "@/lib/content";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden px-6 py-24 sm:px-10 lg:py-32">
      <Image
        src="/images/hero-15-anos.jpg"
        alt=""
        fill
        aria-hidden="true"
        sizes="100vw"
        className="object-cover object-[50%_20%]"
      />
      <div className="absolute inset-0 bg-background/90" />

      <Reveal className="relative mx-auto flex max-w-2xl flex-col items-center gap-6 text-center">
        <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
          ¿Tenés una historia para contar?
        </h2>
        <p className="text-[0.95rem] leading-relaxed text-muted">
          Estamos listos para escuchar tu idea, conocer tu evento y crear juntos
          una experiencia que merezca ser recordada. Vos viví el momento, nosotros
          nos encargamos de hacerlo durar.
        </p>
        <Button href={contact.whatsapp} target="_blank" rel="noreferrer" variant="primary">
          Hablar con Freedom
        </Button>
      </Reveal>
    </section>
  );
}
