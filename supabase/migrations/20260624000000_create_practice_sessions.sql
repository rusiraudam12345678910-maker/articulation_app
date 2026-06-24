alter table entries add column if not exists last_practiced_at timestamptz;

create table if not exists practice_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  entry_id uuid references entries(id) on delete cascade,
  mode text not null,           -- 'word-endings' | 'minimal-pairs' | 'shadow' | 'free'
  drill_text text not null,
  practiced_at timestamptz default now()
);

alter table practice_sessions enable row level security;

create policy "Own sessions only" on practice_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists practice_sessions_user_practiced
  on practice_sessions (user_id, practiced_at desc);
