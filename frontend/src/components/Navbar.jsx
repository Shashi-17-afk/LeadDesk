import { Link } from 'react-router-dom';
import { Layers, ShieldCheck, ArrowRight } from 'lucide-react';
import { APP_NAME } from '@/constants';

const Navbar = () => {
  return (
    <header className="sticky top-0 z-50 backdrop-blur-md bg-gray-950/80 border-b border-gray-800/60 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Brand Logo */}
        <Link to="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-brand-600 to-brand-400 flex items-center justify-center text-white shadow-md shadow-brand-500/20 group-hover:scale-105 transition-transform duration-200">
            <Layers className="w-5 h-5" />
          </div>
          <span className="font-bold text-lg text-white tracking-tight group-hover:text-brand-300 transition-colors">
            {APP_NAME}
          </span>
        </Link>

        {/* Navigation Actions */}
        <div className="flex items-center gap-4">
          <a
            href="#contact"
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors hidden sm:block"
          >
            Submit Lead
          </a>
          <Link
            to="/admin/login"
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-lg text-xs font-semibold text-gray-200 bg-gray-900 border border-gray-800 hover:border-gray-700 hover:bg-gray-800/80 transition-all duration-200"
          >
            <ShieldCheck className="w-4 h-4 text-brand-400" />
            <span>Admin Portal</span>
            <ArrowRight className="w-3.5 h-3.5 text-gray-400" />
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
