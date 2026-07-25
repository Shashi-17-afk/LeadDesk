import { Sparkles, ArrowDown } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative pt-12 pb-16 md:pt-20 md:pb-24 overflow-hidden">
      {/* Subtle Background Glow */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-brand-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 relative z-10">
        {/* Pill Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-300 border border-brand-500/20 mb-6 animate-fade-in">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Next-Gen Sales Pipeline Engine</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white tracking-tight text-balance leading-tight mb-6">
          Capture High-Intent Leads <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-brand-400 via-blue-400 to-indigo-300 bg-clip-text text-transparent">
            Accelerate Growth.
          </span>
        </h1>

        {/* Subhead */}
        <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto text-balance leading-relaxed mb-8">
          LeadDesk Mini gives high-performing sales teams the simplest way to capture, organize, and
          action project leads in real time.
        </p>

        {/* CTA Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <a
            href="#contact"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold text-white bg-brand-600 hover:bg-brand-500 shadow-lg shadow-brand-600/25 hover:shadow-brand-500/35 transition-all duration-200"
          >
            <span>Request a Consultation</span>
            <ArrowDown className="w-4 h-4 animate-bounce" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
