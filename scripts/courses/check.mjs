import katex from "katex";
import fs from "node:fs";
import path from "node:path";
import {
  readLessonFiles,
  readTypedFile,
  textFields,
  root,
  taskFingerprint,
} from "./content-utils.mjs";

const { COURSES } = readTypedFile("content/courses/manifest.ts");
const { parseRational } = readTypedFile("lib/courses/answers.ts");
const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const ids = new Set();
const statements = new Map();
const files = readLessonFiles();
const ledger = new Map(
  JSON.parse(
    fs.readFileSync(path.join(root, "docs/course-verification.json"), "utf8"),
  ).map((item) => [item.id, item]),
);
let formulas = 0;
for (const course of COURSES) {
  const lessons = course.modules.flatMap((module) => module.lessons);
  check(lessons.length > 0, `${course.slug}: expected at least one lesson`);
  check(
    lessons.reduce((total, lesson) => total + lesson.estMinutes, 0) ===
      lessons.length * 40,
    `${course.slug}: every lesson must be 40 minutes`,
  );
  for (const [index, meta] of lessons.entries()) {
    check(!ids.has(meta.id), `Duplicate ${meta.id}`);
    ids.add(meta.id);
    check(
      meta.objectives.length >= 3 && meta.concepts.length > 0,
      `${meta.id}: missing metadata`,
    );
    check(
      Object.values(meta.activityMinutes).reduce((a, b) => a + b, 0) ===
        meta.estMinutes,
      `${meta.id}: activity minutes`,
    );
    for (const prerequisite of meta.prereqs)
      check(
        lessons.slice(0, index).some((lesson) => lesson.slug === prerequisite),
        `${meta.id}: missing or forward prerequisite ${prerequisite}`,
      );
    if (meta.status === "published")
      check(
        files.some(
          (file) =>
            file.course === course.slug && file.lesson.slug === meta.slug,
        ),
        `${meta.id}: published body missing`,
      );
  }
}
for (const { course, lesson, filename } of files) {
  const meta = COURSES.find((item) => item.slug === course)
    ?.modules.flatMap((module) => module.lessons)
    .find((item) => item.slug === lesson.slug);
  const prefix = `${course}/${lesson.slug}`;
  check(!!meta, `${filename}: no metadata`);
  check(
    lesson.sections.length >= 3,
    `${prefix}: three teaching sections required`,
  );
  const words = lesson.sections
    .flatMap((section) => section.body)
    .join(" ")
    .split(/\s+/).length;
  check(
    words >= 250,
    `${prefix}: only ${words} teaching words; explain the ideas before practice`,
  );
  check(
    lesson.intro.length >= 80 &&
      lesson.summary.length >= 3 &&
      lesson.commonMistakes.length >= 2 &&
      lesson.nextConnection.length >= 40,
    `${prefix}: instructional structure incomplete`,
  );
  check(lesson.examples.length === 3, `${prefix}: three examples required`);
  check(
    lesson.exercises.filter((exercise) => exercise.role === "guided").length ===
      2,
    `${prefix}: two guided exercises required`,
  );
  check(
    lesson.exercises.filter((exercise) => exercise.role === "independent")
      .length === 4,
    `${prefix}: four independent exercises required`,
  );
  for (const item of [
    ...lesson.sections,
    ...lesson.examples,
    ...lesson.exercises,
  ]) {
    check(!ids.has(item.id), `Duplicate ${item.id}`);
    ids.add(item.id);
  }
  for (const example of lesson.examples)
    check(
      example.steps.length >= 3 && example.answer && example.takeaway,
      `${example.id}: incomplete worked example`,
    );
  for (const exercise of lesson.exercises) {
    check(
      exercise.hints.length === 3 &&
        exercise.hints.every((hint) => hint.length > 10),
      `${exercise.id}: hint ladder incomplete`,
    );
    check(
      exercise.solutionSteps.length >= 3,
      `${exercise.id}: solution must explain the reasoning`,
    );
    if (exercise.kind === "numeric")
      check(
        !!parseRational(exercise.answer),
        `${exercise.id}: invalid exact numeric answer`,
      );
    else
      check(
        Number.isInteger(exercise.answer) &&
          exercise.answer >= 0 &&
          exercise.answer < exercise.choices.length &&
          new Set(exercise.choices).size === exercise.choices.length,
        `${exercise.id}: invalid or duplicate choices`,
      );
  }
  for (const item of [...lesson.examples, ...lesson.exercises]) {
    if (meta?.status === "published") {
      const review = ledger.get(item.id);
      check(
        review?.status === "pass" &&
          review.fingerprint === taskFingerprint(item),
        `${item.id}: published task lacks a current independent review`,
      );
    }
    const statement = item.problem ?? item.question;
    const normalized = statement
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, " ")
      .trim();
    check(
      !statements.has(normalized),
      `${item.id}: duplicate statement with ${statements.get(normalized)}`,
    );
    statements.set(normalized, item.id);
  }
  for (const text of textFields(lesson)) {
    const expression = /(\$\$[^$]+\$\$|\$[^$]+\$)/g;
    const remainder = text.replace(expression, (fragment) => {
      const display = fragment.startsWith("$$");
      try {
        katex.renderToString(
          fragment.slice(display ? 2 : 1, display ? -2 : -1),
          { throwOnError: true, displayMode: display, strict: "error" },
        );
        formulas++;
      } catch (error) {
        errors.push(`${prefix}: ${error.message}`);
      }
      return "";
    });
    check(
      !remainder.includes("$"),
      `${prefix}: unmatched math delimiter: ${text.slice(0, 90)}`,
    );
  }
}
if (errors.length) {
  console.error(errors.join("\n"));
  process.exitCode = 1;
} else
  console.log(
    `Validated ${files.length} authored lessons, ${files.length * 9} examples/exercises, and ${formulas} math expressions. Mathematical correctness requires the independent review ledger.`,
  );
