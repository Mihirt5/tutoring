import fs from "node:fs";
import path from "node:path";
import { readLessonFiles, root, taskFingerprint } from "./content-utils.mjs";
const filename = path.join(root, "docs/course-verification.json");
const ledger = JSON.parse(fs.readFileSync(filename, "utf8"));
const tasks = new Map(
  readLessonFiles().flatMap(({ lesson }) =>
    [...lesson.examples, ...lesson.exercises].map((item) => [item.id, item]),
  ),
);
for (const item of ledger) {
  if (item.status !== "pass" || item.fingerprint) continue;
  const task = tasks.get(item.id);
  if (!task) throw new Error(`Reviewed task missing: ${item.id}`);
  item.fingerprint = taskFingerprint(task);
}
fs.writeFileSync(filename, JSON.stringify(ledger, null, 2) + "\n");
console.log(
  `Sealed ${ledger.length} independent review records; later task changes require a fresh review.`,
);
