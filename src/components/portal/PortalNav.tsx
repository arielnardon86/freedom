import Image from "next/image";
import Link from "next/link";
import { SignOutButton } from "@/components/ui/SignOutButton";

function initials(name: string) {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join("")
    .toUpperCase();
}

export function PortalNav({ userName }: { userName: string | null }) {
  return (
    <header className="border-b border-border bg-background-elevated">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/portal">
          <Image
            src="/images/logo-freedom-wordmark.png"
            alt="Freedom Fotografía"
            width={181}
            height={56}
            className="h-8 w-auto"
          />
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-muted sm:block">
            {userName ?? "Portal de clientes"}
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-xs font-semibold text-gold">
            {userName ? initials(userName) : "CL"}
          </span>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
