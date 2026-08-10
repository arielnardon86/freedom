import { Topbar } from "@/components/admin/Topbar";
import { ComingSoon } from "@/components/ui/ComingSoon";

export default function AdminEventosPage() {
  return (
    <>
      <Topbar
        title="Eventos"
        description="Creá y administrá los eventos del estudio."
      />
      <div className="flex flex-1 flex-col p-6 sm:p-10">
        <ComingSoon
          title="Gestión de eventos"
          description="Acá vas a poder crear eventos, cargar sus fechas, asociar clientes y el link de Google Drive con las fotos. Lo definimos en detalle en la próxima etapa."
        />
      </div>
    </>
  );
}
