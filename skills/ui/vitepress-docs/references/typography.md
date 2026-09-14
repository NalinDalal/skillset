# Typography Reference

## Font Families

```css
--vp-font-family-base: "Inter", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji";
--vp-font-family-mono: ui-monospace, "Menlo", "Monaco", "Consolas", "Liberation Mono", "Courier New", monospace;
```

## Type Scale

| Role | Size | Weight | Line Height | Letter Spacing | Transform |
|------|------|--------|-------------|----------------|-----------|
| Eyebrow | 13px | 700 | 1.4 | 0.1em | uppercase |
| Hero Title | 48–56px | 700 | 1.1 | -0.02em | — |
| Hero Subtitle | 24–28px | 400 | 1.4 | -0.005em | — |
| H1 | 32px | 700 | 1.2 | -0.01em | — |
| H2 | 24px | 600 | 1.3 | -0.005em | — |
| H3 | 20px | 600 | 1.4 | 0 | — |
| Body | 16px | 400 | 1.6 | 0 | — |
| Body Small | 14px | 400 | 1.5 | 0 | — |
| Code | 14px (0.875em) | 400 | 1.7 | 0 | — |
| Caption | 13px | 400 | 1.4 | 0 | — |
| Label | 12px | 500 | 1.4 | 0.02em | uppercase |

## Eyebrow Pattern

Used above hero titles to categorize the project:

```css
.hero-eyebrow {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--vp-c-brand-1);
  margin-bottom: 16px;
  line-height: 1.4;
}
```

## Prose Typography

Content sections use standard prose rules:

```css
.vp-doc h1 { font-size: 32px; font-weight: 700; margin-top: 0; }
.vp-doc h2 { font-size: 24px; font-weight: 600; margin-top: 48px; border-top: 1px solid var(--vp-c-divider); padding-top: 24px; }
.vp-doc h3 { font-size: 20px; font-weight: 600; margin-top: 32px; }
.vp-doc p { margin-top: 16px; line-height: 1.6; }
.vp-doc a { color: var(--vp-c-brand-1); text-decoration: underline; text-underline-offset: 2px; }
.vp-doc code { font-family: var(--vp-font-family-mono); font-size: 0.875em; background: var(--vp-c-bg-soft); padding: 2px 6px; border-radius: 4px; }
```

## Code Typography

```css
.vp-code {
  font-family: var(--vp-font-family-mono);
  font-size: 0.875em;
  line-height: 1.7;
  tab-size: 2;
}

/* Syntax highlighting uses Shiki */
/* Light: github-light theme */
/* Dark: github-dark theme */
```

## Responsive Type

| Breakpoint | Hero Title | H1 | H2 |
|------------|-----------|-----|-----|
| Desktop (≥960px) | 56px | 32px | 24px |
| Tablet (≥768px) | 48px | 28px | 22px |
| Mobile (<768px) | 32px | 24px | 20px |
