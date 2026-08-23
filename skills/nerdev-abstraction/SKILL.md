---
name: nerdev-abstraction
description: Interface-first, registry, factory, plugin protocol for plug-and-play architecture patterns
---

# nerdev-abstraction Skill

**Purpose**: Enforce plug-and-play abstraction patterns across any codebase -- interface-driven design, registry-based composition, workspace packages, and zero-duplication shared utilities.

---

## Core Abstraction Principles

### 1. Interface-First Design
Every pluggable component defines a **contract** before implementation.

```typescript
// packages/core/interfaces/tool.ts
export interface Tool<TConfig = unknown> {
  readonly id: string;
  readonly name: string;
  readonly cursor: string;
  configure(config: TConfig): void;
  onActivate(): void;
  onDeactivate(): void;
  handleInput(event: InputEvent): void;
  render(context: RenderContext): void;
}

// packages/core/interfaces/service.ts
export interface Service {
  readonly name: string;
  initialize(): Promise<void>;
  shutdown(): Promise<void>;
  healthCheck(): Promise<HealthStatus>;
}
```

### 2. Registry Pattern (Central Composition)
Single source of truth for all implementations.

```typescript
// packages/core/registry/toolRegistry.ts
import type { Tool } from '../interfaces/tool';

class ToolRegistry {
  private tools = new Map<string, Tool>();

  register(tool: Tool): void {
    if (this.tools.has(tool.id)) {
      throw new Error(`Tool ${tool.id} already registered`);
    }
    this.tools.set(tool.id, tool);
  }

  get(id: string): Tool | undefined {
    return this.tools.get(id);
  }

  getAll(): Tool[] {
    return Array.from(this.tools.values());
  }

  unregister(id: string): boolean {
    return this.tools.delete(id);
  }
}

export const toolRegistry = new ToolRegistry();
```

### 3. Factory Pattern (Configurable Instantiation)
Create instances with runtime configuration.

```typescript
// packages/core/factory/toolFactory.ts
import type { Tool, ToolConfig } from '../interfaces/tool';
import { toolRegistry } from '../registry/toolRegistry';

interface ToolFactoryOptions {
  defaultConfig?: Partial<ToolConfig>;
}

export function createToolFactory(options: ToolFactoryOptions = {}) {
  return {
    create<T extends Tool>(id: string, config?: Partial<ToolConfig>): T {
      const ToolClass = toolRegistry.get(id);
      if (!ToolClass) {
        throw new Error(`Tool ${id} not found in registry`);
      }
      const instance = new ToolClass();
      instance.configure({ ...options.defaultConfig, ...config } as ToolConfig);
      return instance;
    },

    createAll(configs: Record<string, Partial<ToolConfig>>): Tool[] {
      return Object.entries(configs).map(([id, config]) => this.create(id, config));
    },
  };
}
```

### 4. Plugin Protocol (Standardized Entry Point)
Every plugin exports a standard shape.

```typescript
// packages/core/plugin/protocol.ts
export interface Plugin<TConfig = unknown> {
  readonly metadata: PluginMetadata;
  readonly tools?: Tool[];
  readonly services?: Service[];
  readonly hooks?: HookDefinition[];
  configure(config: TConfig): Promise<void> | void;
}

export interface PluginMetadata {
  id: string;
  name: string;
  version: string;
  dependencies?: string[];
  peerDependencies?: string[];
}

export interface HookDefinition {
  name: string;
  handler: (...args: unknown[]) => Promise<void> | void;
  priority?: number;
}
```

### 5. Workspace Package Structure
```
packages/
├── core/                    # Interfaces, registry, factory, plugin protocol
│   ├── interfaces/
│   │   ├── tool.ts
│   │   ├── service.ts
│   │   ├── store.ts
│   │   └── index.ts
│   ├── registry/
│   │   ├── toolRegistry.ts
│   │   ├── serviceRegistry.ts
│   │   └── index.ts
│   ├── factory/
│   │   ├── toolFactory.ts
│   │   ├── serviceFactory.ts
│   │   └── index.ts
│   ├── plugin/
│   │   ├── protocol.ts
│   │   ├── loader.ts
│   │   └── index.ts
│   ├── hooks/
│   │   ├── hookManager.ts
│   │   ├── lifecycle.ts
│   │   └── index.ts
│   └── index.ts             # Barrel export
│
├── shared/                  # Cross-cutting utilities (no domain logic)
│   ├── types/
│   ├── utils/
│   ├── constants/
│   ├── errors/
│   ├── validation/
│   └── index.ts
│
├── config/                  # Configuration schemas & env
│   ├── env.ts
│   ├── schema.ts
│   └── index.ts
│
├── database/                # Database abstraction (if needed)
│   ├── client.ts
│   ├── migrations/
│   ├── repositories/
│   └── index.ts
│
└── ui/                      # Design system primitives
    ├── components/
    ├── tokens/
    ├── hooks/
    └── index.ts
```

### 6. Service Layer Abstraction
Business logic separated from transport (HTTP, WS, CLI).

```typescript
// packages/core/interfaces/service.ts
export interface Repository<T, TFilter = unknown> {
  findById(id: string): Promise<T | null>;
  findMany(filter: TFilter): Promise<T[]>;
  create(data: Omit<T, 'id'>): Promise<T>;
  update(id: string, data: Partial<T>): Promise<T>;
  delete(id: string): Promise<void>;
}

export interface UnitOfWork {
  begin(): Promise<void>;
  commit(): Promise<void>;
  rollback(): Promise<void>;
  getRepository<T>(repository: Repository<T>): Repository<T>;
}

// Domain service (pure business logic, no framework deps)
export interface UserService {
  createUser(data: CreateUserInput): Promise<User>;
  getUser(id: string): Promise<User | null>;
  updateUser(id: string, data: UpdateUserInput): Promise<User>;
  deleteUser(id: string): Promise<void>;
  // No HTTP, no WS, no Prisma directly
}
```

### 7. Event Bus (Decoupled Communication)
```typescript
// packages/core/events/eventBus.ts
type EventHandler<T = unknown> = (payload: T) => Promise<void> | void;

export class EventBus {
  private handlers = new Map<string, EventHandler[]>();

  subscribe<T>(event: string, handler: EventHandler<T>): () => void {
    const handlers = this.handlers.get(event) || [];
    handlers.push(handler as EventHandler);
    this.handlers.set(event, handlers);
    return () => this.unsubscribe(event, handler);
  }

  unsubscribe<T>(event: string, handler: EventHandler<T>): void {
    const handlers = this.handlers.get(event) || [];
    const index = handlers.indexOf(handler as EventHandler);
    if (index >= 0) handlers.splice(index, 1);
  }

  async publish<T>(event: string, payload: T): Promise<void> {
    const handlers = this.handlers.get(event) || [];
    await Promise.all(handlers.map(h => h(payload)));
  }
}

export const eventBus = new EventBus();
```

### 8. Configuration-Driven Behavior
Behavior controlled by config, not code changes.

```typescript
// packages/config/schema.ts
import { z } from 'zod';

export const appConfigSchema = z.object({
  features: z.object({
    realtime: z.boolean().default(true),
    persistence: z.boolean().default(true),
    collaboration: z.boolean().default(false),
  }),
  limits: z.object({
    maxTools: z.number().default(20),
    maxHistorySize: z.number().default(100),
    debounceMs: z.number().default(1500),
  }),
  integrations: z.object({
    database: z.enum(['postgres', 'sqlite', 'memory']).default('postgres'),
    cache: z.enum(['redis', 'memory']).default('memory'),
    queue: z.enum(['kafka', 'memory']).default('memory'),
  }),
});

export type AppConfig = z.infer<typeof appConfigSchema>;

// packages/config/env.ts
import { appConfigSchema } from './schema';

export function loadConfig(): AppConfig {
  const raw = {
    features: {
      realtime: process.env.FEATURE_REALTIME === 'true',
      persistence: process.env.FEATURE_PERSISTENCE !== 'false',
      collaboration: process.env.FEATURE_COLLABORATION === 'true',
    },
    limits: {
      maxTools: Number(process.env.MAX_TOOLS) || 20,
      maxHistorySize: Number(process.env.MAX_HISTORY) || 100,
      debounceMs: Number(process.env.DEBOUNCE_MS) || 1500,
    },
    integrations: {
      database: (process.env.DB_DRIVER as any) || 'postgres',
      cache: (process.env.CACHE_DRIVER as any) || 'memory',
      queue: (process.env.QUEUE_DRIVER as any) || 'memory',
    },
  };
  return appConfigSchema.parse(raw);
}
```

### 9. Barrel Exports (Clean Public API)
```typescript
// packages/core/index.ts
export * from './interfaces';
export * from './registry';
export * from './factory';
export * from './plugin';
export * from './hooks';
export * from './events';

// Usage in apps
import { Tool, toolRegistry, createToolFactory, eventBus } from '@repo/core';
```

### 10. Dependency Injection (Optional, Lightweight)
```typescript
// packages/core/di/container.ts
type Factory<T> = () => T | Promise<T>;

export class Container {
  private singletons = new Map<string, unknown>();
  private factories = new Map<string, Factory<unknown>>();

  registerSingleton<T>(token: string, factory: Factory<T>): void {
    this.factories.set(token, factory);
  }

  registerInstance<T>(token: string, instance: T): void {
    this.singletons.set(token, instance);
  }

  async resolve<T>(token: string): Promise<T> {
    if (this.singletons.has(token)) {
      return this.singletons.get(token) as T;
    }
    const factory = this.factories.get(token);
    if (!factory) {
      throw new Error(`No registration for ${token}`);
    }
    const instance = await factory();
    this.singletons.set(token, instance);
    return instance as T;
  }
}

export const container = new Container();
```

---

## Plug-and-Play Checklist

When adding a new pluggable feature:

- [ ] Define interface in `packages/core/interfaces/`
- [ ] Add registry in `packages/core/registry/`
- [ ] Add factory in `packages/core/factory/`
- [ ] Implement in a feature package (e.g., `packages/tools/pencil/`)
- [ ] Register in plugin entry point
- [ ] Export via barrel in `packages/core/index.ts`
- [ ] Document config schema in `packages/config/schema.ts`
- [ ] Add integration tests

---

## Anti-Patterns to Avoid

| Anti-Pattern | Correct Approach |
|--------------|------------------|
| Direct imports between features | Use registry/factory |
| `if (tool === 'pencil')` switches | Polymorphism via interface |
| Hardcoded config values | `packages/config/schema.ts` + env |
| Business logic in HTTP handlers | Service layer (`packages/core/interfaces/service.ts`) |
| Circular dependencies between packages | Depend only on `core` + `shared` |
| Duplicate validation logic | Shared Zod schemas in `shared/validation` |
| Framework code in domain services | Pure TS, inject repositories |
| Global mutable state | Event bus + explicit subscriptions |

---

## Migration Path for Existing Code

1. **Extract interfaces** from concrete implementations
2. **Create registry** and register existing implementations
3. **Replace direct imports** with factory calls
4. **Move shared types/utils** to `packages/shared/`
5. **Add config schema** for hardcoded values
6. **Introduce event bus** for cross-feature communication
7. **Write plugin entry points** for each feature package

---

## Usage with nerdev-monorepo

This skill composes with `nerdev-monorepo`:

```
project/
├── packages/
│   ├── core/              # <-- This skill
│   ├── shared/            # <-- nerdev-monorepo common
│   ├── config/            # <-- This skill
│   ├── database/          # <-- nerdev-monorepo db
│   └── ui/                # <-- nerdev-monorepo ui
├── apps/
│   ├── frontend/
│   ├── http-backend/
│   └── ws-backend/
```

Load both skills:
```
skill nerdev-monorepo
skill nerdev-abstraction
```