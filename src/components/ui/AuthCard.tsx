import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export function AuthCard({ title, description, children }: AuthCardProps) {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background px-6 py-16">
      <div className="w-full max-w-sm">
        <Link href="/" className="mb-8 flex justify-center">
          <Image
            src="/images/logo-freedom-wordmark.png"
            alt="Freedom Fotografía"
            width={181}
            height={56}
            className="h-10 w-auto"
          />
        </Link>

        <div className="rounded-2xl border border-border bg-background-elevated p-8">
          <h1 className="font-display text-xl font-semibold text-foreground">
            {title}
          </h1>
          <p className="mt-1.5 text-sm text-muted">{description}</p>

          <div className="mt-7">{children}</div>
        </div>

        <Link
          href="/"
          className="mt-6 block text-center text-xs uppercase tracking-[0.14em] text-muted transition-colors hover:text-gold"
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
}
