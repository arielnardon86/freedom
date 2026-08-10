import { AuthCard } from "@/components/ui/AuthCard";
import { Button } from "@/components/ui/Button";

const inputClasses =
  "w-full rounded-lg border border-border bg-background px-4 py-3 text-sm text-foreground placeholder:text-muted-soft focus:border-gold focus:outline-none";

export default function PortalLoginPage() {
  return (
    <AuthCard
      title="Accedé a tus fotos"
      description="Ingresá con el email que usaste al reservar tu evento."
    >
      <form className="flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-xs font-medium text-muted">
            Email
          </label>
          <input
            id="email"
            type="email"
            placeholder="tu@email.com"
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
          Ingresar
        </Button>

        <p className="text-center text-xs text-muted-soft">
          El acceso todavía no está conectado — se habilita en la próxima etapa.
        </p>
      </form>
    </AuthCard>
  );
}
