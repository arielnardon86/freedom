import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { porQueElegirnos, valores } from "@/lib/content";

export function Values() {
  return (
    <section className="bg-background-soft px-6 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-16">
        <div className="flex flex-col gap-14">
          <Reveal>
            <SectionHeading eyebrow="Lo que nos define" title="Nuestros valores" />
          </Reveal>

          <div className="grid gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
            {valores.map((valor, index) => (
              <Reveal key={valor.title} delay={index * 60}>
                <div className="flex flex-col gap-2">
                  <span className="text-gold">✦</span>
                  <h3 className="font-display text-lg font-semibold text-foreground">
                    {valor.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-muted">{valor.description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="flex flex-col gap-6 rounded-2xl border border-border-strong px-7 py-9 sm:px-10">
          <SectionHeading align="left" title="¿Por qué elegir Freedom?" />
          <ul className="grid gap-x-8 gap-y-3 sm:grid-cols-2">
            {porQueElegirnos.map((item) => (
              <li key={item} className="flex items-center gap-3 text-sm text-foreground/85">
                <span className="h-1.5 w-1.5 flex-none rounded-full bg-gold" />
                {item}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
