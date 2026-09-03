# Quality Bar References

**The standard.** Every UI decision should trace back to these references.

---

## SaaS Gold Standard (Best "Feel": Snappy, Physics-Based)

| Site | What to Steal | Why It Works |
|------|---------------|--------------|
| **Linear** | Command palette (⌘K), page transitions, cursor states, issue hover cards, keyboard shortcuts everywhere | Gold standard. Everything feels instant and intentional. |
| **Raycast** | Website mirrors app speed; hover states, scroll reveals, copy-to-clipboard toast, keyboard-first nav | Razor-tight. No wasted motion. |
| **Stripe** | Subtle gradient animations, docs pages with live code that morphs on scroll, careful color use | Restrained but delightful. Code blocks that animate on scroll. |
| **Vercel** | Geometric motion, great restraint (not everything animates), clean type hierarchy | Confident minimalism. |
| **Arc (The Browser Company)** | Playful micro-copy + micro-animation combo, onboarding flow, personality | Personality without chaos. |
| **Attio / Cron (Notion Calendar)** | SaaS onboarding-style micro-interactions, drag-drop, inline editing | Product-led growth patterns. |

---

## Agency/Showcase Tier (Heavier Animation, GSAP/WebGL)

| Site | What to Steal | When to Use |
|------|---------------|-------------|
| **Awwwards Site of the Day** | Current trends, not fixed set | Dial = 3 only |
| **Locomotive** | Smooth-scroll + parallax done right | Showcase landing pages |
| **Basement.studio** | Experimental interactions, WebGL | Dial = 3, creative brands |
| **Cuberto** | Character animation, fluid motion | Dial = 3 |
| **Resn** | Immersive WebGL experiences | Dial = 3 |
| **Active Theory** | Three.js + GSAP mastery | Dial = 3 |

---

## Libraries/Tools (Beyond Aceternity)

### Animation Engines
| Library | Use For | Notes |
|---------|---------|-------|
| **motion.dev (Framer Motion)** | Page transitions, layout animations, enter/exit, gestures, basic scroll | Primary motion lib. `npm i motion` |
| **GSAP + ScrollTrigger** | Scroll scrub, pin, snap, timelines, text/SVG morph, complex sequences | Showcase tier (dial=3). `npm i gsap` |
| **Lenis** | Smooth scroll, pairs with GSAP | `npm i @studio-freight/lenis` |
| **Rive** | Interactive vector animations that respond to state | Advanced, `npm i @rive-app/canvas` |

### UI Primitives
| Library | Use For | Notes |
|---------|---------|-------|
| **base-ui** | Dialogs, popovers, menus, selects, tooltips, combobox, tabs, accordion | Unstyled, accessible. `@base-ui-components/react` |
| **Vaul** | Drawers, bottom sheets, side sheets | Gesture-driven. `npm i vaul` |
| **cmdk** | Command palette (⌘K) | `npm i cmdk` |
| **Radix UI** | Alternative to base-ui | More packages, similar philosophy |

### Data & Forms
| Library | Use For | Notes |
|---------|---------|-------|
| **TanStack Table** | Data tables, sorting, filtering, pagination, virtualization | `@tanstack/react-table` + `@tanstack/react-virtual` |
| **Virtuoso** | Virtualized lists, feeds, chat, variable heights | `npm i react-virtuoso` |
| **React Hook Form + Zod** | Forms, validation, server actions | `npm i react-hook-form @hookform/resolvers zod` |
| **Sonner** | Toasts, notifications | `npm i sonner` |

### Interaction Layer
| Library | Use For |
|---------|---------|
| **dnd-kit** | Drag and drop |
| **Vaul** | Drawers (already listed) |
| **Radix/base-ui** | Popovers, tooltips, menus, selects |

---

## Inspiration Galleries (Browse, Don't Copy)

| Site | Best For |
|------|----------|
| **Awwwards** | Cutting-edge motion, WebGL |
| **Mobbin** | Real UI patterns (not just heroes): mobile + desktop |
| **Godly** | Curated landing pages |
| **SiteInspire** | Design inspiration |
| **Dribbble** | Micro-interaction concepts (search "micro-interaction") |
| **Evil Charts** | Chart inspiration for data visualization UI |
| **Kobbe.io** | Generous whitespace, clean typography, rounded aesthetic |
| **Make.design** | Testimonial pages and polished design systems |
| **Timmo.co.in** | Clean layout and modern SaaS feel |

## What to Steal (Transferable Principles)

| Reference | Principle to Extract |
|-----------|----------------------|
| **Linear** | Command palette as primary navigation. Hover cards that surface context without leaving the page. Page transitions that feel like state changes, not scenes. |
| **Raycast** | Hover states that are near-instant. Copy-to-clipboard feedback that is visible but not intrusive. Keyboard-first means every click target has a keyboard target. |
| **Stripe** | Gradient animations tied to scroll, not decoration. Code blocks that respond to user action. Color that leads the eye, not decorates it. |
| **Vercel** | Geometric motion where the shape change is the feedback. Type hierarchy so strong it needs no color. Restraint as a feature, not a limit. |
| **Arc** | Micro-copy that matches micro-animation. Onboarding that teaches through doing, not explaining. Personality in the pauses, not the noise. |
| **Attio/Cron** | Inline editing that feels like paper, not a form. Drag-drop that snaps with intention. Micro-interactions that confirm the action, not announce it. |
| **Kobbe.io** | Whitespace as rhythm. Generous section padding that lets content breathe. Typography with clean roundness that feels modern without being bubbly. |
| **Make.design** | Testimonial pages where the quote is the hero, not the logo. Attribution that adds weight through simplicity. Visual rhythm that makes scrolling feel intentional. |
| **Evil Charts** | Minimal ink: gridlines removed until the chart breaks, then added back sparingly. Annotations over legends. One accent per series, hue not lightness for distinction. |
| **Timmo.co.in** | Clean SaaS feel through consistent spacing and restrained color. Layout that trusts the content without over-decorating. |

---

## GitHub Repos to Study

| Repo | Why |
|------|-----|
| `gastownhall/beads` | Motion primitives, gesture handling |
| `addyosmani/agent-skills` | AI agent patterns |
| `mattpocock/skills` | TypeScript patterns |

---

## Token Templates (Starting Points)

### Clinical (Linear-style)
```css
:root {
  --accent: 220 100% 50%;        /* Blue */
  --gray: 220 15% 20%;           /* Cool gray */
  --radius: 0.5rem;              /* 8px */
  --font-sans: 'Inter', system-ui;
  --font-mono: 'JetBrains Mono', monospace;
  --transition: 150ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Sharp/Editorial (Stripe-style)
```css
:root {
  --accent: 340 100% 50%;        /* Pink/red */
  --gray: 240 10% 15%;           /* Warm dark */
  --radius: 0.375rem;            /* 6px */
  --font-sans: 'Space Grotesk', system-ui;
  --font-display: 'Space Grotesk', system-ui;
  --transition: 200ms cubic-bezier(0.16, 1, 0.3, 1);
}
```

### Playful (Arc-style)
```css
:root {
  --accent: 280 100% 60%;        /* Purple */
  --gray: 260 10% 15%;           /* Purple-tinted dark */
  --radius: 0.75rem;             /* 12px */
  --font-sans: 'DM Sans', system-ui;
  --font-display: 'DM Sans', system-ui;
  --transition: 250ms cubic-bezier(0.34, 1.56, 0.64, 1); /* Bouncier */
}
```

### Dense/Terminal (Bloomberg-style)
```css
:root {
  --accent: 120 100% 40%;        /* Green */
  --gray: 0 0% 10%;              /* True black/white */
  --radius: 0;                   /* No radius */
  --font-sans: 'IBM Plex Mono', monospace;
  --font-mono: 'IBM Plex Mono', monospace;
  --transition: 100ms ease-out;
}
```

---

## Motion Recipes (Copy-Paste Starting Points)

### Page Transition (Linear)
```tsx
// app/layout.tsx
<AnimatePresence mode="wait" initial={false}>
  <motion.div
    key={pathname}
    initial={{ opacity: 0, y: 16 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -16 }}
    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
  >
    {children}
  </motion.div>
</AnimatePresence>
```

### Modal/Sheet Enter/Exit
```tsx
const modalTransition = {
  initial: { opacity: 0, scale: 0.97 },
  animate: { opacity: 1, scale: 1 },
  exit: { opacity: 0, scale: 0.97 },
  transition: { type: 'spring', stiffness: 500, damping: 30 },
}
```

### Button Press (Raycast)
```tsx
<motion.button
  whileHover={{ scale: 1.02 }}
  whileTap={{ scale: 0.97 }}
  transition={{ type: 'spring', stiffness: 600, damping: 20 }}
>
```

### Stagger (Onboarding Only)
```tsx
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

### Scroll Reveal (Stripe)
```tsx
// Use GSAP for this
gsap.from('.reveal', {
  y: 60,
  opacity: 0,
  duration: 1,
  ease: 'power3.out',
  scrollTrigger: { trigger: '.reveal', start: 'top 85%' },
})
```

---

## Component Checklist (Finish Gate)

Every component must pass:

- [ ] **One clear action**: Primary CTA obvious
- [ ] **Color in small doses**: 1 accent, used only for actions
- [ ] **Whitespace separates**: No borders/shadows for separation
- [ ] **Real type hierarchy**: Display / Body / Hint (not 5 bold sizes)
- [ ] **Feedback matches action**: Press = visual, Done = quiet, Destructive = confirm
- [ ] **Dark mode works**: `theme="system"` wired
- [ ] **Reduced motion works**: Instant state changes
- [ ] **No em dashes**: In visible text
- [ ] **Accessibility**: Keyboard, ARIA, focus visible, contrast AA
- [ ] **TypeScript strict**: No `any`, discriminated unions
- [ ] **Tailwind component-based**: Tokens first, raw CSS only with reason

---

## Anti-Patterns (Auto-Reject)

| Pattern | Rejection Reason |
|---------|------------------|
| Purple gradient background | AI slop marker |
| Glowing buttons | AI slop marker |
| Oversized rounded cards (2xl+) | AI slop marker |
| Floating orbs in hero | Unless product IS orbs |
| Stagger on every page load | Daily interactions = subtle/fast |
| Scroll-jacking | User owns scroll |
| Infinite marquee | Loops forever = no purpose |
| `transition: all 0.3s ease` | Lazy, animates layout |
| `ease-in-out` | Elevator curve, not UI |
| No reduced-motion support | Accessibility fail |
| Missing exit animation | One-frame vanish = flicker |
| Focus not trapped in modal | Keyboard trap |
| No ESC to close modal | UX fail |

---

## Decision Tree (When User Says Vague Things)

| User Says | You Ask | You Pick |
|-----------|---------|----------|
| "Make it pop" | "Linear-sharp? Arc-playful? Stripe-gradient?" | One |
| "Add animations" | Load `motion` → Run Decide phase | Only what passes |
| "Nice toast" | Load `ask-toast` → `ask-sonner` | `richColors`, action buttons |
| "Command palette" | Load `ask-command-menu` → `ask-cmdk` | Full keyboard nav |
| "Smooth scroll" | Dial check: if 3 → GSAP+Lenis, else motion.dev | Appropriate lib |
| "Data table" | Load `ask-table` → `ask-tanstack-table` | Virtualized, sortable |
| "Form" | Load `ask-form` → `ask-rhf` | Zod schema, server actions |

---

## Quick Reference: Skill Loading Map

```
User: "Build the FE/UI"
    │
    ├─► ui-engineering (orchestrates all)
    │     ├─► house-style (LAW)
    │     ├─► ui (process)
    │     ├─► pick-ui-library (per interaction)
    │     │     ├─► ask-modal → ask-base-ui
    │     │     ├─► ask-toast → ask-sonner
    │     │     ├─► ask-animation → ask-motion (or ask-gsap if dial=3)
    │     │     ├─► ask-command-menu → ask-cmdk
    │     │     ├─► ask-form → ask-rhf
    │     │     ├─► ask-table → ask-tanstack-table
    │     │     ├─► ask-virtual-list → ask-virtuoso
    │     │     └─► ask-drawer → ask-vaul
    │     ├─► motion (name→decide→build→review)
    │     ├─► impeccable (audit→polish→animate→verify)
    │     └─► prototype (optional divergence)
    │
    └─► References: this file + tokens + motion-recipes + component-checklist
```