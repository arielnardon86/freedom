type ComingSoonProps = {
  title: string;
  description: string;
};

export function ComingSoon({ title, description }: ComingSoonProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-4 rounded-2xl border border-dashed border-border px-6 py-24 text-center">
      <span className="flex h-14 w-14 items-center justify-center rounded-full bg-gold/10 text-gold">
        <svg viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden="true">
          <path
            d="M12 7v5l3 3M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <h2 className="font-display text-xl font-semibold text-foreground">{title}</h2>
      <p className="max-w-sm text-sm leading-relaxed text-muted">{description}</p>
    </div>
  );
}
