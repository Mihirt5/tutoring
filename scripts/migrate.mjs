// Applies SQL files in supabase/migrations/ that haven't run yet, tracked in
// public._migrations. Run with: node --env-file=.env.local scripts/migrate.mjs
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import postgres from "postgres";

const rootDir = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const migrationsDir = path.join(rootDir, "supabase", "migrations");

const connectionString = process.env.POSTGRES_URL_NON_POOLING ?? process.env.POSTGRES_URL;
if (!connectionString) {
  console.error("Missing POSTGRES_URL(_NON_POOLING) — run `vercel env pull .env.local` first.");
  process.exit(1);
}

const sql = postgres(connectionString, { ssl: "require" });

async function main() {
  await sql`create table if not exists public._migrations (
    name text primary key,
    applied_at timestamptz not null default now()
  )`;

  const applied = new Set((await sql`select name from public._migrations`).map((r) => r.name));
  const files = readdirSync(migrationsDir).filter((f) => f.endsWith(".sql")).sort();

  for (const file of files) {
    if (applied.has(file)) continue;
    const text = readFileSync(path.join(migrationsDir, file), "utf8");
    console.log(`Applying ${file}...`);
    await sql.unsafe(text);
    await sql`insert into public._migrations (name) values (${file})`;
    console.log(`Applied ${file}`);
  }

  if (files.every((f) => applied.has(f))) {
    console.log("No pending migrations.");
  }
}

main()
  .then(() => sql.end())
  .catch(async (err) => {
    console.error(err);
    await sql.end();
    process.exit(1);
  });
