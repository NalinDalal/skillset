---
name: ask-form
description: Pattern guide for forms, validation, server actions, submission states. Load via ui-engineering. Invokes pick-ui-library → recommends react-hook-form + zod → loads ask-rhf for implementation.
---

# Ask Form: Forms, Validation, Server Actions

**When to use:** Any form: settings, onboarding, auth, checkout, data entry, filters, search.

---

## The Pattern (What Good Looks Like)

| Form Type | Use When | Key Behaviors |
|-----------|----------|---------------|
| **Simple** | Login, search, quick settings | Client validation, instant feedback |
| **Multi-step** | Onboarding, wizards | Progress, save draft, resume |
| **Server action** | Mutations, creates, updates | Loading state, optimistic UI, error handling |
| **Complex** | Nested fields, arrays, conditionals | Field arrays, watch, dynamic validation |
| **File upload** | Avatars, documents, media | Drag-drop, preview, progress, validation |

---

## Quality Checklist (Linear/Stripe/Raycast)

- [ ] **React Hook Form**: Uncontrolled, performant, minimal re-renders
- [ ] **Zod schema**: Single source of truth for validation (client + server)
- [ ] **Inline validation**: On blur (not on change), show error at field
- [ ] **Submit handling**: Loading state, disabled, prevent double-submit
- [ ] **Server errors**: Map to fields, show at top + inline
- [ ] **Optimistic UI**: Update immediately, rollback on error
- [ ] **Keyboard**: Enter submits (except textarea), Tab navigates
- [ ] **Accessibility**: Labels, `aria-describedby` for errors, `aria-invalid`
- [ ] **Auto-focus**: First error on submit, first field on mount
- [ ] **Dirty tracking**: Warn on leave if unsaved changes
- [ ] **Reset**: Clear errors on change, reset form after success

---

## Anti-Patterns (Slop)

- ❌ Controlled inputs with `useState` per field: Slow, boilerplate
- ❌ No schema: Validation scattered, inconsistent client/server
- ❌ Validate on change: Annoying, shows errors before user finishes
- ❌ No loading state: Double submits, no feedback
- ❌ Server errors only at top: User hunts for field
- ❌ No optimistic UI: Feels slow, no instant feedback
- ❌ `onSubmit` in `<form>` without `preventDefault`: Page reload
- ❌ File upload without preview/progress: Broken UX

---

## Implementation Flow

```
User needs form
    │
    ├─► ui-engineering detects "form/validation/server action"
    │
    ├─► pick-ui-library → recommends react-hook-form + zod
    │
    ├─► load ask-rhf (library skill)
    │
    └─► implement with RHF + Zod + server actions + toast feedback
```

---

## Schema First (Zod)

```tsx
// schemas/project.ts
import { z } from 'zod'

export const projectSchema = z.object({
  name: z.string().min(1, 'Name is required').max(100),
  description: z.string().max(500).optional(),
  visibility: z.enum(['private', 'team', 'public']),
  tags: z.array(z.string()).max(5).optional(),
})

export type ProjectInput = z.infer<typeof projectSchema>
```

---

## Form Component (RHF + Zod + Server Action)

```tsx
// components/forms/ProjectForm.tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { projectSchema, type ProjectInput } from '@/schemas/project'

export function ProjectForm({ initialData, onSuccess }) {
  const form = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    defaultValues: initialData,
    mode: 'onBlur', // Validate on blur
  })

  async function onSubmit(data: ProjectInput) {
    const toastId = toast.loading('Saving…')
    try {
      const result = await api.createProject(data) // Server action
      toast.success('Project created', {
        id: toastId,
        action: { label: 'View', onClick: () => router.push(`/projects/${result.id}`) }
      })
      onSuccess?.(result)
      form.reset()
    } catch (err) {
      toast.error('Failed to create', { id: toastId })
      // Map server errors to fields
      if (err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, messages]) => {
          form.setError(field as keyof ProjectInput, { message: messages[0] })
        })
      }
    }
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <div>
        <label htmlFor="name" className="block text-sm font-medium mb-1">Name</label>
        <input
          id="name"
          {...form.register('name')}
          className={cn('w-full rounded-lg border px-3 py-2', form.formState.errors.name && 'border-red-500 focus:border-red-500')}
        />
        {form.formState.errors.name && (
          <p className="mt-1 text-sm text-red-600" role="alert">{form.formState.errors.name.message}</p>
        )}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium mb-1">Description</label>
        <textarea
          id="description"
          {...form.register('description')}
          rows={3}
          className="w-full rounded-lg border px-3 py-2"
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Visibility</label>
        <select {...form.register('visibility')} className="w-full rounded-lg border px-3 py-2">
          <option value="private">Private</option>
          <option value="team">Team</option>
          <option value="public">Public</option>
        </select>
      </div>

      <div className="flex justify-end gap-2">
        <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
        <Button type="submit" disabled={form.formState.isSubmitting}>
          {form.formState.isSubmitting ? 'Saving…' : 'Create'}
        </Button>
      </div>
    </form>
  )
}
```

---

## Server Action + Optimistic UI (Linear-style)

```tsx
// actions/project.ts
'use server'

import { revalidatePath } from 'next/cache'
import { projectSchema, type ProjectInput } from '@/schemas/project'

export async function createProject(data: ProjectInput) {
  const validated = projectSchema.parse(data)
  const project = await db.project.create({ data: validated })
  revalidatePath('/projects')
  return project
}

export async function updateProject(id: string, data: Partial<ProjectInput>) {
  const validated = projectSchema.partial().parse(data)
  const project = await db.project.update({ where: { id }, data: validated })
  revalidatePath(`/projects/${id}`)
  return project
}
```

---

## Field Array (Dynamic Fields)

```tsx
import { useFieldArray, Controller } from 'react-hook-form'

function TagFieldArray({ control }) {
  const { fields, append, remove } = useFieldArray({ control, name: 'tags' })

  return (
    <div className="space-y-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2">
          <Controller
            name={`tags.${index}`}
            control={control}
            rules={{ required: 'Tag required' }}
            render={({ field }) => (
              <input {...field} className="flex-1 rounded-lg border px-3 py-2" placeholder="Tag" />
            )}
          />
          <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
            <X className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button type="button" variant="outline" onClick={() => append('')}>Add Tag</Button>
    </div>
  )
}
```

---

## When to Escalate

| Need | Escalate To |
|------|-------------|
| Toast on submit | `ask-toast` + `ask-sonner` |
| Modal form | `ask-modal` + `ask-base-ui` |
| Complex validation | Zod refinements, `superRefine` |
| Multi-step wizard | `ask-form` + state machine |