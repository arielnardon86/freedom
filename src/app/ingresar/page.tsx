import { AuthCard } from "@/components/ui/AuthCard";
import { LoginForm } from "@/components/auth/LoginForm";

export default function IngresarPage() {
  return (
    <AuthCard
      title="Ingresar"
      description="Accedé con tus credenciales de administrador o de cliente."
    >
      <LoginForm />
    </AuthCard>
  );
}
