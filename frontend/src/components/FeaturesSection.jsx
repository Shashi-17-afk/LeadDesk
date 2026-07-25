import { Zap, ShieldCheck, BarChart3, Clock } from 'lucide-react';

const FEATURES = [
  {
    icon: Zap,
    title: 'Instant Capture',
    description: 'Submissions are validated client & server side and persisted directly into your CRM database.',
  },
  {
    icon: ShieldCheck,
    title: 'Production-Grade Security',
    description: 'HttpOnly JWT cookie protection, rate-limited public APIs, and sanitizing Zod validation.',
  },
  {
    icon: BarChart3,
    title: 'Pipeline Management',
    description: 'Categorize leads into New, Contacted, and Closed workflow stages seamlessly.',
  },
  {
    icon: Clock,
    title: 'Real-Time Insights',
    description: 'Zero latency updates and fast filtering for sales operators and team leads.',
  },
];

const FeaturesSection = () => {
  return (
    <section className="py-12 md:py-16 border-y border-gray-800/50 bg-gray-900/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                className="p-6 rounded-2xl bg-gray-900/80 border border-gray-800/80 hover:border-gray-700 hover:bg-gray-900 transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 mb-4 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="text-base font-semibold text-white mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-400 leading-relaxed">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
