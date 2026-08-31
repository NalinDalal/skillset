# Redesign or audit

## The workflow

1. Scan: read the codebase, find the framework, the styling method, the
   current patterns.
2. Diagnose: run the audit below, list every generic pattern and weak
   point.
3. Fix: targeted upgrades on the existing stack. Never rewrite from
   scratch.

Preserve: information architecture, slugs, nav labels, copy voice,
accessibility, analytics.

## The feel contract (write first, 3-5 lines)

1. Temperament in one word: calm, playful, precise, rugged.
2. What the product believes: one sentence.
3. Anti-goals: what it refuses to be.
4. Two reference products and why they feel good.
5. Where the feel lives: 2-3 contact points, like stroke language,
   spring feel, or selection behavior.

Test: would a user who loves the reference recognize this as the same
product?

## The audit

- Typography: font swap, display presence, 65ch body, weights 500/600,
  tabular figures, text-wrap balance.
- Color: no pure black, accent under 80% saturation, one gray family,
  no AI gradients, tinted shadows.
- Layout: break symmetry, kill the three equal cards, 100dvh, grid over
  flex, 1400px max.
- Interactivity: hover, pressed, focus rings, skeletons, composed empty
  states, inline errors, no dead links.
- Content: real names, organic numbers, banned cliches, sentence case,
  no exclamation marks.
- Components: cards only with elevation, tertiary buttons, no pill
  badges, side-by-side FAQ entries.
- Icons: non-cliche metaphors, one stroke weight, branded favicon.
- Code: semantic HTML, z-index scale, no dead code, meta tags.

## Priority order

P0 broken or confusing. P1 visibly unfinished. P2 major quality.
P3 polish. Fix all P0 before any P2.

Upgrade levers in order: typography, spacing, color, motion, hero,
then the full block.

## Product-quality pass (for app-like surfaces)

- Full-state audit: instant operations have no loader, short operations
  a subtle indicator, long operations progress plus context. Empty
  states say what to do. Errors say what happened and how to recover.
- Feedback mechanism: direct manipulation gets a visual state on the
  thing itself; completed work gets a small contextual status;
  destructive gets confirm only when dangerous; undoable gets undo
  over confirm.
- Keyboard-first: tool activation, undo redo, Escape exits, no focus
  traps, no mouse-only controls.
- First-run: lightweight guidance that self-disappears.
- Finish details: no layout jump, consistent panel directions, selected
  controls stay selected, no clipped shadows, no hover-caused movement,
  no dead controls.
- The 10-minute test: walk the core journey and ask at each step:
  understood, feedback, unfinished, slow. Then describe the feeling of
  each interaction.

## Do not overdesign

Must not become a copy of Linear, Notion, Figma, or a glassmorphism
dashboard. When in doubt, remove.