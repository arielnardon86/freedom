import Image from "next/image";
import Link from "next/link";
import { clientEvents } from "@/lib/content";

export default function PortalHomePage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Mis eventos
        </h1>
        <p className="mt-1 text-sm text-muted">
          Estos son ejemplos de cómo se van a ver tus eventos. La conexión con tus
          datos reales se habilita en la próxima etapa.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        {clientEvents.map((event) => (
          <Link
            key={event.id}
            href={`/portal/evento/${event.id}`}
            className="group flex flex-col gap-3 rounded-2xl border border-border bg-background-elevated p-4 transition-colors hover:border-gold/40"
          >
            <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
              <Image
                src={event.image}
                alt={event.title}
                fill
                sizes="(min-width: 640px) 40vw, 90vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            <div className="flex items-start justify-between gap-3 px-1">
              <div>
                <h2 className="font-display text-base font-semibold text-foreground">
                  {event.title}
                </h2>
                <p className="text-xs text-muted">{event.date}</p>
              </div>
              <span className="whitespace-nowrap rounded-full bg-gold/10 px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.08em] text-gold">
                {event.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
