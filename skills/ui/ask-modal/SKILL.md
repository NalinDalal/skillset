---
name: ask-modal
description: Pattern guide for dialogs, sheets, popovers, menus, selects: when you need any overlay UI. Load via ui-engineering. Invokes pick-ui-library → recommends base-ui → loads ask-base-ui for implementation.
---

# Ask Modal: Dialogs, Sheets, Popovers, Menus, Selects

**When to use:** Any overlay: confirmation dialog, settings sheet, dropdown menu, select, popover, tooltip, hover card.

---

## The Pattern (What Good Looks Like)

| Overlay Type | Use When | Key Behaviors |
|--------------|----------|---------------|
| **Dialog** | Confirmation, forms, critical info | Modal, focus trap, ESC closes, click backdrop closes, return focus to trigger |
| **Sheet** | Mobile-first settings, filters, actions | Slides from bottom (mobile) / side (desktop), draggable handle, backdrop blur |
| **Popover** | Tooltips on steroids, rich content | Non-modal, click outside closes, arrow pointing to trigger |
| **Menu** | Action lists, dropdowns | Keyboard nav (arrows, Enter, ESC), type-ahead, submenus |
| **Select** | Single/multi select, searchable | Native-like UX, groups, disabled options, async load |
| **Hover Card** | Preview on hover (user avatar, link preview) | Delay open/close, follows cursor, dismiss on leave |

---

## Quality Checklist (From Linear/Raycast/Stripe)

- [ ] **Focus management:** Trap in dialog/sheet, restore to trigger on close
- [ ] **Keyboard:** ESC closes, Tab cycles, arrows navigate menus/selects
- [ ] **Backdrop:** Blur + dim, click closes (except nested dialogs)
- [ ] **Animation:** 150ms spring in, 100ms spring out. Scale 0.97→1 + fade.
- [ ] **Reduced motion:** Instant snap, no spring
- [ ] **Portal:** Renders at document root (no stacking context issues)
- [ ] **Nested:** Dialog in dialog works, focus stacks correctly
- [ ] **Scroll lock:** Body scroll locked when modal open
- [ ] **Mobile:** Sheets use bottom sheet pattern, handle drag to dismiss
- [ ] **Form integration:** Dialog/Sheet with form = submit on Enter, validate inline

---

## Anti-Patterns (Slop)

- ❌ Custom div + manual focus handling → Use `base-ui`
- ❌ No focus trap → Accessibility fail
- ❌ No ESC to close → UX fail
- ❌ Click backdrop doesn't close (dialog) → UX fail
- ❌ Animation uses `ease-in-out` or keyframes → Use spring
- ❌ No reduced-motion support → Accessibility fail
- ❌ Z-index wars → Portal to root
- ❌ Select built from `<select>` → Can't style, use base-ui Select

---

## Implementation Flow

```
User needs modal
    │
    ├─► ui-engineering detects "modal/dialog/sheet/popover/menu/select"
    │
    ├─► pick-ui-library → recommends base-ui
    │
    ├─► load ask-base-ui (library skill)
    │
    └─► implement with base-ui primitives + custom composition
```

---

## base-ui Primitives to Use

```tsx
// Dialog
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogClose } from 'base-ui/dialog'

// Sheet (Drawer)
import { Sheet, SheetTrigger, SheetContent, SheetHeader, SheetTitle, SheetDescription, SheetClose } from 'base-ui/sheet'

// Popover
import { Popover, PopoverTrigger, PopoverContent, PopoverArrow } from 'base-ui/popover'

// Menu
import { Menu, MenuTrigger, MenuContent, MenuItem, MenuSeparator, MenuSub, MenuSubTrigger, MenuSubContent } from 'base-ui/menu'

// Select
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem, SelectGroup, SelectLabel, SelectSeparator, SelectScrollUpButton, SelectScrollDownButton } from 'base-ui/select'
```

---

## Composition Examples

### Confirmation Dialog (Linear-style)
```tsx
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
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button variant="destructive" onClick={onConfirm}>Delete</Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}
```

### Mobile Sheet (Raycast-style)
```tsx
function FilterSheet({ filters, onChange }) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline"><FilterIcon className="mr-2 h-4 w-4" />Filters</Button>
      </SheetTrigger>
      <SheetContent className="h-[80vh] sm:h-auto sm:max-w-md">
        <SheetHeader>
          <SheetTitle>Filters</SheetTitle>
          <SheetDescription>Refine your results</SheetDescription>
        </SheetHeader>
        <div className="space-y-4 mt-4 max-h-[60vh] overflow-y-auto">
          {/* Filter components */}
        </div>
        <div className="flex gap-2 mt-4 border-t pt-4">
          <Button variant="outline" className="flex-1" onClick={onReset}>Reset</Button>
          <Button className="flex-1" onClick={onApply}>Apply</Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}
```

---

## When to Escalate

| Need | Escalate To |
|------|-------------|
| Complex form in dialog | `ask-form` + `ask-rhf` |
| Command palette | `ask-command-menu` + `ask-cmdk` |
| Toast on action result | `ask-toast` + `ask-sonner` |
| Motion-heavy transitions | `ask-animation` + `ask-motion` |