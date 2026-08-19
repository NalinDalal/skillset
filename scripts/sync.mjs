#!/usr/bin/env node
/**
 * sync.mjs: pull latest skills from upstream repos and re-vendor them.
 *
 * Usage:  node scripts/sync.mjs            # check + apply updates
 *         node scripts/sync.mjs --dry-run  # report without writing
 *         node scripts/sync.mjs --repo taste-skill
 *
 * Reads vendor.json, shallow-clones each upstream into .sync-cache/,
 * copies the listed skill folders into skills/, and bumps the pinned
 * commit. Exits 0 with "UP_TO_DATE" when nothing changed (so CI can
 * skip opening a PR), 1 with "CHANGED" when updates were applied.
 *
 * Ownership model: upstream files are a BASE, not the final word.
 * Anything under curations/<skill>/overlay/ is copied back over the
 * freshly-vendored skill afterwards (force), so the skills you own keep
 * your voice no matter how much the upstream moves. curations/<skill>/WHY.md
 * records why you own it the way you do. It is never shipped into skills/.
 */

import { execSync } from "node:child_process";
import { existsSync, mkdirSync, rmSync, cpSync, readFileSync, writeFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const CACHE_DIR = join(ROOT, ".sync-cache");
const SKILLS_DIR = join(ROOT, "skills");
const CURATIONS_DIR = join(ROOT, "curations");
const VENDOR_FILE = join(ROOT, "vendor.json");

const args = process.argv.slice(2);
const dryRun = args.includes("--dry-run");
const onlyRepo = args.find((a) => a.startsWith("--repo="))?.split("=")[1] ?? null;

function sh(cmd, cwd) {
  return execSync(cmd, { cwd, encoding: "utf8", stdio: ["ignore", "pipe", "pipe"] }).trim();
}

function latestCommit(repo) {
  try {
    return sh(`git ls-remote https://github.com/${repo}.git HEAD`).split(/\s+/)[0];
  } catch {
    return null;
  }
}

function fetchUpstream(name, repo, source) {
  const dir = join(CACHE_DIR, name);
  rmSync(dir, { recursive: true, force: true });
  mkdirSync(dir, { recursive: true });
  try {
    sh(`git clone --depth 1 --filter=blob:none --sparse https://github.com/${repo}.git .`, dir);
    sh(`git sparse-checkout set ${source}`, dir);
  } catch (err) {
    throw new Error(`clone failed for ${repo}: ${err.message}`);
  }
  return dir;
}

function applyCurations(skill) {
  const overlay = join(CURATIONS_DIR, skill, "overlay");
  if (!existsSync(overlay)) return false;
  const to = join(SKILLS_DIR, skill);
  cpSync(overlay, to, { recursive: true, force: true });
  const why = join(CURATIONS_DIR, skill, "WHY.md");
  if (existsSync(why)) console.log(`    notes: ${readFileSync(why, "utf8").trim().split("\n")[0]}`);
  return true;
}

function applySkill(srcDir, skill, dry) {
  const from = join(srcDir, skill);
  const to = join(SKILLS_DIR, skill);
  if (!existsSync(from)) {
    if (existsSync(to)) {
      console.error(`  ! upstream no longer ships "${skill}". Keeping your owned copy (remove curations/${skill} and skills/${skill} to drop it)`);
    } else {
      console.error(`  ! missing in upstream: ${skill}`);
    }
    return;
  }
  if (dry) {
    console.log(`  ~ would update: ${skill}`);
    return;
  }
  rmSync(to, { recursive: true, force: true });
  cpSync(from, to, { recursive: true });
  const curated = applyCurations(skill);
  console.log(`  ✓ updated: ${skill}${curated ? " [+ curation overlay]" : ""}`);
}

const vendor = JSON.parse(readFileSync(VENDOR_FILE, "utf8"));
let changed = false;

for (const upstream of vendor.upstreams) {
  if (onlyRepo && upstream.name !== onlyRepo) continue;

  const head = latestCommit(upstream.repo);
  if (!head) {
    console.error(`✗ could not reach ${upstream.repo}. Skipping`);
    continue;
  }

  const missing = upstream.skills.filter((skill) => !existsSync(join(SKILLS_DIR, skill)));
  if (head === upstream.commit && missing.length === 0) {
    console.log(`  * ${upstream.name}: up to date (${head.slice(0, 7)})`);
    continue;
  }

  const srcDir = fetchUpstream(upstream.name, upstream.repo, upstream.source);
  if (head === upstream.commit) {
    console.log(`↻ ${upstream.name}: restoring missing skill(s): ${missing.join(", ")}`);
  } else {
    console.log(`↻ ${upstream.name}: ${upstream.commit.slice(0, 7)} → ${head.slice(0, 7)}`);
    changed = true;
  }
  for (const skill of upstream.skills) {
    applySkill(join(srcDir, upstream.source), skill, dryRun);
  }
  if (changed && !dryRun) upstream.commit = head;
}

if (changed && !dryRun) {
  writeFileSync(VENDOR_FILE, JSON.stringify(vendor, null, 2) + "\n");
  console.log("\nvendor.json bumped.");
} else if (changed && dryRun) {
  console.log("\n[dry-run] updates pending; nothing written.");
} else {
  console.log("\nAll upstreams up to date.");
}

if (!dryRun && existsSync(CURATIONS_DIR)) {
  for (const entry of readdirSync(CURATIONS_DIR, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    if (!existsSync(join(SKILLS_DIR, entry.name))) continue;
    if (applyCurations(entry.name)) console.log(`◈ ensured curation overlay: ${entry.name}`);
  }
  writeFileSync(join(ROOT, ".sync-state"), changed ? "CHANGED" : "UP_TO_DATE");
}
process.exit(0);
