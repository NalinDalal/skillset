# Logo Variants

A logo system is not one SVG. It is a set of variants that cover every
context the brand appears in. Each variant is designed, not derived.

## The variant set

Every logo ships with all of these. No exceptions.

### 1. Primary mark (icon-only)

The standalone symbol. No text. This is the favicon, the app icon, the
social avatar, the smallest representation of the brand.

**Rules:**
- Works at 16px. If it does not, simplify until it does.
- Occupies 70-85% of the viewBox. Optical padding prevents crowding.
- Single `<g>` wrapper. `currentColor` fill or stroke.
- This is the seed from which all other variants grow.

### 2. Horizontal (mark + wordmark)

Mark on the left, wordmark on the right. The most common layout for
headers, navbars, and email signatures.

**Rules:**
- Mark and wordmark are separate elements, not a single flattened path.
- Gap between mark and wordmark is 25-50% of the mark's width. Not a
  fixed pixel value. Scales with the mark.
- Wordmark uses the brand's primary typeface. If the typeface is not
  available as a web font, convert the wordmark to paths.
- Baseline alignment: the wordmark's optical center aligns with the
  mark's optical center. Not the mathematical center.
- Total width is typically 3-5x the mark height. If it is longer, the
  wordmark is too wide or the gap is too large.

### 3. Stacked (mark above wordmark)

Mark centered above wordmark. Used when horizontal space is constrained
or when the layout demands vertical emphasis.

**Rules:**
- Mark and wordmark center-aligned on the vertical axis.
- Gap between mark and wordmark is 15-30% of the mark height.
- Wordmark is centered beneath the mark. Not left-aligned unless the
  design specifically calls for it.
- Total height is typically 2-4x the mark width.

### 4. Wordmark only

The brand name in type, no symbol. Used in text-heavy contexts, legal
footers, or when the mark is too complex for the space.

**Rules:**
- Uses the brand's primary typeface.
- Letter-spacing is set to the typeface's optical spacing, not CSS
  defaults.
- If the wordmark was converted to paths, ensure the outlines are
  clean and the path count is minimal.
- Must work in a single line at all intended sizes.

### 5. Monochrome

Single color, no fills, stroke only (or filled, no stroke, depending on
the mark). The stress test for readability.

**Rules:**
- One color: `currentColor` or a hardcoded single value.
- If stroke-based: consistent stroke weight, round linecaps and
  linejoins.
- If filled: no strokes. Solid silhouette.
- Must read at 16px in a single color. If it does not, the mark is
  too complex.
- This variant proves the mark works without color. If it only works
  in color, it is not a logo. It is an illustration.

### 6. Light mode (dark mark on light)

The primary presentation. Dark mark on a light background.

**Rules:**
- Mark uses `currentColor` or a dark palette color (typically the
  brand's primary dark: black, near-black, or deep brand color).
- Background is white, off-white, or the brand's light surface color.
- Test on: `#FFFFFF`, `#F8F8F8`, `#F5F5F5`, and the brand's specific
  light background.
- The mark must have sufficient contrast (WCAG AA minimum: 4.5:1
  ratio) against all light backgrounds it will appear on.

### 7. Dark mode (light mark on dark)

The inverse. Light mark on a dark background. Designed, not inverted.

**Rules:**
- Mark uses `currentColor` or a light palette color (white, near-white,
  or light brand accent).
- Background is black, near-black, or the brand's dark surface color.
- Test on: `#000000`, `#111111`, `#1A1A1A`, `#0D1117` (GitHub dark),
  and the brand's specific dark background.
- **Not a CSS `filter: invert(1)`.** Inversion breaks contrast,
  flips optical alignment, and produces muddy colors. Design the dark
  variant separately.
- Some marks need structural adjustments for dark mode: a stroke that
  is too thin on dark backgrounds gets slightly thicker; a fill that
  looks harsh on black gets softened. Design for the background.

## Background testing matrix

Every variant is tested against these backgrounds:

| Background | Hex | Use case |
|---|---|---|
| Pure white | `#FFFFFF` | Default light mode |
| Off white | `#F8F8F8` | Subtle surface |
| Warm white | `#FAFAF5` | Editorial, warm brands |
| Cool gray | `#F0F0F0` | Neutral UI |
| Pure black | `#000000` | Default dark mode |
| Near black | `#111111` | Dark UI surfaces |
| Dark blue | `#0D1117` | GitHub dark, dev tools |
| Dark warm | `#1A1A1A` | Warm dark mode |
| Brand color | (varies) | Marketing materials |

If the mark fails contrast on any of these, adjust the mark's color or
weight for that specific context. A separate variant may be needed.

## Export naming

```
{brand}-mark-light.svg          # Primary mark, light mode
{brand}-mark-dark.svg           # Primary mark, dark mode
{brand}-horizontal-light.svg    # Horizontal, light mode
{brand}-horizontal-dark.svg     # Horizontal, dark mode
{brand}-stacked-light.svg       # Stacked, light mode
{brand}-stacked-dark.svg        # Stacked, dark mode
{brand}-wordmark-light.svg      # Wordmark, light mode
{brand}-wordmark-dark.svg       # Wordmark, dark mode
{brand}-mono.svg                # Monochrome (works on both)
{brand}-mark-favicon.svg        # Optimized for 16-32px
```

All files in a `logo/` directory at the project root.

## Variant generation rules

When generating variants from the primary mark:

1. **Do not redraw.** Scale, reposition, and reflow. The mark's
   proportions are sacred.
2. **Maintain stroke weight** across all variants. A 1.5px stroke in
   the primary mark is 1.5px in every variant.
3. **Recompute optical padding** for each layout. Horizontal needs
   different breathing room than stacked.
4. **Test every variant** at 16px, 32px, 48px, 64px, 128px. The variant
   set is only as strong as its weakest member.
