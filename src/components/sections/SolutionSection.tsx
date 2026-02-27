import { CheckCircle2, Megaphone, Target, Wallet, Zap } from "lucide-react";

const features = [
  {
    icon: Zap,
    title: "Magang Berbasis Praktik Nyata",
    description: "Langsung terjun ke project digital marketing yang real, bukan simulasi.",
  },
  {
    icon: Megaphone,
    title: "Fokus Digital Marketing Lengkap",
    description: "Content, Ads, Copywriting, Closing, Branding - semua dipelajari.",
  },
  {
    icon: Wallet,
    title: "Sistem Komisi dari Closing",
    description: "Setiap closing yang kamu hasilkan, kamu dapat komisi langsung.",
  },
  {
    icon: Target,
    title: "Cocok untuk PKL & Magang Kampus",
    description: "Bisa diakui sebagai PKL sekolah atau magang kampus resmi.",
  },
];

const SolutionSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left content */}
          <div>
            <span className="text-primary font-semibold text-sm uppercase tracking-wider">Solusi Kami</span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
              Program Magang yang{" "}
              <span className="text-gradient-hero">Berbeda & Menguntungkan</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
              Kami hadir dengan konsep magang yang revolusioner. Bukan hanya belajar, 
              tapi juga <strong className="text-foreground">menghasilkan uang</strong> dari skill yang kamu kuasai!
            </p>

            <div className="space-y-4">
              {["Dibimbing mentor praktisi berpengalaman", "Akses ke tools & resources premium", "Networking dengan sesama pemagang", "Sertifikat & portofolio resmi"].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-foreground font-medium">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right content - Feature cards */}
          <div className="grid sm:grid-cols-2 gap-4">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="bg-muted p-6 rounded-2xl hover:shadow-lg transition-all hover:-translate-y-1 group"
              >
                <div className="w-12 h-12 rounded-xl bg-gradient-hero flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <feature.icon className="w-6 h-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-foreground text-lg mb-2">{feature.title}</h3>
                <p className="text-muted-foreground text-sm">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;
