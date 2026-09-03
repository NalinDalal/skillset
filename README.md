# skillset

52 agent skills in 9 categories (ui, backend, devops, architecture, engineering, quality, business, nerdev, ai-agent) with a CLI to install them into any harness (Claude Code, OpenCode, Cursor, Codex, Gemini) and a CI/CD pipeline that syncs a handful from upstream repos.

> **Owned, not copied.** Synced skills are a base, not the final word. Any skill
> you care about gets a `curations/<skill>/` layer that survives every upstream
> re-sync: your taste, your whys, never clobbered. See [Ownership model](#ownership-model).

## What's inside

### Categories

```
skills/
├── ui/               25 skills  Components, animations, design systems
├── backend/           5 skills  API, auth, database, realtime, security
├── devops/            4 skills  CI/CD, deployment, testing, performance
├── architecture/      4 skills  Planning, onboarding, research
├── engineering/       4 skills  TDD, code review, verification, standards
├── quality/           2 skills  Writing quality, anti-slop
├── business/          3 skills  Freelancing, startup, career
├── nerdev/            3 skills  Nerdev skill family
└── ai-agent/          2 skills  Agent docs, context management
```

### Synced from upstream (5 skills, auto-updated nightly)

| Upstream                                                                                  | Skills                                                                                    |
| ----------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------- |
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) (59k★)                        | `ui/impeccable`: 23 design commands, 59 deterministic detector rules, live browser iteration |
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (77k★)                    | `quality/output-skill`                                                                    |
| [emilkowalski/skills](https://github.com/emilkowalski/skills) (30k★)                      | `ui/ask-sonner`, `ui/pick-ui-library`, `ui/prototype`                                     |
| [cursor/plugins pstack](https://github.com/cursor/plugins/tree/main/pstack/skills/unslop) | `quality/unslop`: cuts AI tells from any writing                                          |

These four repos are pinned in `vendor.json`. `.github/workflows/sync.yml` checks them nightly and opens a PR when they move. You never hand-copy a file from them.

### Everything else (47 skills, owned outright)

Not synced from anywhere. Written for this repo, live only here, edited directly in `skills/<category>/<name>/`.

**ui/**: `house-style` (the law: how UI, code, and docs should look and feel), `ui-engineering` (loads the rest of the UI family for a full build), `ui-core` (whole UI job: direction → system → build → verify), `motion` (whole motion job: name → decide → build → review), `imagegen` (design-reference image generation).

**Pattern → library pairs**: ask "how do I build X" and you get the pattern skill; it names the library and hands off to the library-specific guide:

| Pattern skill      | Hands off to                                        |
| ------------------ | --------------------------------------------------- |
| `ui/ask-modal`     | `ui/ask-base-ui`                                    |
| `ui/ask-toast`     | `ui/ask-sonner`                                     |
| `ui/ask-animation` | `ui/ask-motion` (or `ui/ask-gsap` for showcase-tier) |
| `ui/ask-form`      | `ui/ask-rhf`                                        |
| `ui/ask-table`     | `ui/ask-tanstack-table`                             |
| `ui/ask-command-menu` | `ui/ask-cmdk`                                    |
| `ui/ask-virtual-list` | `ui/ask-virtuoso`                                 |
| `ui/ask-drawer`    | `ui/ask-vaul`                                       |

**backend/**: `api-design`, `auth`, `database`, `realtime`, `security`.

**devops/**: `deployments`, `git-ci`, `performance`, `testing`.

**architecture/**: `blueprint` (multi-PR construction plans), `code-tour` (guided codebase walkthroughs), `search-first` (research-before-coding), `progress-guard` (catches motion-not-progress on side work).

**engineering/**: `tdd-workflow` (RED/GREEN/REFACTOR cycle), `code-review` (confidence-weighted, noise-free review), `verification-loop` (6-phase pre-PR gate), `coding-standards` (cross-project conventions).

**quality/**: `unslop` (cuts AI tells), `output-skill` (elite writing quality).

**nerdev/**: `nerdev-monorepo` (Turborepo + Bun structure, CI/CD, deploy), `nerdev-docs` (ADRs, design docs, runbooks), `nerdev-abstraction` (interface-first, registry-based plug-and-play).

**ai-agent/**: `agent-docs-writer` (README/AGENTS.md), `ultra-context-engine` (token-efficiency layer).

**business/**: `freelancing`, `startup-founder`, `resume-revamp-jake-ats`.

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

## Quick start (local project)

```bash
# 1. Install skills into your project
cd my-project
skillset install --scope project --target opencode   # or claude, cursor, etc.

# 2. Open your agent in that directory
opencode    # or claude, cursor, etc.

# 3. Say what you want, the matching skill loads automatically
> add a toast notification to this page
# → ask-toast fires → hands off to ask-sonner → you get working code

# Or name a skill explicitly if it doesn't auto-load
> use the motion skill to review these animations
```

That's it. Skills are just markdown files your agent reads, no build step, no runtime. Install them, then talk to your agent naturally.

## Usage

```bash
skillset list                              # see all 52 skills + descriptions
skillset install                           # everything → ~/.claude, ~/.config/opencode, ~/.cursor, ~/.agents, ~/.gemini
skillset install --skill ui/motion         # just one skill (category/name)
skillset install --target claude,opencode  # only specific harnesses
skillset install --scope project           # into ./project/.claude/skills etc. instead of global
skillset install --dry-run                 # preview without touching anything
skillset install --undo                    # remove everything this CLI installed
skillset sync                              # pull latest from the 4 upstream repos (local)
```

Restart or reload your agent after installing:
- **OpenCode**: just start a new session (`opencode`)
- **Claude Code**: `/clear` or start a new session
- **Cursor**: reload window (`Cmd+Shift+P` → "Reload Window")
- **Codex**: start a new session

## What to say for what you want

Skills fire from their description, not from a command you type. Say what you want in plain words; the closest-matching skill loads. If it doesn't auto-load, name it: _"use the motion skill to review these animations."_

**UI / frontend:**

| You say                                                  | Skill fires                                                        |
| -------------------------------------------------------- | ------------------------------------------------------------------ |
| "build the FE / build the frontend / design the UI"      | `ui/ui-engineering` (loads the rest of the UI family)              |
| "make this screen not look templated"                    | `ui/ui-core`                                                       |
| "what's it called when a popover bounces open"           | `ui/motion`                                                        |
| "pick a design direction / theme"                        | `ui/ui-core`, `ui/house-style`                                     |
| "generate a web/mobile design reference"                 | `ui/imagegen`                                                      |
| "add a modal / dialog / sheet / popover / menu / select" | `ui/ask-modal` → `ui/ask-base-ui`                                  |
| "add a toast / notification / loading state"             | `ui/ask-toast` → `ui/ask-sonner`                                   |
| "add animations / transitions / motion"                  | `ui/ask-animation` → `ui/ask-motion` (or `ui/ask-gsap` for showcase) |
| "build a form with validation"                           | `ui/ask-form` → `ui/ask-rhf`                                       |
| "build a data table / sorting / filtering"               | `ui/ask-table` → `ui/ask-tanstack-table`                           |
| "add a command palette / ⌘K"                             | `ui/ask-command-menu` → `ui/ask-cmdk`                              |
| "build a virtual list / infinite scroll / feed / chat"   | `ui/ask-virtual-list` → `ui/ask-virtuoso`                          |
| "add a mobile drawer / bottom sheet"                     | `ui/ask-drawer` → `ui/ask-vaul`                                    |

**Backend / dev workflow:**

| You say                                                               | Skill fires              |
| --------------------------------------------------------------------- | ------------------------ |
| "design/review this REST or tRPC or GraphQL API"                      | `backend/api-design`     |
| "add auth / OAuth / JWT / MFA / passwordless"                         | `backend/auth`           |
| "design the Prisma schema / optimize this query"                      | `backend/database`       |
| "set up CI / commit conventions / release automation"                 | `devops/git-ci`          |
| "reduce bundle size / fix Core Web Vitals / find a memory leak"       | `devops/performance`     |
| "build live cursors / chat / multiplayer / presence"                  | `backend/realtime`       |
| "harden security / add CSP / rate limiting / review security posture" | `backend/security`       |
| "write tests / set up Vitest or Playwright / fix flaky tests"         | `devops/testing`         |

**Architecture / planning:**

| You say                                                               | Skill fires                      |
| --------------------------------------------------------------------- | -------------------------------- |
| "plan a complex feature / break work into PRs"                        | `architecture/blueprint`         |
| "create a codebase walkthrough for onboarding"                        | `architecture/code-tour`         |
| "research existing solutions before building"                         | `architecture/search-first`      |

**Engineering / quality:**

| You say                                                               | Skill fires                      |
| --------------------------------------------------------------------- | -------------------------------- |
| "write tests first / use TDD"                                         | `engineering/tdd-workflow`       |
| "review this code / check for issues"                                 | `engineering/code-review`        |
| "verify before PR / run all checks"                                   | `engineering/verification-loop`  |
| "enforce coding standards / clean code"                               | `engineering/coding-standards`   |

**Repo & process:**

| You say                                           | Skill fires                     |
| ------------------------------------------------- | ------------------------------- |
| "help me deploy this repo to a VPS/EC2"           | `devops/deployments`            |
| "write an AGENTS.md / audit this README"          | `ai-agent/agent-docs-writer`    |
| "clean up this sloppy AI-sounding text"           | `quality/unslop`                |
| "scaffold a new Turborepo + Bun monorepo"         | `nerdev/nerdev-monorepo`        |
| "add a plug-and-play tool system with a registry" | `nerdev/nerdev-abstraction`     |
| "create an ADR / design doc / incident template"  | `nerdev/nerdev-docs`            |

**Business:**

| You say                            | Skill fires                     |
| ---------------------------------- | ------------------------------- |
| "I want to start freelancing"      | `business/freelancing`          |
| "should I build this startup idea" | `business/startup-founder`      |
| "revamp my resume for this JD"     | `business/resume-revamp-jake-ats` |

`architecture/progress-guard` and `ai-agent/ultra-context-engine` don't wait to be called by name. They run in the background whenever their trigger conditions show up in the conversation (side-work-instead-of-shipping, and token-budget pressure, respectively).

**See what's installed:** `skillset list`. **Remove one:** `skillset install --undo --skill ui/motion`.

### Using your local skills (nerdev/*)

The three `nerdev/*` skills live in `skills/nerdev/` but **aren't managed by the sync script**. They're owned directly in this repo, same as everything in "Everything else" above.

**Option A: Use from this repo (recommended)**

```bash
# From skillset root
opencode  # opencode.json points to ./skills
# skill nerdev/nerdev-monorepo  → works
```

**Option B: Symlink globally (works everywhere)**

```bash
ln -sf /path/to/skillset/opencode.json ~/.config/opencode/opencode.json
# Now in ANY directory:
opencode
# skill nerdev/nerdev-monorepo  → works
```

**Option C: Copy to a project**

```bash
cp -r /path/to/skillset/skills/nerdev/nerdev-monorepo /my-project/.opencode/skills/
# In /my-project:
opencode
# skill nerdev/nerdev-monorepo  → works
```

**Compose them:**

```bash
skill nerdev/nerdev-monorepo      # Repo skeleton + conventions
skill nerdev/nerdev-abstraction   # Plug-and-play architecture
skill nerdev/nerdev-docs          # Living docs + ADRs + runbooks
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

`.github/workflows/sync.yml` also runs `npm run lint:ste` on every push. Every owned `.md` file has to stay under 5.0 STE violations per 100 words (synced upstream files are exempt).

New versions flow: upstream repo → nightly sync → PR → merge → publish → `npx @nalindalal/skillset install` on any machine.

## Ownership model

Upstream SKILL.md files encode someone else's judgment about someone else's
codebase. The moment a skill matters to you, it should encode yours.

```text
curations/
  <skill>/
    overlay/          # your owned versions, copied over skills/<category>/<skill>/ after EVERY sync
    WHY.md            # why you own it this way; read by sync, never shipped
```

- **Pick what to own.** Upstream never ships a file you've overlaid. Your
  version always wins. Everything else in that skill still tracks upstream.
- **Never edit `skills/<category>/<skill>/` directly** for the 5 synced skills. The next
  sync deletes the folder. If you want it in your voice, put it in
  `curations/<skill>/overlay/` first. (This doesn't apply to the 47 owned
  skills, those you edit directly, since nothing re-vendors them.)
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
skills/
├── ui/                    # UI components, animations, design systems
├── backend/               # API, auth, database, realtime, security
├── devops/                # CI/CD, deployment, testing, performance
├── architecture/          # Planning, onboarding, research
├── engineering/           # TDD, code review, verification, standards
├── quality/               # Writing quality, anti-slop
├── business/              # Freelancing, startup, career
├── nerdev/                # Nerdev skill family
└── ai-agent/              # Agent docs, context management

curations/<name>/          # your ownership layer: overlay/ + WHY.md (never touched by sync)
vendor.json                # upstream repos + pinned commits + skill maps
scripts/sync.mjs           # re-vendor logic (used by CI and manually)
scripts/ste-gate.mjs       # STE prose-quality gate, runs on every push
bin/skillset.mjs           # the CLI (npm bin target)
.github/workflows/sync.yml # nightly auto-sync + PR
```

## License

MIT: see [LICENSE](LICENSE).
