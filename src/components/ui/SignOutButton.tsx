import { signOut } from "@/lib/actions/auth";

export function SignOutButton({ className = "" }: { className?: string }) {
  return (
    <form action={signOut}>
      <button
        type="submit"
        className={`text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:text-gold ${className}`}
      >
        Cerrar sesión
      </button>
    </form>
  );
}
