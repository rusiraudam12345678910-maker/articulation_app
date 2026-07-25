create table if not exists invites (
  id uuid primary key default gen_random_uuid(),
  code text not null unique default replace(gen_random_uuid()::text, '-', ''),
  email text not null,
  role text not null default 'user',
  created_by uuid references auth.users(id) not null,
  used_by uuid references auth.users(id),
  used_at timestamptz,
  created_at timestamptz default now()
);

alter table invites enable row level security;

-- Only accessible via the service role (admin server actions); no direct client access.
create policy "No direct access" on invites for all using (false) with check (false);

create index if not exists invites_email on invites (lower(email));
create index if not exists invites_code on invites (code);
