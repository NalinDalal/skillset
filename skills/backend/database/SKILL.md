---
name: database
description: Prisma patterns , schema design, migrations, seeding, query optimization, connection pooling, transactions, soft deletes, audit logs, multi-tenancy, read replicas. Load when designing data layer or optimizing queries.
---
# Database , Prisma + PostgreSQL Patterns

**When to use:** Schema design, migrations, query optimization, seeding, connection management, advanced patterns.


## Prisma Setup
```typescript
// packages/db/src/client.ts
import { PrismaClient } from '@prisma/client'

const globalForPrisma = globalThis as unknown as { prisma: PrismaClient }

export const prisma = globalForPrisma.prisma || new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
  datasources: {
    db: { url: process.env.DATABASE_URL },
  },
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

// Graceful shutdown
process.on('beforeExit', async () => {
  await prisma.$disconnect()
})
```

## Schema Conventions

### Naming
```prisma
// PascalCase models, camelCase fields, snake_case in DB
model User {
  id            String    @id @default(cuid())
  email         String    @unique @map("email")
  passwordHash  String    @map("password_hash")
  firstName     String?   @map("first_name")
  lastName      String?   @map("last_name")
  role          UserRole  @default(MEMBER)
  createdAt     DateTime  @default(now()) @map("created_at")
  updatedAt     DateTime  @updatedAt @map("updated_at")
  deletedAt     DateTime? @map("deleted_at") // Soft delete
  
  sessions      Session[]
  memberships   Membership[]
  
  @@index([email])
  @@index([deletedAt])
  @@map("users")
}

enum UserRole {
  ADMIN
  MEMBER
  VIEWER
}
```
### Required Fields on Every Model
```prisma
// Base fields for all models
abstract model BaseModel {
  id        String   @id @default(cuid())
  createdAt DateTime @default(now()) @map("created_at")
  updatedAt DateTime @updatedAt @map("updated_at")
  deletedAt DateTime? @map("deleted_at") // Soft delete
}
```
### Relations
```prisma
// One-to-Many
model Project {
  id          String   @id @default(cuid())
  name        String
  ownerId     String   @map("owner_id")
  owner       User     @relation(fields: [ownerId], references: [id], onDelete: Cascade)
  members     Membership[]
  tasks       Task[]
  
  @@map("projects")
}

model Membership {
  id        String   @id @default(cuid())
  userId    String   @map("user_id")
  projectId String   @map("project_id")
  role      ProjectRole @default(MEMBER)
  user      User     @relation(fields: [userId], references: [id], onDelete: Cascade)
  project   Project  @relation(fields: [projectId], references: [id], onDelete: Cascade)
  
  @@unique([userId, projectId])
  @@map("memberships")
}
```
### Optimistic Concurrency
```prisma
model Task {
  id        String   @id @default(cuid())
  title     String
  version   Int      @default(1) // Optimistic locking
  updatedAt DateTime @updatedAt
  
  @@map("tasks")
}

// Usage in service
async function updateTask(id: string, data: Partial<Task>, expectedVersion: number) {
  return prisma.$transaction(async (tx) => {
    const task = await tx.task.findUnique({ where: { id } })
    if (!task || task.version !== expectedVersion) {
      throw new OptimisticLockError('Task was modified by another user')
    }
    return tx.task.update({
      where: { id },
      data: { ...data, version: { increment: 1 } },
    })
  })
}
```

## Migrations

### Development Workflow
```bash
# 1. Edit schema.prisma
# 2. Create migration
bunx prisma migrate dev --name descriptive_name

# 3. Review generated SQL in prisma/migrations/*/migration.sql
# 4. Commit migration folder
git add prisma/migrations/
git commit -m "db: add project members table"
```
### Production Deployment
```bash
# Apply migrations (non-interactive)
bunx prisma migrate deploy

# Or with GitHub Actions
- run: bunx prisma migrate deploy
  env:
    DATABASE_URL: ${{ secrets.DATABASE_URL }}
```
### Migration Safety
```prisma
// NEVER do this in production migration:
// - Drop column (use @deletedAt soft delete instead)
// - Rename column (add new, migrate data, drop old in next migration)
// - Change type without cast

// Safe patterns:
model User {
  // Adding optional field - safe
  phone String? @map("phone")
  
  // Adding required field with default - safe
  status String @default("active") @map("status")
  
  // Adding index - safe (CONCURRENTLY in Postgres)
  @@index([status])
}
```
### Seed Data
```typescript
// packages/db/src/seed.ts
import { prisma } from './client'
import { hashPassword } from '@/lib/auth/password'

async function main() {
  // Clean in order (respect FK)
  await prisma.session.deleteMany()
  await prisma.membership.deleteMany()
  await prisma.project.deleteMany()
  await prisma.user.deleteMany()

  // Admin user
  const admin = await prisma.user.create({
    data: {
      email: 'admin@example.com',
      passwordHash: await hashPassword('AdminPass123!'),
      firstName: 'Admin',
      lastName: 'User',
      role: 'ADMIN',
    },
  })

  // Demo project
  const project = await prisma.project.create({
    data: {
      name: 'Demo Project',
      ownerId: admin.id,
      members: {
        create: { userId: admin.id, role: 'OWNER' },
      },
    },
  })

  console.log({ admin, project })
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
```

## Query Patterns

### Efficient Queries
```typescript
// ❌ N+1 problem
const projects = await prisma.project.findMany()
for (const p of projects) {
  p.owner = await prisma.user.findUnique({ where: { id: p.ownerId } })
}

// ✅ Include (JOIN)
const projects = await prisma.project.findMany({
  include: {
    owner: { select: { id: true, name: true, email: true } },
    _count: { select: { members: true, tasks: true } },
  },
})

// ✅ Select only needed fields
const users = await prisma.user.findMany({
  select: { id: true, email: true, firstName: true, lastName: true },
  where: { deletedAt: null },
})
```
### Pagination (Cursor-Based)
```typescript
// Cursor pagination for large datasets
async function getProjectsCursor(cursor?: string, limit = 25) {
  return prisma.project.findMany({
    take: limit + 1,
    cursor: cursor ? { id: cursor } : undefined,
    orderBy: { createdAt: 'desc' },
    where: { deletedAt: null },
    include: { owner: { select: { id: true, name: true } } },
  })
}

// Returns: { data, nextCursor, hasMore }
```
### Full-Text Search
```typescript
// PostgreSQL full-text search
const projects = await prisma.$queryRaw`
  SELECT *, ts_rank_cd(to_tsvector('english', name), query) as rank
  FROM projects, plainto_tsquery('english', ${searchTerm}) query
  WHERE to_tsvector('english', name) @@ query
  AND deleted_at IS NULL
  ORDER BY rank DESC
  LIMIT 20
`
```

## Transactions

### Basic Transaction
```typescript
await prisma.$transaction(async (tx) => {
  const project = await tx.project.create({ data: { name: 'New', ownerId: userId } })
  await tx.membership.create({ data: { userId, projectId: project.id, role: 'OWNER' } })
  await tx.activity.create({ data: { userId, type: 'PROJECT_CREATED', projectId: project.id } })
})
```
### Interactive Transaction (Long-Running)
```typescript
// Use for complex logic with external calls
const result = await prisma.$transaction(async (tx) => {
  // ... multiple operations
  return { project, membership }
}, {
  maxWait: 5000,   // Max wait for lock
  timeout: 10000,  // Max transaction time
  isolationLevel: 'ReadCommitted', // or 'Serializable'
})
```

## Connection Pooling

### PgBouncer (Production)
```bash
# DATABASE_URL with PgBouncer
postgresql://user:pass@host:6543/db?pgbouncer=true&connection_limit=20
```
### Prisma Connection Limit
```typescript
// In schema.prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
  // Connection limit handled by PgBouncer
}
```

## Soft Deletes
```typescript
// Middleware for automatic soft delete filtering
prisma.$use(async (params, next) => {
  if (params.action === 'findUnique' || params.action === 'findFirst') {
    params.action = 'findFirst'
    params.args.where = { ...params.args.where, deletedAt: null }
  }
  if (params.action === 'findMany') {
    params.args.where = { ...params.args.where, deletedAt: null }
  }
  if (params.action === 'delete' || params.action === 'deleteMany') {
    params.action = 'update'
    params.args.data = { deletedAt: new Date() }
  }
  return next(params)
})

// Hard delete when needed
await prisma.project.delete({ where: { id }, force: true }) // Custom extension
```

## Audit Logs
```prisma
model AuditLog {
  id        String   @id @default(cuid())
  entityId  String   @map("entity_id")
  entityType String  @map("entity_type")
  action    String   // CREATE, UPDATE, DELETE
  userId    String?  @map("user_id")
  changes   Json     // { field: { old, new } }
  metadata  Json?    // IP, user agent, etc.
  createdAt DateTime @default(now()) @map("created_at")
  
  @@index([entityType, entityId])
  @@index([userId])
  @@index([createdAt])
  @@map("audit_logs")
}
```

```typescript
// lib/audit.ts
export async function auditLog(
  entityId: string,
  entityType: string,
  action: 'CREATE' | 'UPDATE' | 'DELETE',
  userId: string | null,
  changes: Record<string, { old: any; new: any }>,
  metadata?: object
) {
  await prisma.auditLog.create({
    data: { entityId, entityType, action, userId, changes, metadata },
  })
}

// Usage in service
async function updateProject(id: string, data: Partial<Project>, userId: string) {
  const old = await prisma.project.findUnique({ where: { id } })
  const updated = await prisma.project.update({ where: { id }, data })
  
  const changes = Object.keys(data).reduce((acc, key) => {
    if (old[key] !== updated[key]) {
      acc[key] = { old: old[key], new: updated[key] }
    }
    return acc
  }, {})
  
  await auditLog(id, 'Project', 'UPDATE', userId, changes)
  return updated
}
```

## Multi-Tenancy

### Row-Level Security (PostgreSQL)
```sql
-- Enable RLS
ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- Policy: users only see their projects
CREATE POLICY project_isolation ON projects
  USING (id IN (SELECT project_id FROM memberships WHERE user_id = current_setting('app.current_user_id')));
```

```typescript
// Middleware to set RLS context
prisma.$use(async (params, next) => {
  if (currentUser) {
    await prisma.$executeRawUnsafe(`SET LOCAL app.current_user_id = '${currentUser.id}'`)
  }
  return next(params)
})
```

## Read Replicas
```typescript
// packages/db/src/client.ts
const readReplica = new PrismaClient({
  datasources: { db: { url: process.env.DATABASE_READ_URL } },
})

// Use for read-heavy operations
export async function getDashboardStats(userId: string) {
  const [projects, tasks, members] = await Promise.all([
    readReplica.project.count({ where: { ownerId: userId } }),
    readReplica.task.count({ where: { assigneeId: userId } }),
    readReplica.membership.count({ where: { userId } }),
  ])
  return { projects, tasks, members }
}
```

## Performance Checklist

- [ ] Index on all foreign keys
- [ ] Index on frequently queried columns (status, createdAt, deletedAt)
- [ ] Composite indexes for multi-column queries
- [ ] `select` / `include` to avoid over-fetching
- [ ] Cursor pagination for large lists
- [ ] Connection pooling (PgBouncer)
- [ ] Read replicas for analytics/reporting
- [ ] Query logging in dev, slow query monitoring in prod
- [ ] `EXPLAIN ANALYZE` on slow queries


## Related Skills
- `devops/testing` - Testcontainers for integration tests
- `backend/security` - Data encryption, RLS
- `backend/api-design` - Query optimization for API
- `devops/performance` - Database profiling
