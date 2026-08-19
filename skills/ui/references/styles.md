# Style recipes

Only when explicitly asked. The default is always the clean Apple/Google
look from the main skill.

## Minimalist

- Type: SF Pro Display, Geist, or Helvetica Neue for body. Editorial
  serif for heroes and quotes with tracking -0.02em to -0.04em, leading
  1.1. Mono for labels.
- Colors: white or warm off-white canvas, near-black text, 1px light
  dividers. Pastel accents only: pale red, pale blue, pale green, pale
  yellow, each with dark readable text.
- Radius: 8px max, 12px for cards. No pill containers.
- Buttons: near-black fill, white text, radius 4-6px, no shadow, hover
  darkens or scales to 0.98.
- Borders: 1px solid #EAEAEA everywhere. No shadow-md and above.
- Layout: asymmetric grid, bento, generous py-24 to py-32 whitespace.
- Motion: fade-up 12px over 600ms with ease-out spring, stagger 80ms,
  hover shadow at 2px 8px and 0.04 opacity.
- Bans: gradients, neon, glassmorphism, rounded-full containers, emojis,
  cliche copy.

## Brutalist

Two archetypes, pick one, never mix.

Swiss Industrial Print: off-white substrate, heavy sans uppercase
(Archivo Black, Monument Extended), visible 1px grid lines,
viewport-bleeding numerals, one harvest red accent. Zero radius.
clamp() type at extreme scale.

Tactical Telemetry: dark exclusive, mono dominance (JetBrains Mono, IBM
Plex Mono), tabular data, ASCII framing, crosshairs, phosphor glow,
scanlines, low bit depth. Terminal green for one element max.

- Color: one substrate. Light: #F4F4F0 canvas with near-black text and
  red accent. Dark: #0A0A0A or #121212, never pure black.
- Layout: strict grid anchoring, 1px or 2px solid borders, full-width
  rules, bimodal density, zero border radius.
- Effects: halftone and dithering, CRT scanlines, low-opacity noise.
- Bans: gradients, shadows, translucency.