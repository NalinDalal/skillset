---
name: code-tour
category: architecture
source: ECC (adapted)
description: "Guided codebase walkthroughs for onboarding. Load when onboarding new team members or documenting architecture."

# Code Tour

**When to use:** Onboarding new team members, documenting architecture, creating guided walkthroughs, explaining complex systems.


## What It Does

Creates guided, step-by-step codebase walkthroughs with real file and line anchors. Each tour is tailored to a specific persona.


## Personas

| Persona | Focus | Depth |
|---------|-------|-------|
| `new-joiner` | How to get started, where things are | High-level overview |
| `vibecoder` | Quick implementation patterns | Practical examples |
| `architect` | System design, trade-offs | Deep analysis |
| `pr-reviewer` | What to check, common issues | Focused checklist |
| `rca-investigator` | Debugging, logs, failure modes | Investigation paths |
| `security-reviewer` | Attack surfaces, auth flows | Security-focused |
| `feature-explainer` | How a specific feature works | Feature-focused |
| `bug-fixer` | How to debug, where to look | Problem-solving |


## Tour Structure

```markdown
# Code Tour: [System Name]

**Persona:** [target persona]
**Last Updated:** [date]
**Estimated Time:** [X minutes]

## Orientation
[What is this system? What does it do?]

## Module Map
[High-level diagram of components]

## Core Path
[The most important code path, step by step]

## Edge Cases
[Where things get tricky]

## Next Move
[What to explore after this tour]
```


## Writing Style: SMIG Rule

Every section follows:

- **S**ituation - What's happening?
- **M**echanism - How does it work?
- **I**mplication - Why does it matter?
- **G**otcha - What to watch out for?

```markdown
## Authentication Flow

**Situation:** Users need to authenticate before accessing protected routes.

**Mechanism:** JWT tokens with refresh rotation. Short-lived access tokens (15min) 
stored in memory, long-lived refresh tokens (7 days) stored in httpOnly cookies.

**Implication:** No token storage in localStorage (XSS safe), but requires 
server-side session table for revocation.

**Gotcha:** Refresh token rotation means each use invalidates the previous token. 
If a user has multiple tabs open, only the most recent tab stays authenticated.
```


## Tour Example: New Joiner

```markdown
# Code Tour: E-Commerce Platform

**Persona:** new-joiner
**Last Updated:** 2026-08-13
**Estimated Time:** 20 minutes

## Orientation

This is a monorepo with 3 apps:
- `apps/web` - Customer-facing storefront (Next.js)
- `apps/admin` - Internal admin panel (React)
- `apps/api` - Backend API (Node.js + Express)

## Module Map

```
apps/
├── web/           # Customer UI
├── admin/         # Admin UI
└── api/           # Backend
packages/
├── ui/            # Shared components
├── db/            # Database schema
└── common/        # Shared utilities
```

## Core Path: User Places Order

1. **Cart → Checkout** (`apps/web/src/pages/checkout.tsx:45`)
   - User clicks "Proceed to Checkout"
   - Redirects to `/checkout` with cart items in state

2. **Payment Processing** (`apps/api/src/routes/payments.ts:23`)
   - Stripe integration for payment
   - Creates payment intent, returns client secret

3. **Order Creation** (`apps/api/src/routes/orders.ts:67`)
   - Validates inventory
   - Creates order in database
   - Sends confirmation email

4. **Order Confirmation** (`apps/web/src/pages/order-confirmation.tsx:12`)
   - Shows order summary
   - Provides tracking information

## Edge Cases

- **Inventory Race Condition** (`apps/api/src/services/inventory.ts:89`)
  - Two users buy last item simultaneously
  - Optimistic locking prevents overselling

- **Payment Failure** (`apps/api/src/routes/payments.ts:156`)
  - If payment fails after order creation
  - Order marked as "payment_failed", inventory released

## Next Move

After this tour, explore:
1. `apps/api/src/middleware/` - How requests are authenticated
2. `packages/db/prisma/schema.prisma` - Data model
3. `apps/web/src/hooks/` - React hooks for data fetching
```


## Code Annotations for Tours

Mark important code with annotations:

```typescript
/**
 * @tour [tour-name] - [step-number]: [brief description]
 * @tour-persona new-joiner, architect
 * @tour-gotcha Watch out for race condition here
 */
export async function processOrder(orderId: string): Promise<Order> {
  // ...
}
```


## Generating Tours

### From Code
```bash
# Generate tour from code structure
find . -name "*.ts" -o -name "*.tsx" | head -20

# Identify main entry points
grep -r "export default\|export function" --include="*.ts" --include="*.tsx"

# Find important patterns
grep -r "@tour\|@important\|@gotcha" --include="*.ts" --include="*.tsx"
```

### From Issues
Look at past incidents and bugs - they reveal:
- Complex code paths
- Common failure modes
- Areas needing documentation


## Quick Commands

```bash
# Create new tour
echo "# Code Tour: [System Name]" > CODE_TOUR.md

# Add annotations to code
# Add @tour comments to important functions

# Update tour after changes
# Keep file references and line numbers current
```


## Related Skills

- `nerdev/nerdev-docs` - Documentation patterns
- `architecture/blueprint` - Implementation planning
- `ai-agent/agent-docs-writer` - AI agent guidance
