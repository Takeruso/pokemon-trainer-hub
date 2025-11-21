// server/models/Comment.js
import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  likes: { type: Number, default: 0 },
});

export default mongoose.model('Comment', commentSchema);
