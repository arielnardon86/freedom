import { InvitationLink } from "@/components/admin/InvitationLink";

export function InvitationShare({
  url,
  slug,
  qrDataUrl,
}: {
  url: string;
  slug: string;
  qrDataUrl: string;
}) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={qrDataUrl}
        alt="Código QR de la invitación"
        className="h-28 w-28 shrink-0 rounded-lg border border-border bg-white p-2"
      />
      <div className="flex flex-1 flex-col gap-3">
        <InvitationLink url={url} />
        <a
          href={`/api/invitacion/${slug}/pdf`}
          className="w-fit text-xs font-semibold uppercase tracking-[0.08em] text-gold transition-colors hover:text-gold-light"
        >
          Descargar PDF para imprimir o compartir
        </a>
      </div>
    </div>
  );
}
