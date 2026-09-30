import Image from "next/image";
import Link from "next/link";
import { contact, navLinks } from "@/lib/content";
import { InstagramIcon, MailIcon, PinIcon, WhatsappIcon, YoutubeIcon } from "@/components/ui/SocialIcons";

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
            Fotografía, video y producción audiovisual. Con base en Villa Carlos
            Paz, viajamos a donde esté tu historia.
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
              <a
                href={contact.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-gold"
              >
                <WhatsappIcon className="h-4 w-4 flex-none" />
                WhatsApp
              </a>
            </li>
            <li>
              <a
                href={contact.instagram}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-gold"
              >
                <InstagramIcon className="h-4 w-4 flex-none" />
                Instagram
              </a>
            </li>
            <li>
              <a
                href={contact.youtube}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 hover:text-gold"
              >
                <YoutubeIcon className="h-4 w-4 flex-none" />
                YouTube
              </a>
            </li>
            <li>
              <a href={`mailto:${contact.email}`} className="flex items-center gap-2 hover:text-gold">
                <MailIcon className="h-4 w-4 flex-none" />
                Email
              </a>
            </li>
            <li className="flex items-center gap-2">
              <PinIcon className="h-4 w-4 flex-none" />
              {contact.location}
            </li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border px-6 py-6 text-center text-xs text-muted-soft sm:px-10">
        © {new Date().getFullYear()} Freedom Fotografía. Todos los derechos reservados.
      </div>
    </footer>
  );
}
