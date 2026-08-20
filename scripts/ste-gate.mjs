import { execFileSync } from "node:child_process";
import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";

const vendor = JSON.parse(readFileSync("vendor.json", "utf8"));
const synced = new Set(vendor.upstreams.flatMap((u) => u.skills));

function walk(dir, out) {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name);
    if (e.isDirectory()) walk(p, out);
    else if (e.name.endsWith(".md")) out.push(p);
  }
}

const files = [];
for (const d of readdirSync("skills", { withFileTypes: true })) {
  if (!d.isDirectory() || synced.has(d.name)) continue;
  walk(join("skills", d.name), files);
}

console.log(`STE linting ${files.length} owned files (synced upstreams skipped)`);
try {
  execFileSync(
    "python3",
    ["scripts/ste-lint.py", "--strict", "--fail-over", "2.5", ...files],
    { stdio: "inherit" }
  );
  console.log("All owned files pass (<= 2.5 violations per 100 words)");
} catch {
  process.exit(1);
}