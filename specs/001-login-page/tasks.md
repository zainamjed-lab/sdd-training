# Tasks: Login Page

**Spec**: [spec.md](./spec.md) | **Plan**: [plan.md](./plan.md)
**Total**: 16 tasks

---

## Phase 1 — Foundation

- [x] **Task 01**: Initialise Node.js project (`package.json`, install dependencies)
  - Files: `package.json`, `.env.example`, `.gitignore`
  - Test: `npm install` completes without errors; `node -e "require('express')"` succeeds.

- [x] **Task 02**: Create SQLite database module with schema initialisation
  - Files: `src/backend/config/database.js`
  - Test: Importing the module creates `data/app.db` and the `users` table exists.

- [x] **Task 03**: Create `UserModel` with `create` and `findByEmail` methods
  - Files: `src/backend/models/user.js`
  - Test: Create a user, then `findByEmail` returns the row; duplicate email throws UNIQUE constraint.

## Phase 2 — Backend Routes

- [x] **Task 04**: Create JWT auth middleware
  - Files: `src/backend/middleware/auth.js`
  - Test: Missing token → 401. Invalid token → 401. Valid token → `req.user` populated.

- [x] **Task 05**: Implement `POST /api/auth/register` route
  - Files: `src/backend/routes/auth.js`
  - Test: Valid payload → 201 + JWT. Missing fields → 400. Duplicate email → 409.

- [x] **Task 06**: Implement `POST /api/auth/login` route
  - Files: `src/backend/routes/auth.js`
  - Test: Correct credentials → 200 + JWT. Wrong password → 401. Unknown email → 401.

- [x] **Task 07**: Implement `GET /api/auth/me` route (protected)
  - Files: `src/backend/routes/auth.js`
  - Test: Valid JWT → 200 + `{ id, email }`. No token → 401.

- [x] **Task 08**: Assemble Express server with health check + static file serving
  - Files: `src/backend/server.js`
  - Test: `node src/backend/server.js` starts without errors; `GET /api/health` returns `{ status: "ok" }`.

## Phase 3 — Frontend

- [x] **Task 09**: Create shared CSS stylesheet
  - Files: `src/frontend/css/styles.css`
  - Test: Visual inspection — centered card, form inputs styled, responsive on 375 px viewport.

- [x] **Task 10**: Create shared JS auth helper (`auth.js`)
  - Files: `src/frontend/js/auth.js`
  - Test: `getToken()` / `setToken()` / `removeToken()` operate on `localStorage.token`.

- [x] **Task 11**: Build login page
  - Files: `src/frontend/login.html`, `src/frontend/js/login.js`
  - Test: Submit valid credentials → JWT stored → redirect to dashboard. Wrong password → inline error shown.

- [x] **Task 12**: Build register page
  - Files: `src/frontend/register.html`, `src/frontend/js/register.js`
  - Test: Valid registration → JWT stored → redirect to dashboard. Duplicate email → inline error. Password mismatch → inline error.

- [x] **Task 13**: Build dashboard page
  - Files: `src/frontend/dashboard.html`, `src/frontend/js/dashboard.js`
  - Test: Valid JWT → user email displayed. No JWT → redirect to login. Logout clears token + redirects.

- [x] **Task 14**: Create root `index.html` (redirect logic)
  - Files: `src/frontend/index.html`
  - Test: With JWT → redirect to dashboard. Without JWT → redirect to login.

## Phase 4 — Polish & Docs

- [x] **Task 15**: Add `.gitignore`, `.env.example`, update `README.md`
  - Files: `.gitignore`, `.env.example`, `README.md`
  - Test: `git status` shows no `data/app.db` or `.env` in tracked files.

- [x] **Task 16**: Final end-to-end smoke test
  - Test: Start server → register new user → login → view dashboard → logout → confirm redirect.
