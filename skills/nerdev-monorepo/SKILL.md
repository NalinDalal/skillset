---
name: nerdev-monorepo
description: Turborepo + Bun monorepo structure, conventions, CI/CD, and deployment patterns from nerdev-co
---

# nerdev-monorepo Skill

**Purpose**: Enforce the nerdev-co development methodology across all projects -- consistent monorepo structure, file-based architecture, camelCase naming, documented code, and production-ready patterns.

> **Visual, motion, and docs standards:** This skill defines structure and operations. For UI feel (Apple/Google quality), micro-animation restraint, and documentation tone, see [`house-style`](../house-style/SKILL.md). Load both for nerdev-co projects.

> **nerdev-co skill family:** This is one of three core skills. See also [`nerdev-docs`](../nerdev-docs/SKILL.md) for development-integrated documentation (ADRs, design docs, runbooks) and [`nerdev-abstraction`](../nerdev-abstraction/SKILL.md) for interface-first, registry-based plug-and-play patterns. All three work together for nerdev-co projects.

---

## Core Principles

### 1. Monorepo Architecture (Turborepo + Bun)
```
project-root/
├── apps/                    # Independent deployable applications
│   ├── frontend/           # Vite + TanStack Router (preferred) or Next.js
│   ├── http-backend/       # Bun + Elysia (HTTP API)
│   └── ws-backend/         # Bun WebSocket server
├── packages/               # Shared internal packages
│   ├── db/                 # Prisma schema + migrations
│   ├── ui/                 # Design system primitives
│   ├── common/             # Shared types, utils, env config
│   ├── shapes/             # Domain-specific types (if applicable)
│   ├── typescript-config/  # Shared tsconfig presets
│   └── eslint-config/      # Shared ESLint configs
├── docs/                   # Architecture, features, incidents
├── deploy/                 # Nginx, PM2, deployment scripts
├── scripts/                # Automation scripts
├── monitoring/             # Prometheus, Grafana, alert rules
├── turbo.json              # Turborepo pipeline config
├── package.json            # Workspace root config
├── tsconfig.json           # Root TypeScript config
├── eslint.config.js        # Flat ESLint config
├── AGENTS.md               # AI agent guidance (REQUIRED)
├── README.md               # Project overview
├── deploy.md               # Production deployment guide
├── design.md               # Architecture decisions & rationale
├── ARCHITECTURE_MINIMAP.md # Visual architecture reference
├── openapi.yaml            # API contract (generate via script)
├── asyncapi.yaml           # Async/Event contract (if applicable)
└── .env.example            # Environment template (tracked)
```

### 2. Naming Conventions (camelCase Everywhere)
| Element | Convention | Example |
|---------|------------|---------|
| Files | camelCase.ts | `userService.ts`, `roomController.ts` |
| Directories | camelCase | `src/routes`, `src/components`, `src/draw` |
| Functions | camelCase | `getUserById`, `createRoom`, `broadcastDiff` |
| Variables | camelCase | `currentUser`, `roomId`, `shapeDiff` |
| Types/Interfaces | PascalCase | `User`, `RoomState`, `ShapeDiff` |
| Enums | PascalCase | `ToolType`, `UserRole` |
| Constants | UPPER_SNAKE_CASE | `MAX_RETRY_ATTEMPTS`, `DEFAULT_TIMEOUT` |
| React Components | PascalCase | `CanvasToolbar`, `RoomHeader` |
| CSS Classes | kebab-case | `canvas-container`, `tool-button` |

### 3. File-Based Routing (TanStack Router Preferred)
```
apps/frontend/src/routes/
├── __root.tsx              # Root layout + providers
├── index.tsx               # Landing page
├── signin.tsx              # Auth pages
├── signup.tsx
└── canvas/
    └── $roomId.tsx         # Dynamic route: /canvas/:roomId
```
- Auto-generates `routeTree.gen.ts` for type-safe navigation
- Use loaders for data fetching
- Search params validated with Zod

### 4. Documented Code Standards
**Every file must have:**
```typescript
/**
 * @fileoverview Brief description of what this module does
 * @module path/to/file
 */

// For functions:
/**
 * Description of what the function does
 * @param paramName - Description of parameter
 * @returns Description of return value
 * @throws ErrorType - When this error is thrown
 */
export function functionName(paramName: Type): ReturnType {
  // implementation
}

// For types:
/**
 * Description of the type
 * @interface TypeName
 */
export interface TypeName {
  /** Description of property */
  propertyName: Type;
}
```

### 5. Shared Package Patterns

#### packages/common (Required)
```
packages/common/src/
├── env.ts          # Validated env config (Zod)
├── jwt.ts          # JWT sign/verify utilities
├── types.ts        # Shared domain types
├── response.ts     # Standardized API responses
├── pagination.ts   # Cursor/offset pagination helpers
├── rate-limit.ts   # Sliding window rate limiter
└── index.ts        # Barrel export
```

#### packages/ui (Design System)
```
packages/ui/src/
├── components/
│   ├── surface/           # SURFACE, PANEL (island surfaces)
│   ├── button/            # IconButton, Button variants
│   ├── input/             # Form inputs
│   └── ...
├── tokens/
│   ├── colors.ts          # Semantic color tokens
│   ├── spacing.ts         # Spacing scale
│   └── typography.ts      # Font tokens
├── utils/
│   └── cn.ts              # className merger (clsx + tailwind-merge)
└── index.ts
```

#### packages/db (Prisma)
```
packages/db/
├── prisma/
│   ├── schema.prisma      # Single source of truth
│   └── migrations/
├── src/
│   ├── client.ts          # Prisma client singleton
│   ├── seed.ts            # Database seeding
│   └── index.ts
└── package.json
```

### 6. Backend Patterns (Bun + Elysia)

#### HTTP Backend Structure
```
apps/http-backend/src/
├── routes/
│   ├── auth/              # /auth/signin, /auth/signup, /auth/ws-token
│   ├── rooms/             # /rooms CRUD
│   ├── shapes/            # /shapes persistence
│   └── health.ts          # Health check
├── middleware/
│   ├── auth.ts            # Session validation
│   ├── cors.ts            # CORS config
│   ├── rate-limit.ts      # Per-route limiting
│   └── validation.ts      # Zod validation
├── services/
│   ├── authService.ts
│   ├── roomService.ts
│   └── shapeService.ts
├── db/
│   └── prisma.ts          # Prisma client
├── utils/
│   └── errors.ts          # Custom error classes
├── app.ts                 # Elysia app factory
└── index.ts               # Entry point
```

#### WebSocket Backend Structure
```
apps/ws-backend/src/
├── handlers/
│   ├── connection.ts      # Connect/disconnect
│   ├── shapeDiff.ts       # Diff broadcasting
│   ├── cursor.ts          # Cursor sync
│   └── chat.ts            # Chat messages
├── rooms/
│   ├── roomManager.ts     # Room state management
│   └── presence.ts        # User presence
├── auth/
│   └── wsAuth.ts          # Short-lived WS tokens
├── server.ts              # Bun.serve setup
└── index.ts
```

### 6b. HTTP Route File Convention (Elysia)

**One file per resource under `routes/`, named after the resource.**

| Pattern | Example |
|---------|---------|
| Single file per resource | `routes/auth.ts`, `routes/me.ts`, `routes/profile.ts` |
| All HTTP verbs in one file | `GET /me`, `PUT /me` both in `me.ts` |
| Handler naming | `handleGetMe`, `handlePutMe` (or `handleMe` for single-handler) |
| Promotion to folder | `routes/<resource>/index.ts` + `handlers.ts` when resource outgrows one file |

```typescript
// apps/http-backend/src/routes/me.ts
import { t } from 'elysia'

/**
 * @fileoverview Current user profile endpoints
 * @module routes/me
 */

export function handleGetMe(app: Elysia) {
  return app.get('/me', async ({ currentUser }) => currentUser)
}

export function handlePutMe(app: Elysia) {
  return app.put('/me', async ({ body, currentUser, db }) => {
    // update logic
  }, { body: t.Object({ name: t.String(), bio: t.Optional(t.String()) }) })
}
```

```text
# When a resource grows (e.g., familyTree, messages, adminRoleChange):
routes/
├── familyTree/
│   ├── index.ts       # Route registration
│   └── handlers.ts    # All handlers
├── messages/
│   ├── index.ts
│   └── handlers.ts
└── adminRoleChange/
    ├── index.ts
    └── handlers.ts
```

**Rule**: Start with one file. Only split into `routes/<resource>/` when the file genuinely exceeds ~300 lines or has 5+ handlers.

### 7. Frontend Patterns (Vite + TanStack Router)

#### Canvas Engine (CoDraw Pattern)
```
apps/frontend/src/draw/
├── engine/
│   ├── canvasEngine.ts    # Core rendering loop
│   ├── renderLayers.ts    # Static/active/overlay layers
│   └── dirtyRect.ts       # Dirty-rect optimization
├── shapes/
│   ├── shapeTypes.ts      # Shape type definitions
│   ├── shapeFactory.ts    # Shape creation
│   ├── shapeRenderer.ts   # Rough.js rendering
│   └── shapeUtils.ts      # Hit testing, bounds
├── tools/
│   ├── toolManager.ts     # Tool state machine
│   ├── pencilTool.ts
│   ├── rectangleTool.ts
│   └── ...
├── input/
│   ├── mouseHandler.ts
│   ├── touchHandler.ts
│   └── keyboardHandler.ts
├── history/
│   └── undoRedo.ts        # Delta-based stack (cap 100)
├── collaboration/
│   ├── wsClient.ts        # WebSocket client
│   ├── diffApplier.ts     # Apply remote diffs
│   └── autoSave.ts        # Debounced persistence
└── index.ts
```

#### Component Organization
```
apps/frontend/src/components/
├── canvas/                # Canvas-specific components
│   ├── Canvas.tsx
│   ├── Toolbar.tsx
│   └── PropertyPanel.tsx
├── ui/                    # Shared UI (from @repo/ui)
├── auth/                  # Auth forms
└── layout/                # Layout components
```

### 8. Database Patterns (Prisma + PostgreSQL)

#### Schema Conventions
```prisma
// Use camelCase for fields, PascalCase for models
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  passwordHash  String
  name          String
  role          UserRole  @default(MEMBER)
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  sessions      Session[]
  rooms         RoomMember[]
  
  @@map("users")
}

enum UserRole {
  COMMUNITY_HEAD
  SUB_HEAD
  GOTRA_HEAD
  FAMILY_HEAD
  MEMBER
}
```

#### Optimistic Concurrency
```prisma
model Room {
  id        String   @id @default(cuid())
  slug      String   @unique
  version   Int      @default(1)  // For optimistic locking
  shapes    Json     @default("[]")
  updatedAt DateTime @updatedAt
  
  @@map("rooms")
}
```

### 9. Real-Time Sync Pattern (Diff-Based)

```typescript
// Frontend computes minimal diff
interface ShapeDiff {
  added: Shape[];
  modified: Shape[];
  deleted: string[];  // shape IDs
}

// WebSocket message types
type WSMessage =
  | { type: 'shape-diff'; payload: ShapeDiff }
  | { type: 'cursor'; payload: CursorData }
  | { type: 'chat'; payload: ChatMessage }
  | { type: 're-auth'; payload: { token: string } }
  | { type: 'full-state'; payload: RoomState };

// Server broadcasts to room
roomManager.broadcast(roomId, message, excludeUserId?);

// Client applies diff immediately
diffApplier.apply(localState, remoteDiff);
```

### 10. Authentication & Security

#### Session-Based Auth (HTTP)
- bcrypt password hashing (cost 12)
- httpOnly, secure, sameSite=lax cookies
- Server-side session table with expiry
- Token revocation on logout

#### WebSocket Auth
- Short-lived WS tokens via `/auth/ws-token` (JWT, 5min TTL)
- Heartbeat with `re_auth` message
- Reconnection exchanges token for new session

#### Rate Limiting
- Sliding window on auth endpoints (5 req/min)
- Per-IP and per-user limits
- Redis-backed for distributed deployments

### 11. CI/CD Pipeline (GitHub Actions)

```yaml
# .github/workflows/ci.yml
jobs:
  typecheck:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run check-types  # tsc --noEmit

  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run lint

  build:
    runs-on: ubuntu-latest
    needs: [typecheck, lint]
    steps:
      - uses: actions/checkout@v4
      - uses: oven-sh/setup-bun@v1
      - run: bun install
      - run: bun run build
      - uses: actions/upload-artifact@v4
        with:
          name: dist
          path: apps/frontend/dist
```

### 12. Deployment (Single EC2 + Nginx + PM2)

```nginx
# nginx.conf
server {
    listen 80;
    server_name app.example.com;

    location / {
        proxy_pass http://localhost:5173;  # Frontend
    }

    location /api/ {
        proxy_pass http://localhost:3001;  # HTTP Backend
    }

    location /ws/ {
        proxy_pass http://localhost:8080;  # WS Backend
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection "upgrade";
    }
}
```

```json
// ecosystem.config.json (PM2)
{
  "apps": [
    { "name": "http-backend", "script": "apps/http-backend/dist/index.js", "cwd": "./apps/http-backend" },
    { "name": "ws-backend", "script": "apps/ws-backend/dist/index.js", "cwd": "./apps/ws-backend" }
  ]
}
```

---

## Required Files Checklist

Every nerdev-co project MUST have:

- [ ] `AGENTS.md` - AI agent guidance (use agent-docs-writer skill)
- [ ] `README.md` - Project overview with architecture diagram
- [ ] `design.md` - Architecture decisions with rationale tables
- [ ] `ARCHITECTURE_MINIMAP.md` - Visual reference
- [ ] `deploy.md` - Complete production deployment guide
- [ ] `.env.example` - All required env vars documented
- [ ] `openapi.yaml` - API contract (generate via `bun run openapi:gen`)
- [ ] `turbo.json` - Pipeline config with `build`, `lint`, `check-types`, `dev`
- [ ] `eslint.config.js` - Flat config extending `@repo/eslint-config`
- [ ] `tsconfig.json` - Extending `@repo/typescript-config`

---

## Commands Reference

| Command | Description |
|---------|-------------|
| `bun install` | Install all workspace deps |
| `bun run dev` | Start all apps in dev mode |
| `bun run build` | Build all packages and apps |
| `bun run lint` | ESLint across all workspaces |
| `bun run check-types` | TypeScript type checking |
| `bun run format` | Prettier format |
| `bun run db:seed` | Seed database |
| `bun run openapi:gen` | Generate OpenAPI spec |
| `bun run docs:gen` | Generate documentation |

---

## When Creating New Projects

1. **Scaffold with Turborepo**: `bun create turbor@latest my-project`
2. **Configure Bun**: Use `bun` as runtime, package manager, and test runner
3. **Set up shared configs first**: typescript-config, eslint-config
4. **Create packages/common** with env, jwt, types, response utilities
5. **Add packages/db** with Prisma schema
6. **Build apps** following the structure above
7. **Write AGENTS.md first** using agent-docs-writer skill
8. **Document architecture decisions** in design.md with rationale tables
9. **Create deploy.md** before first deployment

---

## Code Review Checklist

- [ ] All files use camelCase (files, functions, variables)
- [ ] All types use PascalCase
- [ ] All functions have JSDoc comments
- [ ] No `any` types (use `unknown` or proper types)
- [ ] Shared code in `packages/`, not duplicated
- [ ] API routes use Zod validation
- [ ] Database changes include migration
- [ ] WebSocket messages typed
- [ ] Error handling with custom error classes
- [ ] Loading/error states in UI
- [ ] Dark mode support in components
- [ ] Accessibility (ARIA, keyboard nav)

---

## Anti-Patterns to Avoid

| Anti-Pattern | Correct Approach |
|--------------|------------------|
| `snake_case` files/functions | Use `camelCase` |
| Inline types in components | Extract to `packages/common/types.ts` |
| Direct Prisma calls in routes | Use service layer |
| Full state sync over WS | Diff-based broadcasting |
| `any` type for WebSocket messages | Discriminated union types |
| Missing JSDoc on exports | Document every public API |
| Hardcoded env values | Use `packages/common/env.ts` |
| Duplicated validation logic | Shared Zod schemas in `common` |
| Next.js for canvas-heavy apps | Vite + TanStack Router |
| Node.js for WebSocket servers | Bun.serve native WebSocket |

---

## References

- **CoDraw**: https://github.com/nerdev-co/codraw
- **Modheshwari**: https://github.com/nerdev-co/modheshwari
- **Turborepo Docs**: https://turbo.build/repo/docs
- **Bun Docs**: https://bun.sh/docs
- **TanStack Router**: https://tanstack.com/router
- **Elysia**: https://elysiajs.com
- **Prisma**: https://prisma.io/docs