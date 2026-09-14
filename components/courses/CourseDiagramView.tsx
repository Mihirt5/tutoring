import { useId } from "react";
import { MathText } from "@/components/MathText";
import type { CourseDiagram } from "@/lib/courses/types";

export function CourseDiagramView({ diagram }: { diagram: CourseDiagram }) {
  const titleId = useId();
  if (diagram.kind === "table") {
    return (
      <figure className="course-diagram">
        <div
          className="course-table-scroll"
          tabIndex={0}
          role="region"
          aria-label={diagram.title}
        >
          <table>
            <caption>{diagram.title}</caption>
            <thead>
              <tr>
                {diagram.headers.map((header, index) => (
                  <th scope="col" key={index}>
                    <MathText text={header} />
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {diagram.rows.map((row, rowIndex) => (
                <tr key={rowIndex}>
                  {row.map((cell, index) => (
                    <td key={index}>
                      <MathText text={cell} />
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </figure>
    );
  }
  if (diagram.kind === "bars") {
    const maximum = Math.max(1, ...diagram.values);
    return (
      <figure className="course-diagram">
        <figcaption>{diagram.title}</figcaption>
        <div className="course-bars">
          {diagram.values.map((value, index) => (
            <div className="course-bar-row" key={index}>
              <span>
                <MathText text={diagram.labels[index] ?? ""} />
              </span>
              <span className="course-bar-track" aria-hidden="true">
                <span
                  style={{ width: `${Math.max(0, (value / maximum) * 100)}%` }}
                />
              </span>
              <strong className="mono">
                {value}
                {diagram.unit ? ` ${diagram.unit}` : ""}
              </strong>
            </div>
          ))}
        </div>
      </figure>
    );
  }
  const minX = Math.min(0, ...diagram.points.map((point) => point.x));
  const maxX = Math.max(1, ...diagram.points.map((point) => point.x));
  const minY = Math.min(0, ...diagram.points.map((point) => point.y));
  const maxY = Math.max(1, ...diagram.points.map((point) => point.y));
  const span = Math.max(maxX - minX, maxY - minY, 1);
  const scale = 260 / span;
  const xStart = (360 - (maxX - minX) * scale) / 2;
  const yStart = (360 - (maxY - minY) * scale) / 2;
  const x = (value: number) => xStart + (value - minX) * scale;
  const y = (value: number) => 360 - yStart - (value - minY) * scale;
  return (
    <figure className="course-diagram course-coordinate">
      <figcaption>{diagram.title}</figcaption>
      <svg viewBox="0 0 360 360" role="img" aria-labelledby={titleId}>
        <title id={titleId}>
          {diagram.title}.{" "}
          {diagram.points
            .map((point) => `${point.label} at (${point.x}, ${point.y})`)
            .join("; ")}
        </title>
        <line x1="25" y1={y(0)} x2="335" y2={y(0)} className="course-axis" />
        <line x1={x(0)} y1="25" x2={x(0)} y2="335" className="course-axis" />
        <text x="336" y={y(0) - 8}>
          x
        </text>
        <text x={x(0) + 9} y="24">
          y
        </text>
        <text x={x(0) - 15} y={y(0) + 18}>
          0
        </text>
        {diagram.connect && (
          <polyline
            points={diagram.points
              .map((point) => `${x(point.x)},${y(point.y)}`)
              .join(" ")}
            className="course-coordinate-line"
          />
        )}
        {diagram.points.map((point, index) => (
          <g key={index}>
            <line
              x1={x(point.x)}
              y1={y(0)}
              x2={x(point.x)}
              y2={y(point.y)}
              className="course-coordinate-guide"
            />
            <line
              x1={x(0)}
              y1={y(point.y)}
              x2={x(point.x)}
              y2={y(point.y)}
              className="course-coordinate-guide"
            />
            <circle
              cx={x(point.x)}
              cy={y(point.y)}
              r="4.5"
              className="course-coordinate-dot"
            />
            <text
              x={x(point.x) + (point.x === maxX ? -9 : 9)}
              y={y(point.y) - 11}
              textAnchor={point.x === maxX ? "end" : "start"}
            >
              {point.label}
            </text>
          </g>
        ))}
      </svg>
      <p className="course-coordinate-values">
        {diagram.points
          .map((point) => `${point.label} (${point.x}, ${point.y})`)
          .join(" · ")}
      </p>
    </figure>
  );
}
