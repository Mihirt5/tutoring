"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { problemById } from "@/content/problems";
import { ProblemWorkspace } from "@/components/ProblemWorkspace";

export default function ProblemPage() {
  const { id } = useParams<{ id: string }>();
  const problem = problemById.get(id);

  if (!problem) {
    return <div className="page"><p>Unknown problem. <Link href="/problems" className="accent">Back to the bank</Link></p></div>;
  }

  return (
    <div className="page page-wide">
      <p className="eyebrow pw-back"><Link href="/problems">Problem Bank</Link> · {problem.id}</p>
      <ProblemWorkspace key={problem.id} problem={problem} />
    </div>
  );
}
