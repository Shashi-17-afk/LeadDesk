import { useEffect } from 'react';
import { X, DollarSign, Calendar, Tag } from 'lucide-react';
import { LEAD_STATUS_LABELS } from '@/constants';

/**
 * LeadDetailsModal — Accessible dialog component for viewing full lead details.
 */
const LeadDetailsModal = ({ lead, onClose, onUpdateStatus }) => {
  // Handle Escape key to close modal
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (lead) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lead, onClose]);

  if (!lead) return null;

  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    return new Date(isoString).toLocaleString('en-US', {
      dateStyle: 'medium',
      timeStyle: 'short',
    });
  };

  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'contacted':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'closed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      default:
        return 'bg-gray-800 text-gray-300 border-gray-700';
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm animate-fade-in"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="bg-gray-900 border border-gray-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl relative overflow-hidden">
        {/* Top Header */}
        <div className="flex items-center justify-between pb-4 border-b border-gray-800 mb-5">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-brand-500/10 border border-brand-500/20 flex items-center justify-center text-brand-400 font-bold">
              {lead.name?.charAt(0)?.toUpperCase() || 'L'}
            </div>
            <div>
              <h3 id="modal-title" className="text-lg font-bold text-white tracking-tight">
                {lead.name}
              </h3>
              <p className="text-xs text-gray-400">{lead.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-gray-400 hover:text-white hover:bg-gray-800 transition-colors focus:ring-2 focus:ring-brand-500"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Lead Metadata Grid */}
        <div className="grid grid-cols-2 gap-4 mb-6 bg-gray-950/60 p-4 rounded-xl border border-gray-800/80">
          <div className="flex items-center gap-2 text-xs">
            <DollarSign className="w-4 h-4 text-brand-400" />
            <span className="text-gray-400">Budget:</span>
            <span className="font-semibold text-white">{lead.budget_range}</span>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <Calendar className="w-4 h-4 text-brand-400" />
            <span className="text-gray-400">Date:</span>
            <span className="font-medium text-gray-300">{formatDate(lead.created_at)}</span>
          </div>

          <div className="flex items-center gap-2 text-xs col-span-2">
            <Tag className="w-4 h-4 text-brand-400" />
            <span className="text-gray-400">Status:</span>
            <span
              className={`px-2.5 py-0.5 rounded-full text-xs font-semibold border ${getStatusBadgeStyle(
                lead.status
              )}`}
            >
              {LEAD_STATUS_LABELS[lead.status] || lead.status}
            </span>
          </div>
        </div>

        {/* Full Message Body */}
        <div className="mb-6">
          <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
            Full Project Message
          </label>
          <div className="p-4 rounded-xl bg-gray-950 border border-gray-800 text-sm text-gray-200 leading-relaxed whitespace-pre-wrap max-h-60 overflow-y-auto">
            {lead.message}
          </div>
        </div>

        {/* Quick Status Change Buttons in Modal */}
        <div className="pt-4 border-t border-gray-800 flex items-center justify-between gap-3">
          <span className="text-xs font-medium text-gray-400">Update Status:</span>

          <div className="flex items-center gap-2">
            {['new', 'contacted', 'closed'].map((st) => (
              <button
                key={st}
                type="button"
                onClick={() => {
                  onUpdateStatus(lead.id, st);
                  onClose();
                }}
                disabled={lead.status === st}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  lead.status === st
                    ? 'bg-gray-800 text-gray-500 cursor-not-allowed border border-gray-700'
                    : 'bg-gray-950 text-gray-300 border border-gray-800 hover:border-brand-500 hover:text-white'
                }`}
              >
                {LEAD_STATUS_LABELS[st]}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetailsModal;
