-- Add source tracking to practice_items so items sent from Book2 reader are tagged
alter table practice_items
  add column if not exists source text default null,
  add column if not exists source_meta jsonb default null;
