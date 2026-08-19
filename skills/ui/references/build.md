# Build the screen

## The anti-slop tells (kill every one)

- Purple or blue glow gradients.
- Glowing buttons, oversized rounded cards.
- Three equal feature cards.
- The same five icons as every other AI output.
- Version labels in heroes (V0.6, BETA) unless it is a launch.
- Section-number eyebrows ("001", "01/4").
- Middle dots everywhere, decorative color dots.
- Filler words: Elevate, Seamless, Unleash, Next-Gen, Game-changer.
- Fake names and numbers: John Doe, Acme, 99.99%.
- Scroll cues, hero-bottom strips, mock-humble references.
- Cards in cards, div-fake product UI.
- Inter and Roboto as defaults.

## Hero rules

- Fits the viewport: headline max 2 lines, subtext max 20 words.
- One primary CTA, max one secondary. Nothing under the CTA: no
  taglines, no trust strips, no avatar rows, no feature bullets.
- No pills, fake stats, badges, or tiny logos.
- Banned: centered dark mesh, generic background image.

## Layout rules

- One layout family per section; a family appears once across 8
  sections.
- Max two consecutive image-text splits.
- Grid over flex math. No w-[calc(33%-1rem)] style fractions.
- min-h-[100dvh], never h-screen.
- Bento: as many cells as content, no empty cells, 2-3 cells with real
  visual variation.
- Split headers banned: stack vertically, body at 65ch.
- Sidebars: no multi-level nested scroll.

## Typography discipline

- No 6-line wraps. A headline over 3 lines is a font-size error.
- Eyebrows: max one per 3 sections. Signature style: text-[11px]
  uppercase tracking-[0.18em].
- One copy register across the whole page.
- No em dashes in visible text. Ever.

## Content

- Real words, real numbers, real names.
- Lists over paragraphs. Spec tables become 2-column cards or grouped
  chunks.
- Quotes under 3 lines with name and role.
- No Lorem Ipsum. Placeholder images: picsum with a seed, labeled TODO,
  or generated.

## Icons, imagery, motion

- Icon family: Phosphor, Radix, or Tabler. One family, one stroke
  weight. Lucide only on request.
- Real imagery: hero plus supporting images, even in minimal builds.
  SVG grayscale filters on photos are banned.
- Motion: see the motion skill. Springs, one motion per event, nothing
  loops.
- No external widget dependencies in the first pass: build the core
  first, add libraries only when they earn it.