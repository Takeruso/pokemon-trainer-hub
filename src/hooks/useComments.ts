// src/hooks/useComments.ts
import { useState, useEffect } from 'react';
import {
  getAllComments,
  addComment,
  updateComment,
  deleteComment,
  Comment,
} from '../api/comments';

export function useComments() {
  const [comments, setComments] = useState<Comment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const all = await getAllComments();

        // ⚠ サンプルデータ注入は本来サーバー側の責務
        // 課題の都合でフロントでやるなら、ここに残す
        if (all.length === 0) {
          const sampleData: Omit<Comment, '_id'>[] = [
            {
              name: 'Alice',
              comment: 'Vue 3 is amazing! Loving the Composition API.',
              likes: 4,
            },
            {
              name: 'Bob',
              comment: 'Anyone tried Pinia instead of Vuex?',
              likes: 2,
            },
            {
              name: 'Charlie',
              comment:
                'What is your favourite UI framework? Bootstrap? Tailwind?',
              likes: 1,
            },
          ];

          for (const item of sampleData) {
            await addComment(item);
          }

          console.log('✅ Sample data injected into MongoDB.');
          const refreshed = await getAllComments();
          setComments(refreshed);
        } else {
          setComments(all);
        }
      } catch (err) {
        console.error(err);
        setError('Failed to load comments');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const createComment = async (input: { name: string; comment: string }) => {
    const payload: Omit<Comment, '_id'> = {
      name: input.name,
      comment: input.comment,
      likes: 0,
    };
    const created = await addComment(payload);
    // 追加したものを先頭に
    setComments((prev) => [created, ...prev]);
  };

  const editComment = async (comment: Comment) => {
    const updated = await updateComment(comment);
    setComments((prev) =>
      prev.map((c) => (c._id === updated._id ? updated : c)),
    );
  };

  const removeComment = async (id: string) => {
    await deleteComment(id);
    setComments((prev) => prev.filter((c) => c._id !== id));
  };

  const likeComment = async (id: string) => {
    const target = comments.find((c) => c._id === id);
    if (!target) return;

    const updated = await updateComment({
      ...target,
      likes: target.likes + 1,
    });

    setComments((prev) => prev.map((c) => (c._id === id ? updated : c)));
  };

  return {
    comments,
    loading,
    error,
    createComment,
    editComment,
    removeComment,
    likeComment,
  };
}
