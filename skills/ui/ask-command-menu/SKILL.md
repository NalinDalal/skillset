---
name: ask-command-menu
description: Pattern guide for command palettes (⌘K): fuzzy search, keyboard nav, nested commands, groups, async loading. Load via ui-engineering. Invokes pick-ui-library → recommends cmdk → loads ask-cmdk for implementation.
---

# Ask Command Menu: Command Palette (⌘K)

**When to use:** Global command palette, contextual menus, search interfaces, quick actions, help menus.


## The Pattern

| Feature | Quality Bar |
|---------|-------------|
| **Global shortcut** | ⌘K (Mac) / Ctrl+K (Win) opens everywhere |
| **Fuzzy search** | Matches subsequences, ranks by relevance, highlights matches |
| **Keyboard nav** | ↑↓ select, Enter execute, ESC close, ⌘+number quick select |
| **Groups/Sections** | Commands grouped by category, collapsible |
| **Nested commands** | Sub-menus, breadcrumbs, back navigation |
| **Async loading** | Debounced search, loading skeletons, abort on new query |
| **Keyboard hints** | Show shortcuts next to commands |
| **Recent/history** | MRU at top, persisted |
| **Contextual** | Different commands per route/context |
| **Accessibility** | ARIA combobox, live region for results, focus management |


## Quality Checklist

- [ ] **cmdk**: Headless, accessible, keyboard-first
- [ ] **Global listener**: Single ⌘K handler at app root
- [ ] **Fuzzy matching**: `fuse.js` or cmdk built-in, highlight matches
- [ ] **Command registry**: Centralized, typed, extensible
- [ ] **Loading states**: Skeleton for async groups
- [ ] **Empty state**: "No commands found" + help hint
- [ ] **Close on execute**: Unless command returns `keepOpen: true`
- [ ] **Focus restore**: Return focus to trigger on close
- [ ] **Mobile**: Responsive, touch-friendly (or disable on mobile)


## Anti-Patterns

- ❌ Custom input + manual filtering → Reinventing, accessibility gaps
- ❌ No fuzzy search → Exact match only = frustrating
- ❌ No keyboard hints → Users don't discover shortcuts
- ❌ No groups → Flat list = overwhelming
- ❌ No async support → Blocks UI on search
- ❌ Doesn't close on execute → Lingers awkwardly
- ❌ No focus restore → Keyboard trap
- ❌ No recent/history: Misses power user workflow


## Implementation Flow

```
User needs command palette
    │
    ├─► ui-engineering detects "command palette/⌘K/quick actions"
    │
    ├─► pick-ui-library → recommends cmdk
    │
    ├─► load ask-cmdk (library skill)
    │
    └─► implement with cmdk + command registry + fuzzy search
```


## Command Registry (Centralized, Typed)

```tsx
// lib/commands.ts
export interface Command {
  id: string
  label: string
  description?: string
  shortcut?: string
  icon?: React.ReactNode
  group?: string
  action: () => void | Promise<void>
  keepOpen?: boolean // For nested menus
  keywords?: string[] // Extra search terms
}

export interface CommandGroup {
  id: string
  label: string
  commands: Command[]
  async?: boolean // Load commands on demand
  loader?: () => Promise<Command[]>
}

// Registry: single source of truth
export const commandRegistry: CommandGroup[] = [
  {
    id: 'navigation',
    label: 'Navigation',
    commands: [
      { id: 'dashboard', label: 'Dashboard', shortcut: '⌘H', icon: <Home className="h-4 w-4" />, action: () => router.push('/') },
      { id: 'projects', label: 'Projects', shortcut: '⌘P', icon: <Folder className="h-4 w-4" />, action: () => router.push('/projects') },
      { id: 'settings', label: 'Settings', shortcut: '⌘,', icon: <Settings className="h-4 w-4" />, action: () => router.push('/settings') },
    ],
  },
  {
    id: 'actions',
    label: 'Actions',
    commands: [
      { id: 'new-project', label: 'New Project', shortcut: '⌘N', icon: <Plus className="h-4 w-4" />, action: () => openNewProjectDialog() },
      { id: 'new-task', label: 'New Task', shortcut: '⌘T', icon: <CheckSquare className="h-4 w-4" />, action: () => openNewTaskDialog() },
    ],
  },
  {
    id: 'help',
    label: 'Help',
    commands: [
      { id: 'shortcuts', label: 'Keyboard Shortcuts', shortcut: '⌘/', icon: <Keyboard className="h-4 w-4" />, action: () => openShortcutsDialog() },
      { id: 'docs', label: 'Documentation', icon: <BookOpen className="h-4 w-4" />, action: () => window.open('https://docs.example.com') },
    ],
  },
]
```


## Command Palette Component (cmdk)

```tsx
// components/CommandPalette.tsx
'use client'

import { Command, CommandInput, CommandList, CommandGroup, CommandItem, CommandEmpty, CommandLoading } from 'cmdk'
import { useEffect, useState } from 'react'
import { commandRegistry, CommandGroup as CommandGroupType } from '@/lib/commands'
import { Fuse } from 'fuse.js'

export function CommandPalette({ isOpen, onClose }) {
  const [groups, setGroups] = useState<CommandGroupType[]>(commandRegistry)

  // Fuse for fuzzy search
  const fuse = useMemo(() => new Fuse(
    groups.flatMap(g => g.commands.map(c => ({ ...c, group: g.label }))),
    { keys: ['label', 'description', 'keywords'], threshold: 0.3, includeScore: true }
  ), [groups])

  const filteredGroups = useMemo(() => {
    if (!search) return groups
    const results = fuse.search(search)
    // Group by group label
    const grouped = new Map<string, Command[]>()
    results.forEach(r => {
      const group = r.item.group
      if (!grouped.has(group)) grouped.set(group, [])
      grouped.get(group)!.push(r.item)
    })
    return Array.from(grouped.entries()).map(([label, commands]) => ({ id: label.toLowerCase(), label, commands }))
  }, [search, groups, fuse])

  return (
    <Command open={isOpen} onOpenChange={onClose}>
      <CommandInput
        placeholder="Search commands…"
        className="w-full px-3 py-2 text-base bg-transparent outline-none"
        onKeyDown={(e) => {
          if (e.key === 'Escape') onClose()
        }}
      />
      <CommandList className="max-h-[400px] overflow-auto">
        {filteredGroups.length === 0 && search ? (
          <CommandEmpty>No commands found</CommandEmpty>
        ) : (
          filteredGroups.map((group) => (
            <CommandGroup key={group.id} heading={group.label}>
              {group.commands.map((cmd) => (
                <CommandItem
                  key={cmd.id}
                  onSelect={(e) => {
                    e.preventDefault()
                    cmd.action()
                    if (!cmd.keepOpen) onClose()
                  }}
                  className="flex items-center gap-3 px-3 py-2"
                >
                  {cmd.icon && <span className="text-gray-400">{cmd.icon}</span>}
                  <div className="flex-1 text-left">
                    <div className="font-medium">{highlightMatch(cmd.label, search)}</div>
                    {cmd.description && <div className="text-sm text-gray-500">{cmd.description}</div>}
                  </div>
                  {cmd.shortcut && <kbd className="px-1.5 py-0.5 text-xs bg-gray-100 dark:bg-gray-800 rounded">{cmd.shortcut}</kbd>}
                </CommandItem>
              ))}
            </CommandGroup>
          ))
        )}
      </CommandList>
    </Command>
  )
}

function highlightMatch(text: string, query: string) {
  if (!query) return text
  const parts = text.split(new RegExp(`(${query})`, 'i'))
  return parts.map((part, i) => i % 2 === 1 ? <mark key={i} className="bg-yellow-200 dark:bg-yellow-800">{part}</mark> : part)
}
```


## Global Hook (App Root)

```tsx
// hooks/useCommandPalette.ts
'use client'

import { useState, useEffect, useCallback } from 'react'

export function useCommandPalette() {
  const [isOpen, setIsOpen] = useState(false)

  const open = useCallback(() => setIsOpen(true), [])
  const close = useCallback(() => setIsOpen(false), [])
  const toggle = useCallback(() => setIsOpen(p => !p), [])

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
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


## Contextual Commands (Per Route)

```tsx
// In a project page
const projectCommands: CommandGroup = {
  id: 'project',
  label: 'Project',
  commands: [
    { id: 'edit', label: 'Edit Project', shortcut: '⌘E', action: () => openEditDialog(project) },
    { id: 'duplicate', label: 'Duplicate', action: () => duplicateProject(project.id) },
    { id: 'archive', label: 'Archive', action: () => archiveProject(project.id) },
    { id: 'delete', label: 'Delete', action: () => deleteProject(project.id) },
  ],
}

// Merge with global registry
const allGroups = [...commandRegistry, projectCommands]
```


## When to Escalate

| Need | Escalate To |
|------|-------------|
| Nested sub-menus | `ask-command-menu` recursive groups |
| Async search (API) | `ask-command-menu` + `fuse.js` debounced |
| Command history/MRU | localStorage + `ask-command-menu` |
