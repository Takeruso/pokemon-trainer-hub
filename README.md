# Pokemon Trainer Hub

> A modern full‑stack demo application showcasing **authentication**, **comment CRUD**, and **external API integration** around Pokémon data.
> Originally a **university assignment** implemented in **Vue.js + IndexedDB**, this project was **re‑architected with an AI Agent** into a production‑style stack: **React + TypeScript + Express + MongoDB Atlas**.

---
## 🧭 Project Origin & Evolution
| Phase | Stack | Data Layer | Notes |
|-------|-------|------------|-------|
| Academic Prototype | Vue.js (Options API) | Browser IndexedDB | Local‑only persistence; limited scalability |
| Modern Rewrite | React + TypeScript | MongoDB Atlas (Mongoose) | Server API, better DX |
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
- CSS Modules / Plain CSS
- (Future: React Query for data fetching, Zod/Yup for validation)

**Backend**
- Node.js + Express
- Mongoose (MongoDB Atlas)
- bcrypt (password hashing)

**External / Data Sources**
- PokéAPI (public REST Pokémon data) – called directly from the frontend
- Local JSON news feed (`/data/news.json`)

**Tooling & Quality**
- ESLint + TypeScript ESLint
- Prettier formatting
- Nodemon (dev backend)
- (Planned) GitHub Actions CI

---
## ✨ Features
### Authentication
- Signup & login with hashed passwords (bcrypt)
- Minimal demo approach: server returns user info; frontend stores user id locally
- NOTE: No JWT / session layer yet (see limitations below)

### Comments Dashboard
- Create / Edit / Delete / Like comments
- MongoDB persistence via Mongoose models
- Live search / filtering

### Pokémon Viewer
- Fetches Pokémon details (name, types, sprite) directly from PokéAPI
- Basic loading & error states

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
    A --> D[(PokéAPI)]
    A --> E[Local JSON News]
```

### Layer Responsibilities
- Frontend: Presentation, state management, direct external API calls, local user context.
- Backend: Validation, persistence, comment CRUD, user signup/login.
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
## 🔐 Authentication Flow & Limitations
Current minimal flow (educational demo):
1. User submits credentials to `/api/auth/login`.
2. Server verifies password (bcrypt compare) and returns basic user data (`_id`, `username`).
3. Frontend stores user id (in memory or `localStorage`).
4. Mutating requests include user id (e.g. in request body) and server checks ownership.

Limitations / Security Notes:
- No JWT, session, CSRF protection, or role-based access yet.
- User id spoofing is possible if server-side ownership checks are weak.
- Future enhancement: add secure session or token-based auth + authorization middleware.

---
## 🌐 API Routes (Current / Intended)
```plaintext
POST   /api/auth/signup        # Create account
POST   /api/auth/login         # Login (returns user info)
GET    /api/comments           # List comments
POST   /api/comments           # Create comment
PUT    /api/comments/:id       # Update comment
DELETE /api/comments/:id       # Delete comment
POST   /api/comments/:id/like  # Increment like counter
GET    /api/news               # Local JSON news feed
```
(PokéAPI is called directly from the frontend; not proxied.)

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
npm run build          # Outputs dist/
# Serve dist/ via static host or integrate with Express.

# Backend (example using PM2)
npm install -g pm2
pm2 start server/server.js --name pokemon-trainer-hub
```

---
## 🔑 Environment Variables
| Variable | Description | Example |
|----------|-------------|---------|
| `MONGO_URI` | MongoDB Atlas connection string | mongodb+srv://user:pass@cluster/db |
| `PORT` | Backend port | 3000 |

(No auth token secret yet — will be added when secure auth is implemented.)

---
## 🗂 Project Structure
```plaintext
pokemon-trainer-hub/
├── server/               # Express backend
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Route handlers
│   ├── middleware/       # (future) auth/validation
│   ├── utils/            # Helpers
│   └── server.js
├── src/                  # React frontend source
│   ├── components/       # Reusable UI components
│   ├── pages/            # Page-level views
│   ├── services/         # Fetch wrappers
│   ├── assets/           # Images / styles
│   └── App.tsx
├── public/               # Static assets
├── docs/                 # Documentation & screenshots
└── package.json
```

---
## 🖼 Screenshots
(Replace the placeholders below with real images in `docs/screenshots/`.)

| Login | Dashboard | Pokémon Viewer |
|-------|-----------|---------------|
| ![Login](docs/screenshots/login.png) | ![Comments](docs/screenshots/comments.png) | ![Pokemon](docs/screenshots/pokemon.png) |

| News Page | Mobile View |
|-----------|-------------|
| ![News](docs/screenshots/news.png) | ![Mobile](docs/screenshots/mobile.png) |

> Optimize images (≤ 200KB each).

---
## 🧪 Testing (Future Roadmap)
Planned additions (not yet implemented):
- Unit tests (Jest + React Testing Library)
- Integration tests for API routes (Supertest)
- CI workflow (lint + tests + build)

---
## 🧠 AI Agent Contribution
The migration leveraged an AI agent (e.g., GitHub Copilot) to:
- Scaffold React components & TypeScript interfaces.
- Generate initial Express route boilerplate.
- Suggest Mongoose schema patterns.
- Refactor repetitive utility functions.
Human review refined logic, security considerations, and UX copy.

---
## 🔍 Performance & Scalability Notes
- MongoDB Atlas handles scaling & replication.
- Potential caching layer (Redis) for popular Pokémon lookups if proxied later.
- Code splitting via Vite reduces bundle size.
- Future: pagination for comments, rate limiting.

---
## ♿ Accessibility Considerations
- Semantic HTML elements.
- Alt text for images.
- Focus styles retained for keyboard navigation.
(Planned: Lighthouse audit & contrast improvements.)

---
## 🛣 Future Improvements
- Secure auth (session or token-based) + middleware.
- Rate limiting for auth & write endpoints.
- Pagination / infinite scroll for comments.
- Dark mode toggle.
- Form validation using Zod or Yup.
- Docker Compose for unified local dev.
- Comment moderation & roles.

---
## 🤝 Contributing
See `docs/CONTRIBUTING.md` for full guidelines.
Summary:
1. Fork repo
2. Create feature branch: `git checkout -b feature/my-improvement`
3. Commit: `git commit -m "feat: add improvement"`
4. Open Pull Request

---
## 📄 License
If you choose to make it explicit:
```
MIT License © 2025 Takeruso
```

---
## ✅ Checklist for Portfolio Readiness
- [x] Migration story
- [x] Architecture diagram
- [x] Data models
- [x] Setup instructions
- [x] Feature list
- [x] Roadmap
- [x] Screenshot placeholders

> This README is designed to communicate both technical proficiency and project storytelling for portfolio reviewers.

---
## 📬 Contact
For questions or collaboration: [GitHub Profile](https://github.com/Takeruso)