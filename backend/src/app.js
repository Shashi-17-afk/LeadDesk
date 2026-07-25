import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import { env } from './config/env.js';
import { errorHandler } from './middleware/errorHandler.js';
import { notFound } from './middleware/notFound.js';
import v1Router from './routes/index.js';

const app = express();

// ─── Security ──────────────────────────────────────────────────────────────
// helmet sets secure HTTP headers (X-Content-Type-Options, X-Frame-Options, etc.)
app.use(helmet());

// ─── CORS ──────────────────────────────────────────────────────────────────
// credentials: true is required for cross-origin cookie support (HttpOnly JWT)
const cleanFrontendUrl = (env.FRONTEND_URL || 'http://localhost:5173')
  .replace(/[^a-zA-Z0-9:\/.\-_]/g, '')
  .trim();

app.use(
  cors({
    origin: cleanFrontendUrl || 'http://localhost:5173',
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// ─── Parsing ───────────────────────────────────────────────────────────────
app.use(express.json({ limit: '10kb' })); // Limit payload size to prevent DoS
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// ─── Performance ──────────────────────────────────────────────────────────
app.use(compression());

// ─── Logging ───────────────────────────────────────────────────────────────
if (env.NODE_ENV !== 'test') {
  app.use(morgan(env.NODE_ENV === 'production' ? 'combined' : 'dev'));
}

// ─── Health Check ─────────────────────────────────────────────────────────
// Lightweight endpoint for Render health checks and uptime monitors
app.get('/health', (_req, res) => {
  res.status(200).json({
    status: 'healthy',
    environment: env.NODE_ENV,
    timestamp: new Date().toISOString(),
  });
});

// ─── API Routes ───────────────────────────────────────────────────────────
app.use('/api/v1', v1Router);

// ─── Error Handling ───────────────────────────────────────────────────────
// Order matters: 404 catcher before the central error handler
app.use(notFound);
app.use(errorHandler);

export default app;
