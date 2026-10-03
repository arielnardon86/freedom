import postgres from "postgres";

declare global {
  // eslint-disable-next-line no-var
  var __sql: ReturnType<typeof postgres> | undefined;
}

// postgres.js parsea date/timestamp a objetos Date por defecto; acá se
// mantienen como string (igual que antes con Supabase/PostgREST) porque el
// resto del código — inputs type="date", tipos en lib/types.ts — asume
// strings "YYYY-MM-DD" / ISO.
const stringDate = { to: 1082, from: [1082, 1114, 1184], serialize: String, parse: String };

// Clever Cloud (plan Dev) limita el rol de la base a 5 conexiones
// simultáneas como máximo (rolconnlimit = 5, verificado contra la base).
// Con el pool por default de postgres.js (max: 10) un solo proceso del
// server ya podría agotarlo él solo. Se deja un máximo bajo y se liberan
// las conexiones ociosas rápido para no acaparar los pocos slots
// disponibles entre ráfagas de tráfico.
//
// Reutiliza la conexión entre hot-reloads en dev (evita agotar el pool de
// Postgres cada vez que Next.js recompila).
export const sql =
  globalThis.__sql ??
  postgres(process.env.DATABASE_URL ?? "", {
    onnotice: () => {},
    types: { date: stringDate },
    max: 3,
    idle_timeout: 20,
    max_lifetime: 60 * 30,
    connect_timeout: 10,
  });

if (process.env.NODE_ENV !== "production") {
  globalThis.__sql = sql;
}

// Mientras no haya una base conectada, las páginas de admin muestran un
// aviso en vez de intentar consultar y romper.
export function isDatabaseConfigured() {
  return Boolean(process.env.DATABASE_URL);
}

export const DATABASE_NOT_CONFIGURED_MESSAGE =
  "El sitio todavía no está conectado a la base de datos. Configurá DATABASE_URL en .env.local.";
