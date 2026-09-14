import fs from "node:fs";
import path from "node:path";
import { readLessonFiles } from "./content-utils.mjs";
const [course, module] = process.argv.slice(2);
const files = readLessonFiles().filter(
  (item) =>
    (!course || item.course === course) && (!module || item.module === module),
);
const statements = files.flatMap(({ course, module, lesson }) => [
  ...lesson.examples.map((item) => ({
    id: item.id,
    course,
    module,
    statement: item.problem,
  })),
  ...lesson.exercises.map((item) => ({
    id: item.id,
    course,
    module,
    statement: item.question,
    choices: item.choices,
  })),
]);
const directory = "/private/tmp/lucid-course-review";
fs.mkdirSync(directory, { recursive: true });
const file = path.join(
  directory,
  `${course ?? "all"}-${module ?? "all"}-statements.json`,
);
fs.writeFileSync(file, JSON.stringify(statements, null, 2));
console.log(
  `${statements.length} statements exported without answers: ${file}`,
);
