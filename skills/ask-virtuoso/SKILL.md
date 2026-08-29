---
name: ask-virtuoso
description: Library guide for Virtuoso — virtualized lists with variable heights, grouping, infinite scroll, smooth scrolling. Load via ask-virtual-list pattern skill.
---

# Ask Virtuoso — Virtualized Lists

**When to use:** Long lists — feeds, chat, logs, activity, notifications, search results. Handles variable heights natively.

**Package:** `react-virtuoso`

---

## Installation

```bash
npm i react-virtuoso
```

---

## Core Components

```tsx
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'
import { useInView } from 'react-intersection-observer'
```

---

## Basic List

```tsx
import { Virtuoso } from 'react-virtuoso'

function SimpleList({ items }: { items: Item[] }) {
  return (
    <Virtuoso
      data={items}
      itemContent={(index, item) => <ItemComponent item={item} />}
      overscan={100}
      style={{ height: '100%', width: '100%' }}
    />
  )
}
```

---

## Infinite Scroll (Feed)

```tsx
import { useState, useCallback } from 'react'
import { Virtuoso } from 'react-virtuoso'
import { useInView } from 'react-intersection-observer'

function InfiniteFeed() {
  const [items, setItems] = useState<FeedItem[]>([])
  const [page, setPage] = useState(1)
  const [hasMore, setHasMore] = useState(true)
  const [isLoading, setIsLoading] = useState(false)

  const { ref: loadMoreRef, inView } = useInView({ threshold: 0.1 })

  const loadMore = useCallback(async () => {
    if (isLoading || !hasMore) return
    setIsLoading(true)
    try {
      const { data, hasMore: more } = await api.getFeed({ page: page + 1 })
      setItems(prev => [...prev, ...data])
      setPage(p => p + 1)
      setHasMore(more)
    } finally {
      setIsLoading(false)
    }
  }, [page, hasMore, isLoading])

  useEffect(() => {
    if (inView && hasMore && !isLoading) loadMore()
  }, [inView, hasMore, isLoading, loadMore])

  // Initial load
  useEffect(() => { loadMore() }, [loadMore])

  return (
    <Virtuoso
      data={items}
      itemContent={(index, item) => <FeedItemComponent item={item} />}
      endContent={
        hasMore ? (
          <div className="flex justify-center py-4" ref={loadMoreRef}>
            {isLoading ? <Spinner className="h-6 w-6" /> : null}
          </div>
        ) : (
          <div className="flex justify-center py-4 text-gray-500">All caught up!</div>
        )
      }
      overscan={50}
      style={{ height: '100%', width: '100%' }}
    />
  )
}
```

---

## Skeletons (Match Real Height)

```tsx
function FeedSkeleton() {
  return (
    <div className="p-4 border-b dark:border-gray-800 animate-pulse">
      <div className="flex gap-3">
        <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700" />
        <div className="flex-1 space-y-2">
          <div className="h-4 w-3/4 bg-gray-200 dark:bg-gray-700 rounded" />
          <div className="h-3 w-1/2 bg-gray-200 dark:bg-gray-700 rounded" />
        </div>
      </div>
    </div>
  )
}

// In Virtuoso
<Virtuoso
  data={items}
  itemContent={(index, item) => <FeedItem item={item} />}
  endContent={hasMore ? <LoadMoreTrigger /> : <EndMessage />}
/>

// Custom endContent with skeleton while loading
function LoadMoreTrigger({ isLoading, ref }) {
  return (
    <div ref={ref} className="flex justify-center py-4">
      {isLoading ? <FeedSkeleton /> : null}
    </div>
  )
}
```

---

## Grouped Lists (Sticky Headers)

```tsx
import { GroupedVirtuoso } from 'react-virtuoso'

function GroupedList({ groups }: { groups: Group[] }) {
  return (
    <GroupedVirtuoso
      groupCounts={groups.map(g => g.items.length)}
      groupContent={({ index }) => (
        <div className="sticky top-0 z-10 px-4 py-2 bg-white dark:bg-gray-900 border-b font-semibold">
          {groups[index].title}
        </div>
      )}
      itemContent={(index, item) => <ItemComponent item={item} />}
      overscan={20}
      style={{ height: '100%', width: '100%' }}
    />
  )
}
```

---

## Chat / Messages (Variable Heights, Auto-scroll)

```tsx
import { useRef, useEffect, useState } from 'react'
import { Virtuoso, VirtuosoHandle } from 'react-virtuoso'

function ChatList({ messages }: { messages: Message[] }) {
  const virtuosoRef = useRef<VirtuosoHandle>(null)
  const [atBottom, setAtBottom] = useState(true)

  const handleScroll = useCallback((top: number) => {
    const el = virtuosoRef.current?.getScrollElement()
    if (!el) return
    const { scrollHeight, clientHeight, scrollTop } = el
    setAtBottom(scrollHeight - scrollTop - clientHeight < 100)
  }, [])

  // Auto-scroll on new messages if at bottom
  useEffect(() => {
    if (atBottom && messages.length > 0) {
      virtuosoRef.current?.scrollToIndex({ index: messages.length - 1, align: 'end', behavior: 'smooth' })
    }
  }, [messages, atBottom])

  return (
    <Virtuoso
      ref={virtuosoRef}
      data={messages}
      itemContent={(index, message) => <MessageBubble message={message} />}
      overscan={20}
      style={{ height: '100%', width: '100%' }}
      onScroll={handleScroll}
      endContent={
        !atBottom && (
          <button
            className="fixed bottom-4 right-4 z-10 px-3 py-1 rounded-full bg-primary text-primary-foreground shadow-lg"
            onClick={() => virtuosoRef.current?.scrollToIndex({ index: messages.length - 1, align: 'end' })}
          >
            ↓ {messages.length - virtuosoRef.current?.getFirstVisibleIndex() ?? 0} new
          </button>
        )
      }
    />
  )
}
```

---

## Scroll Restoration (Back Navigation)

```tsx
import { useEffect, useRef } from 'react'

function useScrollRestoration(key: string) {
  const saved = useRef<number | null>(null)

  useEffect(() => {
    return () => {
      const el = document.querySelector('[data-virtuoso-scroller]')
      if (el) saved.current = el.scrollTop
      sessionStorage.setItem(`scroll:${key}`, String(saved.current ?? 0))
    }
  }, [key])

  useEffect(() => {
    const stored = sessionStorage.getItem(`scroll:${key}`)
    if (stored) {
      const el = document.querySelector('[data-virtuoso-scroller]')
      if (el) el.scrollTop = Number(stored)
    }
  }, [key])
}

// Usage
function FeedPage() {
  useScrollRestoration('feed')
  return <InfiniteFeed />
}
```

---

## Jump to Index / Top / Bottom

```tsx
const virtuosoRef = useRef<VirtuosoHandle>(null)

function JumpButtons() {
  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2">
      <Button onClick={() => virtuosoRef.current?.scrollToIndex({ index: 0, align: 'start' })}>
        Top
      </Button>
      <Button onClick={() => virtuosoRef.current?.scrollToIndex({ index: data.length - 1, align: 'end' })}>
        Bottom
      </Button>
    </div>
  )
}
```

---

## Reverse List (Chat - Newest at Bottom)

```tsx
<Virtuoso
  data={messages}
  itemContent={(index, message) => <MessageBubble message={message} />}
  reverse={true} // Newest at bottom
  overscan={20}
  style={{ height: '100%', width: '100%' }}
/>
```

---

## Fixed Height Items (Performance)

```tsx
// If ALL items have fixed height, use fixed size for max performance
<Virtuoso
  data={items}
  itemContent={(index, item) => <Item item={item} />}
  fixedItemSize={48} // Skip measuring
  overscan={10}
  style={{ height: '100%', width: '100%' }}
/>
```

---

## Common Props Reference

| Prop | Type | Description |
|------|------|-------------|
| `data` | `T[]` | Array of items |
| `itemContent` | `(index, item) => ReactNode` | Render function |
| `overscan` | `number` | Items to render outside viewport (default 5) |
| `fixedItemSize` | `number` | Skip measuring if fixed height |
| `reverse` | `boolean` | Render from bottom |
| `endContent` | `ReactNode` | Loading/end message |
| `onScroll` | `(top: number) => void` | Scroll callback |
| `style` | `CSSProperties` | Container style (must have height) |
| `listRef` | `Ref<VirtuosoHandle>` | Access scroll methods |

---

## VirtuosoHandle Methods

```tsx
const ref = useRef<VirtuosoHandle>(null)

ref.current?.scrollToIndex({ index: 10, align: 'center', behavior: 'smooth' })
ref.current?.scrollToTop({ behavior: 'smooth' })
ref.current?.scrollToBottom({ behavior: 'smooth' })
ref.current?.getFirstVisibleIndex() // Number
ref.current?.getLastVisibleIndex() // Number
ref.current?.getScrollElement() // HTMLElement
```

---

## Common Issues

| Issue | Fix |
|-------|-----|
| Items flashing | Increase `overscan`, check skeleton height matches real item |
| Scroll jumps | Ensure skeleton matches real item height exactly |
| Not scrolling to new items | Check `reverse` prop, use `scrollToIndex` with `behavior: 'smooth'` |
| Memory grows | Ensure `overscan` not too high, items unmount correctly |
| TypeScript errors | Import `VirtuosoHandle` from `react-virtuoso` |

---

## Related Skills

- `ask-virtual-list` — Pattern guide for virtual lists
- `ask-tanstack-table` — Virtualized tables
- `ui-engineering` — Master orchestrator