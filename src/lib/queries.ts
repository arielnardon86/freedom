import { sql, isDatabaseConfigured } from "@/lib/db";
import type { Event, Profile, Review } from "@/lib/types";

const PROFILE_COLUMNS = sql`id, full_name, email, phone, birth_date, role, created_at, updated_at`;

export async function listClients(): Promise<Profile[]> {
  if (!isDatabaseConfigured()) return [];
  return sql<Profile[]>`
    select ${PROFILE_COLUMNS} from users
    where role = 'client'
    order by full_name
  `;
}

export async function listProfiles(): Promise<Profile[]> {
  if (!isDatabaseConfigured()) return [];
  return sql<Profile[]>`
    select ${PROFILE_COLUMNS} from users
    order by full_name
  `;
}

export async function getUserById(id: string): Promise<Profile | null> {
  if (!isDatabaseConfigured()) return null;
  const [user] = await sql<Profile[]>`
    select ${PROFILE_COLUMNS} from users where id = ${id}
  `;
  return user ?? null;
}

// Portal cliente: eventos del propio usuario logueado.
export async function listEventsForClient(clienteId: string): Promise<Event[]> {
  if (!isDatabaseConfigured()) return [];
  return sql<Event[]>`
    select * from events
    where cliente_id = ${clienteId}
    order by fecha_evento desc
  `;
}

export async function getEventForClient(
  id: string,
  clienteId: string,
): Promise<Event | null> {
  if (!isDatabaseConfigured()) return null;
  const [event] = await sql<Event[]>`
    select * from events where id = ${id} and cliente_id = ${clienteId}
  `;
  return event ?? null;
}

export async function listEventsWithInvite(): Promise<Event[]> {
  if (!isDatabaseConfigured()) return [];
  return sql<Event[]>`
    select * from events
    where invite_slug is not null
    order by fecha_evento desc
  `;
}

// Landing pública de invitación.
export async function getEventByInviteSlug(slug: string): Promise<Event | null> {
  if (!isDatabaseConfigured()) return null;
  const [event] = await sql<Event[]>`
    select * from events where invite_slug = ${slug}
  `;
  return event ?? null;
}

export async function getLikeCounts(eventId: string): Promise<Record<string, number>> {
  if (!isDatabaseConfigured()) return {};
  const rows = await sql<{ drive_file_id: string; count: number }[]>`
    select drive_file_id, count(*)::int as count
    from photo_likes
    where event_id = ${eventId}
    group by drive_file_id
  `;
  return Object.fromEntries(rows.map((r) => [r.drive_file_id, r.count]));
}

export async function listApprovedReviews(eventId: string): Promise<Review[]> {
  if (!isDatabaseConfigured()) return [];
  return sql<Review[]>`
    select * from reviews
    where event_id = ${eventId} and approved = true
    order by created_at desc
  `;
}

export async function listReviewsForEvent(eventId: string): Promise<Review[]> {
  if (!isDatabaseConfigured()) return [];
  return sql<Review[]>`
    select * from reviews
    where event_id = ${eventId}
    order by approved asc, created_at desc
  `;
}
