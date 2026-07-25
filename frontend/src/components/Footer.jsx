import { Layers } from 'lucide-react';
import { APP_NAME } from '@/constants';

const Footer = () => {
  return (
    <footer className="border-t border-gray-800/60 bg-gray-950 py-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-brand-600 flex items-center justify-center text-white">
            <Layers className="w-3.5 h-3.5" />
          </div>
          <span className="text-sm font-semibold text-white tracking-tight">{APP_NAME}</span>
        </div>
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Digital Heroes Qualification Task. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
