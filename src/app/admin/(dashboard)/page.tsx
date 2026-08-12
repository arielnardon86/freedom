import { Topbar } from "@/components/admin/Topbar";
import { Badge } from "@/components/ui/Badge";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { eventTypeLabels, paymentStatusLabels } from "@/lib/types";
import type { Event, PaymentStatus } from "@/lib/types";

const paymentTone: Record<PaymentStatus, "green" | "gold" | "red"> = {
  pagado: "green",
  parcial: "gold",
  pendiente: "red",
};

export default async function AdminDashboardPage() {
  const configured = isSupabaseConfigured();
  let events: Event[] = [];

  if (configured) {
    const supabase = createAdminClient();
    const { data } = await supabase
      .from("events")
      .select("*, cliente:profiles(id, full_name)")
      .order("fecha_evento", { ascending: true });
    events = (data as Event[] | null) ?? [];
  }

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const in30Days = new Date(today);
  in30Days.setDate(in30Days.getDate() + 30);

  const proximos30 = events.filter((event) => {
    const fecha = new Date(`${event.fecha_evento}T00:00:00`);
    return fecha >= today && fecha <= in30Days;
  }).length;

  const summaryCards = [
    { label: "Eventos activos", value: events.filter((e) => !e.entregado).length },
    { label: "Próximos 30 días", value: proximos30 },
    { label: "Entregas pendientes", value: events.filter((e) => !e.entregado).length },
    { label: "Pagos pendientes", value: events.filter((e) => e.estado_pago !== "pagado").length },
  ];

  const proximosEventos = events
    .filter((event) => new Date(`${event.fecha_evento}T00:00:00`) >= today)
    .slice(0, 6);

  return (
    <>
      <Topbar
        title="Dashboard"
        description="Resumen general de la actividad del estudio."
      />

      <div className="flex flex-1 flex-col gap-8 p-6 sm:p-10">
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          {summaryCards.map((card) => (
            <div
              key={card.label}
              className="rounded-2xl border border-border bg-background-elevated p-6"
            >
              <span className="block font-display text-3xl font-semibold text-gold">
                {configured ? card.value : "—"}
              </span>
              <span className="mt-1 block text-sm text-muted">{card.label}</span>
            </div>
          ))}
        </div>

        {!configured ? (
          <ComingSoon
            title="Conectá Supabase"
            description="Cuando conectes tu proyecto de Supabase, acá vas a ver el estado real de tus eventos y accesos rápidos."
          />
        ) : proximosEventos.length === 0 ? (
          <ComingSoon
            title="No hay próximos eventos"
            description="Los eventos que cargues con fecha futura van a aparecer acá."
          />
        ) : (
          <div className="rounded-2xl border border-border">
            <div className="border-b border-border px-6 py-4">
              <h2 className="font-display text-base font-semibold text-foreground">
                Próximos eventos
              </h2>
            </div>
            <ul className="divide-y divide-border">
              {proximosEventos.map((event) => (
                <li
                  key={event.id}
                  className="flex flex-wrap items-center justify-between gap-3 px-6 py-4"
                >
                  <div>
                    <a
                      href={`/admin/eventos/${event.id}`}
                      className="font-medium text-foreground hover:text-gold"
                    >
                      {event.nombre}
                    </a>
                    <p className="text-xs text-muted">
                      {new Date(`${event.fecha_evento}T00:00:00`).toLocaleDateString("es-AR")} ·{" "}
                      {eventTypeLabels[event.tipo_evento]}
                      {event.cliente ? ` · ${event.cliente.full_name}` : ""}
                    </p>
                  </div>
                  <Badge tone={paymentTone[event.estado_pago]}>
                    {paymentStatusLabels[event.estado_pago]}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </>
  );
}
