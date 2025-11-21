// src/api/comments.ts
const API_BASE = 'http://localhost:3000/api/comments';

export interface Comment {
  _id?: string;
  name: string;
  comment: string;
  likes: number;
}

export async function getAllComments(): Promise<Comment[]> {
  const res = await fetch(API_BASE);
  if (!res.ok) throw new Error('Failed to fetch comments');
  return await res.json();
}

export async function addComment(
  comment: Omit<Comment, '_id'>,
): Promise<Comment> {
  const res = await fetch(API_BASE, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  });
  if (!res.ok) throw new Error('Failed to add comment');
  return await res.json();
}

export async function updateComment(comment: Comment): Promise<Comment> {
  const res = await fetch(`${API_BASE}/${comment._id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(comment),
  });
  if (!res.ok) throw new Error('Failed to update comment');
  return await res.json();
}

export async function deleteComment(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/${id}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Failed to delete comment');
}
