import { useState, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import AdminLayout from '@/layouts/AdminLayout';
import AdminStats from '@/components/AdminStats';
import LeadTable from '@/components/LeadTable';
import LeadDetailsModal from '@/components/LeadDetailsModal';
import { leadsApi } from '@/services/leads';

const AdminDashboard = () => {
  const [leads, setLeads] = useState([]);
  const [stats, setStats] = useState({ total: 0, new: 0, contacted: 0, closed: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  // Filters state
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  // Selected lead for modal preview
  const [selectedLead, setSelectedLead] = useState(null);
  const [updatingLeadId, setUpdatingLeadId] = useState(null);

  /**
   * Fetches leads and stats from GET /api/v1/leads
   */
  const fetchLeads = useCallback(async (search = searchQuery, status = statusFilter) => {
    setIsLoading(true);
    setIsError(false);
    try {
      const response = await leadsApi.getAll({ search, status });
      if (response.success && response.data) {
        setLeads(response.data.leads || []);
        setStats(response.data.stats || { total: 0, new: 0, contacted: 0, closed: 0 });
      }
    } catch (err) {
      setIsError(true);
      toast.error('Failed to Load Dashboard', {
        description: err.data?.message || err.message || 'Could not connect to backend server.',
      });
    } finally {
      setIsLoading(false);
    }
  }, [searchQuery, statusFilter]);

  // Initial fetch on mount
  useEffect(() => {
    fetchLeads(searchQuery, statusFilter);
  }, [searchQuery, statusFilter, fetchLeads]);

  /**
   * Handles updating lead CRM status via PATCH /api/v1/leads/:id/status
   */
  const handleUpdateStatus = async (leadId, newStatus) => {
    setUpdatingLeadId(leadId);
    try {
      const response = await leadsApi.updateStatus(leadId, newStatus);
      if (response.success) {
        toast.success('Status Updated', {
          description: `Lead status changed to "${newStatus.toUpperCase()}".`,
        });

        // Optimistically update local state for immediate responsiveness
        setLeads((prev) =>
          prev.map((l) => (l.id === leadId ? { ...l, status: newStatus } : l))
        );

        // Refresh statistics summary counters
        fetchLeads(searchQuery, statusFilter);
      }
    } catch (err) {
      toast.error('Update Failed', {
        description: err.data?.message || err.message || 'Could not update lead status.',
      });
    } finally {
      setUpdatingLeadId(null);
    }
  };

  return (
    <AdminLayout>
      {/* ── Page Header Title ── */}
      <div className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight mb-1">
          Lead Operations & Pipeline
        </h1>
        <p className="text-xs sm:text-sm text-gray-400">
          Track inbound project inquiries, review client budgets, and manage lead workflow stages.
        </p>
      </div>

      {/* ── Pipeline Statistics Row ── */}
      <AdminStats
        stats={stats}
        activeStatus={statusFilter}
        onSelectStatus={(status) => setStatusFilter(status)}
      />

      {/* ── Leads Data Table & Filters ── */}
      <LeadTable
        leads={leads}
        isLoading={isLoading}
        isError={isError}
        searchQuery={searchQuery}
        onSearchChange={(q) => setSearchQuery(q)}
        statusFilter={statusFilter}
        onStatusFilterChange={(st) => setStatusFilter(st)}
        onUpdateStatus={handleUpdateStatus}
        onSelectLead={(lead) => setSelectedLead(lead)}
        onRefresh={() => fetchLeads(searchQuery, statusFilter)}
        updatingLeadId={updatingLeadId}
      />

      {/* ── Full Details Modal ── */}
      <LeadDetailsModal
        lead={selectedLead}
        onClose={() => setSelectedLead(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    </AdminLayout>
  );
};

export default AdminDashboard;
