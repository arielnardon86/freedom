import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { faqs } from "@/lib/content";

export function FAQ() {
  return (
    <section id="preguntas-frecuentes" className="px-6 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto flex max-w-3xl flex-col gap-14">
        <Reveal>
          <SectionHeading
            eyebrow="Preguntas frecuentes"
            title="¿Tenés dudas? Te respondemos."
          />
        </Reveal>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, index) => (
            <Reveal key={faq.question} delay={index * 60}>
              <details className="group rounded-xl border border-border bg-background-elevated px-6 py-4 open:border-gold/40">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-foreground marker:content-none">
                  {faq.question}
                  <span className="flex-none text-gold transition-transform duration-200 group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted">{faq.answer}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
