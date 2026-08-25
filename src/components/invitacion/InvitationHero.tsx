import Image from "next/image";
import Link from "next/link";
import { eventTypeLabels } from "@/lib/types";
import type { Event } from "@/lib/types";

export function InvitationHero({ event }: { event: Event }) {
  return (
    <header className="flex flex-col items-center gap-5 border-b border-border px-6 py-16 text-center sm:px-10">
      <Link href="/">
        <Image
          src="/images/logo-freedom-wordmark.png"
          alt="Freedom Fotografía"
          width={181}
          height={56}
          className="h-10 w-auto"
        />
      </Link>

      <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold">
        {eventTypeLabels[event.tipo_evento]}
      </span>

      <h1 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
        {event.nombre}
      </h1>

      <p className="text-sm text-muted">
        {new Date(`${event.fecha_evento}T00:00:00`).toLocaleDateString("es-AR", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
        {event.lugar ? ` · ${event.lugar}` : ""}
      </p>

      <p className="max-w-md text-sm leading-relaxed text-muted">
        Estas son las fotos de tu evento. Mirá, likeá tus favoritas y descargalas.
      </p>
    </header>
  );
}
