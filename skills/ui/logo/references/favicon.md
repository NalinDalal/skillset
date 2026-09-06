# Favicon Generation

A favicon is not a crop of the hero mark. It is a specifically designed
variant that works at extreme small sizes. The favicon is the most-seen
logo in any product. It appears in every browser tab, every bookmark,
every history entry. Treat it with the same care as the primary mark.

## Required files

| File | Size | Format | Where |
|---|---|---|---|
| favicon.ico | 16x16, 32x32 | ICO (multi-size) | Browser tab, bookmarks |
| favicon.svg | 24x24 | SVG | Modern browsers (Chrome, Firefox, Edge) |
| apple-touch-icon.png | 180x180 | PNG | iOS home screen, Safari |
| icon-192.png | 192x192 | PNG | Android Chrome, PWA manifest |
| icon-512.png | 512x512 | PNG | Android splash screen, PWA manifest |
| icon-maskable.png | 512x512 | PNG | Android adaptive icons |

## Favicon mark rules

The favicon mark is not always identical to the primary mark.

**Simplify at small sizes:**
- Remove fine details that vanish below 24px. Thin strokes merge.
  Small gaps close. Subtle curves become blobs.
- Increase stroke weight by 0.5-1px for the favicon variant. What looks
  right at 48px looks thin at 16px.
- Flatten complex shapes. A mark with 5 paths may need to become 2 paths
  for the favicon.
- Test at 16x16 pixels. Not 16px CSS. 16 physical pixels. If it reads
  as the brand, ship it. If it reads as a blob, simplify further.

**Color rules:**
- The favicon uses the brand's primary dark color on white (or vice
  versa for dark mode browsers).
- No gradients. No transparency. Solid fills only.
- The ICO file contains both 16x16 and 32x32. Browsers pick
  automatically.

## SVG favicon

Modern browsers support SVG favicons. They scale perfectly and are
tiny.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
  <title>Brand</title>
  <g fill="currentColor">
    <path d="..." />
  </g>
</svg>
```

**Important:** SVG favicons do not support `currentColor` in all
browsers. Use a hardcoded color for the SVG favicon variant. Test in
Chrome, Firefox, and Edge.

Add to `<head>`:

```html
<link rel="icon" href="/favicon.svg" type="image/svg+xml" />
<link rel="icon" href="/favicon.ico" sizes="32x32" />
```

## Apple touch icon

180x180 PNG. The mark centered on a solid background (brand color or
white).

**Rules:**
- Mark occupies 60-75% of the canvas. Not edge-to-edge.
- Solid background. No gradients, no patterns.
- Export at 1x (180x180). iOS handles scaling.

```html
<link rel="apple-touch-icon" href="/apple-touch-icon.png" />
```

## PWA manifest icons

```json
{
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png",
      "sizes": "512x512",
      "type": "image/png"
    },
    {
      "src": "/icon-maskable.png",
      "sizes": "512x512",
      "type": "image/png",
      "purpose": "maskable"
    }
  ]
}
```

**Maskable icon:** The mark must sit within the safe zone (80% of the
canvas, centered). Outside the safe zone, the OS may crop to a circle,
squircle, or other shape.

**Safe zone layout (512x512):**

```
Canvas: 512x512
Safe zone: 40x40 to 472x472 (80% centered)
Mark area: 108x108 to 404x404 (58% centered, with breathing room)
```

## Generation workflow

1. Start from the primary mark SVG.
2. Simplify for 16px (the favicon variant).
3. Export SVG favicon with hardcoded color.
4. Render PNGs at each required size from the simplified SVG.
5. Combine 16x16 and 32x32 into a multi-size ICO.
6. Generate apple-touch-icon (180x180, solid background).
7. Generate manifest icons (192x192, 512x512, 512x512 maskable).
8. Test every file at its intended size in the target context.

## File naming

```
public/
  favicon.ico
  favicon.svg
  apple-touch-icon.png
  icon-192.png
  icon-512.png
  icon-maskable.png
```

All files in `public/` (or the framework's static asset directory).
Flat structure. No subdirectories. Browsers and OSes expect these files
at predictable paths.

## Verification

After generation, verify:

1. Open the browser tab. Does the favicon read as the brand at 16px?
2. Add to iOS home screen. Does the apple-touch-icon look intentional?
3. Install as PWA. Do all manifest icons render correctly?
4. Test maskable icon on Android. Does the safe zone hold?
5. Check file sizes. Favicon.ico under 10KB. PNGs under 50KB. SVG
   under 500 bytes.
