-- Freedom Fotografía — esquema inicial (profiles + events)
-- Correr una sola vez en el SQL Editor de Supabase (Project > SQL Editor)
-- después de crear el proyecto.

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

-- Espejo de auth.users con los datos propios de la app.
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  phone text,
  birth_date date,
  role user_role not null default 'client',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table events (
  id uuid primary key default gen_random_uuid(),
  nombre text not null,
  cliente_id uuid references profiles (id) on delete set null,
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

create trigger profiles_set_updated_at
  before update on profiles
  for each row execute function set_updated_at();

create trigger events_set_updated_at
  before update on events
  for each row execute function set_updated_at();

-- Row Level Security.
-- El admin nunca lee/escribe con estas policies: las rutas /admin/** usan el
-- service role key desde el servidor (bypassa RLS) porque el acceso ya está
-- controlado por middleware + chequeo de rol. Estas políticas son para cuando
-- el portal cliente (próxima etapa) consulte sus propios datos con su sesión.

alter table profiles enable row level security;
alter table events enable row level security;

create policy "profiles: cada usuario lee su propia fila"
  on profiles for select
  using (id = auth.uid());

create policy "events: el cliente lee sus propios eventos"
  on events for select
  using (cliente_id = auth.uid());

-- Bootstrap del primer admin (no hay alta pública de usuarios):
-- 1. Dashboard de Supabase > Authentication > Add user (email + contraseña).
-- 2. Copiar el UID generado.
-- 3. Ejecutar, reemplazando los valores:
--    insert into profiles (id, full_name, role)
--    values ('<uid-copiado>', 'Nombre del admin', 'admin');
