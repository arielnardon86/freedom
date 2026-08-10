type TopbarProps = {
  title: string;
  description?: string;
};

export function Topbar({ title, description }: TopbarProps) {
  return (
    <header className="flex flex-col gap-4 border-b border-border px-6 py-6 sm:flex-row sm:items-center sm:justify-between sm:px-10">
      <div>
        <h1 className="font-display text-2xl font-semibold text-foreground">{title}</h1>
        {description ? (
          <p className="mt-1 text-sm text-muted">{description}</p>
        ) : null}
      </div>

      <div className="flex items-center gap-3">
        <span className="hidden text-right text-sm sm:block">
          <span className="block font-medium text-foreground">Fotos Freedom</span>
          <span className="block text-xs text-muted">Administrador</span>
        </span>
        <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-sm font-semibold text-gold">
          FF
        </span>
      </div>
    </header>
  );
}
