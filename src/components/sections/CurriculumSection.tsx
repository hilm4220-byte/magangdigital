import { BarChart3, Brain, FileText, Layers, MessageSquare, Smartphone, Target, Users } from "lucide-react";

const curriculum = [
  {
    icon: Brain,
    title: "Digital Marketing Fundamental",
    description: "Dasar-dasar digital marketing, strategi, dan ekosistem online.",
  },
  {
    icon: Smartphone,
    title: "Content Marketing",
    description: "Instagram, TikTok, Reels - buat konten yang viral dan convert.",
  },
  {
    icon: FileText,
    title: "Copywriting & Closing",
    description: "Teknik menulis yang menjual dan skill closing yang efektif.",
  },
  {
    icon: MessageSquare,
    title: "WhatsApp Marketing",
    description: "Strategi broadcast, follow-up, dan closing via WhatsApp.",
  },
  {
    icon: BarChart3,
    title: "Ads Dasar (Meta/TikTok)",
    description: "Belajar beriklan di Facebook, Instagram, dan TikTok Ads.",
  },
  {
    icon: Users,
    title: "Personal Branding",
    description: "Bangun personal brand yang kuat untuk karir jangka panjang.",
  },
  {
    icon: Layers,
    title: "Funnel & Leads",
    description: "Buat sales funnel dan sistem lead generation yang efektif.",
  },
  {
    icon: Target,
    title: "Studi Kasus Real Project",
    description: "Praktik langsung dengan project nyata dan dapatkan komisi.",
  },
];

const CurriculumSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Kurikulum Lengkap</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            Apa yang Akan{" "}
            <span className="text-gradient-hero">Kamu Pelajari?</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            8 skill digital marketing yang paling dibutuhkan di industri saat ini.
            Semua dipelajari dengan praktik langsung!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {curriculum.map((item, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
            >
              <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <item.icon className="w-7 h-7 text-primary" />
              </div>
              <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
              <p className="text-muted-foreground text-sm">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CurriculumSection;
