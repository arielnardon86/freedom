import { sql, isDatabaseConfigured } from "@/lib/db";
import type { Profile } from "@/lib/types";

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
