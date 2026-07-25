import { Search, X, RefreshCw, Eye, Filter, ChevronDown } from 'lucide-react';

/**
 * LeadTable — Renders search/filter controls, leads data table, skeleton loading states, and empty states.
 */
const LeadTable = ({
  leads,
  isLoading,
  isError,
  searchQuery,
  onSearchChange,
  statusFilter,
  onStatusFilterChange,
  onUpdateStatus,
  onSelectLead,
  onRefresh,
  updatingLeadId,
}) => {
  const getStatusBadgeStyle = (status) => {
    switch (status) {
      case 'new':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/30';
      case 'contacted':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/30';
      case 'closed':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30';
      default:
        return 'bg-gray-800 text-gray-300 border-gray-700';
    }
  };

  const formatDate = (isoString) => {
    if (!isoString) return 'N/A';
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-gray-900/90 border border-gray-800 rounded-2xl shadow-xl overflow-hidden backdrop-blur-sm">
      {/* ── Control Bar: Search & Status Filter Tabs ── */}
      <div className="p-4 sm:p-6 border-b border-gray-800 flex flex-col md:flex-row md:items-center justify-between gap-4">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-gray-500">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search leads by name or email..."
            className="w-full pl-10 pr-9 py-2.5 bg-gray-950/80 border border-gray-800 rounded-xl text-white text-sm placeholder-gray-500 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 transition-all"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => onSearchChange('')}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-300"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Filter Tabs & Manual Refresh */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          <div className="flex items-center bg-gray-950 p-1 rounded-xl border border-gray-800 text-xs">
            {[
              { id: 'all', label: 'All' },
              { id: 'new', label: 'New' },
              { id: 'contacted', label: 'Contacted' },
              { id: 'closed', label: 'Closed' },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => onStatusFilterChange(tab.id)}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  statusFilter === tab.id
                    ? 'bg-brand-600 text-white shadow-sm'
                    : 'text-gray-400 hover:text-gray-200'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={onRefresh}
            title="Refresh Leads Table"
            className="p-2 rounded-xl bg-gray-950 border border-gray-800 text-gray-400 hover:text-white hover:bg-gray-800 transition-colors"
          >
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin text-brand-400' : ''}`} />
          </button>
        </div>
      </div>

      {/* ── Table State Rendering ── */}
      {isError ? (
        /* Error State */
        <div className="p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-400 flex items-center justify-center mx-auto mb-4">
            <X className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">Failed to Load Leads</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
            There was a problem connecting to the database server. Please check your connection and try again.
          </p>
          <button
            type="button"
            onClick={onRefresh}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-md transition-all"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Connection</span>
          </button>
        </div>
      ) : isLoading ? (
        /* Skeleton Loading State */
        <div className="p-6 space-y-4">
          {[1, 2, 3, 4, 5].map((idx) => (
            <div
              key={idx}
              className="h-16 bg-gray-950/60 rounded-xl border border-gray-800/60 animate-pulse"
            />
          ))}
        </div>
      ) : leads.length === 0 ? (
        /* Empty State */
        <div className="p-12 text-center">
          <div className="w-12 h-12 rounded-2xl bg-gray-950 border border-gray-800 text-gray-500 flex items-center justify-center mx-auto mb-4">
            <Filter className="w-6 h-6" />
          </div>
          <h3 className="text-base font-bold text-white mb-1">No Leads Found</h3>
          <p className="text-xs text-gray-400 max-w-sm mx-auto mb-6">
            {searchQuery || statusFilter !== 'all'
              ? 'No lead records match your current search or filter criteria. Try clearing your filters.'
              : 'No leads have been submitted yet. Submit a test lead from the public website!'}
          </p>
          {(searchQuery || statusFilter !== 'all') && (
            <button
              type="button"
              onClick={() => {
                onSearchChange('');
                onStatusFilterChange('all');
              }}
              className="px-4 py-2 rounded-xl bg-gray-800 hover:bg-gray-700 text-gray-200 text-xs font-semibold transition-all"
            >
              Clear Filters
            </button>
          )}
        </div>
      ) : (
        /* Leads Data Table */
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-800 bg-gray-950/40 text-[11px] font-semibold uppercase tracking-wider text-gray-400">
                <th className="py-3.5 px-4 sm:px-6">Submitter</th>
                <th className="py-3.5 px-4">Budget Range</th>
                <th className="py-3.5 px-4">Brief Preview</th>
                <th className="py-3.5 px-4">Date</th>
                <th className="py-3.5 px-4">Status</th>
                <th className="py-3.5 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-800/60 text-sm">
              {leads.map((lead) => (
                <tr
                  key={lead.id}
                  className="hover:bg-gray-800/40 transition-colors group"
                >
                  {/* Submitter Info */}
                  <td className="py-4 px-4 sm:px-6">
                    <div className="font-semibold text-white group-hover:text-brand-300 transition-colors">
                      {lead.name}
                    </div>
                    <div className="text-xs text-gray-400">{lead.email}</div>
                  </td>

                  {/* Budget */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-xs font-medium bg-gray-950 border border-gray-800 text-gray-300">
                      {lead.budget_range}
                    </span>
                  </td>

                  {/* Brief Preview */}
                  <td className="py-4 px-4 max-w-xs">
                    <p
                      onClick={() => onSelectLead(lead)}
                      className="text-xs text-gray-400 line-clamp-2 cursor-pointer hover:text-gray-200 transition-colors"
                      title="Click to view full message"
                    >
                      {lead.message}
                    </p>
                  </td>

                  {/* Date */}
                  <td className="py-4 px-4 whitespace-nowrap text-xs text-gray-400">
                    {formatDate(lead.created_at)}
                  </td>

                  {/* Status Dropdown */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    <div className="relative inline-block text-left">
                      <select
                        value={lead.status}
                        disabled={updatingLeadId === lead.id}
                        onChange={(e) => onUpdateStatus(lead.id, e.target.value)}
                        className={`pl-3 pr-8 py-1.5 rounded-xl text-xs font-semibold border appearance-none focus:outline-none cursor-pointer transition-all ${getStatusBadgeStyle(
                          lead.status
                        )} ${updatingLeadId === lead.id ? 'opacity-50 cursor-not-allowed' : ''}`}
                      >
                        <option value="new" className="bg-gray-900 text-white">
                          New
                        </option>
                        <option value="contacted" className="bg-gray-900 text-white">
                          Contacted
                        </option>
                        <option value="closed" className="bg-gray-900 text-white">
                          Closed
                        </option>
                      </select>
                      <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none opacity-70" />
                    </div>
                  </td>

                  {/* Actions / View Details */}
                  <td className="py-4 px-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => onSelectLead(lead)}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-medium text-gray-300 bg-gray-950 border border-gray-800 hover:border-gray-700 hover:bg-gray-800 hover:text-white transition-all"
                    >
                      <Eye className="w-3.5 h-3.5 text-brand-400" />
                      <span>Details</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default LeadTable;
