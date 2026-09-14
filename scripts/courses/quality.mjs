import { spawnSync } from "node:child_process";
import fs from "node:fs";
import path from "node:path";
const root = path.resolve(import.meta.dirname, "../..");
const mode = process.argv[2] ?? "format:check";
// Explicit feature paths keep checks reproducible after commit and avoid reformatting unrelated content.
const roots = [
  "app/(platform)/courses",
  "app/courses.css",
  "components/courses",
  "content/courses",
  "lib/courses",
  "scripts/courses",
  "tests/courses.spec.ts",
  "docs/course-generation-progress.md",
  "docs/amc8-author-notes.md",
  "docs/amc1012-author-notes.md",
  "docs/course-verification.json",
  "playwright.config.ts",
  "eslint.config.mjs",
  ".prettierrc.json",
  "package.json",
  "lib/store.ts",
  "lib/types.ts",
  "components/LessonPlayer.tsx",
  "components/shell/PlatformShell.tsx",
  "app/(platform)/layout.tsx",
];
const walk = (file) =>
  !fs.existsSync(path.join(root, file))
    ? []
    : fs.statSync(path.join(root, file)).isDirectory()
      ? fs
          .readdirSync(path.join(root, file))
          .flatMap((name) => walk(path.join(file, name)))
      : [file];
const files = roots
  .flatMap(walk)
  .filter((file) => /\.(?:ts|tsx|mjs|css|json|md)$/.test(file));
const tool = mode === "lint" ? "eslint" : "prettier";
const args =
  mode === "lint"
    ? files.filter((file) => /\.(?:ts|tsx|mjs)$/.test(file))
    : [mode === "format" ? "--write" : "--check", ...files];
const result = spawnSync(path.join(root, "node_modules/.bin", tool), args, {
  cwd: root,
  stdio: "inherit",
});
process.exitCode = result.status ?? 1;
