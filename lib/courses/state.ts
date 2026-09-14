import type {
  Course,
  CourseExercise,
  CourseExerciseProgress,
  CourseLesson,
  CourseLessonState,
} from "./types";
import type { Progress } from "@/lib/types";
import { numericAnswerMatches, parseRational } from "./answers";

export const courseProgressKey = (courseSlug: string, lessonSlug: string) =>
  `course:${courseSlug}:${lessonSlug}`;
export const emptyCourseState = (): CourseLessonState => ({
  acknowledged: [],
  exampleSteps: {},
  exercises: {},
});
export const emptyExerciseState = (): CourseExerciseProgress => ({
  input: "",
  hintsRevealed: 0,
  attempts: 0,
});

export function normalizeCourseState(value: unknown): CourseLessonState {
  if (!value || typeof value !== "object") return emptyCourseState();
  const raw = value as Partial<CourseLessonState>;
  const exercises: Record<string, CourseExerciseProgress> = {};
  if (raw.exercises && typeof raw.exercises === "object") {
    for (const [id, item] of Object.entries(raw.exercises)) {
      if (!item || typeof item !== "object") continue;
      exercises[id] = {
        input: typeof item.input === "string" ? item.input.slice(0, 120) : "",
        hintsRevealed: Number.isInteger(item.hintsRevealed)
          ? Math.max(0, Math.min(3, item.hintsRevealed))
          : 0,
        attempts: Number.isInteger(item.attempts)
          ? Math.max(0, item.attempts)
          : 0,
        ...(typeof item.firstCorrect === "boolean"
          ? { firstCorrect: item.firstCorrect }
          : {}),
        solved: item.solved === true,
        answerRevealed: item.answerRevealed === true,
        solutionRevealed: item.solutionRevealed === true,
        reviewed: item.reviewed === true && item.solutionRevealed === true,
      };
    }
  }
  const exampleSteps: Record<string, number> = {};
  if (raw.exampleSteps && typeof raw.exampleSteps === "object") {
    for (const [id, count] of Object.entries(raw.exampleSteps)) {
      if (Number.isInteger(count) && count >= 1) exampleSteps[id] = count;
    }
  }
  return {
    acknowledged: Array.isArray(raw.acknowledged)
      ? [...new Set(raw.acknowledged.filter((id) => typeof id === "string"))]
      : [],
    exampleSteps,
    exercises,
  };
}

export function gradeCourseExercise(
  exercise: CourseExercise,
  input: string,
): boolean | null {
  if (exercise.kind === "mcq") {
    if (!/^\d+$/.test(input.trim())) return null;
    const choice = Number(input);
    if (choice < 0 || choice >= exercise.choices.length) return null;
    return choice === exercise.answer;
  }
  return parseRational(input)
    ? numericAnswerMatches(input, exercise.answer)
    : null;
}

export function requiredAcknowledgements(lesson: CourseLesson) {
  return [
    "intro",
    ...lesson.sections.map((section) => section.id),
    "common-mistakes",
    "summary",
  ];
}

export function canCompleteCourseLesson(
  lesson: CourseLesson,
  state: CourseLessonState,
) {
  return (
    requiredAcknowledgements(lesson).every((id) =>
      state.acknowledged.includes(id),
    ) &&
    lesson.examples.every(
      (example) =>
        (state.exampleSteps[example.id] ?? 1) >= example.steps.length,
    ) &&
    lesson.exercises.every((exercise) => {
      const saved = state.exercises[exercise.id];
      return saved?.solved || (saved?.solutionRevealed && saved?.reviewed);
    })
  );
}

export function courseCompletion(course: Course, progress: Progress) {
  const lessons = course.modules.flatMap((module) => module.lessons);
  const published = lessons.filter((lesson) => lesson.status === "published");
  const done = published.filter(
    (lesson) => progress.lessons[lesson.id]?.completed,
  );
  return {
    completed: done.length,
    total: lessons.length,
    published: published.length,
    completedMinutes: done.reduce((sum, lesson) => sum + lesson.estMinutes, 0),
    publishedMinutes: published.reduce(
      (sum, lesson) => sum + lesson.estMinutes,
      0,
    ),
    totalMinutes: lessons.reduce((sum, lesson) => sum + lesson.estMinutes, 0),
    sharedCompleted: done.filter((lesson) => !lesson.extension).length,
    sharedTotal: lessons.filter((lesson) => !lesson.extension).length,
    extensionCompleted: done.filter((lesson) => lesson.extension).length,
    extensionTotal: lessons.filter((lesson) => lesson.extension).length,
  };
}
