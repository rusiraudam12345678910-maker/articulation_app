create table if not exists coach_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) not null,
  mode text not null,           -- 'free' | 'scenario'
  scenario_type text,           -- 'job_interview' | 'small_talk' | 'ordering_food' | null
  started_at timestamptz default now(),
  ended_at timestamptz
);

alter table coach_sessions enable row level security;

create policy "Own coach sessions only" on coach_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create index if not exists coach_sessions_user_started
  on coach_sessions (user_id, started_at desc);

create table if not exists coach_turns (
  id uuid primary key default gen_random_uuid(),
  session_id uuid references coach_sessions(id) on delete cascade not null,
  speaker text not null,        -- 'user' | 'ai'
  transcript text not null,
  created_at timestamptz default now()
);

alter table coach_turns enable row level security;

create policy "Own coach turns only" on coach_turns
  for all using (
    exists (select 1 from coach_sessions s where s.id = coach_turns.session_id and s.user_id = auth.uid())
  ) with check (
    exists (select 1 from coach_sessions s where s.id = coach_turns.session_id and s.user_id = auth.uid())
  );

create index if not exists coach_turns_session
  on coach_turns (session_id, created_at);

create table if not exists coach_corrections (
  id uuid primary key default gen_random_uuid(),
  turn_id uuid references coach_turns(id) on delete cascade not null,
  original text not null,
  corrected text not null,
  type text not null,           -- 'grammar' | 'phrasing' | 'vocabulary'
  explanation text,
  created_at timestamptz default now()
);

alter table coach_corrections enable row level security;

create policy "Own coach corrections only" on coach_corrections
  for all using (
    exists (
      select 1 from coach_turns t
      join coach_sessions s on s.id = t.session_id
      where t.id = coach_corrections.turn_id and s.user_id = auth.uid()
    )
  ) with check (
    exists (
      select 1 from coach_turns t
      join coach_sessions s on s.id = t.session_id
      where t.id = coach_corrections.turn_id and s.user_id = auth.uid()
    )
  );

create index if not exists coach_corrections_turn
  on coach_corrections (turn_id);
