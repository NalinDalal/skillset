# Design Tokens

Extracted from iim.smartsquad.io (VitePress warm variant).

## Colors — Light Mode

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#F3EFE8` | Page canvas — warm parchment |
| Background Alt | `#EDE8DF` | Code blocks, secondary surfaces |
| Background Soft | `#E8E3DA` | Subtle surface differentiation |
| Background Elevated | `#ffffff` | Dropdowns, modals, popovers |
| Text Primary | `#2c2c2c` | Headings, body copy |
| Text Secondary | `#5a5a5a` | Descriptions, secondary info |
| Text Muted | `#8a8a8a` | Captions, placeholders |
| Border | `#d4cfc6` | Card borders, input borders |
| Divider | `#e0dbd2` | Section separators |
| Brand Primary | `#3451b2` | Links, active states |
| Brand Hover | `#3a5ccc` | Link hover, focus rings |
| Brand Button | `#5672cd` | CTA button backgrounds |

## Colors — Dark Mode

| Token | Hex | Usage |
|-------|-----|-------|
| Background | `#141313` | Page canvas — deep charcoal |
| Background Alt | `#1a1919` | Code blocks |
| Background Soft | `#1f1e1e` | Subtle surfaces |
| Background Elevated | `#1f1e1e` | Dropdowns, modals |
| Text Primary | `#e8e8e8` | Headings |
| Text Secondary | `#9a9a9a` | Descriptions |
| Text Muted | `#6a6a6a` | Captions |
| Border | `#2e2d2d` | Borders |
| Divider | `#242323` | Separators |
| Brand Primary | `#a8b1ff` | Links (lighter for dark bg) |
| Brand Hover | `#5c73e7` | Hover states |
| Brand Button | `#3e63dd` | CTA backgrounds |

## Semantic Colors

| Name | Light | Dark | Use |
|------|-------|------|-----|
| Success | `#18794e` | `#3dd68c` | Positive feedback |
| Warning | `#915930` | `#f9b44e` | Caution states |
| Danger | `#b8272c` | `#f66f81` | Errors, destructive |
| Info | `#3451b2` | `#a8b1ff` | Informational |

## Spacing

| Name | Value |
|------|-------|
| xs | 4px |
| sm | 8px |
| md | 16px |
| lg | 24px |
| xl | 32px |
| 2xl | 48px |
| 3xl | 64px |
| 4xl | 96px |

## Border Radius

| Element | Value |
|---------|-------|
| Small (badges, tags) | 4px |
| Medium (buttons, inputs) | 8px |
| Large (cards) | 12px |
| XL (code blocks) | 8px |

## Shadows

```css
--vp-shadow-1: 0 1px 2px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06);
--vp-shadow-2: 0 2px 8px rgba(0, 0, 0, 0.08);
--vp-shadow-3: 0 4px 16px rgba(0, 0, 0, 0.12);
```

## Z-Index Scale

| Layer | Value |
|-------|-------|
| Footer | 10 |
| Local nav | 20 |
| Main nav | 30 |
| Layout top | 40 |
| Backdrop | 50 |
| Sidebar | 60 (25 on desktop) |
