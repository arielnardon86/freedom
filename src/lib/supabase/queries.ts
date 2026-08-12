import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import type { Profile } from "@/lib/types";

// Lecturas de /admin/**: usan el cliente con service role porque las
// políticas de RLS solo permiten que cada usuario lea su propia fila (están
// pensadas para el portal cliente). El acceso a /admin/** ya está protegido
// por middleware + chequeo de rol.

export async function listClients(): Promise<Profile[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createAdminClient();
  const { data } = await supabase
    .from("profiles")
    .select("*")
    .eq("role", "client")
    .order("full_name");
  return data ?? [];
}

export async function listProfiles(): Promise<Profile[]> {
  if (!isSupabaseConfigured()) return [];
  const supabase = createAdminClient();
  const [{ data: profiles }, { data: usersResult }] = await Promise.all([
    supabase.from("profiles").select("*").order("full_name"),
    supabase.auth.admin.listUsers(),
  ]);

  const emailById = new Map(usersResult?.users.map((u) => [u.id, u.email]) ?? []);

  return (profiles ?? []).map((profile) => ({
    ...profile,
    email: emailById.get(profile.id) ?? null,
  }));
}
