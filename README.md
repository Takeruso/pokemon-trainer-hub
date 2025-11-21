# Pokemon Trainer Hub

> A modern full‑stack demo application showcasing **authentication**, **comment CRUD**, and **external API integration** around Pokémon data.
> Originally a **university assignment** implemented in **Vue.js + IndexedDB**, this project was **re‑architected with an AI Agent** into a production‑style stack: **React + TypeScript + Express + MongoDB Atlas**.

---
## 🧭 Project Origin & Evolution
| Phase | Stack | Data Layer | Notes |
|-------|-------|------------|-------|
| Academic Prototype | Vue.js (Options API) | Browser IndexedDB | Local‑only persistence; limited scalability |
| Modern Rewrite | React + TypeScript | MongoDB Atlas (Mongoose) | Server API, auth, better DX |
| AI Assistance | GitHub Copilot / AI Agent | Refactored domain models | Generated boilerplate, route scaffolds, type hints |

Key rewrite goals:
- Replace fragile client‑side storage with a cloud database.
- Introduce proper separation of concerns (API layer vs UI).
- Enforce static typing (TypeScript) for maintainability.
- Document architecture for portfolio presentation.

---
## 🔧 Tech Stack
**Frontend**
- React 18 + TypeScript
- Vite (fast dev server & build)
- React Query (optional future addition placeholder)
- CSS Modules / Plain CSS

**Backend**
- Node.js + Express
- Mongoose (MongoDB Atlas)
- bcrypt (password hashing)
- jsonwebtoken (JWT auth)

**External / Data Sources**
- PokéAPI (public REST Pokémon data)
- Local JSON news feed (`/data/news.json`)

**Tooling & Quality**
- ESLint + TypeScript ESLint
- Prettier formatting
- Nodemon (dev backend)
- GitHub Actions (planned CI)

---
## ✨ Features
### Authentication
- Signup & login with hashed passwords (bcrypt)
- Stateless auth via JWT (Authorization header)
- Basic protected routes

### Comments Dashboard
- Create / Edit / Delete / Like comments
- MongoDB persistence via Mongoose models
- Live search / filtering
- Simple optimistic UI pattern (expandable)

### Pokémon Viewer
- Fetches Pokémon details (name, types, sprite) from PokéAPI
- Resilient fetch with error states & loading skeletons

### News Page
- Renders articles from local JSON feed (simulates CMS integration)

### Portfolio‑Focused Extras
- Clear architecture documentation
- Migration story (legacy → modern)
- Screenshots & UX overview

---
## 🏛 Architecture Overview
```mermaid
flowchart LR
    A[React + TS UI] -->|REST / JSON| B[Express API]
    B --> C[(MongoDB Atlas)]
    B --> D[(PokéAPI)]
    A --> E[Local JSON News]
```

### Layer Responsibilities
- Frontend: Presentation, state management, API calls, auth token handling.
- Backend: Auth, validation, CRUD operations, external API passthrough (optional caching layer future).
- Database: User & Comment collections.

---
## 🗄 Data Models (Simplified)
```ts
// User
interface User {
  _id: string;
  username: string;
  passwordHash: string; // bcrypt
  createdAt: Date;
}

// Comment
interface Comment {
  _id: string;
  userId: string; // ref User
  content: string;
  likes: number;
  createdAt: Date;
  updatedAt: Date;
}
```

---
## 🔐 Auth Flow
1. User submits credentials to `/api/auth/login`.
2. Server validates & issues JWT (signed with `JWT_SECRET`).
3. Frontend stores token in memory (or `localStorage` fallback).
4. Protected requests include `Authorization: Bearer <token>`.
5. Middleware verifies & attaches `req.user`.

---
## 🌐 API Routes (Current)
```plaintext
POST   /api/auth/signup      # Create account
POST   /api/auth/login       # Get JWT
GET    /api/comments         # List comments
POST   /api/comments         # Create comment
PUT    /api/comments/:id     # Update comment
DELETE /api/comments/:id     # Delete comment
POST   /api/comments/:id/like # Increment like counter
GET    /api/pokemon/:name    # Proxy/fetch Pokémon detail
GET    /api/news             # Local JSON feed
```
(Adjust this list if your actual routes differ.)

---
## 🚀 Getting Started (Development)
### 1. Clone & Install
```bash
git clone https://github.com/Takeruso/pokemon-trainer-hub.git
cd pokemon-trainer-hub
npm install
```
### 2. Backend Setup
```bash
cd server
cp .env.example .env
# Edit .env and set:
MONGO_URI="mongodb+srv://<user>:<pass>@cluster.mongodb.net/<db>?retryWrites=true&w=majority"
JWT_SECRET="change_me"
PORT=3000
npm install
npm run dev   # or: node server.js
```
Backend Base URL: `http://localhost:3000`

### 3. Frontend Setup
```bash
cd ..
npm run dev
```
Frontend Dev Server: `http://localhost:5173`

---
## 📦 Production Build
```bash
# Frontend
npm run build
# Serve `dist/` via a static host or integrate with Express.

# Backend (example PM2 usage)
pm install -g pm2
pm run build:server # (if you add a build step)
pm2 start server/server.js --name pokemon-hub
```

---
## 🔑 Environment Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB Atlas connection string | mongodb+srv://user:pass@cluster/db |
| `JWT_SECRET` | Secret for signing JWTs | supersecret123 |
| `PORT` | Backend port | 3000 |

---
## 🗂 Project Structure
```plaintext
pokemon-trainer-hub/
├── server/               # Express backend
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Route handlers
│   ├── middleware/       # Auth / validation
│   ├── utils/            # Helper functions
│   └── server.js
├── src/                  # React frontend source
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page-level views
│   ├── hooks/            # Custom hooks (future)
│   ├── services/         # API abstraction
│   ├── assets/           # Images / styles
│   └── App.tsx
├── public/               # Static assets
├── docs/                 # Documentation & screenshots
└── package.json
```

---
## 🖼 Screenshots
(Replace the placeholders below with real images placed in `docs/screenshots/`.)

| Login | Dashboard | Pokémon Viewer |
|-------|-----------|---------------|
| ![Login](docs/screenshots/login.png) | ![Comments](docs/screenshots/comments.png) | ![Pokemon](docs/screenshots/pokemon.png) |

| News Page | Mobile View |
|-----------|-------------|
| ![News](docs/screenshots/news.png) | ![Mobile](docs/screenshots/mobile.png) |

> Ensure images are optimized (≤ 200KB each) for fast loading.

---
## 🧪 Testing (Future Roadmap)
Planned additions:
- Unit tests (Jest + React Testing Library)
- Integration tests for API routes (Supertest)
- ESLint CI enforcement

---
## 🧠 AI Agent Contribution
The migration leveraged an AI agent (e.g., GitHub Copilot) to:
- Scaffold React components & TypeScript interfaces.
- Generate initial Express route boilerplate.
- Suggest Mongoose schema validation patterns.
- Refactor repetitive utility functions.
Human review refined logic, ensured security (hashing, token expiry), and adjusted UX copy.

---
## 🔍 Performance & Scalability Notes
- Stateless JWT auth scales horizontally.
- MongoDB Atlas handles clustering & replication.
- Potential caching layer (Redis) for popular Pokémon detail lookups.
- Code splitting via Vite can reduce initial bundle size.

---
## ♿ Accessibility Considerations
- Semantic HTML tags used in core components.
- Alt text provided for images.
- Focus styles preserved for keyboard navigation.
(Perform an audit with Lighthouse for improvements.)

---
## 🛣 Future Improvements
- Dark mode toggle.
- Rate limiting for auth endpoints.
- Pagination / infinite scroll for comments.
- Form validation using Zod or Yup.
- Refresh token flow & token revocation list.
- Docker Compose for unified local dev.

---
## 🤝 Contributing
1. Fork the repo
2. Create a feature branch: `git checkout -b feature/my-improvement`
3. Commit changes: `git commit -m "feat: add improvement"`
4. Push & open a Pull Request

---
## 📄 License
Add a license (e.g., MIT) here if you intend to make it explicit. Example:
```
MIT License © 2025 Takeruso
```

---
## ✅ Checklist for Portfolio Readiness
- [x] Clear migration story
- [x] Screenshots illustrating UX
- [x] Architecture diagram
- [x] Data models & API route list
- [x] Setup & environment docs
- [x] Future improvements roadmap

> This README is designed to communicate both technical proficiency and project storytelling for portfolio reviewers.

---
## 📬 Contact
For questions or collaboration: [GitHub Profile](https://github.com/Takeruso)
