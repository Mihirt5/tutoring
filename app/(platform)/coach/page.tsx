"use client";

import { CoachPanel } from "@/components/CoachPanel";

export default function CoachPage() {
  return (
    <div className="page">
      <header className="page-head">
        <p className="eyebrow">AI Coach</p>
        <h1>Questions before answers.</h1>
        <p className="page-sub">
          The coach never hands over solutions. It diagnoses, hints, and
          escalates — like the best human tutors, minus the calendar.
        </p>
      </header>
      <CoachPanel standalone />
    </div>
  );
}
