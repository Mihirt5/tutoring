"use client";

import Link from "next/link";
import { useParams } from "next/navigation";
import { trackById } from "@/content/tracks";
import { ContestRunner } from "@/components/ContestRunner";

export default function ContestPage() {
  const { id } = useParams<{ id: string }>();
  const track = trackById.get(id);

  if (!track) {
    return <div className="page"><p>Unknown contest. <Link href="/contests" className="accent">All contests</Link></p></div>;
  }

  return (
    <div className="page page-wide">
      <ContestRunner key={track.id} track={track} />
    </div>
  );
}
