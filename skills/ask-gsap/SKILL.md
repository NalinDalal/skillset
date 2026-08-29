---
name: ask-gsap
description: Library guide for GSAP + ScrollTrigger + Lenis — showcase-tier scroll animations, scrub, pin, timelines, text morphing, smooth scroll. Load when animation dial = 3 via ask-animation pattern skill.
---

# Ask GSAP — Showcase Tier Scroll Animations

**When to use:** Animation dial = 3 (showcase/motion-heavy). Complex scroll-linked animations, pinning, scrubbing, timelines, text/SVG morphing.

**Packages:** `gsap`, `@studio-freight/lenis`

---

## Installation

```bash
npm i gsap @studio-freight/lenis
```

---

## Core Setup

```tsx
// lib/gsap.ts
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Lenis } from '@studio-freight/lenis'

gsap.registerPlugin(ScrollTrigger)

// Lenis smooth scroll (initialize once in layout)
export function initLenis() {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: 'vertical',
    gestureDirection: 'vertical',
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
  })

  function raf(time) {
    lenis.raf(time)
    requestAnimationFrame(raf)
  }
  requestAnimationFrame(raf)

  return lenis
}

// Reduced motion
export function shouldReduceMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
```

---

## ScrollTrigger Basics

```tsx
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

// Basic scrub
gsap.to('.element', {
  y: -100,
  scrollTrigger: {
    trigger: '.element',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 1, // Smooth scrub (1 = 1 second lag)
  },
})

// Pin
gsap.to('.sticky', {
  scrollTrigger: {
    trigger: '.sticky',
    start: 'top top',
    end: '+=500', // Pin for 500px
    pin: true,
    pinSpacing: true,
  },
})

// Snap
gsap.to('.panel', {
  scrollTrigger: {
    trigger: '.container',
    start: 'top top',
    end: 'bottom bottom',
    snap: {
      snapTo: 'labels', // or 1/3, or [0, 0.5, 1]
      duration: { min: 0.3, max: 0.5 },
      delay: 0.1,
      ease: 'power2.inOut',
    },
  },
})
```

---

## Timeline + ScrollTrigger (Sequenced Animations)

```tsx
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: '.section',
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: 1,
  },
})

tl.from('.title', { y: 50, opacity: 0, duration: 1 })
  .from('.subtitle', { y: 30, opacity: 0, duration: 0.8 }, '-=0.5')
  .from('.stats .stat', { y: 20, opacity: 0, stagger: 0.1 }, '-=0.4')
  .from('.cta', { scale: 0.9, opacity: 0, duration: 0.6 }, '-=0.2')
```

---

## Text Morphing / Reveal

```tsx
// SplitText (GSAP plugin) - or manual
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

const split = new SplitText('.hero-title', { type: 'chars,words,lines' })

gsap.from(split.chars, {
  y: 100,
  opacity: 0,
  stagger: 0.02,
  duration: 0.8,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.hero-title',
    start: 'top 80%',
  },
})

// Scrub text reveal
gsap.to(split.chars, {
  opacity: 1,
  stagger: 0.01,
  scrollTrigger: {
    trigger: '.hero',
    start: 'top bottom',
    end: 'top center',
    scrub: 1,
  },
})
```

---

## SVG Path Morphing

```tsx
import { MorphSVGPlugin } from 'gsap/MorphSVGPlugin'

gsap.registerPlugin(MorphSVGPlugin)

gsap.to('#shape', {
  morphSVG: '#target-shape',
  duration: 2,
  ease: 'power2.inOut',
  scrollTrigger: {
    trigger: '#shape',
    start: 'top 80%',
    end: 'bottom 20%',
    scrub: 1,
  },
})
```

---

## Horizontal Scroll Sections

```tsx
const panels = gsap.utils.toArray('.panel')

panels.forEach((panel, i) => {
  gsap.to(panel, {
    xPercent: -100 * (panels.length - 1),
    ease: 'none',
    scrollTrigger: {
      trigger: '.horizontal-container',
      start: 'top top',
      end: `+=${panels.length * 100}%`,
      pin: true,
      scrub: 1,
      anticipatePin: 1,
    },
  })
})
```

---

## Parallax Layers

```tsx
gsap.to('.parallax-bg', {
  yPercent: 30,
  ease: 'none',
  scrollTrigger: {
    trigger: '.parallax-container',
    start: 'top bottom',
    end: 'bottom top',
    scrub: 0.5,
  },
})

// Multiple layers
gsap.to('.layer-1', { yPercent: 10, scrollTrigger: { trigger: '.section', scrub: 0.3 } })
gsap.to('.layer-2', { yPercent: 20, scrollTrigger: { trigger: '.section', scrub: 0.5 } })
gsap.to('.layer-3', { yPercent: 40, scrollTrigger: { trigger: '.section', scrub: 0.8 } })
```

---

## Counter / Number Animation

```tsx
const counters = document.querySelectorAll('.counter')

counters.forEach(counter => {
  const target = +counter.dataset.target
  gsap.to(counter, {
    innerText: target,
    duration: 2,
    ease: 'power2.out',
    snap: { innerText: 1 },
    scrollTrigger: {
      trigger: counter,
      start: 'top 90%',
    },
  })
})
```

---

## Cursor Follower / Magnetic

```tsx
// Magnetic button
const buttons = document.querySelectorAll('.magnetic')

buttons.forEach(btn => {
  btn.addEventListener('mousemove', (e) => {
    const rect = btn.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    gsap.to(btn, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: 'power2.out' })
  })

  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })
  })
})
```

---

## Lenis Integration (React)

```tsx
// app/providers/LenisProvider.tsx
'use client'

import { useEffect } from 'react'
import { Lenis } from '@studio-freight/lenis'

export function LenisProvider({ children }) {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })

    function raf(time) {
      lenis.raf(time)
      requestAnimationFrame(raf)
    }
    requestAnimationFrame(raf)

    // Sync ScrollTrigger
    lenis.on('scroll', ScrollTrigger.update)
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    return () => {
      lenis.destroy()
      gsap.ticker.remove((time) => lenis.raf(time * 1000))
    }
  }, [])

  return <>{children}</>
}
```

---

## React Components with GSAP

```tsx
'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export function ScrollReveal({ children, className, ...props }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: ref.current,
          start: 'top 85%',
          toggleActions: 'play none none reverse',
        },
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return <div ref={ref} className={className} {...props}>{children}</div>
}

// Usage
<ScrollReveal className="py-20">
  <h2>Reveals on scroll</h2>
</ScrollReveal>
```

---

## Pinning with Content

```tsx
export function PinnedSection({ children, className }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: ref.current,
        start: 'top top',
        end: '+=300%', // Pin for 3x viewport height
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      })
    }, ref)

    return () => ctx.revert()
  }, [])

  return <div ref={ref} className={className}>{children}</div>
}
```

---

## Cleanup (Critical)

```tsx
useEffect(() => {
  const ctx = gsap.context(() => {
    // All GSAP code here
  }, scopeRef)

  return () => ctx.revert() // Kills all animations, ScrollTriggers in scope
}, [])
```

---

## Reduced Motion

```tsx
const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

if (prefersReduced) {
  gsap.globalTimeline.timeScale(0)
  // Or disable ScrollTrigger
  ScrollTrigger.getAll().forEach(st => st.disable())
}
```

---

## Common Patterns

| Pattern | GSAP Approach |
|---------|---------------|
| Fade in on scroll | `gsap.from('.el', { opacity: 0, scrollTrigger: { trigger: '.el', start: 'top 80%' } })` |
| Stagger children | `gsap.from('.item', { y: 30, opacity: 0, stagger: 0.1, scrollTrigger: { trigger: '.container' } })` |
| Pin sidebar | `ScrollTrigger.create({ trigger: '.sidebar', start: 'top top', end: 'bottom bottom', pin: true })` |
| Progress bar | `gsap.to('.progress', { scaleX: 1, scrollTrigger: { trigger: 'body', start: 0, end: 'max', scrub: 0.5 } })` |
| Image parallax | `gsap.to('img', { yPercent: -20, scrollTrigger: { trigger: '.section', scrub: 0.5 } })` |

---

## When NOT to Use GSAP

| Scenario | Use Instead |
|----------|-------------|
| Simple hover/tap | motion.dev |
| Page transitions | motion.dev `AnimatePresence` |
| Layout animations | motion.dev `layout` |
| Modal/toast enter/exit | motion.dev |
| Basic scroll reveal | motion.dev `useScroll`/`useTransform` |

---

## Performance Tips

- Use `gsap.context()` for React cleanup
- Batch ScrollTrigger refresh: `ScrollTrigger.refresh()`
- Avoid `onUpdate` for heavy work
- Use `will-change: transform` on animated elements
- Limit simultaneous animations
- `anticipatePin: 1` for smooth pinning

---

## Related Skills

- `ask-animation` — Pattern guide for all motion
- `ask-motion` — motion.dev for non-showcase motion
- `ui-engineering` — Master orchestrator