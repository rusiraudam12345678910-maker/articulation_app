create table if not exists slow_drill_words (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  word text not null,
  created_at timestamptz default now(),
  unique (user_id, word)
);

alter table slow_drill_words enable row level security;

create policy "Own words only" on slow_drill_words
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
