import { Topbar } from "@/components/admin/Topbar";
import { ComingSoon } from "@/components/ui/ComingSoon";

const summaryCards = [
  { label: "Eventos activos", value: "—" },
  { label: "Invitaciones enviadas", value: "—" },
  { label: "Clientes registrados", value: "—" },
  { label: "Eventos este mes", value: "—" },
];

export default function AdminDashboardPage() {
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
                {card.value}
              </span>
              <span className="mt-1 block text-sm text-muted">{card.label}</span>
            </div>
          ))}
        </div>

        <ComingSoon
          title="Dashboard en construcción"
          description="Acá vas a poder ver el estado de tus eventos, actividad reciente y accesos rápidos. Vamos a definir el detalle de esta sección en la próxima etapa."
        />
      </div>
    </>
  );
}
