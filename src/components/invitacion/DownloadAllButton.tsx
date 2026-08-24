export function DownloadAllButton({ slug }: { slug: string }) {
  return (
    <a
      href={`/api/invitacion/${slug}/zip`}
      className="inline-flex items-center justify-center gap-2 rounded-full border border-border-strong px-7 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.14em] text-foreground transition-colors duration-200 hover:border-gold hover:text-gold"
    >
      Descargar todas las fotos (ZIP)
    </a>
  );
}
