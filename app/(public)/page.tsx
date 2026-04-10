import { FeaturesSection } from "@/components/landing/features-section";
import { HeroSection } from "@/components/landing/hero-section";
import { HowItWorksSection } from "@/components/landing/how-it-works-section";
import { ProblemsSection } from "@/components/landing/problems-section";
import { TestimonialsSection } from "@/components/landing/testimonials-section";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

export default function HomePage() {
  return (
    <main>
      <SiteHeader />
      <HeroSection />
      <ProblemsSection />
      <HowItWorksSection />
      <FeaturesSection />
      <TestimonialsSection />
      <SiteFooter />
    </main>
  );
}
