# AGENTS.md

Read this before changing skillset. It targets coding agents, but applies to human contributors too.

## Glossary

- **Skill**: a folder `skills/<category>/<name>/` with a `SKILL.md` inside. The frontmatter `description` is the API: agents load the skill when the description matches what you asked. A bad description means the skill never fires.
- **Harness**: the agent host the CLI installs into. Claude Code, OpenCode, Cursor, Codex, Gemini.
- **Owned skill**: written here, edited directly. The sync script never touches these.
- **Synced skill**: pulled nightly from an upstream repo, pinned in `vendor.json`. Currently: `ui/impeccable`, `quality/output-skill`, `ui/ask-sonner`, `ui/pick-ui-library`, `ui/prototype`, `quality/unslop`.
- **Overlay**: your owned version of a synced skill, at `curations/<skill>/overlay/`. It is copied over the vendored file after every sync, so your version always wins.
- **Vendoring**: the nightly sync that clones upstream, checks the pinned commit, re-copies changed skill folders, bumps `vendor.json`, and opens a PR titled `chore: sync skills from upstreams`.
- **STE**: sloppy-text lint, `scripts/ste-gate.mjs` + `ste-lint.py`. Owned `.md` files must stay under 5.0 violations per 100 words. Em dashes are the most common violation.

## What makes skillset special

This repo's product is markdown that other machines install. Every skill you add here runs in other people's agents. That changes the rules: the `description` field is trigger logic, not copy, and a prose quality gate judges your writing, not your code.

The owned/synced split is the core mechanic. Sync deletes synced skill folders wholesale. Editing one directly means your change is gone after the next nightly sync. Your voice survives only through `curations/<skill>/overlay/`.

## What to never compromise on

1. **Never edit a synced skill folder directly**: the next sync wipes it. Put your version in `curations/<skill>/overlay/` with a `WHY.md`. This is the single rule that loses people the most work.
2. **Owned prose must pass the STE gate**: run `npm run lint:ste` before committing. The most common failure is em dashes. Write terse, concrete prose and you stay under the threshold.
3. **Every skill needs a `name` and a `description`**: the description leads with the exact trigger keywords and says when to use the skill. Without it the loader filters the skill out.
4. **Do not hand-copy from upstreams**: `scripts/sync.mjs` is the only sanctioned path. A manual copy bypasses `vendor.json` pinning and the curation overlay.
5. **Keep `bin/skillset.mjs` and `scripts/` runnable**: a broken CLI or sync script breaks `npx skillset install` on every machine that uses this repo.

## How and where it is working

`skills/` holds the skills by category (`ui/`, `backend/`, `devops/`, `architecture/`, `engineering/`, `quality/`, `business/`, `nerdev/`, `ai-agent/`, `workflow/`). `curations/<skill>/` holds overlays and `WHY.md`. `vendor.json` pins upstream repos and per-skill hashes. `.github/workflows/sync.yml` runs `scripts/sync.mjs` nightly and opens a sync PR. `scripts/ste-gate.mjs` runs on every push. `bin/skillset.mjs` is the npm CLI (`install`, `list`, `sync`, `--undo`). `opencode.json` registers `./skills` so an agent opened in this repo sees every skill.

## Good vs. bad examples

### Preserve work on a synced skill

Bad (generic default):
```
skills/ui/ask-sonner/SKILL.md   # edited directly, wiped on next sync
```

Good (how we do it here):
```
curations/ask-sonner/overlay/SKILL.md   # survives every sync
curations/ask-sonner/WHY.md             # why you own it this way
```
Why: the sync deletes the vendored folder and re-creates it from upstream; the overlay is re-applied on top every time.

### Write owned prose that passes the gate

Bad:
```
This skill provides a comprehensive suite of functionalities designed to help
you to effectively and efficiently create and manage toasts, notifications,
and various loading states.
```
Good:
```
Use when working with Sonner or troubleshooting it: toasts that don't appear,
appear twice, lose their styles, sit behind a modal, or don't follow dark mode.
```
Why: the gate punishes filler and em dashes. Terse, concrete sentences pass.

### Create a skill that actually fires

Bad:
```markdown
---
name: my-thing
description: Some useful functionality.
---
```
Good:
```markdown
---
name: ask-sonner
description: Guide to Sonner, the React toast library. Use when working with Sonner or troubleshooting it: toasts that don't appear, appear twice, lose their styles...
---
```
Why: agents match on the description's trigger keywords. Front-load them.

### Commit in repo style

Bad:
```
fix various documentation issues and improve the overall quality of several skill descriptions to be more comprehensive
```
Good:
```
add motion to product eng
```
Why: this is a personal repo with short, terse commits. The sync bot is the only one using `chore: sync skills from upstreams`.

## A note from the author

[inferred, fill in or delete] The synced/owned line has burned past time: edits made directly to a synced skill disappeared overnight. If a skill matters, curate it first.