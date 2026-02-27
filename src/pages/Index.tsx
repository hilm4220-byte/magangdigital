import HeroSection from "@/components/sections/HeroSection";
import ProblemSection from "@/components/sections/ProblemSection";
import SolutionSection from "@/components/sections/SolutionSection";
import CurriculumSection from "@/components/sections/CurriculumSection";
import CommissionSection from "@/components/sections/CommissionSection";
import BenefitsSection from "@/components/sections/BenefitsSection";
import EligibilitySection from "@/components/sections/EligibilitySection";
import ProcessSection from "@/components/sections/ProcessSection";
import TestimonialSection from "@/components/sections/TestimonialSection";
import FAQSection from "@/components/sections/FAQSection";
import CTASection from "@/components/sections/CTASection";
import FooterSection from "@/components/sections/FooterSection";

const Index = () => {
  return (
    <main className="overflow-hidden">
      <HeroSection />
      <ProblemSection />
      <SolutionSection />
      <CurriculumSection />
      <CommissionSection />
      <BenefitsSection />
      <EligibilitySection />
      <ProcessSection />
      <TestimonialSection />
      <FAQSection />
      <CTASection />
      <FooterSection />
    </main>
  );
};

export default Index;
