import { notFound } from "next/navigation";
import { Topbar } from "@/components/admin/Topbar";
import { EventForm } from "@/components/admin/EventForm";
import { InvitationShare } from "@/components/invitacion/InvitationShare";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { ConfirmSubmitButton } from "@/components/ui/ConfirmSubmitButton";
import { sql, isDatabaseConfigured } from "@/lib/db";
import { listClients, listReviewsForEvent } from "@/lib/queries";
import { generateQrDataUrl } from "@/lib/qrcode";
import { getBaseUrl } from "@/lib/url";
import type { Event } from "@/lib/types";
import {
  deleteEvent,
  generateInviteSlug,
  approveReview,
  deleteReview,
} from "../actions";

export default async function EditarEventoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!isDatabaseConfigured()) {
    return (
      <>
        <Topbar title="Editar evento" />
        <div className="flex flex-1 flex-col p-6 sm:p-10">
          <ComingSoon
            title="Conectá la base de datos"
            description="Para editar eventos necesitás conectar la base. Mirá .env.local.example."
          />
        </div>
      </>
    );
  }

  const [[event], clients, reviews, baseUrl] = await Promise.all([
    sql<Event[]>`select * from events where id = ${id}`,
    listClients(),
    listReviewsForEvent(id),
    getBaseUrl(),
  ]);

  if (!event) {
    notFound();
  }

  const inviteUrl = event.invite_slug ? `${baseUrl}/invitacion/${event.invite_slug}` : null;
  const qrDataUrl = inviteUrl ? await generateQrDataUrl(inviteUrl) : null;

  return (
    <>
      <Topbar title={event.nombre} description="Editá los datos del evento." />
      <div className="flex max-w-2xl flex-1 flex-col gap-8 p-6 sm:p-10">
        <EventForm clients={clients} event={event} />

        <div className="rounded-2xl border border-border bg-background-elevated p-6">
          <h2 className="font-display text-base font-semibold text-foreground">Invitación</h2>
          <p className="mt-1 text-sm text-muted">
            Link para que el cliente y sus invitados vean y likeen las fotos del evento
            dentro de tu web.
          </p>

          {event.invite_slug && inviteUrl && qrDataUrl ? (
            <div className="mt-4 flex flex-col gap-4">
              <InvitationShare url={inviteUrl} slug={event.invite_slug} qrDataUrl={qrDataUrl} />
              <div className="flex flex-wrap gap-3">
                <Button
                  href={`/invitacion/${event.invite_slug}`}
                  variant="outline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ver como invitado
                </Button>
                <form action={generateInviteSlug}>
                  <input type="hidden" name="id" value={event.id} />
                  <ConfirmSubmitButton
                    label="Generar nuevo link"
                    confirmText="Esto invalida el link anterior — quien lo tenga guardado va a dejar de poder usarlo. ¿Continuar?"
                    className="rounded-full border border-border-strong px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted transition-colors hover:border-gold hover:text-gold"
                  />
                </form>
              </div>
            </div>
          ) : (
            <form action={generateInviteSlug} className="mt-4">
              <input type="hidden" name="id" value={event.id} />
              <Button type="submit" variant="primary">
                Generar invitación
              </Button>
            </form>
          )}
        </div>

        <div className="rounded-2xl border border-border bg-background-elevated p-6">
          <h2 className="font-display text-base font-semibold text-foreground">Reseñas</h2>
          <p className="mt-1 text-sm text-muted">
            Las que dejan los invitados en la landing quedan pendientes hasta que las
            apruebes.
          </p>

          {reviews.length === 0 ? (
            <p className="mt-4 text-sm text-muted-soft">
              Todavía no hay reseñas para este evento.
            </p>
          ) : (
            <ul className="mt-4 flex flex-col gap-4">
              {reviews.map((review) => (
                <li key={review.id} className="rounded-xl border border-border p-4">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-medium text-foreground">{review.author_name}</span>
                      <span className="text-gold">
                        {"★".repeat(review.rating)}
                        {"☆".repeat(5 - review.rating)}
                      </span>
                    </div>
                    <Badge tone={review.approved ? "green" : "gold"}>
                      {review.approved ? "Aprobada" : "Pendiente"}
                    </Badge>
                  </div>
                  <p className="mt-2 text-sm text-muted">{review.comment}</p>
                  <div className="mt-3 flex gap-4">
                    {!review.approved ? (
                      <form action={approveReview}>
                        <input type="hidden" name="id" value={review.id} />
                        <input type="hidden" name="eventId" value={event.id} />
                        <button
                          type="submit"
                          className="text-xs font-semibold uppercase tracking-[0.08em] text-gold hover:text-gold-light"
                        >
                          Aprobar
                        </button>
                      </form>
                    ) : null}
                    <form action={deleteReview}>
                      <input type="hidden" name="id" value={review.id} />
                      <input type="hidden" name="eventId" value={event.id} />
                      <ConfirmSubmitButton
                        label="Eliminar"
                        confirmText="¿Eliminar esta reseña?"
                        className="text-xs font-semibold uppercase tracking-[0.08em] text-red-300 transition-colors hover:text-red-200"
                      />
                    </form>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="rounded-2xl border border-red-900/30 bg-red-950/10 p-6">
          <h2 className="font-display text-base font-semibold text-foreground">
            Eliminar evento
          </h2>
          <p className="mt-1 text-sm text-muted">Esta acción no se puede deshacer.</p>
          <form action={deleteEvent} className="mt-4">
            <input type="hidden" name="id" value={event.id} />
            <ConfirmSubmitButton
              label="Eliminar evento"
              confirmText="¿Seguro que querés eliminar este evento? Esta acción no se puede deshacer."
              className="rounded-full border border-red-800/50 px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-red-300 transition-colors hover:bg-red-950/40"
            />
          </form>
        </div>
      </div>
    </>
  );
}
