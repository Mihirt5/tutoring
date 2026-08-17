"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { ALL_SOURCES, PROBLEMS } from "@/content/problems";
import { TOPICS, topicName } from "@/content/topics";
import { MathText } from "@/components/MathText";
import { useProgress } from "@/lib/store";

const DIFF_BANDS = [
  { id: "all", label: "All", lo: 1, hi: 10 },
  { id: "intro", label: "1–3", lo: 1, hi: 3 },
  { id: "core", label: "4–6", lo: 4, hi: 6 },
  { id: "adv", label: "7–10", lo: 7, hi: 10 },
];

export default function ProblemsPage() {
  const p = useProgress();
  const [topic, setTopic] = useState("all");
  const [band, setBand] = useState("all");
  const [source, setSource] = useState("all");
  const [q, setQ] = useState("");

  const solved = useMemo(
    () => new Set(p.attempts.filter(a => a.correct).map(a => a.problemId)),
    [p.attempts],
  );

  const filtered = useMemo(() => {
    const b = DIFF_BANDS.find(x => x.id === band)!;
    const needle = q.trim().toLowerCase();
    return PROBLEMS.filter(pr =>
      (topic === "all" || pr.topicId === topic) &&
      pr.difficulty >= b.lo && pr.difficulty <= b.hi &&
      (source === "all" || pr.source === source) &&
      (needle === "" ||
        pr.statement.toLowerCase().includes(needle) ||
        pr.tags.some(t => t.includes(needle)) ||
        pr.subtopic.toLowerCase().includes(needle)),
    ).sort((a, b2) => a.difficulty - b2.difficulty);
  }, [topic, band, source, q]);

  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">Problem Bank</p>
        <h1>{PROBLEMS.length} problems, fully annotated.</h1>
        <p className="page-sub">
          Every problem carries three escalating hints, a full solution, and the
          mistakes students actually make. Solving updates your mastery model.
        </p>
      </header>

      <div className="pb-filters">
        <select className="pb-select" value={topic} onChange={e => setTopic(e.target.value)} aria-label="Topic">
          <option value="all">All topics</option>
          {TOPICS.filter(t => PROBLEMS.some(pr => pr.topicId === t.id)).map(t => (
            <option key={t.id} value={t.id}>{t.name}</option>
          ))}
        </select>
        <div className="pb-bands" role="group" aria-label="Difficulty">
          {DIFF_BANDS.map(b => (
            <button key={b.id}
              className={`chip clickable mono${band === b.id ? " active" : ""}`}
              onClick={() => setBand(b.id)}>
              {b.label}
            </button>
          ))}
        </div>
        <select className="pb-select" value={source} onChange={e => setSource(e.target.value)} aria-label="Source style">
          <option value="all">All sources</option>
          {ALL_SOURCES.map(s => <option key={s} value={s}>{s}</option>)}
        </select>
        <input
          className="pb-search"
          placeholder="Search statements, tags…"
          value={q}
          onChange={e => setQ(e.target.value)}
        />
      </div>

      <p className="mono pb-count">{filtered.length} problems · {filtered.filter(f => solved.has(f.id)).length} solved</p>

      <div className="pb-list">
        {filtered.map(pr => (
          <Link key={pr.id} href={`/problems/${pr.id}`} className={`pb-row glass${solved.has(pr.id) ? " solved" : ""}`}>
            <span className="pb-diff mono" title={`Difficulty ${pr.difficulty}/10`}>
              {pr.difficulty}
            </span>
            <span className="pb-statement">
              <MathText text={pr.statement.length > 140 ? pr.statement.slice(0, 140) + "…" : pr.statement} />
            </span>
            <span className="pb-meta mono">
              <span>{topicName(pr.topicId)}</span>
              <span>{pr.source}</span>
              <span>~{pr.estMinutes}m</span>
              {solved.has(pr.id) && <span className="pb-solved">✓</span>}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
