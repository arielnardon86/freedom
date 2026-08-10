import Link from "next/link";
import { notFound } from "next/navigation";
import { ComingSoon } from "@/components/ui/ComingSoon";
import { clientEvents } from "@/lib/content";

export default async function PortalEventoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = clientEvents.find((e) => e.id === id);

  if (!event) {
    notFound();
  }

  return (
    <div className="flex flex-1 flex-col gap-6">
      <div>
        <Link
          href="/portal"
          className="text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-gold"
        >
          ← Mis eventos
        </Link>
        <h1 className="mt-3 font-display text-2xl font-semibold text-foreground">
          {event.title}
        </h1>
        <p className="mt-1 text-sm text-muted">
          {event.date} · {event.status}
        </p>
      </div>

      <ComingSoon
        title="Fotos del evento"
        description="Acá vas a poder ver y descargar las fotos de tu evento, conectadas directamente desde Google Drive. Lo habilitamos en la próxima etapa."
      />
    </div>
  );
}
