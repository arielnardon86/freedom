import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { isDatabaseConfigured } from "@/lib/db";
import { getSession } from "@/lib/auth/session";
import { getEventForClient } from "@/lib/queries";
import { eventTypeLabels } from "@/lib/types";

export default async function PortalEventoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!isDatabaseConfigured()) {
    notFound();
  }

  const session = await getSession();
  if (!session) {
    redirect("/ingresar");
  }

  const event = await getEventForClient(id, session.sub);

  if (!event) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <Link
          href="/portal"
          className="text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-gold"
        >
          ← Mis eventos
        </Link>
        <h1 className="mt-3 font-display text-2xl font-semibold text-foreground">
          {event.nombre}
        </h1>
        <p className="mt-1 flex flex-wrap items-center gap-2 text-sm text-muted">
          {new Date(`${event.fecha_evento}T00:00:00`).toLocaleDateString("es-AR", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
          {" · "}
          {eventTypeLabels[event.tipo_evento]}
          {event.lugar ? ` · ${event.lugar}` : ""}
          <Badge tone={event.entregado ? "green" : "gold"}>
            {event.entregado ? "Fotos disponibles" : "En preparación"}
          </Badge>
        </p>
      </div>

      {event.drive_links.length > 0 ? (
        <div className="rounded-2xl border border-border bg-background-elevated p-6">
          <h2 className="font-display text-base font-semibold text-foreground">
            Fotos del evento
          </h2>
          <p className="mt-1 text-sm text-muted">
            Por ahora las fotos se ven en Google Drive. Más adelante vas a poder verlas,
            descargarlas y dejar tus favoritas directo acá.
          </p>
          <div className="mt-4 flex flex-wrap gap-3">
            {event.drive_links.map((link, index) => (
              <Button
                key={link}
                href={link}
                variant="primary"
                className="w-fit"
                target="_blank"
                rel="noreferrer"
              >
                {event.drive_links.length > 1
                  ? `Ver fotos en Google Drive (${index + 1})`
                  : "Ver fotos en Google Drive"}
              </Button>
            ))}
          </div>
        </div>
      ) : (
        <ComingSoon
          title="Fotos del evento"
          description="El estudio todavía no cargó el link de tus fotos. Te vamos a avisar apenas estén listas."
        />
      )}
    </div>
  );
}
