# skillset

**98 agent skills** across 10 categories (UI, backend, devops, architecture, engineering, quality, business, nerdev, ai-agent, workflow)

<p align="center">
  <a href="https://www.npmjs.com/package/@nerdev/skillset">
    <img src="https://img.shields.io/npm/v/@nerdev/skillset.svg?style=for-the-badge&logo=npm&color=brightgreen" alt="npm version">
  </a>
  <a href="https://github.com/NalinDalal/skillset">
    <img src="https://img.shields.io/github/license/NalinDalal/skillset.svg?style=for-the-badge" alt="License: MIT">
  </a>
  <a href="https://github.com/NalinDalal/skillset/actions">
    <img src="https://img.shields.io/github/actions/workflow/status/NalinDalal/skillset/.github/workflows/sync.yml?branch=main&style=for-the-badge" alt="CI status">
  </a>
</p>

## Install

```bash
npm install -g @nerdev/skillset   # installs the `skillset` CLI globally
skillset install                   # install all skills, all harnesses
```

Or without global install:

```bash
npx @nerdev/skillset install       # all skills, all harnesses
npx @nerdev/skillset install --skill ui/motion   # one skill
npx @nerdev/skillset install --target claude     # specific harness only
npx @nerdev/skillset install --scope project     # into ./project instead of global
npx @nerdev/skillset install --dry-run          # preview only
npx @nerdev/skillset install --undo           # remove installed skills
```

## Quick start

```bash
cd my-project
skillset install --scope project --target opencode
opencode

# Then naturally:
> add a toast notification to this page
# → ask-toast fires → hands off to ask-sonner → working code
```

Skills fire from their description — say what you want in plain words; the closest-matching skill loads automatically.

## Invoking a skill

Every skill is registered in your harness's command catalog, so the name is always a slash command. This is true in OpenCode as well as Claude Code: a skill and a command are the same entry, tagged by source. Type `/` to see the full list.

```bash
/impeccable            # by name, any harness
/product-engineering
/ship
/pricing
```

Two other ways in, neither requiring the name:

- **Ask for the behavior.** "should we build this" loads `engineering/product-engineering` on description match alone.
- **Name it in prose.** "use the product-engineering skill" forces the load when the automatic match picks a neighbour.

The slash name is the frontmatter `name`, not the folder. Two differ:

| Slash name | Folder |
|---|---|
| `/full-output-enforcement` | `quality/output-skill` |
| `/ui-core` | `ui/ui-core` |

`output-skill` is synced from upstream, which ships that name in its own frontmatter, so the mismatch is upstream's and survives every sync.

## What you can say

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
| "write our about page / get cited by AI answers" | `engineering/about-sop` |

### Business

| You say | Skill fires |
|---|---|
| "I want to start freelancing" | `business/freelancing` |
| "should I build this startup idea" | `business/startup-founder` |
| "how do I reach a CMO / find partners / write a cold message to a VP" | `business/decision-maker-outreach` |
| "help me define my ICP / where do my buyers hang out" | `business/decision-maker-outreach` |
| "should I become a fractional CMO / what does a fractional CMO do" | `business/fractional-cmo` |
| "we have four agencies and nobody owning marketing" | `business/fractional-cmo` |
| "revamp my resume for this JD" | `business/resume-revamp-jake-ats` |
| "help me price this SaaS" | `business/pricing` |
| "what are customers actually saying" | `business/customer-research` |
| "write copy for this landing page" | `business/copywriting` |
| "plan a Product Hunt launch" | `business/launch` |
| "why do people buy this stuff" | `business/marketing-psychology` |
| "why does ChatGPT recommend my competitor / get cited by AI" | `business/seo` |
| "publish a statistics page / get cited by AI" | `business/research-page` |
| "which pages go in my footer / internal link strategy" | `business/internal-linking` |
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

> **Note:** `architecture/progress-guard` and `ai-agent/ultra-context-engine` run in the background when their trigger conditions appear in conversation. They don't need to be called by name.

## After installing

Restart or reload your agent:

- **OpenCode**: start a new session (`opencode`)
- **Claude Code**: `/clear` or start a new session
- **Cursor**: reload window (`Cmd+Shift+P` → "Reload Window")
- **Codex**: start a new session

## What's included

**98 skills in 10 categories:**

- **ui** (50): components, animations, design systems, typography, motion, forms, tables, modals, toasts, command palettes, virtual lists, drawers
- **backend** (5): API design, auth, database, realtime, security
- **devops** (4): CI/CD, deployment, testing, performance
- **architecture** (4): planning, onboarding, research, progress guard
- **engineering** (7): TDD, code review, verification, standards, product engineering, about-page SOP, senior engineer prompts
- **quality** (2): anti-slop, writing quality
- **business** (14): freelancing, startup, decision-maker outreach, fractional CMO, pricing, customer research, copywriting, launch, marketing, video, product messaging, SEO, research pages, internal linking
- **nerdev** (3): Turborepo + Bun structure, docs/ADRs, plug-and-play architecture
- **ai-agent** (2): agent docs, context efficiency
- **workflow** (7): ship, careful, context save/restore, health, learn, office hours

5 skills sync from upstream repos nightly (pinned in `vendor.json`). The remaining 93 are owned outright. You can overlay any synced skill with your own version via `curations/<skill>/overlay/` — your edits survive every sync.

## License

MIT. See [LICENSE](LICENSE) for details.
