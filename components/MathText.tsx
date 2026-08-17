"use client";

import katex from "katex";
import { useMemo } from "react";

// Renders a string with inline $...$ and display $$...$$ math via KaTeX.

const SPLIT = /(\$\$[^$]+\$\$|\$[^$]+\$)/g;

function renderPiece(piece: string, i: number) {
  if (piece.startsWith("$$") && piece.endsWith("$$")) {
    const html = katex.renderToString(piece.slice(2, -2), {
      displayMode: true,
      throwOnError: false,
    });
    return <span key={i} className="math-display" dangerouslySetInnerHTML={{ __html: html }} />;
  }
  if (piece.startsWith("$") && piece.endsWith("$")) {
    const html = katex.renderToString(piece.slice(1, -1), { throwOnError: false });
    return <span key={i} dangerouslySetInnerHTML={{ __html: html }} />;
  }
  return <span key={i}>{piece}</span>;
}

export function MathText({ text, className }: { text: string; className?: string }) {
  const pieces = useMemo(() => text.split(SPLIT).filter(Boolean), [text]);
  return <span className={className}>{pieces.map(renderPiece)}</span>;
}
