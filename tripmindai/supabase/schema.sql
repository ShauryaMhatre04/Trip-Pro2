-- ============================================================
-- TripMindAI Supabase Schema
-- Run this in Supabase Dashboard > SQL Editor
-- ============================================================

-- Trips table
create table if not exists public.trips (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  destination text not null,
  start_date date,
  end_date date,
  budget numeric(12,2) not null default 0,
  currency text not null default 'USD',
  cover_image_url text,
  ai_itinerary text,
  status text not null default 'planning' check (status in ('planning','upcoming','completed')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

-- Expenses table (CRUD target #2, feeds the analytics dashboard)
create table if not exists public.expenses (
  id uuid primary key default gen_random_uuid(),
  trip_id uuid not null references public.trips(id) on delete cascade,
  user_id uuid not null references auth.users(id) on delete cascade,
  category text not null check (category in ('flights','stay','food','transport','activities','shopping','other')),
  description text,
  amount numeric(12,2) not null,
  spent_on date not null default current_date,
  source text not null default 'manual' check (source in ('manual','ai_receipt_scan')),
  created_at timestamptz not null default now()
);

create index if not exists trips_user_id_idx on public.trips(user_id);
create index if not exists expenses_trip_id_idx on public.expenses(trip_id);
create index if not exists expenses_user_id_idx on public.expenses(user_id);

-- Keep updated_at fresh
create or replace function public.set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists trips_set_updated_at on public.trips;
create trigger trips_set_updated_at
  before update on public.trips
  for each row execute procedure public.set_updated_at();

-- ============================================================
-- Row Level Security: every user can only see/edit their own data
-- ============================================================
alter table public.trips enable row level security;
alter table public.expenses enable row level security;

drop policy if exists "trips_select_own" on public.trips;
create policy "trips_select_own" on public.trips
  for select using (auth.uid() = user_id);

drop policy if exists "trips_insert_own" on public.trips;
create policy "trips_insert_own" on public.trips
  for insert with check (auth.uid() = user_id);

drop policy if exists "trips_update_own" on public.trips;
create policy "trips_update_own" on public.trips
  for update using (auth.uid() = user_id);

drop policy if exists "trips_delete_own" on public.trips;
create policy "trips_delete_own" on public.trips
  for delete using (auth.uid() = user_id);

drop policy if exists "expenses_select_own" on public.expenses;
create policy "expenses_select_own" on public.expenses
  for select using (auth.uid() = user_id);

drop policy if exists "expenses_insert_own" on public.expenses;
create policy "expenses_insert_own" on public.expenses
  for insert with check (auth.uid() = user_id);

drop policy if exists "expenses_update_own" on public.expenses;
create policy "expenses_update_own" on public.expenses
  for update using (auth.uid() = user_id);

drop policy if exists "expenses_delete_own" on public.expenses;
create policy "expenses_delete_own" on public.expenses
  for delete using (auth.uid() = user_id);
