import { redirect } from "next/navigation";
import { PortalNav } from "@/components/portal/PortalNav";
import { isDatabaseConfigured } from "@/lib/db";
import { getSession } from "@/lib/auth/session";
import { getUserById } from "@/lib/queries";

export default async function PortalDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let userName: string | null = null;

  if (isDatabaseConfigured()) {
    const session = await getSession();
    if (!session) {
      redirect("/ingresar");
    }

    const user = await getUserById(session.sub);
    userName = user?.full_name ?? null;
  }

  return (
    <div className="flex min-h-svh flex-col bg-background">
      <PortalNav userName={userName} />
      <main className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-10 sm:px-10">
        {children}
      </main>
    </div>
  );
}
