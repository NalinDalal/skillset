# Component Sources

Don't hand-roll what already exists. This maps style families and common "wow" effects
to where to actually pull the code from — and for the cheap-to-build ones, the actual
code, since this user wants working snippets by default, not just links.

## Hard avoid-list (applies across all style families)

Confirmed instant "cheap/dated" signals for this user — don't reach for these as
defaults even if a style family below mentions them as an example:
- Overused purple/blue SaaS gradient (the generic Linear/Stripe-clone gradient every
  startup site defaults to). If a gradient is needed, pick something less generic —
  warm terracotta/gold, single-hue monochrome, or brand-matched instead.
- Cheesy "friendly" rounded corporate fonts (Poppins, Quicksand, Baloo-style roundness
  used to fake approachability). Prefer Inter/Geist for clean, a real humanist sans
  (General Sans) for warm, or a serif for editorial — not rounded-for-friendliness fonts.

## Core library roles (know these, use together)

- **shadcn/ui** — your foundation. Buttons, dialogs, inputs, forms, dropdowns. Accessible
  (Radix-based). Install via `npx shadcn@latest add <component>`. Start every project here.
- **Aceternity UI** (ui.aceternity.com) — visually dramatic effects: 3D cards, spotlight,
  particle backgrounds, parallax, glowing borders. Free tier is generous; Pro has full
  templates. Built with Tailwind + Framer Motion.
- **Magic UI** (magicui.design) — 150+ free components, more restrained than Aceternity:
  marquees, animated beams, bento grids, text effects. Pairs cleanly with shadcn.
- **21st.dev** — aggregator/registry of 12,000+ components across dozens of libraries
  (Aceternity, Magic UI, Origin UI, HextaUI, Kokonut UI, etc.) with live preview + copy
  TSX or shadcn-CLI install. Use this to browse when you don't know which library has
  what you want.
- **React Bits** (reactbits.dev) — largest open animated collection, has both plain-CSS
  and Tailwind variants, GSAP ScrollTrigger wrappers, hover/magnetic effects.
- **Motion Primitives** — subtler/cleaner animation than Aceternity, good when a client
  wants "polished" not "flashy."
- **Uiverse.io** — community CSS/Tailwind snippets, good for buttons/loaders/toggles.
  Quality varies since it's crowdsourced — preview before using.

## Style family → primary source

| Style family | Primary source |
|---|---|
| Minimalist / Clean SaaS | shadcn/ui + Motion Primitives for subtle motion |
| Brutalist | Mostly hand-built (hard borders/shadows are simple CSS); Uiverse for raw buttons |
| Glassmorphism | Aceternity (`Glare Card`, `3D Card Effect`) + hand-rolled `backdrop-blur` |
| Neumorphism | Uiverse (search "neumorphic") — niche enough that dedicated libraries are thin |
| Dark Techy / Terminal | Aceternity (`Background Beams`, `Sparkles`) + shadcn dark theme |
| Editorial / Content-first | Mostly typography + shadcn; skip animation-heavy libraries |
| Retro / Vaporwave | Magic UI (`Retro Grid`, neon gradients) + Aceternity (`Wavy Background`) |
| Corporate / Enterprise | shadcn/ui only — resist the urge to add flashy libraries here |
| Playful / Maximalist | Magic UI (bento grids, confetti) + React Bits for bouncy micro-interactions |
| Swiss / Typographic | Hand-built grid + shadcn primitives; no animation library needed |
| Warm / Human SaaS | Motion Primitives + shadcn, restrained use of Magic UI bento grids |
| E-commerce | shadcn/ui (cards, carousels) — let product photography carry the visual weight |
| Data-dense Dashboard | shadcn/ui + `tremor.so` or `recharts` for data viz, skip effect libraries entirely |
| Indie Dev / Hacker Aesthetic | React Bits (terminal-style effects) + Aceternity (`Text Generate Effect`) |

## Performance guardrails (non-negotiable — janky motion kills "great UI" faster than anything)

- Animate `transform` and `opacity` only where possible — never animate `width`,
  `height`, `top`/`left`, or `box-shadow` directly (forces layout/paint, causes jank).
  For a "grow" effect use `transform: scale()` not `width`/`height`.
- Always respect `prefers-reduced-motion` — wrap heavy motion in a media query check or
  Framer Motion's `useReducedMotion()`.
- Cap simultaneous heavy effects (particles, 3D, large blurs) to what's actually on
  screen — don't run an idle three.js scene under content the user has scrolled past.
- `backdrop-blur` and large `blur-3xl` divs are cheap individually but add up — don't
  stack more than 2-3 blurred layers in one viewport.
- Max 2-3 signature effects per page (see list below). More reads as noisy, not premium.
- Test on mid-range mobile, not just the dev's laptop — glass/blur/3D effects are the
  first thing to lag on lower-end devices.

## Signature effects — the recurring "wow" moves

These show up constantly on standout marketing sites (agency sites, SaaS landers, studio
portfolios). When a user references a site with "great UI" or asks to recreate an effect,
check here first before building from scratch.

### Particle / 3D hero background
Animated wireframe shapes, particle networks, or 3D objects behind hero text.
- **Source:** Aceternity `3D Globe`, `Vortex`, `Sparkles`, `Wavy Background` — or raw
  `three.js` if you need something fully custom.
- **Effort:** low if using Aceternity components, medium if hand-building with three.js.

### Floating glass navbar
Pill-shaped nav with `backdrop-blur`, translucent background, subtle inset shadow,
often animates in on load (slides/fades from off-screen).
- **Source:** hand-buildable in plain Tailwind — no library needed.
- **Code:**
```tsx
<nav className="fixed top-5 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2
  px-3 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-xl
  backdrop-saturate-150 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_12px_40px_rgba(0,0,0,0.15)]">
  {/* nav links */}
</nav>
```
- **Load-in animation (Framer Motion):**
```tsx
<motion.nav
  initial={{ x: "-50%", y: -20, opacity: 0 }}
  animate={{ x: "-50%", y: 0, opacity: 1 }}
  transition={{ duration: 0.5, ease: "easeOut" }}
  className="fixed top-5 left-1/2 ..." />
```

### Scroll-driven text ticker / word roller
A pinned section where a list of words scrolls vertically inside a fixed frame as the
user scrolls the page (e.g. "We can DESIGN. PROTOTYPE. BUILD...").
- **Source:** GSAP `ScrollTrigger`, not in any component library — ~30-40 lines, worth
  hand-building.
- **Code:**
```tsx
"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
gsap.registerPlugin(ScrollTrigger);

const WORDS = ["DESIGN.", "PROTOTYPE.", "BUILD.", "SHIP."];

export function WordRoller() {
  const listRef = useRef<HTMLUListElement>(null);
  useEffect(() => {
    const items = listRef.current?.children.length ?? 0;
    const ctx = gsap.context(() => {
      gsap.to(listRef.current, {
        yPercent: -100 * ((items - 1) / items),
        ease: "none",
        scrollTrigger: {
          trigger: listRef.current?.parentElement,
          start: "top top",
          end: "+=2000",
          scrub: 0.5,
          pin: true,
        },
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="h-screen overflow-hidden">
      <ul ref={listRef} className="text-8xl font-bold">
        {WORDS.map((w) => (
          <li key={w} className="h-screen flex items-center">{w}</li>
        ))}
      </ul>
    </div>
  );
}
```

### Glowing / luminous cards
Icon or content cards with a soft internal light/glow effect that reacts on hover.
- **Source:** Aceternity `Glowing Effect`, `Glare Card`, `Card Spotlight` cover most of
  this out of the box — install via their CLI/copy-paste, faster than hand-rolling the
  SVG-filter version.
- **Cheap CSS-only version (no library, mouse-follow glow):**
```tsx
function GlowCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.MouseEvent) => {
    const r = ref.current!.getBoundingClientRect();
    ref.current!.style.setProperty("--x", `${e.clientX - r.left}px`);
    ref.current!.style.setProperty("--y", `${e.clientY - r.top}px`);
  };
  return (
    <div ref={ref} onMouseMove={onMove}
      className="relative overflow-hidden rounded-2xl border border-white/10 p-6
        before:content-[''] before:absolute before:inset-0 before:opacity-0
        hover:before:opacity-100 before:transition-opacity before:duration-300
        before:[background:radial-gradient(200px_circle_at_var(--x)_var(--y),rgba(255,255,255,0.15),transparent_70%)]">
      {children}
    </div>
  );
}
```

### Ambient blurred blob backgrounds
Large soft-edged colored circles (`blur-3xl`) positioned absolute behind content
sections — does most of the work of making dark sections feel premium instead of flat.
- **Source:** no library needed. Cheapest high-impact trick in this list — use liberally.
- **Code:**
```tsx
<div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-primary/30
  blur-3xl pointer-events-none" />
<div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-violet-500/20
  blur-3xl pointer-events-none" />
```

### Infinite marquee / scrolling gallery
Row of logos or images scrolling continuously sideways.
- **Source:** Magic UI `Marquee` component (handles pause-on-hover, direction, speed) —
  don't hand-roll the CSS keyframes unless you need something non-standard.
- **Minimal hand-built version if avoiding the dependency:**
```css
@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
.marquee-track { display: flex; width: max-content; animation: marquee 30s linear infinite; }
.marquee-track:hover { animation-play-state: paused; }
```
Duplicate the item list once inside the track (so it's 200% width) for a seamless loop.

### Button hover fill-sweep
Button background color sweeps in from one side on hover instead of a flat color change.
- **Source:** hand-buildable — no library needed.
- **Code:**
```tsx
<button className="group relative overflow-hidden px-8 py-4 rounded-xl
  bg-foreground text-background">
  <span className="absolute inset-0 bg-primary -translate-x-full
    group-hover:translate-x-0 transition-transform duration-300" />
  <span className="relative z-10 group-hover:text-primary-foreground
    transition-colors">Send Message</span>
</button>
```

## When a client/user references a site they like

1. Identify which signature effects are doing the work (usually 2-4 of the above).
2. Map each to its source from this file.
3. Note what's cheap (ambient blobs, glass navbar — minutes) vs what takes real effort
   (custom 3D/particle scenes, hand-built SVG filter effects — hours).
4. Be honest if the reference site is using flash to cover for a thin portfolio/content —
   worth calling out so effort goes where it matters for the actual project.
