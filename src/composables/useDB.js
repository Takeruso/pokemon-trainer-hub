const API_BASE = '/api/pokemons';

export async function getAllItems() {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch pokemons');
  return await res.json();
}

export async function addItem(item) {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to add item');
  return await res.json();
}

export async function updateItem(item) {
  const res = await fetch(`${API_BASE}/${item._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(item),
  });
  if (!res.ok) throw new Error('Failed to update item');
  return await res.json();
}

export async function deleteItem(id) {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete item');
  return await res.json();
}
