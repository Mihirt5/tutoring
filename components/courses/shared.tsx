import type { CourseLevel } from "@/lib/courses/types";

export function formatMinutes(minutes: number) {
  const hours = Math.floor(minutes / 60);
  const remaining = minutes % 60;
  return hours
    ? `${hours} hr${remaining ? ` ${remaining} min` : ""}`
    : `${minutes} min`;
}

export function LevelLabels({
  levels,
  extension = false,
}: {
  levels: CourseLevel[];
  extension?: boolean;
}) {
  return (
    <div className="course-labels">
      {levels.map((level) => (
        <span
          key={level}
          className={`chip mono${level === "AMC 12" ? " course-level-12" : ""}`}
        >
          {level}
          {extension && level === "AMC 12" ? " extension" : ""}
        </span>
      ))}
    </div>
  );
}
