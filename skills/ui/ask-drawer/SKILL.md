---
name: ask-drawer
description: Pattern guide for mobile drawers/sheets: bottom sheets, side drawers, swipe gestures, nested drawers. Load via ui-engineering. Invokes pick-ui-library → recommends Vaul → loads ask-vaul for implementation.
---

# Ask Drawer: Mobile Bottom Sheets, Side Drawers

**When to use:** Mobile-first overlays: filters, actions, navigation, forms, any sheet that slides from bottom/side.


## The Pattern

| Drawer Type | Use When | Key Behaviors |
|-------------|----------|---------------|
| **Bottom Sheet** | Mobile filters, share, actions | Drag handle, snap points (half/full), swipe down dismiss, backdrop |
| **Side Drawer** | Mobile nav, settings panel | Swipe from edge, backdrop, ESC closes, focus trap |
| **Nested Drawer** | Drill-down (category → subcategory) | Stack, back gesture, breadcrumb |


## Quality Checklist

- [ ] **Vaul**: Headless, accessible, gesture-driven, spring physics
- [ ] **Drag handle**: Visual indicator, click/tap toggles
- [ ] **Snap points**: Half (50%), Full (90%), custom percentages
- [ ] **Swipe to dismiss**: Velocity-based, spring back if slow
- [ ] **Backdrop**: Blur + dim, click closes
- [ ] **Focus trap**: Inside drawer, restore on close
- [ ] **Keyboard**: ESC closes, Tab cycles
- [ ] **Animation**: Spring (stiffness: 500, damping: 30), 200ms
- [ ] **Reduced motion**: Instant snap
- [ ] **Safe area**: Respects home indicator, notch
- [ ] **Scroll lock**: Body locked, drawer scrolls independently


## Anti-Patterns

- ❌ Custom div + transform: No gestures, no physics, no accessibility
- ❌ Fixed height: Doesn't adapt to content
- ❌ No drag handle: User doesn't know it's draggable
- ❌ No snap points: Awkward intermediate states
- ❌ No swipe dismiss: Must hunt for close button
- ❌ No focus trap: Keyboard trap
- ❌ Z-index wars: Portal to root
- ❌ Ignores safe area: Content under home indicator


## Implementation Flow

```
User needs mobile drawer/sheet
    │
    ├─► ui-engineering detects "drawer/bottom sheet/side drawer/mobile sheet"
    │
    ├─► pick-ui-library → recommends Vaul
    │
    ├─► load ask-vaul (library skill)
    │
    └─► implement with Vaul + custom composition
```


## Vaul Primitives

```tsx
import { Drawer, DrawerTrigger, DrawerContent, DrawerHeader, DrawerTitle, DrawerDescription, DrawerClose } from 'vaul'

// Bottom Sheet
<Drawer direction="bottom" snapPoints={[0.5, 1]} onOpenChange={setIsOpen}>
  <DrawerTrigger asChild>
    <Button variant="outline">Open Filters</Button>
  </DrawerTrigger>
  <DrawerContent className="rounded-t-2xl">
    <DrawerHeader>
      <DrawerTitle>Filters</DrawerTitle>
      <DrawerDescription>Refine your results</DrawerDescription>
    </DrawerHeader>
    <div className="p-4 space-y-4 max-h-[80vh] overflow-y-auto">
      {/* Content */}
    </div>
  </DrawerContent>
</Drawer>

// Side Drawer (Navigation)
<Drawer direction="right" snapPoints={[1]}>
  <DrawerTrigger asChild>
    <Button variant="ghost" className="md:hidden"><Menu className="h-6 w-6" /></Button>
  </DrawerTrigger>
  <DrawerContent className="w-72 max-w-[85vw]">
    <DrawerHeader className="border-b p-4">
      <DrawerTitle>Menu</DrawerTitle>
    </DrawerHeader>
    <nav className="p-4 space-y-2">
      {/* Navigation links */}
    </nav>
  </DrawerContent>
</Drawer>
```


## Composition Examples

### Filter Bottom Sheet (Linear-style)
```tsx
function FilterDrawer({ filters, onChange, onApply, onReset }) {
  return (
    <Drawer direction="bottom" snapPoints={[0.4, 0.85, 1]}>
      <DrawerTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Filter className="h-4 w-4" />
          Filters
          {Object.values(filters).some(v => v) && <Badge variant="secondary">{activeCount}</Badge>}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="rounded-t-2xl">
        <div className="flex items-center justify-between p-4 border-b">
          <DrawerTitle>Filters</DrawerTitle>
          <Button variant="ghost" size="icon" onClick={onReset} disabled={!hasActiveFilters}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
        <div className="p-4 space-y-6 max-h-[70vh] overflow-y-auto">
          <FilterSection title="Status" options={statusOptions} value={filters.status} onChange={v => onChange('status', v)} />
          <FilterSection title="Assignee" options={assignees} value={filters.assignee} onChange={v => onChange('assignee', v)} multi />
          <FilterSection title="Date Range" render={<DateRangePicker value={filters.dateRange} onChange={v => onChange('dateRange', v)} />} />
        </div>
        <div className="flex gap-2 p-4 border-t">
          <Button variant="outline" className="flex-1" onClick={onReset}>Reset</Button>
          <Button className="flex-1" onClick={onApply}>Apply ({activeCount})</Button>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
```

### Mobile Nav Drawer (Raycast-style)
```tsx
function MobileNavDrawer() {
  const navigation = [
    { href: '/', label: 'Dashboard', icon: Home },
    { href: '/projects', label: 'Projects', icon: Folder },
    { href: '/tasks', label: 'Tasks', icon: CheckSquare },
    { href: '/settings', label: 'Settings', icon: Settings },
  ]

  return (
    <Drawer direction="left" snapPoints={[1]}>
      <DrawerTrigger asChild>
        <Button variant="ghost" className="md:hidden p-2" aria-label="Open menu">
          <Menu className="h-6 w-6" />
        </Button>
      </DrawerTrigger>
      <DrawerContent className="w-72 max-w-[85vw]">
        <DrawerHeader className="flex items-center justify-between p-4 border-b">
          <DrawerTitle>Navigation</DrawerTitle>
          <DrawerClose asChild>
            <Button variant="ghost" size="icon" className="md:hidden"><X className="h-5 w-5" /></Button>
          </DrawerClose>
        </DrawerHeader>
        <nav className="flex-1 overflow-y-auto p-4 space-y-1">
          {navigation.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
              onClick={() => drawer.close()}
            >
              <item.icon className="h-5 w-5" />
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="p-4 border-t">
          <p className="text-xs text-gray-500 text-center">v1.2.3</p>
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


## When to Escalate

| Need | Escalate To |
|------|-------------|
| Form in drawer | `ask-form` + `ask-rhf` |
| Toast on action | `ask-toast` + `ask-sonner` |
| Complex animation | `ask-animation` + `ask-motion` |
