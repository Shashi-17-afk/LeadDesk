/**
 * MainLayout — Public-facing page wrapper.
 * Phase 3 will add the actual header with navigation and branding.
 */
const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col">
      <main className="flex-1">{children}</main>
    </div>
  );
};

export default MainLayout;
