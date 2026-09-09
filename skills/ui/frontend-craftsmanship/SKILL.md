---
name: frontend-craftsmanship
description: Use when building frontend, designing a screen, improving UI quality, establishing a design system, reverse-engineering premium interfaces, or when the user wants Shipd/Linear/Vercel-level output instead of generic AI slop. Load when the task involves product thinking, visual systems, interaction design, motion, typography, or frontend architecture. This is a core skill: it defines how the user wants frontend built, independent of any single project.
---

# Frontend Craftsmanship

Purpose: enforce a specific standard for frontend quality across any project. Product-first thinking, design-system discipline, interaction states, motion rules, typography standards, reverse-engineering practice, and AI workflow for shipping polished interfaces.

> This is one of the user's core skills. It defines how the user wants frontend built, independent of any single project. See also `house-style` for philosophy/restraint rules, `ui/ui-core` for the build process, `ui/motion` for motion implementation, `ui/typography-picker` for type direction, and `ui/impeccable` for audit/verify commands.

## Core principles

### Product-first, not component-first

Developer-first:

```
Idea
 ↓
React
 ↓
Components
 ↓
API
 ↓
Done
```

Product-first:

```
Problem
 ↓
Product model
 ↓
User journey
 ↓
Information architecture
 ↓
Visual language
 ↓
Design system
 ↓
Interaction model
 ↓
Motion
 ↓
Frontend implementation
 ↓
States / edge cases
 ↓
Polish
 ↓
Done
```

### The homepage is a product demo

Shipd's homepage doesn't list features. It makes you experience the product: leaderboard, code editor, terminal, reviews, bounty, challenges, rankings, quests, community. The landing page itself is a miniature product demo. Linear makes a similar point: dense interfaces remain calm when visual weight is carefully controlled. Vercel's Geist system is a technical reference for systematizing typography, colors, grid, and components.

### One clear action per screen

Every screen should have one obvious primary action. Color in small doses. Whitespace does the separating, not borders and shadows. Real type hierarchy: a headline, a sentence, a hint. Not five sizes of bold.

### Feedback matches the action

Manipulation (press, drag) gets a visual state: pressed, hovered, active. Completed work (saved, sent) gets a quiet status: a checkmark, a toast. Destructive work gets confirmation. Nothing else moves.

## Design standards

### Typography

- One typeface family for UI, optionally one display face for headlines.
- Tight type scale, real hierarchy.
- `line-height` tuned per size: display tighter, body looser.
- `letter-spacing` explicit for all-caps labels and display type.
- Tabular figures for data columns.
- Variable fonts preferred over static weights.

### Spacing and layout

- Think in tokens, not individual CSS values.
- One spacing scale, used everywhere.
- Grid over flex math.
- Cards only when elevation earns them. Never cards inside cards.
- Asymmetric layouts over perfect grids when the content allows.

### Color

- One accent color, used only for things that matter. Restraint is the accent.
- One gray family, not five.
- No purple gradients, glowing buttons, or gradient text.
- Dark mode is designed, not inverted.

### Motion

- Fast, physical, quiet, purposeful.
- State lands first. Nobody waits on a spring.
- Animate `transform` and `opacity` only.
- Nothing loops forever.
- `prefers-reduced-motion: reduce` = instant state changes.
- One motion per event. Pick the element that carries the change.
- 200ms in, 150ms out. Spring curves (`cubic-bezier(0.16, 1, 0.3, 1)`), not keywords.
- Exits exist. Whatever appears animated leaves animated.

### Components

Every component must define its states:

```
default
hover
active
focus
disabled
loading
error
empty
success
mobile
dark
```

A `Card` is not a product pattern. A `ChallengeCard`, `SubmissionPanel`, `LeaderboardRow`, `CodeReviewPanel`, `QuestHeader` is closer to a product language.

### Frontend architecture

Evolve from:

```
components/
    Button
    Card
    Navbar
```

towards:

```
design-system/
    primitives/
    typography/
    layout/
    controls/
    feedback/
    navigation/

patterns/
    command-menu/
    data-table/
    activity-feed/
    editor/
    dashboard/
    onboarding/

features/
    challenges/
    leaderboard/
    submissions/
```

## Interaction design

Every interaction has a designed state:

```
idle
 ↓
hover
 ↓
press
 ↓
loading
 ↓
partial progress
 ↓
success
 ↓
next available action
 ↓
error / retry
```

Be obsessive about: hover, focus, active, disabled, loading, optimistic updates, empty states, skeletons, errors, success, transitions, keyboard interaction.

## Reverse engineering method

Don't just build products. **Copy excellent products.** Not by stealing their code. By rebuilding the experience.

Pick: Shipd, Linear, Vercel, Raycast, Stripe, Arc, Resend, Cursor, Supabase, Notion, Figma.

For each screen:

```
Why is this element here?
Why this width?
Why this spacing?
Why this font?
Why this border?
Why does this section start here?
Why does this interaction happen this way?
What happens when there is no data?
What happens when the user hovers?
What happens when the user clicks?
What happens on mobile?
```

Then rebuild it.

## AI workflow for serious projects

Don't let AI invent the product. Give it a **design specification first**:

```
PRODUCT:
Developer competition platform.

USER:
Software engineers solving difficult programming problems.

PRIMARY ACTION:
Start a challenge.

DESIGN DIRECTION:
Dense developer-tool interface.
Editorial typography.
Dark neutral canvas.
Very restrained color.
Strong monospace usage.
Thin borders.
Minimal rounded corners.
High information density.

UX PRINCIPLES:
Every screen should have one obvious primary action.
Avoid decorative cards.
Prefer information-rich panels.
Use progressive disclosure.
Keyboard-first where appropriate.
Every async action needs explicit feedback.

MOTION:
150–250ms transitions.
No gratuitous animation.
Use motion to communicate hierarchy and state changes.

STATES:
Loading
Empty
Error
Success
Disabled
Hover
Focus
Mobile

TECH:
Next.js
TypeScript
Tailwind
...
```

Then: implement, then analyze, then implement P0/P1, then visual QA.

```
Analyze this interface as a senior product designer.

Identify:
1. visual hierarchy problems
2. spacing inconsistencies
3. typography problems
4. interaction problems
5. information architecture problems
6. missing states
7. accessibility problems
8. responsive problems

Do not rewrite the code yet.

Give me a prioritized list of changes.
```

```
Now implement only P0 and P1 issues.

Do not change:
- product behavior
- information architecture
- API contracts
- existing design language

Preserve the current component structure where reasonable.
```

```
Now perform a visual QA pass.

Look for:
- inconsistent spacing
- unnecessary borders
- excessive cards
- typography hierarchy
- alignment
- visual noise
- interaction feedback
- mobile behavior

Make only changes that improve the product.
```

The AI workflow order:

```
                 IDEA
                  │
                  ▼
            Product brief
                  │
                  ▼
             User journey
                  │
                  ▼
          Information architecture
                  │
                  ▼
           Design specification
                  │
                  ▼
             AI planning
                  │
                  ▼
            Architecture
                  │
                  ▼
          Design-system tokens
                  │
                  ▼
             Components
                  │
                  ▼
             Screens
                  │
                  ▼
          Interactions/states
                  │
                  ▼
             Polish
                  │
                  ▼
             Evaluation
                  │
                  ▼
               SHIP
```

Coding is not step 1.

## Taste database

Create a folder:

```
/design-research
```

Inside:

```
shipd.md
linear.md
vercel.md
stripe.md
cursor.md
raycast.md
supabase.md
```

Each file contains:

```
Typography:
...

Spacing:
...

Colors:
...

Borders:
...

Radius:
...

Motion:
...

Navigation:
...

Information density:
...

Interesting interaction:
...

What they avoid:
...

What I want to steal conceptually:
...
```

Study what products **refuse to do**. That's one of the strongest lessons from good product design.

## Anti-patterns

| Anti-pattern | Correct approach |
|---|---|
| Generic AI SaaS dashboard: Navbar, Sidebar, Card, Card, Card, Table | Product-specific interface with one clear action per screen |
| Purple gradients, glowing buttons, oversized rounded cards | Flat buttons, one accent, restraint |
| Component-first thinking before product model | Product model → UX → IA → visual language → design system → implementation |
| One-size-fits-all motion | Fast, physical, quiet, purposeful. 200ms in, 150ms out |
| Missing states: no loading, empty, error, disabled | Every component defines all states |
| Cards inside cards | Cards only when elevation earns them |
| Decorative animation | Animation communicates what changed, nothing else |
| AI inventing the product direction | Design specification first, then AI executes |
| Five bold sizes masquerading as hierarchy | Real type hierarchy: display, headline, body, hint |
| Individual CSS values instead of tokens | One spacing scale, one color family, one radius scale |

## Checklist

Before shipping any frontend work:

- [ ] One clear primary action per screen
- [ ] Typography hierarchy is real, not just bold sizes
- [ ] Spacing uses tokens, not ad-hoc values
- [ ] Color is restrained: one accent, one gray family
- [ ] No purple gradients, glowing buttons, or gradient text
- [ ] Every component defines: default, hover, active, focus, disabled, loading, error, empty, success, mobile, dark
- [ ] Motion is transform/opacity only, 200ms in / 150ms out, spring curves
- [ ] `prefers-reduced-motion: reduce` respected
- [ ] Dark mode is designed, not inverted
- [ ] No cards inside cards
- [ ] Feedback matches action: manipulation gets visual state, completion gets quiet status
- [ ] Empty, loading, and error states designed for every screen
- [ ] Keyboard interaction works throughout
- [ ] AI was given a design spec, not a vague prompt

## References

For implementation, refer to:

- `ui/house-style`: The law (philosophy, restraint, no purple slop)
- `ui/ui-core`: The process (pick direction, design system, build screen, verify)
- `ui/motion`: The motion job (name, decide, build, review, audit)
- `ui/typography-picker`: Font pairing, type scale, text motion
- `ui/impeccable`: Commands/detectors for audit, polish, animate, verify
- `ui/pick-ui-library`: Curated library picks for UI primitives
