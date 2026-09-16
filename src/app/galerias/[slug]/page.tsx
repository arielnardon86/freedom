import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/home/Navbar";
import { Footer } from "@/components/home/Footer";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { WhatsAppFloatingButton } from "@/components/ui/WhatsAppFloatingButton";
import { galeriaCategorias } from "@/lib/content";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return galeriaCategorias.map((categoria) => ({ slug: categoria.slug }));
}

export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  const categoria = galeriaCategorias.find((item) => item.slug === slug);
  if (!categoria) return {};

  return {
    title: `${categoria.title} | Galerías | Freedom Fotografía`,
    description: categoria.description,
  };
}

export default async function GaleriaCategoriaPage({ params }: PageProps) {
  const { slug } = await params;
  const categoria = galeriaCategorias.find((item) => item.slug === slug);

  if (!categoria) notFound();

  return (
    <>
      <Navbar />
      <main>
        <section className="px-6 pt-28 pb-16 sm:px-10 lg:pt-36">
          <div className="mx-auto flex max-w-6xl flex-col gap-6">
            <Link
              href="/galerias"
              className="text-xs font-medium uppercase tracking-[0.12em] text-muted transition-colors hover:text-gold"
            >
              ← Todas las galerías
            </Link>
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="Nuestro trabajo"
                title={categoria.title}
                description={categoria.description}
              />
            </Reveal>
          </div>
        </section>

        <section className="px-6 pb-24 sm:px-10 lg:pb-32">
          <div className="mx-auto max-w-6xl">
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
      </main>
      <Footer />
      <WhatsAppFloatingButton />
    </>
  );
}
