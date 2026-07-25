/**
 * AdminLayout — Authenticated admin page wrapper.
 * Phase 5 will add the sidebar navigation with logo, nav links, and logout button.
 */
const AdminLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-950 flex">
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
};

export default AdminLayout;
