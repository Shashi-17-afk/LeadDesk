import { Navigate, Outlet } from 'react-router-dom';
import { Loader2, Shield } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

/**
 * ProtectedRoute — guards admin-only routes.
 *
 * Anti-flash design:
 * While `isLoading` is true (checking session via GET /auth/me), it renders a dark
 * full-screen loading state instead of instantly redirecting to /admin/login.
 * Redirect only occurs if `isLoading === false` AND `isAuthenticated === false`.
 */
const ProtectedRoute = () => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400">
          <Shield className="w-6 h-6 animate-pulse" />
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400 font-medium">
          <Loader2 className="w-4 h-4 animate-spin text-brand-400" />
          <span>Verifying admin session...</span>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
