"use server";

import { sql, isDatabaseConfigured } from "@/lib/db";

// Landing pública: sin sesión, sin cuentas de invitado. El "visitor_id" es un
// uuid generado en el navegador (localStorage) que llega como parámetro.

export async function setLike(
  eventId: string,
  driveFileId: string,
  visitorId: string,
  liked: boolean,
) {
  if (!isDatabaseConfigured()) return;
  if (!eventId || !driveFileId || !visitorId) return;

  if (liked) {
    await sql`
      insert into photo_likes (event_id, drive_file_id, visitor_id)
      values (${eventId}, ${driveFileId}, ${visitorId})
      on conflict (event_id, drive_file_id, visitor_id) do nothing
    `;
  } else {
    await sql`
      delete from photo_likes
      where event_id = ${eventId}
        and drive_file_id = ${driveFileId}
        and visitor_id = ${visitorId}
    `;
  }
}

export type ReviewFormState = { success: boolean; error: string | null };

export async function submitReview(
  eventId: string,
  _prevState: ReviewFormState,
  formData: FormData,
): Promise<ReviewFormState> {
  if (!isDatabaseConfigured()) {
    return { success: false, error: "No se pudo enviar la reseña. Probá de nuevo más tarde." };
  }

  const author_name = String(formData.get("author_name") ?? "").trim().slice(0, 120);
  const rating = Number(formData.get("rating") ?? 0);
  const comment = String(formData.get("comment") ?? "").trim().slice(0, 1000);

  if (!author_name || !comment || rating < 1 || rating > 5) {
    return { success: false, error: "Completá tu nombre, una calificación y un comentario." };
  }

  await sql`
    insert into reviews (event_id, author_name, rating, comment)
    values (${eventId}, ${author_name}, ${rating}, ${comment})
  `;

  return { success: true, error: null };
}
