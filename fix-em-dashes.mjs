#!/usr/bin/env node
/**
 * fix-em-dashes.mjs: normalize em and en dashes in owned markdown.
 *
 * Walks skills/ and curations/, flags files over 5.0 STE violations per 100
 * words in strict mode, then rewrites dashes outside code fences: em dash
 * becomes a comma, en dash becomes a hyphen.
 *
 * Usage:  node fix-em-dashes.mjs
 *
 * The import is what this script existed for: the Python version loaded
 * ste-lint.py at runtime through importlib because it could not import a
 * .py from a sibling path without path manipulation. A plain ESM import does
 * the same job with no ceremony.
 */

import { readdirSync, readFileSync, writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { lint } from "./scripts/ste-lint.mjs";

const EM_DASH = "\u2014";
const EN_DASH = "\u2013";
const THRESHOLD = 5.0;

function collectMarkdown(root) {
  const out = [];
  const walk = (dir) => {
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (e.name === "node_modules" || e.name === ".git") continue;
      const p = join(dir, e.name);
      if (e.isDirectory()) walk(p);
      else if (e.name.endsWith(".md")) out.push(p);
    }
  };
  if (existsSync(root)) walk(root);
  return out;
}

const files = [...collectMarkdown("skills"), ...collectMarkdown("curations")];

// Report offenders first, matching the Python script's two-pass structure.
const overThreshold = files.filter((f) => {
  const r = lint(readFileSync(f, "utf8").replace(/\r\n?/g, "\n"), true);
  return r.total_per100w > THRESHOLD;
});

for (const f of overThreshold) {
  if (!existsSync(f)) {
    console.log(`MISSING: ${f}`);
    continue;
  }
  const original = readFileSync(f, "utf8");
  const lines = original.split("\n");
  let inCode = false;
  const result = lines.map((line) => {
    if (line.trim().startsWith("```")) inCode = !inCode;
    if (inCode) return line;
    return line.split(EM_DASH).join(", ").split(EN_DASH).join("-");
  });
  const text = result.join("\n");
  if (text !== original) {
    writeFileSync(f, text, "utf8");
    console.log(`Fixed: ${f}`);
  } else {
    console.log(`No change: ${f}`);
  }
}
