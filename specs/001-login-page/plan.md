# Implementation Plan: Login Page

**Spec**: [spec.md](./spec.md)
**Status**: Approved

---

## Architecture Overview

```
┌──────────────────────────────────────────────────────────┐
│                        Browser                           │
│                                                          │
│  ┌──────────────┐         ┌───────────────────────────┐  │
│  │  login.html  │         │     dashboard.html         │  │
│  │  register.html         │  (protected — needs JWT)  │  │
│  └──────┬───────┘         └───────────┬───────────────┘  │
│         │  fetch()                    │  fetch() + Bearer │
└─────────┼─────────────────────────────┼──────────────────┘
          │                             │
          ▼                             ▼
┌─────────────────────────────────────────────────────────┐
│                  Express HTTP Server :3000               │
│                                                          │
│  GET  /                   → serve frontend static files  │
│  POST /api/auth/register  → AuthController.register()   │
│  POST /api/auth/login     → AuthController.login()      │
│  GET  /api/auth/me        → authMiddleware → me()       │
│  GET  /api/health         → health check                 │
│                                                          │
│  ┌───────────────────┐    ┌──────────────────────────┐  │
│  │  authMiddleware   │    │     UserModel (SQLite)    │  │
│  │  (JWT verify)     │    │  find / create / exists   │  │
│  └───────────────────┘    └──────────────────────────┘  │
│                                    │                     │
└────────────────────────────────────┼─────────────────────┘
                                     │
                              ┌──────▼──────┐
                              │  data/app.db │
                              │   (SQLite)   │
                              └─────────────┘
```

## Technology Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Runtime | Node.js v18+ | Available, no extra install needed |
| HTTP framework | Express 4.x | Minimal, well-understood, large ecosystem |
| Password hashing | bcryptjs | Pure-JS bcrypt, no native bindings needed |
| Token auth | jsonwebtoken | Standard JWT library |
| Database | better-sqlite3 | Synchronous SQLite; no async overhead for this scale |
| Config | dotenv | Industry-standard `.env` loading |
| Frontend | Vanilla HTML/CSS/JS | No build tool required (Article IV of constitution) |
| CORS | cors npm | Configured to `http://localhost:3000` |

## Data Models

### `users` table
```sql
CREATE TABLE IF NOT EXISTS users (
  id         INTEGER PRIMARY KEY AUTOINCREMENT,
  email      TEXT    NOT NULL UNIQUE,
  password   TEXT    NOT NULL,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP
);
```

### JWT Payload
```json
{
  "sub": 1,
  "email": "user@example.com",
  "iat": 1749513600,
  "exp": 1749600000
}
```

## API Contracts

### POST /api/auth/register
**Request**
```json
{ "email": "user@example.com", "password": "secret123" }
```
**Response 201**
```json
{ "token": "<jwt>", "user": { "id": 1, "email": "user@example.com" } }
```
**Response 400**
```json
{ "error": "Email and password are required" }
```
**Response 409**
```json
{ "error": "Email already registered" }
```

### POST /api/auth/login
**Request**
```json
{ "email": "user@example.com", "password": "secret123" }
```
**Response 200**
```json
{ "token": "<jwt>", "user": { "id": 1, "email": "user@example.com" } }
```
**Response 401**
```json
{ "error": "Invalid email or password" }
```

### GET /api/auth/me
**Headers**: `Authorization: Bearer <jwt>`
**Response 200**
```json
{ "id": 1, "email": "user@example.com" }
```
**Response 401**
```json
{ "error": "Access denied. No token provided." }
```

### GET /api/health
**Response 200**
```json
{ "status": "ok" }
```

## Module Breakdown

```
src/
├── backend/
│   ├── server.js           # Express app entry point
│   ├── config/
│   │   └── database.js     # SQLite init, schema creation
│   ├── middleware/
│   │   └── auth.js         # JWT verification middleware
│   ├── models/
│   │   └── user.js         # UserModel: findByEmail, create
│   └── routes/
│       └── auth.js         # /api/auth/* route handlers
└── frontend/
    ├── index.html          # Redirects to login or dashboard
    ├── login.html          # Login form
    ├── register.html       # Register form
    ├── dashboard.html      # Protected dashboard
    ├── css/
    │   └── styles.css      # Shared styles
    └── js/
        ├── auth.js         # Shared: token helpers, API wrapper
        ├── login.js        # Login form logic
        ├── register.js     # Register form logic
        └── dashboard.js    # Dashboard data fetch + logout
data/
    └── .gitkeep            # Ensures data/ is committed; app.db is gitignored
.env.example                # Template for required env vars
```

## Security Considerations

- bcrypt rounds set to `12` — enough entropy without unacceptable latency.
- JWT secret read from `process.env.JWT_SECRET`; server refuses to start if unset.
- Passwords are **never** returned in any API response.
- CORS origin whitelist prevents cross-origin misuse.
- `data/app.db` added to `.gitignore` to avoid committing user data.

## Testing Strategy

- **Unit**: `UserModel` — test `create` and `findByEmail` against an in-memory SQLite DB.
- **Integration**: Auth routes — test register/login/me with a temporary test DB using a lightweight HTTP client (`node:http` or `supertest`).
- Test files live in `src/backend/__tests__/`.
