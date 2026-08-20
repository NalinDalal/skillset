---
name: agent-docs-writer
description: "Use this skill to write, create, improve, or audit README.md and AGENTS.md for a code repository. Make the codebase legible to AI coding agents (Claude Code, Cursor, Codex, OpenCode, etc.) and to humans. Trigger on phrases like \"write an AGENTS.md\", \"make my repo agent-friendly\", \"onboarding doc for coding agents\", \"README for this project\", \"contributor guide\", \"docs so an AI agent does not break things\", or any request to document a codebase's context, conventions, glossary, or guardrails. Also use it to review or critique an existing README or AGENTS.md against this skill's checklist. Check that docs distinguish [planned] vs [shipped] reality and mark plan-drift with dated NOTE markers. Always use this instead of writing a generic README or AGENTS.md from scratch."
---

# Agent Docs Writer

Writes a **README.md + AGENTS.md pair** for a repo. README answers
"what is this and is it worth pulling in or reading further" for humans
AND agents. AGENTS.md answers "how do I safely change this codebase"
for a coding agent about to start work. They are two different
documents with two different jobs. Never merge them into one file.

This skill borrows the philosophy behind T3 Code's AGENTS.md (https://github.com/pingdotgg/t3code/blob/main/AGENTS.md). Be terse and glossary-first. Be opinionated about non-negotiables. Use concrete good/bad examples instead of abstract rules.

## Workflow

1. **Scan the repo** (do not just ask. Look first, then ask to fill gaps)
2. **Interview** the user for the things scanning cannot tell you
3. **Draft** README.md and AGENTS.md
4. **Show the draft in chat** and get explicit confirmation before writing files
5. **Write files** only after confirmation

Never skip straight to writing files without showing a draft first. This is a hard requirement for this skill. It holds no matter how the user phrases the request.

---

## Plan vs. Shipped-Reality rule (applies to every doc this skill writes or audits)

Docs often come before the code they describe ("docs-as-spec"). That makes them a great thinking tool but a dangerous memory. Months later, re-reading a stale doc gives the author a **false memory of their own project**. In interviews or handoffs, describing architecture that does not exist reads as dishonest or confused.

Therefore, whenever this skill writes or audits docs:

1. **Distinguish "planned" from "shipped."** Every claim about architecture, features, or behavior must be one of:
   - `[planned]`: vision/design intent, not yet built
   - `[shipped]`: actually implemented and running
   - When unsure, mark `[planned]` and ask the user. Never assume a doc describes reality.
2. **Mark drift, do not rewrite history.** When a plan changed mid-build (feature dropped, tech swapped, scope cut), the doc keeps the original plan AND gets a drift marker at the top of the changed section:
   `> NOTE (YYYY-MM-DD): superseded: actually shipped as X because <Y>`
   The marker takes 30 seconds, and keeps the doc an honest archive of everything: the vision AND the reality.
3. **Audit mode:** when reviewing existing docs, actively look for unmarked claims that do not match the code (in `package.json`, repo structure, tests, CI). Flag each one with the drift marker, do not silently "fix" it to match code. Include the question "did this actually ship?" for the user to answer.
4. **Postmortem/case-study docs** (drafted during the build): end each milestone/postmortem with a "what actually changed" section dated at the time of writing. This keeps the final story true to what happened, not to the plan.

---

## Step 1: Scan the repo

Before asking the user anything, look for signal yourself:

- `package.json` / `pyproject.toml` / `Cargo.toml` / `go.mod` etc. → name, deps, scripts, language/framework, monorepo tooling (turborepo, nx, pnpm workspaces...)
- Existing `README.md`, `CONTRIBUTING.md`, `AGENTS.md`, `CLAUDE.md`, `.cursorrules` → do not start from zero, extract and upgrade
- Directory structure (`view` on repo root, 2 levels deep) → infer architecture (monorepo vs single app, apps/ + packages/, src/ layout, etc.)
- Test setup, CI config (`.github/workflows/`), linter/formatter config → infer what "safe to change" looks like mechanically
- Git remote / repo name → project identity

Use `bash_tool` and `view` for this. Build a working picture before the interview. Then you ask fewer, sharper questions instead of generic ones the repo already answers.

## Step 2: Interview

Ask only what scanning could not answer. Use `ask_user_input_v0` where the answers are short or pick-one. Keep to the essentials below. Do not ask more than 3 to 4 questions at once.

Essential things to nail down:

1. **Glossary**. Does this project have terms that mean something specific/non-obvious here? (e.g. in T3 Code: "environment", "project", "thread", "turn" all have precise meanings that differ from casual usage). If yes, get a plain-language definition for each, one line, no jargon-on-jargon.
2. **What makes this project special**. The thing a generic agent would get wrong by defaulting to "how everyone else does it." (e.g. "we don't use REST here, everything is RPC" or "this is a CLI-first tool, the web UI is secondary")
3. **What to never compromise on**. The 2-5 hard invariants. Things like: never break backwards compat on X. Never touch generated files by hand. Always run migrations through Y. Security/auth code always needs a second look. This is the highest-value section. Push the user if they give you something vague like "write good code."
4. **How and where it is working**. Deployment/runtime shape in one paragraph: where does this run, what is the boundary between packages, what talks to what.
5. **Good/bad examples**. For at least the top 2-3 rules in AGENTS.md, get or infer one concrete "do this" / "not this" pair. Agents learn more from examples than from abstract prose. If the user cannot supply one, propose one based on the scanned code and confirm it.
6. **A note from the author** (optional but recommended). One informal paragraph, in the user's own voice, that does not fit the structured sections. This is where personality and context live (e.g. "we've been burned by X before, that's why rule Y exists").

If the user is clearly in a hurry or says "just draft something", infer sensible defaults from the repo scan. Mark inferred sections clearly as `[inferred, confirm or edit]` in the draft. Then move straight to drafting.

## Step 3: Draft

Use the templates in `templates/README.template.md` and `templates/AGENTS.template.md` as the structural skeleton. Read `references/principles.md` for the reasoning behind each section before filling them in. Do not skip it. It explains *why* each section exists so you do not flatten it into generic boilerplate.

Show both drafts inline in the chat response (as markdown, not as files yet).

**Drafting style (non-negotiable).** The reader knows English. Write for a 5th grader anyway.

- Short and sweet. A sentence that works without words loses the words.
- **No em dashes. Anywhere. Never.** Not in files, diffs, docs, comments,
  or chat. Use commas or periods. One em dash means the deliverable fails
  review.
- Small paragraphs. Lists over prose.
- `name: what it does` for every file, package, or feature:

  ```
  auth.ts: login, tokens, sessions.
  ```

- Abstract, not imported. No signatures, no import trees. Say what it does
  and how it fits. A function name that adds nothing is left out.
- Outcomes over details. What someone gets, or what breaks. Not how many
  lines moved.
- If a doc would survive unchanged in another project, it says nothing
  about this one. Cut it.

## Step 4: Confirm

Ask explicitly: does this look right, anything to cut/add/reword? Iterate in chat. Do not write files until the user confirms.

## Step 5: Write

Once confirmed, write `README.md` and `AGENTS.md` to the repo root (or wherever the user's working directory is). Then present them.
