---
name: ask-rhf
description: Library guide for React Hook Form + Zod: performant forms, validation, server actions, field arrays, TypeScript. Load via ask-form pattern skill.
---

# Ask RHF: React Hook Form + Zod

**When to use:** All forms: simple to complex, server actions, multi-step, file uploads.

**Packages:** `react-hook-form`, `@hookform/resolvers/zod`, `zod`

---

## Installation

```bash
npm i react-hook-form @hookform/resolvers zod
```

---

## Core Setup

```tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'

// Schema (single source of truth)
const schema = z.object({
  name: z.string().min(1, 'Required').max(100),
  email: z.string().email('Invalid email'),
  role: z.enum(['admin', 'member', 'viewer']),
  bio: z.string().max(500).optional(),
  tags: z.array(z.string()).max(5).optional(),
})

type FormData = z.infer<typeof schema>

// Component
export function MyForm({ defaultValues }: { defaultValues?: Partial<FormData> }) {
  const form = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues,
    mode: 'onBlur', // Validate on blur, not onChange
  })

  const onSubmit = async (data: FormData) => {
    // Handle submit
  }

  return (
    <form onSubmit={form.handleSubmit(onSubmit)} noValidate>
      {/* Fields */}
    </form>
  )
}
```

---

## Field Components (Reusable)

```tsx
// components/ui/FormField.tsx
'use client'

import { Controller, ControllerProps, FieldPath, FieldValues, useFormContext } from 'react-hook-form'
import { cn } from '@/lib/utils'
import { Label } from '@/components/ui/Label'
import { Input } from '@/components/ui/Input'
import { Textarea } from '@/components/ui/Textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/Select'

interface FormFieldProps<T extends FieldValues> extends ControllerProps<T> {
  label: string
  description?: string
  type?: 'input' | 'textarea' | 'select' | 'checkbox'
  selectOptions?: { value: string; label: string }[]
}

export function FormField<T extends FieldValues>({
  name,
  label,
  description,
  type = 'input',
  selectOptions,
  className,
  rules,
  ...props
}: FormFieldProps<T>) {
  const { control, formState: { errors } } = useFormContext()
  const error = errors[name as keyof T]

  return (
    <div className={cn('space-y-1.5', className)}>
      <Label htmlFor={name as string}>{label}</Label>
      <Controller
        name={name}
        control={control}
        rules={rules}
        render={({ field: { onChange, onBlur, value, ref, name } }) => {
          const commonProps = {
            id: name,
            onChange,
            onBlur,
            value,
            ref,
            'aria-invalid': error ? 'true' : 'false',
            'aria-describedby': error ? `${name}-error` : description ? `${name}-desc` : undefined,
            className: cn(error && 'border-red-500 focus:border-red-500 focus:ring-red-500'),
            ...props,
          }

          switch (type) {
            case 'textarea':
              return <Textarea {...commonProps} />
            case 'select':
              return (
                <Select onValueChange={onChange} defaultValue={value as string}>
                  <SelectTrigger {...commonProps}>
                    <SelectValue placeholder="Select..." />
                  </SelectTrigger>
                  <SelectContent>
                    {selectOptions?.map(opt => (
                      <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )
            case 'checkbox':
              return (
                <div className="flex items-center gap-2">
                  <input type="checkbox" {...commonProps} className="h-4 w-4 rounded border-gray-300" />
                  <Label htmlFor={name as string}>{label}</Label>
                </div>
              )
            default:
              return <Input {...commonProps} />
          }
        }}
      />
      {description && !error && <p id={`${name}-desc`} className="text-sm text-gray-500">{description}</p>}
      {error && <p id={`${name}-error`} className="text-sm text-red-600" role="alert">{error.message}</p>}
    </div>
  )
}
```

---

## Server Actions + Toast Feedback

```tsx
'use client'

import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { toast } from 'sonner'
import { useRouter } from 'next/navigation'

export function CreateProjectForm() {
  const router = useRouter()
  const form = useForm<ProjectInput>({
    resolver: zodResolver(projectSchema),
    mode: 'onBlur',
  })

  const onSubmit = async (data: ProjectInput) => {
    const toastId = toast.loading('Creating project…')
    try {
      const project = await createProjectAction(data)
      toast.success('Project created', {
        id: toastId,
        action: { label: 'View', onClick: () => router.push(`/projects/${project.id}`) },
      })
      form.reset()
    } catch (err) {
      toast.error('Failed to create', { id: toastId })
      if (err.fieldErrors) {
        Object.entries(err.fieldErrors).forEach(([field, messages]) => {
          form.setError(field as keyof ProjectInput, { message: messages[0] })
        })
      }
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField name="name" label="Project Name" placeholder="My Project" />
        <FormField name="description" label="Description" type="textarea" placeholder="Optional" />
        <FormField name="visibility" label="Visibility" type="select" selectOptions={[
          { value: 'private', label: 'Private' },
          { value: 'team', label: 'Team' },
          { value: 'public', label: 'Public' },
        ]} />
        <div className="flex justify-end gap-2 pt-4">
          <Button type="button" variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit" disabled={form.formState.isSubmitting}>
            {form.formState.isSubmitting ? 'Creating…' : 'Create Project'}
          </Button>
        </div>
      </form>
    </Form>
  )
}
```

---

## Field Arrays (Dynamic Fields)

```tsx
import { useFieldArray, Controller } from 'react-hook-form'

function TagArray({ control }: { control: Control<FormData> }) {
  const { fields, append, remove, move } = useFieldArray({ control, name: 'tags' })

  return (
    <div className="space-y-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex items-center gap-2">
          <Controller
            name={`tags.${index}`}
            control={control}
            rules={{ required: 'Tag required' }}
            render={({ field }) => (
              <Input {...field} placeholder="Tag" className="flex-1" />
            )}
          />
          <Button type="button" variant="ghost" size="icon" onClick={() => remove(index)}>
            <Trash2 className="h-4 w-4 text-red-500" />
          </Button>
          {index > 0 && (
            <Button type="button" variant="ghost" size="icon" onClick={() => move(index, index - 1)}>
              <ChevronUp className="h-4 w-4" />
            </Button>
          )}
          {index < fields.length - 1 && (
            <Button type="button" variant="ghost" size="icon" onClick={() => move(index, index + 1)}>
              <ChevronDown className="h-4 w-4" />
            </Button>
          )}
        </div>
      ))}
      <Button type="button" variant="outline" onClick={() => append('')}>Add Tag</Button>
    </div>
  )
}
```

---

## Watch / Conditional Fields

```tsx
const { watch } = form
const showAdvanced = watch('advancedMode')

return (
  <div>
    <FormField name="advancedMode" label="Advanced" type="checkbox" />
    {showAdvanced && (
      <div className="space-y-4 mt-4 border-t pt-4">
        <FormField name="customDomain" label="Custom Domain" />
        <FormField name="webhookUrl" label="Webhook URL" />
      </div>
    )}
  </div>
)
```

---

## Dirty Tracking + Warn on Leave

```tsx
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'

function FormWithDirtyCheck() {
  const form = useForm({ mode: 'onBlur' })
  const isDirty = form.formState.isDirty

  useEffect(() => {
    function handleBeforeUnload(e: BeforeUnloadEvent) {
      if (isDirty) {
        e.preventDefault()
        e.returnValue = ''
      }
    }
    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [isDirty])

  // ...
}
```

---

## File Upload

```tsx
import { useState } from 'react'

function FileUpload({ control, name, label }: { control: Control<FormData>; name: string; label: string }) {
  const [preview, setPreview] = useState<string | null>(null)

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="space-y-2">
          <Label>{label}</Label>
          <div className="border-2 border-dashed rounded-lg p-6 text-center hover:border-primary transition-colors">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              id={name}
              ref={field.ref}
              onChange={(e) => {
                const file = e.target.files?.[0]
                if (file) {
                  field.onChange(file)
                  const reader = new FileReader()
                  reader.onloadend = () => setPreview(reader.result as string)
                  reader.readAsDataURL(file)
                }
              }}
            />
            <label htmlFor={name} className="cursor-pointer">
              <Upload className="mx-auto h-10 w-10 text-gray-400" />
              <p className="mt-2 text-sm text-gray-600">Click or drag to upload</p>
            </label>
          </div>
          {preview && (
            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
              <Button type="button" variant="destructive" size="icon" className="absolute -top-2 -right-2" onClick={() => { field.onChange(undefined); setPreview(null) }}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      )}
    />
  )
}
```

---

## TypeScript: FormProvider Context

```tsx
// Form wrapper with typed context
import { FormProvider, useForm } from 'react-hook-form'

export function Form<T extends FieldValues>({
  children,
  ...props
}: React.ComponentPropsWithoutRef<'form'> & { resolver: Resolver<T>; defaultValues?: T }) {
  const methods = useForm<T>(props)
  return <FormProvider {...methods}><form {...props}>{children}</form></FormProvider>
}

// Usage
<Form resolver={zodResolver(schema)} defaultValues={defaults}>
  <FormField name="name" label="Name" />
</Form>
```

---

## Common Patterns

| Pattern | Implementation |
|---------|----------------|
| Debounced validation | `mode: 'onBlur'` + `debounce` in `onChange` |
| Dependent fields | `watch()` + conditional rendering |
| Cross-field validation | `superRefine` in Zod schema |
| Async validation | `refine` with async in Zod |
| Reset after submit | `form.reset()` in `onSubmit` success |
| Prefill from server | `defaultValues` from server data |

---

## Related Skills

- `ui/ask-form` - Pattern guide for forms
- `ui/ask-toast` - Toast feedback on submit
- `ui/ask-modal` - Form in dialog
- `ui/ui-engineering` - Master orchestrator