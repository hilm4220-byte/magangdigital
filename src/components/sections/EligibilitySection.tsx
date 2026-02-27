import { CheckCircle2, GraduationCap, Heart, School, Sparkles, User } from "lucide-react";

const eligibleGroups = [
  { icon: School, title: "Siswa SMK", description: "Jurusan Marketing, DKV, RPL, atau lainnya" },
  { icon: GraduationCap, title: "Mahasiswa", description: "Semua jurusan, D1-S2" },
  { icon: User, title: "Fresh Graduate", description: "Baru lulus dan ingin berkarir" },
  { icon: Sparkles, title: "Pemula", description: "Yang ingin belajar digital marketing" },
];

const requirements = [
  "Tidak perlu pengalaman sebelumnya",
  "Punya laptop/HP dan internet",
  "Bisa komitmen minimal 3 bulan",
  "Niat belajar & konsisten",
  "Siap praktik dan target-oriented",
];

const EligibilitySection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Siapa yang Bisa Daftar?</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            Program Ini{" "}
            <span className="text-gradient-hero">Cocok untuk Kamu!</span>
          </h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Eligible groups */}
          <div className="grid sm:grid-cols-2 gap-4">
            {eligibleGroups.map((group, index) => (
              <div 
                key={index}
                className="bg-card p-6 rounded-2xl border border-border hover:border-primary/30 transition-colors"
              >
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <group.icon className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-bold text-foreground mb-1">{group.title}</h3>
                <p className="text-muted-foreground text-sm">{group.description}</p>
              </div>
            ))}
          </div>

          {/* Requirements */}
          <div className="bg-card p-8 rounded-2xl border border-border">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl bg-success/10 flex items-center justify-center">
                <Heart className="w-6 h-6 text-success" />
              </div>
              <div>
                <h3 className="font-bold text-foreground text-xl">Syarat Pendaftaran</h3>
                <p className="text-muted-foreground text-sm">Mudah & Terbuka untuk Semua</p>
              </div>
            </div>

            <div className="space-y-4">
              {requirements.map((req, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  <span className="text-foreground">{req}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EligibilitySection;
