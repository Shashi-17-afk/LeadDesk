import { APP_NAME } from '@/constants';

/**
 * LandingPage — Phase 3
 *
 * Will contain:
 * - Hero section with value proposition
 * - Lead submission form (name, email, budget range, message)
 * - Client-side validation with React Hook Form + Zod
 * - Form submission to POST /api/v1/leads
 * - Success / error states with Sonner toasts
 */
const LandingPage = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center animate-fade-in">
        <h1 className="text-4xl font-bold text-white mb-4">{APP_NAME}</h1>
        <p className="text-gray-400 text-lg">
          Landing page and lead form are coming in{' '}
          <span className="text-brand-400 font-semibold">Phase 3</span>.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
