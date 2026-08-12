import { createClient as createSupabaseClient } from "@supabase/supabase-js";

// Cliente con el service role key: bypassa RLS. Solo se debe importar desde
// archivos "use server" (Server Actions) — nunca desde un componente de
// cliente. El acceso a /admin/** ya está controlado por middleware + rol.
export function createAdminClient() {
  return createSupabaseClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } },
  );
}
