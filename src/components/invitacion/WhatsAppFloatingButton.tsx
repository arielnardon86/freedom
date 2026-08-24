import { contact } from "@/lib/content";

export function WhatsAppFloatingButton() {
  return (
    <a
      href={contact.whatsapp}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-6 right-6 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 transition-transform hover:scale-105"
    >
      <svg viewBox="0 0 24 24" className="h-7 w-7 fill-current" aria-hidden="true">
        <path d="M12.01 2C6.48 2 2 6.48 2 12.01c0 1.99.58 3.85 1.58 5.41L2 22l4.72-1.55a9.96 9.96 0 0 0 5.29 1.53h.01c5.52 0 10-4.48 10-9.98C22.02 6.48 17.53 2 12.01 2Zm5.85 14.24c-.25.7-1.24 1.29-2.03 1.46-.54.11-1.24.2-3.6-.77-3.02-1.25-4.97-4.32-5.12-4.52-.15-.2-1.23-1.64-1.23-3.13s.77-2.22 1.05-2.52c.27-.3.6-.37.8-.37h.57c.18 0 .43-.07.67.51.25.6.85 2.09.92 2.24.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.32.39-.45.52-.15.15-.31.31-.13.61.17.3.78 1.29 1.68 2.09 1.16 1.03 2.13 1.35 2.43 1.5.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.75.83 2.05.98.3.15.5.22.57.35.08.13.08.75-.18 1.45Z" />
      </svg>
    </a>
  );
}
