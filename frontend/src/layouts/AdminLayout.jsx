import { useNavigate, Link } from 'react-router-dom';
import { Layers, LogOut, ExternalLink, ShieldCheck, UserCheck } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { APP_NAME } from '@/constants';
import { toast } from 'sonner';

/**
 * AdminLayout — Wrapper for authenticated admin pages.
 * Features a top navigation header with user profile badge and logout button.
 */
const AdminLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    toast.success('Logged Out', {
      description: 'You have been safely logged out.',
    });
    navigate('/admin/login', { replace: true });
  };

  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col selection:bg-brand-500 selection:text-white">
      {/* Admin Top Header */}
      <header className="sticky top-0 z-40 bg-gray-900/90 border-b border-gray-800 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          {/* Brand */}
          <div className="flex items-center gap-3">
            <Link to="/admin/dashboard" className="flex items-center gap-2.5 group">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform">
                <Layers className="w-4 h-4" />
              </div>
              <span className="font-bold text-base text-white tracking-tight group-hover:text-brand-300 transition-colors">
                {APP_NAME}
              </span>
            </Link>

            <span className="text-gray-700">|</span>

            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium bg-brand-500/10 text-brand-400 border border-brand-500/20">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>CRM Dashboard</span>
            </div>
          </div>

          {/* Right Header Navigation & Actions */}
          <div className="flex items-center gap-3 sm:gap-5">
            {/* View Public Site link */}
            <Link
              to="/"
              target="_blank"
              rel="noreferrer"
              className="text-xs font-medium text-gray-400 hover:text-white flex items-center gap-1 transition-colors hidden sm:flex"
            >
              <span>Public Landing Page</span>
              <ExternalLink className="w-3 h-3" />
            </Link>

            {/* Admin User Badge */}
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-gray-950 border border-gray-800">
              <div className="w-6 h-6 rounded-full bg-brand-600/30 text-brand-400 flex items-center justify-center text-xs font-bold">
                <UserCheck className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs font-medium text-gray-300 max-w-[140px] sm:max-w-[200px] truncate">
                {user?.email || 'admin@leaddesk.com'}
              </span>
            </div>

            {/* Logout Button */}
            <button
              type="button"
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold text-red-400 bg-red-500/10 border border-red-500/20 hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-200"
              title="Sign out of admin session"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
