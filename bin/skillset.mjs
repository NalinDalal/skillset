#!/usr/bin/env node
/**
 * skillset: install, list, and sync agent skills from this repo.
 *
 *   skillset list                          list available skills
 *   skillset install [--skill <name>]...   install into agent harnesses
 *       --target claude,opencode,cursor,codex,gemini   (default: all detected)
 *       --scope global|project             (default: global)
 *       --dry-run
 *   skillset sync [--dry-run]              re-vendor from upstream repos
 */

import { execSync } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, readdirSync, rmSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const SKILLS_DIR = join(ROOT, "skills");

const HARNESSES = {
  claude: { global: join(homedir(), ".claude", "skills"), project: ".claude/skills" },
  opencode: { global: join(homedir(), ".config", "opencode", "skills"), project: ".opencode/skills" },
  cursor: { global: join(homedir(), ".cursor", "skills"), project: ".cursor/skills" },
  codex: { global: join(homedir(), ".agents", "skills"), project: ".agents/skills" },
  gemini: { global: join(homedir(), ".gemini", "skills"), project: ".gemini/skills" },
};

const args = process.argv.slice(2);
const command = args[0] ?? "help";
const rest = args.slice(1);

function flag(name) {
  for (let i = 0; i < rest.length; i++) {
    if (rest[i] === `--${name}`) {
      const next = rest[i + 1];
      if (next && !next.startsWith("--")) return next;
    } else if (rest[i].startsWith(`--${name}=`)) {
      return rest[i].split("=").slice(1).join("=");
    }
  }
  return undefined;
}
function hasFlag(name) {
  return rest.includes(name);
}
function flagValues(name) {
  const vals = [];
  for (let i = 0; i < rest.length; i++) {
    if (rest[i] === `--${name}`) {
      const next = rest[i + 1];
      if (next && !next.startsWith("--")) {
        vals.push(next);
        i++;
      }
    } else if (rest[i].startsWith(`--${name}=`)) {
      vals.push(rest[i].split("=").slice(1).join("="));
    }
  }
  return vals;
}

function walkSkills(dir, prefix) {
  const results = [];
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    if (!e.isDirectory()) continue;
    const rel = prefix ? `${prefix}/${e.name}` : e.name;
    const full = join(dir, e.name);
    if (existsSync(join(full, "SKILL.md"))) {
      results.push(rel);
    }
    results.push(...walkSkills(full, rel));
  }
  return results;
}

function listSkills() {
  return walkSkills(SKILLS_DIR, "").sort();
}

function readDescription(relPath) {
  try {
    const md = readFileSync(join(SKILLS_DIR, relPath, "SKILL.md"), "utf8");
    const m = md.match(/^description:\s*(.*)$/m);
    if (!m) return "";
    return m[1].replace(/^["']|["']$/g, "").slice(0, 120) + (m[1].length > 120 ? "…" : "");
  } catch {
    return "";
  }
}

function cmdList() {
  const skills = listSkills();
  console.log(`skillset: ${skills.length} skills\n`);
  for (const name of skills) {
    const desc = readDescription(name);
    console.log(`  ${name.padEnd(32)} ${desc}`);
  }
}

function cmdInstall() {
  const scope = flag("scope") ?? "global";
  const targetFlag = flag("target");
  const onlySkills = flagValues("skill");
  const dry = hasFlag("--dry-run");
  const undo = hasFlag("--undo");

  const targets = targetFlag
    ? targetFlag.split(",").map((t) => t.trim()).filter(Boolean)
    : Object.keys(HARNESSES);

  const all = listSkills();
  const allLeaf = all.map((p) => p.split("/").pop());
  const skills = onlySkills.length
    ? onlySkills.filter((s) => all.includes(s) || allLeaf.includes(s)).map((s) => {
        const idx = all.indexOf(s);
        return idx >= 0 ? all[idx] : all[allLeaf.indexOf(s)];
      })
    : all;
  const missing = onlySkills.filter((s) => !all.includes(s) && !allLeaf.includes(s));
  if (missing.length) console.warn(`  ! unknown skill(s): ${missing.join(", ")}. Skipped\n`);

  let installed = 0;
  for (const target of targets) {
    const cfg = HARNESSES[target];
    if (!cfg) {
      console.warn(`  ! unknown target "${target}" (valid: ${Object.keys(HARNESSES).join(", ")})`);
      continue;
    }
    const destBase = scope === "project" ? join(process.cwd(), cfg.project) : cfg.global;
    for (const skill of skills) {
      const leafName = skill.split("/").pop();
      const safeSkill = leafName.replace(/\.\./g, "").replace(/[/\\]/g, "");
      if (safeSkill !== leafName) {
        console.warn(`  ! sanitized skill name: ${leafName} → ${safeSkill}`);
      }
      const dest = join(destBase, safeSkill);
      if (dry) {
        console.log(`  ~ ${target}: would install ${skill} → ${dest}`);
        continue;
      }
      if (undo) {
        if (existsSync(dest)) {
          rmSync(dest, { recursive: true, force: true });
          installed++;
          console.log(`  ✗ ${target}: removed ${safeSkill}`);
        }
        continue;
      }
      mkdirSync(destBase, { recursive: true });
      cpSync(join(SKILLS_DIR, skill), dest, { recursive: true });
      installed++;
      console.log(`  ✓ ${target}: installed ${skill} → ${dest}`);
    }
  }

  if (dry) {
    console.log(`\n[dry-run] would ${undo ? "remove" : "install"} ${skills.length} skill(s) ${undo ? "from" : "into"} ${targets.join(", ")} (${scope})`);
  } else {
    const verb = undo ? "removed" : "installed";
    console.log(`\nDone. ${installed} skill(s) ${verb} (${scope}). Restart/reload your agent to pick them up.`);
  }
}

function cmdSync() {
  const dry = hasFlag("--dry-run");
  execSync(`${process.execPath} ${join(ROOT, "scripts", "sync.mjs")} ${dry ? "--dry-run" : ""}`, {
    stdio: "inherit",
  });
}

function cmdHelp() {
  console.log(`skillset: install, list, and sync agent skills.

Usage:
  skillset list                        list available skills (category/name)
  skillset install [--skill <name>]   install skills into agent harnesses
      --target <claude,opencode,cursor,codex,gemini>   (default: all)
      --scope <global|project>         (default: global)
      --dry-run
      --undo                           remove installed skills
  skillset sync [--dry-run]           re-vendor skills from upstream repos

Examples:
  skillset install                                    # everything, global
  skillset install --skill ui/motion --skill backend/auth
  skillset install --target claude,opencode --scope project
  skillset install --undo                             # remove everything installed
`);
}

switch (command) {
  case "list":
    cmdList();
    break;
  case "install":
    cmdInstall();
    break;
  case "sync":
    cmdSync();
    break;
  default:
    cmdHelp();
}
