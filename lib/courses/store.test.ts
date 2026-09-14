import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { emptyExerciseState } from "./state";

describe("course persistence and credit", () => {
  let data: Map<string, string>;
  beforeEach(() => {
    vi.resetModules();
    data = new Map();
    vi.stubGlobal("window", {});
    vi.stubGlobal("localStorage", {
      getItem: (key: string) => data.get(key) ?? null,
      setItem: (key: string, value: string) => data.set(key, value),
    });
  });
  afterEach(() => vi.unstubAllGlobals());

  it("credits the first submission once and preserves eventual success across reload", async () => {
    const store = await import("@/lib/store");
    const id = "course:amc-8:test";
    const grade = {
      exerciseId: "q1",
      topicId: "arithmetic",
      difficulty: 2,
      correct: false,
    };
    store.updateCourseLessonProgress(
      id,
      (state) => ({
        ...state,
        exercises: {
          q1: {
            ...emptyExerciseState(),
            input: "8",
            attempts: 1,
            firstCorrect: false,
          },
        },
      }),
      grade,
    );
    const firstXP = store.getProgress().xp;
    store.updateCourseLessonProgress(
      id,
      (state) => ({
        ...state,
        exercises: {
          q1: { ...state.exercises.q1, input: "9", attempts: 2, solved: true },
        },
      }),
      { ...grade, correct: true },
    );
    expect(store.getProgress().xp).toBe(firstXP);
    expect(store.getProgress().mastery.arithmetic.n).toBe(1);
    vi.resetModules();
    const reloaded = await import("@/lib/store");
    expect(
      reloaded.getProgress().lessons[id].course?.exercises.q1,
    ).toMatchObject({
      firstCorrect: false,
      solved: true,
      attempts: 2,
      input: "9",
    });
    reloaded.completeCourseLessonProgress(id);
    const completedXP = reloaded.getProgress().xp;
    reloaded.completeCourseLessonProgress(id);
    expect(reloaded.getProgress().xp).toBe(completedXP);
    expect(reloaded.getProgress().minutesByDay).toEqual({});
  });
  it("does not award solving credit after revealing a solution", async () => {
    const store = await import("@/lib/store");
    store.updateCourseLessonProgress("lesson", (state) => ({
      ...state,
      exercises: { q1: { ...emptyExerciseState(), solutionRevealed: true } },
    }));
    store.updateCourseLessonProgress("lesson", (state) => state, {
      exerciseId: "q1",
      topicId: "arithmetic",
      difficulty: 2,
      correct: true,
    });
    expect(store.getProgress().xp).toBe(0);
    expect(store.getProgress().mastery).toEqual({});
  });
  it("preserves legacy lesson progress and new fields through legacy mutators", async () => {
    data.set(
      "lucid-progress-v1",
      JSON.stringify({
        lessons: { legacy: { completed: true, blocksDone: 7, ts: 1 } },
      }),
    );
    const store = await import("@/lib/store");
    expect(store.getProgress().lessons.legacy.completed).toBe(true);
    store.updateCourseLessonProgress("course:test", (state) => ({
      ...state,
      acknowledged: ["intro"],
    }));
    store.markBlockDone("course:test", 3);
    store.completeLesson("course:test", []);
    expect(
      store.getProgress().lessons["course:test"].course?.acknowledged,
    ).toEqual(["intro"]);
    expect(store.getProgress().lessons.legacy.blocksDone).toBe(7);
  });
  it("uses memory when storage is unavailable", async () => {
    vi.stubGlobal("localStorage", {
      getItem() {
        throw new Error("blocked");
      },
      setItem() {
        throw new Error("quota");
      },
    });
    const store = await import("@/lib/store");
    store.updateCourseLessonProgress("test", (state) => ({
      ...state,
      acknowledged: ["intro"],
    }));
    expect(store.getProgress().lessons.test.course?.acknowledged).toEqual([
      "intro",
    ]);
  });
});
