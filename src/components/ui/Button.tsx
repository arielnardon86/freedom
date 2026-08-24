import Link from "next/link";
import type { ComponentPropsWithoutRef } from "react";

type Variant = "primary" | "outline" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-[0.8rem] font-semibold uppercase tracking-[0.14em] transition-colors duration-200 whitespace-nowrap";

const variants: Record<Variant, string> = {
  primary: "bg-gold text-[#171207] hover:bg-gold-light",
  outline:
    "border border-border-strong text-foreground hover:border-gold hover:text-gold",
  ghost: "text-foreground/80 hover:text-gold",
};

type ButtonProps = {
  variant?: Variant;
  href?: string;
  className?: string;
  target?: string;
  rel?: string;
} & ComponentPropsWithoutRef<"button">;

export function Button({
  variant = "primary",
  href,
  className = "",
  target,
  rel,
  children,
  ...props
}: ButtonProps) {
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} target={target} rel={rel}>
        {children}
      </Link>
    );
  }

  return (
    <button className={classes} {...props}>
      {children}
    </button>
  );
}
