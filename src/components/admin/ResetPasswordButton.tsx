"use client";

import { useActionState } from "react";
import { ConfirmSubmitButton } from "@/components/ui/ConfirmSubmitButton";
import {
  resetPassword,
  type ResetPasswordState,
} from "@/app/admin/(dashboard)/usuarios/actions";

const initialState: ResetPasswordState = { password: null, error: null };

export function ResetPasswordButton({ userId }: { userId: string }) {
  const action = resetPassword.bind(null, userId);
  const [state, formAction] = useActionState(action, initialState);

  return (
    <div className="flex flex-col gap-3">
      <form action={formAction}>
        <ConfirmSubmitButton
          label="Restablecer contraseña"
          confirmText="Esto genera una contraseña nueva y deja sin efecto la anterior. ¿Continuar?"
          className="rounded-full border border-border-strong px-6 py-2.5 text-xs font-semibold uppercase tracking-[0.12em] text-foreground transition-colors hover:border-gold hover:text-gold"
        />
      </form>

      {state.password ? (
        <div className="rounded-lg border border-gold/30 bg-gold/10 px-3 py-2 text-xs text-gold">
          Nueva contraseña temporal: <code className="font-mono">{state.password}</code>.
          Copiala y compartísela con el usuario — no se vuelve a mostrar.
        </div>
      ) : null}

      {state.error ? <p className="text-xs text-red-300">{state.error}</p> : null}
    </div>
  );
}
