---
name: ask-base-ui
description: Library guide for base-ui — unstyled, accessible primitives (Dialog, Sheet, Popover, Menu, Select, Toast, Tooltip, etc.). Load via ask-modal, ask-toast, ask-drawer pattern skills. Implements the pattern with base-ui primitives.
---

# Ask Base-UI — Unstyled Accessible Primitives

**When to use:** Any overlay UI — dialogs, sheets, popovers, menus, selects, tooltips, hover cards, comboboxes, tabs, accordions.

**Package:** `@base-ui-components/react` (or individual packages like `@base-ui-components/dialog`)

---

## Core Philosophy

- **Unstyled** — No CSS, you compose with your design system
- **Accessible** — WAI-ARIA, focus management, keyboard nav built-in
- **Headless** — Logic only, you render the markup
- **Composable** — Slot-based API, full control over rendering

---

## Installation

```bash
npm i @base-ui-components/react
# or individual packages
npm i @base-ui-components/dialog @base-ui-components/select @base-ui-components/popover
```

---

## Primitives Reference

| Primitive | Package | Use For |
|-----------|---------|---------|
| **Dialog** | `@base-ui-components/dialog` | Modals, confirmations, forms |
| **Sheet/Drawer** | `@base-ui-components/sheet` | Bottom sheets, side drawers |
| **Popover** | `@base-ui-components/popover` | Tooltips on steroids, rich popovers |
| **Menu** | `@base-ui-components/menu` | Dropdowns, action menus, context menus |
| **Select** | `@base-ui-components/select` | Single/multi select, searchable, groups |
| **Combobox** | `@base-ui-components/combobox` | Autocomplete, type-ahead select |
| **Tabs** | `@base-ui-components/tabs` | Tab panels, keyboard nav |
| **Accordion** | `@base-ui-components/accordion` | Collapsible sections |
| **Tooltip** | `@base-ui-components/tooltip` | Hover/focus tooltips |
| **Hover Card** | `@base-ui-components/hover-card` | Rich hover previews |
| **Toast** | `@base-ui-components/toast` | Notifications (or use Sonner) |
| **Switch** | `@base-ui-components/switch` | Toggle switches |
| **Slider** | `@base-ui-components/slider` | Range sliders |
| **Date Picker** | `@base-ui-components/date-picker` | Calendar, date range |

---

## Composition Pattern (Design System Wrapper)

**Always wrap base-ui in your own components.** Never use raw primitives in app code.

```tsx
// components/ui/Dialog.tsx
'use client'

import * as DialogPrimitive from '@base-ui-components/dialog'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Dialog = DialogPrimitive.Root
export const DialogTrigger = DialogPrimitive.Trigger
export const DialogPortal = DialogPrimitive.Portal

export const DialogContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof DialogPrimitive.Content>
>(({ className, children, ...props }, ref) => (
  <DialogPortal>
    <DialogPrimitive.Content
      ref={ref}
      className={cn(
        'fixed z-50 w-full max-w-lg rounded-xl bg-white p-6 shadow-xl dark:bg-gray-900',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95',
        className
      )}
      {...props}
    >
      {children}
      <DialogPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-gray-100 dark[data-[state=open]:bg-gray-800">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
))

export const DialogHeader = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col space-y-1.5 text-center sm:text-left', className)} {...props} />
)

export const DialogTitle = React.forwardRef<
  HTMLHeadingElement,
  React.ComponentPropsWithoutRef<'h2'>
>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn('text-lg font-semibold leading-none tracking-tight', className)} {...props} />
))

export const DialogDescription = React.forwardRef<
  HTMLParagraphElement,
  React.ComponentPropsWithoutRef<'p'>
>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-gray-500 dark:text-gray-400', className)} {...props} />
))

export const DialogFooter = ({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={cn('flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2', className)} {...props} />
)
```

---

## Dialog Example (Complete)

```tsx
// components/ui/Dialog.tsx (continued)

export const DialogClose = DialogPrimitive.Close

// Usage
function DeleteConfirmation({ onConfirm }) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="text-red-600 hover:bg-red-50">Delete</Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm">
        <DialogHeader>
          <DialogTitle>Delete project</DialogTitle>
          <DialogDescription>
            This action cannot be undone. All data will be permanently removed.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Delete</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
```

---

## Select Example (Complete)

```tsx
// components/ui/Select.tsx
'use client'

import * as SelectPrimitive from '@base-ui-components/select'
import { ChevronDown, Check } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Select = SelectPrimitive.Root
export const SelectGroup = SelectPrimitive.Group
export const SelectValue = SelectPrimitive.Value

export const SelectTrigger = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Trigger>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Trigger
    ref={ref}
    className={cn(
      'flex h-10 w-full items-center justify-between rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm',
      'hover:border-gray-400 focus:border-primary focus:outline-none focus:ring-2 focus:ring-ring',
      'disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  >
    {children}
    <SelectPrimitive.Icon>
      <ChevronDown className="h-4 w-4 opacity-50" />
    </SelectPrimitive.Icon>
  </SelectPrimitive.Trigger>
))

export const SelectContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Content>
>(({ className, children, position = 'popper', ...props }, ref) => (
  <SelectPrimitive.Portal>
    <SelectPrimitive.Content
      ref={ref}
      className={cn(
        'relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-lg border border-gray-200 bg-white p-1 text-sm shadow-lg dark:border-gray-700 dark:bg-gray-900',
        'data-[state=open]:animate-in data-[state=closed]:animate-out',
        'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0',
        'data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2',
        'data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2',
        position === 'popper' && 'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
        className
      )}
      position={position}
      {...props}
    >
      <SelectPrimitive.Viewport className={cn('p-1', position === 'popper' && 'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)]')}>
        {children}
      </SelectPrimitive.Viewport>
    </SelectPrimitive.Content>
  </SelectPrimitive.Portal>
))

export const SelectItem = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Item>
>(({ className, children, ...props }, ref) => (
  <SelectPrimitive.Item
    ref={ref}
    className={cn(
      'relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none',
      'focus:bg-gray-100 focus:text-gray-900 data-[disabled]:pointer-events-none data-[disabled]:opacity-50',
      'data-[highlighted]:bg-gray-100 data-[highlighted]:text-gray-900',
      'dark:focus:bg-gray-800 dark:focus:text-gray-50',
      'dark:data-[highlighted]:bg-gray-800 dark:data-[highlighted]:text-gray-50',
      className
    )}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      <SelectPrimitive.ItemIndicator>
        <Check className="h-4 w-4" />
      </SelectPrimitive.ItemIndicator>
    </span>
    <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
  </SelectPrimitive.Item>
))

export const SelectSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Separator ref={ref} className={cn('-mx-1 my-1 h-px bg-gray-100 dark:bg-gray-800', className)} {...props} />
))

export const SelectLabel = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.Label>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.Label ref={ref} className={cn('px-2 py-1.5 text-sm font-semibold', className)} {...props} />
))

export const SelectScrollUpButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollUpButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollUpButton ref={ref} className={cn('flex cursor-default items-center justify-center py-1', className)} {...props}>
    <ChevronUp className="h-4 w-4" />
  </SelectPrimitive.ScrollUpButton>
))

export const SelectScrollDownButton = React.forwardRef<
  HTMLButtonElement,
  React.ComponentPropsWithoutRef<typeof SelectPrimitive.ScrollDownButton>
>(({ className, ...props }, ref) => (
  <SelectPrimitive.ScrollDownButton ref={ref} className={cn('flex cursor-default items-center justify-center py-1', className)} {...props}>
    <ChevronDown className="h-4 w-4" />
  </SelectPrimitive.ScrollDownButton>
))
```

---

## Sheet/Drawer Example (Mobile)

```tsx
// components/ui/Sheet.tsx
'use client'

import * as SheetPrimitive from '@base-ui-components/sheet'
import { X } from 'lucide-react'
import { cn } from '@/lib/utils'

export const Sheet = SheetPrimitive.Root
export const SheetTrigger = SheetPrimitive.Trigger
export const SheetClose = SheetPrimitive.Close

export const SheetContent = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<typeof SheetPrimitive.Content>
>(({ className, children, side = 'bottom', ...props }, ref) => (
  <SheetPrimitive.Portal>
    <SheetPrimitive.Overlay className={cn(
      'fixed inset-0 z-50 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out',
      'data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0'
    )} />
    <SheetPrimitive.Content
      ref={ref}
      className={cn(
        'fixed z-50 gap-4 bg-white p-6 shadow-lg transition ease-in-out data-[state=open]:animate-in data-[state=closed]:animate-out',
        'dark:bg-gray-900',
        side === 'bottom' && 'bottom-0 left-0 right-0 rounded-t-xl data-[state=closed]:slide-out-to-bottom data-[state=open]:slide-in-from-bottom',
        side === 'right' && 'right-0 top-0 bottom-0 w-72 max-w-[85vw] rounded-l-xl data-[state=closed]:slide-out-to-right data-[state=open]:slide-in-from-right',
        side === 'left' && 'left-0 top-0 bottom-0 w-72 max-w-[85vw] rounded-r-xl data-[state=closed]:slide-out-to-left data-[state=open]:slide-in-from-left',
        className
      )}
      {...props}
    >
      <SheetPrimitive.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
        <X className="h-4 w-4" />
        <span className="sr-only">Close</span>
      </SheetPrimitive.Close>
      {children}
    </SheetPrimitive.Content>
  </SheetPrimitive.Portal>
))

export const SheetHeader = ({ className, ...props }) => (
  <div className={cn('flex flex-col space-y-2', className)} {...props} />
)

export const SheetTitle = React.forwardRef<HTMLHeadingElement, React.ComponentPropsWithoutRef<'h2'>>(({ className, ...props }, ref) => (
  <h2 ref={ref} className={cn('text-lg font-semibold text-gray-900 dark:text-gray-100', className)} {...props} />
))

export const SheetDescription = React.forwardRef<HTMLParagraphElement, React.ComponentPropsWithoutRef<'p'>>(({ className, ...props }, ref) => (
  <p ref={ref} className={cn('text-sm text-gray-500 dark:text-gray-400', className)} {...props} />
))
```

---

## Key Props Quick Reference

### Dialog
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `open` | `boolean` | — | Controlled open state |
| `onOpenChange` | `(open: boolean) => void` | — | Open change handler |
| `modal` | `boolean` | `true` | Focus trap, backdrop click close |

### Select
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `value` | `string` | — | Controlled value |
| `onValueChange` | `(value: string) => void` | — | Change handler |
| `multiple` | `boolean` | `false` | Multi-select |
| `filter` | `(value: string, search: string) => boolean` | — | Custom filter |

### Sheet
| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `side` | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'` | Drawer direction |
| `snapPoints` | `number[]` | `[1]` | Snap percentages (0-1) |

---

## Motion Integration (House-Style)

Wrap with `motion.div` for spring animations:

```tsx
import { motion } from 'motion/react'

<DialogPrimitive.Content
  className="..."
  // Replace with motion for custom springs
>
// Or use AnimatePresence for exit animations
<AnimatePresence>
  {open && <DialogContent />}
</AnimatePresence>
```

---

## Troubleshooting

| Issue | Fix |
|-------|-----|
| Styles not applying | Base-ui is unstyled — you must provide all CSS |
| Focus not trapped | Ensure `DialogPrimitive.Content` is used, not custom div |
| Portal not rendering | Wrap in `DialogPrimitive.Portal` |
| Select not closing | Use `SelectPrimitive.Item` with `onSelect` |
| Z-index issues | All primitives portal to body — check stacking contexts |

---

## Related Skills

- `ask-modal` — Pattern guide for dialogs/sheets/popovers/menus
- `ask-toast` — Pattern guide for toasts (recommends Sonner instead)
- `ask-drawer` — Pattern guide for mobile drawers (recommends Vaul)
- `ui-engineering` — Master orchestrator