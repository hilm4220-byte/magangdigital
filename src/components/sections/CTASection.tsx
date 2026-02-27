import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Rocket } from "lucide-react";
import { useFooterData } from "@/hooks/useFooterData";

const CTASection = () => {
  const { getCTAWhatsAppLink } = useFooterData();

  const openWhatsApp = () => {
    const link = getCTAWhatsAppLink();
    window.open(link, '_blank');
  };

  return (
    <section id="cta-section" className="py-20 md:py-28 bg-gradient-hero relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute -top-20 -right-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          {/* Icon */}
          <div className="w-20 h-20 rounded-3xl bg-white/20 backdrop-blur-sm mx-auto flex items-center justify-center mb-8">
            <Rocket className="w-10 h-10 text-primary-foreground" />
          </div>

          {/* Headline */}
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-primary-foreground mb-6 leading-tight">
            Belajar Skill Digital Marketing{" "}
            <span className="block">+ Dapat Penghasilan Sejak Magang!</span>
          </h2>

          {/* Subheadline */}
          <p className="text-primary-foreground/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
            Jangan tunggu lulus untuk mulai menghasilkan. 
            Daftar sekarang dan jadilah bagian dari tim kami!
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 px-8 py-6 text-lg font-semibold rounded-xl group"
              onClick={openWhatsApp}
            >
              Daftar Sekarang
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg"
              variant="outline"
              className="border-white/50 text-primary-foreground hover:bg-white/10 px-8 py-6 text-lg font-semibold rounded-xl"
              onClick={openWhatsApp}
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Chat Admin
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-primary-foreground/80">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full" />
              <span className="text-sm">Gratis Pendaftaran</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full" />
              <span className="text-sm">Sertifikat Resmi</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-white rounded-full" />
              <span className="text-sm">Mentor Berpengalaman</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
