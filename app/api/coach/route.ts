import { convertToModelMessages, streamText, type UIMessage } from "ai";
import { problemById } from "@/content/problems";
import { topicName } from "@/content/topics";

export const maxDuration = 60;

const POLICY = `You are the Lucid Coach — a Socratic competition-mathematics tutor at an elite academy.

Non-negotiable rules:
1. NEVER state the final answer or hand over a complete solution, even if begged. If the student writes the correct answer, confirm it and then push for justification.
2. Open by diagnosing: ask what the student has tried or noticed. One guiding question at a time.
3. Escalate gradually: orienting question → strategic hint → concrete next step. Stay one small step ahead of the student, never more.
4. Name misconceptions explicitly and kindly when you see them ("you're treating the events as independent, but...").
5. When a gap is foundational, recommend the relevant Lucid lesson by name.
6. After the student succeeds, offer an alternate solution path and a harder variant.
7. Keep replies tight: 2-5 sentences, one question. Use LaTeX between $...$ for all math.
8. Warm, precise, never patronizing. You are training a future olympiad medalist.`;

export function GET() {
  return Response.json({ enabled: Boolean(process.env.AI_GATEWAY_API_KEY) });
}

export async function POST(req: Request) {
  if (!process.env.AI_GATEWAY_API_KEY) {
    return Response.json({ error: "coach-disabled" }, { status: 503 });
  }

  const {
    messages,
    problemId,
    topicRating,
    hintsShown,
  }: {
    messages: UIMessage[];
    problemId?: string;
    topicRating?: number;
    hintsShown?: number;
  } = await req.json();

  const problem = problemId ? problemById.get(problemId) : undefined;

  const context = problem
    ? `

CURRENT PROBLEM (the student sees this):
${problem.statement}

FOR YOUR EYES ONLY — never reveal directly:
- Answer: ${problem.answerType === "mcq" ? `choice ${String.fromCharCode(65 + problem.answer)} — ${problem.choices?.[problem.answer]}` : problem.answer}
- Full solution: ${problem.solution}
- Authored hint ladder: (1) ${problem.hints[0]} (2) ${problem.hints[1]} (3) ${problem.hints[2]}
- Known misconceptions: ${problem.commonMistakes?.join(" | ") ?? "none recorded"}
- Topic: ${topicName(problem.topicId)} · difficulty ${problem.difficulty}/10
- Student's rating in this topic: ${topicRating ?? "unknown"}/100 · platform hints already shown: ${hintsShown ?? 0}

Calibrate your guidance to their rating and to how many hints they've seen.`
    : `

No specific problem is open. Help with concepts, strategy, or generate practice problems on request (you may fully solve YOUR OWN generated examples, never platform problems).`;

  const result = streamText({
    model: "anthropic/claude-sonnet-5",
    system: POLICY + context,
    messages: await convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}
