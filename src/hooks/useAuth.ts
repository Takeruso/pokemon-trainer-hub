import { useState, useEffect } from 'react';

const API_BASE = '/api';

export function useAuth() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(
    localStorage.getItem('isLoggedIn') === 'true'
  );
  const [currentUser, setCurrentUser] = useState<string>(
    localStorage.getItem('currentUser') || ''
  );

  useEffect(() => {
    localStorage.setItem('isLoggedIn', isLoggedIn.toString());
    if (currentUser) {
      localStorage.setItem('currentUser', currentUser);
    }
  }, [isLoggedIn, currentUser]);

  async function register(username: string, password: string): Promise<void> {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      throw new Error('User already exists');
    }
  }

  async function login(username: string, password: string): Promise<boolean> {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      setIsLoggedIn(true);
      setCurrentUser(username);
      return true;
    }
    return false;
  }

  function logout(): void {
    setIsLoggedIn(false);
    setCurrentUser('');
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('currentUser');
  }

  return {
    isLoggedIn,
    currentUser,
    register,
    login,
    logout,
  };
}
