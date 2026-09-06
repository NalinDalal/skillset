# Design Tokens

Logo tokens are the bridge between the design system and the logo
system. They define how the logo is used in code, not how it looks in
Figma. Every token has a clear purpose and a single value.

## CSS custom properties

```css
:root {
  /* Logo sizes */
  --logo-size-xs: 16px;
  --logo-size-sm: 24px;
  --logo-size-md: 32px;
  --logo-size-lg: 48px;
  --logo-size-xl: 64px;
  --logo-size-2xl: 128px;

  /* Logo colors (light mode defaults) */
  --logo-color-primary: currentColor;
  --logo-color-muted: currentColor;

  /* Logo spacing (gap between mark and wordmark) */
  --logo-gap-sm: 6px;
  --logo-gap-md: 8px;
  --logo-gap-lg: 12px;
}

/* Dark mode overrides */
@media (prefers-color-scheme: dark) {
  :root {
    --logo-color-primary: currentColor;
    --logo-color-muted: currentColor;
  }
}
```

## JS/TS constants

```typescript
export const logo = {
  sizes: {
    xs: 16,
    sm: 24,
    md: 32,
    lg: 48,
    xl: 64,
    "2xl": 128,
  } as const,

  variants: ["mark", "horizontal", "stacked", "wordmark", "mono"] as const,

  modes: ["light", "dark"] as const,
} as const;

export type LogoVariant = (typeof logo.variants)[number];
export type LogoMode = (typeof logo.modes)[number];
export type LogoSize = keyof typeof logo.sizes;
```

## Tailwind theme extension

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      width: {
        logo: {
          xs: "16px",
          sm: "24px",
          md: "32px",
          lg: "48px",
          xl: "64px",
          "2xl": "128px",
        },
      },
      spacing: {
        "logo-gap-sm": "6px",
        "logo-gap-md": "8px",
        "logo-gap-lg": "12px",
      },
    },
  },
};
```

## Usage rules

1. **Never hardcode logo sizes in components.** Use the tokens. This
   ensures consistent sizing across the product and makes global size
   changes trivial.

2. **Never hardcode logo colors.** Use `currentColor` inheritance or
   the CSS custom properties. This ensures dark mode, theming, and
   custom brand contexts work without component changes.

3. **One token per context.** A header logo uses `--logo-size-lg`. A
   footer logo uses `--logo-size-sm`. A sidebar uses `--logo-size-md`.
   The token names the context, not the pixel value.

4. **Tokens are the contract.** If a logo needs a size not in the
   token system, add the token first, then use it. Do not add ad-hoc
   sizes.

## File location

```
tokens/
  logo.css           # CSS custom properties
  logo.ts            # JS/TS constants
```

Or merged into the project's existing token files. The tokens must be
importable, not hardcoded in components.

## Dark mode tokens

The logo component handles dark mode via the `mode` prop, not via CSS
custom properties. The tokens define the size and spacing system. The
mode prop selects the correct SVG variant.

```tsx
// The component picks the right SVG internally
<Logo mode={isDark ? "dark" : "light"} />
```

Do not use CSS custom properties for light/dark logo selection. The
dark variant may have structural differences (thicker strokes, adjusted
optical alignment) that cannot be achieved with a color swap.
