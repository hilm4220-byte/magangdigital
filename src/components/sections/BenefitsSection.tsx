import { Award, Briefcase, Clock, Folder, GraduationCap, Home, Lightbulb, Users } from "lucide-react";

const benefits = [
  { icon: Award, title: "Sertifikat Resmi", description: "Sertifikat magang yang diakui" },
  { icon: Folder, title: "Portofolio Real", description: "Project nyata untuk CV-mu" },
  { icon: Briefcase, title: "Surat PKL/Magang", description: "Untuk keperluan sekolah/kampus" },
  { icon: Users, title: "Mentor Berpengalaman", description: "Dibimbing praktisi langsung" },
  { icon: Clock, title: "Jam Fleksibel", description: "Online, hybrid, atau offline" },
  { icon: Home, title: "Kerja dari Rumah", description: "WFH atau WFA sesuai kebutuhan" },
  { icon: Lightbulb, title: "Cocok untuk Pemula", description: "Tidak perlu pengalaman" },
  { icon: GraduationCap, title: "Skill Siap Kerja", description: "Langsung bisa apply kerja" },
];

const BenefitsSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Keuntungan Magang</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            Apa yang{" "}
            <span className="text-gradient-hero">Kamu Dapatkan?</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Lebih dari sekedar magang biasa. Ini investasi untuk masa depan karirmu!
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="bg-muted p-6 rounded-2xl text-center hover:bg-primary/5 transition-colors group"
            >
              <div className="w-14 h-14 rounded-2xl bg-gradient-hero mx-auto flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <benefit.icon className="w-7 h-7 text-primary-foreground" />
              </div>
              <h3 className="font-bold text-foreground mb-1">{benefit.title}</h3>
              <p className="text-muted-foreground text-sm">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
