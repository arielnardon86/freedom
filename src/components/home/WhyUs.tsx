import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { contenidoEnRedes, diferenciales } from "@/lib/content";

export function WhyUs() {
  return (
    <section className="bg-background-soft px-6 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <Reveal>
          <SectionHeading
            eyebrow="Somos una productora"
            title="Mucho más que fotografía."
            description="Pensamos cada proyecto desde una mirada integral: fotografía, video, producción, contenido para redes, entrevistas, trends y herramientas digitales. No esperamos a que sucedan los momentos: buscamos crearlos, potenciarlos y encontrar la mejor manera de contarlos."
          />
        </Reveal>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {diferenciales.map((item, index) => (
            <Reveal key={item.title} delay={index * 80}>
              <div className="flex h-full flex-col gap-3 rounded-2xl border border-border bg-background-elevated p-7">
                <span className="font-display text-2xl text-gold/60">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg font-semibold text-foreground">
                  {item.title}
                </h3>
                <p className="text-sm leading-relaxed text-muted">{item.description}</p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="flex flex-col gap-5 rounded-2xl border border-border-strong px-7 py-8 sm:px-10">
          <div>
            <h3 className="font-display text-xl font-semibold text-foreground">
              Tu evento también se vive en redes.
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Hoy una celebración no termina cuando termina la fiesta. Incorporamos
              contenido para que el evento se viva en tiempo real y siga circulando
              en redes después.
            </p>
          </div>
          <div className="flex flex-wrap gap-2.5">
            {contenidoEnRedes.map((item) => (
              <span
                key={item}
                className="rounded-full border border-border-strong px-4 py-1.5 text-xs font-medium uppercase tracking-[0.08em] text-foreground/80"
              >
                {item}
              </span>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
