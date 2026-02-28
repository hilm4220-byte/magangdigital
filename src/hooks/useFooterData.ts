import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import type { RealtimeChannel } from "@supabase/supabase-js";

interface FooterData {
  phone: string;
  email: string;
  address: string;
  instagram: string;
  facebook: string;
  twitter: string;
  whatsapp_message_hero: string;
  whatsapp_message_cta: string;
  whatsapp_message_footer: string;
  hero_program_title: string;
}

export const useFooterData = () => {
  const [footerData, setFooterData] = useState<FooterData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(true);

  useEffect(() => {
    let isMounted = true;

    // Fetch initial data
    const fetchFooterData = async () => {
      try {
        if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
          setError("Supabase not configured");
          setLoading(false);
          return;
        }

        const { data, error: fetchError } = await supabase
          .from("footer_settings")
          .select("*")
          .limit(1)
          .single();

        if (fetchError && fetchError.code !== "PGRST116") {
          console.error("Error fetching footer data:", fetchError);
          setError(fetchError.message || "Failed to fetch data");
          setLoading(false);
          return;
        }

        if (data && isMounted) {
          setFooterData(data as FooterData);
          setError(null);
        }
        setLoading(false);
      } catch (err) {
        console.error("Error:", err);
        setError(err instanceof Error ? err.message : "Unknown error");
        setLoading(false);
      }
    };

    fetchFooterData();

    // Setup real-time subscription
    let subscription: RealtimeChannel | null = null;

    const setupSubscription = async () => {
      try {
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
              table: "footer_settings",
            },
            (payload) => {
              if (payload.new && isMounted) {
                console.log("Footer data updated:", payload.new);
                setFooterData(payload.new as FooterData);
                setIsConnected(true);
                setError(null);
              }
            }
          )
          .on("system", { event: "*" }, (message) => {
            if (message.type === "SUBSCRIBED") {
              setIsConnected(true);
            } else if (
              message.type === "CHANNEL_ERROR" ||
              message.type === "POSTGRES_CHANGES_ERROR"
            ) {
              setIsConnected(false);
            }
          })
          .subscribe();
      } catch (err) {
        console.error("Subscription setup error:", err);
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

  // Format phone number for WhatsApp
  const formatWhatsAppNumber = (phone: string) => {
    if (!phone) return "";
    const cleanedPhone = phone.replace(/\D/g, "");
    if (cleanedPhone.startsWith("0")) {
      return "62" + cleanedPhone.slice(1);
    }
    if (cleanedPhone.startsWith("62")) {
      return cleanedPhone;
    }
    return "62" + cleanedPhone;
  };

  // Get WhatsApp link with specified message
  const getWhatsAppLink = (message?: string) => {
    const finalMessage = message || footerData?.whatsapp_message_footer || "Halo, saya tertarik dengan program DigiMagang. Bisa informasi lebih lanjut?";
    if (!footerData?.phone) {
      return `https://wa.me/6281234567890?text=${encodeURIComponent(finalMessage)}`;
    }
    const formattedPhone = formatWhatsAppNumber(footerData.phone);
    return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(finalMessage)}`;
  };

  // Get specific WhatsApp links for each section
  const getHeroWhatsAppLink = () => {
    const message = footerData?.whatsapp_message_hero || "Halo, saya tertarik dengan program magang digital marketing";
    if (!footerData?.phone) {
      return `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    }
    const formattedPhone = formatWhatsAppNumber(footerData.phone);
    return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
  };

  const getCTAWhatsAppLink = () => {
    const message = footerData?.whatsapp_message_cta || "Halo, saya mau daftar program magang digital marketing";
    if (!footerData?.phone) {
      return `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    }
    const formattedPhone = formatWhatsAppNumber(footerData.phone);
    return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
  };

  const getFooterWhatsAppLink = () => {
    const message = footerData?.whatsapp_message_footer || "Halo, saya tertarik dengan program DigiMagang. Bisa informasi lebih lanjut?";
    if (!footerData?.phone) {
      return `https://wa.me/6281234567890?text=${encodeURIComponent(message)}`;
    }
    const formattedPhone = formatWhatsAppNumber(footerData.phone);
    return `https://wa.me/${formattedPhone}?text=${encodeURIComponent(message)}`;
  };

  const getHeroProgramTitle = () => {
    return footerData?.hero_program_title || "Program Magang & PKL 2025";
  };

  return {
    footerData,
    loading,
    error,
    isConnected,
    getWhatsAppLink,
    getHeroWhatsAppLink,
    getCTAWhatsAppLink,
    getFooterWhatsAppLink,
    getHeroProgramTitle,
    phone: footerData?.phone || "+6281234567890",
  };
};
