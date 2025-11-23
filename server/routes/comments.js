// server/routes/comments.js
import express from 'express';
import Comment from '../models/Comment.js';

const router = express.Router();

// GET /api/comments  Get all comments
router.get('/', async (req, res) => {
  try {
    const comments = await Comment.find().sort({ _id: -1 });
    res.json(comments);
  } catch (err) {
    console.error('Fetch comments error:', err.message);
    res.status(500).json({ message: 'Failed to fetch comments' });
  }
});

// POST /api/comments  Create a new comment
router.post('/', async (req, res) => {
  try {
    const { name, comment, likes } = req.body;

    if (!name || !comment) {
      return res.status(400).json({ message: 'Name and comment are required' });
    }

    const doc = await Comment.create({
      name: String(name),
      comment: String(comment)  ,
      likes: likes ?? 0,
    });

    res.status(201).json(doc);
  } catch (err) {
    console.error('Add comment error:', err.message);
    res.status(500).json({ message: 'Failed to add comment' });
  }
});

// PUT /api/comments/:id  Update a comment
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
    console.error('Update comment error:', err.message);
    res.status(500).json({ message: 'Failed to update comment' });
  }
});

// DELETE /api/comments/:id  Delete a comment
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await Comment.findByIdAndDelete(id);
    if (!deleted) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    // The front end expects a 204 No Content response.
    res.status(204).end();
  } catch (err) {
    console.error('Delete comment error:', err.message);
    res.status(500).json({ message: 'Failed to delete comment' });
  }
});

export default router;
