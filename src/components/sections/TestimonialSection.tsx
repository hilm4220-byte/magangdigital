import { Quote, Star } from "lucide-react";

const testimonials = [
  {
    name: "Rina Putri",
    role: "Mahasiswa Komunikasi",
    image: "https://i.pravatar.cc/150?img=1",
    quote: "Awalnya skeptis, tapi setelah 2 bulan magang saya sudah dapat 15 closing dan komisi 2,5 juta! Ilmunya juga beneran dipraktikkan.",
    earnings: "Rp 2.500.000",
  },
  {
    name: "Dimas Pratama",
    role: "Siswa SMK Jurusan RPL",
    image: "https://i.pravatar.cc/150?img=3",
    quote: "PKL di sini beda banget! Nggak cuma fotokopi doang, tapi belajar digital marketing beneran dan dapat uang saku dari komisi.",
    earnings: "Rp 1.800.000",
  },
  {
    name: "Sarah Amelia",
    role: "Fresh Graduate Manajemen",
    image: "https://i.pravatar.cc/150?img=5",
    quote: "Sebelum magang CV saya kosong. Sekarang punya portofolio real dan sudah ditawarin kerja di agency digital marketing!",
    earnings: "Rp 3.200.000",
  },
];

const TestimonialSection = () => {
  return (
    <section className="py-20 md:py-28 bg-muted">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Cerita Alumni</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            Apa Kata{" "}
            <span className="text-gradient-hero">Mereka?</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Dengarkan pengalaman nyata dari peserta magang sebelumnya.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-card p-6 rounded-2xl border border-border hover:border-primary/30 hover:shadow-lg transition-all group"
            >
              {/* Quote icon */}
              <Quote className="w-10 h-10 text-primary/20 mb-4" />
              
              {/* Quote text */}
              <p className="text-foreground mb-6 leading-relaxed">"{testimonial.quote}"</p>

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-accent text-accent" />
                ))}
              </div>

              {/* Earnings badge */}
              <div className="inline-flex items-center gap-2 bg-success/10 border border-success/30 rounded-full px-4 py-2 mb-6">
                <span className="text-sm text-muted-foreground">Total Komisi:</span>
                <span className="font-bold text-success">{testimonial.earnings}</span>
              </div>

              {/* Author */}
              <div className="flex items-center gap-4 pt-4 border-t border-border">
                <img 
                  src={testimonial.image} 
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <p className="font-bold text-foreground">{testimonial.name}</p>
                  <p className="text-muted-foreground text-sm">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialSection;
