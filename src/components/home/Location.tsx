import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { contact, whatsappLink } from "@/lib/content";

export function Location() {
  return (
    <section className="bg-background-soft px-6 py-16 sm:px-10">
      <Reveal className="mx-auto flex max-w-6xl flex-col items-start gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
            Trabajamos donde esté tu historia
          </span>
          <h3 className="font-display text-xl font-semibold text-foreground sm:text-2xl">
            Desde {contact.location.split(",")[0]} hacia donde nos lleve tu historia.
          </h3>
          <p className="max-w-xl text-sm leading-relaxed text-muted">
            Estamos ubicados en {contact.location}, pero nuestro trabajo no tiene
            fronteras: realizamos producciones y coberturas en diferentes
            localidades, ciudades y destinos. Si tu evento está fuera de nuestra
            zona habitual, consultanos.
          </p>
        </div>
        <Button
          href={whatsappLink("Hola! Quiero consultar disponibilidad para un evento.")}
          target="_blank"
          rel="noreferrer"
          variant="outline"
          className="w-fit flex-none"
        >
          Consultar Disponibilidad
        </Button>
      </Reveal>
    </section>
  );
}
