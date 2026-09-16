import Image from "next/image";
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
        <section className="px-6 pt-28 pb-16 sm:px-10 lg:pt-36">
          <div className="mx-auto max-w-6xl">
            <Reveal>
              <SectionHeading
                eyebrow="Nuestro trabajo"
                title="Galerías"
                description="Una muestra de cómo capturamos cada tipo de evento: 15 años, bodas, egresados y trabajos corporativos."
              />
            </Reveal>
          </div>
        </section>

        {galeriaCategorias.map((categoria, categoriaIndex) => (
          <section
            key={categoria.slug}
            id={categoria.slug}
            className={`scroll-mt-24 px-6 py-16 sm:px-10 lg:py-20 ${
              categoriaIndex % 2 === 1 ? "bg-background-soft" : ""
            }`}
          >
            <div className="mx-auto flex max-w-6xl flex-col gap-10">
              <Reveal>
                <SectionHeading
                  align="left"
                  title={categoria.title}
                  description={categoria.description}
                />
              </Reveal>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {categoria.photos.map((photo, photoIndex) => (
                  <Reveal key={photo} delay={photoIndex * 80}>
                    <div className="group relative aspect-[4/5] overflow-hidden rounded-xl border border-border">
                      <Image
                        src={photo}
                        alt={`${categoria.title} - foto ${photoIndex + 1}`}
                        fill
                        sizes="(min-width: 1024px) 32vw, (min-width: 640px) 45vw, 90vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </section>
        ))}
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
