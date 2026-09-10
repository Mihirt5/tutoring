-- Initial schema for Lucid platform user data.
-- Content (paths/units/lessons/problems) stays authored in-repo TS per v1 (see content/);
-- this migration only covers per-user state, mirroring ARCHITECTURE.md §3.

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'student' check (role in ('student','mentor','parent','admin')),
  name text,
  grade text,
  goals text,
  timezone text,
  streak_count int not null default 0,
  streak_last_day text,
  xp int not null default 0,
  created_at timestamptz not null default now()
);

-- Auto-create a profile row whenever a new Supabase auth user signs up.
create function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id) values (new.id);
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

create table public.mentor_links (
  mentor_id uuid not null references auth.users(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  status text not null default 'pending' check (status in ('pending', 'active', 'revoked')),
  primary key (mentor_id, student_id)
);

create table public.parent_links (
  parent_id uuid not null references auth.users(id) on delete cascade,
  student_id uuid not null references auth.users(id) on delete cascade,
  primary key (parent_id, student_id)
);

create table public.attempts (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  problem_id text not null,
  context text not null check (context in ('lesson', 'practice', 'contest', 'review')),
  correct boolean not null,
  answer_given jsonb,
  seconds int,
  hints_used int not null default 0,
  created_at timestamptz not null default now()
);

create table public.lesson_progress (
  user_id uuid not null references auth.users(id) on delete cascade,
  lesson_id text not null,
  status text not null default 'not_started' check (status in ('not_started', 'in_progress', 'completed')),
  blocks_completed jsonb not null default '[]'::jsonb,
  completed_at timestamptz,
  primary key (user_id, lesson_id)
);

create table public.topic_mastery (
  user_id uuid not null references auth.users(id) on delete cascade,
  topic_id text not null,
  rating numeric not null default 0,
  confidence numeric,
  n_attempts int not null default 0,
  last_seen timestamptz,
  primary key (user_id, topic_id)
);

create table public.review_items (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  ref_type text not null check (ref_type in ('problem', 'topic')),
  ref_id text not null,
  due_at timestamptz not null,
  interval_idx int not null default 0,
  lapses int not null default 0
);

create table public.contest_runs (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  track_id text not null,
  blueprint jsonb,
  answers jsonb,
  per_problem_seconds jsonb,
  score numeric,
  started_at timestamptz not null default now(),
  submitted_at timestamptz
);

create table public.badges (
  user_id uuid not null references auth.users(id) on delete cascade,
  badge_id text not null,
  earned_at timestamptz not null default now(),
  primary key (user_id, badge_id)
);

create table public.subscriptions (
  user_id uuid primary key references auth.users(id) on delete cascade,
  tier text not null default 'free' check (tier in ('free', 'cohort', 'intensive', 'private')),
  status text not null default 'active',
  renews_at timestamptz
);

create table public.coach_sessions (
  id bigint generated always as identity primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  problem_id text,
  transcript jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now()
);

-- Row-level security: every table is owner-scoped by default.
alter table public.profiles enable row level security;
alter table public.mentor_links enable row level security;
alter table public.parent_links enable row level security;
alter table public.attempts enable row level security;
alter table public.lesson_progress enable row level security;
alter table public.topic_mastery enable row level security;
alter table public.review_items enable row level security;
alter table public.contest_runs enable row level security;
alter table public.badges enable row level security;
alter table public.subscriptions enable row level security;
alter table public.coach_sessions enable row level security;

create policy "profiles: read own" on public.profiles for select using (auth.uid() = id);
create policy "profiles: update own" on public.profiles for update using (auth.uid() = id);

create policy "mentor_links: involved parties read" on public.mentor_links
  for select using (auth.uid() = mentor_id or auth.uid() = student_id);

create policy "parent_links: involved parties read" on public.parent_links
  for select using (auth.uid() = parent_id or auth.uid() = student_id);

create policy "attempts: own rows" on public.attempts
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "lesson_progress: own rows" on public.lesson_progress
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "topic_mastery: own rows" on public.topic_mastery
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "review_items: own rows" on public.review_items
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "contest_runs: own rows" on public.contest_runs
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "badges: own rows" on public.badges
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);

create policy "subscriptions: read own" on public.subscriptions
  for select using (auth.uid() = user_id);

create policy "coach_sessions: own rows" on public.coach_sessions
  for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
