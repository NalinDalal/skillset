# Component Reference

## Navigation Bar

Fixed top bar with logo, search, links, and dark toggle.

```
┌──────────────────────────────────────────────────────────────────┐
│ [Logo] Search ⌘K   Guide  Frameworks▾  API  Examples  Studio   │
│                                              ☀/☾  [GitHub] [⋯] │
└──────────────────────────────────────────────────────────────────┘
```

**Structure:**
- Left: Logo (with light/dark variants) + site title
- Center: Search bar (DocSearch or local) + main nav links
- Right: Dark/light toggle + social links (GitHub) + overflow menu

**Search:**
```css
.DocSearch-Button {
  border-radius: 8px;
  padding: 6px 12px;
  font-size: 14px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  color: var(--vp-c-text-2);
  transition: border-color 0.25s;
}
```

**Dark Toggle:**
```css
.VPSwitchAppearance {
  width: 40px;
  height: 22px;
  border-radius: 11px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  cursor: pointer;
  transition: background 0.25s, border-color 0.25s;
}
```

## Hero Section

Left text, right visual demo. Eyebrow label above title.

```html
<div class="VPHero has-image">
  <div class="container">
    <div class="main">
      <p class="hero-eyebrow">OPEN SOURCE JS LIBRARY</p>
      <h1 class="heading">
        <span class="name">Project Name</span>
        <span class="text">Subtitle line</span>
      </h1>
      <p class="tagline">Description paragraph</p>
      <div class="actions">
        <a class="VPButton medium brand" href="/guide">Install</a>
        <a class="VPButton medium alt" href="/frameworks">Docs</a>
      </div>
    </div>
    <div class="image">
      <div class="image-container">
        <!-- Demo, screenshot, or animation -->
      </div>
    </div>
  </div>
</div>
```

**Buttons:**
```css
.VPButton {
  display: inline-block;
  padding: 10px 20px;
  font-size: 14px;
  font-weight: 500;
  border-radius: 8px;
  text-decoration: none;
  transition: background 0.25s, border-color 0.25s;
}

.VPButton.brand {
  background: var(--vp-c-brand-3);
  color: var(--vp-c-white);
  border: none;
}

.VPButton.brand:hover {
  background: var(--vp-c-brand-2);
}

.VPButton.alt {
  background: transparent;
  color: var(--vp-c-brand-1);
  border: 1px solid var(--vp-c-brand-1);
}

.VPButton.alt:hover {
  background: var(--vp-c-brand-soft);
}
```

## Feature Cards

3-column grid of linked cards. Minimal design: title + description, no heavy decoration.

```html
<div class="VPFeatures">
  <div class="items">
    <div class="item">
      <a class="VPFeature" href="/css">
        <article class="box">
          <h2 class="title">Feature Title</h2>
          <p class="details">Short description of this feature.</p>
        </article>
      </a>
    </div>
  </div>
</div>
```

**Card styling:**
```css
.VPFeature {
  display: block;
  border-radius: 12px;
  padding: 24px;
  background: var(--vp-c-bg-soft);
  border: 1px solid var(--vp-c-border);
  text-decoration: none;
  color: inherit;
  transition: border-color 0.25s, background 0.25s;
}

.VPFeature:hover {
  border-color: var(--vp-c-brand-1);
  background: var(--vp-c-bg-elv);
}

.VPFeature .title {
  font-size: 16px;
  font-weight: 600;
  margin: 0;
}

.VPFeature .details {
  font-size: 14px;
  color: var(--vp-c-text-2);
  margin-top: 8px;
  line-height: 1.5;
}
```

## Code Blocks

Syntax-highlighted with Shiki. Copy button, language label, optional line numbers.

```html
<div class="language-js vp-adaptive-theme">
  <button title="Copy Code" class="copy"></button>
  <span class="lang">js</span>
  <pre class="shiki vp-code" tabindex="0">
    <code><!-- syntax-highlighted content --></code>
  </pre>
</div>
```

**Styling:**
```css
.vp-code {
  display: block;
  padding: 20px 24px;
  background: var(--vp-c-bg-alt);
  border-radius: 8px;
  font-family: var(--vp-font-family-mono);
  font-size: 0.875em;
  line-height: 1.7;
  overflow-x: auto;
  color: var(--vp-c-text-2);
}

.copy {
  position: absolute;
  top: 12px;
  right: 12px;
  opacity: 0;
  transition: opacity 0.25s;
}

.vp-code:hover .copy {
  opacity: 1;
}
```

## Code Tabs

Tabbed code blocks for package manager commands.

```html
<div class="vp-code-group">
  <div class="tabs">
    <input type="radio" name="group" id="tab-1" checked>
    <label for="tab-1">npm</label>
    <input type="radio" name="group" id="tab-2">
    <label for="tab-2">yarn</label>
    <input type="radio" name="group" id="tab-3">
    <label for="tab-3">pnpm</label>
    <input type="radio" name="group" id="tab-4">
    <label for="tab-4">bun</label>
  </div>
  <div class="blocks">
    <div class="language-bash active">npm i package-name</div>
    <div class="language-bash">yarn add package-name</div>
    <div class="language-bash">pnpm add package-name</div>
    <div class="language-bash">bun add package-name</div>
  </div>
</div>
```

**Tab styling:**
```css
.vp-code-group .tabs {
  display: flex;
  border-bottom: 1px solid var(--vp-c-divider);
  padding: 0 16px;
}

.vp-code-group .tabs label {
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vp-c-text-2);
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: color 0.25s;
}

.vp-code-group .tabs input:checked + label {
  color: var(--vp-c-text-1);
  border-bottom-color: var(--vp-c-brand-1);
}
```

## Sidebar Navigation

Collapsible sections for deep documentation.

```
┌─────────────────────┐
│ Start               │
│   What it is        │
│   Install and usage │
│ Frameworks          │
│   Getting started   │
│   React             │
│   Vue               │
│ Reference           │
│   API               │
│   Examples          │
└─────────────────────┘
```

**Styling:**
```css
.VPSidebar {
  position: fixed;
  top: 64px;
  left: 0;
  bottom: 0;
  width: 272px;
  padding: 24px;
  overflow-y: auto;
  border-right: 1px solid var(--vp-c-divider);
  background: var(--vp-c-bg);
}

.VPSidebarItem .title {
  font-size: 14px;
  font-weight: 600;
  color: var(--vp-c-text-1);
}

.VPSidebarItem .link {
  font-size: 14px;
  color: var(--vp-c-text-2);
  padding: 4px 0;
  display: block;
  text-decoration: none;
}

.VPSidebarItem .link:hover,
.VPSidebarItem .link.active {
  color: var(--vp-c-brand-1);
}
```

## Footer

Simple centered footer.

```html
<footer class="VPFooter">
  <div class="container">
    <p class="message">
      designed by <a href="...">Name</a>, implemented by <a href="...">Name</a>
    </p>
    <p class="copyright">© 2026 Company. MIT License.</p>
  </div>
</footer>
```

**Styling:**
```css
.VPFooter {
  padding: 32px;
  text-align: center;
  border-top: 1px solid var(--vp-c-divider);
}

.VPFooter .message {
  font-size: 14px;
  color: var(--vp-c-text-2);
}

.VPFooter .copyright {
  font-size: 13px;
  color: var(--vp-c-text-3);
  margin-top: 8px;
}
```
