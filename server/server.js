// server/server.js
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import authRouter from './routes/auth.js';
import commentsRouter from './routes/comments.js';

// .env 読み込み
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// 環境変数
const MONGO_URI = process.env.MONGO_URI;
const PORT = process.env.PORT || 3000;

// ルート登録（ここが大事）
app.use('/api/auth', authRouter); // /api/auth/register, /api/auth/login
app.use('/api/comments', commentsRouter); // /api/comments/...

// DB 接続 → 成功したらサーバー起動
mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });
