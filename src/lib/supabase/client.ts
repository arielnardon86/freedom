import { createBrowserClient } from "@supabase/ssr";

// Cliente de Supabase para uso en componentes de cliente ("use client").
// Requiere NEXT_PUBLIC_SUPABASE_URL y NEXT_PUBLIC_SUPABASE_ANON_KEY en .env.local
// (ver .env.local.example). Todavía no hay un proyecto de Supabase conectado.
export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );
}
