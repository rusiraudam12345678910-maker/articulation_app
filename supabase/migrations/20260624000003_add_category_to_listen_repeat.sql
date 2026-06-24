alter table listen_repeat_items
  add column if not exists category text not null default 'Uncategorized';

create index if not exists listen_repeat_items_category
  on listen_repeat_items (user_id, category);
