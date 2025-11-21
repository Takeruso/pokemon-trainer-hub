// server/routes/comments.js
import express from 'express';
import Comment from '../models/Comment.js';

const router = express.Router();

// GET /api/comments  全コメント取得
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ _id: -1 });
    res.json(comments);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
});

// POST /api/comments  新規コメント作成
router.post('/', async (req, res) => {
  try {
    const { name, comment, likes } = req.body;

    if (!name || !comment) {
      return res.status(400).json({ message: 'Name and comment are required' });
    }

    const doc = await Comment.create({
      name,
      comment,
      likes: likes ?? 0,
    });

    res.status(201).json(doc);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to add comment' });
  }
});

// PUT /api/comments/:id  コメント更新
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, comment, likes } = req.body;

    const updated = await Comment.findByIdAndUpdate(
      id,
      { name, comment, likes },
      { new: true },
    );

    if (!updated) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    res.json(updated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to update comment' });
  }
});

// DELETE /api/comments/:id  コメント削除
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Comment.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // フロント側は 204 No Content を想定している
    res.status(204).end();
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Failed to delete comment' });
  }
});

export default router;
