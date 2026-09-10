# Lucid Platform — Architecture

A complete digital learning ecosystem for competition mathematics: MathDash's structured
progression, AoPS depth, Brilliant interactivity, Khan Academy clarity, Apple polish.
Students progress from elementary competition math through Olympiad level via interactive
lessons, guided discovery, adaptive practice, mentor feedback, and analytics.

**Core philosophy:** teach students how to *think* mathematically. Every topic builds
intuition → technique → proof → application → challenge → contest. Learning should feel
like progressing through an elite mathematics academy.

---

## 1. Sitemap

```
/                          Marketing (cinematic Three.js landing)
/login                     Log in (Supabase auth)
/signup                    Sign up (Supabase auth)
/learn                     Curriculum home — all paths, mastery rings, recommendations
/learn/[path]              Path detail — units, lessons, prerequisites, progress
/lesson/[slug]             Lesson player — block-by-block interactive experience
/problems                  Problem bank — search + filter (topic/difficulty/source/tags)
/problems/[id]             Problem workspace — attempt, hints, solution, AI coach
/contests                  Mock contest hub — simulations + readiness scores
/contests/[id]             Timed simulator → results & analytics
/review                    Spaced-repetition review queue (due today)
/dashboard                 Student analytics — mastery, heatmap, predictions, streaks
/coach                     AI math coach (standalone chat)
/mentor                    Mentor console (demo) — mastery map, mistakes, homework
/parent                    Parent dashboard (demo) — time, progress, weekly report
/api/coach                 Streaming Socratic tutoring endpoint
[v2] /admin                Content CMS, cohort management, analytics (documented, not built)
```

## 2. User Flows

**Student core loop**
```mermaid
graph LR
  A[/learn/] --> B[Pick recommended lesson]
  B --> C[Lesson player: intuition → examples → quizzes]
  C --> D[Practice problems w/ hint ladder]
  D --> E[Mastery + XP + SRS update]
  E --> F[Dashboard reflects change]
  F --> G{Weak topics?}
  G -- yes --> H[/review/ queue + recommendations]
  G -- ready --> I[Mock contest]
  I --> J[Results → suggested review lessons] --> A
```

**Contest flow:** hub → blueprint generates a timed exam sampled from the bank to match
the official difficulty curve → simulator (timer, answer sheet, flagging, per-problem
time capture) → scoring (official rules) → analytics (time/problem, accuracy by topic) →
review lessons pushed to the student's queue → predictor updates.

**Coach flow:** student asks from a problem workspace → context (problem + hidden
solution + mastery snapshot) injected server-side → model responds Socratically (never
reveals the answer; escalating hints; misconception diagnosis) → conversation can end in
a prerequisite-lesson recommendation.

**Mentor flow (v1 demo, v2 real):** mentor sees mastery map, lesson completion, weak
topics, recent mistakes, homework completion, contest history, upcoming goals; assigns
problem sets; writes weekly parent reports.

**Parent flow:** weekly progress digest, time studied, improvement graphs, completed
lessons, assignments, upcoming contests, mentor feedback.

## 3. Database Schema (live in Supabase Postgres via `supabase/migrations/`;
app code still reads/writes localStorage — wiring the store to these tables
instead is the next step, see §10)

```sql
-- auth.users is Supabase-managed (email, created_at, etc.); profiles extends it 1:1,
-- auto-created by an `on_auth_user_created` trigger on signup.
profiles         (id -> auth.users, role student|mentor|parent|admin, name, grade,
                  goals, timezone, streak_count, streak_last_day, xp, created_at)
mentor_links     (mentor_id, student_id, status)
parent_links     (parent_id, student_id)

-- Content (versioned, authored in-repo v1, CMS v2)
paths            (id, title, order, description)
units            (id, path_id, title, order)
lessons          (id, unit_id, slug, title, difficulty, est_minutes, objectives[], prereq_ids[])
lesson_blocks    (id, lesson_id, order, type, payload jsonb)
problems         (id, statement, answer_type, answer, choices jsonb, difficulty, est_minutes,
                  topic_id, subtopic, source_style, tags[], hints[3], solution,
                  alt_solutions[], common_mistakes[], related_ids[])
tracks           (id, name, prereq_lesson_ids[], topic_weights jsonb, score_model jsonb)

-- Learning state
attempts         (id, user_id, problem_id, context lesson|practice|contest|review,
                  correct, answer_given, seconds, hints_used, created_at)
lesson_progress  (user_id, lesson_id, status, blocks_completed, completed_at)
topic_mastery    (user_id, topic_id, rating 0-100, confidence, n_attempts, last_seen)
review_items     (user_id, ref_type problem|topic, ref_id, due_at, interval_idx, lapses)
contest_runs     (id, user_id, track_id, blueprint jsonb, answers jsonb,
                  per_problem_seconds jsonb, score, started_at, submitted_at)
badges           (user_id, badge_id, earned_at)
subscriptions    (user_id, tier cohort|intensive|private, status, renews_at)
coach_sessions   (id, user_id, problem_id, transcript jsonb, created_at)
```

## 4. Curriculum Hierarchy

```
Path (7) ─► Unit (3–5 per path) ─► Lesson (2–4 per unit) ─► Block (8–16 per lesson)
Foundations · Pre-Algebra · Algebra · Geometry · Counting & Probability ·
Number Theory · Olympiad Topics

Competition Tracks (overlays, not containers):
AMC 8 · AMC 10 · AMC 12 · AIME · USA(J)MO · IMO · MathCounts
Each track = ordered prerequisite lesson list + topic-weight vector + score model.
Tracks automatically recommend unfinished prerequisite lessons.
```

Topic taxonomy: every lesson and problem carries a `topicId` from a fixed set
(~25 topics) — the unit of mastery tracking, recommendations, and prediction.

## 5. Lesson Data Model

A lesson is a sequence of typed blocks — a complete 20–45-minute learning experience,
never a passive video. Block types:

| Block | Purpose |
|---|---|
| `intro` | Learning objectives + prerequisites + hook |
| `intuition` | Visual/conceptual grounding before formalism |
| `diagram` | Interactive SVG (sliders, togglable constructions) |
| `example` | Worked example with step-by-step reveal |
| `insight` | Key observation callout |
| `pitfall` | Common mistake + why it fails |
| `quiz` | Inline check (MCQ or numeric) — gates progression, feeds mastery |
| `practice` | Set of problem-bank IDs at graded difficulty |
| `proof` | Rigorous derivation (when appropriate) |
| `summary` | Compressed takeaways + formula sheet |
| `flashcards` | Spaced-repetition cards seeded into review queue |

Math is authored inline as `$...$` / `$$...$$` and rendered with KaTeX.

## 6. Problem Data Model

Every problem: difficulty 1–10, estimated minutes, topic + subtopic, source style
(e.g. "AMC 10 style" — all problems are original; real AMC/AIME text is MAA-copyrighted),
tags, exactly three escalating hints, full solution, alternate solutions, common
mistakes, related problem IDs. Answer types: `integer` (AIME-style 0–999), `mcq`
(AMC-style A–E), `numeric`.

## 7. Progress Tracking & Adaptive Learning

**Mastery (Elo-style, per topic).** Rating r ∈ [0,100], problem difficulty d ∈ [1,10].
Expected solve probability `E = 1 / (1 + 10^((10d − r) / 25))`. After an attempt with
result s ∈ {0,1} (hints and overtime attenuate s): `r ← r + K(s − E)`, where K decays
with attempt count (K = 18 → 6). Confidence grows with n and consistency; speed and
accuracy tracked as rolling means. Every completed problem updates mastery, confidence,
speed, accuracy, consistency, and retention.

**Spaced repetition (SM-2-lite).** Intervals [1, 3, 7, 16, 35] days. A miss (or a topic
untouched past its interval) enqueues a review item; each successful review advances the
interval index, each lapse resets it. `/review` serves due items; weak areas become
future assignments.

**Prediction.** For each track: predicted score = Σ over the official difficulty curve
of P(solve | topic mastery, difficulty) × points (AMC: 6 correct / 1.5 blank / 0 wrong;
AIME: 1 point). AIME-qualification probability = logistic((predicted AMC − cutoff) / σ).
Contest readiness score = weighted blend of track-topic mastery coverage.

**Recommendations.** Next-lesson = lowest-mastery topic whose prerequisites are met,
biased toward the student's chosen track. Post-contest, wrong answers map directly to
suggested lessons.

## 8. AI Tutoring Workflow

```
Student message ─► /api/coach (streaming)
  context: problem statement + hints + FULL solution (model-only) +
           mastery snapshot + attempt history for this problem
  policy (system prompt):
    1. NEVER state the final answer or full solution
    2. Ask a guiding question first; diagnose the student's current idea
    3. Escalate: orienting question → strategic hint → concrete step
    4. Name misconceptions explicitly; recommend prerequisite lessons by slug
    5. Offer multiple solution methods only after the student succeeds
    6. Generate fresh practice variants on request
```
Runtime: AI SDK v6 via Vercel AI Gateway (`anthropic/claude-*` model strings).
No key configured → the UI serves the authored 3-tier hint ladder (graceful degradation).

## 9. Mentor / Parent / Admin Workflows

- **Mentor console (v1 demo → v2 live):** roster, per-student mastery map, recent
  mistakes with attempt context, homework completion, contest history, goal tracking,
  parent-report composer.
- **Parent dashboard (v1 demo → v2 live):** weekly time-studied, improvement graphs,
  completed lessons, assignments, upcoming contests, mentor feedback digest.
- **Admin (v2):** content CMS over the same block/problem models, curriculum versioning,
  cohort management, funnel analytics, mentor marketplace review.

## 10. API Architecture

v1 (local-first): all content statically imported; progress in localStorage behind a
store module whose API mirrors the future server (`getMastery`, `recordAttempt`,
`dueReviews`, …). Only `/api/coach` is a live server route (streaming POST).

v2 (accounts): Next.js route handlers over Postgres —
`POST /api/attempts`, `GET /api/mastery`, `GET/POST /api/reviews`,
`POST /api/contest-runs`, `GET /api/students/:id/report` (mentor/parent scoped),
auth via Supabase, row-level scoping enforced by Postgres RLS policies
(see `supabase/migrations/`) rather than app-layer checks.

## 11. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | Next.js (App Router, TS) | Server routes for AI, static content pages, Vercel-native |
| Math | KaTeX | Fast, deterministic, SSR-safe |
| 3D / motion | Three.js + GSAP (marketing); restrained GSAP + SVG in-app | Cinema where it sells, clarity where it teaches |
| State | Hand-rolled store (useSyncExternalStore + localStorage) | Zero deps, server-mirroring API |
| AI | AI SDK v6 + Vercel AI Gateway | Provider-agnostic, streaming, observability |
| Charts | Hand-rolled SVG | Full design control, no lib weight |
| Tests | Vitest | Engine correctness (mastery, scoring, SRS) |
| Auth + DB | Supabase (Postgres + auth), via Vercel Marketplace | RLS-scoped user data, provisioned resource `supabase-amethyst-drawer` |
| Future | Stripe | Marketplace-native on Vercel, for subscriptions |

## 12. Component Hierarchy

```
RootLayout (fonts, KaTeX css, tokens)
├── Marketing: CinematicScene (Three.js) + Landing sections
└── PlatformLayout (ProgressProvider)
    ├── Sidebar / Topbar (streak · XP · level)
    ├── Learn: PathCard, MasteryRing, TrackReadiness, LessonCard
    ├── LessonPlayer: BlockRenderer → IntroBlock, IntuitionBlock, DiagramBlock,
    │     ExampleBlock (stepped), QuizBlock (gating), PitfallBlock, InsightBlock,
    │     PracticeBlock, ProofBlock, SummaryBlock, FlashcardsBlock
    ├── Problems: FilterBar, ProblemTable, ProblemWorkspace, HintLadder, SolutionPanel
    ├── Contests: ContestHub, Simulator (Timer, AnswerSheet), ResultsAnalytics
    ├── Dashboard: MasteryRadar, TopicHeatmap, PredictionCard, StreakCard,
    │     BadgeGrid, ProgressTimeline, WeeklyGoals
    ├── Review: ReviewQueue (SRS deck)
    ├── Coach: CoachPanel (streaming chat, hint-ladder fallback)
    └── Mentor / Parent: read-only analytic views over the same store
```

## 13. Responsiveness, Auth, Subscriptions

- **Responsive:** desktop sidebar → mobile bottom tab bar; lesson player single-column;
  simulator keeps timer pinned; all charts fluid SVG; `prefers-reduced-motion` honored.
- **Auth (live):** Supabase — student/mentor/parent roles via `profiles.role`;
  demo profile migrates on first sign-in. Route-level protection still to add
  (currently only `useUser`/`createClient` gate UI, not middleware).
- **Subscriptions:** Free (3 lessons + limited bank) · Cohort $290/mo · Intensive
  $640/mo (mentor + graded proofs) · Private $190/hr — Stripe in v2; tiers gate mentor
  features and coach message volume, never core curriculum visibility.

## 14. Roadmap

- **v1 (this build):** full curriculum tree, 12 flagship lessons, ~100-problem bank,
  adaptive engine, contests, dashboards, AI coach, demo mentor/parent views.
- **v1.5:** full lesson coverage (60+), 1,000+ problems, custom problem generator,
  proof-upload with AI pre-grading.
- **v2:** accounts (Clerk), Postgres persistence, Stripe, live mentor marketplace,
  parent accounts, admin CMS.
- **v3:** cohort classrooms with shared whiteboard, team contests & ladders,
  school/academy licensing, mobile apps.
