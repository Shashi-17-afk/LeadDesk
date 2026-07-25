/**
 * Application constants.
 *
 * Centralizing magic strings and configuration values here means a single
 * place to update when things change (e.g., API URL in deployment).
 */

// Backend API base — VITE_ prefix makes it available at build time via import.meta.env
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
export const API_V1 = `${API_BASE_URL}/api/v1`;

// Lead form options — kept in sync with backend leadsValidators.js
export const BUDGET_RANGES = ['< $1,000', '$1,000–$5,000', '$5,000–$20,000', '$20,000+'];

export const LEAD_STATUSES = {
  NEW: 'new',
  CONTACTED: 'contacted',
  CLOSED: 'closed',
};

export const LEAD_STATUS_LABELS = {
  new: 'New',
  contacted: 'Contacted',
  closed: 'Closed',
};

// JWT cookie name — must match the cookie set by the backend
export const AUTH_COOKIE_NAME = 'token';

// App metadata
export const APP_NAME = 'LeadDesk Mini';
export const APP_DESCRIPTION = 'Smart lead management for modern sales teams.';
