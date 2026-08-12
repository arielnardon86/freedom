import { notFound } from "next/navigation";
import { Topbar } from "@/components/admin/Topbar";
import { UserForm } from "@/components/admin/UserForm";
import { ResetPasswordButton } from "@/components/admin/ResetPasswordButton";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { listProfiles } from "@/lib/supabase/queries";

export default async function EditarUsuarioPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!isSupabaseConfigured()) {
    return (
      <>
        <Topbar title="Editar usuario" />
        <div className="flex flex-1 flex-col p-6 sm:p-10">
          <ComingSoon
            title="Conectá Supabase"
            description="Para editar usuarios necesitás conectar un proyecto de Supabase. Mirá .env.local.example."
          />
        </div>
      </>
    );
  }

  const profiles = await listProfiles();
  const profile = profiles.find((p) => p.id === id);

  if (!profile) {
    notFound();
  }

  return (
    <>
      <Topbar title={profile.full_name} description="Editá los datos del usuario." />
      <div className="flex max-w-2xl flex-1 flex-col gap-8 p-6 sm:p-10">
        <UserForm profile={profile} />

        <div className="rounded-2xl border border-border bg-background-elevated p-6">
          <h2 className="font-display text-base font-semibold text-foreground">Contraseña</h2>
          <p className="mt-1 text-sm text-muted">
            Blanqueá la contraseña del usuario si la olvidó o necesita una nueva.
          </p>
          <div className="mt-4">
            <ResetPasswordButton userId={profile.id} />
          </div>
        </div>
      </div>
    </>
  );
}
