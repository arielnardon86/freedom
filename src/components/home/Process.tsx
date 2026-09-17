import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { proceso } from "@/lib/content";

export function Process() {
  return (
    <section className="px-6 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <Reveal>
          <SectionHeading
            eyebrow="Cómo trabajamos"
            title="Nuestra forma de trabajar"
          />
        </Reveal>

        <div className="grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {proceso.map((item, index) => (
            <Reveal key={item.step} delay={index * 70}>
              <div className="flex flex-col gap-2 border-l border-border-strong pl-5">
                <span className="font-display text-3xl text-gold/70">{item.step}</span>
                <h3 className="text-sm font-semibold uppercase tracking-[0.08em] text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
