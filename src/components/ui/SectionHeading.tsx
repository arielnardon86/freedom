type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
};

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
}: SectionHeadingProps) {
  const alignClasses = align === "center" ? "items-center text-center mx-auto" : "items-start text-left";

  return (
    <div className={`flex max-w-2xl flex-col gap-4 ${alignClasses}`}>
      {eyebrow ? (
        <span className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.3em] text-gold">
          {align === "center" && <span className="h-px w-8 bg-gold-dark" />}
          {eyebrow}
          {align === "center" && <span className="h-px w-8 bg-gold-dark" />}
        </span>
      ) : null}
      <h2 className="font-display text-3xl font-semibold text-foreground sm:text-4xl">
        {title}
      </h2>
      {description ? (
        <p className="text-balance text-[0.95rem] leading-relaxed text-muted">
          {description}
        </p>
      ) : null}
    </div>
  );
}
