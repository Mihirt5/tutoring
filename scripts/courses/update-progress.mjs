import fs from "node:fs";
import path from "node:path";
import { readLessonFiles, readTypedFile, root } from "./content-utils.mjs";
const { COURSES } = readTypedFile("content/courses/manifest.ts");
const files = readLessonFiles();
const ledger = JSON.parse(
  fs.readFileSync(path.join(root, "docs/course-verification.json"), "utf8"),
);
const reviewed = new Set(
  ledger.filter((item) => item.status === "pass").map((item) => item.id),
);
const totalLessonCount = COURSES.flatMap((course) =>
  course.modules.flatMap((module) => module.lessons),
).length;
const lines = [
  "# Course generation progress",
  "",
  "Target: two original courses covering combinatorics, algebra, number theory, and geometry (AMC 8) and algebra, geometry, number theory, counting, and probability (AMC 10/12), at 40 estimated active-learning minutes per lesson. AMC 10/12 combines 26 shared lessons (1,040 minutes) and four AMC 12 extensions (160 minutes).",
  "",
  "## Course system",
  "",
  "Implemented: course catalog, module outlines, direct lesson routes, typed modular content, original diagrams, KaTeX, intentional hints and solutions, exact rational grading, browser progress, completion and previous/next navigation. Existing learning paths remain available. Supabase account synchronization is outside this feature; progress is saved on this device.",
  "",
  "## Curriculum coverage and completion",
  "",
  "Published means the body is complete and mathematical tasks have independent verification. Authored drafts remain unavailable until reviewed. Every lesson targets three examples, two guided exercises, four independent exercises, explanations, common mistakes, and summary.",
  "",
];
for (const course of COURSES) {
  const all = course.modules.flatMap((module) => module.lessons);
  const published = all.filter((item) => item.status === "published");
  lines.push(
    `### ${course.title}`,
    "",
    `Published: **${published.length}/${all.length} lessons, ${published.length * 40}/${all.length * 40} minutes**.`,
    "",
    "| Module | Topic coverage and planned lessons | Authored | Published | Independent math review |",
    "| --- | --- | --- | --- | --- |",
  );
  for (const module of course.modules) {
    const authored = files.filter(
      (item) =>
        item.course === course.slug &&
        module.lessons.some((meta) => meta.slug === item.lesson.slug),
    );
    const tasks = authored.flatMap((item) => [
      ...item.lesson.examples,
      ...item.lesson.exercises,
    ]);
    lines.push(
      `| ${module.title} | ${module.lessons.map((item) => item.title).join("; ")} | ${authored.length}/${module.lessons.length} | ${module.lessons.filter((item) => item.status === "published").length}/${module.lessons.length} | ${tasks.filter((item) => reviewed.has(item.id)).length}/${tasks.length} tasks |`,
    );
  }
  lines.push("");
}
lines.push(
  "## Validation",
  "",
  "- Baseline before changes: 17 tests and TypeScript passed.",
  "- Representative lessons: all 18 mathematical tasks independently solved and reconciled; original methods recorded in `docs/course-verification.json`.",
  "- Foundation checks: 46 unit tests passed, covering exact grading, manifest structure, completion, local persistence and idempotent credit.",
  "- Pilot browser acceptance: 12 desktop/mobile scenarios passed, including navigation, intentional reveals, fraction/MCQ grading, reload, completion, missing URLs, and legacy examples.",
  "- Run `npm run courses:validate` for complete authored-content structure and strict KaTeX validation. This does not replace independent solving.",
  "- Final formatter, lint, production build, full-curriculum review and final browser regression results must be recorded when run; do not infer completion from this checklist.",
  "",
  "## Source processing",
  "",
  "Three PDFs processed page by page with Poppler: AMC 8 425 pages, AMC 10/12 689 pages, formula reference 144 pages. Extracts, page text, original concept indexes and inspected page images are private at `/private/tmp/lucid-course-reference`; no extracted source text belongs in the application or source control. AMC 8 geometry page289 was visually checked. Ordinary prose is selectable and did not require OCR. Spatial diagram relationships and two-dimensional formulas are not reliably represented by plain text. Many source answers link to external videos; all LUCIDmath examples and exercises require new written solutions.",
  "",
  "## Continue generation",
  "",
  "1. Read this file, `content/courses/manifest.ts`, the private concept index and the original author notes. Preserve uncommitted work.",
  "2. Find the first incomplete module in the tables. Author each missing lesson in `content/courses/<course>/mNN/<slug>.ts` using `lib/courses/types.ts`. Do not overwrite finished lessons.",
  "3. Run `npm run courses:validate` and `npm run typecheck`. Export statement-only review packets with `node scripts/courses/export-review.mjs <course> <mNN>`.",
  "4. Independently solve every example and exercise before viewing the authored answer; reconcile answers and reasoning, then add review entries to `docs/course-verification.json`. Correct failures before publication.",
  "5. Add only verified lesson IDs to `content/courses/published.ts` and their literal dynamic imports to `content/courses/load.ts`. Run originality comparison privately, then relevant unit and browser tests.",
  "6. Regenerate this file with `node scripts/courses/update-progress.mjs`; record remaining work and exact check outcomes. Finish with `npm run format`, `npm run format:check`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run test:e2e`, and `npm run build`.",
  "",
  "## Remaining work",
  "",
  `Complete authoring and independent review for all ${totalLessonCount - COURSES.flatMap((course) => course.modules.flatMap((module) => module.lessons)).filter((item) => item.status === "published").length} unpublished lessons. Run and document final validation.`,
  "",
);
fs.writeFileSync(
  path.join(root, "docs/course-generation-progress.md"),
  lines.join("\n"),
);
console.log("Updated docs/course-generation-progress.md");
