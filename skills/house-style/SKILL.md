---
name: house-style
description: "How I want this codebase built: route-based file layout, UI that looks like Apple or Google shipped it (no AI purple slop), micro-animations that move only what changed, and docs that I write and you audit. Load before writing code, designing a screen, or touching documentation."
---

# House style

This skill is how I like things done. It is my voice, not an upstream's. If a
synced skill says one thing and this says another, this wins.

Three rules cover most of it:

1. Files follow the route, not the framework.
2. The screen looks bought, not generated.
3. The docs are mine to write, yours to audit.

## 1. Files follow the route

One route, one file. Every function that serves `/me` lives in `me.ts`,
whether it GETs, PUTs, DELETEs or POSTs. Edge cases included: input shapes,
error handling, the auth checks that route needs, and whatever stats the
route must show.

Example. A profile endpoint that shows my stats, the way LeetCode shows
stats for a user, lives in `me.ts`:

- `me.ts` holds every HTTP handler for `/me`: getting my info, updating it,
  deleting sessions, posting achievements.
- If `/me` shows stats, the code that loads, formats and returns those stats
  lives here too. It can call shared helpers, but the route owns the flow.
- Shared code is only code two or more routes genuinely use. When in doubt,
  keep it in the route file. Splitting early turns files into treasure hunts.

The exact split changes with the use case. A dashboard endpoint might own
several aggregate functions. A tiny health check owns one. The rule stays:
the route names the file, the file owns the route.

## 2. The screen looks bought, not generated

I do not want the default AI look. The purple gradient slop with the glowing
buttons, oversized rounded cards, the same five icons everywhere. It makes
every product look the same.

When you build UI, ask one question first: if Apple or Google shipped this
screen, would it look out of place? Their shared vocabulary is the target:

- One clear action per screen. A CTA that quietly says what happens next.
- Simple buttons. Flat or barely rounded, solid contrast, no glow, no
  gradient.
- Color in small doses. One accent, used only for things that matter.
  Restraint is the accent.
- Whitespace does the separating, not borders and shadows.
- Real type hierarchy: a headline, a sentence, a hint. Not five sizes of
  bold.
- Small details done right beat big decorations. Alignment, spacing, hover
  states, error states.
- Clean typography and a clean design system. Consistent type scale, one
  font family, consistent spacing tokens.
- **Tailwind, strictly.** Component-based Tailwind CSS. Every visual
  decision is a Tailwind utility or a small composable component. Raw CSS
  only when Tailwind cannot do what the design needs, and only with a
  reason.
- **Feedback matches the action.** Manipulation (press, drag) gets a
  visual state: pressed, hovered, active. Completed work (saved, sent)
  gets a quiet status: a checkmark, a toast. Destructive work gets
  confirmation. Nothing else moves.

Eye-catching does not mean loud. The screens that stop people are the calm
ones with one surprising detail: a perfect number, a sharp shape, one bold
move in the layout. If any UI skill (impeccable, ui, whichever is
loaded) suggests purple, gradients, heavy rounding or decoration, say no
and go calmer.

### Micro-animations: motion is a detail, not a decoration

Motion follows the same rule as color: restraint. When nothing moves
except what needs to, the one movement that matters is obvious.

- **Move what changed, nothing else.** The clicked button, the reordered
  list item, the flipped state. If the motion does not answer "what
  happened?", cut it. No bounces, no confetti, no idle pulses. Nothing
  animates on a loop: a pulse that never stops is a design that does not
  know what to say.
- **One motion per event.** Two springs competing at once read as glitch.
  Everything else changes instantly.
- **Spring curves, not keywords.** `ease-in-out` is the elevator; it does
  not belong in a good UI. Arriving things default to an `ease-out`
  spring (`cubic-bezier(0.16, 1, 0.3, 1)`), leaving things go sharper.
  Raw CSS is allowed here when Tailwind's curves cannot do the feel: in
  motion, the curve is the design.
- **200ms in, 150ms out.** Micro means micro. A motion that needs more
  than 300ms is a scene change with a storyboard, and it needs a reason.
- **Matched to the element.** Small element, small motion. A checkbox
  does not slide; a card does.
- **State lands first.** Inputs respond the frame they are pressed.
  Motion is polish on top, and interruptible: the next click cancels the
  last spring. Nobody waits on a spring.
- **Exits exist.** Whatever appears animated leaves animated. A one-frame
  vanish is a flicker that cheapens the whole screen.
- **Respect reduced motion.** `prefers-reduced-motion: reduce` means
  instant state changes. No springs, no entrance sequences, no parallax.
- **No effects that announce themselves.** No scroll-jacked pages, no
  parallax, no staggered entrances on every load. They are purple slop
  that moves.

**Where the good stuff lives.** When a motion needs to feel right, study
these first, then tune:

- [Apple HIG Motion](https://developer.apple.com/design/human-interface-guidelines/motion):
  the spec for how motion should feel: springy, brief, cancelable.
- [Material 3 easing and duration](https://m3.material.io/styles/motion/easing-and-duration):
  the spec for curves and timings, including the rule that exits beat
  entrances.
- [linear.app](https://linear.app): calm, precise, no wasted movement.
  The default answer to "what should motion feel like".
- [stripe.com](https://stripe.com): transitions where the content leads
  and the effects follow.
- [raycast.com](https://raycast.com): near-zero motion for a tool used
  hundreds of times a day.
- [apple.com](https://www.apple.com) product pages: scroll reveals done
  with restraint.
- [60fps.design](https://60fps.design): a gallery of shipped app motion,
  real products instead of prototypes.
- [emilkowal.ski](https://emilkowal.ski): the when and why of animating,
  from the design engineer behind Linear-grade UI.
- [Awwwards microinteractions](https://www.awwwards.com/websites/microinteractions/):
  award sites that mostly show you where the line to "too much" is.

The pattern every one of them shares: fast, physical, quiet,
purposeful.

## 3. Docs are mine, yours is the audit

AI-written docs are slop. They are vague, they hedge, they list features
with no outcome stated. I write the docs. You make sure I actually do it,
then you check my work.

### Two layers, one page

Every user-facing feature page ships two short versions, both on the same
page so a reader can switch:

- The plain version first. What this does, in outcomes. No jargon, no
  internals. "See your solving streak and the topics you are weakest in
  this month."
- The technical version underneath, behind tabs or a details block, for the
  person who will maintain it. Real names, real shapes, caching rules,
  error paths.

For the switch, markdown offers a few options: `<details>` blocks,
`::: code-tabs` / `::: tabs` directives (GitBook, VitePress), or MDX `Tabs`.
Pick what the platform renders. When in doubt, `<details>` works on GitHub
and most other places.

### The rule that never bends

I write these docs. Not you. When a feature is done:

1. You tell me the docs are needed and ask the questions that make writing
   them easy: what outcome does this give someone? what annoyed you about
   how it worked before? what should the maintainer know first?
2. You wait. No drafting "just to help". If I try to shrug the writing off
   to you, push back gently and wait.
3. Then you audit what I wrote. Check: outcome first, no vague words, real
   names and commands, nothing claimed that is not true at this commit.
   Where it falls short, tell me exactly what to fix and why.

Docs are how I keep ownership of the product. If I did not write it, I do
not understand it, and that is the one outcome worse than messy docs.

## 4. How to talk to me

I know English well. Still, write so a 5th grader gets it. Plain words,
short sentences, no padding. Long and fancy does not mean clear.

- **Short and sweet.** If a sentence works without words, cut the words.
  Clarity is brevity, not a longer explanation.
- **No em dashes. Anywhere. Never.** Not in files, diffs, docs, comments,
  or chat. Use commas or periods. One em dash means the deliverable fails
  review.
- **STE-clean on owned skills.** Owned skill files pass `npm run lint:ste`.
  The bar is 2.5 violations per 100 words. Bullet lists and quoted speech
  do not count.
- **Small paragraphs.** Two or three lines beats a wall of text.
- **List is the default.** Features, files, packages, steps: one per line,
  `name: what it does`.

  ```
  me.ts: all API work for /me, stats included.
  auth.ts: login, tokens, sessions.
  ```

- **Abstract, not imported.** No import trees, no function signatures. Say
  what a thing does and how it fits. If the function name adds nothing,
  leave it out.
- **Outcomes over details.** Say what someone gets or what breaks. Not how
  many lines moved.

## Working with the agent

Ask like a friend, not a lawyer. If something I said does not land, say
"wait, I think I missed something" and re-say it in plainer words. Ask the
questions that matter before building, one round at a time, and stop only
when we both actually agree. Do not build on guesses.

Build in the smallest step that is real: get the data shape right first,
remove what is dead, then add. If a sentence of a plan would survive
unchanged in another project, it does not describe this one. Cut it.