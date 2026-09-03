---
name: ask-vaul
description: Library guide for Vaul: accessible drawer/sheet component with gestures, snap points, spring physics. Load via ask-drawer pattern skill.
---

# Ask Vaul: Mobile Drawers & Sheets

**When to use:** Bottom sheets, side drawers, mobile navigation, filter panels, any gesture-driven overlay.

**Package:** `vaul`


## Installation

```bash
npm i vaul
```


## Core Components

```tsx
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerClose,
  DrawerOverlay,
} from 'vaul'
```


## Basic Bottom Sheet

```tsx
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from 'vaul'

function BottomSheet() {
  return (
    <Drawer direction="bottom" snapPoints={[0.5, 0.9, 1]}>
      <DrawerTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </DrawerTrigger>
      <DrawerContent className="rounded-t-2xl">
        <DrawerHeader>
          <DrawerTitle>Sheet Title</DrawerTitle>
          <DrawerDescription>Optional description</DrawerDescription>
        </DrawerHeader>
        <div className="p-4 space-y-4">
          {/* Content */}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
```


## Side Drawer (Navigation)

```tsx
function SideDrawer() {
  return (
    <Drawer direction="right" snapPoints={[1]}>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="md:hidden"><Menu className="h-6 w-6" /></Button>
      </DrawerTrigger>
      <DrawerContent className="w-72 max-w-[85vw]">
        <DrawerHeader className="flex items-center justify-between p-4 border-b">
          <DrawerTitle>Menu</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" className="md:hidden"><X className="h-5 w-5" /></Button>
          </DrawerClose>
        </DrawerHeader>
        <nav className="p-4 space-y-1">
          <Link href="/" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
            <Home className="h-5 w-5" /> Dashboard
          </Link>
          <Link href="/projects" className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100">
            <Folder className="h-5 w-5" /> Projects
          </Link>
        </nav>
      </DrawerContent>
    </Drawer>
  )
}
```


## Snap Points Configuration

| Snap Points | Behavior |
|-------------|----------|
| `[0.5, 1]` | Half → Full |
| `[0.3, 0.6, 1]` | Three tiers |
| `[1]` | Full only (side drawers) |
| `[0.4, 0.85]` | Custom percentages |

```tsx
// Half sheet for quick actions
<Drawer direction="bottom" snapPoints={[0.4]}>

// Full height for forms
<Drawer direction="bottom" snapPoints={[1]}>

// Multi-tier for filters
<Drawer direction="bottom" snapPoints={[0.3, 0.6, 1]}>
```


## Custom Handle / Trigger

```tsx
function FilterDrawer() {
  return (
    <Drawer direction="bottom" snapPoints={[0.4, 0.85, 1]}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && <Badge variant="secondary">{count}</Badge>}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="rounded-t-2xl">
        {/* Custom handle area */}
        <div className="flex items-center justify-between px-4 py-3 border-b">
          <DrawerTitle>Filters</DrawerTitle>
          <Button variant="ghost" size="icon" onClick={resetFilters} disabled={!hasActiveFilters}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 space-y-6 max-h-[70vh] overflow-y-auto">
          {/* Filter sections */}
        </div>
        <div className="flex gap-2 p-4 border-t">
          <Button variant="outline" className="flex-1" onClick={resetFilters}>Reset</Button>
          <Button className="flex-1" onClick={applyFilters}>Apply ({activeCount})</Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
```


## Nested Drawers (Drill-down)

```tsx
function NestedCategoryDrawer({ categories, onSelect }) {
  const [stack, setStack] = useState<Category[]>([rootCategory])

  const current = stack[stack.length - 1]

  return (
    <Drawer direction="bottom" snapPoints={[1]}>
      <DrawerContent className="rounded-t-2xl">
        <DrawerHeader className="flex items-center justify-between p-4 border-b">
          <DrawerTitle>{current.name}</DrawerTitle>
          <div className="flex gap-2">
            {stack.length > 1 && (
              <DrawerClose asChild>
                <Button variant="ghost" size="icon" onClick={() => setStack(s => s.slice(0, -1))}>
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              </DrawerClose>
            )}
            <DrawerClose asChild>
              <Button variant="ghost" size="icon"><X className="h-5 w-5" /></Button>
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div className="p-4 space-y-2 max-h-[70vh] overflow-y-auto">
          {current.children?.map((child) => (
            <Button
              key={child.id}
              variant="outline"
              className="w-full justify-between"
              onClick={() => child.children ? setStack(s => [...s, child]) : onSelect(child)}
            >
              {child.name}
              {child.children && <ChevronRight className="h-4 w-4" />}
            </Button>
          ))}
        </div>
      </DrawerContent>
    </Drawer>
  )
}
```


## Form in Drawer

```tsx
function CreateProjectDrawer({ onSuccess }) {
  const form = useForm<ProjectInput>({ resolver: zodResolver(projectSchema) })

  return (
    <Drawer direction="bottom" snapPoints={[0.9, 1]}>
      <DrawerTrigger asChild>
        <Button><Plus className="h-4 w-4 mr-2" />New Project</Button>
      </DrawerTrigger>
      <DrawerContent className="rounded-t-2xl">
        <DrawerHeader>
          <DrawerTitle>New Project</DrawerTitle>
        </DrawerHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-4 max-h-[75vh] overflow-y-auto">
            <FormField name="name" label="Name" />
            <FormField name="description" label="Description" type="textarea" />
            <FormField name="visibility" label="Visibility" type="select" selectOptions={[
              { value: 'private', label: 'Private' },
              { value: 'team', label: 'Team' },
              { value: 'public', label: 'Public' },
            ]} />
            <div className="flex gap-2 pt-4 border-t">
              <Button type="button" variant="outline" className="flex-1" onClick={onClose}>Cancel</Button>
              <Button type="submit" className="flex-1" disabled={form.formState.isSubmitting}>
                {form.formState.isSubmitting ? 'Creating…' : 'Create'}
              </Button>
            </div>
          </form>
        </Form>
      </DrawerContent>
    </Drawer>
  )
}
```


## Drawer Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `direction` | `'bottom' \| 'top' \| 'left' \| 'right'` | `'bottom'` | Drawer direction |
| `snapPoints` | `number[]` | `[1]` | Array of 0-1 percentages |
| `open` | `boolean` | - | Controlled open |
| `onOpenChange` | `(open: boolean) => void` | - | Open change handler |
| `dismissible` | `boolean` | `true` | Allow swipe/backdrop dismiss |
| `snapTo` | `number` | - | Programmatic snap |
| `overscroll` | `boolean` | `false` | Allow overscroll past snap |


## Motion Integration (House-Style)

Vaul uses spring physics internally. For custom animations:

```tsx
import { motion, AnimatePresence } from 'motion/react'

// Vaul handles the drawer animation
// Wrap content for custom enter/exit if needed
<DrawerContent className="rounded-t-2xl">
  <AnimatePresence mode="wait">
    {isOpen && <DrawerContentInner />}
  </AnimatePresence>
</DrawerContent>
```


## Accessibility (Built-in)

- Focus trap inside drawer
- ESC to close
- Backdrop click to close (configurable)
- Focus restore to trigger on close
- ARIA attributes on all elements
- Keyboard navigation (Tab, arrows)


## Common Issues

| Issue | Fix |
|-------|-----|
| Drawer not opening | Check `DrawerTrigger` wraps a button, not a div |
| Snap points not working | Ensure values are 0-1, array not empty |
| Scroll not working | Content must be in `DrawerContent`, not `Drawer` |
| Z-index issues | Vaul portals to body: check global stacking |
| Mobile keyboard covers input | Vaul handles this: ensure `snapPoints` includes full height |
| Gesture conflicts | Set `overscroll={true}` if nested scrollable content |


## Related Skills

- `ui/ask-drawer` - Pattern guide for drawers/sheets
- `ui/ask-base-ui` - Alternative: base-ui Sheet primitive
- `ui/ask-form` - Forms in drawers
- `ui/ui-engineering` - Master orchestrator
