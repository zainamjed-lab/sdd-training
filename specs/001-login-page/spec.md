# Feature Spec: Login Page

**Feature ID**: 001
**Branch**: 001-login-page
**Status**: Approved

---

## Objective

Implement a complete authentication flow that allows users to register, log in, and access a protected dashboard. The system uses JSON Web Tokens (JWT) for stateless session management and bcrypt for secure password storage. Both a backend REST API (Node.js + Express) and a static frontend (HTML/CSS/JS) are delivered as part of this feature.

## Success Criteria

- [ ] A user can register with an email and password via the frontend form.
- [ ] Duplicate email registration returns a clear error.
- [ ] A registered user can log in and receive a JWT.
- [ ] The JWT is stored in `localStorage` and sent as a Bearer token on subsequent requests.
- [ ] A protected `/dashboard` route is accessible only with a valid JWT.
- [ ] An invalid or expired JWT returns HTTP 401.
- [ ] Logging out clears the token and redirects to the login page.
- [ ] All API errors return `{ "error": "<message>" }` — never a stack trace.

## User Stories

| # | As a… | I want to… | So that… |
|---|-------|-----------|---------|
| 1 | New visitor | Register with my email and password | I can create an account |
| 2 | Registered user | Log in with my credentials | I can access protected content |
| 3 | Logged-in user | View a protected dashboard | I know authentication is working |
| 4 | Logged-in user | Log out | My session is securely terminated |
| 5 | Attacker | Be blocked on duplicate email / wrong password | The system does not expose user data |

## Functional Requirements

### Must Have
- FR-01: `POST /api/auth/register` — accept `{ email, password }`, create user, return JWT.
- FR-02: `POST /api/auth/login` — accept `{ email, password }`, validate, return JWT.
- FR-03: `GET /api/auth/me` — protected route; return authenticated user's email and id.
- FR-04: Frontend login form with email + password fields and submit button.
- FR-05: Frontend register form with email + password + confirm-password fields.
- FR-06: On successful login/register, store JWT in `localStorage` and redirect to dashboard.
- FR-07: Dashboard page fetches `/api/auth/me` to display user info; redirects to login if 401.
- FR-08: Logout button clears token from `localStorage` and redirects to login.

### Should Have
- FR-09: Client-side form validation (non-empty fields, email format, password min-length 8).
- FR-10: Show inline error messages on failed API calls.
- FR-11: Password field toggle (show/hide).

### Won't Have (this iteration)
- OAuth / social login
- Password reset flow
- Email verification
- Refresh token rotation

## Non-Functional Requirements

| Category | Requirement |
|----------|-------------|
| Security | Passwords hashed with bcrypt (12 rounds). JWT signed with `HS256`, expiry `24h`. |
| Security | CORS restricted to `http://localhost:3000` in development. |
| Performance | Login/register endpoints respond in < 500 ms on commodity hardware. |
| Accessibility | Forms have associated `<label>` elements. Errors are announced via `aria-live`. |
| Portability | SQLite database file stored at `data/app.db` — created automatically on first run. |

## Data / API Surface

### User record (SQLite)
```
id        INTEGER PRIMARY KEY AUTOINCREMENT
email     TEXT NOT NULL UNIQUE
password  TEXT NOT NULL          -- bcrypt hash
created_at DATETIME DEFAULT CURRENT_TIMESTAMP
```

### JWT payload
```json
{ "sub": 1, "email": "user@example.com", "iat": 1234567890, "exp": 1234654290 }
```

### API routes summary
| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | /api/auth/register | — | Create account |
| POST | /api/auth/login | — | Authenticate |
| GET | /api/auth/me | Bearer JWT | Get current user |
| GET | /api/health | — | Health check |

## Open Questions

- None — all requirements confirmed for this iteration.
