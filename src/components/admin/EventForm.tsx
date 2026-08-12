"use client";

import { useActionState } from "react";
import { FormField, fieldInputClasses } from "@/components/ui/FormField";
import { Button } from "@/components/ui/Button";
import {
  createEvent,
  updateEvent,
  type EventFormState,
} from "@/app/admin/(dashboard)/eventos/actions";
import { eventTypeLabels, paymentStatusLabels } from "@/lib/types";
import type { Event, Profile } from "@/lib/types";

const initialState: EventFormState = { error: null };

export function EventForm({
  clients,
  event,
}: {
  clients: Profile[];
  event?: Event;
}) {
  const action = event ? updateEvent.bind(null, event.id) : createEvent;
  const [state, formAction, pending] = useActionState(action, initialState);

  return (
    <form action={formAction} className="flex flex-col gap-5">
      <FormField label="Nombre del evento" htmlFor="nombre">
        <input
          id="nombre"
          name="nombre"
          required
          defaultValue={event?.nombre}
          placeholder="Ej: 15 de Sofía"
          className={fieldInputClasses}
        />
      </FormField>

      <div className="grid gap-5 sm:grid-cols-2">
        <FormField label="Cliente" htmlFor="cliente_id">
          <select
            id="cliente_id"
            name="cliente_id"
            defaultValue={event?.cliente_id ?? ""}
            className={fieldInputClasses}
          >
            <option value="">Sin asignar</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>
                {c.full_name}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Tipo de evento" htmlFor="tipo_evento">
          <select
            id="tipo_evento"
            name="tipo_evento"
            required
            defaultValue={event?.tipo_evento ?? ""}
            className={fieldInputClasses}
          >
            <option value="" disabled>
              Elegir...
            </option>
            {Object.entries(eventTypeLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Fecha del evento" htmlFor="fecha_evento">
          <input
            id="fecha_evento"
            name="fecha_evento"
            type="date"
            required
            defaultValue={event?.fecha_evento}
            className={fieldInputClasses}
          />
        </FormField>

        <FormField label="Lugar" htmlFor="lugar">
          <input
            id="lugar"
            name="lugar"
            defaultValue={event?.lugar ?? ""}
            placeholder="Salón, dirección..."
            className={fieldInputClasses}
          />
        </FormField>

        <FormField label="Estado de pago" htmlFor="estado_pago">
          <select
            id="estado_pago"
            name="estado_pago"
            defaultValue={event?.estado_pago ?? "pendiente"}
            className={fieldInputClasses}
          >
            {Object.entries(paymentStatusLabels).map(([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </FormField>

        <FormField label="Entrega" htmlFor="entregado">
          <label className="flex items-center gap-2 py-3 text-sm text-foreground">
            <input
              id="entregado"
              name="entregado"
              type="checkbox"
              defaultChecked={event?.entregado}
              className="h-4 w-4 accent-gold"
            />
            Fotos entregadas
          </label>
        </FormField>
      </div>

      <FormField
        label="Link de la carpeta de Drive"
        htmlFor="drive_link"
        hint="La carpeta debe estar compartida como 'cualquiera con el link puede ver'."
      >
        <input
          id="drive_link"
          name="drive_link"
          type="url"
          defaultValue={event?.drive_link ?? ""}
          placeholder="https://drive.google.com/..."
          className={fieldInputClasses}
        />
      </FormField>

      {state.error ? (
        <p className="rounded-lg border border-red-900/40 bg-red-950/30 px-3 py-2 text-xs text-red-300">
          {state.error}
        </p>
      ) : null}

      <div className="flex gap-3">
        <Button type="submit" variant="primary" disabled={pending}>
          {pending ? "Guardando..." : event ? "Guardar cambios" : "Crear evento"}
        </Button>
        <Button href="/admin/eventos" variant="ghost">
          Cancelar
        </Button>
      </div>
    </form>
  );
}
