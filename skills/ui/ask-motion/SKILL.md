---
name: ask-motion
description: Library guide for motion.dev (Framer Motion): springs, layout animations, gestures, scroll, AnimatePresence. Load via ask-animation pattern skill. Implements house-style motion rules.
---
# Ask Motion , motion.dev (Framer Motion)

**When to use:** All UI motion , page transitions, layout animations, enter/exit, drag, hover/tap, scroll-linked (basic), stagger.

**Package:** `motion` (formerly `framer-motion`)

---

## Installation
```bash
npm i motion
# or
npm i framer-motion@latest
```
---

## Core API (v11+)
```tsx
import { motion, AnimatePresence, LazyMotion, domAnimation, m, useScroll, useTransform, useSpring, useMotionValue, useAnimationControls } from 'motion/react'
```
---

## House-Style Motion Config (Non-Negotiable)
```tsx
// lib/motion-config.ts
export const spring = {
  type: 'spring',
  stiffness: 500,
  damping: 30,
  mass: 0.8,
} as const
// ≈ cubic-bezier(0.16, 1, 0.3, 1): 200ms in

export const springOut = {
  type: 'spring',
  stiffness: 600,
  damping: 35,
} as const
// Sharper exit: 150ms out

export const tapSpring = {
  type: 'spring',
  stiffness: 600,
  damping: 20,
} as const

export const pageTransition = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -16 },
  transition: spring,
} as const

export const modalTransition = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.97 },
  transition: spring,
} as const

export const toastTransition = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: springOut,
} as const
```
---

## Reduced Motion (Mandatory)
```tsx
// hooks/useReducedMotion.ts
import { useEffect, useState } from 'react'
import { useReducedMotion } from 'motion/react'

export function useReducedMotion() {
  const [shouldReduce, setShouldReduce] = useState(false)

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setShouldReduce(mediaQuery.matches)
    const handler = (e: MediaQueryListEvent) => setShouldReduce(e.matches)
    mediaQuery.addEventListener('change', handler)
    return () => mediaQuery.removeEventListener('change', handler)
  }, [])

  return shouldReduce
}

// Usage in components
const reduced = useReducedMotion()
const transition = reduced ? { duration: 0 } : spring
```
---

## Page Transitions (Linear-style)
```tsx
// app/layout.tsx
import { AnimatePresence } from 'motion/react'
import { pageTransition } from '@/lib/motion-config'

export default function Layout({ children }) {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={pathname}
        {...pageTransition}
        className="min-h-screen"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```
---

## Layout Animations (Shared Element)
```tsx
// Card that expands to detail page
<motion.article layoutId="project-card" className="card">
  <motion.div layoutId="project-image" className="aspect-video rounded-lg bg-gray-100" />
  <h3 className="font-semibold">{project.name}</h3>
</motion.article>

// In detail page
<motion.div layoutId="project-image" className="aspect-video rounded-lg bg-gray-100" />
```
---

## Enter/Exit (Modals, Toasts, Dropdowns)
```tsx
import { AnimatePresence, motion } from 'motion/react'
import { modalTransition, toastTransition } from '@/lib/motion-config'

// Modal
<AnimatePresence>
  {isOpen && (
    <motion.div {...modalTransition} className="fixed inset-0 z-50 flex items-center justify-center">
      <motion.div className="bg-white rounded-xl p-6 max-w-lg w-full mx-4">
        {children}
      </motion.div>
    </motion.div>
  )}
</AnimatePresence>

// Toast
<AnimatePresence>
  {toasts.map((toast) => (
    <motion.div key={toast.id} {...toastTransition} className="toast">
      {toast.content}
    </motion.div>
  ))}
</AnimatePresence>
```
---

## Hover/Tap Feedback (Raycast-style)
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.97 }}
  transition={tapSpring}
  className="..."
>
  Action
</motion.button>

// Card lift
<motion.div
  whileHover={{ y: -4, boxShadow: '0 20px 40px -12px rgba(0,0,0,0.15)' }}
  transition={spring}
  className="card"
>
  Content
</motion.div>
```
---

## Drag (Vaul-style Drawers, Sliders)
```tsx
<motion.div
  drag="y"
  dragConstraints={{ top: 0, bottom: 300 }}
  dragElastic={0.2}
  dragMomentum={false}
  dragTransition={{ type: 'spring', stiffness: 800, damping: 40 }}
  className="drawer-content"
>
  Content
</motion.div>

// Slider
<motion.input
  type="range"
  min={0}
  max={100}
  style={{ width: '100%' }}
  // Use useTransform for custom thumb
/>
```
---

## Scroll-Linked (Basic , Use GSAP for Complex)
```tsx
import { useScroll, useTransform, motion } from 'motion/react'

function StickyHeader() {
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 200], [0, -100])
  const opacity = useTransform(scrollY, [0, 100], [1, 0])

  return (
    <motion.header style={{ y, opacity }} className="sticky top-0 z-50">
      Header
    </motion.header>
  )
}

// Progress bar
function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const width = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return <motion.div style={{ width }} className="h-0.5 bg-primary fixed top-0 z-50" />
}
```
---

## Stagger (Rare Moments Only)
```tsx
import { motion } from 'motion/react'

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

// Container stagger
<motion.ul
  initial="hidden"
  animate="show"
  variants={{
    hidden: { opacity: 0 },
    show: { transition: { staggerChildren: 0.05 } },
  }}
>
  {items.map(item => (
    <motion.li key={item.id} variants={{ hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } }}>
      {item.label}
    </motion.li>
  ))}
</motion.ul>
```
---

## useSpring (Smooth Values)
```tsx
import { useSpring, motion } from 'motion/react'

function SmoothCounter({ count }) {
  const springValue = useSpring(count, { stiffness: 300, damping: 30 })

  return <motion.span style={{ x: springValue }}>{Math.round(springValue.get())}</motion.span>
}

// Mouse follower
function MagneticButton() {
  const x = useSpring(0, { stiffness: 400, damping: 40 })
  const y = useSpring(0, { stiffness: 400, damping: 40 })

  return (
    <motion.button
      style={{ x, y }}
      onMouseMove={(e) => {
        const rect = e.currentTarget.getBoundingClientRect()
        x.set((e.clientX - rect.left - rect.width / 2) * 0.3)
        y.set((e.clientY - rect.top - rect.height / 2) * 0.3)
      }}
      onMouseLeave={() => { x.set(0); y.set(0) }}
    >
      Magnetic
    </motion.button>
  )
}
```
---

## LazyMotion (Bundle Size)
```tsx
import { LazyMotion, domAnimation, m, motion } from 'motion/react'

// Only load DOM animation features (~12kb)
<LazyMotion features={domAnimation}>
  <motion.div animate={{ x: 100 }} />
</LazyMotion>

// Or async load for heavy features
<LazyMotion features={async () => (await import('motion/react')).domAnimation}>
  <motion.div animate={{ x: 100 }} />
</LazyMotion>
```
---

## Common Pitfalls

| Issue | Fix |
|-------|-----|
| Layout shift on animate | Use `layout` prop, animate `transform` only |
| Exit animation not playing | Wrap in `AnimatePresence mode="wait"` |
| Stagger too slow | Reduce delay, or do not stagger daily interactions |
| No reduced motion | Wrap transitions in `useReducedMotion` hook |
| Jitter on scroll | Use `useTransform` with `useScroll`, not `onScroll` |
| Bundle too big | Use `LazyMotion` with `domAnimation` |

---

## When to Use GSAP Instead

| Scenario | Use |
|----------|-----|
| Complex scroll scrub/pin/snap | GSAP + ScrollTrigger |
| Timeline sequencing | GSAP timelines |
| Text morphing, SVG path morph | GSAP |
| High-performance canvas/WebGL | GSAP + Pixi/Three |
| Showcase tier (dial=3) | GSAP + Lenis |

---

## Related Skills

- `ui/ask-animation` - Pattern guide for all motion
- `ui/ask-gsap` - GSAP + ScrollTrigger + Lenis for showcase tier
- `ui/ui-engineering` - Master orchestrator