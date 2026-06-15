create table if not exists phrase_examples (
  id uuid primary key default gen_random_uuid(),
  phrase text not null unique,
  examples text[] not null default '{}',
  saved_by uuid references auth.users(id),
  created_at timestamptz default now()
);

alter table phrase_examples enable row level security;

create policy "Public read" on phrase_examples for select using (true);
create policy "Auth insert" on phrase_examples for insert with check (auth.uid() = saved_by);
create policy "Auth update" on phrase_examples for update using (auth.uid() = saved_by);
