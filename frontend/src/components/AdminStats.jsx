import { Inbox, Sparkles, PhoneCall, CheckCircle2 } from 'lucide-react';

/**
 * AdminStats — Renders the summary stats row for the CRM pipeline.
 */
const AdminStats = ({ stats, activeStatus, onSelectStatus }) => {
  const cards = [
    {
      id: 'all',
      label: 'Total Leads',
      count: stats?.total || 0,
      icon: Inbox,
      color: 'text-gray-300',
      bg: 'bg-gray-900/80 border-gray-800',
      activeBorder: 'ring-2 ring-brand-500/50 border-brand-500',
    },
    {
      id: 'new',
      label: 'New Submissions',
      count: stats?.new || 0,
      icon: Sparkles,
      color: 'text-blue-400',
      bg: 'bg-blue-950/20 border-blue-900/50',
      activeBorder: 'ring-2 ring-blue-500/50 border-blue-500',
    },
    {
      id: 'contacted',
      label: 'Contacted Leads',
      count: stats?.contacted || 0,
      icon: PhoneCall,
      color: 'text-amber-400',
      bg: 'bg-amber-950/20 border-amber-900/50',
      activeBorder: 'ring-2 ring-amber-500/50 border-amber-500',
    },
    {
      id: 'closed',
      label: 'Closed / Converted',
      count: stats?.closed || 0,
      icon: CheckCircle2,
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/20 border-emerald-900/50',
      activeBorder: 'ring-2 ring-emerald-500/50 border-emerald-500',
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {cards.map((card) => {
        const Icon = card.icon;
        const isActive = activeStatus === card.id;

        return (
          <button
            key={card.id}
            type="button"
            onClick={() => onSelectStatus(card.id)}
            className={`p-4 sm:p-5 rounded-2xl border text-left transition-all duration-200 cursor-pointer ${card.bg} ${
              isActive ? card.activeBorder : 'hover:border-gray-700'
            }`}
          >
            <div className="flex items-center justify-between mb-3">
              <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                {card.label}
              </span>
              <div className={`p-2 rounded-xl bg-gray-950/60 ${card.color}`}>
                <Icon className="w-4 h-4" />
              </div>
            </div>
            <div className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              {card.count}
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default AdminStats;
