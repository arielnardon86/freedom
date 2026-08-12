import Image from "next/image";
import Link from "next/link";
import { SignOutButton } from "@/components/ui/SignOutButton";

export function PortalNav() {
  return (
    <header className="border-b border-border bg-background-elevated">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4 sm:px-10">
        <Link href="/portal">
          <Image
            src="/images/logo-freedom-wordmark.png"
            alt="Freedom Fotografía"
            width={130}
            height={40}
            className="h-8 w-auto"
          />
        </Link>

        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-muted sm:block">
            Portal de clientes
          </span>
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-gold/15 text-xs font-semibold text-gold">
            CL
          </span>
          <SignOutButton />
        </div>
      </div>
    </header>
  );
}
