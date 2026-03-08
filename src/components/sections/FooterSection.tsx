import { useState, useEffect, useMemo } from "react";
import { Instagram, Mail, MessageCircle, Phone, AlertCircle, Facebook, Twitter, Link } from "lucide-react";
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

interface SocialLink {
  id: number;
  type: string;
  name: string;
  url: string;
  icon_type: string;
  label: string;
  display_order: number;
  is_active: boolean;
}

const FooterSection = () => {
  const currentYear = new Date().getFullYear();
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [quickLinks, setQuickLinks] = useState<SocialLink[]>([]);
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

        // Fetch footer settings
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

        // Fetch social links
        const { data: socialLinksData, error: socialError } = await supabase
          .from("social_links")
          .select("*")
          .eq("type", "social")
          .eq("is_active", true)
          .order("display_order", { ascending: true });

        if (socialError) {
          console.error("Error fetching social links:", socialError);
        } else if (socialLinksData && isMounted) {
          setSocialLinks(socialLinksData as SocialLink[]);
        }

        // Fetch quick links
        const { data: quickLinksData, error: quickError } = await supabase
          .from("social_links")
          .select("*")
          .eq("type", "quick_link")
          .eq("is_active", true)
          .order("display_order", { ascending: true });

        if (quickError) {
          console.error("Error fetching quick links:", quickError);
        } else if (quickLinksData && isMounted) {
          setQuickLinks(quickLinksData as SocialLink[]);
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
    let socialSubscription: RealtimeChannel | null = null;
    
    const setupSubscription = async () => {
      try {
        // Only setup subscription if Supabase is configured
        if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
          return;
        }

        // Footer settings subscription
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

        // Social links subscription
        socialSubscription = supabase
          .channel("social_links_channel")
          .on(
            "postgres_changes",
            { 
              event: "*", 
              schema: "public", 
              table: "social_links" 
            },
            async (payload) => {
              if (isMounted) {
                console.log("Social links updated from database:", payload);
                // Refetch social links
                const { data: updatedSocialLinks } = await supabase
                  .from("social_links")
                  .select("*")
                  .eq("type", "social")
                  .eq("is_active", true)
                  .order("display_order", { ascending: true });

                if (updatedSocialLinks) {
                  setSocialLinks(updatedSocialLinks as SocialLink[]);
                }

                // Refetch quick links
                const { data: updatedQuickLinks } = await supabase
                  .from("social_links")
                  .select("*")
                  .eq("type", "quick_link")
                  .eq("is_active", true)
                  .order("display_order", { ascending: true });

                if (updatedQuickLinks) {
                  setQuickLinks(updatedQuickLinks as SocialLink[]);
                }
              }
            }
          )
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
      if (socialSubscription) {
        supabase.removeChannel(socialSubscription);
      }
    };
  }, []);

  // Function to get icon component based on icon_type
  const getIconComponent = (iconType: string) => {
    switch (iconType) {
      case "instagram":
        return <Instagram className="w-5 h-5" />;
      case "facebook":
        return <Facebook className="w-5 h-5" />;
      case "twitter":
        return <Twitter className="w-5 h-5" />;
      case "whatsapp":
        return <MessageCircle className="w-5 h-5" />;
      case "email":
        return <Mail className="w-5 h-5" />;
      default:
        return <Link className="w-5 h-5" />;
    }
  };

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

  // Format email URL for mailto
  const formatEmailLink = (email: string) => {
    if (!email) return "";
    // Check if already has mailto:
    if (email.startsWith("mailto:")) {
      return email;
    }
    return `mailto:${email}`;
  };

  // Get email from social links or footer data
  const getEmailLink = () => {
    const emailLink = socialLinks.find((link) => link.icon_type === "email");
    if (emailLink) {
      return formatEmailLink(emailLink.url);
    }
    return formatEmailLink(memoizedData.email);
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
              {socialLinks.length > 0 ? (
                socialLinks.map((link) => {
                  // Handle email link specially
                  if (link.icon_type === "email") {
                    return (
                      <a
                        key={link.id}
                        href={formatEmailLink(link.url)}
                        className="w-10 h-10 rounded-full bg-muted/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                        aria-label={link.label}
                        title={link.label}
                      >
                        {getIconComponent(link.icon_type)}
                      </a>
                    );
                  }
                  return (
                    <a
                      key={link.id}
                      href={link.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-full bg-muted/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                      aria-label={link.label}
                      title={link.label}
                    >
                      {getIconComponent(link.icon_type)}
                    </a>
                  );
                })
              ) : (
                <>
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
                    href={getEmailLink()}
                    className="w-10 h-10 rounded-full bg-muted/10 flex items-center justify-center hover:bg-primary/20 transition-colors"
                    aria-label="Email"
                    title="Email"
                  >
                    <Mail className="w-5 h-5" />
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-bold text-lg mb-4">Hubungi Kami</h4>
            <div className="space-y-3">
              {socialLinks.length > 0 ? (
                socialLinks.map((link) => {
                  // Find and display email
                  if (link.icon_type === "email") {
                    return (
                      <a 
                        key={link.id}
                        href={formatEmailLink(link.url)} 
                        className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                        title="Klik untuk kirim email"
                      >
                        <Mail className="w-5 h-5" />
                        <span>{link.url.replace('mailto:', '')}</span>
                      </a>
                    );
                  }
                  // Find and display whatsapp
                  if (link.icon_type === "whatsapp" && footerData?.phone) {
                    return (
                      <a
                        key={link.id}
                        href={memoizedData.whatsappLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                        title="Klik untuk chat WhatsApp"
                      >
                        <Phone className="w-5 h-5" />
                        <span>{memoizedData.phone}</span>
                      </a>
                    );
                  }
                  // Find and display instagram
                  if (link.icon_type === "instagram") {
                    return (
                      <a
                        key={link.id}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                        title="Buka Instagram kami"
                      >
                        <Instagram className="w-5 h-5" />
                        <span>{link.label}</span>
                      </a>
                    );
                  }
                  return null;
                })
              ) : (
                <>
                  <a 
                    href={memoizedData.whatsappLink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    title="Klik untuk chat WhatsApp"
                  >
                    <Phone className="w-5 h-5" />
                    <span>{memoizedData.phone}</span>
                  </a>
                  <a 
                    href={getEmailLink()}
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    title="Klik untuk kirim email"
                  >
                    <Mail className="w-5 h-5" />
                    <span>{memoizedData.email}</span>
                  </a>
                  <a 
                    href={memoizedData.instagram} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                    title="Buka Instagram kami"
                  >
                    <Instagram className="w-5 h-5" />
                    <span>Instagram</span>
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-bold text-lg mb-4">Link Cepat</h4>
            <div className="space-y-3">
              {quickLinks.length > 0 ? (
                quickLinks.map((link) => (
                  <a 
                    key={link.id}
                    href={link.url} 
                    className="block text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.label}
                  </a>
                ))
              ) : (
                <>
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
                </>
              )}
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
