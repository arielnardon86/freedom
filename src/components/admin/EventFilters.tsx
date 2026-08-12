"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { FormEvent } from "react";
import { eventTypeLabels, paymentStatusLabels } from "@/lib/types";
import type { Profile } from "@/lib/types";

const controlClasses =
  "rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-gold focus:outline-none";

export function EventFilters({ clients }: { clients: Profile[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function submit(form: HTMLFormElement) {
    const data = new FormData(form);
    const params = new URLSearchParams();
    data.forEach((value, key) => {
      if (typeof value === "string" && value.trim() !== "") params.set(key, value);
    });
    router.push(`/admin/eventos?${params.toString()}`);
  }

  function handleAutoSubmit(e: FormEvent<HTMLSelectElement | HTMLInputElement>) {
    submit(e.currentTarget.form as HTMLFormElement);
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        submit(e.currentTarget);
      }}
      className="flex flex-wrap items-end gap-3 rounded-2xl border border-border bg-background-elevated p-4"
    >
      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted" htmlFor="q">
          Buscar
        </label>
        <input
          id="q"
          name="q"
          defaultValue={searchParams.get("q") ?? ""}
          placeholder="Nombre del evento"
          className={controlClasses}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted" htmlFor="tipo">
          Tipo
        </label>
        <select
          id="tipo"
          name="tipo"
          defaultValue={searchParams.get("tipo") ?? ""}
          onChange={handleAutoSubmit}
          className={controlClasses}
        >
          <option value="">Todos</option>
          {Object.entries(eventTypeLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted" htmlFor="pago">
          Pago
        </label>
        <select
          id="pago"
          name="pago"
          defaultValue={searchParams.get("pago") ?? ""}
          onChange={handleAutoSubmit}
          className={controlClasses}
        >
          <option value="">Todos</option>
          {Object.entries(paymentStatusLabels).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted" htmlFor="entregado">
          Entregado
        </label>
        <select
          id="entregado"
          name="entregado"
          defaultValue={searchParams.get("entregado") ?? ""}
          onChange={handleAutoSubmit}
          className={controlClasses}
        >
          <option value="">Todos</option>
          <option value="si">Sí</option>
          <option value="no">No</option>
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted" htmlFor="cliente">
          Cliente
        </label>
        <select
          id="cliente"
          name="cliente"
          defaultValue={searchParams.get("cliente") ?? ""}
          onChange={handleAutoSubmit}
          className={controlClasses}
        >
          <option value="">Todos</option>
          {clients.map((c) => (
            <option key={c.id} value={c.id}>
              {c.full_name}
            </option>
          ))}
        </select>
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted" htmlFor="desde">
          Desde
        </label>
        <input
          id="desde"
          name="desde"
          type="date"
          defaultValue={searchParams.get("desde") ?? ""}
          onChange={handleAutoSubmit}
          className={controlClasses}
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-muted" htmlFor="hasta">
          Hasta
        </label>
        <input
          id="hasta"
          name="hasta"
          type="date"
          defaultValue={searchParams.get("hasta") ?? ""}
          onChange={handleAutoSubmit}
          className={controlClasses}
        />
      </div>

      <div className="flex gap-2">
        <button
          type="submit"
          className="rounded-lg border border-border-strong px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-foreground transition-colors hover:border-gold hover:text-gold"
        >
          Filtrar
        </button>
        <a
          href="/admin/eventos"
          className="rounded-lg px-4 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-muted transition-colors hover:text-gold"
        >
          Limpiar
        </a>
      </div>
    </form>
  );
}
