import type { Lesson } from "@/lib/types";
import { lesson as estimation } from "./estimation-number-sense";
import { lesson as ratios } from "./ratios-proportional-reasoning";
import { lesson as linear } from "./linear-equations-mastery";
import { lesson as quadratics } from "./quadratics-vieta";
import { lesson as sequences } from "./sequences-telescoping";
import { lesson as angles } from "./angle-chasing";
import { lesson as similar } from "./similar-triangles";
import { lesson as counting } from "./counting-fundamentals";
import { lesson as casework } from "./casework-complementary";
import { lesson as ev } from "./expected-value";
import { lesson as modular } from "./modular-arithmetic";
import { lesson as invariants } from "./invariants-monovariants";

export const LESSONS: Lesson[] = [
  estimation, ratios, linear, quadratics, sequences, angles,
  similar, counting, casework, ev, modular, invariants,
];

export const lessonContentBySlug = new Map(LESSONS.map(l => [l.slug, l]));
