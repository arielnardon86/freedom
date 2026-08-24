import { Topbar } from "@/components/admin/Topbar";
import { InvitationShare } from "@/components/admin/InvitationShare";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { isDatabaseConfigured } from "@/lib/db";
import { listEventsWithInvite } from "@/lib/queries";
import { generateQrDataUrl } from "@/lib/qrcode";
import { getBaseUrl } from "@/lib/url";

export default async function AdminInvitacionesPage() {
  const configured = isDatabaseConfigured();
  const events = configured ? await listEventsWithInvite() : [];
  const baseUrl = configured ? await getBaseUrl() : "";

  const qrDataUrls = await Promise.all(
    events.map((event) => generateQrDataUrl(`${baseUrl}/invitacion/${event.invite_slug}`)),
  );

  return (
    <>
      <Topbar
        title="Invitaciones"
        description="Links generados para que los invitados vean las fotos de cada evento."
      />
      <div className="flex flex-1 flex-col gap-6 p-6 sm:p-10">
        {!configured ? (
          <ComingSoon
            title="Conectá la base de datos"
            description="Para generar y ver invitaciones necesitás conectar la base. Mirá .env.local.example."
          />
        ) : events.length === 0 ? (
          <ComingSoon
            title="Todavía no generaste ninguna invitación"
            description="Entrá a un evento desde la sección Eventos y generá su link de invitación desde ahí."
          />
        ) : (
          <div className="flex flex-col gap-4">
            {events.map((event, i) => (
              <div
                key={event.id}
                className="rounded-2xl border border-border bg-background-elevated p-5"
              >
                <a
                  href={`/admin/eventos/${event.id}`}
                  className="font-display text-base font-semibold text-foreground hover:text-gold"
                >
                  {event.nombre}
                </a>
                <p className="mt-0.5 text-xs text-muted">
                  {new Date(`${event.fecha_evento}T00:00:00`).toLocaleDateString("es-AR")}
                </p>
                <div className="mt-3">
                  <InvitationShare
                    url={`${baseUrl}/invitacion/${event.invite_slug}`}
                    slug={event.invite_slug!}
                    qrDataUrl={qrDataUrls[i]}
                  />
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
