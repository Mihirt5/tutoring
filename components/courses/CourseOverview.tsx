"use client";

import Link from "next/link";
import type { Course } from "@/lib/courses/types";
import { useProgress } from "@/lib/store";
import { courseCompletion } from "@/lib/courses/progress";
import { courseHref, courseLessons } from "@/content/courses/manifest";
import { formatMinutes, LevelLabels } from "./shared";

export function CourseOverview({ course }: { course: Course }) {
  const progress = useProgress();
  const lessons = courseLessons(course);
  const available = lessons.filter((lesson) => lesson.status === "published");
  const completed = available.filter(
    (lesson) => progress.lessons[lesson.id]?.completed,
  );
  const next =
    available.find((lesson) => !progress.lessons[lesson.id]?.completed) ??
    available[0];
  const totalMinutes = lessons.reduce(
    (sum, lesson) => sum + lesson.estMinutes,
    0,
  );
  const availableMinutes = available.reduce(
    (sum, lesson) => sum + lesson.estMinutes,
    0,
  );
  const completedMinutes = completed.reduce(
    (sum, lesson) => sum + lesson.estMinutes,
    0,
  );
  const counts = courseCompletion(course, progress);
  return (
    <div className="page courses-page">
      <nav className="course-breadcrumb" aria-label="Breadcrumb">
        <Link href="/courses">Courses</Link>
        <span aria-hidden="true">/</span>
        <span aria-current="page">{course.title}</span>
      </nav>
      <header className="page-head course-overview-head">
        <LevelLabels levels={course.levels} />
        <h1>{course.title}</h1>
        <p className="page-sub">{course.description}</p>
        <p className="course-prerequisites">
          <strong>Before you begin:</strong> {course.prerequisites}
        </p>
      </header>
      <section
        className="course-overview-progress glass"
        aria-label="Course progress"
      >
        <div>
          <p className="mono course-kicker">Your learning plan</p>
          <h2>
            {formatMinutes(totalMinutes)} · {lessons.length} lessons
          </h2>
          <p>
            {course.modules.length} modules, with explanations, worked examples,
            and practice.
          </p>
        </div>
        <div className="course-progress-summary">
          <label htmlFor="course-progress">
            {completed.length} / {lessons.length} lessons complete
          </label>
          <progress
            id="course-progress"
            value={completed.length}
            max={Math.max(1, lessons.length)}
          />
          <p>{formatMinutes(completedMinutes)} of planned learning completed</p>
          {next && (
            <Link
              className="btn btn-solid btn-small"
              href={courseHref(course.slug, next.slug)}
            >
              {completed.length ? "Continue learning" : "Start learning"}
              <span aria-hidden="true"> →</span>
            </Link>
          )}
        </div>
      </section>
      {available.length < lessons.length && (
        <p className="course-availability">
          {available.length} complete lessons ({formatMinutes(availableMinutes)}
          ) are ready to study. The outline below shows the full course plan;
          upcoming lessons are clearly marked.
        </p>
      )}
      {course.slug === "amc-10-12" && (
        <div className="course-availability">
          <p>
            Study shared AMC 10/12 lessons in order. Lessons marked{" "}
            <strong>AMC 12 extension</strong> add topics and depth for AMC 12
            preparation.
          </p>
          <p className="course-track-counts">
            Shared lessons: {counts.sharedCompleted} / {counts.sharedTotal}{" "}
            complete · AMC 12 extensions: {counts.extensionCompleted} /{" "}
            {counts.extensionTotal} complete
          </p>
        </div>
      )}
      <div className="course-module-list">
        {course.modules.map((module, moduleIndex) => {
          const done = module.lessons.filter(
            (lesson) => progress.lessons[lesson.id]?.completed,
          ).length;
          return (
            <section
              className="course-module"
              key={module.id}
              aria-labelledby={`module-${module.id}`}
            >
              <header className="course-module-head">
                <span className="course-module-number mono">
                  {String(moduleIndex + 1).padStart(2, "0")}
                </span>
                <div>
                  <h2 id={`module-${module.id}`}>{module.title}</h2>
                  <p>
                    {formatMinutes(
                      module.lessons.reduce(
                        (sum, lesson) => sum + lesson.estMinutes,
                        0,
                      ),
                    )}{" "}
                    · {done} / {module.lessons.length} complete
                  </p>
                </div>
              </header>
              <ol className="course-lesson-list">
                {module.lessons.map((lesson, lessonIndex) => {
                  const saved = progress.lessons[lesson.id];
                  const state = saved?.completed
                    ? "Complete"
                    : lesson.status !== "published"
                      ? "Upcoming"
                      : saved
                        ? "In progress"
                        : "Ready to study";
                  return (
                    <li key={lesson.id}>
                      <Link
                        className={`course-lesson-row glass${saved?.completed ? " is-complete" : ""}`}
                        href={courseHref(course.slug, lesson.slug)}
                      >
                        <span
                          className="course-lesson-number mono"
                          aria-hidden="true"
                        >
                          {saved?.completed
                            ? "✓"
                            : `${moduleIndex + 1}.${lessonIndex + 1}`}
                        </span>
                        <div className="course-lesson-row-main">
                          <h3>{lesson.title}</h3>
                          <p>{lesson.objectives[0]}</p>
                          <LevelLabels
                            levels={lesson.levels}
                            extension={lesson.extension}
                          />
                        </div>
                        <div className="course-lesson-row-meta">
                          <span>{lesson.estMinutes} min</span>
                          <span>Difficulty {lesson.difficulty}/10</span>
                          <span
                            className={`course-status${saved?.completed ? " is-complete" : ""}`}
                          >
                            {state}
                          </span>
                        </div>
                        <span className="course-row-arrow" aria-hidden="true">
                          →
                        </span>
                      </Link>
                    </li>
                  );
                })}
              </ol>
            </section>
          );
        })}
      </div>
      <p className="course-storage-note">
        Your progress is saved in this browser. Learning times include reading,
        examples, practice, and review.
      </p>
    </div>
  );
}
