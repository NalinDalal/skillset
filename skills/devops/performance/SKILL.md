---
name: performance
description: Performance optimization: bundle analysis, code splitting, lazy loading, caching strategies, database profiling, Core Web Vitals, memory leaks, profiling tools, CDN, edge caching. Load when optimizing or auditing performance.
---

# Performance: Bundle, Runtime, Database, Network

**When to use:** Optimizing slow pages, reducing bundle size, fixing memory leaks, improving Core Web Vitals, scaling infrastructure.


## Performance Budgets

| Metric | Budget | Tool |
|--------|--------|------|
| **LCP** | < 2.5s | Lighthouse, Web Vitals |
| **FID/INP** | < 100ms | Web Vitals |
| **CLS** | < 0.1 | Lighthouse |
| **TTFB** | < 800ms | Lighthouse |
| **Bundle (gz)** | < 150KB initial | webpack-bundle-analyzer |
| **Bundle (total)** | < 500KB | webpack-bundle-analyzer |
| **API p95** | < 200ms | Prometheus/Grafana |
| **DB query p95** | < 50ms | pg_stat_statements |


## Frontend Optimization

### Bundle Analysis
```bash
# Analyze bundle
bun run build
npx vite-bundle-analyzer dist

# Or with rollup
npx rollup-plugin-visualizer dist/stats.html
```

### Code Splitting
```typescript
// Route-level splitting (automatic with TanStack Router)
// Lazy-load heavy components
const HeavyChart = lazy(() import('./HeavyChart').then(m => ({ default: m.Chart })))
const Editor = lazy(() => import('./Editor'))

// Conditional loading
function Dashboard() {
  const [showEditor, setShowEditor] = useState(false)
  return (
    <Suspense fallback={<Skeleton />}>
      {showEditor && <Editor />}
    </Suspense>
  )
}
```

### Tree Shaking
```typescript
// ✅ Named imports
import { debounce } from 'lodash-es'
import { z } from 'zod'

// ❌ Namespace imports
import _ from 'lodash'
import * as zod from 'zod'

// Side effects false in package.json
{
  "sideEffects": false
}
```

### Lazy Loading Images
```tsx
// Native lazy loading
<img src="/image.jpg" loading="lazy" width="800" height="600" alt="..." />

// IntersectionObserver for backgrounds
function LazyBackground({ src, children }) {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        ref.current!.style.backgroundImage = `url(${src})`
        observer.disconnect()
      }
    })
    observer.observe(ref.current!)
    return () => observer.disconnect()
  }, [src])
  return <div ref={ref}>{children}</div>
}
```

### Virtual Scrolling
```tsx
// Use Virtuoso for lists > 50 items
import { Virtuoso } from 'react-virtuoso'

<Virtuoso
  data={items}
  itemContent={(index, item) => <Item item={item} />}
  overscan={10}
  style={{ height: 400 }}
/>
```

### Memoization
```tsx
// Memoize expensive computations
const sortedItems = useMemo(
  () => items.filter(f).sort((a, b) => b.date - a.date),
  [items, f]
)

// Memoize components
const ExpensiveComponent = memo(({ data }) => {
  return <ComplexView data={data} />
}, (prev, next) => prev.data.id === next.data.id)

// useCallback for stable handlers
const handleClick = useCallback((id: string) => {
  dispatch({ type: 'SELECT', payload: id })
}, [dispatch])
```


## Caching Strategies

### HTTP Caching
```typescript
// Static assets - long cache with hash
// vite.config.ts
build: {
  rollupOptions: {
    output: {
      entryFileNames: 'assets/[name]-[hash].js',
      chunkFileNames: 'assets/[name]-[hash].js',
      assetFileNames: 'assets/[name]-[hash].[ext]',
    },
  },
}

// Headers
// Cache-Control: public, max-age=31536000, immutable  // Static assets
// Cache-Control: no-cache, must-revalidate            // HTML
// Cache-Control: public, max-age=0, must-revalidate   // API (stale-while-revalidate)
```

### API Caching (React Query / TanStack Query)
```typescript
// lib/queryClient.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 1000 * 60 * 5, // 5 min
      gcTime: 1000 * 60 * 30,   // 30 min
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
})

// Usage
function useProjects() {
  return useQuery({
    queryKey: ['projects'],
    queryFn: () => api.projects.list(),
    select: data => data.data,
  })
}

// Invalidate on mutation
function useCreateProject() {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: api.projects.create,
    onSuccess: () => qc.invalidateQueries({ queryKey: ['projects'] }),
  })
}
```

### Edge Caching (Cloudflare Workers / Vercel Edge)
```typescript
// Cloudflare Worker cache
export default {
  async fetch(request, env, ctx) {
    const cache = caches.default
    const cacheKey = new Request(request.url, request)
    
    let response = await cache.match(cacheKey)
    if (!response) {
      response = await fetch(request)
      if (response.ok && request.method === 'GET') {
        ctx.waitUntil(cache.put(cacheKey, response.clone()))
      }
    }
    return response
  },
}
```

### Database Query Caching (Redis)
```typescript
// lib/cache.ts
import { Redis } from '@upstash/redis'

const redis = new Redis({ url: process.env.REDIS_URL!, token: process.env.REDIS_TOKEN! })

export async function cachedQuery<T>(
  key: string,
  fn: () => Promise<T>,
  ttl = 60 // seconds
): Promise<T> {
  const cached = await redis.get(key)
  if (cached) return cached as T

  const data = await fn()
  await redis.setex(key, ttl, JSON.stringify(data))
  return data
}

// Usage
const projects = await cachedQuery(
  'projects:list:active',
  () => prisma.project.findMany({ where: { status: 'active' } }),
  30
)
```


## Database Performance

### Indexing Strategy
```sql
-- Always index foreign keys
CREATE INDEX idx_tasks_project_id ON tasks(project_id);
CREATE INDEX idx_memberships_user_id ON memberships(user_id);

-- Composite indexes for query patterns
CREATE INDEX idx_tasks_project_status ON tasks(project_id, status);
CREATE INDEX idx_projects_owner_created ON projects(owner_id, created_at DESC);

-- Partial indexes
CREATE INDEX idx_tasks_active ON tasks(project_id) WHERE status = 'active';

-- Check index usage
EXPLAIN ANALYZE SELECT * FROM tasks WHERE project_id = 'abc' AND status = 'active';
```

### Query Optimization
```typescript
// ❌ N+1
const projects = await prisma.project.findMany()
for (const p of projects) {
  p.tasks = await prisma.task.findMany({ where: { projectId: p.id } })
}

// ✅ Include
const projects = await prisma.project.findMany({
  include: {
    tasks: { where: { status: 'active' }, take: 10 },
    _count: { select: { tasks: true } },
  },
})

// ✅ Batch with DataLoader (for GraphQL)
const taskLoader = new DataLoader(async (projectIds: string[]) => {
  const tasks = await prisma.task.findMany({
    where: { projectId: { in: projectIds } },
  })
  return projectIds.map(id => tasks.filter(t => t.projectId === id))
})
```

### Connection Pooling
```bash
# PgBouncer for production
# DATABASE_URL with pooler
postgresql://user:pass@host:6543/db?pgbouncer=true&connection_limit=20
```

### Read Replicas
```typescript
// Read replicas for analytics
const readPrisma = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_READ_URL } },
})

export async function getDashboardStats(userId: string) {
  const [projects, tasks, members] = await Promise.all([
    readPrisma.project.count({ where: { ownerId: userId } }),
    readPrisma.task.count({ where: { assigneeId: userId } }),
    readPrisma.membership.count({ where: { userId } }),
  ])
  return { projects, tasks, members }
}
```


## Core Web Vitals Optimization

### LCP (Largest Contentful Paint)
```tsx
// Preload hero image
<link rel="preload" as="image" href="/hero.webp" />

// Priority hint
<img src="/hero.webp" fetchpriority="high" alt="..." />

// Reduce server response time
// - Edge caching
// - Streaming SSR
// - Early flush
```

### INP (Interaction to Next Paint)
```tsx
// Defer non-critical work
import { useDeferredValue, useTransition } from 'react'

function SearchResults({ query }) {
  const deferredQuery = useDeferredValue(query)
  const [isPending, startTransition] = useTransition()

  const handleChange = (e) => {
    startTransition(() => setQuery(e.target.value))
  }

  return (
    <>
      <input value={query} onChange={handleChange} />
      {isPending ? <Skeleton /> : <Results query={deferredQuery} />}
    </>
  )
}

// Avoid blocking main thread
// - Web Workers for heavy computation
// - requestIdleCallback for non-urgent work
// - Debounce/throttle event handlers
```

### CLS (Cumulative Layout Shift)
```tsx
// Reserve space for images
<img src="/image.jpg" width="800" height="600" alt="..." style={{ aspectRatio: '800/600' }} />

// Reserve space for ads/dynamic content
<div style={{ minHeight: 200 }}>Ad loads here</div>

// Font loading
// preload fonts
<link rel="preload" href="/font.woff2" as="font" type="font/woff2" crossorigin />

// font-display: swap in @font-face
@font-face {
  font-family: 'Inter';
  font-display: swap;
  src: url('/font.woff2') format('woff2');
}
```


## Memory Leak Detection

### Common Leaks
```typescript
// ❌ Event listeners not removed
useEffect(() => {
  window.addEventListener('resize', handleResize)
  // Missing cleanup!
}, [])

// ✅ Cleanup
useEffect(() => {
  window.addEventListener('resize', handleResize)
  return () => window.removeEventListener('resize', handleResize)
}, [])

// ❌ Timers not cleared
useEffect(() => {
  const id = setInterval(fetchData, 5000)
  return () => clearInterval(id)
}, [])

// ❌ Subscriptions not unsubscribed
useEffect(() => {
  const sub = observable.subscribe(handler)
  return () => sub.unsubscribe()
}, [])

// ❌ Large objects in state
const [data, setData] = useState(hugeArray) // Re-renders on every change
// ✅ Use refs for mutable data that doesn't trigger render
const dataRef = useRef(hugeArray)
```

### Profiling Tools
```bash
# Chrome DevTools
# Performance tab -> Record -> Interact -> Analyze
# Memory tab -> Heap snapshots -> Compare

# React DevTools Profiler
# Record -> Interact -> Flamegraph/ Ranked

# Node.js
node --inspect server.js
# Chrome DevTools -> Node.js -> Memory/CPU profiles

# Bun
bun --inspect server.ts
```


## Monitoring & Alerting

### Key Metrics
```typescript
// Prometheus metrics
// Frontend (web-vitals)
import { onCLS, onFID, onLCP, onFCP, onTTFB } from 'web-vitals'

onCLS(metric => sendToAnalytics(metric))
onLCP(metric => sendToAnalytics(metric))

// Backend
import { Histogram, Counter } from 'prom-client'

const httpRequestDuration = new Histogram({
  name: 'http_request_duration_seconds',
  help: 'HTTP request latency',
  labelNames: ['method', 'route', 'status'],
  buckets: [0.05, 0.1, 0.2, 0.5, 1, 2, 5],
})

const dbQueryDuration = new Histogram({
  name: 'db_query_duration_seconds',
  labelNames: ['query', 'table'],
})
```

### Alerting Rules
```yaml
# Prometheus alerts
groups:
  - name: performance
    rules:
      - alert: HighLCP
        expr: histogram_quantile(0.75, rate(lcp_bucket[5m])) > 2.5
        for: 5m
        labels:
          severity: warning
      - alert: SlowAPI
        expr: histogram_quantile(0.95, rate(http_request_duration_seconds_bucket[5m])) > 1
        for: 2m
      - alert: HighDBLatency
        expr: histogram_quantile(0.95, rate(db_query_duration_seconds_bucket[5m])) > 0.1
        for: 5m
      - alert: MemoryLeak
        expr: process_resident_memory_bytes / process_max_memory_bytes > 0.85
        for: 10m
```


## Performance Checklist

### Frontend
- [ ] Bundle < 150KB gzipped initial
- [ ] Code splitting on all routes
- [ ] Lazy load images/components
- [ ] Virtual scrolling for lists > 50
- [ ] Memoization on expensive components
- [ ] Fonts preloaded, font-display: swap
- [ ] Images: WebP/AVIF, responsive, lazy
- [ ] No layout shifts (CLS < 0.1)
- [ ] LCP < 2.5s, INP < 100ms

### Backend
- [ ] API p95 < 200ms
- [ ] DB queries indexed, p95 < 50ms
- [ ] Connection pooling (PgBouncer)
- [ ] Read replicas for heavy reads
- [ ] Caching: Redis for queries, CDN for static
- [ ] No N+1 queries

### Infrastructure
- [ ] CDN for static assets
- [ ] Edge caching for HTML/API
- [ ] Compression (Brotli/Gzip)
- [ ] HTTP/2 or HTTP/3
- [ ] Resource hints (preload, prefetch)


## Quick Commands

```bash
# Bundle analysis
bun run build && npx vite-bundle-analyzer dist

# Lighthouse CI
npx lhci autorun

# Database profiling
# Enable pg_stat_statements
# SELECT * FROM pg_stat_statements ORDER BY mean_time DESC LIMIT 20;

# Profile Node/Bun
bun --inspect server.ts
# Chrome -> chrome://inspect

# Load test
bun x autocannon -c 100 -d 30 http://localhost:3000/api/projects
```


## Related Skills
- `backend/database` - Query optimization, indexing
- `devops/testing` - Performance regression tests
- `backend/realtime` - WebSocket scaling
- `devops/deployments` - CDN, edge caching config
- `devops/git-ci` - Performance budgets in CI
