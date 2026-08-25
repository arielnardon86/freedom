import Image from "next/image";
import Link from "next/link";
import { contact, navLinks } from "@/lib/content";

export function Footer() {
  return (
    <footer id="contacto" className="border-t border-border bg-background-elevated">
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-16 sm:px-10 md:grid-cols-3">
        <div className="flex flex-col items-start gap-4">
          <Image
            src="/images/logo-freedom-wordmark.png"
            alt="Freedom Fotografía"
            width={181}
            height={56}
            className="h-10 w-auto"
          />
          <p className="max-w-xs text-sm leading-relaxed text-muted">
            Fotografía y video de bodas, 15 años, egresos y eventos en Córdoba y
            alrededores.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Navegación
          </h3>
          <ul className="flex flex-col gap-2.5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="text-sm text-muted transition-colors hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div className="flex flex-col gap-4">
          <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold">
            Contacto
          </h3>
          <ul className="flex flex-col gap-2.5 text-sm text-muted">
            <li>
              <a href={contact.whatsapp} target="_blank" rel="noreferrer" className="hover:text-gold">
                WhatsApp
              </a>
            </li>
            <li>
              <a href={contact.instagram} target="_blank" rel="noreferrer" className="hover:text-gold">
                Instagram
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="hover:text-gold">
                {contact.email}
              </a>
            </li>
            <li>{contact.location}</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-6 py-6 text-center text-xs text-muted-soft sm:px-10">
        © {new Date().getFullYear()} Freedom Fotografía. Todos los derechos reservados.
      </div>
    </footer>
  );
}
