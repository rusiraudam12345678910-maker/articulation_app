alter table entries add column if not exists tier text check (tier in ('$10', '$100', '$1000')) default null;
alter table entries add column if not exists is_studied boolean not null default false;
