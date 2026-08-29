# skillset

A curated collection of **45 agent skills** (design, motion, backend patterns, dev workflow, business) with a CLI to install them into any harness (Claude Code, OpenCode, Cursor, Codex, Gemini) and a CI/CD pipeline that keeps a handful of them synced with top-tier upstreams.

> **Owned, not copied.** Synced skills are a base, not the final word. Any skill
> you care about gets a `curations/<skill>/` layer that survives every upstream
> re-sync — your taste, your whys, never clobbered. See [Ownership model](#ownership-model).

## What's inside

### Synced from upstream (5 skills, auto-updated nightly)

| Upstream                                                                                  | Skills                                                                                    |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) (59k★)                        | `impeccable`: 23 design commands, 59 deterministic detector rules, live browser iteration |
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (77k★)                    | `output-skill`                                                                            |
| [emilkowalski/skills](https://github.com/emilkowalski/skills) (30k★)                      | `ask-sonner`, `pick-ui-library`, `prototype`                                              |
| [cursor/plugins pstack](https://github.com/cursor/plugins/tree/main/pstack/skills/unslop) | `unslop`: cuts AI tells from any writing                                                  |

These four repos are pinned in `vendor.json`. `.github/workflows/sync.yml` checks them nightly and opens a PR when they move — you never hand-copy a file from them.

### Everything else (40 skills, owned outright)

Not synced from anywhere — written for this repo, live only here, edited directly in `skills/<name>/`.

**UI / design / frontend family** — `house-style` (the law: how UI, code, and docs should look and feel), `ui-engineering` (master orchestrator — loads the rest of this family for a full build), `ui` (whole UI job: direction → system → build → verify), `motion` (whole motion job: name → decide → build → review), `imagegen` (design-reference image generation).

**Pattern → library pairs** — ask "how do I build X" and you get the pattern skill; it names the library and hands off to the library-specific guide:

| Pattern skill      | Hands off to                                   |
| ------------------ | ---------------------------------------------- |
| `ask-modal`        | `ask-base-ui`                                  |
| `ask-toast`        | `ask-sonner`                                   |
| `ask-animation`    | `ask-motion` (or `ask-gsap` for showcase-tier) |
| `ask-form`         | `ask-rhf`                                      |
| `ask-table`        | `ask-tanstack-table`                           |
| `ask-command-menu` | `ask-cmdk`                                     |
| `ask-virtual-list` | `ask-virtuoso`                                 |
| `ask-drawer`       | `ask-vaul`                                     |

**Backend / dev-workflow** — `api-design`, `auth`, `database`, `git-ci`, `performance`, `realtime`, `security`, `testing`.

**nerdev-co family** — `nerdev-monorepo` (Turborepo + Bun structure, CI/CD, deploy), `nerdev-docs` (ADRs, design docs, runbooks), `nerdev-abstraction` (interface-first, registry-based plug-and-play).

**Meta / process** — `agent-docs-writer` (README/AGENTS.md), `progress-guard` (catches motion-not-progress on side work), `ultra-context-engine` (token-efficiency layer).

**Business** — `freelancing`, `startup-founder`, `resume-revamp-jake-ats`, `deployments`.

## Install

**Via GitHub (no npm account/token needed, always works):**

```bash
npx github:NalinDalal/skillset install    # install all skills, all harnesses (global)
bunx github:NalinDalal/skillset install   # bun equivalent
```

**From npm (if/when published as `@nalindalal/skillset`):**

```bash
npx @nalindalal/skillset install
bunx @nalindalal/skillset install
```

**From the repo directly:**

```bash
git clone https://github.com/NalinDalal/skillset.git
cd skillset
npm link                        # or bun link, then `skillset` is on your PATH
```

## Usage

```bash
skillset list                              # see all 45 skills + descriptions
skillset install                           # everything → ~/.claude, ~/.config/opencode, ~/.cursor, ~/.agents, ~/.gemini
skillset install --skill motion            # just one skill
skillset install --target claude,opencode  # only specific harnesses
skillset install --scope project           # into ./project/.claude/skills etc. instead of global
skillset install --dry-run                 # preview without touching anything
skillset install --undo                    # remove everything this CLI installed
skillset sync                              # pull latest from the 4 upstream repos (local)
```

Restart or reload your agent after installing.

## What to say for what you want

Skills fire from their description, not from a command you type. Say what you want in plain words; the closest-matching skill loads. If it doesn't auto-load, name it: _"use the motion skill to review these animations."_

**UI / frontend:**

| You say                                                  | Skill fires                                                 |
| -------------------------------------------------------- | ----------------------------------------------------------- |
| "build the FE / build the frontend / design the UI"      | `ui-engineering` (loads the rest of the UI family)          |
| "make this screen not look templated"                    | `ui`                                                        |
| "what's it called when a popover bounces open"           | `motion`                                                    |
| "pick a design direction / theme"                        | `ui`, `house-style`                                         |
| "generate a web/mobile design reference"                 | `imagegen`                                                  |
| "add a modal / dialog / sheet / popover / menu / select" | `ask-modal` → `ask-base-ui`                                 |
| "add a toast / notification / loading state"             | `ask-toast` → `ask-sonner`                                  |
| "add animations / transitions / motion"                  | `ask-animation` → `ask-motion` (or `ask-gsap` for showcase) |
| "build a form with validation"                           | `ask-form` → `ask-rhf`                                      |
| "build a data table / sorting / filtering"               | `ask-table` → `ask-tanstack-table`                          |
| "add a command palette / ⌘K"                             | `ask-command-menu` → `ask-cmdk`                             |
| "build a virtual list / infinite scroll / feed / chat"   | `ask-virtual-list` → `ask-virtuoso`                         |
| "add a mobile drawer / bottom sheet"                     | `ask-drawer` → `ask-vaul`                                   |

**Backend / dev workflow:**

| You say                                                               | Skill fires   |
| --------------------------------------------------------------------- | ------------- |
| "design/review this REST or tRPC or GraphQL API"                      | `api-design`  |
| "add auth / OAuth / JWT / MFA / passwordless"                         | `auth`        |
| "design the Prisma schema / optimize this query"                      | `database`    |
| "set up CI / commit conventions / release automation"                 | `git-ci`      |
| "reduce bundle size / fix Core Web Vitals / find a memory leak"       | `performance` |
| "build live cursors / chat / multiplayer / presence"                  | `realtime`    |
| "harden security / add CSP / rate limiting / review security posture" | `security`    |
| "write tests / set up Vitest or Playwright / fix flaky tests"         | `testing`     |

**Repo & process:**

| You say                                           | Skill fires          |
| ------------------------------------------------- | -------------------- |
| "help me deploy this repo to a VPS/EC2"           | `deployments`        |
| "write an AGENTS.md / audit this README"          | `agent-docs-writer`  |
| "clean up this sloppy AI-sounding text"           | `unslop`             |
| "scaffold a new Turborepo + Bun monorepo"         | `nerdev-monorepo`    |
| "add a plug-and-play tool system with a registry" | `nerdev-abstraction` |
| "create an ADR / design doc / incident template"  | `nerdev-docs`        |

**Business:**

| You say                            | Skill fires              |
| ---------------------------------- | ------------------------ |
| "I want to start freelancing"      | `freelancing`            |
| "should I build this startup idea" | `startup-founder`        |
| "revamp my resume for this JD"     | `resume-revamp-jake-ats` |

`progress-guard` and `ultra-context-engine` don't wait to be called by name — they run in the background whenever their trigger conditions show up in the conversation (side-work-instead-of-shipping, and token-budget pressure, respectively).

**See what's installed:** `skillset list`. **Remove one:** `skillset install --undo --skill motion`.

### Using your local skills (nerdev-*)

The three `nerdev-*` skills live in `skills/` but **aren't managed by the sync script** — they're owned directly in this repo, same as everything in "Everything else" above.

**Option A: Use from this repo (recommended)**

```bash
# From skillset root
opencode  # opencode.json points to ./skills
# skill nerdev-monorepo  → works
```

**Option B: Symlink globally (works everywhere)**

```bash
ln -sf /Users/nalindalal/skillset/opencode.json ~/.config/opencode/opencode.json
# Now in ANY directory:
opencode
# skill nerdev-monorepo  → works
```

**Option C: Copy to a project**

```bash
cp -r /Users/nalindalal/skillset/skills/nerdev-monorepo /my-project/.opencode/skills/
# In /my-project:
opencode
# skill nerdev-monorepo  → works
```

**Compose them:**

```bash
skill nerdev-monorepo      # Repo skeleton + conventions
skill nerdev-abstraction   # Plug-and-play architecture
skill nerdev-docs          # Living docs + ADRs + runbooks
```

## CI/CD: how updates flow

The `.github/workflows/sync.yml` workflow runs **nightly at 03:00 UTC** (and on demand via _Actions → Sync upstream skills → Run workflow_):

1. `scripts/sync.mjs` shallow-clones each upstream repo from `vendor.json`, compares the pinned commit against `origin/HEAD`
2. If upstream moved, the skill folders are re-vendored into `skills/` and `vendor.json` is bumped
3. Every owned skill's `curations/<skill>/overlay/` is re-applied on top: upstream churn never overwrites your voice
4. A PR titled `chore: sync skills from upstreams` is auto-opened against `main`
5. Merge it, then publish:

```bash
npm version patch && npm publish
```

`.github/workflows/sync.yml` also runs `npm run lint:ste` on every push — every owned `.md` file has to stay under 5.0 STE violations per 100 words (synced upstream files are exempt).

New versions flow: upstream repo → nightly sync → PR → merge → publish → `npx @nalindalal/skillset install` on any machine.

## Ownership model

Upstream SKILL.md files encode someone else's judgment about someone else's
codebase. The moment a skill matters to you, it should encode yours.

```text
curations/
  <skill>/
    overlay/          # your owned versions, copied over skills/<skill>/ after EVERY sync
    WHY.md            # why you own it this way; read by sync, never shipped
```

- **Pick what to own.** Upstream never ships a file you've overlaid. Your
  version always wins. Everything else in that skill still tracks upstream.
- **Never edit `skills/<skill>/` directly** for the 5 synced skills — the next
  sync deletes the folder. If you want it in your voice, put it in
  `curations/<skill>/overlay/` first. (This doesn't apply to the 40 owned
  skills — those you edit directly, since nothing re-vendors them.)
- **Write the why.** `WHY.md` is the difference between curation and
  copy-paste. Future-you and future agents read it.

Try it:

```bash
cp -R curations/TEMPLATE curations/impeccable   # then fill in overlay/ + WHY.md
npm run sync                                    # overlay survives, check git diff
```

## Manual sync

```bash
node scripts/sync.mjs            # check + apply updates
node scripts/sync.mjs --dry-run  # report only
node scripts/sync.mjs --repo taste-skill  # one upstream only
```

## Structure

```
skills/<name>/SKILL.md     # the skills themselves (self-contained, copyable)
curations/<name>/          # your ownership layer: overlay/ + WHY.md (never touched by sync)
vendor.json                # upstream repos + pinned commits + skill maps
scripts/sync.mjs           # re-vendor logic (used by CI and manually)
scripts/ste-gate.mjs       # STE prose-quality gate, runs on every push
bin/skillset.mjs           # the CLI (npm bin target)
.github/workflows/sync.yml # nightly auto-sync + PR
```

## License

MIT: see [LICENSE](LICENSE).
