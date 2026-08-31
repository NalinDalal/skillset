---
name: ask-toast
description: Pattern guide for toasts, notifications, loading states, action toasts. Load via ui-engineering. Invokes pick-ui-library → recommends Sonner → loads ask-sonner for implementation.
---

# Ask Toast: Toasts, Notifications, Loading States

**When to use:** Any transient feedback: success, error, info, warning, loading, promise-based, action buttons, custom content.

---

## The Pattern (What Good Looks Like)

| Toast Type | Use When | Key Behaviors |
|------------|----------|---------------|
| **Plain** | Simple info | Title + optional description, auto-dismiss |
| **Success/Error/Warning/Info** | Semantic feedback | Colored icon, `richColors` for green/red/amber/blue |
| **Loading** | Manual state management | Spinner, update by `id` to success/error |
| **Promise** | Async operations | `toast.promise(promise, { loading, success, error })` |
| **Action** | Undo, retry, view, dismiss | Button in toast, closes unless `preventDefault()` |
| **Custom JSX** | Rich content | `toast(<CustomComponent />)`: keeps shell |
| **Headless** | Design system toast | `toast.custom((t) => <CustomToast {...t} />)`: no styles |

---

## Quality Checklist (From Linear/Raycast/Sonner defaults)

- [ ] **One `<Toaster />` at root**: never per-page, never conditional
- [ ] **`richColors` enabled**: success=green, error=red, not gray
- [ ] **Theme wired**: `theme="system"` or from `next-themes`
- [ ] **Action toasts**: Undo on delete, Retry on error, View on created
- [ ] **Promise toasts**: For all async: loading → success/error auto
- [ ] **Persistent for critical**: `{ duration: Infinity }` for "Saved" confirmations
- [ ] **Stacking**: Multiple toasts stack, gap between, max 3-4 visible
- [ ] **Swipe to dismiss**: Mobile: swipe right/left based on position
- [ ] **Reduced motion**: Instant appear/disappear
- [ ] **No duplicate toasts**: Stable `id` for loading→success flows

---

## Anti-Patterns (Slop)

- ❌ Multiple `<Toaster />` mounted → Duplicates every toast
- ❌ `toast()` called from server action → Client-only, call on client with result
- ❌ No `richColors` → Gray success/error looks broken
- ❌ No theme wiring → Dark mode flashes light toasts
- ❌ Toast behind modal → Move Toaster to document root
- ❌ Tailwind classes ignored → Use `!important` or go headless
- ❌ Loading toast stuck → Promise never resolves, add timeout fallback
- ❌ No action on destructive → "Deleted" without Undo = bad UX

---

## Styling Escalation Ladder (From ask-sonner)

1. **Defaults**: `richColors`, `invert` for theme flip
2. **Inline tweaks**: `toastOptions={{ style }}` on Toaster or per-call
3. **ClassNames on parts**: `classNames: { toast, title, description, actionButton, cancelButton, closeButton }`: needs `!important`
4. **Headless**: `toast.custom((t) => <YourToast {...t} />)`: full control, keeps positioning/stacking/swipe

**Recommendation:** For design system, wrap Sonner in your own `toast()` abstraction using headless.

---

## Implementation Flow

```
User needs toast/notification
    │
    ├─► ui-engineering detects "toast/notification/loading state"
    │
    ├─► pick-ui-library → recommends Sonner
    │
    ├─► load ask-sonner (library skill)
    │
    └─► implement with Sonner + custom headless wrapper
```

---

## Composition Examples

### Promise Toast (Stripe-style)
```tsx
function saveProject(project) {
  toast.promise(
    api.saveProject(project),
    {
      loading: 'Saving…',
      success: (saved) => {
        toast.success('Saved', {
          action: { label: 'View', onClick: () => router.push(`/projects/${saved.id}`) }
        });
      },
      error: (err) => {
        toast.error('Failed to save', {
          action: { label: 'Retry', onClick: () => saveProject(project) }
        });
      }
    }
  );
}
```

### Undo Toast (Linear-style)
```tsx
function deleteItem(id) {
  const toastId = toast.loading('Deleting…');
  api.deleteItem(id)
    .then(() => {
      toast.success('Deleted', {
        id: toastId,
        action: {
          label: 'Undo',
          onClick: (e) => {
            e.preventDefault(); // Keeps toast open
            api.restoreItem(id);
            toast.dismiss(toastId);
          }
        },
        duration: 10000 // Longer for undo window
      });
    })
    .catch(() => {
      toast.error('Failed to delete', { id: toastId });
    });
}
```

### Design System Wrapper (Recommended)
```tsx
// lib/toast.ts
import { toast as sonnerToast, Toaster } from 'sonner';
import { YourToastComponent } from '@/components/ui/YourToast';

export const toast = {
  ...sonnerToast,
  custom: (component) => sonnerToast.custom((t) => <YourToastComponent {...t} component={component} />),
};

export function ToasterProvider() {
  return (
    <Toaster
      theme="system"
      richColors
      classNames={{
        toast: '!rounded-lg !border !border-gray-200 dark:!border-gray-800',
        title: '!font-medium',
        description: '!text-sm !text-gray-600 dark:!text-gray-400',
      }}
      icons={{
        success: <CheckIcon className="h-5 w-5" />,
        error: <XIcon className="h-5 w-5" />,
        warning: <AlertIcon className="h-5 w-5" />,
        info: <InfoIcon className="h-5 w-5" />,
      }}
    />
  );
}
```

---

## When to Escalate

| Need | Escalate To |
|------|-------------|
| Complex loading states | `ask-animation` + `ask-motion` |
| Form submission feedback | `ask-form` + `ask-rhf` |
| Real-time notifications | WebSocket + `ask-toast` |