import { redirect } from "next/navigation";
import { Sidebar } from "@/components/admin/Sidebar";
import { sql, isDatabaseConfigured } from "@/lib/db";
import { getSession } from "@/lib/auth/session";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const configured = isDatabaseConfigured();

  // Chequeo de rol lo más cerca posible de los datos: Proxy (src/proxy.ts)
  // solo verifica que la cookie de sesión sea válida, no consulta la base.
  if (configured) {
    const session = await getSession();

    if (!session) {
      redirect("/ingresar");
    }

    const [user] = await sql<{ role: string }[]>`
      select role from users where id = ${session.sub}
    `;

    if (user?.role !== "admin") {
      redirect("/portal");
    }
  }

  return (
    <div className="flex min-h-svh bg-background">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        {!configured ? (
          <div className="border-b border-gold/25 bg-gold/10 px-6 py-2.5 text-center text-xs text-gold sm:px-10">
            Conectá tu base de datos para que esta sección funcione con datos
            reales — ver <code className="font-mono">.env.local.example</code>.
          </div>
        ) : null}
        {children}
      </div>
    </div>
  );
}
