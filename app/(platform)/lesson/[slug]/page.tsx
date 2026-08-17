"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { lessonBySlug, pathOfLesson } from "@/content/curriculum";
import { lessonContentBySlug } from "@/content/lessons";
import { LessonPlayer } from "@/components/LessonPlayer";
import { PROBLEMS } from "@/content/problems";
import { MathText } from "@/components/MathText";
import { topicName } from "@/content/topics";

export default function LessonPage() {
  const { slug } = useParams<{ slug: string }>();
  const meta = lessonBySlug.get(slug);
  const content = lessonContentBySlug.get(slug);

  if (!meta) {
    return <div className="page"><p>Unknown lesson. <Link href="/learn" className="accent">Curriculum</Link></p></div>;
  }

  if (content) {
    return <div className="page page-lesson"><LessonPlayer lesson={content} /></div>;
  }

  // Outline lesson: mapped but not yet authored — offer the bank instead.
  const path = pathOfLesson(slug);
  const topicProblems = PROBLEMS.filter(p => p.topicId === meta.topicId).slice(0, 5);
  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">
          <Link href="/learn">Curriculum</Link> · {path?.title} · {topicName(meta.topicId)}
        </p>
        <h1>{meta.title}</h1>
        <p className="page-sub">{meta.summary}</p>
      </header>

      <section className="glass outline-panel">
        <p className="mono lp-tag">Objectives</p>
        <ul className="lp-objectives">
          {meta.objectives.map(o => <li key={o}>{o}</li>)}
        </ul>
        <p className="outline-note">
          The full interactive edition of this lesson ships in v1.5. The topic is
          live everywhere else — the problems below feed your {topicName(meta.topicId)} mastery now.
        </p>
      </section>

      {topicProblems.length > 0 && (
        <section className="glass outline-panel">
          <p className="mono lp-tag">Train the topic</p>
          <div className="lp-practice-list">
            {topicProblems.map(p => (
              <Link key={p.id} href={`/problems/${p.id}`} className="lp-practice-item">
                <span className="lp-diff mono">{"●".repeat(Math.ceil(p.difficulty / 2))}{"○".repeat(5 - Math.ceil(p.difficulty / 2))}</span>
                <span className="lp-practice-stmt"><MathText text={p.statement} /></span>
                <span className="mono lp-practice-src">{p.source}</span>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
