import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { testimonials } from "@/lib/content";

function Star() {
  return (
    <svg viewBox="0 0 20 20" className="h-4 w-4 fill-gold" aria-hidden="true">
      <path d="M10 1.5l2.59 5.62 6.16.58-4.65 4.16 1.36 6.07L10 14.98l-5.46 2.95 1.36-6.07-4.65-4.16 6.16-.58L10 1.5z" />
    </svg>
  );
}

function initials(name: string) {
  return name
    .split(/[\s&]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function Testimonials() {
  return (
    <section id="testimonios" className="bg-background-soft px-6 py-24 sm:px-10 lg:py-32">
      <div className="mx-auto flex max-w-6xl flex-col gap-14">
        <Reveal>
          <SectionHeading
            eyebrow="Lo que dicen nuestros clientes"
            title="Historias que nos emocionan contar"
          />
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {testimonials.map((testimonial, index) => (
            <Reveal key={testimonial.name} delay={index * 80}>
              <figure className="flex h-full flex-col gap-5 rounded-2xl border border-border bg-background-elevated p-7">
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} />
                  ))}
                </div>
                <blockquote className="text-sm leading-relaxed text-foreground/85">
                  &ldquo;{testimonial.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-auto flex items-center gap-3 pt-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-gold/15 text-xs font-semibold text-gold">
                    {initials(testimonial.name)}
                  </span>
                  <span>
                    <span className="block text-sm font-semibold text-foreground">
                      {testimonial.name}
                    </span>
                    <span className="block text-xs uppercase tracking-[0.1em] text-muted">
                      {testimonial.category}
                    </span>
                  </span>
                </figcaption>
              </figure>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
