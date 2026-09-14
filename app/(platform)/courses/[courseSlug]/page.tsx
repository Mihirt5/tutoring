import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCourse } from "@/content/courses/manifest";
import { CourseOverview } from "@/components/courses/CourseOverview";

type Props = { params: Promise<{ courseSlug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { courseSlug } = await params;
  const course = getCourse(courseSlug);
  return {
    title: course
      ? `${course.title} | LUCIDmath`
      : "Course not found | LUCIDmath",
    description: course?.description,
  };
}

export default async function CoursePage({ params }: Props) {
  const { courseSlug } = await params;
  const course = getCourse(courseSlug);
  if (!course) notFound();
  return <CourseOverview course={course} />;
}
