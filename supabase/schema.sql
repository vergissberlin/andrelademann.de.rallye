create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  sequence_number bigint generated always as identity unique not null,
  created_at timestamptz not null default now(),
  session_hash text not null,
  user_agent_hash text not null
);

create index if not exists votes_created_at_idx on public.votes(created_at);
alter table public.votes enable row level security;
