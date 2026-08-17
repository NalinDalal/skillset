---
name: ui-theme-picker
description: Use whenever the user is starting a new project/page/component and needs a visual direction — theme, palette, typography, or minimal/brutalist/glassy/etc. Also use when the user shares a reference site/screenshot they like ("this site has great UI", "how do I get this effect") and wants its techniques identified or recreated, or asks to make an existing UI feel like a real/finished product rather than a template. Trigger on "what theme should I use", "pick a design/style", "help me design the UI", "give me theme options", "how do I build this effect", "make this look like a real product", or any new frontend build before writing UI code with no theme decided yet. Asks context questions, matches answers to style families, outputs ready-to-paste tokens and Tailwind config, runs a productization pass (identity, IA, interaction model, component language, signature interaction) so results behave like a designed product, and hands back hand-buildable code for signature interactions — not just library links.
---

# UI Theme Picker

Picks a visual direction for a project by asking a few sharp questions, then hands back
2-3 concrete, opinionated theme options with copy-pasteable tokens — not vague adjectives.

**Default taste target: animated but premium, never gimmicky.** Motion should earn its
place — reinforce hierarchy, guide attention, feel expensive — not exist just to prove
a library got installed. The single biggest failure mode to avoid is janky or slow
animation: it converts "great UI" into "cheap UI" instantly, faster than any style
mismatch does. Prefer GPU-friendly transforms (`transform`/`opacity`, not
`width`/`top`/`box-shadow` animated directly), respect `prefers-reduced-motion`, and
don't stack more than 2-3 signature effects per page — more than that reads as noise,
not polish.

**Animation mechanics checklist — apply whenever writing actual motion code, not just
picking a "motion character" adjective:**
- **Ask "should this animate at all" first.** High-frequency actions (hover states,
  list navigation, keyboard-triggered actions used tens/hundreds of times a day) should
  usually get little or no animation — the fastest interface is the best interface for
  those. Reserve real motion for things that happen occasionally and benefit from
  spatial continuity or feedback (opening a panel, confirming a destructive action,
  onboarding moments).
- **`transform` and `opacity` only.** These skip layout/paint and run on the GPU.
  `width`/`height`/`margin`/`padding`/`top`/`left` (or animating x/y/scale via
  non-GPU-backed properties) trigger layout thrash — treat as a bug, not a style choice.
  `clip-path` is an acceptable fourth property when needed; `height` is tolerated only
  for accordions where there's no transform equivalent.
- **Sub-300ms for UI motion.** Anything slower on a UI element (button, toggle,
  dropdown, toast) needs a specific reason — slower is fine for deliberate marketing/
  hero moments, not for routine interface feedback.
- **Popovers/dropdowns/tooltips scale from their trigger** (`transform-origin` set to
  the anchor point), not from center — center-scaling reads as generic and spatially
  wrong. Modals are the exception and stay centered.
- **Never animate in from `scale(0)`.** Start from `scale(0.9–0.97)` + `opacity: 0` —
  scaling from zero reads as a bug, not an entrance.
- **Rapidly-retriggerable motion must be interruptible** (toasts, toggles, drag) — use
  transitions/springs that retarget from current state, not keyframes that restart from
  zero every time they fire.
- **`prefers-reduced-motion` means gentler, not zero.** Keep opacity/color transitions
  that aid comprehension; drop movement, scale, and position changes.
- **No bounce/elastic easing on ordinary UI** — it reads as dated/cheap on anything
  other than a deliberately playful signature moment.

**What "great UI" means for this user (confirmed via direct elicitation, apply by
default unless a specific project overrides it):**
- The bar is "does this catch the eye on first overview scroll" — not just "is this
  clean." Polish alone isn't the goal; polish that makes someone stop scrolling is.
- **Structure safe, detail bold.** Default to conventional, proven page structure and
  layout (predictable nav, hero, sections — nothing structurally experimental that risks
  confusing a client or user) — but push hard on visual polish and eye-catching detail
  *within* that structure (motion, color, glow, depth). Don't default to
  structurally-risky styles like brutalism or heavy asymmetric layouts unless the
  project explicitly calls for standing out that way.
- **Color mood is context-dependent, not fixed** — dark/techy for dev tools and tech
  products, light-clean or bold-colorful for SaaS/consumer, matched to brand when one
  exists. Don't default to one mood across all projects.
- **Deliver signature interactions as actual hand-buildable code**, not just a library
  pointer — this user wants the implementation, not just "go get Aceternity's X." Still
  name the library/component if one exists (useful reference/shortcut), but always
  include the code to build it directly.
- **Proactively identify one signature interaction or visual behavior** even if not
  asked — prefer product-native interaction (a contextual toolbar, command palette,
  inline editing, a canvas manipulation, a keyboard flow) over a decorative effect. A
  visual effect (particles, glow, ambient blobs) is acceptable only when it reinforces
  the product's actual identity, not as a default move to seem eye-catching. Never add
  animation merely to make a screenshot look impressive.
- **Hard avoid-list** (reads instantly cheap/dated to this user, or as generic
  AI-generated output): overused purple/blue SaaS gradient combos (the generic
  Linear-clone gradient); cheesy "friendly" rounded corporate fonts (Poppins/Quicksand/
  Baloo-style roundness used to seem approachable); defaulting to Inter/Arial/system-font
  for everything with no pairing or intentional choice; pure black (`#000`) or pure gray
  text/backgrounds with no tint; gray text directly on a colored/brand background (fails
  contrast and reads flat); cards nested inside cards, or wrapping every piece of content
  in a bordered box "to look modern"; a rounded-square icon tile sitting above every
  section heading; side-tab/vertical-line borders as a default nav treatment; unexplained
  dark ambient glow effects behind hero content; and floating decorative pills/badges
  with no functional purpose. Don't reach for these as defaults even when a style family
  in `references/styles.md` lists them as an example — swap for a less generic
  alternative.

**Animation effort has no fixed default — always ask per-project** (this is a person
preference, not a one-time setting). Don't assume "go heavy" or "keep it light" from a
past project; the right amount depends on the specific client/timeline/budget each time.
Frame the question as a rough 1–10 dial rather than a vague adjective when it helps
pin down a fuzzy answer: **1** = essentially static, functional transitions only;
**5** = a couple of signature moments, rest clean and fast; **10** = cinematic,
motion-forward on nearly every surface. Same applies to density if the project's level
isn't obvious from type — **1** = airy/gallery-like generous whitespace, **5** = normal
day-to-day app spacing, **10** = packed/dense "cockpit" spacing with thin dividers
instead of card boxes (common for trading terminals, admin/data tools). Don't ask both
dials as separate questions unless genuinely unclear — usually project type + vibe word
already pins density, and only animation effort needs the explicit ask.

**"Finished product" is the actual quality bar — not "themed" or "styled."** A large
share of AI-generated UI is technically fine but instantly reads as a knockoff: generic
card grids, default shadows, one accent color slapped on stock layout. The difference
between that and a UI that "looks like a real product" isn't the palette — it's these
eight things, check output against all of them before presenting:

1. **Recognizable visual language** — a person could screenshot one component and
   identify it belongs to this product, not a template. If every button/card/input
   would look at home in any other AI-generated app, it hasn't cleared the bar.
2. **Every spacing decision is intentional** — no leftover default padding, no random
   `mt-4` that doesn't relate to a scale. If asked "why 24px here," there's a reason.
3. **Clear hierarchy between primary and secondary actions** — one obvious primary
   action per view, everything else visually recedes. Not three equally-weighted
   buttons competing for attention.
4. **Dense functionality is organized, not hidden or dumped flat** — group related
   controls, use progressive disclosure, don't either cram everything into one panel
   or bury it three menus deep.
5. **Non-happy-path states are designed too** — empty states, loading states, error
   states, hover/focus/disabled states, and menus need the same care as the main view.
   A polished main screen with a default browser error state is still unfinished.
6. **Components behave consistently** — the same interaction (e.g. how a dropdown opens,
   how a destructive action confirms) works the same way everywhere in the product.
7. **Restraint — not decorating every surface "to look modern."** Gradients, glows,
   shadows, and glassmorphism used on everything read as trying too hard. Reach for
   these only where they earn their place.
8. **The UI reflects the product's actual personality**, not a generic "professional
   SaaS" default. A playful whiteboard tool and an enterprise dashboard should not
   converge on the same look just because both used this skill.

**Reference products for this bar** (study for *why* they feel finished — extract
principles, never copy pixels):
- **Excalidraw** — simple, playful, distinctive, doesn't try to look "premium," has its
  own visual language. Best anchor for creative/canvas tools.
- **Linear** — restrained SaaS UI, dense info without clutter, strong hierarchy.
- **Raycast** — utility that feels like a finished product; typography/spacing/motion
  all reinforce it. Best anchor for command palettes, search, keyboard-driven UI.
- **Vercel** — restrained system; strong reference for typography, cards, nav, dark/light.
- **Figma** — complex functionality staying coherent; best anchor for creative/dev tools.
- **Notion** — huge functionality made approachable without being visually flashy.
- **Stripe** — typography, hierarchy, and density for marketing/product surfaces.
- **Arc** — unconventional but intentional; UI with opinions rather than another dashboard.
- **Framer** — polished visuals + strong interaction design, more visually expressive.

When a project matches one of these categories (canvas/creative tool, dense SaaS,
command-driven utility, dev tool), name the closest 1-2 matches as the quality anchor
in step 3's output — not as a style to clone, but as "this is the bar, here's what it
does that we're borrowing the *principle* of, not the pixels."

**Reference product analysis happens at the behavior level, not the visual level.**
The question is never "what does Linear look like" — it's "what does Linear *do* that
makes its UI feel intentional, and which of those principles applies here." Concretely:

DO NOT copy from a reference: colors, layouts, logos, typography, exact component
shapes, exact spacing, exact navigation structure, copy, visual motifs.

DO extract from a reference: hierarchy, density philosophy, interaction model,
information architecture, feedback patterns, component consistency, motion restraint,
direct-manipulation patterns, progressive disclosure, the relationship between primary
and secondary actions.

If output can be described as "it looks like Linear" rather than "it behaves with
Linear's density and hierarchy discipline," the extraction was at the wrong level —
redo it at the behavior level.

Optimized for Next.js + TypeScript + Tailwind stacks by default (adjust if the user's
stack is different), and for fast, decisive output over long explanations.

Two reference files:
- `references/styles.md` — 14 style families with rationale, tokens, and Tailwind/CSS templates
- `references/component-sources.md` — which library to actually pull each style/effect
  from (Aceternity, Magic UI, 21st.dev, shadcn, etc.), plus a breakdown of recurring
  "wow" effects (particle heroes, glass navbars, scroll tickers, glowing cards, ambient
  blobs, marquees) with source + effort level for each

## Workflow

### 0. Detect which mode this is: new theme vs. refine-existing-toward-a-reference

These are different jobs — don't run the greenfield workflow on a refinement task.

- **New theme** (default, steps 1-6 below): no existing UI, or existing UI is being
  replaced wholesale. Goal is picking a style family from scratch.
- **Refine existing UI, possibly using a reference product for quality bar**: the user
  has a working app that "looks bad"/"looks amateur" and points at a polished reference
  (a competitor, a screenshot, a well-known product) — but wants their own identity, not
  a clone. Signals: "make it feel as polished as X", "I don't want a visual clone, but
  see how X actually looks like a product", attaching a screenshot of their own app
  alongside a reference.

For the refine-existing mode:
1. **Audit first, always.** List the current design primitives (colors, spacing, button
   styles, states) actually in the codebase before proposing anything — don't skip to
   tokens. Note duplicated/inconsistent one-off styling as you go.
2. **Extract principles from the reference, not pixels.** Translate what makes the
   reference read as "a product" into transferable rules — restraint (fewer competing
   colors), spacing rhythm, floating surfaces vs. fixed panels, subtle multi-state
   feedback (default/hover/selected, not just on/off), consistent radius/shadow scale.
   Do not carry over the reference's brand colors, logo, exact layout, or literal
   component copy — say explicitly in the output that these are excluded.
   Never restyle every screen at once, if avoidable — biggest visual-debt zones first
   only if the user's request is scoped that way; otherwise cover what they asked for.
3. **Explicit non-goals matter as much as goals.** If the user lists things not to
   touch (architecture, business logic, API contracts, canvas/data logic), repeat them
   back as hard constraints in the output plan, not just silently respected — this is
   a common trust point when a UI-refinement request touches a working app.
4. **Do the same stack-detection (1a) and monorepo-location (1b) checks below** — a
   refinement task still needs to know where tokens actually live before touching them.
5. Skip step 2/3 (style-family selection) — the direction is already set by the
   reference + "keep my identity," not chosen from the family list. Go straight to
   token output (step 4) framed as a diff against the current styling, not a fresh
   greenfield palette.

### 1. Gather context (skip questions already answered in conversation)

Don't ask what you already know. If the user already said "SaaS dashboard for devs" or
similar, don't re-ask category — just ask what's missing.

If an interactive elicitation tool is available (e.g. `ask_user_input_v0`), use it —
these should be quick taps, not an essay prompt. Otherwise ask inline, tightly grouped,
max 3 questions per round.

Ask about (only what's not already known):
1. **What are you building** — landing page / SaaS product / dashboard-internal-tool /
   portfolio / e-commerce / dev tool or CLI wrapper / blog-content site / mobile-first app
2. **Who's it for** — consumers / developers-technical / enterprise-buyers / creative-portfolio-viewers
3. **Vibe in one word, if they have one** — otherwise infer from #1 and #2
4. **Any constraint** — existing brand color, must match a logo, light/dark/both, or none
5. **Animation effort for this project** — always ask this one explicitly, don't default
   to heavy or light: e.g. "a couple signature moves, rest clean" vs "go all-in" vs
   "keep it fast and minimal, this client needs speed over spectacle"

Do not ask more than these. If the user just says "build me a UI, pick something good",
infer sensible defaults from project type alone and proceed — don't stall on questions.

### 1a. Confirm the styling stack before generating any tokens

**Tailwind is the only styling approach this skill outputs — this is strict, not a
default that yields to convenience.** Every project this skill touches gets Tailwind
utility classes for styling; plain CSS, CSS-in-JS (styled-components, emotion), or
CSS modules are never the output, even if the existing project already uses one of
those. If the codebase uses something else, migrating that specific surface to
Tailwind is part of the job, not an out-of-scope concern to flag and skip.

Never assume Tailwind version or CSS variable format — get this wrong and the entire
token output is unusable. Check, in order:

1. **Is this an existing repo?** If a project directory is available, check for it
   directly rather than asking:
   - Tailwind v4 signature: `@import "tailwindcss"` in a CSS file (e.g. `globals.css`),
     no `tailwind.config.ts`/`.js`, or a `@theme { ... }` block present.
   - Tailwind v3 signature: `tailwind.config.ts`/`.js` exists with a `content` array and
     `theme.extend`.
   - Look at `package.json` for the `tailwindcss` version as a tiebreaker (`^4.x` vs `^3.x`).
   - If tokens/CSS variables already exist (a `:root` block, a `@theme` block, or a
     `theme.extend.colors` object already filled in) — treat those as the source of
     truth. Extend or restyle them; don't generate a second, competing token set. Say
     what you found before proposing anything new.
2. **If it's a React or Next.js frontend and Tailwind is NOT detected** (no
   `tailwindcss` in `package.json`, no `@theme`/`tailwind.config.*`, no `@tailwind`/
   `@import "tailwindcss"` directive) — **install and wire it up before writing any
   component code.** Don't ask permission to add a styling dependency; this skill's
   whole output format depends on Tailwind existing, so treat it as a required setup
   step, same as checking the framework version. Sequence:
   - Detect the framework first (Next.js App Router vs Pages Router, Vite+React, CRA,
     etc.) from `package.json`/config files — install steps differ by framework.
   - **Next.js (App Router, v13.4+):** Tailwind v4 is the default expectation for new
     work: `npm install tailwindcss @tailwindcss/postcss postcss --save-dev`, add a
     `postcss.config.mjs` with the `@tailwindcss/postcss` plugin, and replace the
     contents of `app/globals.css` with `@import "tailwindcss";` plus the `@theme`
     block once tokens are chosen. Confirm `globals.css` is imported in the root layout.
   - **Next.js (Pages Router) or Vite+React on Tailwind v3 conventions:**
     `npm install -D tailwindcss postcss autoprefixer && npx tailwindcss init -p`,
     set `content` in `tailwind.config.js` to cover all component paths, add the
     `@tailwind base; @tailwind components; @tailwind utilities;` directives to the
     global stylesheet, and confirm that stylesheet is imported at the app entry point.
   - If a package manager other than npm is in use (`pnpm-lock.yaml`, `yarn.lock`,
     `bun.lockb`), use that manager's install command instead of assuming npm.
   - After install, verify by checking that the config/`@theme` block and the
     directive/import are both actually present before moving on — don't assume the
     install succeeded silently.
   - State plainly what was installed and why: "No Tailwind config found — installed
     Tailwind v4 and wired it into `globals.css` before writing components," so the
     user isn't surprised by a new dependency showing up.
   - If the project isn't React/Next.js at all (plain HTML, another framework), ask
     the user directly whether to add Tailwind via CDN/CLI for that stack rather than
     silently picking a framework-specific install path that doesn't apply.
3. **If there's no existing repo yet (greenfield, nothing scaffolded), ask the
   user directly** — don't guess silently:
   - "Which Tailwind version — v4 (CSS-first `@theme`, default in new Next.js/Vite
     projects) or v3 (`tailwind.config.ts`)? If unsure, say what scaffolded the project
     (e.g. `create-next-app`, `create-vite`) and I'll infer it." New Next.js apps (App
     Router, scaffolded recently) default to v4 — treat that as the working assumption
     only if the user can't check, and flag it as an assumption.
   - "Using shadcn/ui, or any component library that expects HSL CSS variables? Or plain
     Tailwind utility classes only?" This changes the color format (HSL triplets like
     `222 47% 11%` for shadcn vs plain hex for plain Tailwind) — don't output HSL unless
     shadcn (or an equivalent) is confirmed in use.

### 1b. In a monorepo, find where tokens actually belong before writing them

Don't default to the first `globals.css` found. Check for a workspace/turbo config
(`turbo.json`, `pnpm-workspace.yaml`, or multiple `apps/*` + `packages/*` dirs):

- If a shared UI/design-system package exists (commonly `packages/ui`), tokens likely
  belong there so every app in the monorepo consumes one source — check whether other
  apps already import from it before putting tokens in a single app's local CSS.
- If each app intentionally has independent styling (no shared package, or the user
  confirms per-app theming), it's fine to scope tokens to that one app — but say this
  assumption out loud rather than assuming silently.
- If unsure, ask: "single shared token package, or scoped to this app only?" — one
  question, don't guess on a monorepo structure.

### 1c. Check for non-CSS consumers of color/spacing tokens

Tailwind tokens only style DOM elements. If the project renders visuals outside the
DOM — `<canvas>` drawing calls, WebGL, SVG generated in JS, chart libraries — those
almost always read color/stroke values from hardcoded JS/TS constants, not CSS, and
Tailwind's token layer cannot reach them.

- Search for hardcoded hex/rgba color literals in rendering/engine code (not just
  component files) before declaring the token migration complete.
- Call this out as a **separate, explicit step** in the output — these constants need
  to be updated by hand to match the new palette, and it's easy to finish the CSS token
  work and assume the job is done while canvas/chart colors are still stale.
- Do not attempt to route canvas/WebGL rendering through CSS variables unless the
  project already does this (e.g. reading `getComputedStyle` at draw time) — that's an
  architecture change, out of scope for a visual-refinement task.

### 1d. When Tailwind is confirmed, enforce Tailwind-only — no raw CSS leakage

This is a recurring failure mode: even after confirming Tailwind, output (or an agent
executing the output) drifts into writing plain CSS — new classes in `globals.css`
(`.toolbar { ... }`), a fresh `.module.css` file, or inline `style={{...}}` objects —
usually because it's the path of least resistance for a specific layout/animation
detail. Treat this as a hard constraint, not a preference, once Tailwind is confirmed:

- The **only** CSS syntax allowed in a Tailwind project is the token/config layer
  itself: the `@theme` block (v4) or `tailwind.config.ts` `theme.extend` (v3), plus
  Tailwind's own `@import`/`@tailwind` directives. Nothing else gets written as CSS.
- Every other style decision — layout, spacing, color, state, animation — must be
  Tailwind utility classes on the element, or `@apply` inside a component-scoped class
  only if the user's existing codebase already uses that pattern (don't introduce
  `@apply` fresh into a project that doesn't use it).
- Arbitrary values belong in Tailwind's bracket syntax (`w-[137px]`, `bg-[var(--x)]`),
  not in a new CSS rule, when a utility class doesn't already cover it.
- For animation beyond what Tailwind's utilities cover, use a JS animation
  library already in the stack (Framer Motion, GSAP) driving `className`/`style` props
  programmatically — not new keyframe CSS blocks — unless the project already defines
  `@keyframes` in Tailwind's `@theme`/config (Tailwind v4 supports custom keyframes
  inside `@theme` — use that, not a separate CSS file).
- Inline `style={{...}}` is acceptable only for truly dynamic runtime values that can't
  be expressed as a class (e.g. a computed transform from drag state) — never for static
  styling that a utility class already covers.
- **Before presenting output, explicitly state**: "No CSS outside the token block — everything
  else is Tailwind utility classes," so the user can verify this claim rather than
  discovering a violation later. If asked to generate actual code (not just tokens),
  scan what was written for stray `.css`/`.module.css` files, new `<style>` blocks, or
  style objects, and flag/fix any found before finishing.

### 2. Map answers to style families

Read `references/styles.md` for the full library (14 style families with rationale,
tokens, and when each one is a trap). Match on:

- **Project type** narrows the field fast — e.g. enterprise dashboards almost never want
  brutalism; dev tools and portfolios often do.
- **Audience** adjusts boldness — technical/developer audiences tolerate (often prefer)
  more rawness and density; consumer/enterprise audiences want more polish and whitespace.
- **Vibe word**, if given, should dominate over defaults.

Pick **2-3 candidates**, not one — always give a real choice, but a narrow, matched one
(not 14 options). Order them by best-fit first.

### 3. Present options

For each candidate, give:
- Name + one-line description of the feel
- Why it fits *this* project specifically (not a generic style description)
- One concrete visual anchor (e.g. "think Linear/Vercel docs" or "think Brutalist
  portfolio sites — thick borders, mono type, no shadows")

Keep this tight — a few lines per option, not paragraphs. If `ask_user_input_v0` is
available, present the 2-3 options as tappable choices rather than prose.

### 4. Output the chosen theme

Once picked (or if the user says "just pick one"), pull the full token set for that
style from `references/styles.md` and output:

1. **Color palette** — hex values for background/surface/border/text/primary/accent, both
   light and dark mode if relevant (HSL triplets instead, only if shadcn/HSL was confirmed
   in step 1a)
2. **Typography** — font pairing (with a real Google Fonts / system stack name) and scale
3. **Spacing & radius** — the family's characteristic spacing density and border-radius values
4. **Shadows/elevation** — or explicit "no shadows" if the style calls for flat/bordered
5. **Motion character** — snappy/none/springy/slow-fade, one line
6. A ready-to-paste token block matching the **confirmed** stack from step 1a — never
   default to v3 syntax without checking:
   - **Tailwind v4** (default for new Next.js/Vite projects) → CSS-first `@theme` block
     in `globals.css`, per the v4 template in `references/styles.md`. No config file.
   - **Tailwind v3** → `tailwind.config.ts` `theme.extend` block, per the v3 template in
     `references/styles.md`.
   - If an existing token set was found in step 1a, output a diff/extension against it,
     not a full replacement — name exactly which values change and which stay.
7. **How to actually use the tokens** — one short line + example, so the semantic names
   get used instead of raw hex creeping back into the JSX: e.g. "reference these as
   `bg-background text-foreground border-border`, not `bg-[#0D1117]` — the whole point of
   the token layer is that colors live in one file." Call this out explicitly since it's
   the step most often skipped.

Don't explain design theory unless asked. Give the tokens and move on. If asked "why this
works," then explain.

### 5. Give the actual code for signature interactions — not just a library pointer

Read `references/component-sources.md` for the technique/recipe. This user wants
hand-buildable code by default, not "go check Aceternity" — so:
- If the interaction/effect is cheap to hand-build (glass navbar, ambient blobs, hover
  fill-sweep, scroll ticker, contextual toolbar, inline editing) — write the actual
  working code (Tailwind classes + Framer Motion/GSAP snippet as needed), not just a
  description.
- If a library genuinely does it better/faster (3D scenes, complex particle systems) —
  name the specific component (e.g. Aceternity `Sparkles`) *and* still show the install/
  usage snippet, don't just link out.
- Always identify **at least one signature interaction proactively**, even if the user
  didn't ask for one — prefer a product-native interaction pattern over a decorative
  effect (see step 6.5 for how to pick the right one for this specific product).

### 6. Offer variations, don't force them

After output, one line max: "want a variant (darker/louder/calmer) or a second option
from the shortlist?" Don't pad further unless they ask.

### 6.5 Productization pass — make it feel like a real product

A visually polished interface is not automatically a good product UI. Before
considering the work complete, run this pass. The objective is not "make the existing
UI prettier" — it's "make the product feel intentionally designed." This applies most
to the refine-existing mode (step 0), but the identity/interaction/component-language
layers matter for new builds too, not just tokens and effects. Evaluate in order:

**1. Product identity.** What's this product's distinctive visual/interaction idea?
What should someone remember after using it? Which element could become a signature
element? Don't manufacture a visual gimmick for uniqueness — identity should emerge
from the product's actual purpose. Canvas product → spatial freedom, direct
manipulation. Dev tool → density, keyboard efficiency, precision. Project management →
hierarchy, scanning speed, state visibility. Creative tool → expressive workspace, low
friction.

**2. Information architecture.** Don't preserve a bad hierarchy just because the
existing UI already has it. Is the most important thing visually dominant? Can the
screen be understood in a few seconds? Are related actions grouped, secondary actions
subordinate, advanced controls progressively disclosed? If the structure is confusing,
redesign the structure before styling it — don't polish an incorrect hierarchy.

**3. Interaction model.** Every important action needs an obvious model: what happens
on click, hover, select, keyboard focus, while loading, on success, on failure, on
empty state, on repeated use? Avoid controls that look good but behave like generic
HTML. Prefer deliberate patterns where they genuinely fit — command palette, contextual
toolbar, inline editing, keyboard shortcuts, drag interactions, optimistic updates,
undo instead of confirmation dialogs — only where they improve the actual product, not
as a checklist to force through.

**4. Component language.** Don't let every component be independently "pretty" — define
one small visual grammar: control height, density, radius scale, border treatment,
shadow/elevation scale, type hierarchy, icon sizing/stroke weight, and the
hover/selected/focus/disabled/destructive treatment. The same interaction must look and
behave the same everywhere. If similar actions look unrelated, fix the system, don't
style them individually.

**5. Density.** Pick one intentional level — compact, balanced, spacious — and don't mix
it accidentally. Dev tools/productivity generally want higher density; marketing/
onboarding generally wants more whitespace. Different surfaces in one product may use
different densities on purpose, but the transition should feel deliberate, not sloppy.

**6. Hierarchy before decoration.** Before adding gradients, glows, glass, shadows,
particles, blobs, or animated backgrounds — verify layout, hierarchy, spacing,
typography, grouping, affordances, and states are solid first. If the UI doesn't look
good without decorative effects, the effects are compensating for weak design underneath
— fix the design, don't add more decoration on top.

**7. Signature interaction.** Every product should have one memorable interaction or
behavior — not a flashy animation, but the interaction that naturally belongs to it.
Excalidraw → direct canvas manipulation. Raycast → command/search interaction. Linear →
fast issue manipulation and navigation. Figma → direct manipulation of the design
surface. Identify the equivalent for this product and implement it exceptionally well
rather than spreading effort across several mediocre ones.

**8. Micro-polish.** Inspect hover transitions, focus rings, pressed/selected/disabled
states, loading indicators, empty/error states, success feedback, tooltips, keyboard
shortcuts, cursor behavior, icon alignment, text truncation, overflow, responsive and
scroll behavior. These should read as one coherent system, not independently-styled bits.

**9. Remove generic AI UI.** Actively look for and remove: unnecessary cards, excessive
rounded containers, repeated border boxes, generic gradient backgrounds, oversized hero
headings, excessive badges, decorative icons with no purpose, default three-column card
grids, excessive shadows/glassmorphism, arbitrary pills, random floating elements,
unnecessary dividers, "AI SaaS" purple/blue gradients, and any component that could
belong to any other SaaS app unchanged. Delete rather than decorate — a simpler
interface with stronger hierarchy beats a more decorated generic one.

**10. Screenshot test.** Mentally evaluate the primary screen as a bare screenshot — no
product name, no docs, no marketing copy explaining what's special. Would this be
recognized as a deliberate product, or does it look like an AI-generated template? If
template: identify the generic element, replace the pattern, introduce product-specific
hierarchy or interaction, and repeat the test. "Looks clean" is not the bar — "looks
like a shipped product" is.

### 7. Self-check against the "finished product" bar before presenting

Never skip this — it's what separates a themed template from a product-quality output.
Run the 8-point checklist above **and** the step 6.5 productization pass against what
was just produced:

- If any answer is "no" or "not really," fix it before presenting, not after — don't
  ship a knockoff and offer to revise later.
- Explicitly note in the output which reference product's principle got applied where
  (e.g. "primary/secondary hierarchy borrowed from Linear's action patterns" — one line,
  not a paragraph) so the user can see the reasoning, not just trust it happened.
- If states (empty/loading/error/hover/disabled) weren't addressed because they weren't
  asked about, say so directly rather than silently omitting them — "didn't touch empty/
  error states, want those covered too?" is better than leaving a gap unmentioned.
- If Tailwind was confirmed as the stack (step 1a/1d), do a literal pass over any code
  written and confirm zero new CSS rules exist outside the token/config block — no
  `.module.css`, no `<style>` tag, no new `globals.css` classes. If any slipped in
  (common when generating a lot of code at once), convert them to utility classes before
  presenting, don't leave it for the user to catch.
