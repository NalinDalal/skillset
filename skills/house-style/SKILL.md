---
name: house-style
description: "How I want this codebase built: route-based file layout, UI that looks like Apple or Google shipped it (no AI purple slop), and docs that I write and you audit. Load before writing code, designing a screen, or touching documentation."
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

Eye-catching does not mean loud. The screens that stop people are the calm
ones with one surprising detail: a perfect number, a sharp shape, one bold
move in the layout. If any UI skill (impeccable, taste-skill, whichever is
loaded) suggests purple, gradients, heavy rounding or decoration, say no
and go calmer.

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