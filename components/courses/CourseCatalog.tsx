"use client";

import Link from "next/link";
import type { Course } from "@/lib/courses/types";
import { useProgress } from "@/lib/store";
import { courseCompletion } from "@/lib/courses/progress";
import { courseHref, courseLessons } from "@/content/courses/manifest";
import { formatMinutes, LevelLabels } from "./shared";

export function CourseCatalog({ courses }: { courses: Course[] }) {
  const progress = useProgress();
  return (
    <div className="course-catalog">
      {courses.map((course, index) => {
        const lessons = courseLessons(course);
        const published = lessons.filter(
          (lesson) => lesson.status === "published",
        );
        const completed = published.filter(
          (lesson) => progress.lessons[lesson.id]?.completed,
        );
        const totalMinutes = lessons.reduce(
          (sum, lesson) => sum + lesson.estMinutes,
          0,
        );
        const availableMinutes = published.reduce(
          (sum, lesson) => sum + lesson.estMinutes,
          0,
        );
        const counts = courseCompletion(course, progress);
        return (
          <article className="course-card glass" key={course.slug}>
            <div className="course-card-top">
              <p className="mono course-index">
                COURSE · {String(index + 1).padStart(2, "0")}
              </p>
              <LevelLabels levels={course.levels} />
            </div>
            <h2>
              <Link href={courseHref(course.slug)}>{course.title}</Link>
            </h2>
            <p className="course-description">{course.description}</p>
            <dl className="course-facts">
              <div>
                <dt>Learning plan</dt>
                <dd>{formatMinutes(totalMinutes)}</dd>
              </div>
              <div>
                <dt>Modules</dt>
                <dd>{course.modules.length}</dd>
              </div>
              <div>
                <dt>Lessons</dt>
                <dd>{lessons.length}</dd>
              </div>
            </dl>
            <div className="course-card-progress">
              <label htmlFor={`progress-${course.slug}`}>
                {completed.length} of {lessons.length} lessons complete
              </label>
              <progress
                id={`progress-${course.slug}`}
                value={completed.length}
                max={Math.max(1, lessons.length)}
              />
              {published.length < lessons.length && (
                <p>
                  {published.length} lessons available ·{" "}
                  {formatMinutes(availableMinutes)} ready to study
                </p>
              )}
              {course.slug === "amc-10-12" && (
                <p>
                  Shared: {counts.sharedCompleted}/{counts.sharedTotal} · AMC 12
                  extensions: {counts.extensionCompleted}/
                  {counts.extensionTotal}
                </p>
              )}
            </div>
            <Link
              className="btn btn-solid course-card-link"
              href={courseHref(course.slug)}
            >
              Explore course <span aria-hidden="true">→</span>
            </Link>
          </article>
        );
      })}
    </div>
  );
}
