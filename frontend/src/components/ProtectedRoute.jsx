import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';

/**
 * ProtectedRoute — guards admin-only routes.
 *
 * Uses React Router's `<Outlet>` pattern: wrap protected routes with this
 * component in the router config rather than wrapping each page individually.
 *
 * Phase 4 enhancement:
 *   On mount, this component will call GET /api/v1/auth/me to restore the
 *   session from the HttpOnly cookie. Until that resolves, it should render
 *   a loading state instead of immediately redirecting (avoiding flash of
 *   login page on page refresh for valid sessions).
 *
 * Current Phase 1 behavior:
 *   Reads local React state only — session is lost on page refresh.
 *   This is acceptable for Phase 1 scaffolding.
 *
 * Usage (in App.jsx):
 *   <Route element={<ProtectedRoute />}>
 *     <Route path="/admin/dashboard" element={<AdminDashboard />} />
 *   </Route>
 */
const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
