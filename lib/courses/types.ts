export type CourseLevel = "AMC 8" | "AMC 10" | "AMC 12";

export interface CourseLessonMeta {
  id: string;
  slug: string;
  moduleId: string;
  title: string;
  objectives: string[];
  concepts: string[];
  prereqs: string[];
  difficulty: number;
  levels: CourseLevel[];
  extension: boolean;
  estMinutes: number;
  status: "planned" | "published";
  format: "instruction" | "workshop";
  exampleCount: number;
  guidedCount: number;
  independentCount: number;
  activityMinutes: {
    orientation: number;
    explanation: number;
    examples: number;
    guided: number;
    independent: number;
    synthesis: number;
  };
}

export interface CourseModule {
  id: string;
  title: string;
  lessons: CourseLessonMeta[];
}

export interface Course {
  slug: "amc-8" | "amc-10-12";
  title: string;
  description: string;
  prerequisites: string;
  levels: CourseLevel[];
  modules: CourseModule[];
}

export type CourseDiagram =
  | {
      kind: "bars";
      title: string;
      labels: string[];
      values: number[];
      unit?: string;
    }
  | {
      kind: "coordinate";
      title: string;
      points: { x: number; y: number; label: string }[];
      connect?: boolean;
    }
  | { kind: "table"; title: string; headers: string[]; rows: string[][] };

export interface CourseSection {
  id: string;
  title: string;
  body: string[];
  keyIdea?: string;
  diagram?: CourseDiagram;
}

export interface CourseExample {
  id: string;
  title: string;
  problem: string;
  steps: string[];
  answer: string;
  takeaway: string;
  diagram?: CourseDiagram;
}

interface ExerciseBase {
  id: string;
  role: "guided" | "independent";
  question: string;
  hints: [string, string, string];
  solutionSteps: string[];
  difficulty: number;
  diagram?: CourseDiagram;
}

export type CourseExercise = ExerciseBase &
  (
    | { kind: "numeric"; answer: string; choices?: never }
    | { kind: "mcq"; answer: number; choices: string[] }
  );

export interface CourseLesson {
  slug: string;
  intro: string;
  sections: CourseSection[];
  examples: CourseExample[];
  commonMistakes: string[];
  exercises: CourseExercise[];
  summary: string[];
  nextConnection: string;
}

export interface CourseExerciseProgress {
  input: string;
  firstCorrect?: boolean;
  solved?: boolean;
  hintsRevealed: number;
  answerRevealed?: boolean;
  solutionRevealed?: boolean;
  reviewed?: boolean;
  attempts: number;
}

export interface CourseLessonState {
  acknowledged: string[];
  exampleSteps: Record<string, number>;
  exercises: Record<string, CourseExerciseProgress>;
}
