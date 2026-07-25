import { createContext, useContext, useState, useCallback } from 'react';
import { api } from '@/services/api';

/**
 * AuthContext — manages authentication state for the entire application.
 *
 * Why Context (not Redux/Zustand)?
 * Auth state is app-global but not deeply complex. React Context is the
 * appropriate built-in solution. External state managers would add dependency
 * weight without meaningful benefit at this scale.
 *
 * Why not localStorage for the token?
 * The JWT lives in an HttpOnly cookie set by the server. This component
 * never reads or writes the token directly — the browser handles it
 * transparently on every API request via `credentials: 'include'`.
 *
 * The `user` state here holds the decoded user object returned from the
 * server after successful login or session restoration (/auth/me).
 */

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Logs in an admin by sending credentials to the backend.
   * On success, the server sets an HttpOnly JWT cookie and returns the user object.
   * Phase 4 also adds session restoration on app mount (GET /auth/me).
   */
  const login = useCallback(async (credentials) => {
    setIsLoading(true);
    try {
      const { data } = await api.post('/auth/login', credentials);
      setUser(data.user);
      return { success: true };
    } catch (err) {
      return { success: false, message: err.message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Clears the JWT cookie server-side and resets local user state.
   */
  const logout = useCallback(async () => {
    try {
      await api.post('/auth/logout');
    } finally {
      // Always clear local state, even if the server request fails
      setUser(null);
    }
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    login,
    logout,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to consume AuthContext.
 * Throws a descriptive error if used outside the provider.
 */
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>. Check your component tree.');
  }
  return context;
};
