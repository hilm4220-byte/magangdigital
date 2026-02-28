import { Button } from "@/components/ui/button";
import { ArrowRight, MessageCircle, Sparkles, TrendingUp, Users } from "lucide-react";
import { useFooterData } from "@/hooks/useFooterData";

const HeroSection = () => {
  const { getHeroWhatsAppLink, getHeroProgramTitle } = useFooterData();

  const scrollToForm = () => {
    document.getElementById('cta-section')?.scrollIntoView({ behavior: 'smooth' });
  };

  const openWhatsApp = () => {
    const link = getHeroWhatsAppLink();
    window.open(link, '_blank');
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-dark">
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      </div>

      {/* Floating badges */}
      <div className="absolute top-20 left-10 md:left-20 bg-card/10 backdrop-blur-md border border-primary/20 rounded-2xl px-4 py-3 animate-float hidden md:flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-primary" />
        <span className="text-primary-foreground text-sm font-medium">Real Project</span>
      </div>
      <div className="absolute top-40 right-10 md:right-20 bg-card/10 backdrop-blur-md border border-accent/20 rounded-2xl px-4 py-3 animate-float hidden md:flex items-center gap-2" style={{ animationDelay: '1s' }}>
        <Sparkles className="w-5 h-5 text-accent" />
        <span className="text-primary-foreground text-sm font-medium">Dapat Komisi</span>
      </div>
      <div className="absolute bottom-40 left-20 bg-card/10 backdrop-blur-md border border-success/20 rounded-2xl px-4 py-3 animate-float hidden md:flex items-center gap-2" style={{ animationDelay: '2s' }}>
        <Users className="w-5 h-5 text-success" />
        <span className="text-primary-foreground text-sm font-medium">Mentor Expert</span>
      </div>

      <div className="container relative z-10 py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-primary/20 border border-primary/30 rounded-full px-4 py-2 mb-8">
            <span className="w-2 h-2 bg-primary rounded-full animate-pulse" />
            <span className="text-primary-foreground text-sm font-medium">{getHeroProgramTitle()}</span>
          </div>

          {/* Main headline */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-primary-foreground leading-tight mb-6">
            Magang Digital Marketing{" "}
            <span className="text-gradient-hero">+ Dapat Komisi</span>{" "}
            dari Setiap Closing!
          </h1>

          {/* Subheadline */}
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
            Belajar digital marketing langsung praktik, dibimbing mentor berpengalaman, 
            dan dapat <span className="text-accent font-semibold">penghasilan nyata</span> dari hasil kerjamu. 
            Cocok untuk siswa SMK, mahasiswa, dan fresh graduate!
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="bg-gradient-hero hover:opacity-90 text-primary-foreground shadow-glow px-8 py-6 text-lg font-semibold rounded-xl group"
              onClick={scrollToForm}
            >
              Daftar Magang Sekarang
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-primary/50 text-primary-foreground hover:bg-primary/10 px-8 py-6 text-lg font-semibold rounded-xl"
              onClick={openWhatsApp}
            >
              <MessageCircle className="mr-2 w-5 h-5" />
              Chat WhatsApp
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-16 max-w-lg mx-auto">
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-gradient-hero">500+</p>
              <p className="text-muted-foreground text-sm mt-1">Alumni Magang</p>
            </div>
            <div className="text-center border-x border-muted/20">
              <p className="text-3xl md:text-4xl font-bold text-gradient-gold">8</p>
              <p className="text-muted-foreground text-sm mt-1">Skill Dipelajari</p>
            </div>
            <div className="text-center">
              <p className="text-3xl md:text-4xl font-bold text-primary-foreground">100%</p>
              <p className="text-muted-foreground text-sm mt-1">Praktik Nyata</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
        <span className="text-muted-foreground text-sm">Scroll untuk lihat lebih</span>
        <div className="w-6 h-10 border-2 border-muted/30 rounded-full flex justify-center pt-2">
          <div className="w-1.5 h-3 bg-primary rounded-full animate-bounce" />
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
