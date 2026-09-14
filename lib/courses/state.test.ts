import { describe, expect, it } from "vitest";
import { COURSES, courseLessons } from "@/content/courses/manifest";
import lesson from "@/content/courses/amc-8/m01/permutations-fundamentals";
import { defaultProgress } from "@/lib/store";
import {
  canCompleteCourseLesson,
  courseCompletion,
  emptyCourseState,
  gradeCourseExercise,
  normalizeCourseState,
  requiredAcknowledgements,
} from "./state";

describe("course structure and completion", () => {
  it("has consistent lesson metadata and a valid prerequisite chain per course", () => {
    for (const course of COURSES) {
      const metadata = courseLessons(course);
      expect(metadata.length).toBeGreaterThan(0);
      expect(metadata.reduce((total, item) => total + item.estMinutes, 0)).toBe(
        metadata.length * 40,
      );
      expect(new Set(metadata.map((item) => item.id)).size).toBe(
        metadata.length,
      );
      metadata.forEach((item, index) =>
        item.prereqs.forEach((prereq) =>
          expect(
            metadata
              .slice(0, index)
              .some((previous) => previous.slug === prereq),
          ).toBe(true),
        ),
      );
    }
    const extensions = courseLessons(COURSES[1]).filter(
      (item) => item.extension,
    );
    expect(extensions).toHaveLength(4);
    expect(extensions.every((item) => item.levels.join() === "AMC 12")).toBe(
      true,
    );
  });
  it("requires reading, full examples and resolution, not just viewing answers", () => {
    const state = emptyCourseState();
    expect(canCompleteCourseLesson(lesson, state)).toBe(false);
    state.acknowledged = requiredAcknowledgements(lesson);
    for (const example of lesson.examples)
      state.exampleSteps[example.id] = example.steps.length;
    for (const exercise of lesson.exercises)
      state.exercises[exercise.id] = {
        input: "",
        hintsRevealed: 0,
        attempts: 0,
        answerRevealed: true,
      };
    expect(canCompleteCourseLesson(lesson, state)).toBe(false);
    for (const exercise of lesson.exercises)
      Object.assign(state.exercises[exercise.id], {
        solutionRevealed: true,
        reviewed: true,
      });
    expect(canCompleteCourseLesson(lesson, state)).toBe(true);
    state.exercises[lesson.exercises[0].id].reviewed = false;
    expect(canCompleteCourseLesson(lesson, state)).toBe(false);
    state.exercises[lesson.exercises[0].id].solved = true;
    expect(canCompleteCourseLesson(lesson, state)).toBe(true);
  });
  it("normalizes absent, malformed, and old state", () => {
    expect(normalizeCourseState(undefined)).toEqual(emptyCourseState());
    expect(
      normalizeCourseState({
        acknowledged: ["intro", null, "intro"],
        exercises: {
          x: { input: 99, hintsRevealed: 100, attempts: -3, reviewed: true },
        },
      }),
    ).toEqual({
      acknowledged: ["intro"],
      exampleSteps: {},
      exercises: {
        x: {
          input: "",
          hintsRevealed: 3,
          attempts: 0,
          solved: false,
          answerRevealed: false,
          solutionRevealed: false,
          reviewed: false,
        },
      },
    });
  });
  it("distinguishes invalid answers from wrong answers", () => {
    const numeric = lesson.exercises.find((item) => item.kind === "numeric")!;
    expect(gradeCourseExercise(numeric, "invalid")).toBeNull();
    expect(gradeCourseExercise(numeric, "-123456")).toBe(false);
    const mcq = lesson.exercises.find((item) => item.kind === "mcq")!;
    expect(gradeCourseExercise(mcq, "")).toBeNull();
    expect(gradeCourseExercise(mcq, "99")).toBeNull();
    expect(gradeCourseExercise(mcq, String(mcq.answer))).toBe(true);
  });
  it("counts completed published lessons separately from planned content", () => {
    const progress = defaultProgress();
    const course = COURSES[1];
    const meta = courseLessons(course).find(
      (item) => item.status === "published",
    )!;
    progress.lessons[meta.id] = { completed: true, blocksDone: 3, ts: 1 };
    const totals = courseCompletion(course, progress);
    expect(totals.completedMinutes).toBe(40);
    expect(totals.sharedTotal).toBe(26);
    expect(totals.extensionTotal).toBe(4);
    expect(totals.sharedCompleted).toBe(1);
  });
});
