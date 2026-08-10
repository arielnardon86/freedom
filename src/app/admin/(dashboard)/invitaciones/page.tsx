import { Topbar } from "@/components/admin/Topbar";
import { ComingSoon } from "@/components/ui/ComingSoon";

export default function AdminInvitacionesPage() {
  return (
    <>
      <Topbar
        title="Invitaciones"
        description="Generá links de invitación para que los invitados vean las fotos."
      />
      <div className="flex flex-1 flex-col p-6 sm:p-10">
        <ComingSoon
          title="Generador de invitaciones"
          description="Acá vas a poder generar y compartir links de invitación por evento, para que los invitados accedan a las fotos sin necesidad de una cuenta. Lo definimos en detalle en la próxima etapa."
        />
      </div>
    </>
  );
}
