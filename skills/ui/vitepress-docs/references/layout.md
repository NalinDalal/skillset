# Layout Reference

## Page Structure

```
┌─────────────────────────────────────────────────────────────┐
│  NAV BAR (64px, fixed top, z-index: 30)                     │
│  [Logo] [Search ⌘K] [Guide] [Frameworks▾] [API] [Examples] │
│                                         [☀/☾] [GitHub] [⋯] │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  HERO (min-height: calc(100vh - 64px))                      │
│  ┌─────────────────────────┐  ┌──────────────────────────┐  │
│  │  OPEN SOURCE JS LIBRARY │  │                          │  │
│  │                         │  │     Live Demo /          │  │
│  │  Project Name           │  │     Product Screenshot   │  │
│  │  Subtitle line          │  │                          │  │
│  │  Description paragraph  │  │     (aspect-ratio: 3/4)  │  │
│  │                         │  │                          │  │
│  │  [Install] [Docs]       │  │                          │  │
│  │  [Studio]               │  │                          │  │
│  └─────────────────────────┘  └──────────────────────────┘  │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  FEATURES (padding: 96px 24px)                              │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Title      │  │   Title      │  │   Title      │      │
│  │   Description│  │   Description│  │   Description│      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│                                                             │
│  DOCUMENTATION CONTENT (max-width: 768px, centered)         │
│  ├── H2 with top border separator                           │
│  ├── Prose paragraphs                                       │
│  ├── Code blocks (full-width)                               │
│  ├── Code tabs (npm/yarn/pnpm/bun)                          │
│  └── Inline code references                                 │
│                                                             │
├─────────────────────────────────────────────────────────────┤
│  FOOTER (padding: 32px, centered text)                      │
│  designed by [Name], implemented by [Name]                  │
│  © 2026 Company. MIT License.                               │
└─────────────────────────────────────────────────────────────┘
```

## Responsive Breakpoints

| Name | Width | Behavior |
|------|-------|----------|
| Desktop | ≥960px | Sidebar visible, 3-col features, side-by-side hero |
| Tablet | ≥768px | Sidebar collapsed, 2-col features, side-by-side hero |
| Mobile | <768px | No sidebar, 1-col features, stacked hero |

## Key Dimensions

| Element | Desktop | Mobile |
|---------|---------|--------|
| Nav height | 64px | 56px |
| Sidebar width | 272px | — (drawer) |
| Content prose width | 768px | 100% |
| Page max-width | 1440px | 100% |
| Hero min-height | calc(100vh - 64px) | auto |
| Feature card min-height | — | auto |
| Code block max-width | 100% | 100% (scrollable) |

## Grid System

### Feature Cards

```css
.VPFeatures .items {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

@media (max-width: 960px) {
  .VPFeatures .items {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .VPFeatures .items {
    grid-template-columns: 1fr;
  }
}
```

### Hero Layout

```css
.VPHero .main {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 48px;
}

.VPHero .image {
  flex-shrink: 0;
  width: 50%;
}

@media (max-width: 768px) {
  .VPHero .main {
    flex-direction: column;
  }
  .VPHero .image {
    width: 100%;
  }
}
```

## Spacing Rhythm

| Transition | Gap |
|------------|-----|
| Nav to hero top | 0 (hero starts at nav bottom) |
| Hero text sections | 16px between eyebrow/title/subtitle/CTA |
| Hero to features | 96px |
| Between feature cards | 24px |
| Features to content | 96px |
| Between H2 sections | 48px |
| Between H3 sections | 32px |
| Content to footer | 96px |
