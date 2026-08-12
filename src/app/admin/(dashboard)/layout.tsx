import { redirect } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const configured = isSupabaseConfigured();

  // Chequeo de rol lo más cerca posible de los datos: Proxy (src/proxy.ts)
  // solo verifica que haya sesión, no consulta la base.
  if (configured) {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      redirect("/ingresar");
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .single();

    if (profile?.role !== "admin") {
      redirect("/portal");
    }
  }

  return (
    <div className="flex min-h-svh bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        {!configured ? (
          <div className="border-b border-gold/25 bg-gold/10 px-6 py-2.5 text-center text-xs text-gold sm:px-10">
            Conectá tu proyecto de Supabase para que esta sección funcione con
            datos reales — ver <code className="font-mono">.env.local.example</code>.
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
}
