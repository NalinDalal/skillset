---
name: motion
description: The whole motion job in one skill. Name an effect you cannot place. Decide whether to animate it. Build the animation. Review existing motion. Audit a screen for motion. Use when asked to animate something, add micro-interactions, make a UI feel alive, or review or improve the animations. Use it to find what could move or to name an effect you want ("what is it called when..."). Replaces the old animation family (animate, emil-design-eng, review-animations, improve-animations, find-animation-opportunities, animation-vocabulary, apple-design) as a single owned skill. house-style's "Micro-animations" section is the law. This file is the process.
---

# Motion

One job, four phases. Run only the phase the request matches, in this
order: name it, decide, build, review. Auditing a whole codebase is the
review phase applied at scale. If the work already exists, review beats
rebuild.

## The rules that never bend

- Fast, physical, quiet, purposeful.
- State lands first. Nobody waits on a spring.
- Animate `transform` and `opacity` only. Layout animations stutter.
- Nothing loops forever. A pulse that never stops is a design with
  nothing to say.
- `prefers-reduced-motion: reduce` means instant state changes. No
  springs, no entrances, no parallax.
- This skill wins over any synced skill that talks about animation.
  house-style wins over both.

## Name it (when you cannot say what you want)

Reverse lookup: you describe the feeling, this names the effect.

| You say | It is |
|---|---|
| "The bouncy thing when a popover opens" | Pop in: scale from 0.95 to 1 plus fade, slight overshoot |
| "Bounces at the edge of the screen when I scroll past the end" | Rubber-banding |
| "The card glides into the next column" | Layout transition (shared element) |
| "Items arrive one after another" | Stagger |
| "Old image fades out as the new one fades in" | Crossfade |
| "The button squishes when I press it" | Press feedback: scale to 0.97 on press, spring back |
| "A sheet slides up from the bottom with blur behind" | Sheet presentation |
| "The icon reshapes between states" | Icon morph |
| "The header shrinks while I scroll" | Scroll-aware collapse |
| "Rows slide away when I dismiss them" | Collapse dismissal |
| "The thing follows my cursor with a lag" | Magnetic cursor spring |
| "The list counts up when it loads" | Count-up plus bar fill |
| "Ghost bars shimmer while loading" | Skeleton shimmer |
| "The click ripples out" | Ripple |
| "An infinite rotating banner" | Marquee (banned: it loops forever) |
| "Layers move at different speeds while scrolling" | Parallax (banned by default) |

If the table misses it, say it plainly: what comes from where, what it
does, how long. Plain words beat jargon.

## Decide (before writing any code)

Ask in order. The first no stops the work.

1. What changed? If the interaction changed nothing visible, there is
   nothing to animate.
2. How often? Rare moments (monthly, first visit) can carry motion.
   Daily interactions get subtle and fast. Anything used hundreds of
   times a day gets none. Keyboard-initiated actions never animate.
3. One motion per event. Pick the element that carries the change. The
   rest update instantly. Two springs at once read as glitch.
4. Cut anything decorative: scroll-jacking, parallax, staggered
   entrances on every load, confetti, idle pulses. Purple slop that
   moves. Say no and go calmer.

## Build

Decide in this order.

1. **Property.** `transform` and `opacity`. Exceptions need a reason.
2. **Curve.** Springs by default for anything interactive. `ease-out`
   (`cubic-bezier(0.16, 1, 0.3, 1)`) for things arriving, a sharper
   curve for things leaving. `ease-in-out` is the elevator: it does not
   belong. When Tailwind's curves cannot do the feel, raw CSS is fine:
   in motion, the curve is the design.
3. **Duration.** 200ms in, 150ms out, hover under 150ms, press feedback
   under 100ms. Over 300ms needs a reason and a storyboard.
4. **Scale.** Matched to the element. A checkbox does not slide. A card
   does. Small element, small motion.
5. **Interruption.** Animations yield to the next input. Use CSS
   transitions (they retarget) over keyframes (they queue). Click three
   times fast: the third press lands the state instantly.
6. **Exit.** Whatever enters animated leaves animated. Exits are faster
   and quieter than entrances.
7. **Reduced motion.** Every animation also ships without it: the state
   change is instant when the user asks for less.

Crib sheet for the common jobs:

- Press: scale 0.97 on press, spring back on release, under 150ms.
- Toggle: thumb springs along the track, 200ms.
- Expanding card: shared-element transition, image re-frames, 250ms.
- Modal: fade plus scale 0.95 to 1, 200ms in, 150ms out.
- Sheet: slides from its origin with a spring, 250ms, blur behind.
- List reorder: layout transition, 200ms, items stagger 20ms.
- Skeleton: shimmer only while loading, never on loop after load.

## Review (a piece of work)

Default to flagging. Approve only what passes review. Check in this order:

1. Purpose: does it answer "what happened?" If not, flag for removal.
2. Speed: it passes unnoticed. If you noticed it, it
   is slow.
3. Physics: spring feel, no `ease-in-out`, no `linear` outside progress
   bars.
4. Quiet: one motion per event, nothing loops, nothing announces
   itself.
5. Interruption: nothing queues, nothing waits.
6. Exits: present, faster than entrances.
7. Reduced motion: implemented, not just mentioned.
8. Properties: `transform` and `opacity` only. Anything else is a flag
   and needs a reason.

Each flag lists: what, where, why, and the exact value that replaces
it.

## Audit (a codebase or a screen)

Read-only. Survey everything that moves, then hand back:

1. Places that animate but must not, each with the reason.
2. Places that must animate but do not, only where a user would wait
   or wonder.
3. For every yes: the exact motion another agent can implement without
   asking (property, curve, duration, interruption, exit).
4. Priority order: fix what feels broken first, then what feels flat.

Reject loudly: decorative, looped, scroll-jacked. They do not get
motion, they get removal.

## The physical grammar to match

The products that feel expensive (Apple, Linear, Stripe) share a
physical grammar. Match it, do not invent your own:

- Springs for anything interactive. Timed curves only for
  non-feedback transitions.
- Sheets and drawers are draggable. Release mid-drag either settles or
  dismisses, driven by velocity.
- A fling keeps gliding and coasts to rest.
- The current gesture interrupts the last motion seamlessly.
- Depth comes from use, not decoration. Slight scale and blur for layers,
  never shadows and bevels pretending to be 3D.
- Feedback returns along the same path it came: what rose from the
  bottom dismisses toward the bottom.

## Tooling notes

- Tailwind utilities for duration and easing. Arbitrary
  `ease-[cubic-bezier(...)]` for springs.
- CSS transitions beat keyframes when interruption matters, which is
  nearly always.
- A motion library (motion.dev, GSAP) only when gestures get complex.
  Most micro work is plain CSS.
- Test on the weakest device you have. If it stutters, delete the
  animation, not the test.

## Origin

Merged from the seven-skill animation family (emil-design-eng, animate,
review-animations, improve-animations, find-animation-opportunities,
animation-vocabulary, apple-design). It was one job split into seven
voices of the same skill. They are gone by choice and their folders do
not come back on sync.