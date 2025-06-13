import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import Pokemon from './models/Pokemon.js';
import User from './models/User.js';

const app = express();
const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/weather';

app.use(cors());
app.use(express.json());

mongoose
  .connect(MONGO_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// Pokemon routes
app.get('/api/pokemons', async (req, res) => {
  const items = await Pokemon.find().lean();
  res.json(items);
});

app.post('/api/pokemons', async (req, res) => {
  const item = await Pokemon.create(req.body);
  res.json(item);
});

app.put('/api/pokemons/:id', async (req, res) => {
  const { id } = req.params;
  const item = await Pokemon.findByIdAndUpdate(id, req.body, { new: true });
  res.json(item);
});

app.delete('/api/pokemons/:id', async (req, res) => {
  const { id } = req.params;
  await Pokemon.findByIdAndDelete(id);
  res.json({ message: 'deleted' });
});

// Auth routes
app.post('/api/register', async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.create({ username, password });
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: 'Registration failed' });
  }
});

app.post('/api/login', async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username, password });
  if (user) {
    res.json({ message: 'ok' });
  } else {
    res.status(401).json({ message: 'Invalid credentials' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
