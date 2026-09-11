// Pilot problem generator. Uses the AI Gateway to write ORIGINAL competition-style
// problems for a handful of topics, validates their shape, and writes them to a
// staging JSON file for human review — nothing here touches content/problems/*.ts
// directly. Once a batch looks good, merge the reviewed problems in by hand.
//
// Requires AI_GATEWAY_API_KEY (create one at vercel.com -> AI Gateway -> API Keys,
// then `vercel env pull .env.local`, or paste it into .env.local directly).
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
import { generateObject } from "ai";
import { z } from "zod";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

if (!process.env.AI_GATEWAY_API_KEY) {
  console.error(
    "Missing AI_GATEWAY_API_KEY. Create one at vercel.com -> your team -> AI Gateway -> API Keys,\n" +
    "add it to .env.local, then re-run with: node --env-file=.env.local scripts/generate-problems.mjs",
  );
  process.exit(1);
}

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
  answer: z.number().describe("Integer value, or for mcq the 0-indexed choice."),
  choices: z.array(z.string()).length(5).optional().describe("Required when answerType is mcq, exactly 5 choices."),
  subtopic: z.string(),
  tags: z.array(z.string()).min(1).max(4),
  difficulty: z.number().int(),
  estMinutes: z.number().int(),
  hints: z.tuple([z.string(), z.string(), z.string()]).describe("Three escalating hints: orienting, strategic, concrete."),
  solution: z.string().describe("Full worked solution, ending in the final answer."),
  commonMistakes: z.array(z.string()).max(2).optional(),
});

const BatchSchema = z.object({ problems: z.array(ProblemSchema) });

async function generateForTopic(topicId) {
  const [lo, hi] = DIFFICULTY_BAND[track] ?? [1, 8];

  const { object } = await generateObject({
    // gpt-4o-mini: the only reliable model this Gateway account (free tier) can
    // reach. Weaker at multi-step math than claude-sonnet-5 — review answers
    // extra carefully; switch this once AI Gateway credits are added.
    model: "openai/gpt-4o-mini",
    schema: BatchSchema,
    prompt: `Write ${count} ORIGINAL ${track}-style competition math problems for the topic "${topicId}".

Rules:
- Every problem must be entirely your own invention — new numbers, new scenarios, new phrasing. Never reproduce, closely paraphrase, or lightly reskin a problem from any specific book, course, or past contest.
- Difficulty must fall between ${lo} and ${hi} on a 1-10 scale, varied across the batch.
- Double-check every computation yourself before finalizing — an incorrect final answer is a critical failure.
- answerType "integer" for a numeric final answer; "mcq" only when five clean answer choices genuinely fit.
- hints must be exactly three, escalating: (1) an orienting question, (2) a strategic nudge, (3) a concrete next step — never the answer itself.
- solution must be a complete, rigorous, step-by-step derivation ending in the final answer.
- Use LaTeX ($...$ inline, $$...$$ display) for all math.`,
  });

  return object.problems.map((p, i) => ({
    id: `${topicId}-gen-${Date.now().toString(36)}-${i}`,
    topicId,
    source: `${track} style`,
    ...p,
  }));
}

async function main() {
  console.log(`Generating pilot batch: ${count} problems x ${topics.length} topics, track "${track}"\n`);

  const results = [];
  for (const topicId of topics) {
    process.stdout.write(`  ${topicId}... `);
    try {
      const problems = await generateForTopic(topicId);
      results.push(...problems);
      console.log(`${problems.length} generated`);
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
