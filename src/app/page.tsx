
import HeroSection from '../components/HeroSection';
import TrendingSection from '../components/TrendingSection';
import CategorySection from '../components/CategorySection';
import TopGames from '../components/TopGames';
import FooterCTA from '../components/FooterCTA';
import TestimonialsSection from '../components/TestimonialsSection';
import NewsletterSection from '../components/NewsletterSection';
import BrandsSection from '../components/BrandsSection';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-900">
      <HeroSection />

      <div id="categories">
        <CategorySection />
      </div>

      <div id="trending">
        <TrendingSection />
      </div>

      <div id="top-games">
        <TopGames />
      </div>

  <TestimonialsSection />
  <BrandsSection />
  <FooterCTA />
    </main>
  );
}
