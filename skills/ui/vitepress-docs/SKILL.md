---
name: vitepress-docs
description: VitePress documentation site design system. Warm cream/parchment light mode, deep dark mode, Inter typography, clean hero + feature cards + code blocks + sidebar nav. Use when building documentation sites, developer portals, API docs, or library landing pages with VitePress or similar SSGs.
---

# VitePress Documentation Style

Clean, warm documentation sites built on VitePress or similar SSGs. The aesthetic is "parchment meets precision" — warm off-white backgrounds, crisp dark text, generous whitespace, and code as a first-class visual element.

## Design Philosophy

- **Content is king.** The typography hierarchy does the work. No decorative gradients, no heavy shadows, no visual noise.
- **Warmth over sterility.** Light mode uses a cream/parchment tone (#F3EFE8) instead of pure white. Dark mode is a deep charcoal (#141313), not pitch black.
- **Code is beautiful.** Syntax-highlighted code blocks with tabbed package manager switches are a core design element, not an afterthought.
- **Navigation is quiet.** Top nav with search, dark/light toggle, and minimal links. Sidebar navigation organizes deep content.

## Color System

### Light Mode

| Token | Value | Role |
|-------|-------|------|
| `--vp-c-bg` | `#ffffff` | Page canvas (override to `#F3EFE8` for warm variant) |
| `--vp-c-bg-alt` | `#f6f6f7` | Code block backgrounds, alt sections |
| `--vp-c-bg-soft` | `#f6f6f7` | Subtle surface differentiation |
| `--vp-c-bg-elv` | `#ffffff` | Elevated surfaces (dropdowns, modals) |
| `--vp-c-text-1` | `#3c3c43` | Primary headings, body text |
| `--vp-c-text-2` | `#67676c` | Secondary text, descriptions |
| `--vp-c-text-3` | `#929295` | Captions, placeholders, muted |
| `--vp-c-border` | `#c2c2c4` | Borders, dividers |
| `--vp-c-divider` | `#e2e2e3` | Section dividers |
| `--vp-c-brand-1` | `#3451b2` | Links, brand accent (indigo) |
| `--vp-c-brand-2` | `#3a5ccc` | Hover states |
| `--vp-c-brand-3` | `#5672cd` | Button backgrounds |

### Dark Mode

| Token | Value | Role |
|-------|-------|------|
| `--vp-c-bg` | `#1b1b1f` | Page canvas (override to `#141313` for deeper variant) |
| `--vp-c-bg-alt` | `#161618` | Code block backgrounds |
| `--vp-c-bg-soft` | `#202127` | Subtle surface differentiation |
| `--vp-c-bg-elv` | `#202127` | Elevated surfaces |
| `--vp-c-text-1` | `#ffffff` | Primary headings |
| `--vp-c-text-2` | `#8e8e92` | Secondary text |
| `--vp-c-text-3` | `#6e6e73` | Muted text |
| `--vp-c-border` | `#3c3f44` | Borders |
| `--vp-c-divider` | `#2e2e32` | Dividers |
| `--vp-c-brand-1` | `#a8b1ff` | Links, brand accent (lighter indigo) |

### Warm Variant Override (iim.smartsquad.io style)

To get the signature warm parchment feel, override the default VitePress whites:

```css
:root {
  --vp-c-bg: #F3EFE8;
  --vp-c-bg-alt: #EDE8DF;
  --vp-c-bg-soft: #E8E3DA;
  --vp-c-text-1: #2c2c2c;
  --vp-c-text-2: #5a5a5a;
  --vp-c-text-3: #8a8a8a;
  --vp-c-border: #d4cfc6;
  --vp-c-divider: #e0dbd2;
}

.dark {
  --vp-c-bg: #141313;
  --vp-c-bg-alt: #1a1919;
  --vp-c-bg-soft: #1f1e1e;
  --vp-c-text-1: #e8e8e8;
  --vp-c-text-2: #9a9a9a;
  --vp-c-text-3: #6a6a6a;
  --vp-c-border: #2e2d2d;
  --vp-c-divider: #242323;
}
```

## Typography

### Font Stack

```css
--vp-font-family-base: "Inter", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
--vp-font-family-mono: ui-monospace, "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", monospace;
```

### Type Scale

| Role | Size | Weight | Line Height | Letter Spacing |
|------|------|--------|-------------|----------------|
| Display/Hero | 48–56px | 700 | 1.1 | -0.02em |
| H1 | 32px | 700 | 1.2 | -0.01em |
| H2 | 24px | 600 | 1.3 | -0.005em |
| H3 | 20px | 600 | 1.4 | 0 |
| Body | 16px | 400 | 1.6 | 0 |
| Small/Caption | 14px | 400 | 1.5 | 0 |
| Code | 14px (0.875em) | 400 | 1.7 | 0 |
| Eyebrow | 13px | 700 | 1.4 | 0.1em (uppercase) |

### Eyebrow Label

Used above the hero title to categorize the project:

```css
.hero-eyebrow {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  margin-bottom: 16px;
}
```

## Layout

### Page Structure

```
┌─────────────────────────────────────────────┐
│  NAV BAR (fixed top)                        │
│  Logo · Search · Links · Dark Toggle · Git  │
├─────────────────────────────────────────────┤
│                                             │
│  HERO SECTION                               │
│  [Eyebrow]                                  │
│  [Title + Subtitle]                         │
│  [CTA Buttons]              [Demo/Preview]  │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  FEATURES (3-col grid)                      │
│  ┌──────┐  ┌──────┐  ┌──────┐              │
│  │ Icon │  │ Icon │  │ Icon │              │
│  │ Title│  │ Title│  │ Title│              │
│  │ Desc │  │ Desc │  │ Desc │              │
│  └──────┘  └──────┘  └──────┘              │
│                                             │
├─────────────────────────────────────────────┤
│                                             │
│  DOCUMENTATION CONTENT                      │
│  H2 · Prose · Code Blocks · Tabs            │
│                                             │
├─────────────────────────────────────────────┤
│  FOOTER                                     │
│  Credits · License                          │
└─────────────────────────────────────────────┘
```

### Max Width

```css
--vp-layout-max-width: 1440px;
```

### Key Dimensions

| Element | Value |
|---------|-------|
| Nav height | 64px |
| Sidebar width | 272px |
| Content max-width | 768px (prose) |
| Hero demo aspect | 3:4 or 4:3 |
| Feature card gap | 24px |
| Section vertical gap | 48–64px |

## Components

### Hero Section

Left-aligned text with right-aligned visual demo. On mobile, stacks vertically.

```
┌──────────────────────────────────────────┐
│  OPEN SOURCE JS LIBRARY     [eyebrow]    │
│                                          │
│  Project Name              ┌──────────┐  │
│  Subtitle line here        │  Demo /  │  │
│  Description paragraph     │  Image   │  │
│                             │  Area    │  │
│  [Install] [Docs] [Studio] └──────────┘  │
└──────────────────────────────────────────┘
```

**Buttons:**
- Primary (brand): filled background, white text, rounded
- Alt: outlined, transparent background, border + text color
- Size: medium (14px, 10px 20px padding)

### Feature Cards

3-column grid of linked cards. Each card has a title and short description. No icons required (VitePress default) or optional icon above title.

```css
.VPFeatures {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.VPFeature {
  border-radius: 12px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  transition: border-color 0.25s, background 0.25s;
}

.VPFeature:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-elv);
}
```

### Code Blocks

Syntax-highlighted with Shiki (github-light/github-dark themes). Features:
- Copy button (top-right)
- Language label (top-left)
- Tabbed groups for package managers (npm/yarn/pnpm/bun)
- Line numbers optional
- Diff highlighting (add/remove lines)

```css
.vp-code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.875em;
  line-height: 1.7;
  padding: 20px 24px;
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  overflow-x: auto;
}
```

### Code Tabs

Radio-button-based tab switcher for package manager commands:

```
┌──────┬──────┬──────┬──────┐
│ npm  │ yarn │ pnpm │ bun  │
├──────┴──────┴──────┴──────┤
│  npm i package-name       │
└───────────────────────────┘
```

### Sidebar Navigation

Left sidebar for deep documentation. Collapsible sections with headers.

```
Sidebar
├── Start
│   ├── What it is
│   └── Install and usage
├── Frameworks
│   ├── Getting started
│   ├── React
│   ├── Vue
│   └── ...
└── Reference
    ├── API
    └── Examples
```

### Search

DocSearch-style search bar in the nav. Keyboard shortcut hint (⌘K / Ctrl+K).

### Dark/Light Toggle

Sun/moon icon switch in the nav bar. Smooth transition between themes.

### Footer

Simple centered footer with credits and copyright.

```
designed by [Name], implemented by [Name]
© 2026 Company. MIT License.
```

## Spacing System

| Token | Value | Use |
|-------|-------|-----|
| `--vp-gap` | 8px | Element gap |
| — | 16px | Tight section gap |
| — | 24px | Card padding, feature gap |
| — | 32px | Content section gap |
| — | 48px | Major section separator |
| — | 64px | Hero bottom padding |
| — | 96px | Full section break |

## Motion

- **Theme transition:** 0.3s ease for all color changes
- **Hover effects:** 0.25s ease for border-color, background, transform
- **Feature cards:** subtle border-color shift on hover, no scale/shadow
- **Code copy button:** opacity transition on hover
- **Reduced motion:** respect `prefers-reduced-motion`

## Dark Mode Implementation

VitePress handles dark mode via a `.dark` class on `<html>`. The toggle persists to localStorage. Implementation:

```js
// Check theme on load
const theme = localStorage.getItem('vitepress-theme-appearance') || 'auto'
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
if ((!theme || theme === 'auto') ? prefersDark : theme === 'dark') {
  document.documentElement.classList.add('dark')
}
```

## Build With

- **Framework:** VitePress (Vue-based SSG) or similar (Astro, Docusaurus, Nextra)
- **Syntax highlighting:** Shiki (github-light + github-dark themes)
- **Search:** local search or Algolia DocSearch
- **Deployment:** Vercel, Netlify, Cloudflare Pages

## Do

- Use warm off-white (#F3EFE8) for light mode — it makes long reading sessions easier
- Keep the hero concise: eyebrow + title + subtitle + 2-3 CTAs
- Make code blocks visually prominent — they're often the most-read content
- Use tabbed code blocks for install commands (npm/yarn/pnpm/bun)
- Maintain generous whitespace between sections (48-64px)
- Keep nav minimal: logo, search, 3-5 links, dark toggle, GitHub icon
- Use Inter for body, monospace for code — no decorative fonts

## Don't

- Don't use pure white (#fff) as the light mode background — it's sterile and harsh
- Don't add hero gradients, background patterns, or decorative elements
- Don't use more than 2 font families (sans-serif + monospace)
- Don't make feature cards clickable to different pages unless they're truly navigation
- Don't add heavy box shadows to cards — use border + subtle background shift
- Don't put more than 5 items in the top nav
- Don't use bold weights above 700 for body text

## Reference Sites

- [Images in Motion](https://iim.smartsquad.io/) — warm parchment VitePress style
- [VitePress Default](https://vitepress.dev/) — clean baseline
- [Vue.js Docs](https://vuejs.org/) — polished VitePress implementation
- [Rollup Docs](https://rollupjs.org/) — minimal documentation style

## Quick Start (VitePress)

```bash
npm init -y
npm install -D vitepress
npx vitepress init
```

### Custom Theme Override

```css
/* docs/.vitepress/theme/custom.css */
:root {
  --vp-c-bg: #F3EFE8;
  --vp-c-bg-alt: #EDE8DF;
  --vp-c-bg-soft: #E8E3DA;
  --vp-c-text-1: #2c2c2c;
  --vp-c-text-2: #5a5a5a;
  --vp-c-text-3: #8a8a8a;
  --vp-c-border: #d4cfc6;
  --vp-c-divider: #e0dbd2;
  --vp-c-brand-1: #3451b2;
  --vp-c-brand-2: #3a5ccc;
  --vp-c-brand-3: #5672cd;
}

.dark {
  --vp-c-bg: #141313;
  --vp-c-bg-alt: #1a1919;
  --vp-c-bg-soft: #1f1e1e;
  --vp-c-text-1: #e8e8e8;
  --vp-c-text-2: #9a9a9a;
  --vp-c-text-3: #6a6a6a;
  --vp-c-border: #2e2d2d;
  --vp-c-divider: #242323;
}
```

## CSS Custom Properties (Full)

```css
:root {
  /* Colors */
  --vp-c-white: #ffffff;
  --vp-c-black: #000000;
  --vp-c-bg: #F3EFE8;
  --vp-c-bg-alt: #EDE8DF;
  --vp-c-bg-soft: #E8E3DA;
  --vp-c-bg-elv: #ffffff;
  --vp-c-text-1: #2c2c2c;
  --vp-c-text-2: #5a5a5a;
  --vp-c-text-3: #8a8a8a;
  --vp-c-border: #d4cfc6;
  --vp-c-divider: #e0dbd2;
  --vp-c-brand-1: #3451b2;
  --vp-c-brand-2: #3a5ccc;
  --vp-c-brand-3: #5672cd;

  /* Typography */
  --vp-font-family-base: "Inter", ui-sans-serif, system-ui, sans-serif;
  --vp-font-family-mono: ui-monospace, "Menlo", "Monaco", "Consolas", monospace;

  /* Layout */
  --vp-layout-max-width: 1440px;

  /* Code */
  --vp-code-font-size: 0.875em;
  --vp-code-line-height: 1.7;

  /* Shadows */
  --vp-shadow-1: 0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
}

.dark {
  --vp-c-bg: #141313;
  --vp-c-bg-alt: #1a1919;
  --vp-c-bg-soft: #1f1e1e;
  --vp-c-bg-elv: #1f1e1e;
  --vp-c-text-1: #e8e8e8;
  --vp-c-text-2: #9a9a9a;
  --vp-c-text-3: #6a6a6a;
  --vp-c-border: #2e2d2d;
  --vp-c-divider: #242323;
  --vp-c-brand-1: #a8b1ff;
  --vp-c-brand-2: #5c73e7;
  --vp-c-brand-3: #3e63dd;
}
```
