import { HeroSection } from "@/components/HeroSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { CTASection } from "@/components/CTASection";
import { GallerySection } from "@/components/GallarySection";
import { ComparisonTable } from "@/components/ComparisonTable ";

export default function Home() {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <GallerySection />
      <ComparisonTable />
      <TestimonialsSection />
      <CTASection />
    </>
  );
}
