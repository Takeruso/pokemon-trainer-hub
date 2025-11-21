const API_BASE = '/api/pokemons';

export interface Pokemon {
  _id?: string;
  name: string;
  comment: string;
  likes: number;
}

export async function getAllItems(): Promise<Pokemon[]> {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch pokemons');
  return await res.json();
}

export async function addItem(item: Omit<Pokemon, '_id'>): Promise<Pokemon> {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to add item');
  return await res.json();
}

export async function updateItem(item: Pokemon): Promise<Pokemon> {
  const res = await fetch(`${API_BASE}/${item._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to update item');
  return await res.json();
}

export async function deleteItem(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete item');
  await res.json();
}
