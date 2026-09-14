"use client";

import { useState } from "react";
import { MathText } from "@/components/MathText";
import type {
  CourseExercise,
  CourseExerciseProgress,
} from "@/lib/courses/types";
import type { LearningActions } from "./lesson-actions";
import { CourseDiagramView } from "./CourseDiagramView";

const EMPTY_EXERCISE: CourseExerciseProgress = {
  input: "",
  hintsRevealed: 0,
  attempts: 0,
};

export function PracticeExercise({
  exercise,
  index,
  actions,
}: {
  exercise: CourseExercise;
  index: number;
  actions: LearningActions;
}) {
  const [invalidInput, setInvalidInput] = useState(false);
  const state = actions.state.exercises[exercise.id] ?? EMPTY_EXERCISE;
  const locked = Boolean(
    state.solved || state.answerRevealed || state.solutionRevealed,
  );
  const resolved = Boolean(state.solved || state.reviewed);
  const showAnswer = state.answerRevealed || state.solutionRevealed;
  const answer =
    exercise.kind === "mcq"
      ? `${String.fromCharCode(65 + exercise.answer)}. ${exercise.choices[exercise.answer]}`
      : exercise.answer;
  const inputId = `answer-${exercise.id}`;
  return (
    <article
      className={`course-exercise${resolved ? " is-resolved" : ""}`}
      aria-labelledby={`problem-${exercise.id}`}
    >
      <header className="course-exercise-head">
        <h3 id={`problem-${exercise.id}`}>
          {exercise.role === "guided" ? "Guided" : "Independent"} problem{" "}
          {index + 1}
        </h3>
        <span className="mono">Difficulty {exercise.difficulty}/10</span>
      </header>
      <p className="course-problem-statement">
        <MathText text={exercise.question} />
      </p>
      {exercise.diagram && <CourseDiagramView diagram={exercise.diagram} />}
      <form
        onSubmit={(event) => {
          event.preventDefault();
          if (!locked && actions.ready)
            setInvalidInput(actions.submit(exercise.id) === null);
        }}
      >
        {exercise.kind === "mcq" ? (
          <fieldset
            className="course-choices"
            disabled={!actions.ready || locked}
          >
            <legend className="course-visually-hidden">
              Answer choices for problem {index + 1}
            </legend>
            {exercise.choices.map((choice, choiceIndex) => (
              <label
                className={`course-choice${state.input === String(choiceIndex) ? " is-selected" : ""}${showAnswer && choiceIndex === exercise.answer ? " is-answer" : ""}`}
                key={choiceIndex}
              >
                <input
                  type="radio"
                  name={inputId}
                  value={choiceIndex}
                  checked={state.input === String(choiceIndex)}
                  onChange={() => {
                    setInvalidInput(false);
                    actions.setInput(exercise.id, String(choiceIndex));
                  }}
                />
                <span className="mono course-choice-letter">
                  {String.fromCharCode(65 + choiceIndex)}
                </span>
                <MathText text={choice} />
              </label>
            ))}
          </fieldset>
        ) : (
          <div className="course-numeric-answer">
            <label htmlFor={inputId}>Your answer</label>
            <input
              id={inputId}
              value={state.input}
              onChange={(event) => {
                setInvalidInput(false);
                actions.setInput(exercise.id, event.target.value);
              }}
              disabled={!actions.ready || locked}
              inputMode="text"
              autoComplete="off"
              spellCheck={false}
              placeholder="Integer, decimal, or fraction"
              aria-invalid={invalidInput || undefined}
              aria-describedby={`${inputId}-help${invalidInput ? ` ${inputId}-error` : ""}`}
            />
            <p id={`${inputId}-help`}>For example: 12, 0.75, or 3/4.</p>
          </div>
        )}
        <div className="course-exercise-actions">
          <button
            className="btn btn-solid btn-small"
            type="submit"
            disabled={!actions.ready || locked || !state.input.trim()}
          >
            Check answer
          </button>
          <button
            className="btn btn-ghost btn-small"
            type="button"
            disabled={
              !actions.ready || state.hintsRevealed >= exercise.hints.length
            }
            onClick={() => actions.revealHint(exercise.id)}
          >
            {state.hintsRevealed >= exercise.hints.length
              ? "All hints shown"
              : `Hint ${state.hintsRevealed + 1} of ${exercise.hints.length}`}
          </button>
        </div>
      </form>
      <div className="course-feedback" aria-live="polite" aria-atomic="true">
        {invalidInput && !locked ? (
          <p id={`${inputId}-error`} className="course-feedback-retry">
            Enter an integer, decimal, or fraction, such as 3/4. A fraction’s
            denominator must be nonzero.
          </p>
        ) : state.solved ? (
          <p className="course-feedback-correct">
            Correct. You have solved this problem.
          </p>
        ) : state.attempts > 0 && !showAnswer ? (
          <p className="course-feedback-retry">
            Try again. Check your setup, or reveal a hint to find a next step.
          </p>
        ) : state.reviewed ? (
          <p className="course-feedback-correct">
            Solution reviewed. Revisit this problem later to try it
            independently.
          </p>
        ) : null}
      </div>
      {state.hintsRevealed > 0 && (
        <div className="course-hints" aria-label="Revealed hints">
          {exercise.hints
            .slice(0, state.hintsRevealed)
            .map((hint, hintIndex) => (
              <div key={hintIndex}>
                <p className="mono course-kicker">Hint {hintIndex + 1}</p>
                <p>
                  <MathText text={hint} />
                </p>
              </div>
            ))}
        </div>
      )}
      <div className="course-reveal-actions">
        <button
          className="course-text-button"
          type="button"
          disabled={!actions.ready || Boolean(showAnswer)}
          onClick={() => actions.revealAnswer(exercise.id)}
        >
          Reveal answer
        </button>
        <button
          className="course-text-button"
          type="button"
          disabled={!actions.ready || Boolean(state.solutionRevealed)}
          onClick={() => actions.revealSolution(exercise.id)}
        >
          Read full solution
        </button>
      </div>
      {showAnswer && (
        <p className="course-answer">
          <strong>Answer:</strong> <MathText text={String(answer)} />
        </p>
      )}
      {state.solutionRevealed && (
        <div className="course-full-solution">
          <h4>Step-by-step solution</h4>
          <ol className="course-solution-steps">
            {exercise.solutionSteps.map((step, stepIndex) => (
              <li key={stepIndex}>
                <MathText text={step} />
              </li>
            ))}
          </ol>
          <label className="course-acknowledge">
            <input
              type="checkbox"
              checked={Boolean(state.reviewed)}
              disabled={!actions.ready}
              onChange={() => actions.toggleReviewed(exercise.id)}
            />
            <span>I have worked through and understood the solution</span>
          </label>
        </div>
      )}
    </article>
  );
}
