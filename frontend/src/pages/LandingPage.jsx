import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import FeaturesSection from '@/components/FeaturesSection';
import LeadForm from '@/components/LeadForm';
import Footer from '@/components/Footer';

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-gray-950 text-gray-100 flex flex-col selection:bg-brand-500 selection:text-white">
      <Navbar />
      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <LeadForm />
      </main>
      <Footer />
    </div>
  );
};

export default LandingPage;
