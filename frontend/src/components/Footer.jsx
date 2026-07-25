import { Layers } from 'lucide-react';
import { APP_NAME } from '@/constants';

/**
 * Global Footer component with Digital Heroes Training Task attribution link.
 */
const Footer = () => {
  return (
    <footer className="border-t border-gray-800/60 bg-gray-950 py-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <div className="w-5 h-5 rounded-md bg-brand-600 flex items-center justify-center text-white">
            <Layers className="w-3 h-3" />
          </div>
          <span className="text-xs font-semibold text-white tracking-tight">{APP_NAME}</span>
        </div>

        <p className="text-xs text-gray-500">
          Built for{' '}
          <a
            href="https://digitalheroesco.com"
            target="_blank"
            rel="noreferrer"
            className="text-gray-400 hover:text-brand-300 underline underline-offset-2 transition-colors"
          >
            Digital Heroes Training Task
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
