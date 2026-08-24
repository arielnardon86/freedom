import { sql, isDatabaseConfigured } from "@/lib/db";
import type { Event, Profile } from "@/lib/types";

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
