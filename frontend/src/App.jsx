import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import LandingPage from '@/pages/LandingPage';
import AdminLogin from '@/pages/AdminLogin';
import AdminDashboard from '@/pages/AdminDashboard';

/**
 * App — root component.
 *
 * Rendering order:
 *   BrowserRouter (routing)
 *   └── AuthProvider (global auth state)
 *       └── Toaster (global notification system)
 *       └── Routes
 *
 * AuthProvider must sit inside BrowserRouter so it can use useNavigate
 * in Phase 4 for programmatic redirects after login.
 */
const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        {/* Sonner toast notifications — rendered at root level so any component can trigger */}
        <Toaster
          position="top-right"
          richColors
          closeButton
          toastOptions={{
            duration: 4000,
          }}
        />

        <Routes>
          {/* ─── Public Routes ──────────────────────────────────────── */}
          <Route path="/" element={<LandingPage />} />

          {/* ─── Admin Auth ─────────────────────────────────────────── */}
          <Route path="/admin/login" element={<AdminLogin />} />

          {/* ─── Protected Admin Routes ─────────────────────────────── */}
          <Route element={<ProtectedRoute />}>
            <Route path="/admin/dashboard" element={<AdminDashboard />} />
          </Route>

          {/* ─── Catch-all ──────────────────────────────────────────── */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
