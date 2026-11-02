// Validates the Spot the Concept taxonomy and problem bank.
//
// Usage:
//   npm run spot:validate                     # content/spot/problems/*.json
//   npm run spot:validate -- content/spot/drafts/batch.json   # a draft file
//
// Fails (exit 1) on any error. Answer correctness is checked separately by
// scripts/spot/verify_answers.py (npm run spot:verify).

import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateConcepts, validateProblems } from "../../lib/spot/validate.ts";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const read = (f) => JSON.parse(readFileSync(f, "utf8"));

const { concepts, report: conceptReport } = validateConcepts(
  read(path.join(root, "content/spot/concepts.json")),
);

const files = process.argv.slice(2).length
  ? process.argv.slice(2).map((f) => path.resolve(f))
  : readdirSync(path.join(root, "content/spot/problems"))
      .filter((f) => f.endsWith(".json"))
      .map((f) => path.join(root, "content/spot/problems", f));

const raw = files.flatMap((f) => {
  const data = read(f);
  if (!Array.isArray(data)) {
    conceptReport.errors.push(
      `${path.relative(root, f)}: expected an array of problems`,
    );
    return [];
  }
  return data;
});

const isDraft = process.argv.slice(2).length > 0;
const { problems, report } = validateProblems(raw, concepts, {
  checkMix: !isDraft,
});

const errors = [...conceptReport.errors, ...report.errors];
const warnings = [...conceptReport.warnings, ...report.warnings];

for (const w of warnings) console.warn(`warning: ${w}`);
for (const e of errors) console.error(`error: ${e}`);

const byArea = {};
const byId = new Map(concepts.map((c) => [c.id, c]));
for (const p of problems) {
  const area = byId.get(p.primary_concept)?.area ?? "?";
  byArea[area] = (byArea[area] ?? 0) + 1;
}
console.log(
  `\n${concepts.length} concepts · ${problems.length} problems ` +
    `(${Object.entries(byArea)
      .map(([a, n]) => `${a} ${n}`)
      .join(", ")})`,
);

if (errors.length) {
  console.error(`\n✗ ${errors.length} error${errors.length === 1 ? "" : "s"}`);
  process.exit(1);
}
console.log("✓ bank is valid");
