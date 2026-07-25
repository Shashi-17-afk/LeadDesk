import Footer from '@/components/Footer';

/**
 * MainLayout — Public-facing page wrapper.
 * Renders global page content and Footer across public pages.
 */
const MainLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-gray-950 flex flex-col selection:bg-brand-500 selection:text-white">
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  );
};

export default MainLayout;
