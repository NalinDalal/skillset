# Contributing to {{PROJECT_NAME}}

Thank you for contributing! This guide helps you get started.

## Code of Conduct
By participating, you agree to our [Code of Conduct](CODE_OF_CONDUCT.md).

## Quick Start
```bash
# 1. Clone & install
git clone https://github.com/{{ORG}}/{{REPO}}.git
cd {{REPO}}
bun install

# 2. Configure environment
cp .env.example .env
# Edit .env with your values

# 3. Start infrastructure
docker compose up -d db redis

# 4. Setup database
bunx prisma migrate dev
bun run db:seed  # Optional: seed demo data

# 5. Start development
bun run dev
```

## Development Workflow

### Branch Naming
| Type | Prefix | Example |
|------|--------|---------|
| Feature | `feat/` | `feat/cursor-sync` |
| Bug Fix | `fix/` | `fix/websocket-reconnect` |
| Refactor | `refactor/` | `refactor/tool-registry` |
| Docs | `docs/` | `docs/adr-auth-strategy` |
| Chore | `chore/` | `chore/update-deps` |

### Commit Messages
Follow [Conventional Commits](https://www.conventionalcommits.org/):
```
type(scope): description

[optional body]

[optional footer]
```

Examples:
```
feat(canvas): add eraser tool with pressure sensitivity

fix(ws): handle reconnection with exponential backoff

docs(adr): record decision to use TanStack Router

chore(deps): upgrade bun to 1.2.0
```

### Pull Request Process
1. **Create design doc** (new features): `docs/design/feature-name.md`
2. **Implement** with tests
3. **Update docs**: ADR, feature timeline, API specs
4. **Run checks locally**:
   ```bash
   bun run lint
   bun run check-types
   bun run build
   bun run test
   ```
5. **Open PR** with:
   - Link to issue
   - Link to design doc (if applicable)
   - Screenshots/videos (UI changes)
   - Test results
6. **CI must pass** (typecheck, lint, build, test)
7. **Code review** (1 approval minimum)
8. **Squash merge** to `main`

## Code Standards

### Naming Conventions
| Element | Convention |
|---------|------------|
| Files | `camelCase.ts` |
| Functions/Variables | `camelCase` |
| Types/Interfaces | `PascalCase` |
| Enums | `PascalCase` |
| Constants | `UPPER_SNAKE_CASE` |
| React Components | `PascalCase` |
| CSS Classes | `kebab-case` |

### TypeScript
- No `any` — use `unknown` or proper types
- Strict mode enabled
- JSDoc on all exports
- Discriminated unions for WS messages

### Architecture
- Shared code in `packages/`
- Service layer for business logic
- Diff-based WS sync (no full state)
- Repository pattern for data access

### Testing
- Unit: `*.test.ts` alongside source
- Integration: `tests/integration/`
- E2E: `tests/e2e/`
- Target: >80% coverage on critical paths

## Documentation Standards
- **Design docs** for new features (`docs/design/`)
- **ADRs** for architecture decisions (`docs/adr/`)
- **Incident postmortems** for production issues (`docs/incidents/`)
- **API specs** generated from code (`openapi.yaml`, `asyncapi.yaml`)
- **AGENTS.md** for AI agents (auto-generated)

## Release Process
1. Version bump in `package.json` (workspace root)
2. Changelog generated from commits
3. Git tag: `v{major}.{minor}.{patch}`
4. GitHub Release with notes
5. Deploy workflow triggers automatically

## Getting Help
- **Questions**: GitHub Discussions
- **Bugs**: GitHub Issues (use template)
- **Security**: Email security@{{ORG}}.com
- **IRC/Slack**: #{{REPO}}-dev

## Recognition
Contributors are recognized in:
- `AUTHORS.md`
- Release notes
- GitHub Contributors graph

---
*Based on nerdev-co conventions. See `nerdev-monorepo` and `nerdev-abstraction` skills for details.*