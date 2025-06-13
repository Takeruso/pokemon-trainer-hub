import { ref } from 'vue';

const API_BASE = '/api';
const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true');
const currentUser = ref(localStorage.getItem('currentUser') || '');

export function useAuth() {
  async function register(username, password) {
    const res = await fetch(`${API_BASE}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (!res.ok) {
      throw new Error('User already exists');
    }
  }

  async function login(username, password) {
    const res = await fetch(`${API_BASE}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });
    if (res.ok) {
      isLoggedIn.value = true;
      currentUser.value = username;
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('currentUser', username);
      return true;
    }
    return false;
  }

  function logout() {
    isLoggedIn.value = false;
    currentUser.value = '';
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
