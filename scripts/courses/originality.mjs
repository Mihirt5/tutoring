import fs from "node:fs";
import path from "node:path";
import { readLessonFiles, textFields } from "./content-utils.mjs";

const sourceDirectory =
  process.argv[2] ?? "/private/tmp/lucid-course-reference";
const names = ["amc8.txt", "amc1012.txt", "formulas.txt"];
if (names.some((name) => !fs.existsSync(path.join(sourceDirectory, name))))
  throw new Error(
    "Private source extracts unavailable; recreate them before running this check.",
  );
const tokenize = (text) =>
  text
    .replace(/\$\$[^$]*\$\$|\$[^$]*\$/g, " ")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim()
    .split(/\s+/);
const windowSize = 12;
const sourcePhrases = new Map();
for (const name of names) {
  const words = tokenize(
    fs.readFileSync(path.join(sourceDirectory, name), "utf8"),
  );
  for (let i = 0; i <= words.length - windowSize; i++)
    sourcePhrases.set(words.slice(i, i + windowSize).join(" "), name);
}
const matches = [];
for (const { course, lesson } of readLessonFiles()) {
  const found = new Set();
  for (const text of textFields(lesson)) {
    const words = tokenize(text);
    for (let i = 0; i <= words.length - windowSize; i++) {
      const phrase = words.slice(i, i + windowSize).join(" ");
      if (sourcePhrases.has(phrase) && !found.has(phrase)) {
        found.add(phrase);
        matches.push({
          course,
          lesson: lesson.slug,
          source: sourcePhrases.get(phrase),
          phrase,
        });
      }
    }
  }
}
const output = path.join(sourceDirectory, "originality-matches.json");
fs.writeFileSync(output, JSON.stringify(matches, null, 2));
console.log(
  `Compared all authored lesson text with three private extracts: ${matches.length} matching 12-word passages. Review matches privately at ${output}. This heuristic does not establish originality of problem structure.`,
);
