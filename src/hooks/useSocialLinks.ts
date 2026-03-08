import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';
import type { RealtimeChannel } from '@supabase/supabase-js';

export interface SocialLink {
  id: number;
  type: string;
  name: string;
  url: string;
  icon_type: string;
  label: string;
  display_order: number;
  is_active: boolean;
}

interface UseSocialLinksReturn {
  socialLinks: SocialLink[];
  quickLinks: SocialLink[];
  loading: boolean;
  error: string | null;
}

/**
 * Hook untuk fetch social links dan quick links dari database
 * Dengan real-time sync dan error handling
 */
export const useSocialLinks = (): UseSocialLinksReturn => {
  const [socialLinks, setSocialLinks] = useState<SocialLink[]>([]);
  const [quickLinks, setQuickLinks] = useState<SocialLink[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    const fetchLinks = async () => {
      try {
        setLoading(true);

        if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
          setError('Supabase tidak dikonfigurasi');
          setLoading(false);
          return;
        }

        // Fetch social links
        const { data: socialData, error: socialError } = await supabase
          .from('social_links')
          .select('*')
          .eq('type', 'social')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (socialError) throw socialError;
        if (isMounted && socialData) setSocialLinks(socialData as SocialLink[]);

        // Fetch quick links
        const { data: quickData, error: quickError } = await supabase
          .from('social_links')
          .select('*')
          .eq('type', 'quick_link')
          .eq('is_active', true)
          .order('display_order', { ascending: true });

        if (quickError) throw quickError;
        if (isMounted && quickData) setQuickLinks(quickData as SocialLink[]);

        setError(null);
      } catch (err) {
        if (isMounted) {
          setError((err as Error).message || 'Failed to fetch links');
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLinks();

    // Subscribe to real-time changes
    let subscription: RealtimeChannel | null = null;

    const setupSubscription = () => {
      try {
        if (!import.meta.env.VITE_SUPABASE_URL || !import.meta.env.VITE_SUPABASE_ANON_KEY) {
          return;
        }

        subscription = supabase
          .channel('social_links_channel')
          .on(
            'postgres_changes',
            {
              event: '*',
              schema: 'public',
              table: 'social_links',
            },
            async () => {
              // Refetch on any changes
              if (isMounted) {
                const { data: socialData } = await supabase
                  .from('social_links')
                  .select('*')
                  .eq('type', 'social')
                  .eq('is_active', true)
                  .order('display_order', { ascending: true });

                if (socialData && isMounted) setSocialLinks(socialData as SocialLink[]);

                const { data: quickData } = await supabase
                  .from('social_links')
                  .select('*')
                  .eq('type', 'quick_link')
                  .eq('is_active', true)
                  .order('display_order', { ascending: true });

                if (quickData && isMounted) setQuickLinks(quickData as SocialLink[]);
              }
            }
          )
          .subscribe();
      } catch (err) {
        console.error('Subscription error:', err);
      }
    };

    setupSubscription();

    return () => {
      isMounted = false;
      if (subscription) supabase.removeChannel(subscription);
    };
  }, []);

  return { socialLinks, quickLinks, loading, error };
};
