import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi } from '@/services/auth';

/**
 * AuthContext — manages global authentication state.
 *
 * Session restoration flow:
 * 1. `isLoading` starts as `true`.
 * 2. `useEffect` triggers `checkAuth()` on initial mount.
 * 3. Sends `GET /api/v1/auth/me` with `credentials: 'include'`.
 * 4. If valid cookie: sets `user` state.
 * 5. If invalid/expired/missing: sets `user` to `null`.
 * 6. Sets `isLoading` to `false`.
 */

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Starts true to check session before rendering routes

  /**
   * Verifies current session via GET /auth/me
   */
  const checkAuth = useCallback(async () => {
    try {
      const response = await authApi.me();
      if (response.success && response.data?.user) {
        setUser(response.data.user);
      } else {
        setUser(null);
      }
    } catch {
      // 401 response means no active/valid session
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  /**
   * Performs login request and sets state on success.
   */
  const login = useCallback(async (credentials) => {
    try {
      const response = await authApi.login(credentials);
      if (response.success && response.data?.user) {
        setUser(response.data.user);
        return { success: true, message: response.message };
      }
      return { success: false, message: response.message || 'Login failed' };
    } catch (err) {
      const errorMessage = err.data?.message || err.message || 'Invalid email or password';
      return { success: false, message: errorMessage };
    }
  }, []);

  /**
   * Clears session server-side and clears user state locally.
   */
  const logout = useCallback(async () => {
    try {
      await authApi.logout();
    } catch {
      // Ignore errors on logout — local state will be reset regardless
    } finally {
      setUser(null);
    }
  }, []);

  const value = {
    user,
    setUser,
    isLoading,
    login,
    logout,
    checkAuth,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used inside <AuthProvider>');
  }
  return context;
};
