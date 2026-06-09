# sdd-training

A full-stack login page feature built with **Spec-Driven Development** using [GitHub Spec Kit](https://github.com/github/spec-kit).

## Stack

| Layer | Technology |
|-------|-----------|
| Runtime | Node.js v18+ |
| Backend | Express 4, JWT (`jsonwebtoken`), bcrypt (`bcryptjs`) |
| Storage | JSON file store (`data/users.json`) |
| Frontend | Vanilla HTML / CSS / JS |

## SDD Artifacts

| File | Purpose |
|------|---------|
| [.specify/memory/constitution.md](.specify/memory/constitution.md) | Project principles |
| [specs/001-login-page/spec.md](specs/001-login-page/spec.md) | Feature specification |
| [specs/001-login-page/plan.md](specs/001-login-page/plan.md) | Technical implementation plan |
| [specs/001-login-page/tasks.md](specs/001-login-page/tasks.md) | Task breakdown |

## Quick Start

```bash
# 1. Clone
git clone https://github.com/zainamjed-lab/sdd-training.git
cd sdd-training

# 2. Install
npm install

# 3. Configure
cp .env.example .env
# Edit .env and set a strong JWT_SECRET

# 4. Run
npm start
# → http://localhost:3000
```

## Project Structure

```
src/
├── backend/
│   ├── server.js            Express entry point
│   ├── config/database.js   JSON file store helpers
│   ├── middleware/auth.js    JWT verification middleware
│   ├── models/user.js       User CRUD
│   └── routes/auth.js       /api/auth/* routes
└── frontend/
    ├── index.html           Redirect hub
    ├── login.html           Login form
    ├── register.html        Registration form
    ├── dashboard.html       Protected dashboard
    ├── css/styles.css
    └── js/
        ├── auth.js          Token helpers + fetch wrapper
        ├── login.js
        ├── register.js
        └── dashboard.js
specs/
└── 001-login-page/          SDD artifacts for this feature
.specify/                    Spec Kit configuration and templates
.claude/skills/              Claude Code slash-command skills
```

## API

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/register` | — | Create account, returns JWT |
| POST | `/api/auth/login` | — | Authenticate, returns JWT |
| GET | `/api/auth/me` | Bearer JWT | Return current user |
| GET | `/api/health` | — | Health check |
