import { ArrowUp, BadgeDollarSign, CheckCircle2, Coins, TrendingUp } from "lucide-react";

const CommissionSection = () => {
  return (
    <section className="py-20 md:py-28 bg-gradient-dark text-primary-foreground overflow-hidden relative">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 right-10 w-72 h-72 bg-accent/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
      </div>

      <div className="container relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-accent font-semibold text-sm uppercase tracking-wider">Sistem Komisi</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 mb-6">
            Magang Dapat{" "}
            <span className="text-gradient-gold">Penghasilan Nyata!</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Bukan janji manis. Setiap closing yang kamu hasilkan, kamu dapat komisi langsung!
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Commission card */}
          <div className="bg-card/10 backdrop-blur-md border border-accent/30 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-gold flex items-center justify-center">
                <Coins className="w-8 h-8 text-secondary" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Komisi Per Closing</h3>
                <p className="text-muted-foreground">Transparan & Langsung Dibayar</p>
              </div>
            </div>
            
            <div className="space-y-4">
              {[
                "Komisi 10-20% dari setiap transaksi berhasil",
                "Tidak ada batas maksimal penghasilan",
                "Komisi dibayarkan per minggu",
                "Bonus tambahan untuk top performer",
              ].map((item, index) => (
                <div key={index} className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                  <span className="text-primary-foreground">{item}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Earning potential */}
          <div className="bg-card/10 backdrop-blur-md border border-primary/30 rounded-3xl p-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-hero flex items-center justify-center">
                <TrendingUp className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">Potensi Penghasilan</h3>
                <p className="text-muted-foreground">Semakin Rajin, Semakin Besar!</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-secondary/30 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Pemula (1-5 closing/bulan)</span>
                  <span className="font-bold text-accent">Rp 500rb - 1jt</span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full w-1/4 bg-gradient-gold rounded-full" />
                </div>
              </div>
              <div className="bg-secondary/30 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Menengah (6-15 closing/bulan)</span>
                  <span className="font-bold text-accent">Rp 1jt - 3jt</span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full w-2/4 bg-gradient-gold rounded-full" />
                </div>
              </div>
              <div className="bg-secondary/30 rounded-xl p-4">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-muted-foreground">Expert (16+ closing/bulan)</span>
                  <span className="font-bold text-accent">Rp 3jt++</span>
                </div>
                <div className="h-2 bg-secondary/50 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-gradient-gold rounded-full" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom highlight */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-accent/20 border border-accent/30 rounded-full px-6 py-3">
            <ArrowUp className="w-5 h-5 text-accent" />
            <span className="font-semibold">Tidak Ada Batas! Semakin Rajin = Semakin Kaya 🚀</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CommissionSection;
