"use client";

import { useSyncExternalStore } from "react";
import {
  completeCourseLessonProgress,
  getProgress,
  updateCourseLessonProgress,
  useProgress,
} from "@/lib/store";
import type {
  CourseExerciseProgress,
  CourseLesson,
  CourseLessonMeta,
  CourseLessonState,
} from "./types";
import {
  canCompleteCourseLesson,
  emptyExerciseState,
  gradeCourseExercise,
  normalizeCourseState,
} from "./state";
export { courseProgressKey, courseCompletion } from "./state";

const subscribeHydration = () => () => {};
const browserSnapshot = () => true;
const serverSnapshot = () => false;

function lessonTopic(courseSlug: string, meta: CourseLessonMeta) {
  const index = Number(meta.moduleId.slice(-2)) - 1;
  const topics =
    courseSlug === "amc-8"
      ? [
          "arithmetic",
          "fractions-ratios",
          "linear-equations",
          "divisibility",
          "angles",
          "solid-geometry",
          "counting-basics",
          "probability",
          "estimation",
          "estimation",
        ]
      : [
          "quadratics",
          "polynomials",
          "divisibility",
          "perms-combs",
          "probability",
          "similarity",
          "coordinate-geometry",
          "sequences",
          "functions",
          "quadratics",
        ];
  return topics[index] ?? "arithmetic";
}

export function useCourseLessonProgress(
  courseSlug: string,
  meta: CourseLessonMeta,
  lesson: CourseLesson,
) {
  const progress = useProgress();
  const ready = useSyncExternalStore(
    subscribeHydration,
    browserSnapshot,
    serverSnapshot,
  );
  const state = normalizeCourseState(progress.lessons[meta.id]?.course);
  const current = () =>
    normalizeCourseState(getProgress().lessons[meta.id]?.course);
  const change = (update: (before: CourseLessonState) => CourseLessonState) => {
    if (ready) updateCourseLessonProgress(meta.id, update);
  };
  const changeExercise = (
    id: string,
    update: (before: CourseExerciseProgress) => CourseExerciseProgress,
  ) => {
    if (!lesson.exercises.some((exercise) => exercise.id === id)) return;
    change((before) => ({
      ...before,
      exercises: {
        ...before.exercises,
        [id]: update(before.exercises[id] ?? emptyExerciseState()),
      },
    }));
  };
  return {
    state,
    ready,
    completed: !!progress.lessons[meta.id]?.completed,
    canComplete: ready && canCompleteCourseLesson(lesson, state),
    acknowledge(id: string) {
      change((before) => ({
        ...before,
        acknowledged: [...new Set([...before.acknowledged, id])],
      }));
    },
    setInput(id: string, input: string) {
      changeExercise(id, (before) =>
        before.solved || before.answerRevealed || before.solutionRevealed
          ? before
          : { ...before, input: input.slice(0, 120) },
      );
    },
    revealHint(id: string) {
      changeExercise(id, (before) => ({
        ...before,
        hintsRevealed: Math.min(3, before.hintsRevealed + 1),
      }));
    },
    revealAnswer(id: string) {
      changeExercise(id, (before) => ({ ...before, answerRevealed: true }));
    },
    revealSolution(id: string) {
      changeExercise(id, (before) => ({
        ...before,
        answerRevealed: true,
        solutionRevealed: true,
      }));
    },
    toggleReviewed(id: string) {
      changeExercise(id, (before) =>
        before.solutionRevealed
          ? { ...before, reviewed: !before.reviewed }
          : before,
      );
    },
    revealExampleStep(id: string) {
      const example = lesson.examples.find((item) => item.id === id);
      if (example)
        change((before) => ({
          ...before,
          exampleSteps: {
            ...before.exampleSteps,
            [id]: Math.min(
              example.steps.length,
              (before.exampleSteps[id] ?? 1) + 1,
            ),
          },
        }));
    },
    submit(id: string): boolean | null {
      if (!ready) return null;
      const exercise = lesson.exercises.find((item) => item.id === id);
      const previous = current().exercises[id] ?? emptyExerciseState();
      if (
        !exercise ||
        previous.solved ||
        previous.answerRevealed ||
        previous.solutionRevealed
      )
        return null;
      const correct = gradeCourseExercise(exercise, previous.input);
      if (correct === null) return null;
      updateCourseLessonProgress(
        meta.id,
        (before) => ({
          ...before,
          exercises: {
            ...before.exercises,
            [id]: {
              ...previous,
              firstCorrect: previous.firstCorrect ?? correct,
              solved: correct,
              attempts: previous.attempts + 1,
            },
          },
        }),
        {
          exerciseId: id,
          topicId: lessonTopic(courseSlug, meta),
          difficulty: exercise.difficulty,
          correct,
        },
      );
      return correct;
    },
    complete() {
      if (ready && canCompleteCourseLesson(lesson, current()))
        completeCourseLessonProgress(meta.id);
    },
  };
}
