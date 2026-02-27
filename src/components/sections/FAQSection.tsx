import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "Apakah magang ini berbayar?",
    answer: "Tidak ada biaya pendaftaran! Justru kamu yang akan mendapatkan penghasilan dari sistem komisi setiap closing yang berhasil kamu lakukan.",
  },
  {
    question: "Apakah bisa untuk PKL sekolah/kampus?",
    answer: "Bisa banget! Kami menyediakan surat PKL/magang resmi yang bisa digunakan untuk keperluan sekolah atau kampus.",
  },
  {
    question: "Magang ini online atau offline?",
    answer: "Fleksibel! Bisa full online (WFH), hybrid, atau offline tergantung kebutuhan dan lokasi kamu. Yang penting bisa komitmen dan konsisten.",
  },
  {
    question: "Apakah dapat sertifikat?",
    answer: "Ya! Kamu akan mendapatkan sertifikat magang resmi setelah menyelesaikan program. Sertifikat ini bisa digunakan untuk portofolio dan CV.",
  },
  {
    question: "Bagaimana sistem komisinya?",
    answer: "Setiap closing yang kamu hasilkan, kamu dapat komisi 10-20% dari nilai transaksi. Komisi dibayarkan per minggu dan tidak ada batas maksimal!",
  },
  {
    question: "Berapa lama durasi magang?",
    answer: "Minimal 3 bulan, tapi bisa diperpanjang sesuai kebutuhan. Banyak peserta yang lanjut karena sudah menghasilkan dan nyaman dengan sistem kerja.",
  },
  {
    question: "Saya pemula, apakah bisa ikut?",
    answer: "Tentu bisa! Program ini dirancang untuk pemula. Kamu akan dibimbing dari nol sampai bisa closing sendiri. Yang penting ada niat dan konsisten!",
  },
  {
    question: "Tools apa saja yang digunakan?",
    answer: "Kamu akan belajar menggunakan Canva, Meta Ads, TikTok Ads, WhatsApp Business, dan berbagai tools digital marketing profesional lainnya.",
  },
];

const FAQSection = () => {
  return (
    <section className="py-20 md:py-28 bg-background">
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-primary font-semibold text-sm uppercase tracking-wider">FAQ</span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground mt-4 mb-6">
            Pertanyaan{" "}
            <span className="text-gradient-hero">yang Sering Ditanyakan</span>
          </h2>
          <p className="text-muted-foreground text-lg">
            Masih ada pertanyaan? Cek jawaban dari pertanyaan yang sering ditanyakan berikut.
          </p>
        </div>

        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="bg-muted border border-border rounded-2xl px-6 data-[state=open]:border-primary/30"
              >
                <AccordionTrigger className="text-left font-semibold text-foreground hover:no-underline py-5">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-5">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
