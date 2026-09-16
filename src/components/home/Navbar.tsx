"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { contact, navLinks } from "@/lib/content";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-background/90 backdrop-blur-md border-b border-border"
          : "bg-gradient-to-b from-black/50 to-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-3 lg:px-10">
        <Link href="/#inicio" className="flex items-center">
          <Image
            src="/images/logo-freedom-wordmark.png"
            alt="Freedom Fotografía"
            width={181}
            height={56}
            className="h-9 w-auto sm:h-10"
            priority
          />
        </Link>

        <ul className="hidden items-center gap-9 lg:flex">
          {navLinks.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-foreground/80 transition-colors hover:text-gold"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="hidden items-center gap-6 lg:flex">
          <Link
            href="/ingresar"
            className="text-[0.8rem] font-medium uppercase tracking-[0.12em] text-foreground/80 transition-colors hover:text-gold"
          >
            Ingresar
          </Link>
          <Button
            href={contact.whatsapp}
            target="_blank"
            rel="noreferrer"
            variant="primary"
            className="px-6 py-3 text-[0.72rem]"
          >
            Reservar Fecha
          </Button>
        </div>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 lg:hidden"
        >
          <span
            className={`h-px w-6 bg-foreground transition-transform duration-200 ${
              open ? "translate-y-[3.5px] rotate-45" : ""
            }`}
          />
          <span
            className={`h-px w-6 bg-foreground transition-opacity duration-200 ${
              open ? "opacity-0" : "opacity-100"
            }`}
          />
          <span
            className={`h-px w-6 bg-foreground transition-transform duration-200 ${
              open ? "-translate-y-[5.5px] -rotate-45" : ""
            }`}
          />
        </button>
      </nav>

      {open ? (
        <div className="border-t border-border bg-background px-6 pb-8 pt-4 lg:hidden">
          <ul className="flex flex-col gap-5">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="text-sm font-medium uppercase tracking-[0.12em] text-foreground/85 hover:text-gold"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex flex-col gap-3">
            <Button
              href={contact.whatsapp}
              target="_blank"
              rel="noreferrer"
              variant="primary"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Reservar Fecha
            </Button>
            <Button
              href="/ingresar"
              variant="outline"
              className="w-full"
              onClick={() => setOpen(false)}
            >
              Ingresar
            </Button>
          </div>
        </div>
      ) : null}
    </header>
  );
}
