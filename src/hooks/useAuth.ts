// src/hooks/useAuth.ts
import { useEffect, useState } from 'react';
import { registerUser, loginUser } from '../api/auth';

export type LoginErrorReason =
  | 'invalid-credentials'
  | 'server-error'
  | 'network-error';

export type LoginResult =
  | { ok: true }
  | { ok: false; reason: LoginErrorReason; message: string };

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('isLoggedIn') === 'true',
  );
  const [currentUser, setCurrentUser] = useState(
    localStorage.getItem('currentUser') || '',
  );

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    if (currentUser) {
      localStorage.setItem('currentUser', currentUser);
    }
  }, [isLoggedIn, currentUser]);

  // --- Register ---
  async function register(username: string, password: string): Promise<void> {
    const res = await registerUser(username, password);

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      const msg = body?.message || 'Failed to register';
      throw new Error(msg);
    }
  }

  // --- Login ---
  async function login(
    username: string,
    password: string,
  ): Promise<LoginResult> {
    try {
      const res = await loginUser(username, password);

      if (res.ok) {
        const data = await res.json().catch(() => null);
        setIsLoggedIn(true);
        setCurrentUser(data?.username ?? username);
        return { ok: true };
      }

      // fail（401）
      if (res.status === 401) {
        return {
          ok: false,
          reason: 'invalid-credentials',
          message: 'Invalid username or password',
        };
      }

      // other server errors
      const body = await res.json().catch(() => null);
      return {
        ok: false,
        reason: 'server-error',
        message: body?.message || 'Server error. Please try again later.',
      };
    } catch {
      // network error
      return {
        ok: false,
        reason: 'network-error',
        message: 'Network error. Check your connection and try again.',
      };
    }
  }

  function logout() {
    setIsLoggedIn(false);
    setCurrentUser('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  }

  return { isLoggedIn, currentUser, register, login, logout };
}
