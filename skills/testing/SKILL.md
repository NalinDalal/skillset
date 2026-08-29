---
name: testing
description: Testing patterns , unit, integration, E2E, Vitest, Playwright, React Testing Library, MSW, test database, coverage, CI integration. Load when writing tests or setting up test infrastructure.
---
# Testing , Unit, Integration, E2E

**When to use:** Writing tests, setting up test infrastructure, improving coverage, debugging flaky tests.

---

## Test Pyramid
```
        E2E (5-10%)          Playwright - Critical user journeys
       /        \
   Integration (20-30%)    Vitest + Testcontainers - API, DB, services
  /            \
Unit (60-70%)   Vitest + RTL - Pure functions, components, hooks
```
---

## Tooling

| Layer | Tool | Purpose |
|-------|------|---------|
| Unit | Vitest | Fast, TypeScript-native, Jest-compatible |
| Component | React Testing Library | Test behavior, not implementation |
| API | Vitest + MSW | Mock external services |
| Database | Testcontainers | Real Postgres in tests |
| E2E | Playwright | Cross-browser, real user flows |
| Visual | Playwright + pixelmatch | Screenshot regression |

---

## Vitest Config
```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./test/setup.ts'],
    include: ['**/*.test.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html', 'lcov'],
      thresholds: {
        lines: 80,
        functions: 80,
        branches: 70,
        statements: 80,
      },
      exclude: ['**/*.d.ts', '**/*.config.*', 'test/**', '**/mock*'],
    },
    pool: 'threads',
    poolOptions: { threads: { singleThread: true } },
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
})
```

```typescript
// test/setup.ts
import { cleanup } from '@testing-library/react'
import { afterEach, vi } from 'vitest'
import '@testing-library/jest-dom'

afterEach(() => {
  cleanup()
  vi.clearAllMocks()
})

// Global mocks
vi.mock('next/navigation', () => ({
  useRouter: () => ({ push: vi.fn(), replace: vi.fn(), back: vi.fn() }),
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))

// MatchMedia mock
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})
```
---

## Unit Tests (Pure Functions)
```typescript
// lib/utils/date.test.ts
import { describe, it, expect } from 'vitest'
import { formatRelativeTime, addDays, isWeekend } from './date'

describe('formatRelativeTime', () => {
  it('formats seconds ago', () => {
    const now = new Date()
    const past = new Date(now.getTime() - 30 * 1000)
    expect(formatRelativeTime(past, now)).toBe('30s ago')
  })

  it('formats minutes ago', () => {
    const now = new Date()
    const past = new Date(now.getTime() - 5 * 60 * 1000)
    expect(formatRelativeTime(past, now)).toBe('5m ago')
  })

  it('handles future dates', () => {
    const now = new Date()
    const future = new Date(now.getTime() + 60 * 1000)
    expect(formatRelativeTime(future, now)).toBe('in 1m')
  })
})

describe('isWeekend', () => {
  it('returns true for Saturday', () => {
    expect(isWeekend(new Date('2024-01-06'))).toBe(true)
  })
  it('returns true for Sunday', () => {
    expect(isWeekend(new Date('2024-01-07'))).toBe(true)
  })
  it('returns false for Monday', () => {
    expect(isWeekend(new Date('2024-01-08'))).toBe(false)
  })
})
```
---

## Component Tests (React Testing Library)
```typescript
// components/Button/Button.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { Button } from './Button'

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: 'Click me' })).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = vi.fn()
    render(<Button onClick={handleClick}>Click</Button>)
    fireEvent.click(screen.getByRole('button'))
    expect(handleClick).toHaveBeenCalledOnce()
  })

  it('shows loading state', () => {
    render(<Button isLoading>Submit</Button>)
    expect(screen.getByRole('button', { name: 'Submit' })).toBeDisabled()
    expect(screen.getByTestId('spinner')).toBeInTheDocument()
  })

  it('applies variant classes', () => {
    render(<Button variant="destructive">Delete</Button>)
    expect(screen.getByRole('button')).toHaveClass('bg-red-600')
  })

  it('forwards ref', () => {
    const ref = vi.fn()
    render(<Button ref={ref}>Test</Button>)
    expect(ref).toHaveBeenCalledWith(expect.any(HTMLButtonElement))
  })
})
```
### Testing Custom Hooks
```typescript
// hooks/useDebounce.test.ts
import { renderHook, act, waitFor } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { useDebounce } from './useDebounce'

describe('useDebounce', () => {
  beforeEach(() => vi.useFakeTimers())
  afterEach(() => vi.useRealTimers())

  it('returns initial value immediately', () => {
    const { result } = renderHook(() => useDebounce('initial', 300))
    expect(result.current).toBe('initial')
  })

  it('updates after delay', () => {
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 300), {
      initialProps: { value: 'initial' },
    })

    rerender({ value: 'updated' })
    expect(result.current).toBe('initial')

    act(() => vi.advanceTimersByTime(300))
    expect(result.current).toBe('updated')
  })
})
```
---

## Integration Tests (API + Database)

### Test Database (Testcontainers)
```typescript
// test/db.ts
import { GenericContainer, StartedTestContainer } from 'testcontainers'
import { PrismaClient } from '@prisma/client'

let container: StartedTestContainer
let prisma: PrismaClient

export async function setupTestDb() {
  container = await new GenericContainer('postgres:16-alpine')
    .withEnvironment({
      POSTGRES_USER: 'test',
      POSTGRES_PASSWORD: 'test',
      POSTGRES_DB: 'test',
    })
    .withExposedPorts(5432)
    .start()

  const url = `postgresql://test:test@localhost:${container.getMappedPort(5432)}/test`
  process.env.DATABASE_URL = url

  prisma = new PrismaClient({ datasources: { db: { url } } })
  await prisma.$connect()
  await prisma.$executeRawUnsafe(`CREATE SCHEMA IF NOT EXISTS test`)
  await prisma.migrateDeploy()

  return prisma
}

export async function teardownTestDb() {
  await prisma?.$disconnect()
  await container?.stop()
}

export async function cleanDatabase() {
  const models = Reflect.ownKeys(prisma).filter(k => typeof prisma[k as string]?.deleteMany === 'function')
  await Promise.all(models.map(m => prisma[m as string].deleteMany()))
}
```
### API Integration Test
```typescript
// apps/http-backend/src/routes/projects.test.ts
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { Elysia } from 'elysia'
import { setupTestDb, teardownTestDb, cleanDatabase, prisma } from '../../test/db'
import { projectsRoutes } from './projects'

describe('Projects API', () => {
  let app: Elysia

  beforeAll(async () => {
    await setupTestDb()
    app = new Elysia().use(projectsRoutes)
  })

  afterAll(async () => {
    await teardownTestDb()
  })

  beforeEach(async () => {
    await cleanDatabase()
  })

  it('creates a project', async () => {
    const res = await app.handle(new Request('http://localhost/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: 'Test Project', visibility: 'private' }),
    }))

    expect(res.status).toBe(201)
    const data = await res.json()
    expect(data.name).toBe('Test Project')
    expect(data.id).toBeDefined()
  })

  it('returns 400 for invalid input', async () => {
    const res = await app.handle(new Request('http://localhost/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: '' }),
    }))

    expect(res.status).toBe(400)
  })

  it('lists projects with pagination', async () => {
    await prisma.project.createMany({ data: Array(5).fill({ name: 'Test', visibility: 'private' }) })

    const res = await app.handle(new Request('http://localhost/projects?page=1&limit=2'))
    const data = await res.json()

    expect(data.data).toHaveLength(2)
    expect(data.meta.total).toBe(5)
  })
})
```
### MSW for External Services
```typescript
// test/msw.ts
import { setupServer } from 'msw/node'
import { http, HttpResponse } from 'msw'

export const server = setupServer(
  http.get('https://api.github.com/user', () => HttpResponse.json({
    login: 'testuser',
    id: 1,
    avatar_url: 'https://github.com/testuser.png',
  })),
  http.post('https://api.stripe.com/v1/checkout/sessions', () => HttpResponse.json({
    id: 'cs_test_123',
    url: 'https://checkout.stripe.com/pay/cs_test_123',
  })),
)

// test/setup.ts
import { beforeAll, afterAll, afterEach } from 'vitest'
import { server } from './msw'

beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterAll(() => server.close())
afterEach(() => server.resetHandlers())
```
---

## E2E Tests (Playwright)
```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: [['html', { open: 'never' }], ['json', { outputFile: 'test-results/results.json' }]],
  use: {
    baseURL: 'http://localhost:5173',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    { name: 'firefox', use: { ...devices['Desktop Firefox'] } },
    { name: 'webkit', use: { ...devices['Desktop Safari'] } },
    { name: 'mobile-chrome', use: { ...devices['Pixel 5'] } },
    { name: 'mobile-safari', use: { ...devices['iPhone 12'] } },
  ],
  webServer: {
    command: 'bun run dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
    timeout: 120000,
  },
})
```
### E2E Test Example
```typescript
// e2e/auth.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('sign up flow', async ({ page }) => {
    await page.goto('/signup')
    
    await page.fill('[name="email"]', 'test@example.com')
    await page.fill('[name="password"]', 'SecurePass123!')
    await page.fill('[name="name"]', 'Test User')
    await page.click('button[type="submit"]')
    
    await expect(page).toHaveURL('/dashboard')
    await expect(page.locator('text=Welcome, Test User')).toBeVisible()
  })

  test('sign in with invalid credentials shows error', async ({ page }) => {
    await page.goto('/signin')
    await page.fill('[name="email"]', 'wrong@example.com')
    await page.fill('[name="password"]', 'wrong')
    await page.click('button[type="submit"]')
    
    await expect(page.locator('text=Invalid credentials')).toBeVisible()
  })

  test('protected route redirects to signin', async ({ page }) => {
    await page.goto('/settings')
    await expect(page).toHaveURL('/signin?redirect=/settings')
  })
})
```

```typescript
// e2e/projects.spec.ts
import { test, expect } from '@playwright/test'

test.describe('Projects', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/signin')
    await page.fill('[name="email"]', 'test@example.com')
    await page.fill('[name="password"]', 'SecurePass123!')
    await page.click('button[type="submit"]')
  })

  test('create project', async ({ page }) => {
    await page.goto('/projects/new')
    await page.fill('[name="name"]', 'My New Project')
    await page.selectOption('[name="visibility"]', 'team')
    await page.click('button[type="submit"]')
    
    await expect(page.locator('text=Project created')).toBeVisible()
    await expect(page).toHaveURL(/\/projects\/[a-z0-9]+/)
  })

  test('delete project with confirmation', async ({ page }) => {
    await page.goto('/projects')
    await page.click('[data-testid="project-menu"]:first-child')
    await page.click('text=Delete')
    await page.click('button:has-text("Delete")') // Confirmation dialog
    
    await expect(page.locator('text=Deleted')).toBeVisible()
  })
})
```
---

## Mocking Patterns

### Mock Prisma
```typescript
// test/mocks/prisma.ts
import { vi } from 'vitest'

export const mockPrisma = {
  project: {
    create: vi.fn(),
    findMany: vi.fn(),
    findUnique: vi.fn(),
    update: vi.fn(),
    delete: vi.fn(),
  },
  user: {
    findUnique: vi.fn(),
    findMany: vi.fn(),
  },
}

vi.mock('@/lib/prisma', () => ({
  prisma: mockPrisma,
}))
```
### Mock Next.js Router
```typescript
// test/mocks/next-navigation.ts
import { vi } from 'vitest'

export const mockRouter = {
  push: vi.fn(),
  replace: vi.fn(),
  back: vi.fn(),
  prefetch: vi.fn(),
}

vi.mock('next/navigation', () => ({
  useRouter: () => mockRouter,
  usePathname: () => '/',
  useSearchParams: () => new URLSearchParams(),
}))
```
---

## Coverage Goals

| Metric | Target | Enforcement |
|--------|--------|-------------|
| Lines | 80% | CI fails below |
| Functions | 80% | CI fails below |
| Branches | 70% | CI fails below |
| Statements | 80% | CI fails below |

### Coverage Exclusions
```typescript
// vitest.config.ts
coverage: {
  exclude: [
    '**/*.d.ts',
    '**/*.config.*',
    'test/**',
    '**/mock*',
    '**/*.stories.tsx',
    '**/index.ts', // Barrel files
    'apps/frontend/src/main.tsx', // Entry points
  ],
}
```
---

## CI Integration
```yaml
# .github/workflows/test.yml
jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install --frozen-lockfile
      - run: bun run test --coverage
      - uses: codecov/codecov-action@v4
        if: github.event_name == 'pull_request'
        with:
          files: ./coverage/lcov.info
          flags: unittests
```
---

## Debugging Flaky Tests

| Symptom | Fix |
|---------|-----|
| Random failures | Check async cleanup, use `waitFor` |
| Timeouts | Increase timeout, check hanging promises |
| Order-dependent | Clean state between tests (`beforeEach`) |
| Browser flaky | Add retries, check race conditions |
| DB state leaks | Use transactions + rollback, or clean DB |

---

## Quick Commands
```bash
# Run all tests
bun test

# Watch mode
bun test --watch

# Coverage
bun test --coverage

# Specific file
bun test Button.test.tsx

# E2E
bun playwright test
bun playwright test --headed
bun playwright show-report
```
---

## Related Skills
- `git-ci` , CI pipeline integration
- `database` , Testcontainers patterns
- `auth` , Testing auth flows
- `api-design` , Testing API contracts