-- Malo Bank: ranking de los 10 jugadores con más Ups ganados.
-- Correr UNA vez en Supabase > SQL Editor (proyecto lhqncvupwlfmpjmietfp).
-- Se puede volver a correr sin romper nada.

create table if not exists public.ranking (
  clave      uuid primary key,              -- secreto del jugador, solo vive en su navegador
  nombre     text not null,
  ups        bigint not null default 0,      -- Ups ganados en total (no baja al canjear cupones)
  creado     timestamptz not null default now(),
  actualizado timestamptz not null default now()
);
create unique index if not exists ranking_nombre_unico on public.ranking (lower(nombre));
create index if not exists ranking_ups on public.ranking (ups desc);

alter table public.ranking enable row level security;

-- Cualquiera puede ver el ranking, pero solo el nombre, los Ups y la fecha (la clave nunca se publica).
revoke all on public.ranking from anon, authenticated;
grant select (nombre, ups, actualizado) on public.ranking to anon, authenticated;
drop policy if exists ranking_leer on public.ranking;
create policy ranking_leer on public.ranking for select to anon, authenticated using (true);

-- Nadie escribe directo en la tabla: solo por esta función, que valida todo.
create or replace function public.subir_ups(p_clave uuid, p_nombre text, p_ups bigint)
returns table (puesto bigint, nombre text, ups bigint)
language plpgsql security definer set search_path = public as $$
declare
  n text := btrim(regexp_replace(coalesce(p_nombre, ''), '\s+', ' ', 'g'));
  fila public.ranking;
  nuevo bigint;
begin
  if p_clave is null then raise exception 'clave' using errcode = 'P0001'; end if;
  if char_length(n) < 3 or char_length(n) > 14 or n !~ '^[A-Za-z0-9ÁÉÍÓÚÜÑáéíóúüñ_. -]+$' then
    raise exception 'nombre_invalido' using errcode = 'P0001';
  end if;
  if p_ups is null or p_ups < 0 then raise exception 'ups' using errcode = 'P0001'; end if;

  select * into fila from public.ranking r where r.clave = p_clave for update;

  if exists (select 1 from public.ranking r where lower(r.nombre) = lower(n) and r.clave <> p_clave) then
    raise exception 'nombre_ocupado' using errcode = 'P0001';
  end if;

  if not found then
    -- Primera vez: se acepta el progreso que ya traía (con un tope razonable).
    nuevo := least(p_ups, 150000);
    insert into public.ranking (clave, nombre, ups) values (p_clave, n, nuevo);
  else
    -- Anti trampa básico: una pelea da ~3000 Ups como máximo y dura más de un minuto,
    -- así que se aceptan hasta 3000 Ups por minuto desde el último envío
    -- (mínimo 6000, máximo 60000 de una vez). Los Ups nunca bajan.
    nuevo := greatest(fila.ups, least(p_ups, fila.ups + least(60000, greatest(6000,
      (3000 * extract(epoch from now() - fila.actualizado) / 60)::bigint)))));
    update public.ranking r set nombre = n, ups = nuevo,
      actualizado = case when nuevo <> fila.ups or n <> fila.nombre then now() else fila.actualizado end
      where r.clave = p_clave;
  end if;

  return query
    select (select count(*) + 1 from public.ranking r2 where r2.ups > nuevo), n, nuevo;
end $$;

revoke all on function public.subir_ups(uuid, text, bigint) from public;
grant execute on function public.subir_ups(uuid, text, bigint) to anon, authenticated;

-- "Borrar mi progreso" en Acerca de: saca al jugador del ranking.
create or replace function public.borrar_ranking(p_clave uuid)
returns void language sql security definer set search_path = public as $$
  delete from public.ranking where clave = p_clave;
$$;
revoke all on function public.borrar_ranking(uuid) from public;
grant execute on function public.borrar_ranking(uuid) to anon, authenticated;

-- Para moderar: borrar un nombre feo o que use el nombre de una persona real.
-- delete from public.ranking where lower(nombre) = lower('ElNombre');
