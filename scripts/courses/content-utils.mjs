import fs from "node:fs";
import path from "node:path";
import vm from "node:vm";
import { createRequire } from "node:module";
import ts from "typescript";
import { createHash } from "node:crypto";

const require = createRequire(import.meta.url);
export const root = path.resolve(import.meta.dirname, "../..");
const cache = new Map();

export function readTypedFile(filename) {
  const absolute = path.resolve(root, filename);
  if (cache.has(absolute)) return cache.get(absolute);
  const exports = {};
  cache.set(absolute, exports);
  const javascript = ts.transpileModule(fs.readFileSync(absolute, "utf8"), {
    compilerOptions: {
      module: ts.ModuleKind.CommonJS,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  vm.runInNewContext(
    javascript,
    {
      exports,
      require: (specifier) => {
        if (specifier.startsWith(".") || specifier.startsWith("@/")) {
          const resolved = specifier.startsWith("@/")
            ? path.join(root, specifier.slice(2))
            : path.resolve(path.dirname(absolute), specifier);
          return readTypedFile(
            resolved.endsWith(".ts") ? resolved : `${resolved}.ts`,
          );
        }
        return require(specifier);
      },
    },
    { filename: absolute },
  );
  return exports;
}

export function readLessonFiles() {
  const result = [];
  for (const course of ["amc-8", "amc-10-12"]) {
    const directory = path.join(root, "content/courses", course);
    if (!fs.existsSync(directory)) continue;
    for (const module of fs.readdirSync(directory)) {
      const folder = path.join(directory, module);
      if (!fs.statSync(folder).isDirectory()) continue;
      for (const name of fs
        .readdirSync(folder)
        .filter((name) => name.endsWith(".ts"))) {
        const filename = path.join(folder, name);
        result.push({
          course,
          module,
          filename,
          lesson: readTypedFile(filename).default,
        });
      }
    }
  }
  return result;
}

export function textFields(value) {
  if (typeof value === "string") return [value];
  if (Array.isArray(value)) return value.flatMap(textFields);
  if (value && typeof value === "object")
    return Object.values(value).flatMap(textFields);
  return [];
}

export function taskFingerprint(item) {
  return createHash("sha256")
    .update(
      JSON.stringify({
        statement: item.problem ?? item.question,
        choices: item.choices,
        answer: item.answer,
        steps: item.steps ?? item.solutionSteps,
      }),
    )
    .digest("hex");
}
