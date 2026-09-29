#!/usr/bin/env node
/**
 * ste-lint.mjs: sloppy-text lint, score v3.
 *
 * Usage:  node scripts/ste-lint.mjs [flags] <file|glob>...
 *         cat file.md | node scripts/ste-lint.mjs
 *
 * Flags:
 *   --strict          also count STE's recurring-errors list and em dashes
 *   --json            emit a JSON object per file instead of a table row
 *   --fail-over <n>   exit 1 if any file exceeds <n> violations per 100 words
 *
 * Score v2 added complex_tense (perfect tenses, modal stacks), exempted
 * adjectival/stative participles from the passive count, moved "provide" to
 * the banned list, added a noun-train marker and a --strict mode. The
 * episode's published numbers were measured with score v1 (this file's git
 * history at the episode date); v1 and v2 totals are close but not directly
 * comparable.
 *
 * Score v3 strips code fences with a line-by-line state machine instead of a
 * regex (a single unclosed ``` shifted pairing and leaked fenced semicolons
 * into the prose count), counts possessive 's (user's, thread's) as possessive
 * not contraction - only pronoun-stem 's (it's, that's, who's) is a
 * contraction - and exempts double-quoted spans from word-level checks (STE
 * treats quoted material as verbatim speech).
 *
 * Ported from ste-lint.py. The numeric behavior is matched exactly, including
 * Python's banker's rounding, so scores are comparable to the Python run.
 */

import { readFileSync, existsSync, readdirSync, statSync } from "node:fs";
import { basename, join, sep } from "node:path";
import process from "node:process";

export const SCORE_VERSION = 3;

const MARKETING = [
  "seamless", "seamlessly", "robust", "powerful", "cutting-edge", "effortless",
  "effortlessly", "world-class", "next-generation", "revolutionary", "blazing",
  "lightning-fast", "elegant", "delightful", "turnkey", "best-in-class",
  "state-of-the-art", "game-changing", "first-class", "battle-tested",
  "enterprise-grade", "supercharge", "unlock", "unleash", "empower", "empowers",
];
const BANNED = [
  "begin", "begins", "commence", "commences", "initiate", "initiates",
  "originate", "utilize", "utilizes", "utilizing", "leverage", "leverages",
  "leveraging", "facilitate", "facilitates", "ensure", "ensures", "ensuring",
  "prior to", "subsequent to", "obtain", "obtains", "acquire", "acquires",
  "demonstrate", "demonstrates", "additionally", "furthermore", "moreover",
  "comprehensive", "comprehensively", "utilization", "aforementioned",
  "hereforth", "therein", "whilst", "amongst", "numerous", "myriad",
  "plethora", "provide", "provides", "provided",
  "in order to", "a variety of", "in the event that", "due to the fact that",
  "it is important to note",
];
// STE's own recurring-errors list (see ste-recurring-errors.md). Counted only
// with --strict: these are correct STE but would flag normal prose in docs.
const STRICT_BANNED = [
  "however", "since", "should", "shall", "using", "follow", "follows", "followed",
];
const PHRASAL = [
  "spin up", "spin down", "reach out", "dive into", "dives into", "diving into",
  "kick off", "kicks off", "roll out", "rolls out", "tear down", "ramp up",
  "circle back", "drill down", "spun up", "reaching out",
];
const MODAL_HEDGE = [
  "it is important to note", "it should be noted", "it is worth noting",
  "please note that", "as mentioned", "as noted above",
];
const BE = "(?:am|is|are|was|were|be|been|being)";
const PP_IRREG =
  "(?:done|made|sent|read|built|kept|held|set|put|run|written|shown|given|" +
  "taken|found|got|gotten|seen|known|thrown|drawn)";
// Rule 3.3: a past participle used as an adjective is not passive. These
// stative participles only count as passive when a by-agent follows.
const STATIVE =
  "(?:closed|opened?|damaged|completed?|installed|connected|required|expected|" +
  "configured|enabled|disabled|deprecated|supported)";
const FUNC_WORDS = new Set(
  ("a an the this that these those of for to in on at by with from as and or " +
   "but if when then than not no is are was were be been being am do does did " +
   "has have had will would can could may might must should shall it its their " +
   "your our his her they we you i").split(" ")
);

const RE_FENCE = /^\s*```/;
const RE_INLINE_CODE = /`[^`]*`/g;
const RE_HEADING = /^\s*#{1,6}\s*/;
const RE_BULLET = /^\s*(?:[-*+]|\d+[.)])\s+/;
const RE_SENTENCE_SPLIT = /(?<=[.!?:])\s+(?=[A-Z0-9"'\-])/;
const RE_WORD = /[A-Za-z0-9][A-Za-z0-9'\-/]*/g;
const RE_ALPHA_WORD = /[A-Za-z][A-Za-z'\-]*/g;
const RE_CONTRACTION = new RegExp(
  "\\b(?:\\w+['’](?:t|re|ve|ll|d|m)\\b|" +
  "(?:it|that|who|what|there|here|he|she|let|how|where|when|why)['’]s\\b)",
  "g"
);
const RE_PASSIVE = new RegExp(`\\b${BE}\\s+(\\w+ed|${PP_IRREG})\\b`, "gi");
const RE_PASSIVE_BY = new RegExp(`\\b${BE}\\s+${STATIVE}\\s+by\\b`, "gi");
const RE_COMPLEX_TENSE = new RegExp(
  `\\b(?:(?:may|might|could|would|should|must|will|shall|can)\\s+)?` +
  `(?:have|has|had)\\s+(?:been\\s+)?(?:\\w+ed|${PP_IRREG})\\b`,
  "gi"
);
const RE_ING_MAIN_VERB = new RegExp(`\\b${BE}\\s+\\w+ing\\b`, "gi");
const RE_NOMINALIZATION_1 = new RegExp(
  "\\b(?:perform(?:s|ed)?|conduct(?:s|ed)?|carry out|carries out|" +
  "make use of|makes use of)\\b",
  "gi"
);
const RE_NOMINALIZATION_2 = /\b\w{4,}(?:tion|ment|ance|ence)\s+of\b/gi;
const RE_PARAGRAPH_SPLIT = /\n\s*\n/;
const RE_LIST_ITEM = /^\s*(?:[-*+]|\d+[.)])\s+/;
const RE_DESCRIPTION =
  /^\s*(?:description|motion_description|additional-description):/;
const RE_MAY = /(?<![A-Za-z])may(?![a-z])/g;
const RE_FULL_STATIC = new RegExp(`^(?:${STATIVE})$`, "i");

const EM_DASH = "\u2014";
const EN_DASH = "\u2013";

/**
 * Python's round() for floats: correctly rounded, ties to even, applied to the
 * exact binary value of the double. JS toFixed() rounds ties away from zero,
 * so 2.125 gives 2.13 here and 2.12 in Python. toFixed(20) exposes enough
 * decimal digits to see which side of a tie we are actually on.
 */
export function pyRound(x, digits) {
  if (!Number.isFinite(x)) return x;
  const neg = x < 0 || Object.is(x, -0);
  const [intPart, fracPart = ""] = Math.abs(x).toFixed(20).split(".");
  const keep = fracPart.slice(0, digits);
  const rest = fracPart.slice(digits);
  let out = parseInt(intPart + (keep || "0"), 10);
  if (rest) {
    const first = rest[0];
    const lower = rest.slice(1);
    if (first > "5") {
      out += 1;
    } else if (first === "5") {
      if (/[1-9]/.test(lower)) out += 1;
      else if (out % 2 !== 0) out += 1;
    }
  }
  return (neg ? -out : out) / 10 ** digits;
}

function stripCode(t) {
  const out = [];
  let inFence = false;
  for (const line of t.split("\n")) {
    if (RE_FENCE.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (!inFence) out.push(line);
  }
  return out.join("\n").replace(RE_INLINE_CODE, " ");
}

function sentences(text) {
  const out = [];
  for (const line of text.split("\n")) {
    let s = line.trim();
    if (!s) continue;
    s = s.replace(RE_HEADING, "");
    s = s.replace(RE_BULLET, "");
    if (!s) continue;
    for (const p of s.split(RE_SENTENCE_SPLIT)) {
      const t = p.trim();
      if (t) out.push(t);
    }
  }
  return out;
}

function wc(s) {
  return s.match(RE_WORD)?.length ?? 0;
}

function countCi(text, phrases) {
  const low = text.toLowerCase();
  const hits = [];
  for (const ph of phrases) {
    const re = new RegExp(`(?<![a-z])${escapeRe(ph)}(?![a-z])`, "g");
    const found = low.match(re);
    if (found) for (let i = 0; i < found.length; i++) hits.push(ph);
  }
  return [hits.length, hits];
}

function escapeRe(s) {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Runs of 4+ consecutive non-function lowercase words (Rule 2.1 proxy).
 * Heuristic marker only - proper nouns break a run, the leading word of each
 * sentence is skipped, and the count stays out of the total.
 */
function nounTrains(text) {
  const hits = [];
  for (const s of sentences(text)) {
    const words = (s.match(RE_ALPHA_WORD) ?? []).slice(1);
    let run = [];
    for (const w of [...words, ""]) {
      if (w && !FUNC_WORDS.has(w.toLowerCase()) && !/^[A-Z]/.test(w)) {
        run.push(w);
      } else {
        if (run.length >= 4) hits.push(run.join(" "));
        run = [];
      }
    }
  }
  return hits;
}

/**
 * Exempt double-quoted spans from word-level checks (STE treats quoted
 * material as verbatim). YAML description wrapper quotes are not quoted
 * speech: unwrap them first so descriptions still get checked.
 */
function unquote(text) {
  const out = [];
  for (const line of text.split("\n")) {
    const m = line.match(/^(\s*[a-z_-]+:\s*)"(.*)"\s*$/s);
    let l = m ? m[1] + m[2] : line;
    const res = [];
    let inQ = false;
    for (const seg of l.split(/(")/)) {
      if (seg === '"') {
        inQ = !inQ;
        continue;
      }
      res.push(inQ ? " ".repeat(seg.length) : seg);
    }
    out.push(res.join(""));
  }
  return out.join("\n");
}

function countMatches(re, text) {
  return text.match(re)?.length ?? 0;
}

function uniq(arr) {
  return [...new Set(arr)];
}

export function lint(text, strict = false) {
  const raw = text;
  const processed = unquote(stripCode(text));
  const sents = sentences(processed);
  const words = sents.reduce((n, s) => n + wc(s), 0) || 1;
  const v = {};

  const longs = sents.filter((s) => wc(s) > 20).map((s) => [wc(s), s]);
  v["long_sentence(>20w)"] = longs.length;
  v["semicolon"] = countMatches(/;/g, processed);
  v["contraction"] = countMatches(RE_CONTRACTION, processed);

  // matchAll, not match: a global regex's match() returns whole matches, so
  // the capture group holding the participle would be undefined and every
  // passive-voice candidate would be counted, including the exempt statives.
  const passiveParts = [...processed.matchAll(RE_PASSIVE)].map((m) => m[1]);
  v["passive_voice"] =
    passiveParts.filter((p) => !RE_FULL_STATIC.test(p)).length +
    countMatches(RE_PASSIVE_BY, processed);
  v["complex_tense"] = countMatches(RE_COMPLEX_TENSE, processed);
  v["ing_main_verb"] = countMatches(RE_ING_MAIN_VERB, processed);
  v["nominalization"] =
    countMatches(RE_NOMINALIZATION_1, processed) +
    countMatches(RE_NOMINALIZATION_2, processed);

  const [phrasalN] = countCi(processed, PHRASAL);
  v["phrasal_verb"] = phrasalN;
  const [bannedN, bh] = countCi(processed, BANNED);
  v["banned_word"] = bannedN;
  const [marketingN, mh] = countCi(processed, MARKETING);
  v["marketing_adjective"] = marketingN;
  const [hedgeN] = countCi(processed, MODAL_HEDGE);
  v["modal_hedge"] = hedgeN;

  const paras = processed.split(RE_PARAGRAPH_SPLIT).filter((p) => p.trim());
  const isListBlock = (p) => {
    const lines = p.split("\n").filter((l) => l.trim());
    if (!lines.length) return false;
    const listy = lines.filter((l) => RE_LIST_ITEM.test(l));
    return listy.length / lines.length >= 0.5;
  };
  const isDescription = (p) => {
    const first = p.split("\n").find((l) => l.trim()) ?? "";
    return RE_DESCRIPTION.test(first);
  };
  v["long_paragraph(>6s)"] = paras.filter(
    (p) => !isDescription(p) && !isListBlock(p) && sentences(stripCode(p)).length > 6
  ).length;

  const em = countMatches(new RegExp(`[${EM_DASH}${EN_DASH}]`, "g"), raw);
  const trains = nounTrains(processed);
  if (strict) {
    let [strictN] = countCi(processed, STRICT_BANNED);
    // "may" is matched case-sensitively so the month "May" stays clean
    strictN += countMatches(RE_MAY, processed);
    v["strict_banned_word"] = strictN;
    v["em_dash"] = em;
  }
  const total = Object.values(v).reduce((a, b) => a + b, 0);

  return {
    score_version: SCORE_VERSION,
    mode: strict ? "strict" : "flavored",
    words,
    sentences: sents.length,
    violations: v,
    total,
    total_per100w: pyRound((total * 100.0) / words, 2),
    "em_dash(slop-marker)": em,
    "noun_train(>=4w,marker)": trains.length,
    longest_sentence_words: longs.length
      ? Math.max(...longs.map((l) => l[0]))
      : sents.reduce((m, s) => Math.max(m, wc(s)), 0),
    sample_marketing: uniq(mh).slice(0, 6),
    sample_banned: uniq(bh).slice(0, 6),
    sample_noun_train: trains.slice(0, 3),
  };
}

/** Minimal glob supporting *, ?, and [...] across path segments. */
function globSync(pattern) {
  const absolute = pattern.startsWith("/");
  const segments = pattern.split("/");
  const out = [];
  const walk = (dir, i) => {
    if (i === segments.length) {
      if (existsSync(dir) && statSync(dir).isFile()) out.push(dir);
      return;
    }
    const seg = segments[i];
    if (!seg.includes("*") && !seg.includes("?") && !seg.includes("[")) {
      walk(join(dir, seg), i + 1);
      return;
    }
    const re = new RegExp(
      "^" +
        seg
          .replace(/[.+^${}()|\\]/g, "\\$&")
          .replace(/\*/g, "[^/]*")
          .replace(/\?/g, "[^/]")
          .replace(/\[([^\]]*)\]/g, "[$1]") +
        "$"
    );
    let entries;
    try {
      entries = readdirSync(dir, { withFileTypes: true });
    } catch {
      return;
    }
    for (const e of entries) {
      if (e.name.startsWith(".") && seg.startsWith(".")) continue;
      if (re.test(e.name)) walk(join(dir, e.name), i + 1);
    }
  };
  walk(absolute ? "/" : ".", 0);
  return out;
}

/**
 * Read a file the way Python's open(..., encoding="utf-8") does: text mode
 * applies universal newlines, so a lone CR and a CRLF both become LF before
 * anything is counted. Without this, a file containing a bare CR splits into
 * different sentences than the Python linter did.
 */
function readText(path) {
  return readFileSync(path, "utf8").replace(/\r\n?/g, "\n");
}

function readStdin() {
  try {
    return readFileSync(0, "utf8").replace(/\r\n?/g, "\n");
  } catch {
    return "";
  }
}

function pad(value, width) {
  return String(value).padStart(width, " ");
}

function main(argv) {
  const args = argv.slice(2);
  const strict = args.includes("--strict");
  const asJson = args.includes("--json");
  let failOver = null;
  const fi = args.indexOf("--fail-over");
  if (fi !== -1) {
    failOver = parseFloat(args[fi + 1]);
    args.splice(fi, 2);
  }
  const patterns = args.filter((a) => a !== "--strict" && a !== "--json");

  let worst = 0.0;
  if (!patterns.length) {
    const r = lint(readStdin(), strict);
    console.log(JSON.stringify(r, null, 2));
    worst = r.total_per100w;
  } else {
    const files = [];
    for (const p of patterns) {
      if (/[*?[]/.test(p)) files.push(...globSync(p).sort());
      else files.push(p);
    }
    for (const f of files) {
      const r = lint(readText(f), strict);
      worst = Math.max(worst, r.total_per100w);
      if (asJson) {
        console.log(JSON.stringify({ file: f, ...r }, null, 2));
      } else {
        console.log(
          `${pad(basename(f), 32)} words=${pad(r.words, 4)} ` +
            `total=${pad(r.total, 3)} per100w=${pad(r.total_per100w.toFixed(2), 6)} ` +
            `em_dash=${pad(r["em_dash(slop-marker)"], 2)}`
        );
      }
    }
  }
  if (failOver !== null && worst > failOver) process.exit(1);
}

if (import.meta.url === `file://${process.argv[1]}`) main(process.argv);

export { sentences, stripCode, unquote, wc, globSync, sep };
