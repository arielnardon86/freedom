import { Reveal } from "@/components/ui/Reveal";
import { marcaPalabras } from "@/lib/content";

export function Manifesto() {
  return (
    <section className="bg-background-elevated px-6 py-24 sm:px-10 lg:py-32">
      <Reveal className="mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          {marcaPalabras.join(" • ")}
        </span>

        <p className="font-display text-2xl leading-snug text-foreground sm:text-3xl">
          No hacemos solamente fotos. Hay momentos que pasan una sola vez: una
          mirada, una sonrisa, un abrazo, un baile, una canción, una persona que
          amamos. Nuestro trabajo es hacer que ese momento pueda volver a
          sentirse.
        </p>

        <p className="text-lg text-muted sm:text-xl">
          El tiempo pasa.{" "}
          <span className="font-script text-3xl text-gold sm:text-4xl">
            Los recuerdos quedan.
          </span>
        </p>
      </Reveal>
    </section>
  );
}
