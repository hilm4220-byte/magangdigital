import { AlertCircle, BanknoteIcon, BookX, Coffee } from "lucide-react";

const problems = [
  {
    icon: Coffee,
    title: "Magang Tapi Cuma Disuruh Admin",
    description: "Buat kopi, fotokopi, ngerjain tugas yang nggak relevan sama skill.",
  },
  {
    icon: BanknoteIcon,
    title: "Magang Tanpa Uang Saku",
    description: "Kerja keras tapi nggak dapat kompensasi sama sekali.",
  },
  {
    icon: BookX,
    title: "Belajar Teori Tapi Tidak Praktik",
    description: "Di kampus belajar teori, di magang tetap nggak dapat pengalaman nyata.",
  },
  {
    icon: AlertCircle,
    title: "Tidak Punya Pengalaman Real Project",
    description: "Lulus tapi CV kosong, susah bersaing di dunia kerja.",
  },
];

const ProblemSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Masalah yang Sering Dihadapi</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            Pernah Ngalamin Ini?
          </h2>
          <p className="text-muted-foreground text-lg">
            Banyak program magang yang nggak memberikan pengalaman berharga. 
            Kamu cuma jadi "anak magang" tanpa skill dan penghasilan.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {problems.map((problem, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-2xl border border-destructive/20 hover:border-destructive/40 transition-colors group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center flex-shrink-0 group-hover:bg-destructive/20 transition-colors">
                  <problem.icon className="w-6 h-6 text-destructive" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground text-lg mb-2">{problem.title}</h3>
                  <p className="text-muted-foreground">{problem.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-xl md:text-2xl font-semibold text-foreground">
            Saatnya pilih program magang yang{" "}
            <span className="text-gradient-hero">beda dan bermanfaat!</span>
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProblemSection;
