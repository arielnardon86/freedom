import { Topbar } from "@/components/admin/Topbar";
import { UserForm } from "@/components/admin/UserForm";

export default function NuevoUsuarioPage() {
  return (
    <>
      <Topbar
        title="Nuevo usuario"
        description="Creá una cuenta de administrador o de cliente."
      />
      <div className="max-w-2xl flex-1 p-6 sm:p-10">
        <UserForm />
      </div>
    </>
  );
}
