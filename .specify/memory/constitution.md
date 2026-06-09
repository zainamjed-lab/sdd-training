# Project Constitution — sdd-training

**Effective**: 2026-06-09
**Applies to**: All features in this repository

---

## Article I — Spec First (Non-Negotiable)

No code is written before **all three** SDD artifacts exist and are complete:

1. `specs/<NNN>-<feature>/spec.md` — objective, user stories, acceptance criteria, NFRs
2. `specs/<NNN>-<feature>/plan.md` — architecture, data models, API contracts, module breakdown
3. `specs/<NNN>-<feature>/tasks.md` — ordered, verifiable task list

This applies to every feature, page, component, or API change — no exceptions.
If something is built without these artifacts, they must be created retroactively before the next feature begins.

## Article II — Explicit Over Implicit

Every function, route, and module has a single, clear responsibility. No hidden side effects.

## Article III — Security by Default

- Passwords are always hashed with bcrypt (minimum 10 rounds).
- Secrets (JWT keys, DB credentials) live in environment variables — never in committed code.
- All authentication middleware must be explicitly applied; no implicit protection.
- Input is validated at every system boundary.

## Article IV — Thin Backend, Thin Frontend

- Backend exposes a JSON REST API only — no server-side rendering of HTML.
- Frontend is pure static HTML/CSS/JS — no build toolchain for this project.
- The two layers communicate exclusively through the REST API.

## Article V — Tests Are Not Optional

- Every API route has at least one happy-path and one error-path test.
- Tests live alongside the source they test in a `__tests__/` directory.

## Article VI — Dependencies Are a Liability

- Only add a dependency when it solves a problem that pure Node.js cannot handle reasonably.
- Approved core dependencies: `express`, `jsonwebtoken`, `bcryptjs`, `better-sqlite3`, `cors`, `dotenv`.

## Article VII — Error Messages Must Not Leak Internals

- All HTTP error responses use the shape `{ "error": "<human message>" }`.
- Stack traces and SQL errors are logged server-side only — never sent to clients.

## Article VIII — Commit Often, Message Clearly

- Commits follow Conventional Commits: `feat:`, `fix:`, `docs:`, `chore:`, `test:`.
- Each commit covers exactly one logical change.
