---
name: email-craft
description: Email design system for product emails. Use when building, redesigning, or auditing HTML emails — daily digests, transactional, onboarding, announcements. Encodes the constraints of email clients (table layout, inline CSS, dark mode, MSO) and the product principles: single focal point, decision-oriented hierarchy, action-driven CTAs, restraint over decoration.
---

## Principle: Email is not web

Email clients have no shared rendering engine. What works in Apple Mail breaks in Outlook. What works in Gmail web breaks in Gmail app. The only reliable substrate is **tables + inline CSS**.

Default constraints:
- 600px max width, single column
- Table-based/hybrid layout
- All CSS inlined (no `<style>` blocks for layout)
- 16px minimum body text where possible
- Strong vertical rhythm (8px baseline)
- One primary CTA per email
- One visual focal point
- Restrained borders (hairlines, not cards)
- No gratuitous cards/boxes
- Mobile-first hierarchy (stack on <600px)
- Dark-mode handling via `@media (prefers-color-scheme: dark)`
- Accessible link contrast (4.5:1 minimum)
- Alt text on all images
- Plaintext fallback required

## Principle: Decision surface, not database dump

The email answers four questions:

1. **What changed today?** (numbers, freshness)
2. **What should I look at?** (1 hero + 3–5 compact)
3. **Why should I care?** (reasoning, signals, gaps)
4. **What should I do next?** (action list)

Everything else links to the dashboard.

## Information architecture template

```
Header (brand + date + context)
↓
Today's numbers (4 stats max, hairline-separated)
↓
Hero job (tier 1 — full reasoning, primary CTA)
↓
3–5 compact jobs (tier 2 — score, title, company, link)
↓
Market signal / insight (recurring editorial feature)
↓
People to reach out to (if applicable)
↓
Your move (3 numbered actions)
↓
Footer (product identity + unsubscribe)
```

### Tier definitions

| Tier | Count | Treatment |
|------|-------|-----------|
| 1 (Hero) | 1 | Full card: company → role → score → why → CTA |
| 2 (Worth time) | 3–5 | Compact row: score · title @ company · location · CTA |
| 3 (Everything else) | N | Not in email. "See all N jobs →" link to dashboard |

## Visual system

### Tokens (Apple-inspired neutral)

```ts
const tokens = {
  bg: "#f5f5f7",
  card: "#ffffff",
  ink: "#111111",
  body: "#2b2b2e",
  muted: "#6e6e73",
  faint: "#86868b",
  line: "#e8e8ed",
  subLine: "#f0f0f3",
  accent: "#111111",      // primary actions
  success: "#1a7f37",     // strong match
  warn: "#925400",        // review
  danger: "#b42318",      // red flags
  tagBg: "#f2f2f5",
  tagBd: "#e8e8ec",
  radius: "10px",
};
```

### Dark mode overrides (in `<style>` block)

Force specific values for Gmail/Outlook auto-invert:
- Score pills: force dark backgrounds
- Primary CTA: invert to light bg + dark text
- Hairlines: `#2c2c2e`
- Text colors: shift to `#f5f5f7` / `#d6d6d8` / `#a1a1a6`

### Typography

- Display: `-apple-system...`, 24px, weight 700, tracking -0.025em
- Section title: 13px, weight 600, tracking -0.01em, no uppercase
- Body: 12.5px, line-height 1.65, max-width 65ch
- Small caps (brand only): 10px, weight 700, tracking 0.14em, uppercase
- Score: 22px, weight 700, tracking -0.02em
- Micro: 10-11px, muted

### Spacing

- Section gap: 28px
- Internal card padding: 20px
- Row padding: 16px
- Hairline margin: 14px above/below

## Component library

### `emailHeader(vm)`
Brand + date + profile context (roles · locations)

### `emailStats(vm)`
4-column stat row: Scanned · Fresh · Strong · To Review
Hairline top/bottom, no card wrapper

### `emailHeroJob(match)`
**The focal point.** Full hierarchy:
- Section title: "Today's best match"
- Score badge + verdict pill
- Role (17px, weight 700)
- Company (13px, weight 500)
- Meta: location · posted · compensation
- Matched skills (tags, max 5)
- **Why this matches** (bulleted reasoning from `whyMatch`)
- **Watch** (red flags, if any)
- Primary CTA: `[ Apply to {company} → ]` (contextual verb)
- Secondary: `[ Review match → ]`

### `emailJobRow(matches[])`
Compact rows, hairline-separated:
- Score (13px, bold) + `/5` (9px, faint)
- Title (link, 13px, weight 600)
- Company (12px, muted)
- Location · posted · compensation (10.5px, faint)
- Tags (max 3)
- Single red flag (if any)
- CTA: `[ View → ]`

### `emailInsight(vm)`
Recurring "Market Signal" or "Why JobOps picked this" section.
- Section title
- Narrative sentence: "Rust appeared in 42% of today's strong matches"
- Your level vs market demand (two-column)
- CTA: `[ Explore skill gap → ]` or `[ See why → ]`

### `emailOutreach(vm)`
Companies with relevant roles:
- Company name
- Role count
- 3 LinkedIn search links
- No cards — just hairline-separated rows

### `emailActionList(vm.actions)`
Numbered "Your move" list:
```
01  Apply to Stripe
    Strongest match today — 9.2/5

02  Review Vercel
    Good role, compensation unclear

03  Learn Rust
    Appeared in 8 of 19 target roles
```
Each links to dashboard action.

### `emailFooter(vm)`
Product identity:
```
JobOps
Your daily job intelligence.

12 jobs analyzed · 3 worth your attention

[ Open dashboard ]  [ Settings ]  [ Unsubscribe ]
```

## CTA principles

| Weak | Strong |
|------|--------|
| `View posting →` | `Apply to Stripe →` |
| `Details` | `Review match →` |
| `View` | `Open job →` |
| `Learn more` | `Explore skill gap →` |

The verb tells the user what happens next.

## "Why JobOps picked this" pattern

Replace generic score with reasoning:

```
WHY JOBOPS PICKED THIS

✓ 94% role fit (React, TypeScript, distributed systems)
✓ Remote — matches your preference
✓ Matches 8 of 9 required skills
✗ Requires AWS certification (you: learning)
```

Or compact:
```
Strong match because your TypeScript/React experience
overlaps with 4 of 5 core requirements.
```

## Pre-implementation checklist

Before writing any email HTML:

1. Identify the **single job** of this email
2. Define the **information hierarchy** (what must be seen vs. what can be linked)
3. Select **one focal element** (hero job, key insight, primary action)
4. Define **primary action** (what should the user do?)
5. **Remove** anything that doesn't support that action
6. Design desktop (600px)
7. Design mobile (stack, full-width CTAs)
8. Test: Gmail (web/app), Outlook (Win/Mac), Apple Mail, Yahoo

## File structure for email systems

```
lib/email/
  tokens.ts         # colors, spacing, typography, radius
  components.ts     # header, stats, hero, row, insight, outreach, actions, footer
  accessibility.ts  # alt text, contrast, ARIA roles, plaintext
  preview.ts        # generate preview HTML for browser testing
  renderer.ts       # compose(viewModel) → { html, text }
```

The renderer becomes compositional, not one large generator.

## Anti-patterns to avoid

- ❌ Multiple cards stacked (dashboard export feel)
- ❌ Gradients, brand color explosions
- ❌ "View" / "Details" / "Learn more" as only CTAs
- ❌ Showing all N jobs in email
- ❌ Generic "Strong match" without reasoning
- ❌ Missing plaintext version
- ❌ No dark-mode handling
- ❌ Images without alt text
- ❌ Fixed px widths on inner tables (use 100%)
- ❌ `div` for layout (use `table role="presentation"`)

## References

- Medium newsletter guidance: scannable sections, prominent links, clear purpose
- CodeRabbit: summary → findings → actionable details → deep links
- Apple Mail / Outlook / Gmail rendering quirks
- WCAG 2.1 AA for email (contrast, focus, semantic structure)