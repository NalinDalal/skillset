# @nerdev/skillset

**69 agent skills** across 10 categories, installable into Claude Code, OpenCode, Cursor, Codex, and Gemini. Skills are markdown files your agent reads — no build step, no runtime.

```bash
npm install -g @nerdev/skillset
skillset install
```

## What this is

A curated collection of agent skills for UI, backend, devops, architecture, engineering, quality, business, and workflow. Five skills sync automatically from upstream repos; the rest are owned outright and edited directly.

## Install

```bash
npm install -g @nerdev/skillset
skillset install                          # all skills, all harnesses
skillset install --skill ui/motion        # one skill
skillset install --target claude,opencode # specific harnesses only
skillset install --scope project          # into ./project instead of global
skillset install --dry-run                # preview
skillset install --undo                   # remove
```

Or run without installing:

```bash
npx @nerdev/skillset install
```

## Quick start

```bash
cd my-project
skillset install --scope project --target opencode
opencode
> add a toast notification to this page
```

Skills fire from their description, not from a command you type. Say what you want; the closest matching skill loads automatically.

## What to say for what you want

### UI / frontend

| You say | Skill fires |
|---|---|
| "build the FE / build the frontend / design the UI" | `ui/ui-engineering` |
| "make this screen not look templated" | `ui/ui-core` |
| "what's it called when a popover bounces open" | `ui/motion` |
| "pick a design direction / theme" | `ui/ui-core`, `ui/house-style` |
| "pick a font / typeface / type scale / text motion" | `ui/typography-picker` |
| "generate a web/mobile design reference" | `ui/imagegen` |
| "add a modal / dialog / sheet / popover / menu / select" | `ui/ask-modal` → `ui/ask-base-ui` |
| "add a toast / notification / loading state" | `ui/ask-toast` → `ui/ask-sonner` |
| "add animations / transitions / motion" | `ui/ask-animation` → `ui/ask-motion` |
| "build a form with validation" | `ui/ask-form` → `ui/ask-rhf` |
| "build a data table / sorting / filtering" | `ui/ask-table` → `ui/ask-tanstack-table` |
| "add a command palette / ⌘K" | `ui/ask-command-menu` → `ui/ask-cmdk` |
| "build a virtual list / infinite scroll / feed / chat" | `ui/ask-virtual-list` → `ui/ask-virtuoso` |
| "add a mobile drawer / bottom sheet" | `ui/ask-drawer` → `ui/ask-vaul` |
| "what pages does my product site need" | `ui/product-site` |
| "write my landing page / hero copy / value prop" | `ui/product-messaging` |

### Backend / dev

| You say | Skill fires |
|---|---|
| "design/review this REST or tRPC or GraphQL API" | `backend/api-design` |
| "add auth / OAuth / JWT / MFA / passwordless" | `backend/auth` |
| "design the Prisma schema / optimize this query" | `backend/database` |
| "set up CI / commit conventions / release automation" | `devops/git-ci` |
| "reduce bundle size / fix Core Web Vitals / find a memory leak" | `devops/performance` |
| "build live cursors / chat / multiplayer / presence" | `backend/realtime` |
| "harden security / add CSP / rate limiting / review security posture" | `backend/security` |
| "write tests / set up Vitest or Playwright / fix flaky tests" | `devops/testing` |

### Architecture / planning

| You say | Skill fires |
|---|---|
| "plan a complex feature / break work into PRs" | `architecture/blueprint` |
| "create a codebase walkthrough for onboarding" | `architecture/code-tour` |
| "research existing solutions before building" | `architecture/search-first` |

### Engineering / quality

| You say | Skill fires |
|---|---|
| "write tests first / use TDD" | `engineering/tdd-workflow` |
| "review this code / check for issues" | `engineering/code-review` |
| "verify before PR / run all checks" | `engineering/verification-loop` |
| "enforce coding standards / clean code" | `engineering/coding-standards` |

### Business

| You say | Skill fires |
|---|---|
| "I want to start freelancing" | `business/freelancing` |
| "should I build this startup idea" | `business/startup-founder` |
| "revamp my resume for this JD" | `business/resume-revamp-jake-ats` |
| "help me price this SaaS" | `business/pricing` |
| "what are customers actually saying" | `business/customer-research` |
| "write copy for this landing page" | `business/copywriting` |
| "plan a Product Hunt launch" | `business/launch` |
| "why do people buy this stuff" | `business/marketing-psychology` |
| "make a launch video for this" | `business/brag` |

### Workflow

| You say | Skill fires |
|---|---|
| "brainstorm this idea" | `workflow/office-hours` |
| "ship it / create a PR" | `workflow/ship` |
| "be careful with that command" | `workflow/careful` |
| "save my progress" | `workflow/context-save` |
| "where was I / resume" | `workflow/context-restore` |
| "code health check" | `workflow/health` |
| "what have we learned" | `workflow/learn` |

`architecture/progress-guard` and `ai-agent/ultra-context-engine` run in the background when their trigger conditions appear. They don't need to be called by name.

## After installing

Restart or reload your agent:

- **OpenCode**: start a new session (`opencode`)
- **Claude Code**: `/clear` or start a new session
- **Cursor**: reload window (`Cmd+Shift+P` → "Reload Window")
- **Codex**: start a new session

## CLI

```bash
skillset list                              # see all skills + descriptions
skillset sync                              # pull latest from upstream repos
skillset install --skill ui/motion --undo  # remove one skill
```

## What's included

**69 skills in 10 categories**

- **ui** (28): components, animations, design systems, typography, motion, forms, tables, modals, toasts, command palettes, virtual lists, drawers
- **backend** (5): API design, auth, database, realtime, security
- **devops** (4): CI/CD, deployment, testing, performance
- **architecture** (4): planning, onboarding, research, progress guard
- **engineering** (4): TDD, code review, verification, standards
- **quality** (2): anti-slop, writing quality
- **business** (8): freelancing, startup, pricing, customer research, copywriting, launch, marketing, video
- **nerdev** (3): Turborepo + Bun structure, docs/ADRs, plug-and-play architecture
- **ai-agent** (2): agent docs, context efficiency
- **workflow** (7): ship, careful, context save/restore, health, learn

5 skills sync from upstream repos nightly. The remaining 64 are owned outright. You can overlay any synced skill with your own version via `curations/<skill>/overlay/` — your edits survive every sync.

## License

MIT
