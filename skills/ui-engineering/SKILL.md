---
name: ui-engineering
description: The complete UI engineering orchestrator. Load when user says "build the FE", "build the UI", "build the frontend", "make the UI", "design the frontend", or any request to build/design a frontend. This skill asks the right questions, loads the right sub-skills, and produces masterpiece-quality UI, not slop. It references Linear, Raycast, Stripe, Vercel, Arc, Attio quality bar.
---

# UI Engineering: Master Orchestrator

**One job:** When user wants frontend/UI, this skill runs the complete process. It asks, plans, loads sub-skills, and ships masterpiece quality.

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
- [ ] Dark mode works
- [ ] Reduced motion works
- [ ] No em dashes in visible text
- [ ] Accessibility: keyboard nav, ARIA, focus visible, contrast

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