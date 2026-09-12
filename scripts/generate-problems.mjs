// Pilot problem generator. Uses OpenRouter to write ORIGINAL competition-style
// problems for a handful of topics, validates their shape, and writes them to a
// staging JSON file for human review — nothing here touches content/problems/*.ts
// directly. Once a batch looks good, merge the reviewed problems in by hand.
//
// Requires OPENROUTER_API_KEY (create one at openrouter.ai/keys, add it to
// .env.local). Defaults to a free-tier model — swap MODEL_ID below once you've
// validated quality and want something stronger.
//
// Usage:
//   node --env-file=.env.local scripts/generate-problems.mjs
//   node --env-file=.env.local scripts/generate-problems.mjs --track "AMC 10/12" --count 8 \
//     --topics quadratics,divisibility,perms-combs
//
// IMPORTANT: problems must be wholly original. Never ask the model to reproduce,
// paraphrase, or lightly reskin a specific problem from any book or past contest —
// only to write new problems in a given topic/style/difficulty band.

import { writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { generateText } from "ai";
import { createOpenRouter } from "@openrouter/ai-sdk-provider";
import { z } from "zod";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

// Free-tier model — decent reasoning for a $0 model, but review answers
// carefully. Swap for a paid OpenRouter model (or claude-sonnet-5 via the AI
// Gateway) once quality/quota need it.
const MODEL_ID = "nvidia/nemotron-3-ultra-550b-a55b:free";

if (!process.env.OPENROUTER_API_KEY) {
  console.error(
    "Missing OPENROUTER_API_KEY. Create one at openrouter.ai/keys,\n" +
    "add it to .env.local, then re-run with: node --env-file=.env.local scripts/generate-problems.mjs",
  );
  process.exit(1);
}

const openrouter = createOpenRouter({ apiKey: process.env.OPENROUTER_API_KEY });

function parseArgs(argv) {
  const args = { track: "AMC 8", count: 5, topics: ["counting-basics", "divisibility", "quadratics"] };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--track") args.track = argv[++i];
    else if (arg === "--count") args.count = Number(argv[++i]);
    else if (arg === "--topics") args.topics = argv[++i].split(",").map((s) => s.trim());
  }
  return args;
}

const { track, count, topics } = parseArgs(process.argv.slice(2));

const DIFFICULTY_BAND = {
  "AMC 8": [1, 5],
  "AMC 10/12": [4, 8],
  AIME: [6, 9],
  USAMTS: [6, 9],
  "Problem Solving": [2, 6],
};

const ProblemSchema = z.object({
  statement: z.string().describe("The full problem statement. Use $...$ for inline LaTeX math."),
  answerType: z.enum(["integer", "mcq"]),
  // The model reliably gets the MATH right but unreliably gets index arithmetic
  // right, so we ask for the literal correct value/text here and resolve it to
  // a 0-indexed choice ourselves in post-processing — never trust the model's
  // own index math for mcq.
  answer: z.union([z.number(), z.string()]).describe("Integer value, or for mcq the exact text of the correct choice (not an index)."),
  choices: z.array(z.string()).length(5).optional().describe("Required when answerType is mcq, exactly 5 choices."),
  subtopic: z.string(),
  tags: z.array(z.string()).min(1).max(4),
  difficulty: z.number().int(),
  estMinutes: z.number().int(),
  hints: z.tuple([z.string(), z.string(), z.string()]).describe("Three escalating hints: orienting, strategic, concrete."),
  solution: z.string().describe("Full worked solution, ending in the final answer."),
  commonMistakes: z.array(z.string()).max(4).optional(),
});

const BatchSchema = z.object({ problems: z.array(ProblemSchema) });

// Some free/open models on OpenRouter error out on native structured-output
// (tool-calling) requests, so we ask for plain JSON in the prompt and parse +
// validate it ourselves with zod — works with any text-capable model.
function extractJson(text) {
  const fenced = text.match(/```(?:json)?\s*([\s\S]*?)```/);
  const raw = fenced ? fenced[1] : text;
  const start = raw.indexOf("{");
  const end = raw.lastIndexOf("}");
  if (start === -1 || end === -1) throw new Error("no JSON object found in model output");
  return JSON.parse(raw.slice(start, end + 1));
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Free-tier models on OpenRouter occasionally return transient
// overload/internal-server errors — worth a couple of retries before giving up.
async function withRetries(fn, attempts = 3) {
  let lastErr;
  for (let i = 0; i < attempts; i++) {
    try {
      return await fn();
    } catch (err) {
      lastErr = err;
      if (i < attempts - 1) await sleep(3000 * (i + 1));
    }
  }
  throw lastErr;
}

async function generateForTopic(topicId) {
  const [lo, hi] = DIFFICULTY_BAND[track] ?? [1, 8];

  const { text } = await withRetries(() => generateText({
    model: openrouter.chat(MODEL_ID),
    prompt: `Write ${count} ORIGINAL ${track}-style competition math problems for the topic "${topicId}".

Rules:
- Every problem must be entirely your own invention — new numbers, new scenarios, new phrasing. Never reproduce, closely paraphrase, or lightly reskin a problem from any specific book, course, or past contest.
- Difficulty must fall between ${lo} and ${hi} on a 1-10 scale, varied across the batch.
- Double-check every computation yourself before finalizing — an incorrect final answer is a critical failure.
- answerType "integer" for a numeric final answer; "mcq" only when five clean answer choices genuinely fit.
- For mcq, "answer" must be the exact text of the correct choice, copied verbatim from "choices" — never an index number.
- hints must be exactly three, escalating: (1) an orienting question, (2) a strategic nudge, (3) a concrete next step — never the answer itself.
- solution must be a complete, rigorous, step-by-step derivation ending in the final answer.
- Use LaTeX ($...$ inline, $$...$$ display) for all math.

Respond with ONLY a single JSON object, no prose, no markdown fences, of the exact shape:
{"problems": [{"statement": string, "answerType": "integer" | "mcq", "answer": number | string, "choices"?: string[5], "subtopic": string, "tags": string[1-4], "difficulty": number, "estMinutes": number, "hints": [string, string, string], "solution": string, "commonMistakes"?: string[]}]}`,
  }));

  const parsed = BatchSchema.parse(extractJson(text));

  return parsed.problems.map((p, i) => {
    const problem = {
      id: `${topicId}-gen-${Date.now().toString(36)}-${i}`,
      topicId,
      source: `${track} style`,
      ...p,
    };

    if (p.answerType === "mcq") {
      const idx = (p.choices ?? []).findIndex(
        (c) => c.trim().replace(/^\$|\$$/g, "") === String(p.answer).trim().replace(/^\$|\$$/g, ""),
      );
      if (idx === -1) {
        problem._needsReview = `mcq answer "${p.answer}" did not match any choice verbatim — check by hand`;
      } else {
        problem.answer = idx;
      }
    } else if (typeof p.answer === "string") {
      const n = Number(p.answer);
      problem.answer = Number.isFinite(n) ? n : p.answer;
    }

    return problem;
  });
}

async function main() {
  console.log(`Generating pilot batch: ${count} problems x ${topics.length} topics, track "${track}"\n`);

  const results = [];
  for (const topicId of topics) {
    process.stdout.write(`  ${topicId}... `);
    try {
      const problems = await generateForTopic(topicId);
      results.push(...problems);
      const flagged = problems.filter((p) => p._needsReview).length;
      console.log(`${problems.length} generated${flagged ? ` (${flagged} flagged for review)` : ""}`);
    } catch (err) {
      console.log(`FAILED (${err.message})`);
    }
  }

  const outDir = path.join(rootDir, "content", "problems", "generated");
  mkdirSync(outDir, { recursive: true });
  const outFile = path.join(outDir, `pilot-${Date.now()}.json`);
  writeFileSync(outFile, JSON.stringify(results, null, 2));

  console.log(`\nWrote ${results.length} problems to ${path.relative(rootDir, outFile)}`);
  console.log("Review each one for correctness before merging into content/problems/*.ts — nothing here is live yet.");
}

main();
