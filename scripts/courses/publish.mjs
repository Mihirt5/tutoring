import fs from "node:fs";
import path from "node:path";
import {
  readLessonFiles,
  readTypedFile,
  root,
  taskFingerprint,
} from "./content-utils.mjs";

const requested = process.argv.slice(2);
if (!requested.length)
  throw new Error(
    "Provide course:slug or course:module selectors to publish reviewed lessons.",
  );
const ledger = JSON.parse(
  fs.readFileSync(path.join(root, "docs/course-verification.json"), "utf8"),
);
const checked = new Map(
  ledger
    .filter((item) => item.status === "pass")
    .map((item) => [item.id, item.fingerprint]),
);
const { PUBLISHED_LESSONS } = readTypedFile("content/courses/published.ts");
const files = readLessonFiles();
for (const { course, module, lesson } of files) {
  if (
    !requested.includes(`${course}:${module}`) &&
    !requested.includes(`${course}:${lesson.slug}`)
  )
    continue;
  for (const item of [...lesson.examples, ...lesson.exercises])
    if (checked.get(item.id) !== taskFingerprint(item))
      throw new Error(
        `Cannot publish: ${item.id} has no current passing independent review.`,
      );
  PUBLISHED_LESSONS.add(`course:${course}:${lesson.slug}`);
}
const published = [...PUBLISHED_LESSONS].sort();
fs.writeFileSync(
  path.join(root, "content/courses/published.ts"),
  "// Only independently reviewed lessons belong here.\nexport const PUBLISHED_LESSONS = new Set(" +
    JSON.stringify(published, null, 2) +
    ");\n",
);
const loaders = files
  .filter(({ course, lesson }) =>
    PUBLISHED_LESSONS.has(`course:${course}:${lesson.slug}`),
  )
  .map(
    ({ course, module, lesson }) =>
      `  ${JSON.stringify(`course:${course}:${lesson.slug}`)}: () => import(${JSON.stringify(`./${course}/${module}/${lesson.slug}`)}),`,
  )
  .join("\n");
fs.writeFileSync(
  path.join(root, "content/courses/load.ts"),
  'import "server-only";\nimport type { CourseLesson } from "@/lib/courses/types";\nimport { getCourseLessonMeta } from "./manifest";\n\nconst loaders: Record<string, () => Promise<{ default: CourseLesson }>> = {\n' +
    loaders +
    '\n};\n\nexport async function loadCourseLesson(courseSlug: string, lessonSlug: string): Promise<CourseLesson | null> {\n  const meta = getCourseLessonMeta(courseSlug, lessonSlug);\n  if (!meta || meta.status !== "published") return null;\n  const load = loaders[meta.id];\n  return load ? (await load()).default : null;\n}\n',
);
console.log(`${published.length} verified lessons registered.`);
