import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Vite configuration.
 *
 * Path alias `@` → `src/` enables clean imports:
 *   import { api } from '@/services/api';
 *   instead of: import { api } from '../../services/api';
 *
 * Dev proxy → avoids CORS issues during local development by routing
 * /api requests through Vite's dev server to the backend.
 */
export default defineConfig({
  plugins: [react()],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3001',
        changeOrigin: true,
      },
    },
  },
});
