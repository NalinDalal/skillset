# SVG Authoring

The technical foundation of every logo. Build the SVG right and
everything downstream (variants, animation, components, favicons) works.
Build it wrong and every downstream step inherits the debt.

## Grid system

Every logo starts on a grid. The grid is not decoration. It is the
coordinate system that makes every variant consistent.

**Base grids:**

| Grid | Use when | Stroke weight |
|---|---|---|
| 24x24 | Simple marks, icons, monograms | 1.5 |
| 48x48 | Complex marks, detailed illustrations | 2 |
| 32x32 | Fallback for favicon sizing | 1.5 |

**Grid rules:**

- Anchor points snap to grid intersections or half-grid points (0.5
  increments).
- Control handles for cubic beziers run along grid lines or 45-degree
  diagonals. No arbitrary angles.
- The mark occupies 70-85% of the grid. The remaining 15-30% is optical
  padding that prevents the mark from touching the viewBox edge.
- Center the mark mathematically first, then adjust optically. The grid
  is the starting point; the eye is the final judge.

## ViewBox

The viewBox defines the coordinate space. Get it wrong and the logo
shifts, scales incorrectly, or has inconsistent spacing across
variants.

**Standard viewBox formulas:**

```
24x24 grid with 10% padding:
viewBox="0 -2.4 24 28.8"

48x48 grid with 12% padding:
viewBox="-5.76 -5.76 59.52 59.52"

Square mark, no padding needed:
viewBox="0 0 24 24"
```

**Rules:**

- Never use `width` and `height` on the `<svg>` element. Let CSS or the
  component control sizing. The viewBox is the only dimension contract.
- Padding is asymmetric when the mark is asymmetric. A mark that sits
  higher needs more bottom padding than top.
- Test the viewBox by rendering at 16px, 32px, 64px, 128px, 256px. If
  the mark shifts or gets clipped, adjust the viewBox.

## Path construction

The mark is built from paths. Clean paths make clean SVGs.

**Cubic bezier rules:**

- Anchor points at grid intersections. Control handles at grid lines or
  45-degree diagonals.
- Minimum anchor points. Every unnecessary point is a potential wobble.
  A circle is 4 cubic arcs, not 8.
- Smooth curves: control handles are collinear and equal length on both
  sides of the anchor. This prevents cusps.
- Sharp corners: break handle collinearity. Use `L` (line-to) for
  straight edges, not cubic beziers with collapsed handles.

**Common shapes as optimized paths:**

Circle (radius r, center cx, cy):
```
M cx-r,cy
A r,r 0 1,1 cx+r,cy
A r,r 0 1,1 cx-r,cy
Z
```

Rounded rectangle (width w, height h, radius r):
```
M x+r,y
H x+w-r
Q x+w,y x+w,y+r
V y+h-r
Q x+w,y+h x+w-r,y+h
H x+r
Q x,y+h x,y+h-r
V y+r
Q x,y x+r,y
Z
```

Arrow (pointing right, from origin):
```
M 4,12 L 16,12 L 16,8 L 22,12 L 16,16 L 16,12
```

**Coordinate precision:**

- Round to 1 decimal place. `M 12.0 4.5` not `M 12.0000001 4.4999998`.
- Integers where possible: `L 24 0` not `L 24.0 0.0`.
- SVGO handles further rounding. Do not round below 1 decimal manually.

## Structure

The SVG markup follows a consistent structure for every logo.

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img">
  <title>Brand Name</title>
  <g fill="currentColor">
    <path d="..." />
    <path d="..." />
  </g>
</svg>
```

**Rules:**

- Single `<g>` wrapping all paths. No nested groups unless animation
  requires separate targets.
- `fill="currentColor"` on the `<g>`, not on individual paths, unless
  paths have different fill behaviors.
- `stroke` on the `<g>` for stroke-based marks. Consistent `stroke-width`
  and `stroke-linecap="round" stroke-linejoin="round"`.
- No `transform` on paths. Build the mark at its final position in the
  coordinate system. Transforms make the viewBox lie.
- No `<defs>` unless the mark uses gradients (banned) or clip paths
  (rare). No `<use>` for logos. No `<symbol>` for logos.
- No `id` attributes unless animation targets them. Remove auto-generated
  IDs.
- `xmlns="http://www.w3.org/2000/svg"` on every SVG. Always.

## Optimization

Before any logo ships, it runs through optimization. Manual first, then
automated.

**Manual cleanup:**

1. Remove hidden elements: `display: none`, `visibility: hidden`,
   `opacity: 0`. If it is invisible, it does not exist.
2. Remove empty groups, empty paths, empty `<defs>`.
3. Remove metadata: `<metadata>`, `<title>` (keep only the accessibility
   `<title>`), `<desc>`, editor comments.
4. Remove `xmlns:xlink` if not used. Remove unused namespace
   declarations.
5. Merge paths with the same fill/stroke into a single `<path>` where
   possible. One `<path>` is cheaper than five.
6. Convert shapes to paths: `<circle>`, `<rect>`, `<ellipse>`,
   `<polygon>` to `<path>`. Consistent representation.
7. Simplify paths: reduce anchor points while preserving the shape.
   Remove points that contribute less than 0.5px of deviation.

**SVGO configuration:**

```json
{
  "plugins": [
    "removeDimensions",
    "removeViewBox": false,
    "removeTitle": false,
    "removeDesc": false,
    "removeMetadata": true,
    "removeUselessDefs": true,
    "removeEmptyAttrs": true,
    "removeHiddenElems": true,
    "collapseGroups": true,
    "convertShapeToPath": true,
    "roundPaths": true,
    "precision": 1,
    "multipass": true
  ]
}
```

Run: `npx svgo --config svgo.config.json input.svg -o output.svg`

**Size budget:**

- Simple mark (icon): under 500 bytes gzipped.
- Mark + wordmark: under 1KB gzipped.
- Animated mark: under 2KB gzipped.
- If it exceeds the budget, simplify until it fits.

## Accessibility

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img">
  <title>Brand Name</title>
  <g fill="currentColor">
    <path d="..." />
  </g>
</svg>
```

- `<title>` contains the brand name. Not a description. Not "logo".
  The brand name.
- `role="img"` on the `<svg>` element.
- If the logo is purely decorative (paired with visible text nearby),
  add `aria-hidden="true"` instead.
- Do not put the brand name in both `<title>` and visible text. One
  source of truth.

## Testing matrix

Every logo SVG is tested at these sizes before shipping:

| Size | Where it appears | What to check |
|---|---|---|
| 16px | Favicon, browser tab | Reads as the brand, not a blob |
| 24px | Inline icon, button | Clear shape, correct weight |
| 32px | App icon (small) | Details visible |
| 48px | Navigation, header | Full detail, correct proportions |
| 64px | Card, sidebar | Comfortable viewing |
| 128px | Hero, splash | Premium feel, no rough edges |
| 256px | Print, large display | Every path smooth, no artifacts |

Test by rendering the SVG at each size in the target browser. If any
size fails, adjust the mark until all sizes pass.
