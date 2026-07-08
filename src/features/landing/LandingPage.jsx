import { Header } from './Header';
import { HeroSection } from './HeroSection';
import { ServicesSection } from './ServicesSection';
import { FeaturesSection } from './FeaturesSection';
import { EarnSection } from './EarnSection';
import { Footer } from './Footer';

export function LandingPage() {
  return (
    <div className="min-h-screen bg-primary flex flex-col font-sans">
      <Header />
      <main className="flex-grow">
        <HeroSection />
        <ServicesSection />
        <FeaturesSection />
        <EarnSection />
      </main>
      <Footer />
    </div>
  );
}
