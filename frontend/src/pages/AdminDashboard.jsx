/**
 * AdminDashboard — Phase 5
 *
 * Will contain:
 * - Stats summary row (total leads, by status)
 * - Search input (real-time filter)
 * - Status filter tabs (All / New / Contacted / Closed)
 * - Paginated leads table with status badge + status change dropdown
 * - Empty state when no leads match filters
 * - Loading skeleton while fetching
 */
const AdminDashboard = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-center animate-fade-in">
        <h1 className="text-4xl font-bold text-white mb-4">Admin Dashboard</h1>
        <p className="text-gray-400 text-lg">
          Dashboard UI is coming in{' '}
          <span className="text-brand-400 font-semibold">Phase 5</span>.
        </p>
      </div>
    </div>
  );
};

export default AdminDashboard;
