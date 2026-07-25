import { API_V1 } from '@/constants';

/**
 * Thin fetch wrapper — the only place in the app that constructs fetch calls.
 *
 * Design decisions:
 * - `credentials: 'include'` on every request → sends HttpOnly JWT cookie automatically.
 *   Without this, cross-origin requests would not attach cookies.
 * - Throws a structured error object with `status` and `data` attached, so callers
 *   can check `err.status === 401` to detect auth failures.
 * - Always parses response as JSON — all our endpoints return JSON.
 *
 * @param {string} endpoint - Path after /api/v1, e.g. '/auth/login'
 * @param {RequestInit} options - Standard fetch options
 */
const request = async (endpoint, options = {}) => {
  const url = `${API_V1}${endpoint}`;

  const config = {
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      ...options.headers,
    },
    ...options,
  };

  const response = await fetch(url, config);
  const data = await response.json();

  if (!response.ok) {
    const error = new Error(data.message || 'An unexpected error occurred.');
    error.status = response.status;
    error.data = data;
    throw error;
  }

  return data;
};

/**
 * API client with HTTP verb methods.
 * Each method returns the parsed JSON response.
 */
export const api = {
  get: (endpoint, options) => request(endpoint, { method: 'GET', ...options }),

  post: (endpoint, body, options) =>
    request(endpoint, {
      method: 'POST',
      body: JSON.stringify(body),
      ...options,
    }),

  patch: (endpoint, body, options) =>
    request(endpoint, {
      method: 'PATCH',
      body: JSON.stringify(body),
      ...options,
    }),

  delete: (endpoint, options) => request(endpoint, { method: 'DELETE', ...options }),
};
