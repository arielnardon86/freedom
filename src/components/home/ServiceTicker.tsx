const items = [
  "Bodas",
  "15 Años",
  "Egresados",
  "Eventos",
  "Empresas",
  "Fotografía y Video",
];

export function ServiceTicker() {
  const loop = [...items, ...items];

  return (
    <div className="overflow-hidden border-y border-border bg-background-elevated py-4">
      <div className="flex w-max animate-marquee items-center gap-10">
        {loop.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-10 text-xs font-semibold uppercase tracking-[0.3em] text-muted"
          >
            {item}
            <span className="text-gold">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}
