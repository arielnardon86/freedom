-- Freedom Fotografía — esquema (Postgres simple, sin RLS)
--
-- Funciona igual en local (Postgres de Homebrew, ver README) y en Clever
-- Cloud: es el mismo SQL, solo cambia DATABASE_URL en .env.local.
--
-- Local:
--   createdb freedom_fotografia
--   psql -d freedom_fotografia -f db/schema.sql
--
-- Clever Cloud:
--   psql "$POSTGRESQL_ADDON_URI" -f db/schema.sql

create extension if not exists "pgcrypto";

create type user_role as enum ('admin', 'client');

create type event_type as enum (
  'casamiento',
  '15_anos',
  'cumpleanos',
  'egresados',
  'sesion_particular',
  'corporativo'
);

create type payment_status as enum ('pendiente', 'parcial', 'pagado');

create table users (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null unique,
  password_hash text not null,
  phone text,
  birth_date date,
  role user_role not null default 'client',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table events (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  cliente_id uuid references users (id) on delete set null,
  fecha_evento date not null,
  lugar text,
  tipo_evento event_type not null,
  drive_link text,
  entregado boolean not null default false,
  estado_pago payment_status not null default 'pendiente',
  invite_slug text unique, -- se usa en la próxima etapa (landing de invitación)
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index events_cliente_id_idx on events (cliente_id);
create index events_fecha_evento_idx on events (fecha_evento);

create function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create trigger users_set_updated_at
  before update on users
  for each row execute function set_updated_at();

create trigger events_set_updated_at
  before update on events
  for each row execute function set_updated_at();

-- No hay RLS: la única puerta de entrada a estas tablas son los Server
-- Actions/Server Components de Next.js, que ya verifican sesión y rol antes
-- de consultar. No hay PostgREST ni acceso directo desde el browser.

-- El primer admin se crea con `npm run db:seed` (ver scripts/seed-admin.ts).
