// Drafts new Spot the Concept problems with an LLM via OpenRouter. Drafts land
// in content/spot/drafts/ — never in the live bank. A draft joins the bank only
// after it passes `npm run spot:validate -- <draft file>`, gets an answer check
// in scripts/spot/verify_answers.py, and survives the distractor check
// (see content/spot/README.md).
//
// Requires OPENROUTER_API_KEY in .env.local (not needed for --dry-run).
//
// Usage:
//   npm run spot:generate -- --area geometry --count 5
//   npm run spot:generate -- --area algebra --level AIME --count 3
//   npm run spot:generate -- --concept power-of-a-point,vieta --count 2
//   npm run spot:generate -- --area combinatorics --dry-run    # print prompts only
//
// Problems must be ORIGINAL. The prompt forbids reproducing contest text; MAA
// owns it. A draft may name a past problem in `inspired_by` as a pattern
// reference, which the app shows as "Similar to …" with an AoPS link.

import {
  readFileSync,
  readdirSync,
  writeFileSync,
  mkdirSync,
  existsSync,
} from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import {
  AREA_PREFIX,
  PROBLEM_LEVELS,
  choiceCount,
} from "../../lib/spot/schema.ts";
import { validateConcepts, validateProblems } from "../../lib/spot/validate.ts";

const root = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "../..",
);
const MODEL_ID = "nvidia/nemotron-3-ultra-550b-a55b:free"; // same default as scripts/generate-problems.mjs

function parseArgs(argv) {
  const args = { count: 3, dryRun: false };
  for (let i = 0; i < argv.length; i++) {
    const a = argv[i];
    if (a === "--area") args.area = argv[++i];
    else if (a === "--level") args.level = argv[++i];
    else if (a === "--concept")
      args.concepts = argv[++i].split(",").map((s) => s.trim());
    else if (a === "--count") args.count = Number(argv[++i]);
    else if (a === "--dry-run") args.dryRun = true;
    else throw new Error(`unknown argument ${a}`);
  }
  if (args.level && !PROBLEM_LEVELS.includes(args.level))
    throw new Error(`--level must be one of ${PROBLEM_LEVELS.join(", ")}`);
  return args;
}

const args = parseArgs(process.argv.slice(2));
const read = (f) => JSON.parse(readFileSync(f, "utf8"));
const { concepts } = validateConcepts(
  read(path.join(root, "content/spot/concepts.json")),
);
const byId = new Map(concepts.map((c) => [c.id, c]));

// Existing ids (bank + drafts) so new ids never collide.
function existingIds() {
  const ids = new Set();
  for (const dir of ["content/spot/problems", "content/spot/drafts"]) {
    const full = path.join(root, dir);
    if (!existsSync(full)) continue;
    for (const f of readdirSync(full).filter((f) => f.endsWith(".json")))
      for (const p of read(path.join(full, f))) ids.add(p.id);
  }
  return ids;
}

// Pick target concepts: explicit list, or sample the area by frequency
// (60% core, 30% common, 10% rare) to keep the bank's mix on target.
function targets() {
  if (args.concepts) {
    for (const id of args.concepts)
      if (!byId.has(id)) throw new Error(`unknown concept ${id}`);
    return args.concepts.flatMap((id) => Array(args.count).fill(byId.get(id)));
  }
  const pool = concepts.filter(
    (c) =>
      (!args.area || c.area === args.area) &&
      (!args.level || c.level.includes(args.level)) &&
      c.level.some((l) => l !== "Beyond"),
  );
  if (!pool.length) throw new Error("no concepts match those filters");
  const weight = { core: 0.6, common: 0.3, rare: 0.1 };
  const out = [];
  for (let i = 0; i < args.count; i++) {
    const tiers = Object.keys(weight).filter((f) =>
      pool.some((c) => c.frequency === f),
    );
    let r = Math.random() * tiers.reduce((s, f) => s + weight[f], 0);
    const tier = tiers.find((f) => (r -= weight[f]) < 0) ?? tiers[0];
    const inTier = pool.filter((c) => c.frequency === tier);
    out.push(inTier[Math.floor(Math.random() * inTier.length)]);
  }
  return out;
}

function promptFor(concept, level) {
  const sameArea = concepts.filter(
    (c) => c.area === concept.area && c.id !== concept.id,
  );
  const n = choiceCount(level) - 1;
  return `Write ONE original ${level === "AIME" ? "AIME" : `AMC ${level}`}-style competition math problem whose KEY STEP is this concept:

${JSON.stringify(concept, null, 2)}

The student will NOT solve the problem; they must identify which concept unlocks it. So:
- The concept must be the key step, not something incidental. A student who knows only the distractor concepts should get stuck.
- Never name the concept or quote its formula in the problem text. It must read like a real contest problem.
- The problem must be entirely your own: new numbers, new setting, new phrasing. Never reproduce or reskin a real contest problem. If it follows the pattern of a known problem, put a reference like "2020 AMC 12B #12" in inspired_by; otherwise omit inspired_by.
- Choose exactly ${n} distractors from this list, preferring the concept's confusable_with and concepts whose SURFACE features the problem shares: ${sameArea.map((c) => c.id).join(", ")}.
- A distractor must NOT work as a first move. Any other legitimate route goes in also_valid instead (never also a distractor), with a note in also_valid_notes saying why the key concept is faster.
- why_not has one entry per distractor explaining why it fails here.
- first_move is the opening step only, not the solution.
- answer is the exact final answer as a string (integer, or a fraction like "7/9"). Verify it twice.
- Use $...$ for all math, with balanced delimiters. In JSON, escape backslashes (\\\\frac).

Respond with ONLY a JSON object:
{"problem": string, "level": "${level}", "difficulty": 1-5, "primary_concept": "${concept.id}", "also_valid": string[], "also_valid_notes": {id: string}, "distractors": string[${n}], "trigger_explanation": string, "why_not": {id: string}, "first_move": string, "answer": string, "solution_sketch": string, "inspired_by"?: string}`;
}

function extractJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1)
    throw new Error("no JSON object found in model output");
  return JSON.parse(raw.slice(start, end + 1));
}

async function withRetries(fn, attempts = 3) {
  let last;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      last = err;
      if (i < attempts - 1)
        await new Promise((r) => setTimeout(r, 3000 * (i + 1)));
    }
  }
  throw last;
}

async function main() {
  const list = targets();
  const levelFor = (c) =>
    args.level ??
    c.level.filter((l) => l !== "Beyond")[
      Math.floor(Math.random() * c.level.filter((l) => l !== "Beyond").length)
    ];

  if (args.dryRun) {
    for (const c of list)
      console.log(`\n──── ${c.id} ────\n${promptFor(c, levelFor(c))}`);
    return;
  }
  if (!process.env.OPENROUTER_API_KEY) {
    console.error(
      "Missing OPENROUTER_API_KEY. Add it to .env.local, or use --dry-run to see the prompts.",
    );
    process.exit(1);
  }
  const { generateText } = await import("ai");
  const { createOpenRouter } = await import("@openrouter/ai-sdk-provider");
  const openrouter = createOpenRouter({
    apiKey: process.env.OPENROUTER_API_KEY,
  });

  const ids = existingIds();
  const nextId = (area) => {
    const prefix = AREA_PREFIX[area];
    for (let n = 1; ; n++) {
      const id = `${prefix}-${String(n).padStart(4, "0")}`;
      if (!ids.has(id)) return (ids.add(id), id);
    }
  };

  const drafts = [];
  for (const c of list) {
    const level = levelFor(c);
    process.stdout.write(`  ${c.id} (${level})… `);
    try {
      const { text } = await withRetries(() =>
        generateText({
          model: openrouter.chat(MODEL_ID),
          prompt: promptFor(c, level),
        }),
      );
      const draft = { id: nextId(c.area), ...extractJson(text) };
      drafts.push(draft);
      console.log(draft.id);
    } catch (err) {
      console.log(`FAILED (${err.message})`);
    }
  }
  if (!drafts.length) process.exit(1);

  const outDir = path.join(root, "content/spot/drafts");
  mkdirSync(outDir, { recursive: true });
  const outFile = path.join(
    outDir,
    `${args.area ?? "mixed"}-${Date.now()}.json`,
  );
  writeFileSync(outFile, JSON.stringify(drafts, null, 2) + "\n");

  const { report } = validateProblems(drafts, concepts, { checkMix: false });
  console.log(
    `\nWrote ${drafts.length} drafts to ${path.relative(root, outFile)}`,
  );
  if (report.errors.length) {
    console.log(
      `\n${report.errors.length} validation error(s) to fix before promoting:`,
    );
    for (const e of report.errors) console.log(`  - ${e}`);
  } else
    console.log(
      "All drafts pass the validator. Next: add answer checks and run the distractor review.",
    );
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
