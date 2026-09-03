---
name: typography-picker
description: Use whenever a project needs a type direction — font pairing, type scale, or text motion — separate from or alongside overall theme/color work. Trigger on "what font should I use", "pick a typeface", "how should headings look", "font pairing", "make the typography feel more premium/editorial/bold", "add a text animation/effect", "the type looks generic/default", or any new build before a font choice is locked in. Also use when a reference site's typography ("their headlines look amazing") should be analyzed and adapted, not cloned. Asks a few sharp questions, then hands back a concrete pairing with real family names, a fluid type scale, next/font wiring, and — if wanted — one hand-buildable text-motion effect. Companion to ui-theme-picker: that skill owns color/theme/component language, this one owns everything about type.
---

# Typography Picker

Picks a type direction the way `ui-theme-picker` picks a visual direction: a few sharp
questions, then 1-2 concrete, opinionated pairings with real family names and
copy-pasteable code — never "use a nice sans-serif."

**Default taste target: confident and editorial, never default-AI.** The single
fastest tell that a page was AI-generated is Inter (or system-ui) at one weight, one
size jump between h1 and body, and default line-height. Escaping that is 80% of this
skill's job — the rest is knowing which few effects are worth the code.

## The generic-type failure mode (check every output against this)

If any of these are true, the job isn't done:
- Only one typeface family in the whole UI, doing both display and body duty at
  default browser weights.
- Heading and body sizes differ by one Tailwind step (`text-lg` → `text-xl`) instead
  of a deliberate scale — hierarchy that's technically present but not felt.
- Default `line-height`/`letter-spacing` left untouched at every size — tight display
  type and loose body type both need explicit tuning, browsers don't do this for you.
- A "pairing" that's actually the same superfamily at two weights presented as if it
  were two typefaces (fine as a *style*, but say so — don't call Inter Regular +
  Inter Bold a "font pairing").
- Zero attention to numerals in dashboards/pricing (tabular figures matter for
  anything in a column) or to how the chosen face handles the actual longest string
  in the UI (a nav label, a stat with a comma).

## 1. Gather context (skip what's already known)

Use `ask_user_input_v0` if available; otherwise ask inline, max 3 questions.

1. **What's the surface** — marketing/landing page / SaaS product UI / editorial or
   blog / portfolio / dashboard-dense-data. This decides serif-vs-grotesque-vs-geometric
   more than any other answer.
2. **Register** — technical & precise / warm & approachable / loud & maximalist /
   quiet & editorial. If they already picked a UI theme family (from
   `ui-theme-picker`'s `references/styles.md`), infer this instead of asking again.
3. **Motion appetite for text specifically** — none (static, ship fast) / one
   signature moment (a hero headline) / go kinetic (multiple scroll/hover effects).
   Don't reuse the general "animation effort" answer from a theme pass without
   confirming it applies to *text* — some projects want a fully animated UI but
   completely static, serious type (e.g. a legal or fintech product).

Don't ask about specific typeface names — that's this skill's job to propose, not
the user's job to know.

## 2. Typeface landscape — what to actually reach for (2026)

Grouped by register, not by "serif vs sans," because that's how the choice actually
gets made. Skip anything on `ui-theme-picker`'s hard-avoid-list (rounded "friendly"
corporate faces like Poppins/Quicksand/Baloo) as a *default* — they're fine when a
project genuinely calls for approachable-and-soft, just never the reach-for-it-first
choice.

**Neo-grotesque (quiet authority — the safest premium default for dev tools, fintech,
design-forward SaaS):** Inter, Suisse Int'l, Aktiv Grotesk, ABC Diatype, Neue Montreal,
Söhne, Graphik. This is the family doing the most work in premium product UI right
now — precise, unemotional, lets content carry the personality. Geist (Vercel's
variable font) is the easiest free on-ramp into this register for a Next.js stack.

**Geometric sans (friendlier, rounder, more approachable):** Futura (the century-old
reference point), Poppins, General Sans, Nohemi. Geometric reads warmer than
neo-grotesque at the same weight — reach here when the brand wants approachable over
authoritative, but watch the hard-avoid-list above for the "trying too hard to be
friendly" trap.

**Display / personality sans (headlines only, never body text):** Clash Display,
Bricolage Grotesque, Degular, Trim Poster, Aeonik, Cabinet Grotesk. These carry a
strong point of view at large sizes and get awkward or illegible at body sizes —
pair with a neutral grotesque for everything under ~24px, never use alone as a
system.

**Editorial / display serif (the strongest typographic move for 2026 — serifs
displaced geometric sans in a lot of premium display work):** Instrument Serif,
Fraunces (has live `opsz`/`wonk`/`soft` variable axes — see step 4), Editorial New,
GT Sectra, Canela. Use for a hero headline or pull-quote against a plain grotesque
body — the contrast is what reads as "designed," not either face alone.

**Monospace (data, code, labels, tabular UI, or a deliberate technical accent):**
Geist Mono, JetBrains Mono, IBM Plex Mono, Berkeley Mono. A mono accent on labels/
metadata (dates, tags, stat units) is a cheap, reliable way to add texture to an
otherwise plain UI without touching the main type family.

**Free & variable-font sources to actually pull from:** Fontshare (Satoshi, General
Sans, Cabinet Grotesk, Clash Display, Switzer — all free, all shipped as true
variable fonts with a single `wght` axis, ITF's free license covers commercial use)
and Google Fonts' growing variable catalog (Inter, Fraunda, Recursive — which
uniquely exposes `MONO`/`CASL`/`slnt` axes for a mono-to-humanist morph). Default
here unless the project has a type budget for a foundry license.

## 3. Pairing rules

1. **Contrast, not similarity, creates hierarchy.** A serif display + grotesque body,
   or a display face + its own family's plainest weight, both work because the eye
   can tell them apart instantly. Two similar grotesques at similar weights reads as
   a mistake, not a choice.
2. **Two families is the ceiling for most projects** — one display/heading face, one
   body/UI face, optionally one mono for data/labels. A third expressive face
   (a script, a serif accent) is a deliberate one-time flourish (a pull-quote, a
   logotype), never a fourth system-wide voice.
3. **Superfamily pairing is a legitimate, safer choice** — one family's Grotesk/Serif
   siblings (e.g. Söhne + Söhne Mono + Söhne Buch) guarantees metric harmony and is
   the lower-risk move when the user wants "put together" over "distinctive."
4. **Match x-height and weight at the sizes they'll actually sit next to.** A display
   serif with a tiny x-height next to a grotesque with a huge one will look
   mismatched in scale even at "correct" pixel sizes — check them side by side at the
   real heading/body sizes, not in isolation.
5. **Check the real content, not lorem ipsum** — the longest nav label, a number with
   commas, the brand name itself, any all-caps usage. A pairing that looks great on
   placeholder text can break on the client's actual longest string.

## 4. Fluid type scale (don't ship fixed pixel sizes)

Default to a `clamp()`-based fluid scale so headings scale smoothly between mobile
and desktop instead of jumping at breakpoints. Formula per step:

```css
/* clamp(min, preferred, max) — preferred uses viewport width so it scales smoothly */
:root {
  --step--1: clamp(0.83rem, 0.8rem + 0.15vw, 0.9rem);   /* small/meta text */
  --step-0:  clamp(1rem, 0.96rem + 0.2vw, 1.125rem);    /* body */
  --step-1:  clamp(1.2rem, 1.1rem + 0.5vw, 1.5rem);     /* h4/lead */
  --step-2:  clamp(1.5rem, 1.3rem + 1vw, 2rem);         /* h3 */
  --step-3:  clamp(1.9rem, 1.6rem + 1.8vw, 2.75rem);    /* h2 */
  --step-4:  clamp(2.4rem, 1.9rem + 2.8vw, 4rem);       /* h1 */
  --step-5:  clamp(3rem, 2.2rem + 4.5vw, 6rem);         /* hero display */
}
```

Generate real numbers for the project with a modular scale (1.2–1.333 ratio for
UI-dense products, 1.5+ for editorial/marketing where bigger jumps read as
confidence) rather than reusing the block above verbatim — treat it as the shape,
not the values. For exact numbers, the utopia.fyi fluid-scale calculator is the
standard reference; compute by hand if it's not reachable.

**Tune per-size, not just per-family:**
- Display sizes (step-3 and up) want tighter `letter-spacing` (often -0.01em to
  -0.03em) and tighter `line-height` (1.0–1.15) — default spacing looks loose and
  amateurish at large sizes.
- Body sizes want `line-height` 1.5–1.65 for comfortable reading, and default or
  slightly *positive* letter-spacing for small caps/labels/eyebrow text
  (0.05em–0.1em) to keep short uppercase strings legible.
- All-caps labels need explicit tracking — never ship `uppercase` without adding
  `letter-spacing`, default tracking on caps looks cramped.

## 5. Variable fonts and OpenType features

**Ship one variable font file instead of 4-6 static weights** wherever the chosen
family offers one (Fontshare Originals, Geist, Inter, Recursive, Fraunces all do) —
smaller payload, and it unlocks animating weight/width continuously instead of
snapping between static cuts.

```ts
// Next.js — next/font/google, variable weight range
import { Inter } from "next/font/google";
const inter = Inter({ subsets: ["latin"], variable: "--font-sans" });

// next/font/local for a Fontshare/foundry variable font
import localFont from "next/font/local";
const cabinet = localFont({
  src: "../fonts/CabinetGrotesk-Variable.woff2",
  variable: "--font-display",
  weight: "100 900", // declare the full variable range, not one number
});
```

```css
/* Reaching into specific axes directly (beyond what font-weight covers) */
.hero-word {
  font-variation-settings: "wght" 650, "wdth" 110; /* interpolate live on hover/scroll */
}
```

Common axes worth knowing: `wght` (weight, universal), `wdth` (width — Recursive,
General Sans), `opsz` (optical size — Fraunces adapts detail level from display to
text automatically), `slnt`/`ital` (slant), and novelty axes like Fraunces'
`SOFT`/`WONK` or Recursive's `CASL`/`MONO` for a single-file style morph.

**OpenType features are usually off by default — turn on what the content needs:**
```css
.data-table td { font-variant-numeric: tabular-nums; }      /* columns of numbers */
.price       { font-variant-numeric: oldstyle-nums; }        /* editorial body copy */
.headline    { font-feature-settings: "liga" 1, "ss01" 1; }  /* ligatures, stylistic sets */
```
Check the specific family's specimen page for which stylistic sets it ships — these
are family-specific and not guessable from the CSS property alone.

## 6. Text-motion effects — pick 0-2, never more

Motion on text is the highest-leverage, highest-risk move in this skill: one
well-executed headline reveal reads as premium; three competing text effects on one
page reads as a demo reel, not a product. Apply `ui-theme-picker`'s motion rules
(transform/opacity only, respect `prefers-reduced-motion`, GPU-friendly) — they
apply to text motion at least as much as to UI chrome.

**Pick the tool by complexity, don't reach for a JS library by default:**
- **Pure CSS** (`@keyframes`, `animation-timeline: scroll()`/`view()`, `:hover`) —
  correct choice for anything simple and one-shot: fade/slide-up on load, a hover
  underline stretch, a gradient-text shimmer, a variable-font weight morph on hover.
  Zero JS dependency, works with reduced-motion media queries directly.
- **GSAP + SplitText** (or the CSS-only `::first-line`/manual span-wrapping
  equivalent) — needed once you're splitting text into words/characters for a
  staggered reveal, a scroll-scrubbed animation, or per-character effects. This is
  the step up from CSS when the effect needs per-character or per-word timing
  control that keyframes can't express cleanly.
- **Three.js/WebGL/shaders** — only for a genuine hero-moment 3D text effect
  (explode-into-shapes, shader-based displacement). Heavy, has a real performance
  and complexity cost — reserve for a flagship hero, never a body-copy or repeated
  UI element.

**Effect catalog, roughly ordered cheapest → most involved:**

| Effect | Tool | Where it belongs |
|---|---|---|
| Fade/slide-up on scroll into view | CSS `animation-timeline: view()` or IntersectionObserver + CSS class | Section headings, cards |
| Gradient-fill text (`background-clip: text`) | Pure CSS | Hero headline accent word |
| Variable-font weight/width morph on hover | Pure CSS transition on `font-variation-settings` | Nav links, buttons, interactive labels |
| Underline stretch / highlight wipe on hover | Pure CSS | Links, nav |
| Word-by-word or line-by-line scroll reveal | SplitText + ScrollTrigger, or CSS `view-timeline` per span | Long-form hero copy, manifesto/story pages (this is the effect Apple's product pages lean on most) |
| Character stagger entrance (blur/rotate/rise per letter) | SplitText + GSAP timeline with per-char stagger | One hero headline, first-load moment only |
| Cursor-proximity weight morph (`wght` interpolates 200→900 near the pointer) | JS mousemove → CSS custom property → `font-variation-settings` | A single showpiece headline on a portfolio/agency site |
| Typewriter | Pure CSS (`steps()` + blinking caret) or small JS | Terminal/CLI-flavored products, loading states |
| Marquee / ticker | Pure CSS `animation-timeline` loop | Logo walls, status tickers — never body copy |
| Glitch / text-scramble on hover | Small JS (character substitution) + CSS | Attention CTAs, limited-time offers — use sparingly, reads as loud |
| SVG filter distortion, 3D perspective flip, shader displacement | Three.js/WebGL or SVG filters | One flagship hero moment only |

**Before shipping any text effect, confirm:**
- `prefers-reduced-motion: reduce` gets a static, fully-readable fallback — not just
  a shorter animation.
- The effect degrades gracefully if JS fails (CSS-only effects do this for free;
  JS-driven ones need the text visible-by-default, then enhanced).
- It doesn't fight scroll/hover with anything from a `ui-theme-picker` pass on the
  same page — count total signature effects on one screen against that skill's
  2-3-effect ceiling, text effects included.

## 7. Output format

1. **Pairing** — 1-2 named typefaces (never "a clean sans-serif"), one line each on
   why they fit the register from step 1, plus which free source to pull from.
2. **Scale** — the fluid `clamp()` scale sized to the project, with per-size
   `line-height`/`letter-spacing` called out for display vs. body.
3. **Wiring** — the actual `next/font` (or equivalent) import for the chosen stack,
   consistent with whatever `ui-theme-picker` step 1a already established for CSS
   variables/Tailwind version — don't introduce a second token system.
4. **One signature moment, if motion was wanted** — real code for exactly one effect
   from the table above, not a menu of options to pick from later.

Close with one line max: "want a variant (calmer/louder) or the effect built out for
a second element?" — don't pad further unless asked.

## 8. Self-check before presenting

- Would this pass as one of the "generic-type failure mode" bullets from the top of
  this skill? If yes, it's not done.
- Is there a real, named typeface — not a category ("a geometric sans") — for both
  display and body?
- Does the scale use `clamp()`, not fixed breakpoint jumps?
- If motion was requested, is there exactly one clearly-implemented effect with real
  code, not a list of possibilities?
- Does this stay consistent with any `ui-theme-picker` output already in the
  conversation (same CSS variable approach, same Tailwind version, same restraint
  budget for total effects on a page)?
