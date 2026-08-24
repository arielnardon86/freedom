"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { sql, isDatabaseConfigured, DATABASE_NOT_CONFIGURED_MESSAGE } from "@/lib/db";
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
  if (!isDatabaseConfigured()) {
    return { error: DATABASE_NOT_CONFIGURED_MESSAGE };
  }

  const values = parseEventForm(formData);
  if (!values.nombre || !values.fecha_evento || !values.tipo_evento) {
    return { error: "Completá nombre, fecha y tipo de evento." };
  }

  try {
    await sql`insert into events ${sql(values)}`;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "No se pudo crear el evento." };
  }

  revalidatePath("/admin/eventos");
  redirect("/admin/eventos");
}

export async function updateEvent(
  id: string,
  _prevState: EventFormState,
  formData: FormData,
): Promise<EventFormState> {
  if (!isDatabaseConfigured()) {
    return { error: DATABASE_NOT_CONFIGURED_MESSAGE };
  }

  const values = parseEventForm(formData);
  if (!values.nombre || !values.fecha_evento || !values.tipo_evento) {
    return { error: "Completá nombre, fecha y tipo de evento." };
  }

  try {
    await sql`update events set ${sql(values)} where id = ${id}`;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "No se pudo guardar el evento." };
  }

  revalidatePath("/admin/eventos");
  redirect("/admin/eventos");
}

export async function deleteEvent(formData: FormData) {
  if (!isDatabaseConfigured()) return;

  const id = String(formData.get("id") ?? "");
  if (!id) return;

  await sql`delete from events where id = ${id}`;

  revalidatePath("/admin/eventos");
  redirect("/admin/eventos");
}

function slugify(text: string) {
  return text
    .normalize("NFD")
    .replace(new RegExp("[\\u0300-\\u036f]", "g"), "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function randomSuffix(length = 5) {
  return Math.random().toString(36).slice(2, 2 + length);
}

export async function generateInviteSlug(formData: FormData) {
  if (!isDatabaseConfigured()) return;

  const eventId = String(formData.get("id") ?? "");
  const [event] = await sql<{ nombre: string }[]>`
    select nombre from events where id = ${eventId}
  `;
  if (!event) return;

  const base = slugify(event.nombre) || "evento";

  for (let attempt = 0; attempt < 5; attempt++) {
    const slug = `${base}-${randomSuffix()}`;
    try {
      await sql`update events set invite_slug = ${slug} where id = ${eventId}`;
      break;
    } catch (error) {
      if (attempt === 4) throw error;
    }
  }

  revalidatePath(`/admin/eventos/${eventId}`);
}

export async function approveReview(formData: FormData) {
  if (!isDatabaseConfigured()) return;

  const id = String(formData.get("id") ?? "");
  const eventId = String(formData.get("eventId") ?? "");
  if (!id) return;

  await sql`update reviews set approved = true where id = ${id}`;
  revalidatePath(`/admin/eventos/${eventId}`);
}

export async function deleteReview(formData: FormData) {
  if (!isDatabaseConfigured()) return;

  const id = String(formData.get("id") ?? "");
  const eventId = String(formData.get("eventId") ?? "");
  if (!id) return;

  await sql`delete from reviews where id = ${id}`;
  revalidatePath(`/admin/eventos/${eventId}`);
}
