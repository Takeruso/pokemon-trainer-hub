Pokémon Trainer Hub

A small full-stack demo application built with React + TypeScript, Express, and MongoDB Atlas.
Originally a university assignment using Vue + IndexedDB, this project was rewritten from scratch to practice:

building a real backend API

implementing authentication with hashed passwords

connecting a frontend to a cloud database

deploying a full stack app (Netlify + Render)


This repository represents my first full-stack project with an actual server + database, built to strengthen my fundamentals and portfolio.


---

🚀 Live Demo

Frontend (Netlify)
https://lambent-dodol-53c843.netlify.app

Backend API (Render)
https://pokemon-trainer-hub.onrender.com/api

Demo Account

username: demo
password: demo123


---

🧰 Tech Stack

Frontend

React 18 + TypeScript

Vite

Custom hooks (useAuth, useComments)

CSS (no UI frameworks)


Backend

Node.js + Express

Mongoose (MongoDB Atlas)

bcrypt (password hashing)


External API

PokéAPI — used directly from the frontend

Local JSON feed — for the News page



---

✨ Features

🔐 Authentication

Signup & login using bcrypt hashed passwords

Basic session state stored in localStorage

Simplified for demo purposes (no JWT yet)


💬 Comments Dashboard

Create / Edit / Delete / Like comments

Stored in MongoDB Atlas

Live search filter

Fully connected CRUD between frontend and backend


🔎 Pokémon Viewer

Fetches Pokémon data (name, sprite, types) from PokéAPI

Client-side rendering with loading & error states


📰 News Page

Renders articles from a local JSON dataset

Simulates a small CMS integration



---

📦 Project Structure

pokemon-trainer-hub/
├── server/               # Express backend
│   ├── models/           # Mongoose schemas
│   ├── routes/           # Login/signup + comments API
│   └── server.js
│
├── src/                  # React frontend
│   ├── api/              # Fetch wrappers
│   ├── components/       # Reusable UI
│   ├── hooks/            # useAuth / useComments
│   ├── views/            # Pages (Dashboard, Login, etc.)
│   └── App.tsx
│
├── public/
└── package.json


---

🔧 API Overview

Auth

POST /api/auth/register
POST /api/auth/login

Comments

GET    /api/comments
POST   /api/comments
PUT    /api/comments/:id
DELETE /api/comments/:id

(PokéAPI is called directly from the frontend.)


---

🔑 Environment Variables

Frontend (.env)

VITE_API_BASE=https://pokemon-trainer-hub.onrender.com/api

Backend (.env)

MONGO_URI=your-atlas-uri
PORT=3000


---

🛠 Running Locally

Backend

cd server
npm install
cp .env.example .env
npm run dev

Frontend

npm install
npm run dev


---

📱 Responsive Notes

The layout uses minimal responsive rules.
Major screens (Login / Dashboard / Pokémon) are tested on mobile and remain readable.


---

⚠️ Limitations (By Design)

This is a learning project, so the architecture is intentionally simple:

No JWT or session middleware yet

No role-based authorization

Error handling is minimal

No pagination for comments

CSS is basic (no UI framework)


Future version will extend these.


---

🎯 Purpose

This project demonstrates:

understanding of React + TypeScript fundamentals

ability to design & consume REST APIs

handling auth (bcrypt hashing)

connecting a frontend to MongoDB Atlas

deploying a complete full stack app


It is intended as a portfolio sample rather than a production system.


---

📬 Contact

If you want to discuss the project or collaboration:

GitHub: https://github.com/Takeruso


---