---
name: realtime
description: Real-time patterns: WebSocket server, connection lifecycle, rooms, presence, diff sync, reconnection, scaling, Redis adapter, Bun native WebSocket. Load when building collaborative features, live updates, or chat.
---
# Real-Time , WebSocket, Presence, Diff Sync

**When to use:** Collaborative editing, live cursors, chat, notifications, real-time dashboards, multiplayer.


## Architecture
```
┌─────────────┐     ┌─────────────┐     ┌─────────────┐
│   Client    │◀───▶│  WS Server  │◀───▶│    Redis    │
│  (Browser)  │     │   (Bun)     │     │  (Pub/Sub)  │
└─────────────┘     └─────────────┘     └─────────────┘
       │                   │
       │            ┌─────────────┐
       └───────────▶│  HTTP API   │
                    │  (Elysia)   │
                    └─────────────┘
```

## Bun Native WebSocket Server
```typescript
// apps/ws-server/src/server.ts
import { serve } from 'bun'
import { RoomManager } from './rooms/roomManager'
import { ConnectionHandler } from './handlers/connection'
import { authMiddleware } from './auth/wsAuth'

const roomManager = new RoomManager()
const connectionHandler = new ConnectionHandler(roomManager)

const server = serve({
  port: 8080,
  fetch(req, server) {
    // Upgrade HTTP to WebSocket
    if (req.headers.get('upgrade') === 'websocket') {
      return authMiddleware(req, server, (user, token) => {
        return server.upgrade(req, {
          data: { user, token }, // Attached to ws.data
        })
      })
    }
    return new Response('WebSocket server', { status: 200 })
  },
  websocket: {
    open(ws) {
      connectionHandler.onOpen(ws)
    },
    message(ws, message) {
      connectionHandler.onMessage(ws, message)
    },
    close(ws, code, reason) {
      connectionHandler.onClose(ws, code, reason)
    },
    drain(ws) {
      // Backpressure handling
    },
  },
})

console.log(`WebSocket server running on ws://localhost:8080`)
```

## Connection Lifecycle
```typescript
// handlers/connection.ts
import { WebSocket } from 'bun'
import { RoomManager } from '../rooms/roomManager'
import { MessageDispatcher } from './dispatcher'

export class ConnectionHandler {
  private dispatcher: MessageDispatcher

  constructor(private roomManager: RoomManager) {
    this.dispatcher = new MessageDispatcher(roomManager)
  }

  onOpen(ws: WebSocket) {
    const { user, token } = ws.data
    console.log(`Client connected: ${user.id}`)

    // Register connection
    this.roomManager.addConnection(user.id, ws)

    // Send welcome
    ws.send(JSON.stringify({ type: 'CONNECTED', payload: { userId: user.id } }))

    // Setup heartbeat
    ws.data.heartbeat = setInterval(() => {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(JSON.stringify({ type: 'PING' }))
      }
    }, 30000)
  }

  onMessage(ws: WebSocket, data: string | Buffer) {
    try {
      const message = JSON.parse(data.toString())
      this.dispatcher.dispatch(ws, message)
    } catch (error) {
      ws.send(JSON.stringify({ type: 'ERROR', payload: { code: 'INVALID_MESSAGE', message: 'Invalid JSON' } }))
    }
  }

  onClose(ws: WebSocket, code: number, reason: string) {
    const { user } = ws.data
    clearInterval(ws.data.heartbeat)
    
    this.roomManager.removeConnection(user.id, ws)
    this.roomManager.handleUserDisconnect(user.id)
    
    console.log(`Client disconnected: ${user.id}, code: ${code}`)
  }
}
```

## Message Protocol
```typescript
// types/protocol.ts
export type ClientMessage =
  | { type: 'AUTH'; payload: { token: string } }
  | { type: 'JOIN_ROOM'; payload: { roomId: string } }
  | { type: 'LEAVE_ROOM'; payload: { roomId: string } }
  | { type: 'CREATE_ROOM'; payload: { name: string; type: RoomType } }
  | { type: 'PLAYER_READY'; payload: { roomId: string } }
  | { type: 'START_GAME'; payload: { roomId: string } }
  | { type: 'GAME_ACTION'; payload: { roomId: string; action: GameAction } }
  | { type: 'CURSOR_UPDATE'; payload: { roomId: string; position: CursorPosition } }
  | { type: 'SHAPE_DIFF'; payload: { roomId: string; diff: ShapeDiff } }
  | { type: 'CHAT_MESSAGE'; payload: { roomId: string; content: string } }
  | { type: 'PING'; payload?: never }
  | { type: 'RE_AUTH'; payload: { token: string } }

export type ServerMessage =
  | { type: 'AUTH_OK'; payload: { userId: string } }
  | { type: 'ROOM_CREATED'; payload: Room }
  | { type: 'ROOM_JOINED'; payload: { room: Room; members: Member[] } }
  | { type: 'ROOM_LEFT'; payload: { roomId: string } }
  | { type: 'MEMBER_JOINED'; payload: Member }
  | { type: 'MEMBER_LEFT'; payload: { userId: string; roomId: string } }
  | { type: 'PLAYER_READY'; payload: { userId: string; ready: boolean } }
  | { type: 'GAME_STARTED'; payload: GameState }
  | { type: 'GAME_STATE'; payload: GameState }
  | { type: 'GAME_ACTION'; payload: { userId: string; action: GameAction } }
  | { type: 'CURSOR_UPDATE'; payload: { userId: string; position: CursorPosition } }
  | { type: 'SHAPE_DIFF'; payload: { userId: string; diff: ShapeDiff } }
  | { type: 'CHAT_MESSAGE'; payload: ChatMessage }
  | { type: 'PONG'; payload: never }
  | { type: 'ERROR'; payload: { code: string; message: string } }
  | { type: 'FULL_STATE'; payload: RoomState }
```

## Room Management
```typescript
// rooms/roomManager.ts
import { WebSocket } from 'bun'
import { v4 as uuidv4 } from 'uuid'

interface Connection {
  ws: WebSocket
  user: User
  rooms: Set<string>
  cursor?: CursorPosition
}

interface Room {
  id: string
  name: string
  type: RoomType
  ownerId: string
  members: Map<string, Member>
  state: RoomState
  createdAt: number
}

interface Member {
  userId: string
  user: User
  role: 'owner' | 'admin' | 'member'
  joinedAt: number
  ready: boolean
}

export class RoomManager {
  private connections = new Map<string, Connection>()
  private rooms = new Map<string, Room>()

  addConnection(userId: string, ws: WebSocket) {
    const conn = this.connections.get(userId) || { ws, user: ws.data.user, rooms: new Set() }
    conn.ws = ws
    this.connections.set(userId, conn)
  }

  removeConnection(userId: string, ws: WebSocket) {
    const conn = this.connections.get(userId)
    if (conn?.ws === ws) {
      this.connections.delete(userId)
    }
  }

  createRoom(ownerId: string, name: string, type: RoomType): Room {
    const room: Room = {
      id: uuidv4(),
      name,
      type,
      ownerId,
      members: new Map(),
      state: this.getInitialState(type),
      createdAt: Date.now(),
    }
    this.rooms.set(room.id, room)
    this.addMember(room.id, ownerId, 'owner')
    return room
  }

  joinRoom(roomId: string, userId: string, role: Member['role'] = 'member') {
    const room = this.rooms.get(roomId)
    if (!room) throw new Error('Room not found')

    const conn = this.connections.get(userId)
    if (!conn) throw new Error('User not connected')

    this.addMember(roomId, userId, role)
    conn.rooms.add(roomId)

    return room
  }

  leaveRoom(roomId: string, userId: string) {
    const room = this.rooms.get(roomId)
    if (!room) return

    room.members.delete(userId)
    const conn = this.connections.get(userId)
    conn?.rooms.delete(roomId)

    // Broadcast leave
    this.broadcast(roomId, { type: 'MEMBER_LEFT', payload: { userId, roomId } }, userId)

    // Cleanup empty rooms
    if (room.members.size === 0) {
      this.rooms.delete(roomId)
    }
  }

  handleUserDisconnect(userId: string) {
    const conn = this.connections.get(userId)
    if (!conn) return

    for (const roomId of conn.rooms) {
      this.leaveRoom(roomId, userId)
    }
  }

  broadcast(roomId: string, message: ServerMessage, excludeUserId?: string) {
    const room = this.rooms.get(roomId)
    if (!room) return

    const payload = JSON.stringify(message)
    for (const [memberId, member] of room.members) {
      if (memberId === excludeUserId) continue
      const conn = this.connections.get(memberId)
      if (conn?.ws.readyState === WebSocket.OPEN) {
        conn.ws.send(payload)
      }
    }
  }

  broadcastToUser(userId: string, message: ServerMessage) {
    const conn = this.connections.get(userId)
    if (conn?.ws.readyState === WebSocket.OPEN) {
      conn.ws.send(JSON.stringify(message))
    }
  }

  private addMember(roomId: string, userId: string, role: Member['role']) {
    const room = this.rooms.get(roomId)!
    const conn = this.connections.get(userId)!
    
    room.members.set(userId, {
      userId,
      user: conn.user,
      role,
      joinedAt: Date.now(),
      ready: false,
    })
  }

  private getInitialState(type: RoomType): RoomState {
    // Return initial state based on room type
    return { type, data: {} }
  }
}
```

## Diff-Based Sync (Collaborative Editing)
```typescript
// types/diff.ts
export interface ShapeDiff {
  added: Shape[]
  modified: Shape[]
  deleted: string[] // shape IDs
}

export interface CursorPosition {
  x: number
  y: number
  selection?: { start: number; end: number }
}

// handlers/diff.ts
export class DiffHandler {
  constructor(private roomManager: RoomManager) {}

  handleShapeDiff(ws: WebSocket, payload: { roomId: string; diff: ShapeDiff }) {
    const { user } = ws.data
    const { roomId, diff } = payload

    // Validate user in room
    if (!this.roomManager.isMember(roomId, user.id)) return

    // Broadcast to other clients
    this.roomManager.broadcast(roomId, {
      type: 'SHAPE_DIFF',
      payload: { userId: user.id, diff },
    }, user.id)

    // Persist to database (debounced)
    this.debouncedPersist(roomId, diff)
  }

  handleCursorUpdate(ws: WebSocket, payload: { roomId: string; position: CursorPosition }) {
    const { user } = ws.data
    const { roomId, position } = payload

    // Update connection cursor
    const conn = this.roomManager.getConnection(user.id)
    if (conn) conn.cursor = position

    // Broadcast (throttled)
    this.roomManager.broadcast(roomId, {
      type: 'CURSOR_UPDATE',
      payload: { userId: user.id, position },
    }, user.id)
  }

  private debouncedPersist(roomId: string, diff: ShapeDiff) {
    // Debounce and batch persistence
    // Use Redis or in-memory queue
  }
}
```

## Presence System
```typescript
// rooms/presence.ts
export class PresenceManager {
  constructor(private roomManager: RoomManager) {}

  // User presence in room
  async setPresence(roomId: string, userId: string, status: 'online' | 'away' | 'offline') {
    const room = this.roomManager.getRoom(roomId)
    if (!room) return

    // Broadcast presence change
    this.roomManager.broadcast(roomId, {
      type: 'PRESENCE_CHANGE',
      payload: { userId, status },
    })
  }

  // Get all presence in room
  getRoomPresence(roomId: string) {
    const room = this.roomManager.getRoom(roomId)
    if (!room) return []

    return Array.from(room.members.values()).map(m => ({
      userId: m.userId,
      name: m.user.firstName,
      status: 'online', // Track separately
      cursor: this.roomManager.getConnection(m.userId)?.cursor,
    }))
  }
}
```

## Reconnection Handling
```typescript
// Client-side reconnection
class RealtimeClient {
  private ws: WebSocket | null = null
  private reconnectAttempts = 0
  private maxReconnectAttempts = 10
  private reconnectDelay = 1000

  connect(token: string) {
    this.ws = new WebSocket(`wss://api.example.com/ws?token=${token}`)
    
    this.ws.onopen = () => {
      this.reconnectAttempts = 0
      this.send({ type: 'RE_AUTH', payload: { token } })
    }

    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data)
      this.handleMessage(message)
    }

    this.ws.onclose = () => this.scheduleReconnect(token)
    this.ws.onerror = () => {}
  }

  private scheduleReconnect(token: string) {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      this.emit('max-retries-reached')
      return
    }

    const delay = this.reconnectDelay * Math.pow(2, this.reconnectAttempts)
    this.reconnectAttempts++

    setTimeout(() => this.connect(token), delay)
  }

  private handleMessage(message: ServerMessage) {
    if (message.type === 'FULL_STATE') {
      this.emit('state-restored', message.payload)
    }
    // ... handle other messages
  }
}
```

## Scaling with Redis Adapter
```typescript
// rooms/redisAdapter.ts
import { createClient } from 'redis'

const pubClient = createClient({ url: process.env.REDIS_URL! })
const subClient = createClient({ url: process.env.REDIS_URL! })

export class RedisAdapter {
  private pub: ReturnType<typeof createClient>
  private sub: ReturnType<typeof createClient>
  private handlers = new Map<string, (message: any) => void>()

  async connect() {
    this.pub = await pubClient.connect()
    this.sub = await subClient.connect()
  }

  async publish(channel: string, message: any) {
    await this.pub.publish(channel, JSON.stringify(message))
  }

  async subscribe(channel: string, handler: (message: any) => void) {
    this.handlers.set(channel, handler)
    await this.sub.subscribe(channel, (msg) => {
      handler(JSON.parse(msg))
    })
  }

  // Room channels: room:{roomId}
  // User channels: user:{userId}
  // Global: global
}
```

```typescript
// Integrate with RoomManager
export class ScaledRoomManager extends RoomManager {
  constructor(private redis: RedisAdapter) {
    super()
    this.setupRedisListeners()
  }

  private setupRedisListeners() {
    this.redis.subscribe('global', (msg) => this.handleGlobalMessage(msg))
    // Subscribe to room channels dynamically
  }

  override broadcast(roomId: string, message: ServerMessage, excludeUserId?: string) {
    // Local broadcast
    super.broadcast(roomId, message, excludeUserId)
    
    // Publish to other instances
    this.redis.publish(`room:${roomId}`, { message, excludeUserId })
  }

  private handleGlobalMessage(msg: any) {
    if (msg.message.type === 'FULL_STATE_REQUEST') {
      // Respond with current state
    }
  }
}
```

## Authentication for WebSocket
```typescript
// auth/wsAuth.ts
import { verifyToken } from '../lib/auth/jwt'

export async function authMiddleware(req: Request, server: Server, next: (user: User, token: string) => Response) {
  const url = new URL(req.url)
  const token = url.searchParams.get('token')

  if (!token) {
    return new Response('Unauthorized', { status: 401 })
  }

  const payload = await verifyToken(token)
  if (!payload || payload.type !== 'ws') {
    return new Response('Invalid token', { status: 401 })
  }

  const user = await getUser(payload.sub)
  if (!user) {
    return new Response('User not found', { status: 401 })
  }

  return next(user, token)
}

// Short-lived WS token endpoint
// POST /auth/ws-token
export async function createWSToken(req: Request) {
  const session = await getSessionFromCookie(req)
  if (!session) return new Response('Unauthorized', { status: 401 })

  const token = await createWSToken(session.userId)
  return Response.json({ token })
}
```

## Client-Side Hook (React)
```typescript
// hooks/useRealtime.ts
import { useEffect, useRef, useState, useCallback } from 'react'

export function useRealtime(roomId: string) {
  const ws = useRef<WebSocket | null>(null)
  const [connected, setConnected] = useState(false)
  const [members, setMembers] = useState<Member[]>([])
  const [cursors, setCursors] = useState<Map<string, CursorPosition>>(new Map())
  const handlers = useRef<Map<string, (payload: any) => void>>(new Map())

  useEffect(() => {
    const token = getWSToken() // From auth context
    ws.current = new WebSocket(`wss://api.example.com/ws?token=${token}`)

    ws.current.onopen = () => {
      setConnected(true)
      ws.current!.send(JSON.stringify({ type: 'JOIN_ROOM', payload: { roomId } }))
    }

    ws.current.onmessage = (event) => {
      const message = JSON.parse(event.data)
      handleMessage(message)
    }

    ws.current.onclose = () => setConnected(false)

    return () => ws.current?.close()
  }, [roomId])

  const handleMessage = (message: ServerMessage) => {
    const handler = handlers.current.get(message.type)
    if (handler) handler(message.payload)

    switch (message.type) {
      case 'ROOM_JOINED':
        setMembers(message.payload.members)
        break
      case 'MEMBER_JOINED':
        setMembers(prev => [...prev, message.payload])
        break
      case 'MEMBER_LEFT':
        setMembers(prev => prev.filter(m => m.userId !== message.payload.userId))
        break
      case 'CURSOR_UPDATE':
        setCursors(prev => new Map(prev).set(message.payload.userId, message.payload.position))
        break
    }
  }

  const send = useCallback((message: ClientMessage) => {
    ws.current?.send(JSON.stringify(message))
  }, [])

  const on = useCallback((type: string, handler: (payload: any) => void) => {
    handlers.current.set(type, handler)
    return () => handlers.current.delete(type)
  }, [])

  return { connected, members, cursors, send, on }
}
```

## Testing Real-Time
```typescript
// test/realtime.test.ts
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { WebSocket } from 'ws' // or bun test
import { createTestServer } from './helpers'

describe('Real-time', () => {
  let server: ReturnType<typeof createTestServer>
  let ws1: WebSocket
  let ws2: WebSocket

  beforeAll(async () => {
    server = createTestServer()
    ws1 = await server.connectUser('user1')
    ws2 = await server.connectUser('user2')
  })

  afterAll(() => {
    ws1?.close()
    ws2?.close()
  })

  it('broadcasts cursor updates', async () => {
    const cursorPromise = new Promise(resolve => {
      ws2.onmessage = (e) => {
        const msg = JSON.parse(e.data)
        if (msg.type === 'CURSOR_UPDATE') resolve(msg.payload)
      }
    })

    ws1.send(JSON.stringify({
      type: 'CURSOR_UPDATE',
      payload: { roomId: 'room1', position: { x: 100, y: 200 } },
    }))

    const payload = await cursorPromise
    expect(payload.userId).toBe('user1')
    expect(payload.position).toEqual({ x: 100, y: 200 })
  })

  it('syncs shape diffs', async () => {
    // Similar test for SHAPE_DIFF
  })
})
```

## Checklist

- [ ] Connection authentication with short-lived tokens
- [ ] Heartbeat/ping-pong for connection health
- [ ] Automatic reconnection with exponential backoff
- [ ] Room-based broadcasting (exclude sender)
- [ ] Presence system (join/leave/cursor)
- [ ] Diff-based sync for collaborative editing
- [ ] Message validation and rate limiting
- [ ] Graceful degradation (fallback to polling)
- [ ] Horizontal scaling with Redis pub/sub
- [ ] Connection state persistence across reconnects
- [ ] Load testing (10k+ concurrent connections)
- [ ] Monitoring: connections, messages/sec, latency


## Related Skills
- `backend/auth` - WS authentication, short-lived tokens
- `backend/database` - Persisting room state, diffs
- `backend/api-design` - Message protocol design
- `backend/security` - Rate limiting, message validation
- `devops/performance` - Connection pooling, scaling
- `testing` , WebSocket testing patterns
