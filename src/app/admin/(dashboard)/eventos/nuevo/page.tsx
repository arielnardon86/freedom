import { Topbar } from "@/components/admin/Topbar";
import { EventForm } from "@/components/admin/EventForm";
import { listClients } from "@/lib/supabase/queries";

export default async function NuevoEventoPage() {
  const clients = await listClients();

  return (
    <>
      <Topbar title="Nuevo evento" description="Cargá los datos del evento." />
      <div className="max-w-2xl flex-1 p-6 sm:p-10">
        <EventForm clients={clients} />
      </div>
    </>
  );
}
