---
name: ui-engineering
description: The complete UI engineering orchestrator. Load when user says "build the FE", "build the UI", "build the frontend", "make the UI", "design the frontend", or any request to build/design a frontend. This skill owns the quality of the interface. It does not wait for design instructions. It makes the decisions, builds the product, and ships finished UI.
---

# UI Engineering: Master Orchestrator

**One job:** When user wants frontend/UI, this skill runs the complete process. It asks, plans, loads sub-skills, and ships masterpiece quality.

---

## Product-Ready UI Standard

This is the default quality bar for every frontend/UI task. It sits
above every phase. It is the operating principle, not a checklist item.

The objective is not merely to implement the requested UI.

The objective is to deliver a UI that feels like a real, intentional,
production-ready product.

The user should not need to supervise routine design decisions. When
requirements are sufficiently clear, make reasonable product and design
decisions autonomously. Do not repeatedly ask the user to choose colors,
spacing, typography, component shapes, interaction states, responsive
behavior, or animation details unless the choice materially affects the
product or business requirements.

### Own the interface

Treat yourself as both the implementer and the product designer.

Do not interpret "build a dashboard" as "create some cards that
resemble a dashboard." Instead determine:

- What is the user's primary goal?
- What is the primary action?
- What information matters most?
- What should be visible immediately?
- What can be secondary or progressively disclosed?
- What happens when there is no data?
- What happens while loading?
- What happens when something fails?
- What happens after success?
- How does the workflow work on mobile?
- Which interactions should feel especially good?

Make those decisions yourself unless the project requirements require
user input.

### Product-ready means more than visually polished

A UI is not complete simply because it has good colors, typography,
and spacing. A product-ready interface has:

1. Clear product identity
2. Clear information hierarchy
3. A coherent interaction model
4. Consistent component behavior
5. Complete UI states
6. Realistic content
7. Responsive behavior
8. Accessible interaction states
9. Intentional motion
10. A coherent visual language

Do not stop at "the page looks good." The finished result should feel
like someone deliberately designed the product.

### Complete the states

Never design only the happy path. For every meaningful interactive
surface, consider:

- initial
- loading
- populated
- empty
- error
- disabled
- hover
- focus
- active
- selected
- success
- partial or limited
- permission denied
- offline where relevant

Empty states should explain what happened and what the user can do
next. Errors should be actionable. Loading states should preserve
layout where practical.

### Use realistic content

Avoid lorem ipsum and obviously fake placeholder content unless the
task specifically requires placeholder data. Use realistic names,
titles, labels, descriptions, dates, statuses, numbers, file names,
and notifications. Copy is part of the interface. A polished layout
with obviously artificial content still looks unfinished.

### Establish interaction consistency

The same interaction should behave the same way throughout the
product. Dropdowns open consistently. Menus have consistent spacing
and positioning. Destructive actions follow the same confirmation
pattern. Buttons have consistent height and feedback. Inputs have
consistent focus treatment.

### Do not make everything a card

Cards are not a default layout primitive. Use cards when grouping
content benefits from a distinct surface. Otherwise prefer whitespace,
typography, dividers, lists, tables, inline controls, sections, and
grouped controls. If every element is boxed, nothing has hierarchy.

### Responsive design is not an afterthought

Do not simply stack desktop elements vertically. Design mobile
intentionally. Determine what remains visible, what becomes a drawer,
what becomes sticky, what becomes horizontally scrollable, what
disappears, what changes priority, how navigation changes, and how
dense information is transformed.

### Motion should communicate something

Animation is optional. Poor animation makes a product feel cheaper,
not better. Use motion when it explains hierarchy, communicates state,
guides attention, confirms an action, establishes spatial
relationships, makes an interaction feel natural, or reinforces product
identity. Respect prefers-reduced-motion. Do not add animation merely
because an animation library is available.

### Visual restraint

Avoid decoration without purpose. Do not automatically use gradients,
glows, glassmorphism, excessive shadows, giant rounded cards, floating
blobs, particles, excessive borders, or excessive animation. These
techniques can be excellent when they belong to the product. They
should never be the default definition of "modern." A simple interface
with excellent hierarchy is better than a visually busy interface
trying to appear sophisticated.

### Marketing pages need product storytelling

For marketing websites, do not fall into hero, three generic cards,
testimonials, CTA. Instead create a visual narrative. A strong default
structure is: statement, product proof, core workflow, explanation,
deeper product detail, trust and proof, final action. Whenever
possible, show the real product rather than replacing it with generic
illustrations.

### Autonomous productization pass

Before declaring the UI complete, stop and review it as a product
designer. Ask:

- Does this feel like a specific product or a generic AI-generated
  interface?
- Can a new user understand what matters within a few seconds?
- Is the primary action obvious?
- Is information organized without becoming cluttered?
- Do similar controls behave and look the same?
- Are loading, empty, error, disabled, hover, focus, selected, and
  success states handled?
- Does the copy feel real?
- Does mobile feel intentionally designed?
- Can keyboard users understand and operate the interface?
- Does animation improve comprehension or interaction?
- Can anything be removed without reducing usability?
- Could this screenshot be mistaken for a generic template?

If the answer to the last question is yes, continue refining. Do not
merely report the problems. Fix them.

### The final quality rule

Do not finish when "the requested components exist." Finish when "the
requested workflow works and the interface feels like a coherent
product."

The user should not have to provide a second round of instructions
saying "make it look more polished," "add empty states," "make mobile
better," "fix the spacing," "add hover states," or "make it feel less
generic." Anticipate these requirements and handle them during the
initial implementation.

The standard is:

FUNCTIONAL
-> USABLE
-> PRODUCT-READY
-> POLISHED
-> DISTINCTIVE

Default target: PRODUCT-READY + POLISHED. Go beyond that when the
product and available time justify it.

---

## The Quality Bar (Non-Negotiable)

Reference these. If the output doesn't feel like these, it's not done.

| Tier | References | What to Steal |
|------|------------|---------------|
| **SaaS Gold Standard** | Linear, Raycast, Stripe, Vercel, Arc, Attio/Cron | Command palette, page transitions, cursor states, scroll reveals, gradient morphs, geometric motion, micro-copy + micro-animation |
| **Agency/Showcase** | Awwwards SOTD, Locomotive, Basement.studio, Cuberto, Resn, Active Theory | GSAP/ScrollTrigger, smooth scroll (Lenis), parallax, WebGL, Rive |
| **Pattern Libraries** | Mobbin, Godly, SiteInspire | Real-world patterns, not hero-section porn |

**Libraries to use (via `pick-ui-library` + `ask-*` skills):**
- Primitives: `base-ui` (dialogs, popovers, selects, menus)
- Toasts: `Sonner`
- Motion: `motion.dev` (Framer Motion) + `GSAP` + `ScrollTrigger` + `Lenis`
- Command palette: `cmdk`
- Forms: `react-hook-form` + `zod`
- Tables: `TanStack Table`
- Virtual lists: `Virtuoso`
- Drawers: `Vaul`
- Interactive vectors: `Rive`

---

## Phase 0: Clarify (Mandatory: Never Skip)

Before ANY code, ask these. One round. Get answers.

```markdown
## UI Engineering Brief

**1. What is this?** (Landing page, dashboard, app shell, settings, onboarding, canvas, etc.)

**2. Who is it for?** (Devs, consumers, enterprise, internal tool)

**3. Vibe in one word?** (Clinical, playful, dense, editorial, brutal, calm, sharp)

**4. Animation dial?** (0 = none, 1 = micro only, 2 = meaningful transitions, 3 = showcase/motion-heavy)

**5. Must-have interactions?** (Command palette, drag-drop, canvas, real-time sync, keyboard shortcuts, etc.)

**6. Existing stack?** (Framework, styling, motion lib already installed: check package.json)

**7. Dark mode?** (Yes/No/System)

**8. Accessibility bar?** (WCAG AA default, higher if specified)
```

**If user gives vague answers, push back with concrete options.** "Clinical like Linear? Playful like Arc? Dense like Bloomberg terminal?" Show reference screenshots if needed.

---

## Phase 1: Direction & Tokens (Load `ui` + `house-style`)

- `house-style` = law (philosophy, restraint, no purple slop)
- `ui` skill runs: Pick direction → Design system → Build screen → Verify
- Output: palette, type pairing, spacing, radius, shadow, motion character

**Token budget (constraint):**
- 1 accent color, 1 gray family, 1 radius scale, 1 icon family, 1 stroke weight, 1 motion curve family
- To add somewhere, remove elsewhere

---

## Phase 2: Component Architecture (Load `pick-ui-library`)

For EACH interaction needed, invoke `pick-ui-library` to get the right library, then load its `ask-*` skill.

| Interaction | Pattern Skill | Library Skill |
|-------------|---------------|---------------|
| Dialogs, sheets, popovers, menus, selects | `ask-modal` | `ask-base-ui` |
| Toasts, notifications, loading states | `ask-toast` | `ask-sonner` |
| Transitions, springs, scroll animations, gestures | `ask-animation` | `ask-motion` |
| Command palette (⌘K) | `ask-command-menu` | `ask-cmdk` |
| Forms, validation, server actions | `ask-form` | `ask-rhf` |
| Data tables, sorting, filtering, virtualization | `ask-table` | `ask-tanstack-table` |
| Long lists, infinite scroll | `ask-virtual-list` | `ask-virtuoso` |
| Drawers (mobile sheets) | `ask-drawer` | `ask-vaul` |

**Rule:** Never pick a library directly. Always go through `pick-ui-library` → it recommends → load the `ask-*` skill for implementation.

---

## Phase 3: Motion Design (Load `motion`)

`motion` skill runs: Name it → Decide → Build → Review

**House-style motion rules (law):**
- Fast, physical, quiet, purposeful
- State lands first. Nobody waits on a spring.
- Animate `transform` and `opacity` only. Layout animations stutter.
- Nothing loops forever.
- `prefers-reduced-motion: reduce` = instant state changes.
- One motion per event. Pick the element that carries the change.
- 200ms in, 150ms out. Spring curves (`cubic-bezier(0.16, 1, 0.3, 1)`), not keywords.
- Exits exist. Whatever appears animated leaves animated.

**For showcase tier (dial 3):** Add `GSAP` + `ScrollTrigger` + `Lenis` via `ask-motion`.

---

## Phase 4: Build & Verify (Load `impeccable`)

`impeccable` commands for each screen/component:
- `audit`: full UX/UI review against craft bar
- `polish`: micro-interactions, hover states, focus states, error states
- `animate`: add purposeful motion
- `verify`: finish gate (mandatory before ship)

**Finish gate checklist (from `impeccable/references/verify.md`):**
- [ ] One clear action per screen
- [ ] Color in small doses (1 accent)
- [ ] Whitespace separates, not borders/shadows
- [ ] Real type hierarchy (display, body, hint: not 5 bold sizes)
- [ ] Feedback matches action (press = visual state, done = quiet status, destructive = confirmation)
- [ ] Dark mode works (both themes, contrast, no inversion)
- [ ] Reduced motion works
- [ ] No em dashes in visible text
- [ ] Accessibility: keyboard nav, ARIA, focus visible, contrast, screen reader
- [ ] Responsive: 7 viewports, reflow not resize, touch targets 44px
- [ ] Forms: labels above, validate on blur, errors below, loading state
- [ ] Loading and skeletons: skeleton before spinner, progressive loading
- [ ] Component states: all 9 states defined (Default, Hover, Focus, Active, Disabled, Loading, Error, Empty, Selected)
- [ ] Design tokens: semantic naming, light/dark variants, no orphans
- [ ] i18n: text expansion handled, RTL tested, locale formatting
- [ ] Performance: CLS under 0.1, LCP under 2.5s, images optimized
- [ ] Mobile: bottom sheets, swipe actions, safe areas, thumb zone
- [ ] Notifications/badges: one purpose per badge, accessible
- [ ] Empty states: purpose clear, copy structured, CTA present

---

## Phase 5: Divergence (Optional: Load `prototype`)

When direction is ambiguous or user wants options:
- Load `prototype` skill
- Build 3 genuinely different variants on named axes (layout, density, personality, motion, interaction model)
- User picks winner → integrate into production

---

## Sub-Skill Loading Map

```
User: "Build the FE/UI"
    │
    ├─► ui-engineering (THIS SKILL: orchestrates all)
     │
     ├─► house-style (LAW: always loaded)
     │
     ├─► ui (process: direction → system → build → verify)
     │
     ├─► pick-ui-library (for each interaction needed)
     │     ├─► ask-modal → ask-base-ui
     │     ├─► ask-toast → ask-sonner
     │     ├─► ask-animation → ask-motion
     │     ├─► ask-command-menu → ask-cmdk
     │     ├─► ask-form → ask-rhf
     │     ├─► ask-table → ask-tanstack-table
     │     ├─► ask-virtual-list → ask-virtuoso
     │     └─► ask-drawer → ask-vaul
     │
     ├─► motion (name → decide → build → review)
     │
     ├─► impeccable (audit → polish → animate → verify)
     │
     └─► prototype (optional: divergence exploration)
     │
     └─► References: references/quality-bar.md (sites, libraries, galleries)
```

---

## Anti-Slop Rules (Enforced)

- **No Aceternity/Magic UI copy-paste.** Those are reference implementations. Build from primitives.
- **No purple gradients, glowing buttons, oversized rounded cards.** Ever.
- **No "hero section with floating orbs" unless the product IS orbs.**
- **No stagger on every load.** Stagger = rare moments only.
- **No scroll-jack, parallax, infinite marquee unless dial = 3 AND justified.**
- **Every component from primitives (base-ui) + custom composition.**
- **Real copy. Real data shapes. No lorem ipsum. No "Item 1, Item 2".**

---

## When User Says Vague Things: Translate

| User Says | You Do |
|-----------|--------|
| "Make it pop" | Ask: "Linear-sharp? Arc-playful? Stripe-gradient?" → Pick one |
| "Add animations" | Load `motion` → Run Decide phase → Build only what passes |
| "Nice toast" | Load `ask-toast` → `ask-sonner` → Implement with `richColors`, action buttons |
| "Command palette" | Load `ask-command-menu` → `ask-cmdk` → Full keyboard nav, fuzzy search |
| "Smooth scroll" | Load `ask-animation` → `ask-motion` → GSAP + Lenis + ScrollTrigger |
| "Data table" | Load `ask-table` → `ask-tanstack-table` → Virtualized, sortable, filterable |
| "Form" | Load `ask-form` → `ask-rhf` → Zod schema, server actions, loading states |

---

## Output Standard

Every deliverable:
1. **Real component**: not a demo, production-ready
2. **TypeScript**: strict, no `any`, discriminated unions for variants
3. **Tailwind**: component-based, tokens first, raw CSS only when needed
4. **Motion**: spring curves, reduced-motion, exits, state lands first
5. **Accessibility**: keyboard, ARIA, focus, contrast
6. **Dark mode**: `theme="system"` wired
7. **Tests**: if test setup exists, add tests

---

## References

- `references/quality-bar.md`: Full site/library/gallery list with what to steal
- `references/tokens.md`: Token templates for each vibe
- `references/motion-recipes.md`: Common motion patterns with code
- `references/component-checklist.md`: Per-component finish gate
- `references/navigation.md`: Sidebar vs topbar, breadcrumbs, tabs, mobile nav, nested nav
- `references/search.md`: Search placement, autocomplete, debounce, empty state, highlighting, keyboard nav
- `references/pagination.md`: Numbered vs load-more vs infinite scroll, cursor vs offset, page-size, scroll restoration
- `references/progress-indicators.md`: Determinate vs indeterminate, step indicators, multi-stage, bar vs spinner vs skeleton
- `references/avatars.md`: Sizing, fallbacks, groups, presence dots, shape consistency
- `references/overlays.md`: Dropdown, tooltip, popover positioning, collision handling, placement rules
- `references/floating-actions.md`: FAB when-to-use, single vs speed-dial, placement, conflicts
- `references/card-patterns.md`: Card subtypes, elevation, clickable hit area, grid vs list
- `references/tailwind-architecture.md`: v3 vs v4, @theme vs theme.extend, token naming, dark-mode wiring
- `skills/ui/ui-core/references/build.md`: Anti-slop tells, hero rules, layout rules, typography, content, icons/imagery/motion, charts, testimonials, whitespace, type scale, color semantics, component states, icons, forms, loading, skeletons, i18n, composition, keyboard shortcuts, toasts, errors, performance, mobile, badges, empty states
- `skills/ui/ui-core/references/verify.md`: Finish gate, accessibility, dark mode, responsive, forms, loading, states, tokens, i18n, performance, mobile, notifications, empty states
- `skills/ui/ui-core/references/system.md`: Constraint budget, color, type, scale, spacing, radius, shadows, components, dark mode, responsive, accessibility, motion, iconography, DESIGN.md template
- `skills/ui/ui-core/references/accessibility.md`: Color contrast, focus management, ARIA, keyboard, screen reader
- `skills/ui/ui-core/references/responsive.md`: Breakpoints, reflow vs resize, container queries, touch targets, density shifts
- `skills/ui/ui-core/references/dark-mode.md`: CSS variables, Tailwind strategy, system preference, color adjustments, edge cases
- `skills/ui/ui-core/references/copy.md`: Voice, CTAs, error messages, labels, micro-copy tone
- `skills/ui/ui-core/references/direction.md`: Context questions, style families, token output, refine mode, signature interaction, productization pass
- `skills/ui/ui-core/references/styles.md`: Minimalist and brutalist style recipes
- `skills/ui/ui-core/references/redesign.md`: Workflow, feel contract, audit, priority order, product-quality pass
