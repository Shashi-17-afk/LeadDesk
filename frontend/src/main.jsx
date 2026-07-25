import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

/**
 * Application entry point.
 *
 * StrictMode is intentionally kept in development to surface:
 * - Deprecated API usage
 * - Effects that run twice (helps catch side-effect bugs)
 * - Unexpected component behavior
 *
 * It has no effect in production builds.
 */
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
);
