---
name: api-design
description: API design patterns: REST conventions, tRPC, GraphQL, versioning, error formats, pagination, filtering, OpenAPI, rate limiting, webhooks, API versioning. Load when designing or reviewing APIs.
---

# API Design: REST, tRPC, GraphQL Patterns

**When to use:** Designing new APIs, reviewing existing APIs, choosing between REST/tRPC/GraphQL, standardizing conventions.


## Choose Your Paradigm

| Paradigm | Best For | Trade-offs |
|----------|----------|------------|
| **REST** | Public APIs, webhooks, simple CRUD, caching | Over/under-fetching, multiple requests |
| **tRPC** | TypeScript monorepos, internal APIs, full-stack type safety | TypeScript-only, no caching, no public schema |
| **GraphQL** | Complex queries, multiple clients, federated data | Complexity, N+1, caching harder |

**Default for nerdev projects:** tRPC for internal, REST for public/webhooks.


## REST Conventions

### URL Structure
```
GET    /api/v1/projects                    # List
POST   /api/v1/projects                    # Create
GET    /api/v1/projects/{id}               # Get one
PATCH  /api/v1/projects/{id}               # Partial update
PUT    /api/v1/projects/{id}               # Full replace
DELETE /api/v1/projects/{id}               # Delete

# Nested resources
GET    /api/v1/projects/{id}/tasks         # List tasks
POST   /api/v1/projects/{id}/tasks         # Create task
GET    /api/v1/projects/{id}/tasks/{tid}   # Get task

# Actions (non-CRUD) - use POST with action in body or separate endpoint
POST   /api/v1/projects/{id}/archive       # Archive
POST   /api/v1/projects/{id}/duplicate     # Duplicate
```

### HTTP Status Codes
| Code | Use For |
|------|---------|
| `200` | Success (GET, PATCH, PUT) |
| `201` | Created (POST) |
| `204` | No Content (DELETE) |
| `400` | Bad Request (validation) |
| `401` | Unauthorized |
| `403` | Forbidden |
| `404` | Not Found |
| `409` | Conflict (optimistic lock, duplicate) |
| `422` | Unprocessable Entity (semantic validation) |
| `429` | Too Many Requests |
| `500` | Internal Server Error |
| `503` | Service Unavailable |

### Request/Response Format

#### Success Response
```json
{
  "data": { "id": "abc123", "name": "Project", "createdAt": "2024-01-15T10:30:00Z" },
  "meta": { "requestId": "req_abc123" }
}
```

#### List Response
```json
{
  "data": [
    { "id": "abc123", "name": "Project 1" },
    { "id": "def456", "name": "Project 2" }
  ],
  "meta": {
    "requestId": "req_abc123",
    "pagination": {
      "page": 1,
      "limit": 25,
      "total": 100,
      "totalPages": 4,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

#### Error Response
```json
{
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input",
    "details": [
      { "field": "name", "message": "Name is required" },
      { "field": "email", "message": "Invalid email format" }
    ],
    "requestId": "req_abc123"
  }
}
```

### Error Codes (Standardized)
| Code | HTTP | Meaning |
|------|------|---------|
| `VALIDATION_ERROR` | 400 | Input validation failed |
| `UNAUTHORIZED` | 401 | Missing/invalid auth |
| `FORBIDDEN` | 403 | Authenticated but not allowed |
| `NOT_FOUND` | 404 | Resource doesn't exist |
| `CONFLICT` | 409 | Resource conflict (duplicate, version mismatch) |
| `RATE_LIMITED` | 429 | Too many requests |
| `INTERNAL_ERROR` | 500 | Unexpected server error |
| `SERVICE_UNAVAILABLE` | 503 | Downstream dependency down |


## Pagination

### Cursor-Based (Preferred for Large Data)
```typescript
// Request
GET /api/v1/projects?cursor=abc123&limit=25

// Response
{
  "data": [...],
  "meta": {
    "pagination": {
      "cursor": "def456",     // Next cursor
      "hasMore": true,
      "limit": 25
    }
  }
}
```

### Offset-Based (Simple, Small Data)
```typescript
// Request
GET /api/v1/projects?page=2&limit=25

// Response
{
  "data": [...],
  "meta": {
    "pagination": {
      "page": 2,
      "limit": 25,
      "total": 100,
      "totalPages": 4
    }
  }
}
```


## Filtering & Sorting

### Query Parameters
```
# Filtering
GET /api/v1/projects?status=active&ownerId=abc123&name[contains]=test

# Sorting
GET /api/v1/projects?sort=-createdAt,+name

# Combined
GET /api/v1/projects?status=active&sort=-createdAt&limit=25&cursor=abc123
```

### Filter Syntax
| Operator | Example | Description |
|----------|---------|-------------|
| Exact | `status=active` | Equality |
| In | `status[in]=active,pending` | Multiple values |
| Not | `status[not]=archived` | Negation |
| Contains | `name[contains]=test` | Substring (case-insensitive) |
| StartsWith | `name[startsWith]=pro` | Prefix |
| EndsWith | `name[endsWith]=ject` | Suffix |
| GT/LT | `createdAt[gt]=2024-01-01` | Greater/less than |
| GTE/LTE | `createdAt[gte]=2024-01-01` | Greater/less than or equal |


## Versioning

### URL Versioning (Recommended)
```
/api/v1/projects
/api/v2/projects
```

### Header Versioning (Alternative)
```
Accept: application/vnd.myapp.v2+json
```

### Deprecation Policy
- Support previous version for **12 months** minimum
- `Deprecation: true` header on deprecated endpoints
- `Sunset: Sat, 01 Jan 2025 00:00:00 GMT` header with removal date
- Communication 6 months before removal


## OpenAPI / Schema

### Generate from Code (tRPC → OpenAPI)
```typescript
// trpc-openapi
import { openapiProcedure, createOpenApiExpressMiddleware } from 'trpc-openapi'

export const projectRouter = router({
  list: openapiProcedure
    .input(z.object({ limit: z.number().default(25), cursor: z.string().optional() }))
    .output(paginatedProjectsSchema)
    .query(async ({ input }) => { ... }),

  create: openapiProcedure
    .input(createProjectSchema)
    .output(projectSchema)
    .mutation(async ({ input }) => { ... }),
})
```

### Manual OpenAPI (REST)
```yaml
# openapi.yaml
openapi: 3.0.3
info:
  title: MyApp API
  version: 1.0.0
servers:
  - url: https://api.example.com/v1
paths:
  /projects:
    get:
      operationId: listProjects
      parameters:
        - $ref: '#/components/parameters/LimitParam'
        - $ref: '#/components/parameters/CursorParam'
      responses:
        '200':
          description: Success
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PaginatedProjects'
components:
  schemas:
    Project:
      type: object
      properties:
        id: { type: string, format: uuid }
        name: { type: string, maxLength: 100 }
        status: { type: string, enum: [active, archived] }
        createdAt: { type: string, format: date-time }
    PaginatedProjects:
      type: object
      properties:
        data: { type: array, items: { $ref: '#/components/schemas/Project' } }
        meta:
          type: object
          properties:
            pagination:
              $ref: '#/components/schemas/PaginationMeta'
  parameters:
    LimitParam:
      name: limit
      in: query
      schema: { type: integer, minimum: 1, maximum: 100, default: 25 }
```


## tRPC Patterns (Type-Safe Internal APIs)

### Router Structure
```typescript
// server/routers/_app.ts
export const appRouter = router({
  auth: authRouter,
  projects: projectRouter,
  tasks: taskRouter,
  users: userRouter,
  admin: adminRouter,
})

export type AppRouter = typeof appRouter
```

### Procedures
```typescript
// server/routers/projects.ts
export const projectRouter = router({
  // Public procedure (no auth)
  list: publicProcedure
    .input(z.object({ limit: z.number().default(25), cursor: z.string().optional() }))
    .output(paginatedProjectsSchema)
    .query(async ({ input, ctx }) => { ... }),

  // Protected procedure (requires auth)
  create: protectedProcedure
    .input(createProjectSchema)
    .output(projectSchema)
    .mutation(async ({ input, ctx }) => {
      // ctx.session available
    }),

  // Admin only
  delete: adminProcedure
    .input(z.object({ id: z.string() }))
    .output(z.void())
    .mutation(async ({ input }) => { ... }),
})
```

### Middleware
```typescript
// server/trpc.ts
const protectedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  if (!ctx.session) throw new TRPCError({ code: 'UNAUTHORIZED' })
  return next({ ctx: { ...ctx, session: ctx.session } })
})

const adminProcedure = protectedProcedure.use(async ({ ctx, next }) => {
  if (ctx.session.user.role !== 'ADMIN') throw new TRPCError({ code: 'FORBIDDEN' })
  return next({ ctx })
})

// Rate limiting middleware
const rateLimitedProcedure = publicProcedure.use(async ({ ctx, next }) => {
  const ip = ctx.req.headers.get('x-forwarded-for') || 'unknown'
  const { success } = await rateLimit(`api:${ip}`, 100, 60000)
  if (!success) throw new TRPCError({ code: 'TOO_MANY_REQUESTS' })
  return next({ ctx })
})
```

### Client Usage
```typescript
// Client (React)
const { data } = api.projects.list.useQuery({ limit: 10 })
const createMutation = api.projects.create.useMutation()

// Fully typed end-to-end
createMutation.mutate({ name: 'New Project', visibility: 'private' })
```


## Webhooks

### Outgoing Webhooks
```typescript
// lib/webhooks.ts
import { prisma } from '@/lib/prisma'

interface WebhookEvent {
  event: string
  timestamp: string
  data: object
  signature: string // HMAC-SHA256
}

export async function deliverWebhook(url: string, event: WebhookEvent) {
  const secret = process.env.WEBHOOK_SECRET!
  const payload = JSON.stringify(event)
  const signature = await hmacSha256(secret, payload)

  const delivery = await prisma.webhookDelivery.create({
    data: { url, event: event.event, payload, status: 'PENDING' }
  })

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Webhook-Signature': signature,
        'X-Webhook-Event': event.event,
        'X-Webhook-Delivery': delivery.id,
      },
      body: payload,
    })

    await prisma.webhookDelivery.update({
      where: { id: delivery.id },
      data: { status: res.ok ? 'SUCCESS' : 'FAILED', responseCode: res.status },
    })
  } catch (error) {
    await prisma.webhookDelivery.update({
      where: { id: delivery.id },
      data: { status: 'FAILED', error: error.message },
    })
  }
}

// Retry with exponential backoff (via queue/cron)
```

### Incoming Webhooks (Verify Signature)
```typescript
// middleware/webhook.ts
export function verifyWebhookSignature(secret: string) {
  return async (req: Request, next: () => Response) => {
    const signature = req.headers.get('x-webhook-signature')
    const body = await req.text()
    const expected = await hmacSha256(secret, body)

    if (signature !== expected) {
      return new Response('Invalid signature', { status: 401 })
    }

    return next()
  }
}
```


## Rate Limiting (API Level)

```typescript
// Per-endpoint limits
const limits = {
  'POST /auth/signin': { limit: 5, window: '15m' },
  'POST /auth/signup': { limit: 3, window: '15m' },
  'POST /api/projects': { limit: 30, window: '1m' },
  'GET /api/projects': { limit: 100, window: '1m' },
  'GET /api/projects/:id': { limit: 200, window: '1m' },
}
```


## API Checklist

- [ ] Consistent naming (kebab-case URLs, camelCase JSON)
- [ ] Proper HTTP status codes
- [ ] Standardized error format with requestId
- [ ] Pagination on all list endpoints
- [ ] Filtering/sorting conventions documented
- [ ] Versioning strategy defined
- [ ] OpenAPI spec generated and published
- [ ] Rate limiting on all endpoints
- [ ] Authentication required by default
- [ ] Idempotency keys for mutations (POST/PATCH)
- [ ] Request validation (Zod) on all inputs
- [ ] Response caching headers (ETag, Cache-Control)
- [ ] Webhook retry with backoff
- [ ] Deprecation headers on old versions
- [ ] Audit logs for all mutations


## Related Skills
- `backend/auth` - Authentication middleware
- `backend/security` - Rate limiting, headers, validation
- `backend/database` - Query optimization for API
- `devops/testing` - API contract testing
- `devops/git-ci` - OpenAPI generation in CI
