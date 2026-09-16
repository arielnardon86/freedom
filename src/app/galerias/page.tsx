import Image from "next/image";
import Link from "next/link";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";
import { galeriaCategorias } from "@/lib/content";

export const metadata = {
  title: "Galerías | Freedom Fotografía",
  description:
    "Una muestra de nuestro trabajo en 15 años, bodas, egresados y eventos corporativos.",
};

export default function GaleriasPage() {
  return (
    <>
      <Navbar />
      <main>
        <section className="px-6 pt-28 pb-20 sm:px-10 lg:pt-36 lg:pb-28">
          <div className="mx-auto flex max-w-6xl flex-col gap-14">
            <Reveal>
              <SectionHeading
                eyebrow="Nuestro trabajo"
                title="Galerías"
                description="Elegí una categoría para ver una muestra de fotos de ese tipo de evento."
              />
            </Reveal>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {galeriaCategorias.map((categoria, index) => (
                <Reveal key={categoria.slug} delay={index * 80}>
                  <Link
                    href={`/galerias/${categoria.slug}`}
                    className="group flex flex-col gap-3"
                  >
                    <div className="relative aspect-[4/5] overflow-hidden rounded-xl border border-border">
                      <Image
                        src={categoria.photos[0]}
                        alt={categoria.title}
                        fill
                        sizes="(min-width: 1024px) 24vw, (min-width: 640px) 45vw, 90vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                    </div>
                    <div>
                      <h3 className="font-display text-base font-semibold text-foreground">
                        {categoria.title}
                      </h3>
                      <p className="text-xs uppercase tracking-[0.1em] text-muted">
                        Ver galería
                      </p>
                    </div>
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
