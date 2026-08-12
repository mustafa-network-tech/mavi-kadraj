create extension if not exists pgcrypto;

create type public.mavi_kadraj_message_status as enum ('pending', 'approved', 'rejected');
create type public.mavi_kadraj_reaction as enum ('dove', 'sparkle', 'camera', 'autumn_leaf', 'green_leaf');

create table public.mavi_kadraj_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null check (char_length(name) between 2 and 60),
  message text not null check (char_length(message) between 3 and 800),
  status public.mavi_kadraj_message_status not null default 'pending',
  created_at timestamptz not null default now(),
  approved_at timestamptz,
  is_featured boolean not null default false
);

create table public.mavi_kadraj_message_reactions (
  id uuid primary key default gen_random_uuid(),
  message_id uuid not null references public.mavi_kadraj_messages(id) on delete cascade,
  reaction public.mavi_kadraj_reaction not null,
  visitor_id text not null check (char_length(visitor_id) = 64),
  created_at timestamptz not null default now(),
  unique (visitor_id, message_id)
);

create table public.mavi_kadraj_submission_limits (
  visitor_id text primary key check (char_length(visitor_id) = 64),
  last_submitted_at timestamptz not null default now()
);

create table public.mavi_kadraj_admins (
  user_id uuid primary key references auth.users(id) on delete cascade,
  created_at timestamptz not null default now()
);

create index mavi_kadraj_messages_public_idx on public.mavi_kadraj_messages (is_featured desc, approved_at desc) where status = 'approved';
create index mavi_kadraj_reactions_message_idx on public.mavi_kadraj_message_reactions (message_id, reaction);

alter table public.mavi_kadraj_messages enable row level security;
alter table public.mavi_kadraj_message_reactions enable row level security;
alter table public.mavi_kadraj_submission_limits enable row level security;
alter table public.mavi_kadraj_admins enable row level security;

create or replace function public.is_mavi_kadraj_admin()
returns boolean language sql stable security definer set search_path = public as $$
  select exists (select 1 from public.mavi_kadraj_admins where user_id = auth.uid());
$$;

create policy "Public reads approved Mavi Kadraj messages"
on public.mavi_kadraj_messages for select to anon, authenticated
using (status = 'approved' or public.is_mavi_kadraj_admin());

create policy "Anonymous visitors submit pending Mavi Kadraj messages"
on public.mavi_kadraj_messages for insert to anon
with check (status = 'pending' and approved_at is null and is_featured = false);

create policy "Authenticated admin manages Mavi Kadraj messages"
on public.mavi_kadraj_messages for all to authenticated
using (public.is_mavi_kadraj_admin()) with check (public.is_mavi_kadraj_admin());

create policy "Public reads reactions for approved messages"
on public.mavi_kadraj_message_reactions for select to anon, authenticated
using (
  exists (
    select 1 from public.mavi_kadraj_messages m
    where m.id = message_id and (m.status = 'approved' or public.is_mavi_kadraj_admin())
  )
);

create policy "Authenticated admin manages Mavi Kadraj reactions"
on public.mavi_kadraj_message_reactions for all to authenticated
using (public.is_mavi_kadraj_admin()) with check (public.is_mavi_kadraj_admin());

create policy "Authenticated admin reads rate limits"
on public.mavi_kadraj_submission_limits for select to authenticated
using (public.is_mavi_kadraj_admin());

create policy "Mavi Kadraj admins see own membership"
on public.mavi_kadraj_admins for select to authenticated
using (user_id = auth.uid());

create or replace function public.mavi_kadraj_set_approved_at()
returns trigger language plpgsql set search_path = public as $$
begin
  if new.status = 'approved' and old.status is distinct from 'approved' then
    new.approved_at = now();
  elsif new.status <> 'approved' then
    new.approved_at = null;
    new.is_featured = false;
  end if;
  return new;
end;
$$;

create trigger mavi_kadraj_messages_approved_at
before update of status on public.mavi_kadraj_messages
for each row execute function public.mavi_kadraj_set_approved_at();

revoke all on public.mavi_kadraj_submission_limits from anon, authenticated;
revoke all on public.mavi_kadraj_admins from anon, authenticated;
grant select on public.mavi_kadraj_admins to authenticated;
grant execute on function public.is_mavi_kadraj_admin() to anon, authenticated;
