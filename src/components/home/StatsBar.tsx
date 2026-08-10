import { stats } from "@/lib/content";

export function StatsBar() {
  return (
    <section className="relative z-10 -mt-14 px-6 sm:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="flex flex-col items-center gap-1.5 bg-background-elevated px-6 py-8 text-center"
          >
            <span className="font-display text-2xl font-semibold text-gold sm:text-3xl">
              {stat.value}
            </span>
            <span className="text-[0.68rem] uppercase tracking-[0.14em] text-muted">
              {stat.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
