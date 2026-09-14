"use client";

import { MathText } from "@/components/MathText";
import type { CourseExample } from "@/lib/courses/types";
import type { LearningActions } from "./lesson-actions";
import { CourseDiagramView } from "./CourseDiagramView";

export function Acknowledge({
  id,
  actions,
  label = "I have worked through this section",
}: {
  id: string;
  actions: LearningActions;
  label?: string;
}) {
  const checked = actions.state.acknowledged.includes(id);
  return (
    <label className={`course-acknowledge${checked ? " is-checked" : ""}`}>
      <input
        type="checkbox"
        checked={checked}
        disabled={!actions.ready || checked}
        onChange={() => actions.acknowledge(id)}
      />
      <span>{checked ? "Section reviewed" : label}</span>
    </label>
  );
}

export function WorkedExample({
  example,
  index,
  actions,
}: {
  example: CourseExample;
  index: number;
  actions: LearningActions;
}) {
  const shown = Math.min(
    example.steps.length,
    actions.state.exampleSteps[example.id] ?? 1,
  );
  const allShown = shown >= example.steps.length;
  return (
    <article
      className="course-example"
      aria-labelledby={`example-${example.id}`}
    >
      <p className="course-kicker mono">Worked example {index + 1}</p>
      <h3 id={`example-${example.id}`}>{example.title}</h3>
      <p className="course-problem-statement">
        <MathText text={example.problem} />
      </p>
      {example.diagram && <CourseDiagramView diagram={example.diagram} />}
      <ol className="course-solution-steps">
        {example.steps.slice(0, shown).map((step, stepIndex) => (
          <li key={stepIndex}>
            <MathText text={step} />
          </li>
        ))}
      </ol>
      {!allShown && (
        <button
          className="btn btn-ghost btn-small"
          type="button"
          disabled={!actions.ready}
          onClick={() => actions.revealExampleStep(example.id)}
        >
          Reveal step {shown + 1} of {example.steps.length}
        </button>
      )}
      <p className="course-visually-hidden" role="status">
        {shown} of {example.steps.length} steps revealed
      </p>
      {allShown && (
        <div className="course-example-takeaway">
          <p>
            <strong>Answer:</strong> <MathText text={example.answer} />
          </p>
          <p>
            <strong>The idea to keep:</strong>{" "}
            <MathText text={example.takeaway} />
          </p>
        </div>
      )}
    </article>
  );
}
