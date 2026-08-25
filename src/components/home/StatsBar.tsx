import { stats } from "@/lib/content";
import { AnimatedStat } from "@/components/home/AnimatedStat";

export function StatsBar() {
  return (
    <section className="relative z-10 -mt-14 px-6 sm:px-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border sm:grid-cols-4">
        {stats.map((stat) => (
          <AnimatedStat key={stat.label} value={stat.value} label={stat.label} />
        ))}
      </div>
    </section>
  );
}
