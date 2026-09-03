---
name: coding-standards
category: engineering
source: ECC (adapted)
description: "Cross-project coding conventions for TypeScript/JavaScript. Load when establishing code standards or reviewing code style."

# Coding Standards

When to use: new project setup, onboarding team members, establishing code conventions, resolving style debates.

## Naming Conventions

| Element | Convention | Example |
|---------|------------|---------|
| Files | camelCase | `userService.ts`, `roomController.ts` |
| Directories | camelCase | `src/routes`, `src/components` |
| Functions | camelCase | `getUserById`, `createRoom` |
| Variables | camelCase | `currentUser`, `roomId` |
| Types/Interfaces | PascalCase | `User`, `RoomState` |
| Enums | PascalCase | `ToolType`, `UserRole` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_ATTEMPTS`, `DEFAULT_TIMEOUT` |
| React Components | PascalCase | `CanvasToolbar`, `RoomHeader` |
| CSS Classes | kebab-case | `canvas-container`, `tool-button` |

## Code Structure

### Functions

- Max length: 30 lines (ideal), 50 lines (acceptable), 80 lines (split required)
- Max parameters: 3 (use options object for more)
- Single responsibility: one function, one job
- Early returns: guard clauses over nested if/else

```typescript
// Good: Early return, single responsibility
function processOrder(order: Order): Result {
  if (!order) return { error: 'Order is required' }
  if (order.status !== 'pending') return { error: 'Order already processed' }

  const total = calculateTotal(order.items)
  if (total <= 0) return { error: 'Invalid order total' }

  return { data: { orderId: order.id, total } }
}

// Bad: Nested if/else, multiple responsibilities
function processOrder(order: Order): Result {
  if (order) {
    if (order.status === 'pending') {
      const total = calculateTotal(order.items)
      if (total > 0) {
        return { data: { orderId: order.id, total } }
      } else {
        return { error: 'Invalid order total' }
      }
    } else {
      return { error: 'Order already processed' }
    }
  } else {
    return { error: 'Order is required' }
  }
}
```

### Files

- One export per file (preferred) or closely related exports
- Barrel exports via `index.ts` only at package root
- Order: types, constants, functions, classes, exports

## Type Safety

- No `any`. Use `unknown` and narrow with type guards.
- No type assertions (`as`) unless absolutely necessary.
- Prefer interfaces over type aliases for object shapes.
- Use discriminated unions for variant types.

```typescript
// Good: Discriminated union
type Result<T> =
  | { success: true; data: T }
  | { success: false; error: string }

function processResult(result: Result<User>) {
  if (result.success) {
    console.log(result.data.name)
  } else {
    console.error(result.error)
  }
}

// Bad: Type assertion
const user = data as User  // Dangerous!
```

## Error Handling

- Custom error classes for domain errors.
- Never swallow errors. Always log or rethrow.
- Error boundaries for React components.
- Try/catch only when you can recover.

```typescript
// Good: Custom error class
class NotFoundError extends Error {
  constructor(resource: string, id: string) {
    super(`${resource} with id ${id} not found`)
    this.name = 'NotFoundError'
  }
}

// Good: Explicit error handling
async function getUser(id: string): Promise<User> {
  const user = await db.user.findUnique({ where: { id } })
  if (!user) throw new NotFoundError('User', id)
  return user
}

// Bad: Swallowed error
async function getUser(id: string): Promise<User | null> {
  try {
    return await db.user.findUnique({ where: { id } })
  } catch {
    return null  // What went wrong? Who knows!
  }
}
```

## Immutability

- Prevent mutation with `readonly`, `as const`, `Object.freeze`.
- Use spread over push/pop/splice.
- Pure functions: same input, same output, no side effects.

```typescript
// Good: Immutable operations
const addItem = (items: readonly Item[], item: Item): Item[] => [...items, item]
const removeItem = (items: readonly Item[], id: string): Item[] => items.filter(i => i.id !== id)

// Bad: Mutation
const addItem = (items: Item[], item: Item): void => { items.push(item) }
const removeItem = (items: Item[], id: string): void => {
  const index = items.findIndex(i => i.id === id)
  if (index >= 0) items.splice(index, 1)
}
```

## Async Patterns

- Always handle promises. No floating promises.
- Use async/await over .then() chains.
- Parallel when possible: Promise.all for independent operations.
- Timeouts on external calls. Never wait forever.

```typescript
// Good: Parallel execution with timeout
async function loadDashboard(userId: string): Promise<Dashboard> {
  const [user, orders, notifications] = await Promise.all([
    getUser(userId),
    getOrders(userId),
    getNotifications(userId),
  ])

  return { user, orders, notifications }
}

// Bad: Sequential when parallel is possible
async function loadDashboard(userId: string): Promise<Dashboard> {
  const user = await getUser(userId)        // 100ms
  const orders = await getOrders(userId)    // 200ms
  const notifications = await getNotifications(userId)  // 150ms
  // Total: 450ms (could be 200ms with parallel)
  return { user, orders, notifications }
}
```

## Code Smells

| Smell | Detection | Fix |
|-------|-----------|-----|
| Long function | > 30 lines | Extract smaller functions |
| Deep nesting | > 3 levels | Use early returns |
| Magic numbers | Hardcoded values | Extract to constants |
| Duplicated code | Same logic 3+ times | Extract shared function |
| God class | Does too many things | Split into focused classes |
| Feature envy | Uses another class's data | Move function to that class |
| Primitive obsession | Using primitives for complex concepts | Create value objects |

## Comments

- No comments for obvious code. Code should be self-documenting.
- Document why, not what. Explain reasoning, not mechanics.
- JSDoc on all exports: parameters, return values, throws.
- TODO format: `// TODO(username): description - ticket-ref`

```typescript
/**
 * Calculates the discounted price for an item.
 *
 * @param price - Original price in cents
 * @param discount - Discount percentage (0-1)
 * @returns Discounted price in cents
 * @throws {ValidationError} When discount is out of range
 *
 * @example
 * calculatePrice(1000, 0.15) // 850
 */
function calculatePrice(price: number, discount: number): number {
  if (discount < 0 || discount > 1) {
    throw new ValidationError('Discount must be between 0 and 1')
  }
  return Math.round(price * (1 - discount))
}
```

## Quick Reference

```bash
bun run check-types
bun run lint
bun run format
bun test
```

## Related Skills

- `engineering/code-review` for review process
- `engineering/tdd-workflow` for test standards
- `ui/house-style` for UI-specific conventions
