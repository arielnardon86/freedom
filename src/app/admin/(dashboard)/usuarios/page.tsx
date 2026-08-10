import { Topbar } from "@/components/admin/Topbar";
import { ComingSoon } from "@/components/ui/ComingSoon";

export default function AdminUsuariosPage() {
  return (
    <>
      <Topbar
        title="Usuarios"
        description="Administrá los usuarios del panel y de los clientes."
      />
      <div className="flex flex-1 flex-col p-6 sm:p-10">
        <ComingSoon
          title="Gestión de usuarios"
          description="Acá vas a poder crear cuentas de administradores y clientes, y gestionar sus permisos. Lo definimos en detalle en la próxima etapa."
        />
      </div>
    </>
  );
}
