import type { Problem, Topic } from "@/lib/types";
import { PROBLEMS } from "@/content/problems";
import { TOPICS, topicById } from "@/content/topics";

// Pattern-recognition rounds: given a problem, the player picks the
// topic that names the strategy actually needed to solve it. Distractors
// lean on topics from the same path so the choice can't be won by
// elimination alone.

export interface PatternRound {
  problem: Problem;
  options: Topic[];
  correctIndex: number;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export function nextRound(exclude: Set<string>): PatternRound {
  const pool = PROBLEMS.filter((p) => !exclude.has(p.id));
  const problem = (pool.length ? pool : PROBLEMS)[
    Math.floor(Math.random() * (pool.length || PROBLEMS.length))
  ];
  const correct = topicById.get(problem.topicId)!;

  const samePath = shuffle(
    TOPICS.filter((t) => t.id !== correct.id && t.pathId === correct.pathId),
  );
  const otherPath = shuffle(
    TOPICS.filter((t) => t.pathId !== correct.pathId),
  );
  const sameTake = samePath.slice(0, 2);
  const distractors = [...sameTake, ...otherPath].slice(0, 3);

  const options = shuffle([correct, ...distractors]);
  return {
    problem,
    options,
    correctIndex: options.findIndex((t) => t.id === correct.id),
  };
}
