import { AuthCard } from "@/components/ui/AuthCard";
import { Button } from "@/components/ui/Button";

const inputClasses =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-soft focus:border-gold focus:outline-none";

export default function AdminLoginPage() {
  return (
    <AuthCard
      title="Ingreso al panel"
      description="Acceso exclusivo para el equipo de Freedom Fotografía."
    >
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-medium text-muted">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="tu@fotosfreedom.com"
            className={inputClasses}
            disabled
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-xs font-medium text-muted">
            Contraseña
          </label>
          <input
            id="password"
            type="password"
            placeholder="••••••••"
            className={inputClasses}
            disabled
          />
        </div>

        <Button type="submit" variant="primary" className="mt-2 w-full" disabled>
          Iniciar sesión
        </Button>

        <p className="text-center text-xs text-muted-soft">
          El acceso todavía no está conectado — se habilita en la próxima etapa.
        </p>
      </form>
    </AuthCard>
  );
}
