import mongoose from 'mongoose';

const pokemonSchema = new mongoose.Schema({
  name: { type: String, required: true },
  comment: { type: String, required: true },
  likes: { type: Number, default: 0 },
});

export default mongoose.model('Pokemon', pokemonSchema);
