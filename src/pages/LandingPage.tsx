import { HeroDitheringCard } from "../components/ui/hero-dithering-card";
import { AboutSection } from "../components/ui/about-section";
import { SpacesSection } from "../components/ui/philosophy-section";
import { OfferingsSection } from "../components/ui/offerings-section";
import { ContactSection } from "../components/ui/contact-section";

export function LandingPage() {
  return (
    <>
      <HeroDitheringCard />
      <AboutSection />
      <SpacesSection />
      <OfferingsSection />
      <ContactSection />
    </>
  );
}