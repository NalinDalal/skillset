# Logo Components

A logo in a codebase is a component, not a raw SVG file. The component
wraps the SVG with props for size, color, variant, and accessibility.

## React component (default)

### Structure

```
components/
  logo/
    index.tsx           # Main component
    variants.tsx         # All SVG variants as inline React elements
    types.ts            # TypeScript types
```

### Types

```typescript
type LogoVariant =
  | "mark"
  | "horizontal"
  | "stacked"
  | "wordmark"
  | "mono";

type LogoMode = "light" | "dark";

type LogoProps = {
  variant?: LogoVariant;
  mode?: LogoMode;
  size?: number | string;
  color?: string;
  className?: string;
  title?: string;
  "aria-hidden"?: boolean;
};
```

### Implementation

```typescript
import { type LogoProps } from "./types";

export function Logo({
  variant = "mark",
  mode = "light",
  size = 24,
  color,
  className,
  title = "Brand Name",
  "aria-hidden": ariaHidden = false,
}: LogoProps) {
  const svgProps = {
    xmlns: "http://www.w3.org/2000/svg",
    viewBox: variant === "horizontal" ? "0 0 120 24" : "0 0 24 24",
    width: size,
    height: size,
    role: ariaHidden ? undefined : "img",
    "aria-hidden": ariaHidden ? "true" : undefined,
    className,
    style: color ? { color } : undefined,
  };

  return (
    <svg {...svgProps}>
      {!ariaHidden && <title>{title}</title>}
      <g fill={variant === "mono" ? "none" : "currentColor"}
         stroke={variant === "mono" ? "currentColor" : "none"}
         strokeWidth={variant === "mono" ? "1.5" : undefined}
         strokeLinecap="round"
         strokeLinejoin="round">
        {variant === "mark" && <MarkPath />}
        {variant === "horizontal" && <HorizontalPath />}
        {variant === "stacked" && <StackedPath />}
        {variant === "wordmark" && <WordmarkPath />}
        {variant === "mono" && <MonoPath />}
      </g>
    </svg>
  );
}
```

### Path components

Each variant has its own path component. These are generated from the
SVG files exported in Phase 3.

```typescript
function MarkPath() {
  return (
    <>
      <path d="M12,2 C6.48,2 2,6.48 2,12 C2,17.52 6.48,22 12,22 ..." />
    </>
  );
}

function HorizontalPath() {
  return (
    <>
      {/* Mark paths */}
      <path d="M2,4 L12,4 L12,20 L2,20 Z" />
      {/* Wordmark paths */}
      <path d="M18,8 L22,8 L22,16 L18,16 Z" />
    </>
  );
}
```

### Usage

```tsx
// Default: mark, light mode, 24px
<Logo />

// Horizontal, dark mode, 48px
<Logo variant="horizontal" mode="dark" size={48} />

// Monochrome, decorative (no accessibility label)
<Logo variant="mono" aria-hidden />

// Custom color
<Logo color="#FF6B00" size={32} />
```

## Vue component

### Structure

```
components/
  Logo.vue
```

### Implementation

```vue
<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :viewBox="viewBox"
    :width="size"
    :height="size"
    :role="ariaHidden ? undefined : 'img'"
    :aria-hidden="ariaHidden ? 'true' : undefined"
    :class="className"
    :style="color ? { color } : undefined"
  >
    <title v-if="!ariaHidden">{{ title }}</title>
    <g
      :fill="variant === 'mono' ? 'none' : 'currentColor'"
      :stroke="variant === 'mono' ? 'currentColor' : 'none'"
      :stroke-width="variant === 'mono' ? 1.5 : undefined"
      stroke-linecap="round"
      stroke-linejoin="round"
    >
      <path v-for="(d, i) in paths" :key="i" :d="d" />
    </g>
  </svg>
</template>

<script setup lang="ts">
import { computed } from "vue";

type LogoVariant = "mark" | "horizontal" | "stacked" | "wordmark" | "mono";
type LogoMode = "light" | "dark";

const props = withDefaults(defineProps<{
  variant?: LogoVariant;
  mode?: LogoMode;
  size?: number | string;
  color?: string;
  className?: string;
  title?: string;
  ariaHidden?: boolean;
}>(), {
  variant: "mark",
  mode: "light",
  size: 24,
  title: "Brand Name",
  ariaHidden: false,
});

const viewBox = computed(() =>
  props.variant === "horizontal" ? "0 0 120 24" : "0 0 24 24"
);

// paths imported from a shared data file
const paths = computed(() => getPaths(props.variant));
</script>
```

## Svelte component

### Structure

```
components/
  Logo.svelte
```

### Implementation

```svelte
<script lang="ts">
  type LogoVariant = "mark" | "horizontal" | "stacked" | "wordmark" | "mono";
  type LogoMode = "light" | "dark";

  export let variant: LogoVariant = "mark";
  export let mode: LogoMode = "light";
  export let size: number | string = 24;
  export let color: string | undefined = undefined;
  export let className: string = "";
  export let title: string = "Brand Name";
  export let ariaHidden: boolean = false;

  $: viewBox = variant === "horizontal" ? "0 0 120 24" : "0 0 24 24";
</script>

<svg
  xmlns="http://www.w3.org/2000/svg"
  {viewBox}
  width={size}
  height={size}
  role={ariaHidden ? undefined : "img"}
  aria-hidden={ariaHidden ? "true" : undefined}
  class={className}
  style={color ? `color: ${color}` : undefined}
>
  {#if !ariaHidden}
    <title>{title}</title>
  {/if}
  <g
    fill={variant === "mono" ? "none" : "currentColor"}
    stroke={variant === "mono" ? "currentColor" : "none"}
    stroke-width={variant === "mono" ? 1.5 : undefined}
    stroke-linecap="round"
    stroke-linejoin="round"
  >
    {#each getPaths(variant) as d}
      <path {d} />
    {/each}
  </g>
</svg>
```

## Component rules

1. **Props, not hardcoding.** Size, color, variant, mode, and
   accessibility are all props. No component should have a hardcoded
   color or size.

2. **currentColor inheritance.** The component does not set a default
   color. It inherits `color` from the parent via `currentColor`. This
   makes dark mode, theming, and custom colors free.

3. **TypeScript types.** Every prop is typed. No `any`. The variant and
   mode props are string literal unions, not `string`.

4. **Default variant is "mark".** The most common use case is the icon.
   The component defaults to it.

5. **aria-hidden prop.** When the logo is decorative (paired with
   visible text), pass `aria-hidden`. The component removes the
   `<title>` and sets the attribute.

6. **No external dependencies.** The logo component has zero npm
   dependencies. It is a pure SVG wrapper.

7. **Shared path data.** Path data lives in a shared file (not
   duplicated across React/Vue/Svelte). The component imports from it.
   Single source of truth.

8. **SSR safe.** No `window`, no `document`, no browser APIs. The
   component renders identically on server and client.
