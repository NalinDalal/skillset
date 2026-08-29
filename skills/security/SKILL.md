---
name: security
description: Application security , CSP, security headers, input validation, rate limiting, secrets management, authentication hardening, CORS, CSRF, XSS prevention, dependency scanning. Load when securing an app or reviewing security posture.
---
# Security , Hardening Applications

**When to use:** New project security setup, security review, hardening existing app, compliance prep.

---

## Security Headers (Mandatory)

### Content Security Policy (CSP)
```typescript
// middleware.ts or nginx.conf
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval'", // Tighten in prod
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data: https:",
  "font-src 'self' data:",
  "connect-src 'self' https://api.example.com wss://ws.example.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-src 'none'",
  "object-src 'none'",
].join('; ')

// With nonce for inline scripts (recommended)
const nonce = crypto.randomUUID()
const cspWithNonce = csp.replace(
  "script-src 'self' 'unsafe-inline'",
  `script-src 'self' 'nonce-${nonce}'`
)
```
### Security Headers Checklist
| Header | Value | Purpose |
|--------|-------|---------|
| `Content-Security-Policy` | Strict policy above | XSS prevention |
| `X-Frame-Options` | `DENY` | Clickjacking |
| `X-Content-Type-Options` | `nosniff` | MIME sniffing |
| `Referrer-Policy` | `strict-origin-when-cross-origin` | Referrer leakage |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` | Feature policy |
| `Strict-Transport-Security` | `max-age=31536000. includeSubDomains. preload` | HTTPS enforcement |
| `Cross-Origin-Opener-Policy` | `same-origin` | COOP |
| `Cross-Origin-Resource-Policy` | `same-origin` | CORP |
| `Cross-Origin-Embedder-Policy` | `require-corp` | COEP |

### Implementation (Bun/Elysia)
```typescript
// middleware/security.ts
export function securityHeaders() {
  return (req: Request, next: () => Response) => {
    const res = next()
    const headers = new Headers(res.headers)
    
    headers.set('Content-Security-Policy', csp)
    headers.set('X-Frame-Options', 'DENY')
    headers.set('X-Content-Type-Options', 'nosniff')
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
    headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()')
    headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload')
    headers.set('Cross-Origin-Opener-Policy', 'same-origin')
    headers.set('Cross-Origin-Resource-Policy', 'same-origin')
    headers.set('Cross-Origin-Embedder-Policy', 'require-corp')
    
    return new Response(res.body, { status: res.status, headers })
  }
}
```
---

## CORS Configuration
```typescript
// Strict CORS - only allow your domains
const cors = {
  origin: [
    'https://app.example.com',
    'https://admin.example.com',
    'http://localhost:5173', // Dev only
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  exposedHeaders: ['X-Request-Id'],
  credentials: true, // Only if using cookies
  maxAge: 86400, // 24 hours
}

// Never use: origin: '*' with credentials: true
```
---

## Rate Limiting

### Sliding Window (Redis)
```typescript
// lib/rate-limit.ts
import { Redis } from '@upstash/redis'

const redis = new Redis({ url: process.env.REDIS_URL!, token: process.env.REDIS_TOKEN! })

export async function rateLimit(
  key: string,
  limit: number,
  windowMs: number
): Promise<{ success: boolean; remaining: number; reset: number }> {
  const now = Date.now()
  const windowStart = now - windowMs
  
  const pipeline = redis.pipeline()
  pipeline.zremrangebyscore(key, 0, windowStart)
  pipeline.zcard(key)
  pipeline.zadd(key, { score: now, member: `${now}-${Math.random()}` })
  pipeline.expire(key, Math.ceil(windowMs / 1000))
  
  const results = await pipeline.exec()
  const current = results[1] as number
  
  if (current >= limit) {
    const oldest = await redis.zrange(key, 0, 0, { withScores: true })
    const reset = oldest[0] ? oldest[0].score + windowMs : now + windowMs
    return { success: false, remaining: 0, reset }
  }
  
  return { success: true, remaining: limit - current - 1, reset: now + windowMs }
}

// Usage
export function rateLimitMiddleware(limit = 100, windowMs = 60000) {
  return async (req: Request, next: () => Response) => {
    const ip = req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || 'unknown'
    const key = `ratelimit:${ip}`
    
    const { success, remaining, reset } = await rateLimit(key, limit, windowMs)
    
    if (!success) {
      return new Response('Too Many Requests', {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((reset - Date.now()) / 1000)),
          'X-RateLimit-Limit': String(limit),
          'X-RateLimit-Remaining': '0',
          'X-RateLimit-Reset': String(Math.ceil(reset / 1000)),
        },
      })
    }
    
    const res = next()
    res.headers.set('X-RateLimit-Limit', String(limit))
    res.headers.set('X-RateLimit-Remaining', String(remaining))
    res.headers.set('X-RateLimit-Reset', String(Math.ceil(reset / 1000)))
    return res
  }
}
```
### Per-Route Limits
| Route | Limit | Window |
|-------|-------|--------|
| `/auth/signin` | 5 | 15 min |
| `/auth/signup` | 3 | 15 min |
| `/auth/forgot-password` | 2 | 1 hour |
| `/api/*` | 100 | 1 min |
| `/ws` | 30 | 1 min (connections) |

---

## Input Validation (Zod)
```typescript
// schemas/common.ts
import { z } from 'zod'

// Sanitize strings
export const sanitizedString = (max = 1000) =>
  z.string().max(max).transform(s => s.trim().replace(/[\x00-\x1F\x7F]/g, ''))

// Email
export const emailSchema = z.string().email().max(254).toLowerCase()

// Password (OWASP recommended)
export const passwordSchema = z
  .string()
  .min(12)
  .max(128)
  .regex(/[A-Z]/, 'Must contain uppercase')
  .regex(/[a-z]/, 'Must contain lowercase')
  .regex(/[0-9]/, 'Must contain number')
  .regex(/[^A-Za-z0-9]/, 'Must contain special char')

// UUID
export const uuidSchema = z.string().uuid()

// Pagination
export const paginationSchema = z.object({
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(25),
})

// File upload
export const fileUploadSchema = z.object({
  filename: z.string().max(255),
  mimetype: z.enum(['image/jpeg', 'image/png', 'image/webp', 'application/pdf']),
  size: z.number().max(10 * 1024 * 1024), // 10MB
})
```
### Validation Middleware
```typescript
export function validateBody<T>(schema: z.ZodSchema<T>) {
  return async (req: Request, next: (body: T) => Response) => {
    const body = await req.json()
    const result = schema.safeParse(body)
    
    if (!result.success) {
      return Response.json(
        { error: 'Validation failed', details: result.error.flatten() },
        { status: 400 }
      )
    }
    
    return next(result.data)
  }
}
```
---

## Authentication Hardening

### Password Hashing
```typescript
// lib/auth/password.ts
import { hash, verify } from '@node-rs/argon2'

export async function hashPassword(password: string): Promise<string> {
  return hash(password, {
    memoryCost: 19456, // ~19 MB
    timeCost: 2,
    parallelism: 1,
    outputLen: 32,
    type: 'Argon2id',
  })
}

export async function verifyPassword(password: string, hash: string): Promise<boolean> {
  return verify(hash, password)
}
```
### JWT Security
```typescript
// lib/auth/jwt.ts
import { SignJWT, jwtVerify } from 'jose'

const secret = new TextEncoder().encode(process.env.JWT_SECRET!)
const issuer = 'my-app'
const audience = 'my-app-users'

export async function createToken(payload: object, expiresIn = '15m') {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer(issuer)
    .setAudience(audience)
    .setExpirationTime(expiresIn)
    .sign(secret)
}

export async function verifyToken(token: string) {
  const { payload } = await jwtVerify(token, secret, { issuer, audience })
  return payload
}

// Short-lived access token (15min) + refresh token (7 days, httpOnly cookie)
// Rotate refresh tokens on use
```
### Session Security
```typescript
// lib/auth/session.ts
import { createClient } from 'redis'

const redis = createClient({ url: process.env.REDIS_URL! })

export async function createSession(userId: string, metadata: object) {
  const sessionId = crypto.randomUUID()
  const expiresAt = Date.now() + 7 * 24 * 60 * 60 * 1000 // 7 days
  
  await redis.hSet(`session:${sessionId}`, {
    userId,
    metadata: JSON.stringify(metadata),
    createdAt: Date.now().toString(),
    expiresAt: expiresAt.toString(),
  })
  await redis.expire(`session:${sessionId}`, 7 * 24 * 60 * 60)
  
  return sessionId
}

export async function validateSession(sessionId: string) {
  const session = await redis.hGetAll(`session:${sessionId}`)
  if (!session || Date.now() > parseInt(session.expiresAt)) {
    await redis.del(`session:${sessionId}`)
    return null
  }
  return { userId: session.userId, metadata: JSON.parse(session.metadata) }
}

export async function revokeSession(sessionId: string) {
  await redis.del(`session:${sessionId}`)
}

export async function revokeAllUserSessions(userId: string) {
  const keys = await redis.keys(`session:*`)
  for (const key of keys) {
    const session = await redis.hGetAll(key)
    if (session.userId === userId) await redis.del(key)
  }
}
```
---

## Secrets Management

### Environment Variables
```bash
# .env.example (tracked)
DATABASE_URL=
JWT_SECRET=
ENCRYPTION_KEY=
REDIS_URL=
REDIS_TOKEN=
SENTRY_DSN=

# .env.production (NOT tracked - use secrets manager)
# AWS Secrets Manager / Vercel Env / Railway Variables / Doppler
```
### Secrets in CI
```yaml
# GitHub Actions - use environments with protection rules
jobs:
  deploy:
    environment: production
    # Requires approval, secrets only available here
    steps:
      - run: echo ${{ secrets.DATABASE_URL }}
```
### Encryption at Rest
```typescript
// lib/crypto.ts
import { encrypt, decrypt } from '@node-rs/aes-gcm'

const key = new TextEncoder().encode(process.env.ENCRYPTION_KEY!.padEnd(32, '0').slice(0, 32))

export function encryptData(data: string): string {
  const iv = crypto.getRandomValues(new Uint8Array(12))
  const ciphertext = encrypt(key, new TextEncoder().encode(data), iv)
  return Buffer.from(iv).toString('base64') + ':' + Buffer.from(ciphertext).toString('base64')
}

export function decryptData(encrypted: string): string {
  const [ivB64, ctB64] = encrypted.split(':')
  const iv = Buffer.from(ivB64, 'base64')
  const ciphertext = Buffer.from(ctB64, 'base64')
  const plaintext = decrypt(key, ciphertext, iv)
  return new TextDecoder().decode(plaintext)
}
```
---

## Dependency Security
```bash
# Audit
bun audit          # or npm audit
bun audit --json   # CI parsing

# Fix
bun audit --fix

# SBOM
bun x @cyclonedx/bom --format json > sbom.json

# Block vulnerable deps in CI
# .github/workflows/security.yml
- name: Audit
  run: |
    bun audit --audit-level=high
    # Fail on high/critical
```
---

## Security Checklist (Per Deploy)

- [ ] CSP implemented and tested (report-only first)
- [ ] All security headers present
- [ ] CORS restricted to known origins
- [ ] Rate limiting on all auth endpoints
- [ ] Input validation on all endpoints (Zod)
- [ ] Passwords: Argon2id, cost calibrated
- [ ] JWT: HS256/RS256, short expiry, rotation
- [ ] Sessions: httpOnly, secure, sameSite=lax, Redis-backed
- [ ] Secrets: Never in code, rotated quarterly
- [ ] Dependencies: `bun audit` passes, Dependabot enabled
- [ ] HTTPS: HSTS, cert monitoring
- [ ] Error messages: No stack traces in production
- [ ] Logging: No PII/secrets in logs
- [ ] File uploads: Type/size validation, virus scan
- [ ] SQL injection: Parameterized queries only (Prisma)

---

## Related Skills
- `auth` , Authentication patterns
- `api-design` , Secure API conventions
- `database` , Prisma security
- `deployments` , Production hardening