import { useState, useEffect, useMemo } from "react";
import { Instagram, Mail, MessageCircle, Phone, AlertCircle } from "lucide-react";
import { supabase } from "@/lib/supabase";
import type { RealtimeChannel } from "@supabase/supabase-js";

interface FooterData {
  phone: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  twitter: string;
  whatsapp_message_footer: string;
}

const FooterSection = () => {
  const currentYear = new Date().getFullYear();
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [isConnected, setIsConnected] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    let isMounted = true;

    const fetchFooterData = async () => {
      try {
        // Check if Supabase is properly configured
        if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
          setHasError(true);
          setErrorMessage("Supabase belum dikonfigurasi. Hubungi administrator untuk setup.");
          return;
        }

        const { data, error } = await supabase
          .from("footer_settings")
          .select("*")
          .limit(1)
          .single();

        if (error && error.code !== "PGRST116") {
          console.error("Error fetching footer data:", error);
          setErrorMessage("Gagal memuat data dari database. Menggunakan data default.");
          setHasError(true);
          return;
        }

        if (data && isMounted) {
          setFooterData(data as FooterData);
          setHasError(false);
        }
      } catch (err) {
        console.error("Error:", err);
        setErrorMessage("Terjadi kesalahan saat memuat data footer.");
        setHasError(true);
      }
    };

    fetchFooterData();

    // Subscribe to real-time changes with retry logic
    let subscription: RealtimeChannel | null = null;
    
    const setupSubscription = async () => {
      try {
        // Only setup subscription if Supabase is configured
        if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
          return;
        }

        subscription = supabase
          .channel("footer_settings_channel")
          .on(
            "postgres_changes",
            { 
              event: "*", 
              schema: "public", 
              table: "footer_settings" 
            },
            (payload) => {
              if (payload.new && isMounted) {
                console.log("Footer updated from database:", payload.new);
                setFooterData(payload.new as FooterData);
                setIsConnected(true);
                setHasError(false);
              }
            }
          )
          .on("system", { event: "*" }, (message) => {
            if (message.type === "SUBSCRIBED") {
              setIsConnected(true);
            } else if (message.type === "CHANNEL_ERROR" || message.type === "POSTGRES_CHANGES_ERROR") {
              setIsConnected(false);
            }
          })
          .subscribe();
      } catch (err) {
        console.error("Subscription setup error:", err);
        // Don't set error state for subscription issues
      }
    };

    setupSubscription();

    return () => {
      isMounted = false;
      if (subscription) {
        supabase.removeChannel(subscription);
      }
    };
  }, []);

  // Format phone number for WhatsApp - Robust formatting
  const formatWhatsAppNumber = (phone: string) => {
    if (!phone) return "";
    // Remove all non-digits
    const cleanedPhone = phone.replace(/\D/g, "");
    // Remove leading 0 if exists and add 62
    if (cleanedPhone.startsWith("0")) {
      return "62" + cleanedPhone.slice(1);
    }
    // If already has 62, use as is
    if (cleanedPhone.startsWith("62")) {
      return cleanedPhone;
    }
    // Otherwise add 62
    return "62" + cleanedPhone;
  };

  // Memoize default values and formatted data for performance
  const memoizedData = useMemo(() => {
    const defaultPhone = "+6281234567890";
    const defaultEmail = "info@digimagang.id";
    const defaultInstagram = "https://instagram.com/digimagang";
    const defaultFacebook = "https://facebook.com/digimagang";
    const defaultCopyright = `© ${currentYear} DigiMagang. All rights reserved.`;
    const defaultMessage = "Halo, saya tertarik dengan program DigiMagang. Bisa informasi lebih lanjut?";

    const phone = footerData?.phone || defaultPhone;
    const email = footerData?.email || defaultEmail;
    const instagram = footerData?.instagram || defaultInstagram;
    const facebook = footerData?.facebook || defaultFacebook;
    const twitter = footerData?.twitter || "";
    const copyright_text = defaultCopyright;
    const address = footerData?.address || "";

    // Format WhatsApp link with message from database or default
    const formattedPhone = formatWhatsAppNumber(phone);
    const whatsappMessage = encodeURIComponent(footerData?.whatsapp_message_footer || defaultMessage);
    const whatsappLink = `https://wa.me/${formattedPhone}?text=${whatsappMessage}`;

    return {
      phone,
      email,
      instagram,
      facebook,
      twitter,
      copyright_text,
      address,
      whatsappLink,
    };
  }, [footerData, currentYear]);

  return (
    <footer className="bg-secondary text-secondary-foreground py-16">
      <div className="container">
        {hasError && (
          <div className="mb-12 p-4 bg-red-50 border border-red-200 rounded-lg">
            <div className="flex items-start gap-3">
              <AlertCircle className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-semibold text-red-900 mb-1">Footer tidak tersambung</h4>
                <p className="text-sm text-red-800">{errorMessage}</p>
                <p className="text-xs text-red-700 mt-2">
                  Hubungi administrator untuk menyiapkan database Supabase.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="grid md:grid-cols-3 gap-12">
          {/* Brand */}
          <div>
            <h3 className="text-2xl font-bold mb-4">
              <span className="text-gradient-hero">DigiMagang</span>
            </h3>
            <p className="text-muted-foreground mb-6 max-w-xs">
              Program magang digital marketing dengan sistem komisi. 
              Belajar skill, dapat penghasilan!
            </p>
            <div className="flex gap-4">
              <a 
                href={memoizedData.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href={memoizedData.whatsappLink} 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-muted/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="WhatsApp"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
              <a 
                href={`mailto:${memoizedData.email}`} 
                className="w-10 h-10 rounded-full bg-muted/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Hubungi Kami</h4>
            <div className="space-y-3">
              <a 
                href={memoizedData.whatsappLink} 
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="w-5 h-5" />
                <span>{memoizedData.phone}</span>
              </a>
              <a 
                href={`mailto:${memoizedData.email}`} 
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
                <span>{memoizedData.email}</span>
              </a>
              <a 
                href={memoizedData.instagram} 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
              >
                <Instagram className="w-5 h-5" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Link Cepat</h4>
            <div className="space-y-3">
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Tentang Program
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Kurikulum
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                Sistem Komisi
              </a>
              <a href="#" className="block text-muted-foreground hover:text-primary transition-colors">
                FAQ
              </a>
            </div>
          </div>
        </div>

        {/* Disclaimer & Copyright */}
        <div className="border-t border-muted/20 mt-12 pt-8">
          <div className="text-center text-muted-foreground text-sm">
            <p className="mb-4">
              <strong>Disclaimer:</strong> Penghasilan dari komisi bervariasi tergantung performa masing-masing peserta. 
              Hasil yang ditampilkan adalah contoh dan tidak menjamin hasil yang sama.
            </p>
            <p>{memoizedData.copyright_text}</p>
            {!isConnected && !hasError && (
              <p className="text-xs text-yellow-600 mt-2">
                ⚠️ Koneksi real-time sedang di-sync ulang...
              </p>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default FooterSection;
