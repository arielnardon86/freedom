"use client";

import { useActionState } from "react";
import { FormField, fieldInputClasses } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import {
  createUser,
  updateUser,
  type UserFormState,
} from "@/app/admin/(dashboard)/usuarios/actions";
import type { Profile } from "@/lib/types";

const initialState: UserFormState = { error: null };

export function UserForm({ profile }: { profile?: Profile }) {
  const action = profile ? updateUser.bind(null, profile.id) : createUser;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <FormField label="Nombre completo" htmlFor="full_name">
        <input
          id="full_name"
          name="full_name"
          required
          defaultValue={profile?.full_name}
          className={fieldInputClasses}
        />
      </FormField>

      {profile ? (
        <FormField label="Email" htmlFor="email" hint="El email no se puede editar acá.">
          <input id="email" value={profile.email ?? ""} disabled className={fieldInputClasses} />
        </FormField>
      ) : (
        <FormField label="Email" htmlFor="email">
          <input id="email" name="email" type="email" required className={fieldInputClasses} />
        </FormField>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Teléfono" htmlFor="phone">
          <input
            id="phone"
            name="phone"
            defaultValue={profile?.phone ?? ""}
            placeholder="+54 9 351..."
            className={fieldInputClasses}
          />
        </FormField>

        <FormField
          label="Fecha de nacimiento"
          htmlFor="birth_date"
          hint="Se usa para el saludo de cumpleaños/aniversario."
        >
          <input
            id="birth_date"
            name="birth_date"
            type="date"
            defaultValue={profile?.birth_date ?? ""}
            className={fieldInputClasses}
          />
        </FormField>

        <FormField label="Rol" htmlFor="role">
          <select
            id="role"
            name="role"
            defaultValue={profile?.role ?? "client"}
            className={fieldInputClasses}
          >
            <option value="client">Cliente</option>
            <option value="admin">Administrador</option>
          </select>
        </FormField>

        {!profile ? (
          <FormField
            label="Contraseña inicial"
            htmlFor="password"
            hint="Mínimo 8 caracteres. Se la compartís al usuario para que ingrese."
          >
            <input
              id="password"
              name="password"
              type="password"
              required
              minLength={8}
              className={fieldInputClasses}
            />
          </FormField>
        ) : null}
      </div>

      {state.error ? (
        <p className="rounded-lg border border-red-900/40 bg-red-950/30 px-3 py-2 text-xs text-red-300">
          {state.error}
        </p>
      ) : null}

      <div className="flex flex-wrap gap-3">
        <Button type="submit" variant="primary" disabled={pending}>
          {pending ? "Guardando..." : profile ? "Guardar cambios" : "Crear usuario"}
        </Button>
        <Button href="/admin/usuarios" variant="ghost">
          Cancelar
        </Button>
      </div>
    </form>
  );
}
