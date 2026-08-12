"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createAdminClient } from "@/lib/supabase/admin";
import { isSupabaseConfigured, SUPABASE_NOT_CONFIGURED_MESSAGE } from "@/lib/supabase/config";
import type { EventType, PaymentStatus } from "@/lib/types";

export type EventFormState = { error: string | null };

function parseEventForm(formData: FormData) {
  const nombre = String(formData.get("nombre") ?? "").trim();
  const cliente_id = String(formData.get("cliente_id") ?? "") || null;
  const fecha_evento = String(formData.get("fecha_evento") ?? "");
  const lugar = String(formData.get("lugar") ?? "").trim() || null;
  const tipo_evento = String(formData.get("tipo_evento") ?? "") as EventType;
  const drive_link = String(formData.get("drive_link") ?? "").trim() || null;
  const entregado = formData.get("entregado") === "on";
  const estado_pago = String(formData.get("estado_pago") ?? "pendiente") as PaymentStatus;

  return { nombre, cliente_id, fecha_evento, lugar, tipo_evento, drive_link, entregado, estado_pago };
}

export async function createEvent(
  _prevState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  if (!isSupabaseConfigured()) {
    return { error: SUPABASE_NOT_CONFIGURED_MESSAGE };
  }

  const values = parseEventForm(formData);
  if (!values.nombre || !values.fecha_evento || !values.tipo_evento) {
    return { error: "Completá nombre, fecha y tipo de evento." };
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("events").insert(values);
  if (error) return { error: error.message };

  revalidatePath("/admin/eventos");
  redirect("/admin/eventos");
}

export async function updateEvent(
  id: string,
  _prevState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  if (!isSupabaseConfigured()) {
    return { error: SUPABASE_NOT_CONFIGURED_MESSAGE };
  }

  const values = parseEventForm(formData);
  if (!values.nombre || !values.fecha_evento || !values.tipo_evento) {
    return { error: "Completá nombre, fecha y tipo de evento." };
  }

  const supabase = createAdminClient();
  const { error } = await supabase.from("events").update(values).eq("id", id);
  if (error) return { error: error.message };

  revalidatePath("/admin/eventos");
  redirect("/admin/eventos");
}

export async function deleteEvent(formData: FormData) {
  if (!isSupabaseConfigured()) return;

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  const supabase = createAdminClient();
  await supabase.from("events").delete().eq("id", id);

  revalidatePath("/admin/eventos");
  redirect("/admin/eventos");
}
