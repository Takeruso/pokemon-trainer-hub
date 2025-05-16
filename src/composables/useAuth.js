import { ref } from 'vue';
import { openDB } from 'idb';

const isLoggedIn = ref(localStorage.getItem('isLoggedIn') === 'true');
const currentUser = ref(localStorage.getItem('currentUser') || '');

const dbPromise = openDB('my-database', 2, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('users')) {
      db.createObjectStore('users', { keyPath: 'username' });
    }
  },
});

export function useAuth() {
  async function register(username, password) {
    const db = await dbPromise;
    const existing = await db.get('users', username);
    if (existing) {
      throw new Error('User already exists');
    }
    await db.add('users', { username, password });
  }

  async function login(username, password) {
    const db = await dbPromise;
    const user = await db.get('users', username);
    if (user && user.password === password) {
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

async function injectDefaultUser() {
  const db = await dbPromise;
  const existing = await db.get('users', 'admin');
  if (!existing) {
    await db.add('users', { username: 'admin', password: '1234' });
    console.log('Default user "admin" injected');
  }
}

injectDefaultUser();
