import HeroSection from "@/components/Hero";
import AboutSection from "@/components/About";
import CardContent from "@/components/CardContent";
import VideoBanner from "@/components/VideoBanner";


export default function HomePage() {
  return (
    <main>
      <HeroSection />
      <AboutSection />
      <VideoBanner />
      <CardContent />
    </main>
  );
}
