import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const vendor = JSON.parse(readFileSync("vendor.json", "utf8"));
const syncedDests = new Set(
  vendor.upstreams.flatMap((u) => u.skills.map((s) => s.dest))
);

function isSynced(relPath) {
  for (const dest of syncedDests) {
    if (relPath.startsWith(dest + "/") || relPath === dest) return true;
  }
  return false;
}

function walk(dir, out, prefix) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const rel = prefix ? `${prefix}/${e.name}` : e.name;
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out, rel);
    else if (e.name.endsWith(".md") && !isSynced(rel)) out.push(p);
  }
}

const files = [];
walk("skills", files, "");

console.log(`STE linting ${files.length} owned files (synced upstreams skipped)`);
try {
  execFileSync(
    "python3",
    ["scripts/ste-lint.py", "--strict", "--fail-over", "5.0", ...files],
    { stdio: "inherit" }
  );
  console.log("All owned files pass (<= 5.0 violations per 100 words)");
} catch {
  process.exit(1);
}