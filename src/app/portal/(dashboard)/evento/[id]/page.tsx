import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { InvitationShare } from "@/components/invitacion/InvitationShare";
import { isDatabaseConfigured } from "@/lib/db";
import { getSession } from "@/lib/auth/session";
import { getEventForClient } from "@/lib/queries";
import { generateQrDataUrl } from "@/lib/qrcode";
import { getBaseUrl } from "@/lib/url";
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

  const baseUrl = await getBaseUrl();
  const inviteUrl = event.invite_slug ? `${baseUrl}/invitacion/${event.invite_slug}` : null;
  const qrDataUrl = inviteUrl ? await generateQrDataUrl(inviteUrl) : null;

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

      {event.invite_slug && inviteUrl && qrDataUrl ? (
        <div className="rounded-2xl border border-border bg-background-elevated p-6">
          <h2 className="font-display text-base font-semibold text-foreground">Invitación</h2>
          <p className="mt-1 text-sm text-muted">
            Compartí este link o QR con tus invitados para que vean y likeen las fotos
            del evento.
          </p>
          <div className="mt-4 flex flex-col gap-4">
            <InvitationShare url={inviteUrl} slug={event.invite_slug} qrDataUrl={qrDataUrl} />
            <Button
              href={`/invitacion/${event.invite_slug}`}
              variant="outline"
              className="w-fit"
              target="_blank"
              rel="noreferrer"
            >
              Ver invitación
            </Button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
