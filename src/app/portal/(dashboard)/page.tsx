import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { isDatabaseConfigured } from "@/lib/db";
import { getSession } from "@/lib/auth/session";
import { listEventsForClient } from "@/lib/queries";
import { eventTypeLabels } from "@/lib/types";

export default async function PortalHomePage() {
  let events: Awaited<ReturnType<typeof listEventsForClient>> = [];

  if (isDatabaseConfigured()) {
    const session = await getSession();
    if (session) {
      events = await listEventsForClient(session.sub);
    }
  }

  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">
          Mis eventos
        </h1>
        <p className="mt-1 text-sm text-muted">
          Estos son los eventos que el estudio cargó a tu nombre.
        </p>
      </div>

      {events.length === 0 ? (
        <ComingSoon
          title="Todavía no tenés eventos"
          description="Cuando el estudio cargue un evento a tu nombre, va a aparecer acá."
        />
      ) : (
        <div className="grid gap-5 sm:grid-cols-2">
          {events.map((event) => (
            <Link
              key={event.id}
              href={`/portal/evento/${event.id}`}
              className="group flex flex-col gap-3 rounded-2xl border border-border bg-background-elevated p-4 transition-colors hover:border-gold/40"
            >
              <div className="relative flex aspect-[16/10] items-center justify-center overflow-hidden rounded-xl bg-gradient-to-br from-background-elevated via-background-soft to-background">
                <span className="font-display text-sm text-muted-soft">
                  {eventTypeLabels[event.tipo_evento]}
                </span>
              </div>
              <div className="flex items-start justify-between gap-3 px-1">
                <div>
                  <h2 className="font-display text-base font-semibold text-foreground">
                    {event.nombre}
                  </h2>
                  <p className="text-xs text-muted">
                    {new Date(`${event.fecha_evento}T00:00:00`).toLocaleDateString("es-AR", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                </div>
                <Badge tone={event.entregado ? "green" : "gold"}>
                  {event.entregado ? "Fotos disponibles" : "En preparación"}
                </Badge>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
