type IconProps = { className?: string };

export function InstagramIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4.2" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17.1" cy="6.9" r="1.1" fill="currentColor" />
    </svg>
  );
}

export function YoutubeIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="2.5" y="5.5" width="19" height="13" rx="4" stroke="currentColor" strokeWidth="1.6" />
      <path d="M10.5 9.5v5l4.5-2.5-4.5-2.5Z" fill="currentColor" />
    </svg>
  );
}

export function WhatsappIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden="true">
      <path d="M12.01 2C6.48 2 2 6.48 2 12.01c0 1.99.58 3.85 1.58 5.41L2 22l4.72-1.55a9.96 9.96 0 0 0 5.29 1.53h.01c5.52 0 10-4.48 10-9.98C22.02 6.48 17.53 2 12.01 2Zm5.85 14.24c-.25.7-1.24 1.29-2.03 1.46-.54.11-1.24.2-3.6-.77-3.02-1.25-4.97-4.32-5.12-4.52-.15-.2-1.23-1.64-1.23-3.13s.77-2.22 1.05-2.52c.27-.3.6-.37.8-.37h.57c.18 0 .43-.07.67.51.25.6.85 2.09.92 2.24.07.15.12.32.02.52-.1.2-.15.32-.3.5-.15.17-.32.39-.45.52-.15.15-.31.31-.13.61.17.3.78 1.29 1.68 2.09 1.16 1.03 2.13 1.35 2.43 1.5.3.15.48.13.65-.08.18-.2.75-.87.95-1.17.2-.3.4-.25.67-.15.28.1 1.75.83 2.05.98.3.15.5.22.57.35.08.13.08.75-.18 1.45Z" />
    </svg>
  );
}

export function MailIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <rect x="3" y="5" width="18" height="14" rx="2" stroke="currentColor" strokeWidth="1.6" />
      <path d="m4 6.5 8 6 8-6" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function PinIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="none" aria-hidden="true">
      <path
        d="M12 21s-7-6.2-7-11.2A7 7 0 0 1 19 9.8C19 14.8 12 21 12 21Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="12" cy="9.8" r="2.4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
