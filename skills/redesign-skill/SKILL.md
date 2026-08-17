---
name: redesign-existing-projects
description: Upgrades existing websites and apps to premium quality. Audits current design, identifies generic AI patterns, and applies high-end design standards without breaking functionality. Works with any CSS framework or vanilla CSS.
---

# Redesign Skill

## How This Works

When applied to an existing project, follow this sequence:

1. **Scan** — Read the codebase. Identify the framework, styling method (Tailwind, vanilla CSS, styled-components, etc.), and current design patterns.
2. **Diagnose** — Run through the audit below. List every generic pattern, weak point, and missing state you find.
3. **Fix** — Apply targeted upgrades working with the existing stack. Do not rewrite from scratch. Improve what's there.

## Design Audit

### Typography

Check for these problems and fix them:

- **Browser default fonts or Inter everywhere.** Replace with a font that has character. Good options: `Geist`, `Outfit`, `Cabinet Grotesk`, `Satoshi`. For editorial/creative projects, pair a serif header with a sans-serif body.
- **Headlines lack presence.** Increase size for display text, tighten letter-spacing, reduce line-height. Headlines should feel heavy and intentional.
- **Body text too wide.** Limit paragraph width to roughly 65 characters. Increase line-height for readability.
- **Only Regular (400) and Bold (700) weights used.** Introduce Medium (500) and SemiBold (600) for more subtle hierarchy.
- **Numbers in proportional font.** Use a monospace font or enable tabular figures (`font-variant-numeric: tabular-nums`) for data-heavy interfaces.
- **Missing letter-spacing adjustments.** Use negative tracking for large headers, positive tracking for small caps or labels.
- **All-caps subheaders everywhere.** Try lowercase italics, sentence case, or small-caps instead.
- **Orphaned words.** Single words sitting alone on the last line. Fix with `text-wrap: balance` or `text-wrap: pretty`.

### Color and Surfaces

- **Pure `#000000` background.** Replace with off-black, dark charcoal, or tinted dark (`#0a0a0a`, `#121212`, or a dark navy).
- **Oversaturated accent colors.** Keep saturation below 80%. Desaturate accents so they blend with neutrals instead of screaming.
- **More than one accent color.** Pick one. Remove the rest. Consistency beats variety.
- **Mixing warm and cool grays.** Stick to one gray family. Tint all grays with a consistent hue (warm or cool, not both).
- **Purple/blue "AI gradient" aesthetic.** This is the most common AI design fingerprint. Replace with neutral bases and a single, considered accent.
- **Generic `box-shadow`.** Tint shadows to match the background hue. Use colored shadows (e.g., dark blue shadow on a blue background) instead of pure black at low opacity.
- **Flat design with zero texture.** Add subtle noise, grain, or micro-patterns to backgrounds. Pure flat vectors feel sterile.
- **Perfectly even gradients.** Break the uniformity with radial gradients, noise overlays, or mesh gradients instead of standard linear 45-degree fades.
- **Inconsistent lighting direction.** Audit all shadows to ensure they suggest a single, consistent light source.
- **Random dark sections in a light mode page (or vice versa).** A single dark-background section breaking an otherwise light page looks like a copy-paste accident. Either commit to a full dark mode or keep a consistent background tone throughout. If contrast is needed, use a slightly darker shade of the same palette — not a sudden jump to `#111` in the middle of a cream page.
- **Empty, flat sections with no visual depth.** Sections that are just text on a plain background feel unfinished. Add high-quality background imagery (blurred, overlaid, or masked), subtle patterns, or ambient gradients. Use reliable placeholder sources like `https://picsum.photos/seed/{name}/1920/1080` when real assets are not available. Experiment with background images behind hero sections, feature blocks, or CTAs — even a subtle full-width photo at low opacity adds presence.

### Layout

- **Everything centered and symmetrical.** Break symmetry with offset margins, mixed aspect ratios, or left-aligned headers over centered content.
- **Three equal card columns as feature row.** This is the most generic AI layout. Replace with a 2-column zig-zag, asymmetric grid, horizontal scroll, or masonry layout.
- **Using `height: 100vh` for full-screen sections.** Replace with `min-height: 100dvh` to prevent layout jumping on mobile browsers (iOS Safari viewport bug).
- **Complex flexbox percentage math.** Replace with CSS Grid for reliable multi-column structures.
- **No max-width container.** Add a container constraint (around 1200-1440px) with auto margins so content doesn't stretch edge-to-edge on wide screens.
- **Cards of equal height forced by flexbox.** Allow variable heights or use masonry when content varies in length.
- **Uniform border-radius on everything.** Vary the radius: tighter on inner elements, softer on containers.
- **No overlap or depth.** Elements sit flat next to each other. Use negative margins to create layering and visual depth.
- **Symmetrical vertical padding.** Top and bottom padding are always identical. Adjust optically — bottom padding often needs to be slightly larger.
- **Dashboard always has a left sidebar.** Try top navigation, a floating command menu, or a collapsible panel instead.
- **Missing whitespace.** Double the spacing. Let the design breathe. Dense layouts work for data dashboards, not for marketing pages.
- **Buttons not bottom-aligned in card groups.** When cards have different content lengths, CTAs end up at random heights. Pin buttons to the bottom of each card so they form a clean horizontal line regardless of content above.
- **Feature lists starting at different vertical positions.** In pricing tables or comparison cards, the list of features should start at the same Y position across all columns. Use consistent spacing above the list or fixed-height title/price blocks.
- **Inconsistent vertical rhythm in side-by-side elements.** When placing cards, columns, or panels next to each other, align shared elements (titles, descriptions, prices, buttons) across all items. Misaligned baselines make the layout look broken.
- **Mathematical alignment that looks optically wrong.** Centering by the math doesn't always look centered to the eye. Icons next to text, play buttons in circles, or text in buttons often need 1-2px optical adjustments to feel right.

### Interactivity and States

- **No hover states on buttons.** Add background shift, slight scale, or translate on hover.
- **No active/pressed feedback.** Add a subtle `scale(0.98)` or `translateY(1px)` on press to simulate a physical click.
- **Instant transitions with zero duration.** Add smooth transitions (200-300ms) to all interactive elements.
- **Missing focus ring.** Ensure visible focus indicators for keyboard navigation. This is an accessibility requirement, not optional.
- **No loading states.** Replace generic circular spinners with skeleton loaders that match the layout shape.
- **No empty states.** An empty dashboard showing nothing is a missed opportunity. Design a composed "getting started" view.
- **No error states.** Add clear, inline error messages for forms. Do not use `window.alert()`.
- **Dead links.** Buttons that link to `#`. Either link to real destinations or visually disable them.
- **No indication of current page in navigation.** Style the active nav link differently so users know where they are.
- **Scroll jumping.** Anchor clicks jump instantly. Add `scroll-behavior: smooth`.
- **Animations using `top`, `left`, `width`, `height`.** Switch to `transform` and `opacity` for GPU-accelerated, smooth animation.

### Content

- **Generic names like "John Doe" or "Jane Smith".** Use diverse, realistic-sounding names.
- **Fake round numbers like `99.99%`, `50%`, `$100.00`.** Use organic, messy data: `47.2%`, `$99.00`, `+1 (312) 847-1928`.
- **Placeholder company names like "Acme Corp", "Nexus", "SmartFlow".** Invent contextual, believable brand names.
- **AI copywriting cliches.** Never use "Elevate", "Seamless", "Unleash", "Next-Gen", "Game-changer", "Delve", "Tapestry", or "In the world of...". Write plain, specific language.
- **Exclamation marks in success messages.** Remove them. Be confident, not loud.
- **"Oops!" error messages.** Be direct: "Connection failed. Please try again."
- **Passive voice.** Use active voice: "We couldn't save your changes" instead of "Mistakes were made."
- **All blog post dates identical.** Randomize dates to appear real.
- **Same avatar image for multiple users.** Use unique assets for every distinct person.
- **Lorem Ipsum.** Never use placeholder latin text. Write real draft copy.
- **Title Case On Every Header.** Use sentence case instead.

### Component Patterns

- **Generic card look (border + shadow + white background).** Remove the border, or use only background color, or use only spacing. Cards should exist only when elevation communicates hierarchy.
- **Always one filled button + one ghost button.** Add text links or tertiary styles to reduce visual noise.
- **Pill-shaped "New" and "Beta" badges.** Try square badges, flags, or plain text labels.
- **Accordion FAQ sections.** Use a side-by-side list, searchable help, or inline progressive disclosure.
- **3-card carousel testimonials with dots.** Replace with a masonry wall, embedded social posts, or a single rotating quote.
- **Pricing table with 3 towers.** Highlight the recommended tier with color and emphasis, not just extra height.
- **Modals for everything.** Use inline editing, slide-over panels, or expandable sections instead of popups for simple actions.
- **Avatar circles exclusively.** Try squircles or rounded squares for a less generic look.
- **Light/dark toggle always a sun/moon switch.** Use a dropdown, system preference detection, or integrate it into settings.
- **Footer link farm with 4 columns.** Simplify. Focus on main navigational paths and legally required links.

### Iconography

- **Lucide or Feather icons exclusively.** These are the "default" AI icon choice. Use Phosphor, Heroicons, or a custom set for differentiation.
- **Rocketship for "Launch", shield for "Security".** Replace cliche metaphors with less obvious icons (bolt, fingerprint, spark, vault).
- **Inconsistent stroke widths across icons.** Audit all icons and standardize to one stroke weight.
- **Missing favicon.** Always include a branded favicon.
- **Stock "diverse team" photos.** Use real team photos, candid shots, or a consistent illustration style instead of uncanny stock imagery.

### Code Quality

- **Div soup.** Use semantic HTML: `<nav>`, `<main>`, `<article>`, `<aside>`, `<section>`.
- **Inline styles mixed with CSS classes.** Move all styling to the project's styling system.
- **Hardcoded pixel widths.** Use relative units (`%`, `rem`, `em`, `max-width`) for flexible layouts.
- **Missing alt text on images.** Describe image content for screen readers. Never leave `alt=""` or `alt="image"` on meaningful images.
- **Arbitrary z-index values like `9999`.** Establish a clean z-index scale in the theme/variables.
- **Commented-out dead code.** Remove all debug artifacts before shipping.
- **Import hallucinations.** Check that every import actually exists in `package.json` or the project dependencies.
- **Missing meta tags.** Add proper `<title>`, `description`, `og:image`, and social sharing meta tags.

### Strategic Omissions (What AI Typically Forgets)

- **No legal links.** Add privacy policy and terms of service links in the footer.
- **No "back" navigation.** Dead ends in user flows. Every page needs a way back.
- **No custom 404 page.** Design a helpful, branded "page not found" experience.
- **No form validation.** Add client-side validation for emails, required fields, and format checks.
- **No "skip to content" link.** Essential for keyboard users. Add a hidden skip-link.
- **No cookie consent.** If required by jurisdiction, add a compliant consent banner.

## Upgrade Techniques

When upgrading a project, pull from these high-impact techniques to replace generic patterns:

### Typography Upgrades
- **Variable font animation.** Interpolate weight or width on scroll or hover for text that feels alive.
- **Outlined-to-fill transitions.** Text starts as a stroke outline and fills with color on scroll entry or interaction.
- **Text mask reveals.** Large typography acting as a window to video or animated imagery behind it.

### Layout Upgrades
- **Broken grid / asymmetry.** Elements that deliberately ignore column structure — overlapping, bleeding off-screen, or offset with calculated randomness.
- **Whitespace maximization.** Aggressive use of negative space to force focus on a single element.
- **Parallax card stacks.** Sections that stick and physically stack over each other during scroll.
- **Split-screen scroll.** Two halves of the screen sliding in opposite directions.

### Motion Upgrades
- **Smooth scroll with inertia.** Decouple scrolling from browser defaults for a heavier, cinematic feel.
- **Staggered entry.** Elements cascade in with slight delays, combining Y-axis translation with opacity fade. Never mount everything at once.
- **Spring physics.** Replace linear easing with spring-based motion for a natural, weighty feel on all interactive elements.
- **Scroll-driven reveals.** Content entering through expanding masks, wipes, or draw-on SVG paths tied to scroll progress.

### Surface Upgrades
- **True glassmorphism.** Go beyond `backdrop-filter: blur`. Add a 1px inner border and a subtle inner shadow to simulate edge refraction.
- **Spotlight borders.** Card borders that illuminate dynamically under the cursor.
- **Grain and noise overlays.** A fixed, pointer-events-none overlay with subtle noise to break digital flatness.
- **Colored, tinted shadows.** Shadows that carry the hue of the background rather than using generic black.

## Fix Priority

Apply changes in this order for maximum visual impact with minimum risk:

1. **Font swap** — biggest instant improvement, lowest risk
2. **Color palette cleanup** — remove clashing or oversaturated colors
3. **Hover and active states** — makes the interface feel alive
4. **Layout and spacing** — proper grid, max-width, consistent padding
5. **Replace generic components** — swap cliche patterns for modern alternatives
6. **Add loading, empty, and error states** — makes it feel finished
7. **Polish typography scale and spacing** — the premium final touch

## Product-Quality Pass (for apps and products)

A second, higher-level pass after the design audit. The goal is NOT prettier UI — it is eliminating everything that makes a product feel developer-built instead of polished. This pass is a methodology, not a style. Apply it to app-like surfaces (canvases, editors, dashboards, tools) and to any product that has multi-step flows.

### Feel contract (write this first)

Products that feel different — Excalidraw, Apple, Figma — feel different because every element obeys ONE point of view, not because they execute more rules. Before any audit or fix, write a 3–5 line feel contract:

1. **Temperament in one word** — calm, playful, precise, rugged, hand-made…
2. **What this product believes** — e.g. "the canvas is the product; chrome supports it, never competes."
3. **What it refuses** (anti-goals) — e.g. "no glassmorphism, no bounce, no gradient accents, no generic SaaS chrome."
4. **Two reference products + WHY they feel good** — not as styles to copy, as felt qualities: "Excalidraw feels hand-drawn and forgiving — objects feel physical in the hand." "Apple feels calm and direct — nothing waits, nothing lingers."
5. **Where the feel lives** — the 2–3 contact points that carry the whole personality (stroke language, spring feel, selection behavior, tool dock).

Every subsequent decision must trace back to this contract. When in doubt about any element, ask: *"Would a user who loves the reference product recognize this as the same product?"* If the answer is no, the element breaks the contract — remove it or redesign it. A UI that passes every checklist but has no contract still feels like a developer tool; the contract is what makes it feel *authored*.

### Constraint budget

The constraint IS the identity. Excalidraw is one stroke language and one palette; Apple removes until the essence remains. Define the budget before building:

- One accent color, one radius scale, one icon family, one stroke weight, one motion curve family, one surface language.
- Everything outside the budget is refused by default. Adding a new element to the budget requires a named reason that traces to the feel contract.
- When a section of the UI needs more identity, remove from elsewhere first.

### Fix priority tiers

Prioritize by impact tier, never by what is easiest to fix. Fix all of P0 before touching P2.

- **P0 — broken / confusing:** crashes, dead controls, actions with no feedback, flows that dead-end, states that mislead.
- **P1 — visibly unfinished:** missing empty/loading/error states, buttons that do nothing, layout gaps, placeholder text.
- **P2 — major product-quality improvement:** feedback quality, keyboard support, information hierarchy, responsive behavior.
- **P3 — polish:** typography details, spacing, alignment, micro-interactions.

### Full-state audit (nothing may render as a blank mystery)

Audit every asynchronous or possibly-empty surface. The user must always be able to tell loading / empty / broken apart. Use the lightest appropriate feedback:

- **Instant operation:** no loader at all.
- **Short async operation:** subtle progress indicator.
- **Long operation:** progress or status message with context.
- **Empty state:** explain what the user can do here.
- **Error state:** what happened + a recovery action.
- **Connection state** (collaboration, sync): say it in user language — "connected", "reconnecting", "disconnected" — never developer terms.

### Feedback mechanism selection

- **Direct manipulation** (dragging, resizing, tool selection): visual state on the thing itself. Nothing else.
- **Completed operation** (copied, exported): small contextual status only when useful — "Link copied", "PNG exported". Never generic "Success!".
- **Destructive action:** confirmation ONLY when genuinely dangerous or hard to reverse.
- **Undoable action:** prefer undo over confirmation.
- Not every action becomes a toast. Toasts are for completed operations worth acknowledging; the interface communicates the rest through its own state.

### Information hierarchy (four questions at any moment)

The user should always be able to answer, in order:

1. Where am I?
2. What am I doing?
3. What is selected?
4. What can I do next?

The canvas/content dominates; secondary controls visually recede. Avoid too many borders, shadows, pills, background fills, icons, and redundant labels. Important actions are findable without making everything prominent.

### Keyboard-first

Productivity tools treat the keyboard as a first-class input. Audit:

- Tool activation, Delete/Backspace, Undo/Redo, Copy/Paste, zoom, search, menus, panels.
- Escape consistently exits transient UI states (menus, modals, panels, Present Mode).
- Focus is never trapped; focus management is appropriate for each panel/modal.
- No mouse-only controls where keyboard interaction is expected.
- Shortcut hints are visually consistent.

### First-run and empty-canvas experience

The empty state of a new product is a critical moment. Within seconds the user should understand what the product is, where to start, and where the primary actions live. Prefer lightweight contextual guidance — a subtle empty-state hint, first-use tooltip, keyboard hint — over a giant onboarding tour. Onboarding must disappear naturally once the user starts interacting and must never permanently consume workspace or interrupt the workflow.

### Finish details (the subconscious-finish checklist)

- No layout jump when panels open/close.
- Consistent panel opening direction and close-button location.
- Consistent tooltip timing.
- Selected controls stay visibly selected.
- Disabled controls explain themselves when useful.
- No mysterious blank states.
- No accidental scrollbars, no clipped shadows.
- No text jumping between states, no icon changing size between states.
- No hover state that causes layout movement.
- No inconsistent cursor behavior, no unexpected focus loss.
- No dead controls, no accidental double-click requirements.
- No controls that only work with a mouse where keyboard is expected.

### 10-minute user test

Simulate the core user journey end to end and record each step in the finish gate's journey table (below). At every step ask: would a first-time user understand what just happened? Is there enough feedback? Does anything feel unfinished or slow? Any step answered "yes" blocks the finish gate — fix it, then re-run that step.

Then close your eyes on each core interaction and describe the **feeling**, not the function. "The drag is glued to the cursor" and "the panel lands before the eye asks for it" are feelings that pass. "It works, I guess" and "it snaps, then I wait" are feelings that fail. Compare every felt quality against the feel contract: does this interaction feel like the reference product would feel, or like a dev tool that merely functions?

### Do not overdesign

The product must not become Linear, Notion, Figma, Framer, Apple.com, a glassmorphism dashboard, or a colorful SaaS template. When the product has a core surface (like a canvas), that surface is the product — the chrome supports it, never competes. Often the best improvement is removing something. Prefer less chrome, noise, states, duplicated patterns, borders, and animation, while increasing clarity, feedback, consistency, responsiveness, and confidence.

### Final quality gate

Inspect the result as three people, then run the finish gate below. Ship only when the gate has zero FAILs and all three pass:

- **Designer:** hierarchy and visual consistency.
- **User:** obvious, responsive, forgiving.
- **Engineer:** maintainable, no new layer of duplicated patterns, no unrelated changes in the diff.

### Finish gate (blocking — required before declaring done)

Before reporting completion of any redesign or product-quality pass, output this gate table. **Assertions are not evidence.** Every row must carry evidence; a row without evidence is a FAIL.

Evidence classes:

- `[capture]` — actual screenshot at the stated viewport (Playwright, browser automation, devtools screenshot, `npx playwright screenshot`, etc.)
- `[dom]` — rendered DOM / computed-style inspection (devtools element panel, rendered HTML)
- `[code]` — source inspection with a specific reference (file:line, CSS rule, component)

| # | Check | Result | Evidence |
|---|---|---|---|
| 1 | All 7 viewports render without overflow or horizontal scroll (1440 / 1280 / 1024 / 768 / 640 / 390 / 375) | PASS/FAIL | [capture] |
| 2 | Hierarchy changes per class, not just shrinks (desktop full chrome / tablet reduced chrome / mobile primary-action-first) | PASS/FAIL | [capture] |
| 3 | No surface renders blank: every list/panel/search/trash has empty, loading, and error states as applicable | PASS/FAIL | [dom] per surface |
| 4 | Error states explain what happened + give a recovery action | PASS/FAIL | [dom]/[code] |
| 5 | No P0 (broken/confusing) or P1 (visibly unfinished) issues remain | PASS/FAIL | [code]/[dom] |
| 6 | Feedback matches mechanism (visual state for manipulation, contextual status for completed ops, confirm only for dangerous actions, undo over confirm) | PASS/FAIL | [code] |
| 7 | Keyboard: Escape exits transient states, focus never trapped, no mouse-only controls, shortcut hints consistent | PASS/FAIL | [code]+[dom] |
| 8 | First-run guidance present and self-disappearing (never consumes workspace permanently) | PASS/FAIL | [capture] |
| 9 | `prefers-reduced-motion` respected (no transform-based motion under reduce) | PASS/FAIL | [code] |
| 10 | 10-minute journey executed, every step clean (table below) | PASS/FAIL | per-step result |
| 11 | lint + build (+ tests/typecheck if the project has them) pass | PASS/FAIL | command output |

10-minute journey table — record each step (last column = felt quality vs the feel contract: glued/calm/instant vs laggy/abrupt/ambiguous):

| Step | Understood? | Feedback present? | Unfinished? | Slow? | Feels right? |
|---|---|---|---|---|---|
| Open → understand what the product does | — | — | — | — | — |
| Create canvas → first drawing | — | — | — | — | — |
| Edit (color, move, resize, text) | — | — | — | — | — |
| Undo / redo / multi-select | — | — | — | — | — |
| Search / libraries / panels | — | — | — | — | — |
| Share → copy link | — | — | — | — | — |
| Theme switch / present mode / export | — | — | — | — | — |
| Mobile viewport: repeat a basic interaction | — | — | — | — | — |

Any "yes" in the journey table fails row 10.

Gate rules:

- **Zero FAILs to declare done.** One or more FAILs → fix and re-run the failed rows before reporting completion. A report that says "done" without a gate table is incomplete by definition.
- **No browser tooling available?** State it as the first line of the report: "Visual verification was NOT performed (no browser tooling)." Then downgrade every visual check to [dom]/[code] and let the user decide if that suffices. Never silently skip a [capture] row; never upgrade an evidence class to force a pass.
- The gate runs last, after all fixes; its output is the final section of the report.

### Responsive verification matrix

Test at: 1440, 1280, 1024, 768, 640, 390, 375px. "Does not overflow" is the floor, not the goal. The information hierarchy must change per class, not just shrink:

- **Desktop:** full toolbar and panels.
- **Tablet:** reduce secondary chrome.
- **Mobile:** prioritize the primary action (the canvas/content); a mobile viewport that feels like a squeezed desktop is a failed adaptation.

Per class, verify: tool docks, properties/panels, top bars, menus, modals, canvas interaction, touch hit targets (44px minimum), text editing, and Present Mode.

## Rules

- Work with the existing tech stack. Do not migrate frameworks or styling libraries.
- Do not break existing functionality. Test after every change.
- Before importing any new library, check the project's dependency file first.
- If the project uses Tailwind, check the version (v3 vs v4) before modifying config.
- If the project has no framework, use vanilla CSS.
- Keep changes reviewable and focused. Small, targeted improvements over big rewrites.
