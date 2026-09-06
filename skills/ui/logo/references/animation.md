# Logo Animation

Animation serves a purpose. A logo that moves without reason is a logo
that does not respect the user. Every animation answers: "what happened?"
If nothing happened, nothing moves.

## When to animate

| Context | Animate? | Type |
|---|---|---|
| Loading / splash screen | Yes | Loading sequence or draw-on |
| Page entry / first impression | Yes | Entry reveal |
| Hover feedback | Yes, subtly | Scale or color shift |
| Click / tap confirmation | Yes | Press feedback |
| Idle / decorative | Never | Ban it |
| Navigation transition | Rarely | Only if it clarifies spatial change |

## Animation types

### 1. Loading sequence

The Google dots-to-G pattern. Elements assemble into the final mark.
Used on splash screens, initial page loads, and branded transitions.

**Technical approach:**

- Individual elements (dots, shapes) start at offset positions.
- They bounce or swing into their final positions in the mark.
- Staggered timing creates a wave effect (0, 0.07s, 0.14s, 0.21s
  delays between elements).
- Duration: 2-4s total. Bounce phase: 0-50%. Settle phase: 50-80%.
  Hold: 80-100%.

**SMIL implementation for dots-to-logo:**

```svg
<svg viewBox="0 0 24 24">
  <circle cx="4" cy="12" r="2" fill="currentColor">
    <animateMotion
      path="M0,0 C4,-8 12,-8 16,0"
      dur="2s"
      begin="0s"
      fill="freeze"
      calcMode="spline"
      keySplines="0.34 1.56 0.64 1"
      keyTimes="0;1" />
  </circle>
  <!-- More circles with staggered begin times -->
</svg>
```

**CSS implementation with stagger:**

```css
.logo-dot {
  animation: assemble 2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
  opacity: 0;
}
.logo-dot:nth-child(1) { animation-delay: 0s; }
.logo-dot:nth-child(2) { animation-delay: 0.07s; }
.logo-dot:nth-child(3) { animation-delay: 0.14s; }
.logo-dot:nth-child(4) { animation-delay: 0.21s; }

@keyframes assemble {
  0% { opacity: 0; transform: translate(var(--offset-x), var(--offset-y)); }
  60% { opacity: 1; transform: translate(0, 0); }
  75% { transform: translate(0, -2px); }
  90% { transform: translate(0, 0); }
  100% { opacity: 1; transform: translate(0, 0); }
}
```

### 2. Draw-on (path stroke animation)

The mark appears as if an invisible pen is tracing it. Elegant,
purposeful, works for any path-based logo.

**Technical approach:**

- Set `pathLength="100"` on every `<path>`. This normalizes the
  coordinate system so `stroke-dasharray` and `stroke-dashoffset` work
  in clean 0-100 units.
- Initial state: `stroke-dasharray: 100; stroke-dashoffset: 100` (fully
  hidden).
- Final state: `stroke-dashoffset: 0` (fully drawn).
- `fill` transitions from `transparent` to `currentColor` after the
  stroke completes.

**Implementation:**

```svg
<svg viewBox="0 0 24 24" role="img">
  <title>Brand</title>
  <g fill="none" stroke="currentColor" stroke-width="1.5"
     stroke-linecap="round" stroke-linejoin="round">
    <path d="M4,12 C4,4 20,4 20,12 C20,20 4,20 4,12"
          pathLength="100"
          class="logo-draw" />
  </g>
</svg>
```

```css
.logo-draw {
  stroke-dasharray: 100;
  stroke-dashoffset: 100;
  animation: draw 1.5s cubic-bezier(0.65, 0, 0.35, 1) forwards;
}

@keyframes draw {
  to { stroke-dashoffset: 0; }
}
```

**Timing:**
- Simple mark (1-3 paths): 1-1.5s
- Complex mark (4+ paths): 1.5-2.5s
- Multi-path stagger: each path starts 0.1-0.2s after the previous
- Easing: `cubic-bezier(0.65, 0, 0.35, 1)` (ease-in-out, feels like
  a pen)

### 3. Entry reveal

The mark fades and scales into view. The most common animation for
logos in headers, cards, and general UI.

**Technical approach:**

- Scale from 0.95 to 1 (or 0.9 to 1 for more emphasis).
- Opacity from 0 to 1.
- Duration: 200ms. Easing: `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out
  spring).

**Implementation:**

```css
.logo-enter {
  animation: logoReveal 200ms cubic-bezier(0.16, 1, 0.3, 1) forwards;
}

@keyframes logoReveal {
  from {
    opacity: 0;
    transform: scale(0.95);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
```

**When to use:** First page load, route transitions, card appearances.
The default animation for logos in UI.

### 4. Hover feedback

Subtle response to pointer interaction. Proves the logo is alive
without being distracting.

**Technical approach:**

- Scale to 1.02-1.05 on hover (never more).
- Optional: subtle color shift or opacity change.
- Duration: 150ms. No bounce. `ease-out` only.
- Must work with `prefers-reduced-motion` (instant state change).

**Implementation:**

```css
.logo-interactive {
  transition: transform 150ms cubic-bezier(0.16, 1, 0.3, 1);
}
.logo-interactive:hover {
  transform: scale(1.03);
}
```

**When to use:** Clickable logos (home link, app launcher), interactive
brand elements. Not for decorative logos.

### 5. Morph (shape-to-shape)

One shape transforms into another. The most complex animation. Used for
loading-to-complete transitions, state changes, and branded
micro-interactions.

**Technical approach:**

- GSAP MorphSVGPlugin for complex morphs (cross-browser path morphing).
- SMIL `<animate>` for simple morphs (two paths with the same number
  of points).
- CSS `clip-path` transitions for shape changes that do not require
  path morphing.

**SMIL implementation for simple morph:**

```svg
<path d="M4,4 L20,4 L20,20 L4,20 Z">
  <animate
    attributeName="d"
    values="M4,4 L20,4 L20,20 L4,20 Z;
            M12,2 L22,12 L12,22 L2,12 Z;
            M12,2 L22,12 L12,22 L2,12 Z"
    keyTimes="0;0.6;1"
    dur="1.5s"
    fill="freeze"
    calcMode="spline"
    keySplines="0.34 1.56 0.64 1; 0 0 1 1" />
</path>
```

**GSAP implementation (requires MorphSVGPlugin):**

```javascript
gsap.to("#mark-circle", {
  duration: 1.5,
  morphSVG: "#mark-star",
  ease: "elastic.out(1, 0.5)",
  delay: 0.3
});
```

**Rules:**
- Both paths must have the same number of anchor points (or GSAP
  auto-adds points, which may distort the shape).
- Morph only between related shapes. Circle to star makes sense.
  Circle to arrow does not.
- Duration: 1-2s. Shorter morphs feel glitchy. Longer morphs feel
  sluggish.

## Reduced motion

Every animation ships with a `prefers-reduced-motion` fallback. The
state change is instant. No animation, no delay, no fade.

```css
@media (prefers-reduced-motion: reduce) {
  .logo-draw,
  .logo-enter,
  .logo-interactive,
  .logo-morph {
    animation: none !important;
    transition: none !important;
    opacity: 1 !important;
    transform: none !important;
    stroke-dashoffset: 0 !important;
  }
}
```

## Review checklist

Every logo animation is reviewed against the motion skill's standards:

1. Purpose: does it answer "what happened?" If not, remove it.
2. Speed: 200ms for UI, 2s for sequences. Over 3s needs a storyboard.
3. Physics: springs for interactive, eased curves for sequential. No
   `linear`, no `ease-in-out`.
4. Quiet: one animation per context. No competing motions.
5. Interruption: animations yield to the next input. No queuing.
6. Exits: present and faster than entrances.
7. Reduced motion: implemented, not just mentioned.
8. Properties: `transform` and `opacity` (or `stroke-dashoffset` for
   draw-on). Nothing else.

If it fails any check, fix it before shipping.
