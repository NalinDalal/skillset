# skillset

A curated collection of **31 agent skills** (design, animation, dev workflow) with a CLI to install them into any harness — Claude Code, OpenCode, Cursor, Codex, Gemini — and a CI/CD pipeline that keeps them synced with top-tier upstreams.

## What's inside

### Design & animation skills (from upstreams, auto-synced)

| Upstream | Skills |
|---|---|
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) (59k★) | `impeccable` — 23 design commands, 59 deterministic detector rules, live browser iteration |
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (77k★) | `taste-skill`, `taste-skill-v1`, `redesign-skill`, `soft-skill`, `minimalist-skill`, `brutalist-skill`, `gpt-tasteskill`, `image-to-code-skill`, `output-skill`, `stitch-skill`, `imagegen-frontend-web`, `imagegen-frontend-mobile`, `brandkit` |
| [emilkowalski/skills](https://github.com/emilkowalski/skills) (30k★) | `emil-design-eng`, `animate`, `review-animations`, `improve-animations`, `find-animation-opportunities`, `animation-vocabulary`, `apple-design`, `pick-ui-library`, `prototype`, `ask-sonner` |

### Original skills

`ui-theme-picker`, `deployments`, `agent-docs-writer`, `ultra-context-engine`, `freelancing`, `startup-founder`, `resume-revamp-jake-ats`

## Install

**From npm (published as `@nalindalal/skillset`):**
```bash
npx @nalindalal/skillset install   # install all skills, all harnesses (global)
bunx @nalindalal/skillset install  # bun equivalent
```

**From the repo directly:**
```bash
git clone https://github.com/NalinDalal/skillset.git
cd skillset
npm link                        # or: bun link — then `skillset` is on your PATH
```

## Usage

```bash
skillset list                              # see all 31 skills + descriptions
skillset install                           # everything → ~/.claude, ~/.config/opencode, ~/.cursor, ~/.agents, ~/.gemini
skillset install --skill taste-skill       # just one skill
skillset install --target claude,opencode  # only specific harnesses
skillset install --scope project           # into ./project/.claude/skills etc. instead of global
skillset install --dry-run                 # preview without touching anything
skillset install --undo                    # remove everything this CLI installed
skillset sync                              # pull latest from upstream repos (local)
```

Restart/reload your agent after installing.

## CI/CD: how updates flow

The `.github/workflows/sync.yml` workflow runs **nightly at 03:00 UTC** (and on demand via *Actions → Sync upstream skills → Run workflow*):

1. `scripts/sync.mjs` shallow-clones each upstream repo from `vendor.json`, compares the pinned commit against `origin/HEAD`
2. If upstream moved, the skill folders are re-vendored into `skills/` and `vendor.json` is bumped
3. A PR titled `chore: sync skills from upstreams` is auto-opened against `main`
4. Merge it, then publish:

```bash
npm version patch && npm publish
```

That's it — you never hand-copy skill files again. New versions flow: upstream repo → nightly sync → PR → merge → publish → `npx @nalindalal/skillset install` on any machine.

### Manual sync

```bash
node scripts/sync.mjs            # check + apply updates
node scripts/sync.mjs --dry-run  # report only
node scripts/sync.mjs --repo taste-skill  # one upstream only
```

## Structure

```
skills/<name>/SKILL.md     # the skills themselves (self-contained, copyable)
vendor.json                # upstream repos + pinned commits + skill maps
scripts/sync.mjs           # re-vendor logic (used by CI and manually)
bin/skillset.mjs           # the CLI (npm bin target)
.github/workflows/sync.yml # nightly auto-sync + PR
```

## License

MIT — see [LICENSE](LICENSE).
