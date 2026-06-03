create table if not exists definitions (
  id uuid primary key default gen_random_uuid(),
  word text not null,
  part_of_speech text,
  definition text not null,
  example text,
  saved_by uuid references auth.users(id),
  created_at timestamptz default now()
);

alter table definitions enable row level security;

create policy "Public read" on definitions for select using (true);
create policy "Auth insert" on definitions for insert with check (auth.uid() = saved_by);
