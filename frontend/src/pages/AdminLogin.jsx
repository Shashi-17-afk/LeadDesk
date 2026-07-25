import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { toast } from 'sonner';
import { ShieldCheck, Mail, Lock, Eye, EyeOff, ArrowRight, Loader2, Layers } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';
import { APP_NAME } from '@/constants';

/**
 * Admin Login Zod Schema
 */
const loginSchema = z.object({
  email: z
    .string()
    .trim()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(1, 'Password is required'),
});

const AdminLogin = () => {
  const navigate = useNavigate();
  const { login, isAuthenticated, isLoading: authLoading } = useAuth();
  const [showPassword, setShowPassword] = useState(false);

  // If already authenticated, redirect directly to dashboard
  useEffect(() => {
    if (!authLoading && isAuthenticated) {
      navigate('/admin/dashboard', { replace: true });
    }
  }, [isAuthenticated, authLoading, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data) => {
    const result = await login(data);

    if (result.success) {
      toast.success('Welcome Back!', {
        description: 'Successfully authenticated as administrator.',
      });
      navigate('/admin/dashboard', { replace: true });
    } else {
      toast.error('Authentication Failed', {
        description: result.message || 'Invalid email or password.',
      });
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-6 h-6 animate-spin text-brand-400" />
        <span className="text-sm text-gray-400">Loading session...</span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex flex-col justify-center py-12 sm:px-6 lg:px-8 relative overflow-hidden selection:bg-brand-500 selection:text-white">
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-600/10 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header Link */}
      <div className="sm:mx-auto sm:w-full sm:max-w-md mb-6 text-center">
        <Link to="/" className="inline-flex items-center gap-2 group mb-4">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-lg shadow-brand-500/20 group-hover:scale-105 transition-transform">
            <Layers className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl text-white tracking-tight">{APP_NAME}</span>
        </Link>

        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-gray-900 text-brand-400 border border-gray-800">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Restricted Admin Portal</span>
        </div>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-gray-900/90 border border-gray-800 py-8 px-4 shadow-2xl backdrop-blur-sm sm:rounded-2xl sm:px-10 relative">
          <div className="mb-6 text-center sm:text-left">
            <h2 className="text-xl font-bold text-white tracking-tight mb-1">
              Admin Authentication
            </h2>
            <p className="text-xs text-gray-400">
              Sign in with your credentials to access lead analytics & pipeline.
            </p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Admin Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  disabled={isSubmitting}
                  placeholder="admin@leaddesk.com"
                  className={`w-full pl-9 pr-4 py-2.5 bg-gray-950/80 border rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none transition-all ${
                    errors.email
                      ? 'border-red-500/80 focus:ring-2 focus:ring-red-500/30'
                      : 'border-gray-800 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'
                  } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                  {...register('email')}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-xs text-red-400">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-xs font-semibold text-gray-300 uppercase tracking-wider mb-1.5">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  disabled={isSubmitting}
                  placeholder="••••••••••••"
                  className={`w-full pl-9 pr-10 py-2.5 bg-gray-950/80 border rounded-xl text-white text-sm placeholder-gray-600 focus:outline-none transition-all ${
                    errors.password
                      ? 'border-red-500/80 focus:ring-2 focus:ring-red-500/30'
                      : 'border-gray-800 focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20'
                  } ${isSubmitting ? 'opacity-60 cursor-not-allowed' : ''}`}
                  {...register('password')}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && (
                <p className="mt-1 text-xs text-red-400">{errors.password.message}</p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-brand-500 hover:from-brand-500 hover:to-brand-400 shadow-md shadow-brand-600/20 transition-all duration-200 ${
                isSubmitting ? 'opacity-70 cursor-not-allowed' : 'active:scale-[0.99]'
              }`}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Authenticating...</span>
                </>
              ) : (
                <>
                  <span>Sign In to Dashboard</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        <div className="mt-6 text-center">
          <Link to="/" className="text-xs text-gray-500 hover:text-gray-300 transition-colors">
            ← Back to Public Website
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
