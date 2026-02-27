import { ArrowRight, CheckCircle, ClipboardList, FileCheck, GraduationCap, Rocket, Users } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: ClipboardList,
    title: "Daftar via Website",
    description: "Isi formulir pendaftaran dengan lengkap",
  },
  {
    number: "02",
    icon: Users,
    title: "Seleksi & Interview",
    description: "Interview singkat untuk mengenal kamu lebih baik",
  },
  {
    number: "03",
    icon: FileCheck,
    title: "Onboarding",
    description: "Pengenalan program, tim, dan sistem kerja",
  },
  {
    number: "04",
    icon: GraduationCap,
    title: "Training Intensif",
    description: "Pelatihan skill digital marketing dasar",
  },
  {
    number: "05",
    icon: Rocket,
    title: "Praktik & Real Project",
    description: "Langsung handle project dan mulai closing!",
  },
];

const ProcessSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">Alur Pendaftaran</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            Gimana Cara{" "}
            <span className="text-gradient-hero">Mulai Magang?</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Proses pendaftaran yang mudah dan cepat. Dalam 1 minggu kamu sudah bisa mulai!
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-0.5 bg-border -translate-x-1/2" />

          <div className="space-y-8 md:space-y-0">
            {steps.map((step, index) => (
              <div 
                key={index}
                className={`relative flex flex-col md:flex-row items-center gap-4 md:gap-8 ${
                  index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`flex-1 ${index % 2 === 0 ? 'md:text-right' : 'md:text-left'}`}>
                  <div className={`bg-muted p-6 rounded-2xl inline-block ${
                    index % 2 === 0 ? 'md:ml-auto' : 'md:mr-auto'
                  }`}>
                    <span className="text-primary font-bold text-sm">Step {step.number}</span>
                    <h3 className="font-bold text-foreground text-xl mt-1 mb-2">{step.title}</h3>
                    <p className="text-muted-foreground">{step.description}</p>
                  </div>
                </div>

                {/* Icon */}
                <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-hero flex items-center justify-center shadow-lg">
                  <step.icon className="w-7 h-7 text-primary-foreground" />
                </div>

                {/* Empty space for alignment */}
                <div className="flex-1 hidden md:block" />
              </div>
            ))}
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-2 bg-success/10 border border-success/30 rounded-full px-6 py-3">
            <CheckCircle className="w-5 h-5 text-success" />
            <span className="font-semibold text-foreground">Proses cepat, langsung praktik dalam 1 minggu!</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
