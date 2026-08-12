import { Suspense } from "react";
import { Topbar } from "@/components/admin/Topbar";
import { EventFilters } from "@/components/admin/EventFilters";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { sql, isDatabaseConfigured } from "@/lib/db";
import { listClients } from "@/lib/queries";
import { eventTypeLabels, paymentStatusLabels } from "@/lib/types";
import type { Event, PaymentStatus } from "@/lib/types";

type SearchParams = Record<string, string | string[] | undefined>;

function asString(value: string | string[] | undefined) {
  return typeof value === "string" && value.length > 0 ? value : undefined;
}

const paymentTone: Record<PaymentStatus, "green" | "gold" | "red"> = {
  pagado: "green",
  parcial: "gold",
  pendiente: "red",
};

type EventRow = Event & { cliente_full_name: string | null };

export default async function AdminEventosPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;
  const clients = await listClients();

  let events: Event[] = [];
  if (isDatabaseConfigured()) {
    const tipo = asString(params.tipo);
    const pago = asString(params.pago);
    const entregado = asString(params.entregado);
    const cliente = asString(params.cliente);
    const desde = asString(params.desde);
    const hasta = asString(params.hasta);
    const q = asString(params.q);

    let where = sql`true`;
    if (tipo) where = sql`${where} and e.tipo_evento = ${tipo}`;
    if (pago) where = sql`${where} and e.estado_pago = ${pago}`;
    if (entregado === "si") where = sql`${where} and e.entregado = true`;
    if (entregado === "no") where = sql`${where} and e.entregado = false`;
    if (cliente) where = sql`${where} and e.cliente_id = ${cliente}`;
    if (desde) where = sql`${where} and e.fecha_evento >= ${desde}`;
    if (hasta) where = sql`${where} and e.fecha_evento <= ${hasta}`;
    if (q) where = sql`${where} and e.nombre ilike ${`%${q}%`}`;

    const rows = await sql<EventRow[]>`
      select e.*, c.full_name as cliente_full_name
      from events e
      left join users c on c.id = e.cliente_id
      where ${where}
      order by e.fecha_evento desc
    `;

    events = rows.map((row) => ({
      ...row,
      cliente:
        row.cliente_id && row.cliente_full_name
          ? { id: row.cliente_id, full_name: row.cliente_full_name }
          : null,
    }));
  }

  return (
    <>
      <Topbar title="Eventos" description="Creá y administrá los eventos del estudio." />
      <div className="flex flex-1 flex-col gap-6 p-6 sm:p-10">
        <div className="flex items-center justify-between gap-4">
          <Suspense fallback={null}>
            <EventFilters clients={clients} />
          </Suspense>
        </div>

        <Button href="/admin/eventos/nuevo" variant="primary" className="w-fit">
          Nuevo evento
        </Button>

        {!isDatabaseConfigured() ? (
          <ComingSoon
            title="Conectá la base de datos"
            description="Para crear y consultar eventos necesitás conectar la base. Mirá .env.local.example."
          />
        ) : events.length === 0 ? (
          <ComingSoon
            title="Todavía no hay eventos"
            description="Creá el primer evento con el botón de arriba."
          />
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[840px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-background-elevated text-left text-xs uppercase tracking-[0.08em] text-muted">
                  <th className="px-4 py-3 font-medium">Evento</th>
                  <th className="px-4 py-3 font-medium">Cliente</th>
                  <th className="px-4 py-3 font-medium">Fecha</th>
                  <th className="px-4 py-3 font-medium">Tipo</th>
                  <th className="px-4 py-3 font-medium">Pago</th>
                  <th className="px-4 py-3 font-medium">Entregado</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {events.map((event) => (
                  <tr key={event.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground">{event.nombre}</td>
                    <td className="px-4 py-3 text-muted">
                      {event.cliente?.full_name ?? "Sin asignar"}
                    </td>
                    <td className="px-4 py-3 text-muted">
                      {new Date(`${event.fecha_evento}T00:00:00`).toLocaleDateString("es-AR")}
                    </td>
                    <td className="px-4 py-3 text-muted">{eventTypeLabels[event.tipo_evento]}</td>
                    <td className="px-4 py-3">
                      <Badge tone={paymentTone[event.estado_pago]}>
                        {paymentStatusLabels[event.estado_pago]}
                      </Badge>
                    </td>
                    <td className="px-4 py-3">
                      <Badge tone={event.entregado ? "green" : "neutral"}>
                        {event.entregado ? "Sí" : "No"}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <a
                        href={`/admin/eventos/${event.id}`}
                        className="text-xs font-semibold uppercase tracking-[0.08em] text-gold hover:text-gold-light"
                      >
                        Editar
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}
