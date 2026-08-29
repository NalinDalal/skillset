---
name: ask-animation
description: Pattern guide for transitions, springs, scroll animations, gestures, page transitions. Load via ui-engineering. Invokes pick-ui-library → recommends motion.dev (Framer Motion) → loads ask-motion for implementation. For showcase tier: GSAP + ScrollTrigger + Lenis.
---
# Ask Animation , Transitions, Springs, Scroll, Gestures

**When to use:** Any motion , page transitions, layout animations, enter/exit, scroll-linked, drag, hover/tap feedback, morphing.

---

## The Pattern (What Good Looks Like)

| Animation Type | Use When | Library | Key Principles |
|----------------|----------|---------|----------------|
| **Page transitions** | Route changes | motion.dev / GSAP | Shared layout, exit before enter, 200ms |
| **Layout animations** | Reorder, expand, collapse | motion.dev `layout` | `layoutId` for shared element, spring |
| **Enter/Exit** | Modals, sheets, toasts, dropdowns | motion.dev `AnimatePresence` | Scale 0.97→1 + fade, exit before enter |
| **Scroll-linked** | Parallax, reveal, progress, sticky | GSAP + ScrollTrigger | Scrub, pin, snap, velocity-based |
| **Drag/Gesture** | Draggable cards, sliders, drawers | motion.dev `drag` / Lenis | Constraints, momentum, snap points |
| **Hover/Tap** | Buttons, cards, interactive elements | motion.dev `whileHover`/`whileTap` | Scale 0.98, instant press, spring back |
| **Morphing** | Icon state changes, shape shifts | motion.dev `keyframes` / GSAP | SVG path morph, crossfade |
| **Stagger** | Lists, grids, onboarding | motion.dev `staggerChildren` | Rare moments only, 50-100ms delay |

---

## Quality Checklist (House-Style Law , Non-Negotiable)

- [ ] **Fast, physical, quiet, purposeful** , Every motion answers "what changed?"
- [ ] **State lands first** , Input responds same frame, motion is polish on top
- [ ] **Transform + opacity only** , No layout property animations (width, height, top, left)
- [ ] **Spring curves** , `cubic-bezier(0.16, 1, 0.3, 1)` (ease-out spring), not `ease-in-out`
- [ ] **200ms in, 150ms out** , Micro means micro. >300ms = scene change, needs reason
- [ ] **One motion per event** , Pick the element that carries the change
- [ ] **Matched to element** , Checkbox does not slide. card does
- [ ] **Exits exist** , Whatever appears animated leaves animated
- [ ] **Reduced motion** , `prefers-reduced-motion: reduce` = instant, no springs
- [ ] **Interruptible** , Next click cancels last spring. Nobody waits.
- [ ] **Nothing loops forever** , No idle pulses, no infinite marquees (unless dial=3 justified)

---

## Anti-Patterns (Slop)

- ❌ `transition: all 0.3s ease` , Lazy, animates layout properties
- ❌ `animate.css` / `framer-motion` defaults without tuning , Generic feel
- ❌ Stagger on every page load , Daily interactions get subtle/fast
- ❌ Keyboard-initiated actions animate , Never
- ❌ Scroll-jacking , User owns scroll
- ❌ Parallax without purpose , Dial 3 only
- ❌ No reduced-motion support , Accessibility fail
- ❌ Exit animation missing , One-frame vanish = flicker
- ❌ Competing springs , Two at once reads as glitch

---

## Implementation Flow
```
User needs animation/motion
    │
    ├─► ui-engineering detects "transition/scroll/drag/hover/morph"
    │
    ├─► pick-ui-library → recommends motion.dev (or GSAP for showcase)
    │
    ├─► load ask-motion (library skill) or ask-gsap for showcase
    │
    └─► implement with motion.dev + house-style motion rules
```
---

## motion.dev Primitives (Core)
```tsx
import { motion, AnimatePresence, LazyMotion, domAnimation, m } from 'motion/react'

// Spring preset (house-style)
const spring = { type: 'spring', stiffness: 500, damping: 30, mass: 0.8 }
// = cubic-bezier(0.16, 1, 0.3, 1) ≈ 200ms in

// Quick spring for press feedback
const tapSpring = { type: 'spring', stiffness: 600, damping: 20 }

// Page transition
<AnimatePresence mode="wait">
  <motion.div
    key={pathname}
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -20 }}
    transition={spring}
  />
</AnimatePresence>

// Layout animation (shared element)
<motion.div layoutId="shared-card" className="card" />
// In another route:
<motion.div layoutId="shared-card" className="card-expanded" />

// Scroll-linked (with GSAP - see ask-motion for GSAP)
// motion.dev scroll: useScroll, useTransform
```
---

## Composition Examples

### Page Transition (Linear-style)
```tsx
// app/layout.tsx
import { AnimatePresence } from 'motion/react'

export default function Layout({ children }) {
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -16 }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```
### Button Press Feedback (Raycast-style)
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.97 }}
  transition={tapSpring}
  className="..."
>
  Action
</motion.button>
```
### List Stagger (Onboarding only , rare moment)
```tsx
<ul>
  <AnimatePresence>
    {items.map((item, i) => (
      <motion.li
        key={item.id}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 20 }}
        transition={{ ...spring, delay: i * 0.05 }}
      >
        {item.label}
      </motion.li>
    ))}
  </AnimatePresence>
</ul>
```
### Scroll Reveal (Stripe-style)
```tsx
// Use GSAP for this - see ask-motion
// motion.dev alternative:
const { scrollY } = useScroll()
const y = useTransform(scrollY, [0, 500], [100, 0])

<motion.div style={{ y }} className="sticky top-0" />
```
---

## Showcase Tier (Dial = 3) , GSAP + Lenis

When animation dial = 3 (showcase/motion-heavy):
- `npm i gsap @studio-freight/lenis`
- Load `ask-gsap` library skill
- Lenis for smooth scroll
- GSAP ScrollTrigger for scrub, pin, snap
- Rive for interactive vectors

---

## When to Escalate

| Need | Escalate To |
|------|-------------|
| Complex scroll animations | `ask-motion` (GSAP) |
| Interactive vectors | Rive |
| Canvas/WebGL | Custom + `ask-animation` |
| Page transitions with data | `ask-animation` + TanStack Router loaders |