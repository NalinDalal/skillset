---
name: ask-cmdk
description: Library guide for cmdk: command palette, fuzzy search, keyboard navigation, groups, async loading. Load via ask-command-menu pattern skill.
---

# Ask Cmdk: Command Palette (⌘K)

**When to use:** Global command palette, contextual command menus, search interfaces.

**Package:** `cmdk`

---

## Installation

```bash
npm i cmdk
```

---

## Core Components

```tsx
import {
  Command,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
  CommandLoading,
  CommandSeparator,
  CommandShortcut,
} from 'cmdk'
```

---

## Basic Setup

```tsx
'use client'

import { Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandEmpty } from 'cmdk'
import { useState } from 'react'

interface CommandItem {
  id: string
  label: string
  description?: string
  shortcut?: string
  icon?: React.ReactNode
  action: () => void
  keywords?: string[]
  group?: string
}

export function CommandPalette({ items, isOpen, onClose }: { items: CommandItem[]; isOpen: boolean; onClose: () => void }) {
  const [search, setSearch] = useState('')

  // Simple fuzzy filter
  const filtered = items.filter(item => {
    if (!search) return true
    const terms = search.toLowerCase().split(' ')
    const haystack = `${item.label} ${item.description || ''} ${item.keywords?.join(' ') || ''}`.toLowerCase()
    return terms.every(term => haystack.includes(term))
  })

  // Group by group
  const grouped = filtered.reduce((acc, item) => {
    const group = item.group || 'Commands'
    if (!acc[group]) acc[group] = []
    acc[group].push(item)
    return acc
  }, {} as Record<string, CommandItem[]>)

  return (
    <Command open={isOpen} onOpenChange={onClose}>
      <CommandInput
        placeholder="Search commands…"
        value={search}
        onValueChange={setSearch}
        className="w-full px-3 py-2 text-base outline-none"
        onKeyDown={(e) => { if (e.key === 'Escape') onClose() }}
      />
      <CommandList className="max-h-[400px] overflow-auto">
        {Object.entries(grouped).length === 0 && search ? (
          <CommandEmpty>No commands found</CommandEmpty>
        ) : (
          Object.entries(grouped).map(([groupLabel, commands]) => (
            <CommandGroup key={groupLabel} heading={groupLabel}>
              {commands.map((cmd) => (
                <CommandItem
                  key={cmd.id}
                  onSelect={(e) => {
                    e.preventDefault()
                    cmd.action()
                    onClose()
                  }}
                  className="flex items-center gap-3 px-3 py-2"
                >
                  {cmd.icon && <span className="text-gray-400">{cmd.icon}</span>}
                  <div className="flex-1 text-left">
                    <div className="font-medium">{cmd.label}</div>
                    {cmd.description && <div className="text-sm text-gray-500">{cmd.description}</div>}
                  </div>
                  {cmd.shortcut && (
                    <CommandShortcut>{cmd.shortcut}</CommandShortcut>
                  )}
                </CommandItem>
              ))}
            </CommandGroup>
          ))
        )}
      </CommandList>
    </Command>
  )
}
```

---

## Fuzzy Search with Fuse.js (Better Ranking)

```tsx
import Fuse from 'fuse.js'

const fuse = new Fuse(items, {
  keys: ['label', 'description', 'keywords'],
  threshold: 0.3,
  includeScore: true,
  includeMatches: true,
})

const results = fuse.search(search)
```

---

## Highlight Matches

```tsx
function Highlight({ text, matches }: { text: string; matches?: Fuse.FuseResultMatch[] }) {
  if (!matches || matches.length === 0) return text

  const indices = matches.flatMap(m => m.indices || [])
  indices.sort((a, b) => a[0] - b[0])

  let result = []
  let lastIndex = 0

  for (const [start, end] of indices) {
    if (start > lastIndex) result.push(text.slice(lastIndex, start))
    result.push(<mark key={start} className="bg-yellow-200 dark:bg-yellow-800">{text.slice(start, end + 1)}</mark>)
    lastIndex = end + 1
  }

  if (lastIndex < text.length) result.push(text.slice(lastIndex))
  return result
}
```

---

## Async Loading (Debounced)

```tsx
import { useState, useEffect, useCallback } from 'react'

function AsyncCommandGroup({ loader, label }: { loader: (query: string) => Promise<CommandItem[]>; label: string }) {
  const [items, setItems] = useState<CommandItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  const load = useCallback(
    debounce(async (query: string) => {
      setIsLoading(true)
      try {
        const data = await loader(query)
        setItems(data)
      } finally {
        setIsLoading(false)
      }
    }, 150),
    [loader]
  )

  useEffect(() => {
    if (search) load(search)
  }, [search, load])

  return (
    <CommandGroup heading={label}>
      {isLoading && <CommandLoading>Loading…</CommandLoading>}
      {items.map(cmd => (
        <CommandItem key={cmd.id} onSelect={cmd.action}>{cmd.label}</CommandItem>
      ))}
    </CommandGroup>
  )
}

function debounce(fn: Function, ms: number) {
  let timeoutId: NodeJS.Timeout
  return (...args: any[]) => {
    clearTimeout(timeoutId)
    timeoutId = setTimeout(() => fn(...args), ms)
  }
}
```

---

## Global Keyboard Listener

```tsx
// hooks/useCommandPalette.ts
import { useState, useEffect, useCallback } from 'react'

export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen(p => !p), [])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      // ⌘K / Ctrl+K
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        toggle()
      }
      if (e.key === 'Escape') close()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [toggle, close])

  return { isOpen, open, close, toggle }
}
```

---

## Contextual Commands

```tsx
// In a page component
const contextualItems: CommandItem[] = [
  { id: 'edit', label: 'Edit', shortcut: '⌘E', action: () => openEdit(), group: 'Project' },
  { id: 'duplicate', label: 'Duplicate', action: () => duplicate(), group: 'Project' },
  { id: 'archive', label: 'Archive', action: () => archive(), group: 'Project' },
]

// Merge with global
const allItems = [...globalCommands, ...contextualItems]
```

---

## Recent/History (MRU)

```tsx
// lib/commandHistory.ts
const HISTORY_KEY = 'command-history'
const MAX_HISTORY = 10

export function getRecentCommands(): string[] {
  if (typeof window === 'undefined') return []
  return JSON.parse(localStorage.getItem(HISTORY_KEY) || '[]')
}

export function addToHistory(commandId: string) {
  const history = getRecentCommands()
  const filtered = history.filter(id => id !== commandId)
  const updated = [commandId, ...filtered].slice(0, MAX_HISTORY)
  localStorage.setItem(HISTORY_KEY, JSON.stringify(updated))
}

// In CommandPalette
const recent = getRecentCommands()
const recentItems = items.filter(i => recent.includes(i.id))

{recentItems.length > 0 && (
  <CommandGroup heading="Recent">
    {recentItems.map(cmd => (
      <CommandItem key={cmd.id} onSelect={() => { cmd.action(); addToHistory(cmd.id); onClose() }}>
        {cmd.label}
      </CommandItem>
    ))}
  </CommandGroup>
)}
```

---

## Styling (Tailwind + Headless)

```tsx
// cmdk injects minimal styles: customize via className
<Command className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-[90vw] rounded-xl border bg-white shadow-xl dark:bg-gray-900">
  <CommandInput className="w-full px-4 py-3 text-lg border-b outline-none placeholder:text-gray-400" />
  <CommandList className="max-h-[400px] overflow-auto p-1">
    <CommandGroup heading="Group" className="px-2 py-1 text-xs font-semibold text-gray-500 uppercase" />
    <CommandItem className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 [&[data-selected]]:bg-gray-100 dark:[&[data-selected]]:bg-gray-800" />
  </CommandList>
</Command>
```

---

## Common Issues

| Issue | Fix |
|-------|-----|
| Not opening on ⌘K | Check global listener, ensure no conflicting handlers |
| Items not filtering | Verify fuzzy search logic, check `keywords` field |
| Focus lost on close | `Command` handles this: ensure `onOpenChange` closes properly |
| Async loading flashes | Show `CommandLoading` skeleton, debounce |
| Mobile keyboard issues | `CommandInput` is native input: works on mobile |

---

## Related Skills

- `ask-command-menu`: Pattern guide for command palettes
- `ui-engineering`: Master orchestrator