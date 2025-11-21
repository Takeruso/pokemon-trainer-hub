# Pokemon Trainer Hub

A small full-stack demo application showcasing **authentication**, **comment CRUD**, and **external API integration**.

---

## 🔧 Tech Stack

**Frontend**

- React + TypeScript
- Vite

**Backend**

- Node.js + Express
- Mongoose (MongoDB Atlas)

**External Services**

- PokéAPI (REST)
- Local JSON-based News feed

---

## ✨ Features

### Authentication

- User signup & login
- Password hashing via **bcrypt**

### Comments Dashboard

- Create / Edit / Delete / Like comments
- Stored in MongoDB Atlas
- Includes live search filtering

### Pokémon Viewer

- Fetches Pokémon details (name, type, image) from PokéAPI

### News Page

- Renders articles from a local JSON feed

---

## 🚀 Getting Started

### 1. Backend Setup

```bash
cd server

# Create environment file (if not already created)
cp .env.example .env

# Add your MongoDB connection string
echo "MONGO_URI=<your MongoDB URI>" >> .env

# Start the server
node server.js
```

**API Base URL:**
`http://localhost:3000`

---

### 2. Frontend Setup

```bash
npm install
npm run dev
```

**Frontend Dev Server:**
`http://localhost:5173`

---

## 📁 Project Structure

```plaintext
pokemon-trainer-hub/
│
├── server/                 # Express backend
│   ├── models/
│   ├── routes/
│   └── server.js
│
├── src/                    # React frontend
│   ├── components/
│   ├── pages/
│   └── App.tsx
│
└── package.json
```

---

Additional sections (API routes, deployment steps, screenshots) can be added as needed.
