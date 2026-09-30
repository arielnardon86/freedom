-- Migra events.drive_link (un solo link) a events.drive_links (varios).
-- Correr una sola vez contra una base que ya tenga la tabla `events` con
-- la columna vieja `drive_link`. Para una base nueva alcanza con
-- db/schema.sql, que ya define drive_links directamente.

alter table events add column drive_links text[] not null default '{}';

update events
set drive_links = array[drive_link]
where drive_link is not null and drive_link <> '';

alter table events drop column drive_link;
