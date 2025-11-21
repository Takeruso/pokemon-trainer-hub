import { useEffect, useState } from 'react';
import { registerUser, loginUser } from '../api/auth';

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

  async function register(username: string, password: string): Promise<void> {
    const res = await registerUser(username, password);

    if (!res.ok) {
      const body = await res.json().catch(() => null);
      const msg = body?.message || 'Failed to register';
      throw new Error(msg);
    }
  }

  async function login(username: string, password: string): Promise<boolean> {
    const res = await loginUser(username, password);
    if (!res.ok) return false;

    const data = await res.json().catch(() => null);
    setIsLoggedIn(true);
    setCurrentUser(data?.username ?? username);
    return true;
  }

  function logout() {
    setIsLoggedIn(false);
    setCurrentUser('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  }

  return { isLoggedIn, currentUser, register, login, logout };
}
