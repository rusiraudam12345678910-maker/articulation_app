create table if not exists listen_repeat_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  content text not null,
  created_at timestamptz default now()
);

alter table listen_repeat_items enable row level security;

create policy "Own items only" on listen_repeat_items
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists listen_repeat_items_user
  on listen_repeat_items (user_id, created_at desc);
