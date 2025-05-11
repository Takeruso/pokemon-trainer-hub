// useDB.js
import { openDB } from 'idb';

const DB_NAME = 'pokemon-database';
const STORE_NAME = 'pokemons';
const VERSION = 1;

const dbPromise = openDB(DB_NAME, VERSION, {
  upgrade(db) {
    if (!db.objectStoreNames.contains(STORE_NAME)) {
      db.createObjectStore(STORE_NAME, { keyPath: 'id', autoIncrement: true });
    }
  },
});

export async function getAllItems() {
  const db = await dbPromise;
  return await db.getAll(STORE_NAME);
}

export async function addItem(item) {
  const db = await dbPromise;
  return await db.add(STORE_NAME, item);
}

export async function updateItem(item) {
  const db = await dbPromise;
  return await db.put(STORE_NAME, item);
}

export async function deleteItem(id) {
  const db = await dbPromise;
  return await db.delete(STORE_NAME, id);
}
