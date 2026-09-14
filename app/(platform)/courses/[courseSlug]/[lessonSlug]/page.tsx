import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCourse,
  getCourseLessonMeta,
  courseLessons,
  courseHref,
} from "@/content/courses/manifest";
import { loadCourseLesson } from "@/content/courses/load";
import { CourseLessonPlayer } from "@/components/courses/CourseLessonPlayer";
import { LevelLabels } from "@/components/courses/shared";

type Props = { params: Promise<{ courseSlug: string; lessonSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseSlug, lessonSlug } = await params;
  const meta = getCourseLessonMeta(courseSlug, lessonSlug);
  return {
    title: meta ? `${meta.title} | LUCIDmath` : "Lesson not found | LUCIDmath",
    description: meta?.objectives.join(" "),
  };
}

export default async function CourseLessonPage({ params }: Props) {
  const { courseSlug, lessonSlug } = await params;
  const course = getCourse(courseSlug);
  const meta = getCourseLessonMeta(courseSlug, lessonSlug);
  if (!course || !meta) notFound();
  const ordered = courseLessons(course);
  const index = ordered.findIndex((lesson) => lesson.id === meta.id);
  if (meta.status === "planned") {
    const available = ordered.find((lesson) => lesson.status === "published");
    return (
      <div className="page courses-page course-planned-page">
        <nav className="course-breadcrumb" aria-label="Breadcrumb">
          <Link href="/courses">Courses</Link>
          <span aria-hidden="true">/</span>
          <Link href={courseHref(course.slug)}>{course.title}</Link>
        </nav>
        <header className="page-head">
          <p className="eyebrow">
            Upcoming lesson · {index + 1} of {ordered.length}
          </p>
          <LevelLabels levels={meta.levels} extension={meta.extension} />
          <h1>{meta.title}</h1>
          <p className="page-sub">
            This lesson is part of the course plan. Its explanations and
            practice are being prepared.
          </p>
        </header>
        <section className="course-planned-panel glass">
          <h2>What this lesson will cover</h2>
          <ul className="course-objectives">
            {meta.objectives.map((objective) => (
              <li key={objective}>{objective}</li>
            ))}
          </ul>
          <p>
            {meta.estMinutes} minutes planned · Difficulty {meta.difficulty}/10
          </p>
          <div className="course-exercise-actions">
            <Link className="btn btn-ghost" href={courseHref(course.slug)}>
              Course overview
            </Link>
            {available && (
              <Link
                className="btn btn-solid"
                href={courseHref(course.slug, available.slug)}
              >
                Study an available lesson
              </Link>
            )}
          </div>
        </section>
      </div>
    );
  }
  const lesson = await loadCourseLesson(courseSlug, lessonSlug);
  if (!lesson) notFound();
  return (
    <CourseLessonPlayer
      key={meta.id}
      course={course}
      meta={meta}
      lesson={lesson}
      previous={ordered[index - 1]}
      next={ordered[index + 1]}
      position={index + 1}
      total={ordered.length}
    />
  );
}
