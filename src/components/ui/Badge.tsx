import type { ReactNode } from "react";

type BadgeTone = "gold" | "green" | "red" | "neutral";

const tones: Record<BadgeTone, string> = {
  gold: "bg-gold/10 text-gold",
  green: "bg-emerald-500/10 text-emerald-400",
  red: "bg-red-500/10 text-red-400",
  neutral: "bg-foreground/10 text-muted",
};

export function Badge({
  tone = "neutral",
  children,
}: {
  tone?: BadgeTone;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center whitespace-nowrap rounded-full px-3 py-1 text-[0.65rem] font-medium uppercase tracking-[0.08em] ${tones[tone]}`}
    >
      {children}
    </span>
  );
}
