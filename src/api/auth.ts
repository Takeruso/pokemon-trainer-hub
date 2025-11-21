// src/api/auth.ts
const API_BASE = import.meta.env.VITE_API_BASE || 'http://localhost:3000/api';

export async function registerUser(username: string, password: string) {
  return fetch(`${API_BASE}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
}

export async function loginUser(username: string, password: string) {
  return fetch(`${API_BASE}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
}
