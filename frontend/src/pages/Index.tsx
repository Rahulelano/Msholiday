import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PopularPackages from "@/components/PopularPackages";
import StatsSection from "@/components/StatsSection";
import StressFreeSection from "@/components/StressFreeSection";
import AboutSection from "@/components/AboutSection";
import GroupDepartures from "@/components/GroupDepartures";
import TrendingTours from "@/components/TrendingTours";
import GallerySection from "@/components/GallerySection";
import Testimonials from "@/components/Testimonials";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <PopularPackages />
        <StatsSection />
        <StressFreeSection />
        <AboutSection />
        <GroupDepartures />
        <TrendingTours />
        <GallerySection />
        <Testimonials />
        <ContactSection />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
};

export default Index;
