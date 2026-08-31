---
name: ask-virtual-list
description: Pattern guide for virtualized lists: infinite scroll, variable heights, dynamic content, smooth scrolling. Load via ui-engineering. Invokes pick-ui-library → recommends Virtuoso → loads ask-virtuoso for implementation.
---

# Ask Virtual List: Infinite Scroll, Variable Heights, Smooth Performance

**When to use:** Long lists: feeds, chat, logs, activity, notifications, search results, any list >100 items.

---

## The Pattern (What Good Looks Like: Linear/Twitter/Slack)

| Feature | Quality Bar |
|---------|-------------|
| **Smooth 60fps** | No jank at 10k+ items, variable heights |
| **Infinite scroll** | Load more at threshold, skeleton placeholders |
| **Variable heights** | Dynamic measurement, cache heights, no layout shift |
| **Scroll restoration** | Restore position on back navigation |
| **Jump to top/bottom** | Button appears after scroll, smooth scroll |
| **Pull to refresh** | Mobile: drag down to refresh |
| **Sticky headers** | Section headers stick during scroll |
| **End detection** | "No more items" state, not just spinner |
| **Keyboard** | Home/End, Page Up/Down, arrow keys |
| **Accessibility** | ARIA feed/listbox, live region for new items |

---

## Quality Checklist

- [ ] **Virtuoso**: Handles variable heights, grouping, infinite scroll out of box
- [ ] **Overscan**: Render 5-10 items above/below viewport
- [ ] **Height caching**: Measure once, cache, invalidate on content change
- [ ] **Skeleton loading**: Same height as real items, shimmer animation
- [ ] **Intersection Observer**: For load-more trigger (not scroll listener)
- [ ] **Scroll restoration**: `history.scrollRestoration = 'manual'` + save/restore
- [ ] **No layout shift**: Reserve space for async images/avatars
- [ ] **Memory**: Unmount far items, don't accumulate DOM nodes

---

## Anti-Patterns (Slop)

- ❌ `react-window` fixed height only: Breaks with variable content
- ❌ No overscan: Flashing blank space on fast scroll
- ❌ Scroll listener for load-more: Jank, fires too often
- ❌ No skeleton: Content pops in, layout shift
- ❌ No scroll restoration: Back button loses position
- ❌ All items in DOM: 10k items = frozen tab
- ❌ No sticky headers: Sections lose context
- ❌ Images without dimensions: Layout shift on load

---

## Implementation Flow

```
User needs virtual list/infinite scroll
    │
    ├─► ui-engineering detects "list/feed/infinite scroll/chat/logs"
    │
    ├─► pick-ui-library → recommends Virtuoso
    │
    ├─► load ask-virtuoso (library skill)
    │
    └─► implement with Virtuoso + infinite scroll + skeletons
```

---

## Core Setup (Virtuoso)

```tsx
// components/VirtualList.tsx
import { Virtuoso } from 'react-virtuoso'
import { useInView } from 'react-intersection-observer'

interface VirtualListProps<T> {
  data: T[]
  renderItem: (item: T, index: number) => React.ReactNode
  renderSkeleton?: () => React.ReactNode
  loadMore?: () => Promise<void>
  hasMore?: boolean
  isLoading?: boolean
  endMessage?: string
  overscan?: number
  stickyHeader?: React.ReactNode
  groupBy?: (item: T) => string
  groupContent?: (key: string) => React.ReactNode
}

export function VirtualList<T>({
  data,
  renderItem,
  renderSkeleton = DefaultSkeleton,
  loadMore,
  hasMore = false,
  isLoading = false,
  endMessage = 'No more items',
  overscan = 100,
  stickyHeader,
  groupBy,
  groupContent,
}: VirtualListProps<T>) {
  const { ref: loadMoreRef, inView } = useInView({ threshold: 0.1 })

  useEffect(() => {
    if (inView && hasMore && !isLoading && loadMore) {
      loadMore()
    }
  }, [inView, hasMore, isLoading, loadMore])

  return (
    <Virtuoso
      data={data}
      overscan={overscan}
      itemContent={(index, item) => renderItem(item, index)}
      endContent={
        hasMore ? (
          <div className="flex justify-center py-4" ref={loadMoreRef}>
            {isLoading ? <Spinner className="h-6 w-6" /> : <EndDetector />}
          </div>
        ) : (
          <div className="flex justify-center py-4 text-gray-500">{endMessage}</div>
        )
      }
      header={stickyHeader}
      groupCounts={groupBy ? data.reduce((acc, item) => {
        const key = groupBy(item)
        acc[key] = (acc[key] || 0) + 1
        return acc
      }, {} as Record<string, number>) : undefined}
      groupContent={groupContent}
      style={{ height: '100%', width: '100%' }}
      listRef={(el) => { /* scroll restoration */ }}
    />
  )
}

function DefaultSkeleton() {
  return (
    <div className="h-16 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
  )
}

function EndDetector() {
  return null // Just for intersection observer
}
```

---

## Feed Example (Linear/Twitter-style)

```tsx
// components/ActivityFeed.tsx
'use client'

import { useState, useCallback } from 'react'
import { VirtualList } from '@/components/VirtualList'
import { ActivityItem } from '@/components/ActivityItem'
import { api } from '@/lib/api'

export function ActivityFeed() {
  const [activities, setActivities] = useState<Activity[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return
    setIsLoading(true)
    try {
      const { data, hasMore: more } = await api.getActivities({ page: page + 1 })
      setActivities(prev => [...prev, ...data])
      setPage(p => p + 1)
      setHasMore(more)
    } finally {
      setIsLoading(false)
    }
  }, [page, hasMore, isLoading])

  // Initial load
  useEffect(() => {
    loadMore()
  }, [])

  return (
    <VirtualList
      data={activities}
      renderItem={(activity) => <ActivityItem activity={activity} />}
      renderSkeleton={() => <ActivitySkeleton />}
      loadMore={loadMore}
      hasMore={hasMore}
      isLoading={isLoading}
      endMessage="All caught up!"
      overscan={50}
    />
  )
}
```

---

## Chat/Message List (Variable Heights)

```tsx
// components/ChatList.tsx
import { Virtuoso } from 'react-virtuoso'
import { useRef, useEffect } from 'react'

export function ChatList({ messages, onScrollToBottom }) {
  const virtuosoRef = useRef<VirtuosoHandle>(null)
  const [scrolledToBottom, setScrolledToBottom] = useState(true)

  const handleScroll = useCallback((top: number) => {
    const { scrollHeight, clientHeight, scrollTop } = virtuosoRef.current?.getScrollElement() || {}
    setScrolledToBottom(scrollHeight - scrollTop - clientHeight < 100)
  }, [])

  // Auto-scroll on new message if at bottom
  useEffect(() => {
    if (scrolledToBottom && messages.length > 0) {
      virtuosoRef.current?.scrollToIndex({ index: messages.length - 1, align: 'end' })
    }
  }, [messages, scrolledToBottom])

  return (
    <Virtuoso
      ref={virtuosoRef}
      data={messages}
      itemContent={(index, message) => <MessageBubble message={message} />}
      overscan={20}
      style={{ height: '100%', width: '100%' }}
      onScroll={handleScroll}
      endContent={
        !scrolledToBottom && (
          <button
            className="fixed bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-primary text-primary-foreground shadow-lg"
            onClick={() => virtuosoRef.current?.scrollToIndex({ index: messages.length - 1, align: 'end' })}
          >
            ↓ New messages
          </button>
        )
      }
    />
  )
}
```

---

## Skeletons (Match Real Item Height)

```tsx
// components/ActivitySkeleton.tsx
export function ActivitySkeleton() {
  return (
    <div className="p-4 border-b dark:border-gray-800">
      <div className="flex gap-3">
        <div className="h-10 w-10 rounded-full animate-pulse bg-gray-200 dark:bg-gray-700" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-1/2 animate-pulse bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  )
}
```

---

## Scroll Restoration (Back Button)

```tsx
// hooks/useScrollRestoration.ts
'use client'

import { useEffect, useRef } from 'react'

export function useScrollRestoration(key: string) {
  const saved = useRef<number | null>(null)

  useEffect(() => {
    // Save on unmount
    return () => {
      const el = document.querySelector('[data-virtuoso-scroller]')
      if (el) saved.current = el.scrollTop
      sessionStorage.setItem(`scroll:${key}`, String(saved.current ?? 0))
    }
  }, [key])

  useEffect(() => {
    // Restore on mount
    const stored = sessionStorage.getItem(`scroll:${key}`)
    if (stored) {
      const el = document.querySelector('[data-virtuoso-scroller]')
      if (el) el.scrollTop = Number(stored)
    }
  }, [key])
}
```

---

## When to Escalate

| Need | Escalate To |
|------|-------------|
| Table with columns | `ask-table` + `ask-tanstack-table` |
| Sticky section headers | `ask-virtual-list` built-in groups |
| Drag to reorder | `ask-animation` + `dnd-kit` |
| Real-time prepend | `ask-virtual-list` + WebSocket |