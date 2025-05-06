import { openDB } from 'idb';

const dbPromise = openDB('my-database', 2, {
  upgrade(db) {
    if (!db.objectStoreNames.contains('items')) {
      db.createObjectStore('items', { keyPath: 'id', autoIncrement: true });
    }
  },
});

export async function addItem(item) {
  const db = await dbPromise;
  await db.add('items', item);
}

export async function getAllItems() {
  const db = await dbPromise;
  return await db.getAll('items');
}

export async function deleteItem(id) {
  const db = await dbPromise;
  await db.delete('items', id);
}

export async function clearAllItems() {
  const db = await dbPromise;
  await db.clear('items');
}
