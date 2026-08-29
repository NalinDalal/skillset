---
name: auth
description: Authentication patterns , session-based, JWT, OAuth2/OIDC, magic links, MFA, password reset, email verification, RBAC, middleware, token refresh. Load when implementing auth or hardening existing auth.
---
# Authentication , Sessions, JWT, OAuth, MFA

**When to use:** Implementing auth, adding OAuth providers, MFA, passwordless, RBAC, token refresh.

---

## Architecture Overview
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │────▶│  HTTP API   │────▶│   Database  │
│  (Browser)  │     │  (Elysia)   │     │  (Postgres) │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       │            ┌─────────────┐
       └───────────▶│   Redis     │
                    │ (Sessions)  │
                    └─────────────┘
```
---

## Session-Based Auth (Recommended for Web Apps)

### Cookie Configuration
```typescript
// lib/auth/cookies.ts
export const sessionCookie = {
  name: 'session_id',
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const, // CSRF protection + cross-site works
    path: '/',
    maxAge: 60 * 60 * 24 * 7, // 7 days
  },
}

export const csrfCookie = {
  name: 'csrf_token',
  options: {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict' as const,
    path: '/',
    maxAge: 60 * 60 * 24, // 1 day
  },
}
```
### Session Store (Redis)
```typescript
// lib/auth/session.ts
import { createClient } from 'redis'
import { v4 as uuidv4 } from 'uuid'

const redis = createClient({ url: process.env.REDIS_URL! })

export interface Session {
  id: string
  userId: string
  email: string
  role: string
  createdAt: number
  expiresAt: number
  metadata?: {
    userAgent?: string
    ip?: string
    mfaVerified?: boolean
  }
}

export async function createSession(
  user: { id: string; email: string; role: string },
  metadata?: Session['metadata']
): Promise<string> {
  const sessionId = uuidv4()
  const now = Date.now()
  const expiresAt = now + 7 * 24 * 60 * 60 * 1000

  const session: Session = {
    id: sessionId,
    userId: user.id,
    email: user.email,
    role: user.role,
    createdAt: now,
    expiresAt,
    metadata,
  }

  await redis.setEx(
    `session:${sessionId}`,
    7 * 24 * 60 * 60,
    JSON.stringify(session)
  )

  return sessionId
}

export async function getSession(sessionId: string): Promise<Session | null> {
  const data = await redis.get(`session:${sessionId}`)
  if (!data) return null
  const session = JSON.parse(data) as Session
  if (session.expiresAt < Date.now()) {
    await redis.del(`session:${sessionId}`)
    return null
  }
  return session
}

export async function deleteSession(sessionId: string) {
  await redis.del(`session:${sessionId}`)
}

export async function deleteAllUserSessions(userId: string) {
  const keys = await redis.keys(`session:*`)
  for (const key of keys) {
    const session = await getSession(key.replace('session:', ''))
    if (session?.userId === userId) {
      await redis.del(key)
    }
  }
}

export async function refreshSession(sessionId: string): Promise<string | null> {
  const session = await getSession(sessionId)
  if (!session) return null
  
  const newSessionId = uuidv4()
  const now = Date.now()
  const expiresAt = now + 7 * 24 * 60 * 60 * 1000
  
  await redis.setEx(
    `session:${newSessionId}`,
    7 * 24 * 60 * 60,
    JSON.stringify({ ...session, id: newSessionId, createdAt: now, expiresAt })
  )
  await redis.del(`session:${sessionId}`)
  
  return newSessionId
}
```
### Auth Middleware
```typescript
// middleware/auth.ts
export function authMiddleware() {
  return async (req: Request, next: (session: Session) => Response) => {
    const cookieHeader = req.headers.get('cookie') || ''
    const sessionId = cookieHeader
      .split(';')
      .map(c => c.trim())
      .find(c => c.startsWith('session_id='))
      ?.split('=')[1]

    if (!sessionId) {
      return new Response('Unauthorized', { status: 401 })
    }

    const session = await getSession(sessionId)
    if (!session) {
      return new Response('Unauthorized', { status: 401 })
    }

    // Attach to request for handlers
    ;(req as any).session = session
    return next(session)
  }
}

// Role-based access
export function requireRole(...roles: string[]) {
  return (req: Request, next: (session: Session) => Response) => {
    const session = (req as any).session as Session
    if (!roles.includes(session.role)) {
      return new Response('Forbidden', { status: 403 })
    }
    return next(session)
  }
}
```
---

## JWT (For Mobile/API/WS)

### Token Structure
```typescript
// lib/auth/jwt.ts
import { SignJWT, jwtVerify } from 'jose'

const ACCESS_SECRET = new TextEncoder().encode(process.env.JWT_ACCESS_SECRET!)
const REFRESH_SECRET = new TextEncoder().encode(process.env.JWT_REFRESH_SECRET!)

export interface AccessPayload {
  sub: string // userId
  email: string
  role: string
  sessionId: string
  type: 'access'
}

export interface RefreshPayload {
  sub: string
  sessionId: string
  type: 'refresh'
}

export async function createAccessToken(payload: Omit<AccessPayload, 'type'>): Promise<string> {
  return new SignJWT({ ...payload, type: 'access' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer('my-app')
    .setAudience('my-app-users')
    .setExpirationTime('15m')
    .sign(ACCESS_SECRET)
}

export async function createRefreshToken(payload: Omit<RefreshPayload, 'type'>): Promise<string> {
  return new SignJWT({ ...payload, type: 'refresh' })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setIssuer('my-app')
    .setAudience('my-app-users')
    .setExpirationTime('30d')
    .sign(REFRESH_SECRET)
}

export async function verifyAccessToken(token: string): Promise<AccessPayload | null> {
  try {
    const { payload } = await jwtVerify(token, ACCESS_SECRET, {
      issuer: 'my-app',
      audience: 'my-app-users',
    })
    return payload as unknown as AccessPayload
  } catch {
    return null
  }
}

export async function verifyRefreshToken(token: string): Promise<RefreshPayload | null> {
  try {
    const { payload } = await jwtVerify(token, REFRESH_SECRET, {
      issuer: 'my-app',
      audience: 'my-app-users',
    })
    return payload as unknown as RefreshPayload
  } catch {
    return null
  }
}
```
### Token Rotation (Refresh Flow)
```typescript
// POST /auth/refresh
export async function refreshTokens(req: Request) {
  const body = await req.json()
  const { refreshToken } = body

  const payload = await verifyRefreshToken(refreshToken)
  if (!payload) return Response.json({ error: 'Invalid refresh token' }, { status: 401 })

  // Verify session still exists
  const session = await getSession(payload.sessionId)
  if (!session || session.userId !== payload.sub) {
    return Response.json({ error: 'Session revoked' }, { status: 401 })
  }

  // Rotate refresh token
  const newRefreshToken = await createRefreshToken({
    sub: session.userId,
    sessionId: session.id,
  })

  const accessToken = await createAccessToken({
    sub: session.userId,
    email: session.email,
    role: session.role,
    sessionId: session.id,
  })

  // Store new refresh token hash (optional: invalidate old)
  await redis.setEx(`refresh:${payload.sessionId}`, 30 * 24 * 60 * 60, newRefreshToken)

  return Response.json({ accessToken, refreshToken: newRefreshToken })
}
```
---

## OAuth2 / OIDC Providers

### Google OAuth
```typescript
// lib/auth/oauth.ts
const GOOGLE_AUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth'
const GOOGLE_TOKEN_URL = 'https://oauth2.googleapis.com/token'
const GOOGLE_USERINFO_URL = 'https://www.googleapis.com/oauth2/v2/userinfo'

export function getGoogleAuthUrl(state: string, redirectUri: string) {
  const params = new URLSearchParams({
    client_id: process.env.GOOGLE_CLIENT_ID!,
    redirect_uri: redirectUri,
    response_type: 'code',
    scope: 'openid email profile',
    state,
    access_type: 'offline',
    prompt: 'consent',
  })
  return `${GOOGLE_AUTH_URL}?${params}`
}

export async function exchangeGoogleCode(code: string, redirectUri: string) {
  const res = await fetch(GOOGLE_TOKEN_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      client_id: process.env.GOOGLE_CLIENT_ID!,
      client_secret: process.env.GOOGLE_CLIENT_SECRET!,
      code,
      redirect_uri: redirectUri,
      grant_type: 'authorization_code',
    }),
  })
  return res.json() as Promise<{ access_token: string; refresh_token?: string; id_token: string }>
}

export async function getGoogleUser(accessToken: string) {
  const res = await fetch(GOOGLE_USERINFO_URL, {
    headers: { Authorization: `Bearer ${accessToken}` },
  })
  return res.json() as Promise<{ id: string; email: string; name: string; picture: string }>
}
```
### Callback Handler
```typescript
// GET /auth/callback/google
export async function googleCallback(req: Request) {
  const url = new URL(req.url)
  const code = url.searchParams.get('code')
  const state = url.searchParams.get('state')

  // Verify state (stored in cookie)
  const storedState = getCookie(req, 'oauth_state')
  if (state !== storedState) return Response.json({ error: 'Invalid state' }, { status: 400 })

  const tokens = await exchangeGoogleCode(code!, process.env.GOOGLE_REDIRECT_URI!)
  const user = await getGoogleUser(tokens.access_token)

  // Find or create user
  let dbUser = await prisma.user.findUnique({ where: { email: user.email } })
  if (!dbUser) {
    dbUser = await prisma.user.create({
      data: {
        email: user.email,
        firstName: user.name.split(' ')[0],
        lastName: user.name.split(' ').slice(1).join(' '),
        passwordHash: '', // OAuth users have no password
      },
    })
  }

  // Create session
  const sessionId = await createSession(dbUser)
  setCookie(res, 'session_id', sessionId, sessionCookie.options)

  return Response.redirect('/dashboard')
}
```
---

## Magic Links (Passwordless)
```typescript
// lib/auth/magic-link.ts
import { createToken, verifyToken } from './jwt'
import { sendEmail } from '@/lib/email'

const MAGIC_LINK_SECRET = process.env.MAGIC_LINK_SECRET!

export async function sendMagicLink(email: string, redirectUrl: string) {
  const token = await createToken({ email, type: 'magic-link' }, '15m')
  const link = `${process.env.APP_URL}/auth/verify?token=${token}&redirect=${encodeURIComponent(redirectUrl)}`

  await sendEmail({
    to: email,
    subject: 'Your sign-in link',
    html: `<a href="${link}">Sign in</a> (expires in 15 minutes)`,
  })
}

export async function verifyMagicLink(token: string) {
  const payload = await verifyToken(token)
  if (!payload || payload.type !== 'magic-link') return null

  let user = await prisma.user.findUnique({ where: { email: payload.email } })
  if (!user) {
    user = await prisma.user.create({ data: { email: payload.email } })
  }

  return user
}
```
---

## MFA (TOTP)
```typescript
// lib/auth/mfa.ts
import { generateTOTPSecret, verifyTOTP, getTOTPURI } from 'totp-generator'
import { prisma } from '@/lib/prisma'

export async function enableMFA(userId: string) {
  const secret = generateTOTPSecret()
  const otpauth = getTOTPURI('MyApp', userId, secret)

  await prisma.user.update({
    where: { id: userId },
    data: { mfaSecret: secret, mfaEnabled: false }, // Enable after first verify
  })

  return { secret, otpauth } // Show QR code to user
}

export async function verifyMFA(userId: string, token: string) {
  const user = await prisma.user.findUnique({ where: { id: userId } })
  if (!user?.mfaSecret) return false

  const valid = verifyTOTP(token, user.mfaSecret, 1) // 1 step window
  if (valid && !user.mfaEnabled) {
    await prisma.user.update({ where: { id: userId }, data: { mfaEnabled: true } })
  }
  return valid
}

export async function disableMFA(userId: string) {
  await prisma.user.update({
    where: { id: userId },
    data: { mfaSecret: null, mfaEnabled: false },
  })
}
```
---

## Password Reset
```typescript
// lib/auth/password-reset.ts
import { createToken, verifyToken } from './jwt'
import { sendEmail } from '@/lib/email'
import { hashPassword } from './password'

const RESET_SECRET = process.env.RESET_SECRET!

export async function requestPasswordReset(email: string) {
  const user = await prisma.user.findUnique({ where: { email } })
  if (!user) return // Don't reveal if user exists

  const token = await createToken({ sub: user.id, type: 'password-reset' }, '1h')
  const link = `${process.env.APP_URL}/auth/reset-password?token=${token}`

  await sendEmail({
    to: email,
    subject: 'Reset your password',
    html: `<a href="${link}">Reset password</a> (expires in 1 hour)`,
  })
}

export async function resetPassword(token: string, newPassword: string) {
  const payload = await verifyToken(token)
  if (!payload || payload.type !== 'password-reset') {
    return { error: 'Invalid or expired token' }
  }

  const passwordHash = await hashPassword(newPassword)
  await prisma.user.update({
    where: { id: payload.sub },
    data: { passwordHash },
  })

  // Revoke all sessions
  await deleteAllUserSessions(payload.sub)

  return { success: true }
}
```
---

## Email Verification
```typescript
// lib/auth/email-verification.ts
export async function sendVerificationEmail(userId: string, email: string) {
  const token = await createToken({ sub: userId, type: 'email-verify' }, '24h')
  const link = `${process.env.APP_URL}/auth/verify-email?token=${token}`

  await sendEmail({
    to: email,
    subject: 'Verify your email',
    html: `<a href="${link}">Verify email</a> (expires in 24 hours)`,
  })
}

export async function verifyEmail(token: string) {
  const payload = await verifyToken(token)
  if (!payload || payload.type !== 'email-verify') return false

  await prisma.user.update({
    where: { id: payload.sub },
    data: { emailVerified: true },
  })
  return true
}
```
---

## RBAC (Role-Based Access Control)
```typescript
// lib/auth/rbac.ts
export const permissions = {
  // Projects
  'project:create': ['ADMIN', 'MEMBER'],
  'project:read': ['ADMIN', 'MEMBER', 'VIEWER'],
  'project:update': ['ADMIN', 'OWNER'],
  'project:delete': ['ADMIN', 'OWNER'],
  'project:manage_members': ['ADMIN', 'OWNER'],

  // Tasks
  'task:create': ['ADMIN', 'MEMBER'],
  'task:read': ['ADMIN', 'MEMBER', 'VIEWER'],
  'task:update': ['ADMIN', 'MEMBER', 'ASSIGNEE'],
  'task:delete': ['ADMIN', 'OWNER'],

  // Admin
  'admin:users': ['ADMIN'],
  'admin:settings': ['ADMIN'],
} as const

export type Permission = keyof typeof permissions

export function hasPermission(userRole: string, resourceRole: string | null, permission: Permission): boolean {
  const allowed = permissions[permission]
  if (allowed.includes(userRole)) return true
  if (resourceRole && allowed.includes(resourceRole)) return true
  return false
}

// Usage in handler
export function requirePermission(permission: Permission) {
  return (req: Request, next: (session: Session) => Response) => {
    const session = (req as any).session as Session
    const resourceRole = (req as any).resourceRole // Set by route loader

    if (!hasPermission(session.role, resourceRole, permission)) {
      return new Response('Forbidden', { status: 403 })
    }
    return next(session)
  }
}
```
---

## WebSocket Auth
```typescript
// Short-lived WS token (5 min)
export async function createWSToken(userId: string): Promise<string> {
  return createToken({ sub: userId, type: 'ws' }, '5m')
}

// WS connection handler
wsServer.on('connection', async (ws, req) => {
  const token = new URL(req.url, 'http://localhost').searchParams.get('token')
  const payload = await verifyToken(token!)
  
  if (!payload || payload.type !== 'ws') {
    ws.close(4001, 'Invalid token')
    return
  }

  // Heartbeat re-auth
  ws.on('message', async (data) => {
    const msg = JSON.parse(data.toString())
    if (msg.type === 're_auth') {
      const newPayload = await verifyToken(msg.token)
      if (!newPayload) ws.close(4001, 'Re-auth failed')
    }
  })
})
```
---

## Auth Checklist

- [ ] Sessions: httpOnly, secure, sameSite=lax, 7-day expiry
- [ ] JWT: 15min access, 30-day refresh, rotation
- [ ] Passwords: Argon2id, cost calibrated
- [ ] Rate limiting: 5/min on signin, 3/min on signup
- [ ] OAuth: PKCE, state parameter, secure redirect
- [ ] MFA: TOTP, backup codes, recovery
- [ ] Password reset: 1h expiry, single-use, revokes sessions
- [ ] Email verification: Required for sensitive actions
- [ ] CSRF: SameSite cookies + double-submit for mutations
- [ ] Session revocation: On password change, MFA enable, admin action
- [ ] Audit logs: All auth events (login, logout, failed attempts)
- [ ] Account lockout: 5 failed attempts → 15 min lockout

---

## Related Skills
- `security` , Headers, rate limiting, CSP
- `database` , Session storage, audit logs
- `realtime` , WS authentication
- `api-design` , Auth middleware patterns
- `testing` , Testing auth flows