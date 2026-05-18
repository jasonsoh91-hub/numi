import { Navbar } from "@/components/navbar";
import { HeroSection } from "@/components/HeroSection";
import { RelevanceBar } from "@/components/RelevanceBar";
import { ProblemSection } from "@/components/ProblemSection";
import { LeadMagnetSection } from "@/components/LeadMagnetSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { PatternCodesSection } from "@/components/PatternCodesSection";
import { ProductBridgeSection } from "@/components/ProductBridgeSection";
import { BenefitsSection } from "@/components/BenefitsSection";
import { EmailCaptureSection } from "@/components/EmailCaptureSection";
import { ObjectionHandlingSection } from "@/components/ObjectionHandlingSection";
import { FAQSection } from "@/components/FAQSection";
import { FinalCTASection } from "@/components/FinalCTASection";
import { Footer } from "@/components/footer";

export const metadata = {
  title: "The Pattern Code by NUMI — Discover How You Think, Love, Earn & Decide",
  description: "Get your free Pattern Code guide from NUMI. Calculate your Core Number and unlock your first Pattern Insight into how you think, love, earn, decide, and grow.",
  openGraph: {
    title: "Discover Your Pattern Code",
    description: "Find your Core Number and unlock your first NUMI Pattern Insight.",
  },
};

export default function PatternCodePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <RelevanceBar />
        <ProblemSection />
        <LeadMagnetSection />
        <HowItWorksSection />
        <PatternCodesSection />
        <ProductBridgeSection />
        <BenefitsSection />
        <EmailCaptureSection />
        <ObjectionHandlingSection />
        <FAQSection />
        <FinalCTASection />
      </main>
      <Footer />
    </>
  );
}
