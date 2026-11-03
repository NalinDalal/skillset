# WHY.md: why html-ppt is owned for DriftLock

> DriftLock is a client-facing devtool; its pitch deck must look bought, not generated. This curation locks the driftlock brand (ink #0a0a0f, emerald #10b981) and a reusable driftlock theme so every deck shipped for DriftLock is on-brand and eye-catching.

## What I changed

- Overlaid `assets/themes/driftlock.css`: ink/emerald/red/amber token theme tuned to the driftlock homepage aesthetic.
- Overlaid `SKILL.md`: added a "DriftLock usage" block (which template, which theme, where the deck lives) so future agents don't re-derive it.
- Did not touch: base.css, runtime.js, animations, scripts. Upstream improvements there still land on the next sync.

## How I like things

- Dark ink background with emerald signal — premium devtool, not corporate purple slop.
- Mono type (JetBrains Mono) for code/diff moments, serif or clean sans for headlines.
- One accent color (emerald) + red (broken) + amber (detected); never more.
- Slides must show real UI / real diffs, never abstract filler — matches the brag creative law "Show the thing."

## Why these changes matter to my codebase

- Upstream html-ppt themes are generic (catppuccin, dracula, corporate). None match driftlock's ink/emerald brand, so a deck shipped to a client would look like a template, not like DriftLock.
- The driftlock theme + pitch-deck template combo becomes the single source of truth for investor/client decks.

## Review cadence

- Revisit after each upstream html-ppt sync to confirm `draftlock.css` tokens still override cleanly.
