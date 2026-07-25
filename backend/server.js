/**
 * Application entry point.
 *
 * Responsibilities:
 * - Load environment variables (must happen before any other import)
 * - Import the Express application
 * - Start the HTTP server
 *
 * Deliberately kept thin. No business logic here.
 */
import 'dotenv/config';
import app from './src/app.js';
import { env } from './src/config/env.js';

const PORT = env.PORT;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server running → http://localhost:${PORT}`);
  console.log(`📊 Environment   → ${env.NODE_ENV}`);
  console.log(`🌐 CORS origin   → ${env.FRONTEND_URL}`);
});

// Graceful shutdown — close connections before process exits
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('\nSIGINT received. Shutting down gracefully...');
  server.close(() => {
    console.log('Server closed.');
    process.exit(0);
  });
});
