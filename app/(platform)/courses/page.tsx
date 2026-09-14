import type { Metadata } from "next";
import { COURSES } from "@/content/courses/manifest";
import { CourseCatalog } from "@/components/courses/CourseCatalog";

export const metadata: Metadata = {
  title: "AMC Preparation Courses | LUCIDmath",
  description:
    "Build competition mathematics skills with original AMC 8 and AMC 10/12 courses, worked examples, guided practice, and complete solutions.",
};

export default function CoursesPage() {
  return (
    <div className="page courses-page">
      <header className="page-head">
        <p className="eyebrow">Learn with purpose</p>
        <h1>One idea. Then the next.</h1>
        <p className="page-sub">
          Build a connected understanding of competition mathematics. Each
          course pairs clear explanations with problems that put your reasoning
          to work.
        </p>
      </header>
      <CourseCatalog courses={COURSES} />
      <section className="course-method">
        <h2>A complete learning rhythm</h2>
        <div>
          <p>
            <strong>Understand the idea.</strong> Start with the reasoning
            behind a method and see when to use it.
          </p>
          <p>
            <strong>Work through examples.</strong> Reveal each step at your own
            pace, then try with a little guidance.
          </p>
          <p>
            <strong>Make it yours.</strong> Solve independent problems, use
            hints when needed, and review full solutions.
          </p>
        </div>
      </section>
      <p className="course-storage-note">
        All course explanations and practice problems are original LUCIDmath
        material. Progress is saved in this browser.
      </p>
    </div>
  );
}
