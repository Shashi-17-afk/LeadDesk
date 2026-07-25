/**
 * AdminLogin — Phase 4
 *
 * Will contain:
 * - Centered login card with email + password fields
 * - React Hook Form + Zod validation
 * - POST /api/v1/auth/login → sets HttpOnly JWT cookie
 * - Redirect to /admin/dashboard on success
 * - Error state for invalid credentials
 */
const AdminLogin = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center animate-fade-in">
        <h1 className="text-4xl font-bold text-white mb-4">Admin Login</h1>
        <p className="text-gray-400 text-lg">
          Authentication UI is coming in{' '}
          <span className="text-brand-400 font-semibold">Phase 4</span>.
        </p>
      </div>
    </div>
  );
};

export default AdminLogin;
