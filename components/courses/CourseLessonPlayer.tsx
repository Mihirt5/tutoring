"use client";

import Link from "next/link";
import { MathText } from "@/components/MathText";
import { courseHref } from "@/content/courses/manifest";
import type {
  Course,
  CourseLesson,
  CourseLessonMeta,
} from "@/lib/courses/types";
import { useCourseLessonProgress } from "@/lib/courses/progress";
import { CourseDiagramView } from "./CourseDiagramView";
import { Acknowledge, WorkedExample } from "./CourseLessonBlocks";
import { PracticeExercise } from "./CoursePracticeExercise";
import { LevelLabels } from "./shared";

export function CourseLessonPlayer({
  course,
  meta,
  lesson,
  previous,
  next,
  position,
  total,
}: {
  course: Course;
  meta: CourseLessonMeta;
  lesson: CourseLesson;
  previous?: CourseLessonMeta;
  next?: CourseLessonMeta;
  position: number;
  total: number;
}) {
  const actions = useCourseLessonProgress(course.slug, meta, lesson);
  const guided = lesson.exercises.filter(
    (exercise) => exercise.role === "guided",
  );
  const independent = lesson.exercises.filter(
    (exercise) => exercise.role === "independent",
  );
  const resolved = lesson.exercises.filter(
    (exercise) =>
      actions.state.exercises[exercise.id]?.solved ||
      actions.state.exercises[exercise.id]?.reviewed,
  ).length;
  const required = lesson.sections.length + 3;
  const examplesReviewed = lesson.examples.filter(
    (example) =>
      (actions.state.exampleSteps[example.id] ?? 1) >= example.steps.length,
  ).length;
  const prereqs = course.modules
    .flatMap((module) => module.lessons)
    .filter(
      (item) =>
        meta.prereqs.includes(item.slug) || meta.prereqs.includes(item.id),
    );
  const nextShared = course.modules
    .flatMap((module) => module.lessons)
    .slice(position)
    .find((item) => !item.extension);
  return (
    <div className="page courses-page course-reader-page">
      <nav className="course-breadcrumb" aria-label="Breadcrumb">
        <Link href="/courses">Courses</Link>
        <span aria-hidden="true">/</span>
        <Link href={courseHref(course.slug)}>{course.title}</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">
          Lesson {position} of {total}
        </span>
      </nav>
      <header className="page-head course-lesson-head">
        <LevelLabels levels={meta.levels} extension={meta.extension} />
        <h1>{meta.title}</h1>
        <p className="course-lesson-meta mono">
          {meta.estMinutes} minutes of active learning · Difficulty{" "}
          {meta.difficulty}/10 ·{" "}
          {meta.format === "workshop" ? "Problem-solving workshop" : "Lesson"}
        </p>
        {meta.extension && (
          <p className="course-extension-note">
            AMC 12 extension · This lesson builds beyond the shared AMC 10/12
            foundation.
            {nextShared && (
              <>
                {" "}
                <Link href={courseHref(course.slug, nextShared.slug)}>
                  Continue to the next shared lesson →
                </Link>
              </>
            )}
          </p>
        )}
        {prereqs.length > 0 && (
          <p className="course-prereq-links">
            Helpful preparation:{" "}
            {prereqs.map((prereq, index) => (
              <span key={prereq.id}>
                {index > 0 && " · "}
                <Link href={courseHref(course.slug, prereq.slug)}>
                  {prereq.title}
                </Link>
              </span>
            ))}
          </p>
        )}
      </header>
      <div className="course-reader-grid">
        <aside className="course-lesson-toc">
          <nav aria-label="Lesson contents">
            <p className="mono course-kicker">In this lesson</p>
            <a href="#course-intro">Before you begin</a>
            {lesson.sections.map((section) => (
              <a key={section.id} href={`#course-${section.id}`}>
                {section.title}
              </a>
            ))}
            <a href="#course-examples">Worked examples</a>
            <a href="#course-mistakes">Common mistakes</a>
            {guided.length > 0 && <a href="#course-guided">Guided practice</a>}
            {independent.length > 0 && (
              <a href="#course-independent">Independent practice</a>
            )}
            <a href="#course-summary">Bring it together</a>
          </nav>
          <div className="course-toc-progress">
            <label htmlFor="lesson-practice-progress">
              {resolved} / {lesson.exercises.length} problems resolved
            </label>
            <progress
              id="lesson-practice-progress"
              value={resolved}
              max={Math.max(1, lesson.exercises.length)}
            />
            <p>
              {actions.completed
                ? "Lesson complete"
                : "Progress saves as you work."}
            </p>
          </div>
        </aside>
        <article className="course-reading">
          <section className="course-reading-section" id="course-intro">
            <p className="course-introduction">
              <MathText text={lesson.intro} />
            </p>
            <h2>What you will learn</h2>
            <ul className="course-objectives">
              {meta.objectives.map((objective) => (
                <li key={objective}>
                  <MathText text={objective} />
                </li>
              ))}
            </ul>
            <p className="course-study-instruction">
              Keep paper and a pencil nearby. Try each problem before opening a
              hint, and mark sections reviewed as you work through them.
            </p>
            <Acknowledge
              id="intro"
              actions={actions}
              label="I am ready to begin"
            />
          </section>
          {lesson.sections.map((section) => (
            <section
              className="course-reading-section"
              id={`course-${section.id}`}
              key={section.id}
            >
              <h2>{section.title}</h2>
              {section.body.map((paragraph, index) => (
                <p key={index}>
                  <MathText text={paragraph} />
                </p>
              ))}
              {section.keyIdea && (
                <aside className="course-key-idea">
                  <p className="mono course-kicker">Key idea</p>
                  <p>
                    <MathText text={section.keyIdea} />
                  </p>
                </aside>
              )}
              {section.diagram && (
                <CourseDiagramView diagram={section.diagram} />
              )}
              <Acknowledge id={section.id} actions={actions} />
            </section>
          ))}
          <section className="course-reading-section" id="course-examples">
            <h2>See the reasoning unfold</h2>
            <p>Pause after each step and predict what comes next.</p>
            {lesson.examples.map((example, index) => (
              <WorkedExample
                key={example.id}
                example={example}
                index={index}
                actions={actions}
              />
            ))}
          </section>
          <section className="course-reading-section" id="course-mistakes">
            <h2>Common mistakes to catch</h2>
            <ul className="course-mistakes">
              {lesson.commonMistakes.map((mistake, index) => (
                <li key={index}>
                  <MathText text={mistake} />
                </li>
              ))}
            </ul>
            <Acknowledge id="common-mistakes" actions={actions} />
          </section>
          {guided.length > 0 && (
            <section className="course-reading-section" id="course-guided">
              <p className="mono course-kicker">Try with support</p>
              <h2>Guided practice</h2>
              <p>
                Choose a strategy, take a first step, and use the hints when you
                need direction.
              </p>
              {guided.map((exercise, index) => (
                <PracticeExercise
                  key={exercise.id}
                  exercise={exercise}
                  index={index}
                  actions={actions}
                />
              ))}
            </section>
          )}
          {independent.length > 0 && (
            <section className="course-reading-section" id="course-independent">
              <p className="mono course-kicker">Put it into practice</p>
              <h2>Independent practice</h2>
              <p>
                Work on your own first. If you reveal a solution, work through
                it and mark it reviewed.
              </p>
              {independent.map((exercise, index) => (
                <PracticeExercise
                  key={exercise.id}
                  exercise={exercise}
                  index={index}
                  actions={actions}
                />
              ))}
            </section>
          )}
          <section className="course-reading-section" id="course-summary">
            <h2>Bring it together</h2>
            <ul className="course-summary">
              {lesson.summary.map((point, index) => (
                <li key={index}>
                  <MathText text={point} />
                </li>
              ))}
            </ul>
            <aside className="course-next-connection">
              <p className="mono course-kicker">The next connection</p>
              <p>
                <MathText text={lesson.nextConnection} />
              </p>
            </aside>
            <Acknowledge id="summary" actions={actions} />
          </section>
          <footer className="course-completion">
            <h2>
              {actions.completed
                ? "Lesson complete."
                : "Finish with understanding."}
            </h2>
            <p>
              {actions.completed
                ? "Your work is saved. Return whenever you want to revisit the ideas or practice."
                : "Review each section and example, then solve each problem or work through its solution."}
            </p>
            <ul className="course-completion-checks">
              <li>
                {actions.state.acknowledged.length} / {required} sections
                reviewed
              </li>
              <li>
                {examplesReviewed} / {lesson.examples.length} worked examples
                explored
              </li>
              <li>
                {resolved} / {lesson.exercises.length} problems solved or
                reviewed
              </li>
            </ul>
            {!actions.completed && (
              <button
                className="btn btn-solid"
                type="button"
                disabled={!actions.ready || !actions.canComplete}
                onClick={actions.complete}
              >
                Complete lesson
              </button>
            )}
            <p className="course-completion-status" role="status">
              {!actions.ready
                ? "Loading your saved progress…"
                : actions.completed
                  ? "✓ Lesson completion saved"
                  : actions.canComplete
                    ? "You are ready to complete this lesson."
                    : "Your progress is saved as you work."}
            </p>
          </footer>
          <nav className="course-adjacent" aria-label="Lesson navigation">
            {previous ? (
              <Link href={courseHref(course.slug, previous.slug)}>
                <span className="mono">← Previous lesson</span>
                <strong>{previous.title}</strong>
              </Link>
            ) : (
              <Link href={courseHref(course.slug)}>
                <span className="mono">← Course overview</span>
                <strong>{course.title}</strong>
              </Link>
            )}
            {next ? (
              <Link href={courseHref(course.slug, next.slug)}>
                <span className="mono">
                  {next.status === "published"
                    ? "Next lesson →"
                    : "Next in the course plan →"}
                </span>
                <strong>{next.title}</strong>
              </Link>
            ) : (
              <Link href={courseHref(course.slug)}>
                <span className="mono">Return to course →</span>
                <strong>Review your progress</strong>
              </Link>
            )}
          </nav>
          <p className="course-storage-note">
            Your answers, revealed steps, and lesson progress are saved in this
            browser.
          </p>
        </article>
      </div>
    </div>
  );
}
