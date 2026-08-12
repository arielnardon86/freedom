import { notFound } from "next/navigation";
import { Topbar } from "@/components/admin/Topbar";
import { EventForm } from "@/components/admin/EventForm";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { ConfirmSubmitButton } from "@/components/ui/ConfirmSubmitButton";
import { sql, isDatabaseConfigured } from "@/lib/db";
import { listClients } from "@/lib/queries";
import type { Event } from "@/lib/types";
import { deleteEvent } from "../actions";

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

  const [[event], clients] = await Promise.all([
    sql<Event[]>`select * from events where id = ${id}`,
    listClients(),
  ]);

  if (!event) {
    notFound();
  }

  return (
    <>
      <Topbar title={event.nombre} description="Editá los datos del evento." />
      <div className="flex max-w-2xl flex-1 flex-col gap-8 p-6 sm:p-10">
        <EventForm clients={clients} event={event} />

        <div className="rounded-2xl border border-border bg-background-elevated p-6">
          <h2 className="font-display text-base font-semibold text-foreground">Invitación</h2>
          <p className="mt-1 text-sm text-muted">
            Generá un link para que el cliente vea las fotos del evento en tu web. Esta
            función se habilita en la próxima etapa.
          </p>
          <button
            type="button"
            disabled
            className="mt-4 rounded-full border border-border-strong px-6 py-3 text-[0.72rem] font-semibold uppercase tracking-[0.12em] text-muted opacity-60"
          >
            Generar invitación (Próximamente)
          </button>
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
