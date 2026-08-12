// Mientras no haya un proyecto de Supabase conectado, las páginas de admin
// muestran un aviso en vez de intentar consultar la base y romper.
export function isSupabaseConfigured() {
  return Boolean(
    process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  );
}

export const SUPABASE_NOT_CONFIGURED_MESSAGE =
  "El sitio todavía no está conectado a Supabase. Configurá .env.local para habilitar esta acción.";
