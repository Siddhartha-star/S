# SnapSearch – AI-Powered SaaS Control Center

SnapSearch is a production-ready, YC-grade dashboard experience that blends secure role-based authentication with a futuristic interface. Users and Admins get personalized control centers, animated quick actions, and a Smart Theme Engine that remembers their gradient aesthetic wherever they log in.

---

## ✨ Key Features

- 🔐 **Secure role-based auth** with bcrypt hashing, JWT (HTTP-only) cookies, and Express middleware guards.
- 🧑‍💻 **Dual dashboards** for Users and Admins with live stats, activity feeds, and AI-flavored quick actions.
- 🌈 **Smart Theme Engine** that stores gradient palettes (Aurora / Sunset / Galaxy) per user in MongoDB and reenacts them on every session.
- 🎨 **Futuristic UI** using Next.js App Router, Tailwind, shadcn/ui patterns, Framer Motion micro interactions, and glassmorphism.
- ⚙️ **TypeScript throughout** with Zod validation, reusable services, and consistent lint/build tooling.
- 🚀 **Deployment ready** for Render (backend) + Vercel (frontend) with provided config files and scripts.

---

## 🛠 Tech Stack

**Frontend**
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS, shadcn/ui-inspired components
- Framer Motion, React Hook Form, Zod, axios, sonner
- next-themes for dark/light + theme syncing

**Backend**
- Node.js + Express + Mongoose (MongoDB Atlas / Render)
- Zod for validation, bcryptjs, jsonwebtoken
- Pino logger, express-async-errors, helmet, cors
- TypeScript with strict configs

**Tooling**
- npm workspaces, ESLint, Prettier
- tsx, ts-node, lint-staged, Husky-ready config

---

## 📁 Monorepo Layout

```
root/
├── backend/           # Express API (TypeScript)
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── utils/
│   │   └── validators/
│   └── package.json
├── frontend/          # Next.js 14 App Router client (TypeScript)
│   ├── app/
│   ├── components/
│   ├── context/
│   ├── hooks/
│   ├── lib/
│   └── package.json
├── render.yaml        # Render blueprint for backend deployment
├── frontend/vercel.json
├── package.json       # Workspace-level scripts
└── README.md
```

---

## 🚀 Getting Started

### 1. Prerequisites
- Node.js **v18.17+** (recommended v20+)
- npm **v9+**
- MongoDB connection string (Atlas / Render Mongo)

### 2. Install Dependencies
```bash
git clone https://github.com/your-org/snapsearch.git
cd snapsearch
npm install
```

### 3. Environment Variables

Create `.env` files by copying the provided templates.

#### Backend (`backend/.env`)
```env
# Server
NODE_ENV=development
PORT=4000

# Database
MONGO_URI=mongodb+srv://USERNAME:PASSWORD@cluster.mongodb.net/snapsearch

# JWT
JWT_SECRET=replace-with-strong-secret
JWT_EXPIRES_IN=15m

# Cookies
COOKIE_NAME=snapsearch_session
COOKIE_DOMAIN=localhost
COOKIE_SECURE=false

# Client / CORS
FRONTEND_URL=http://localhost:3000
CORS_ORIGINS=http://localhost:3000

# Logging
LOG_LEVEL=info

# Theme defaults
DEFAULT_THEME_ACCENT=#0091ff
DEFAULT_THEME_HIGHLIGHT=#ff00b7
```
> Tip: use `MONGO_URI=memory` for an in-memory dev database.

#### Frontend (`frontend/.env`)
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

### 4. Seed Demo Data (optional)
```bash
cd backend
npm run seed
cd ..
```
Creates:
- Admin → `admin@example.com / password123`
- User → `user@example.com / password123`

### 5. Run Locally
```bash
npm run dev --workspace backend    # http://localhost:4000
npm run dev --workspace frontend   # http://localhost:3000
```
Health check:
```bash
curl http://localhost:4000/health
# { "status": "ok", "message": "Server is running", ... }
```

---

## 🔌 API Overview

Base URL: `http://localhost:4000/api`

| Method | Endpoint        | Description                                      | Auth |
|--------|-----------------|--------------------------------------------------|------|
| POST   | `/auth/signup`  | Create account with role + avatar + theme seed   | ❌   |
| POST   | `/auth/login`   | Authenticate user, sets HTTP-only JWT cookie     | ❌   |
| GET    | `/auth/me`      | Return current session profile + theme           | ✅   |
| POST   | `/auth/logout`  | Clear session cookie                             | ✅   |
| GET    | `/items`        | List items (User: own, Admin: optional owner)    | ✅   |
| POST   | `/items`        | Create item for signed-in user                   | ✅   |
| PATCH  | `/items/:id`    | Update item (owner or admin)                     | ✅   |
| DELETE | `/items/:id`    | Delete item (owner or admin)                     | ✅   |
| GET    | `/theme`        | Fetch saved theme palette                        | ✅   |
| POST   | `/theme`        | Persist new theme palette                        | ✅   |

---

## 🧾 Available Scripts

Run from repo root with npm workspaces:

| Command                              | Description                        |
|--------------------------------------|------------------------------------|
| `npm run dev --workspace backend`    | Start Express API (ts-node)        |
| `npm run build --workspace backend`  | Compile backend TypeScript         |
| `npm run start --workspace backend`  | Run compiled backend (`dist/`)     |
| `npm run lint --workspace backend`   | ESLint check for backend           |
| `npm run dev --workspace frontend`   | Next.js dev server                 |
| `npm run build --workspace frontend` | Production build (Next.js)         |
| `npm run start --workspace frontend` | Serve Next.js production build     |
| `npm run lint --workspace frontend`  | ESLint check for frontend          |

---

## ☁️ Deployment Guide

### Backend (Render)
1. Connect repo in Render, choose **Blueprint** deployment with `render.yaml`.
2. Ensure environment variables are populated (Mongo URI, JWT secrets, CORS origins, etc.).
3. Render executes `npm install` + `npm run build` inside `backend/`, then runs `npm run start`.
4. Update the backend service URL in frontend `.env` (`NEXT_PUBLIC_API_URL`) and redeploy frontend.

### Frontend (Vercel)
1. Import repo in Vercel, set project root to `frontend/`.
2. Configure environment variable `NEXT_PUBLIC_API_URL` pointing to the Render backend (`https://<render-app>.onrender.com/api`).
3. Vercel uses `npm run build` / `npm run start` automatically.
4. Enable preview deployments as needed; remember to update backend CORS/`FRONTEND_URL` for production domain.

Configuration files:
- `render.yaml`
- `frontend/vercel.json`

---

## 🧪 Verification

- ✅ `npm run lint --workspace backend`
- ✅ `npm run lint --workspace frontend`
- ✅ `npm run build --workspace backend`
- ✅ `npm run build --workspace frontend`
- ✅ `npm run dev --workspace backend` & health check
- ✅ `npm run dev --workspace frontend`
- ✅ Demo credentials verified (`admin@example.com / password123`, `user@example.com / password123`)

---

## 📸 Screenshots (placeholders)

- `![Landing](docs/screens/landing.png)`
- `![Dashboard](docs/screens/dashboard.png)`
- `![Theme Engine](docs/screens/theme-engine.png)`
- `![Auth Flow](docs/screens/auth.png)`

Add captures to `docs/screens/` and update the image paths when available.

---

## 🙏 Credits & License

Designed and engineered by the SnapSearch team, inspired by the polish of Vercel, Linear, and Notion. Feel free to fork, remix, and ship your own take on a neon SaaS cockpit.

Licensed under the [MIT License](LICENSE).

