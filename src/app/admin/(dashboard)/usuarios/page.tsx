import { Topbar } from "@/components/admin/Topbar";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { listProfiles } from "@/lib/supabase/queries";
import { roleLabels } from "@/lib/types";

export default async function AdminUsuariosPage() {
  const profiles = await listProfiles();

  return (
    <>
      <Topbar
        title="Usuarios"
        description="Administrá los usuarios del panel y de los clientes."
      />
      <div className="flex flex-1 flex-col gap-6 p-6 sm:p-10">
        <Button href="/admin/usuarios/nuevo" variant="primary" className="w-fit">
          Nuevo usuario
        </Button>

        {!isSupabaseConfigured() ? (
          <ComingSoon
            title="Conectá Supabase"
            description="Para crear y consultar usuarios necesitás conectar un proyecto de Supabase. Mirá .env.local.example."
          />
        ) : profiles.length === 0 ? (
          <ComingSoon
            title="Todavía no hay usuarios"
            description="Creá el primero con el botón de arriba."
          />
        ) : (
          <div className="overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[640px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-border bg-background-elevated text-left text-xs uppercase tracking-[0.08em] text-muted">
                  <th className="px-4 py-3 font-medium">Nombre</th>
                  <th className="px-4 py-3 font-medium">Email</th>
                  <th className="px-4 py-3 font-medium">Teléfono</th>
                  <th className="px-4 py-3 font-medium">Rol</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {profiles.map((profile) => (
                  <tr key={profile.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground">
                      {profile.full_name}
                    </td>
                    <td className="px-4 py-3 text-muted">{profile.email ?? "—"}</td>
                    <td className="px-4 py-3 text-muted">{profile.phone ?? "—"}</td>
                    <td className="px-4 py-3">
                      <Badge tone={profile.role === "admin" ? "gold" : "neutral"}>
                        {roleLabels[profile.role]}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <a
                        href={`/admin/usuarios/${profile.id}`}
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
