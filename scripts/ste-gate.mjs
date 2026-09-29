import { readFileSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { lint } from "./ste-lint.mjs";

const FAIL_OVER = 5.0;

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
let worst = 0.0;
let failed = 0;
for (const f of files) {
  // Same universal-newline handling as Python's text-mode open().
  const r = lint(readFileSync(f, "utf8").replace(/\r\n?/g, "\n"), true);
  worst = Math.max(worst, r.total_per100w);
  if (r.total_per100w > FAIL_OVER) {
    failed++;
    console.log(
      `FAIL ${f} words=${r.words} total=${r.total} ` +
        `per100w=${r.total_per100w.toFixed(2)} (limit ${FAIL_OVER})`
    );
  }
}
if (failed > 0) {
  console.error(
    `\n${failed} owned file(s) over ${FAIL_OVER} violations per 100 words. ` +
      "Fix the prose, then re-run."
  );
  process.exit(1);
}
console.log(
  `All owned files pass (<= ${FAIL_OVER} violations per 100 words, ` +
    `worst ${worst.toFixed(2)})`
);
