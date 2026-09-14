// ── Lucid platform: shared type system ──────────────────────────
// These shapes mirror the target Postgres schema in ARCHITECTURE.md
// so localStorage progress can migrate to a server unchanged.

export type TopicId = string;

export interface Topic {
  id: TopicId;
  name: string;
  pathId: string;
  blurb: string;
}

// ── Curriculum ──────────────────────────────────────────────────

export type LessonStatus = "full" | "outline";

export interface LessonMeta {
  slug: string;
  title: string;
  topicId: TopicId;
  difficulty: number; // 1–10
  estMinutes: number;
  objectives: string[];
  prereqs: string[]; // lesson slugs
  summary: string;
  status: LessonStatus;
}

export interface Unit {
  id: string;
  title: string;
  lessons: LessonMeta[];
}

export interface LearningPath {
  id: string;
  title: string;
  tagline: string;
  description: string;
  units: Unit[];
}

// ── Lesson blocks ───────────────────────────────────────────────
// Text fields support inline math: $...$ and display math: $$...$$

export type DiagramKind =
  | "number-line"
  | "ratio-bars"
  | "angle-chase"
  | "similar-triangles"
  | "grid-paths"
  | "mod-clock"
  | "parabola-vieta"
  | "ev-spinner";

export type Block =
  | { type: "intro"; body: string }
  | { type: "intuition"; title: string; body: string }
  | { type: "diagram"; kind: DiagramKind; caption: string }
  | {
      type: "example";
      title: string;
      problem: string;
      steps: string[];
      takeaway?: string;
    }
  | { type: "insight"; body: string }
  | { type: "pitfall"; body: string }
  | {
      type: "quiz";
      question: string;
      kind: "mcq" | "numeric";
      choices?: string[];
      answer: number; // mcq: choice index · numeric: value
      explanation: string;
    }
  | { type: "practice"; intro?: string; problemIds: string[] }
  | { type: "proof"; title: string; body: string[] }
  | { type: "summary"; points: string[]; formulas?: string[] }
  | { type: "flashcards"; cards: { front: string; back: string }[] };

export interface Lesson {
  slug: string;
  blocks: Block[];
}

// ── Problems ────────────────────────────────────────────────────

export interface Problem {
  id: string;
  statement: string;
  answerType: "integer" | "mcq";
  answer: number; // integer value, or mcq choice index
  choices?: string[];
  difficulty: number; // 1–10
  estMinutes: number;
  topicId: TopicId;
  subtopic: string;
  source: string; // style attribution — all problems are original
  tags: string[];
  hints: [string, string, string];
  solution: string;
  altSolutions?: string[];
  commonMistakes?: string[];
  related?: string[];
}

// ── Competition tracks ──────────────────────────────────────────

export interface Track {
  id: string;
  name: string;
  short: string;
  description: string;
  problemCount: number; // compact simulation length
  minutes: number;
  scoring: { correct: number; blank: number; wrong: number };
  maxScore: number;
  answerType: "mcq" | "integer";
  difficultyCurve: number[]; // target difficulty per slot (compact sim)
  officialCurve: number[]; // full-length difficulty curve (prediction)
  officialMax: number;
  topicWeights: Partial<Record<TopicId, number>>; // sums to 1
  prereqLessons: string[];
  cutoff?: { score: number; label: string };
  proofBased?: boolean;
}

// ── Progress (localStorage v1 · Postgres v2) ────────────────────

export type AttemptContext = "lesson" | "practice" | "contest" | "review";

export interface Attempt {
  problemId: string;
  topicId: TopicId;
  correct: boolean;
  seconds: number;
  hintsUsed: number;
  context: AttemptContext;
  ts: number;
}

export interface TopicMastery {
  rating: number; // 0–100
  n: number;
  correct: number;
  recent: number[]; // last results (1|0) for consistency
  avgSeconds: number;
  lastSeen: number;
}

export interface SrsItem {
  id: string;
  kind: "problem" | "card";
  refId: string; // problemId, or "lessonSlug#cardIdx"
  front?: string;
  back?: string;
  due: number;
  intervalIdx: number;
  lapses: number;
}

export interface ContestRun {
  id: string;
  trackId: string;
  ts: number;
  problemIds: string[];
  answers: (number | null)[];
  perProblemSeconds: number[];
  score: number;
  maxScore: number;
  correct: number;
  blank: number;
  wrong: number;
}

export interface LessonProgress {
  blocksDone: number;
  completed: boolean;
  ts: number;
  course?: import("./courses/types").CourseLessonState;
}

export interface Progress {
  version: number;
  createdAt: number;
  xp: number;
  streak: { count: number; lastDay: string };
  badges: string[];
  attempts: Attempt[];
  mastery: Record<TopicId, TopicMastery>;
  lessons: Record<string, LessonProgress>;
  reviews: SrsItem[];
  contests: ContestRun[];
  minutesByDay: Record<string, number>;
  track: string; // chosen competition track
}
