# skillset

A curated collection of **20 agent skills** (design, motion, dev workflow, your patterns) with a CLI to install them into any harness (Claude Code, OpenCode, Cursor, Codex, Gemini) and a CI/CD pipeline that keeps them synced with top-tier upstreams.

> **Owned, not copied.** Synced skills are a base, not the final word. Any skill
> you care about gets a `curations/<skill>/` layer that survives every upstream
> re-sync, your taste, your whys, never clobbered. See [Ownership model](#ownership-model).

## What's inside

### Design & animation skills (from upstreams, auto-synced)

| Upstream | Skills |
|---|---|
| [pbakaus/impeccable](https://github.com/pbakaus/impeccable) (59k★) | `impeccable`: 23 design commands, 59 deterministic detector rules, live browser iteration |
| [Leonxlnx/taste-skill](https://github.com/Leonxlnx/taste-skill) (77k★) | `output-skill` (the design half of this upstream was merged into the owned `ui` skill) |
| [emilkowalski/skills](https://github.com/emilkowalski/skills) (30k★) | `pick-ui-library`, `prototype`, `ask-sonner` (the animation half of this upstream was merged into the owned `motion` skill) |

### Original skills

`deployments`, `agent-docs-writer`, `ultra-context-engine`, `freelancing`, `startup-founder`, `resume-revamp-jake-ats`, `house-style`: how the codebase wants to be built: route-based files, Apple/Google-clean UI (no AI purple slop), docs the human writes and the agent audits. `motion`: one skill that owns the whole motion job: name an effect, decide, build, review, audit. Merged from the seven-skill animation family because they were one job in seven voices. `ui`: one skill that owns the whole UI job: pick the direction, design the system, build the screen, redesign or audit, verify before ship. Merged from nine overlapping design skills. `imagegen`: one skill that owns design-image generation: web references, mobile screens, brand kits, image-to-code. Merged from four image-generation skills.

### Added skills

`unslop`: cuts AI tells from any writing (from [cursor/plugins pstack](https://github.com/cursor/plugins/tree/main/pstack/skills/unslop), vendored as an owned skill).

### Your skills (local, not synced)

| Skill | Purpose |
|-------|---------|
| `nerdev-monorepo` | Turborepo + Bun monorepo structure, conventions, CI/CD, deployment patterns |
| `nerdev-abstraction` | Interface-first, registry, factory, plugin protocol for plug-and-play architecture |
| `nerdev-docs` | Development-integrated docs: ADRs, design docs, incident postmortems, deploy runbooks |
| `house-style` | How the codebase wants to be built: route-based files, Apple/Google-clean UI (no AI purple slop), docs the human writes and the agent audits |
| `ui-engineering` | **Master UI orchestrator** — load when user says "build the FE", "build the UI", "build the frontend". Asks brief, loads all sub-skills, enforces Linear/Raycast/Stripe quality bar |
| `ui` | Whole UI job: pick direction, design system, build screen, redesign/audit, verify |
| `impeccable` | 23 design commands, 59 detector rules, live browser iteration |
| `motion` | Whole motion job: name effect, decide, build, review, audit |
| `pick-ui-library` | Curated library picks for UI primitives (base-ui, Sonner, motion, cmdk, RHF, TanStack Table, Virtuoso, Vaul) |
| `prototype` | Build divergent UI variants behind a visual picker |
| `imagegen` | Premium design image generation: web refs, mobile screens, brand kits, image-to-code |
| `ask-modal` | Pattern guide: dialogs, sheets, popovers, menus, selects |
| `ask-toast` | Pattern guide: toasts, notifications, loading states |
| `ask-animation` | Pattern guide: transitions, springs, scroll, gestures |
| `ask-form` | Pattern guide: forms, validation, server actions |
| `ask-table` | Pattern guide: data tables, sorting, filtering, virtualization |
| `ask-command-menu` | Pattern guide: command palette (⌘K), fuzzy search |
| `ask-virtual-list` | Pattern guide: infinite scroll, variable heights |
| `ask-drawer` | Pattern guide: mobile bottom sheets, side drawers |
| `ask-base-ui` | Library guide: unstyled accessible primitives (Dialog, Sheet, Popover, Menu, Select, etc.) |
| `ask-motion` | Library guide: motion.dev springs, layout, gestures, scroll |
| `ask-cmdk` | Library guide: command palette, fuzzy search, keyboard nav |
| `ask-rhf` | Library guide: React Hook Form + Zod |
| `ask-tanstack-table` | Library guide: TanStack Table v8 headless tables |
| `ask-virtuoso` | Library guide: Virtuoso virtualized lists |
| `ask-vaul` | Library guide: Vaul drawers/sheets with gestures |
| `ask-gsap` | Library guide: GSAP + ScrollTrigger + Lenis for showcase tier |

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
skillset list                              # see all 20 skills + descriptions
skillset install                           # everything → ~/.claude, ~/.config/opencode, ~/.cursor, ~/.agents, ~/.gemini
skillset install --skill taste-skill       # just one skill
skillset install --target claude,opencode  # only specific harnesses
skillset install --scope project           # into ./project/.claude/skills etc. instead of global
skillset install --dry-run                 # preview without touching anything
skillset install --undo                    # remove everything this CLI installed
skillset sync                              # pull latest from upstream repos (local)
```

Restart/reload your agent after installing.

## How to use a skill

1. **Install the skill you want.**

   ```bash
   skillset install --skill motion --target claude,opencode
   ```

   Restart or reload your agent so it loads the new skill.

2. **Trigger it by what you want, not by command.** Skills turn on from
   their description. Ask in plain words and the matching skill takes over:

| You say | Skill fires |
|---|---|
| "make this screen not look templated" | `ui` |
| "what is it called when a popover bounces open" | `motion` |
| "help me deploy this repo to a VPS" | `deployments` |
| "write an AGENTS.md for this repo" | `agent-docs-writer` |
| "I want to start freelancing" | `freelancing` |
| "clean up this sloppy AI-sounding text" | `unslop` |
| "scaffold a new Turborepo + Bun monorepo" | `nerdev-monorepo` |
| "add a plug-and-play tool system with registry" | `nerdev-abstraction` |
| "create ADR, design doc, incident template" | `nerdev-docs` |
| **"build the FE", "build the UI", "build the frontend", "design the frontend", "make the UI"** | `ui-engineering` |
| **"add a modal/dialog/sheet/popover/menu/select"** | `ask-modal` → `ask-base-ui` |
| **"add a toast/notification/loading state"** | `ask-toast` → `ask-sonner` |
| **"add animations/transitions/motion"** | `ask-animation` → `ask-motion` (or `ask-gsap` if showcase) |
| **"build a form with validation"** | `ask-form` → `ask-rhf` |
| **"build a data table/sorting/filtering"** | `ask-table` → `ask-tanstack-table` |
| **"add a command palette/⌘K"** | `ask-command-menu` → `ask-cmdk` |
| **"build a virtual list/infinite scroll/feed/chat"** | `ask-virtual-list` → `ask-virtuoso` |
| **"add a mobile drawer/bottom sheet"** | `ask-drawer` → `ask-vaul` |

3. **Or call it by name.** If the agent did not auto-load it, say so in
   your request: "use the motion skill to review these animations". The
   skill runs as a normal agent task, so it works in any harness that
   supports skills (Claude Code, OpenCode, Cursor, Codex, Gemini).

4. **See what's installed.** `skillset list` shows all skills in this
   repo. To remove one: `skillset install --undo --skill motion`.

### Using your local skills (nerdev-*)

Your three `nerdev-*` skills live in `skills/` but **aren't managed by the sync script** -- they're owned directly in this repo.

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

The `.github/workflows/sync.yml` workflow runs **nightly at 03:00 UTC** (and on demand via *Actions → Sync upstream skills → Run workflow*):

1. `scripts/sync.mjs` shallow-clones each upstream repo from `vendor.json`, compares the pinned commit against `origin/HEAD`
2. If upstream moved, the skill folders are re-vendored into `skills/` and `vendor.json` is bumped
3. Every owned skill's `curations/<skill>/overlay/` is re-applied on top: upstream churn never overwrites your voice
4. A PR titled `chore: sync skills from upstreams` is auto-opened against `main`
5. Merge it, then publish:

```bash
npm version patch && npm publish
```

That's it: you never hand-copy skill files again. New versions flow: upstream repo → nightly sync → PR → merge → publish → `npx @nalindalal/skillset install` on any machine.

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
- **Never edit `skills/<skill>/` directly.** The next sync deletes the folder.
  If you want it in your voice, put it in `curations/<skill>/overlay/` first.
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
bin/skillset.mjs           # the CLI (npm bin target)
.github/workflows/sync.yml # nightly auto-sync + PR
```

## License

MIT: see [LICENSE](LICENSE).
