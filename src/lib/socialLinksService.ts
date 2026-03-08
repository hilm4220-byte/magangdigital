import { supabase } from '@/lib/supabase';

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

export interface CreateSocialLinkInput {
  type: 'social' | 'quick_link';
  name: string;
  url: string;
  icon_type: string;
  label: string;
  display_order: number;
  is_active?: boolean;
}

/**
 * Service untuk manage social links dari admin panel
 */
export const socialLinksService = {
  /**
   * Get all social links
   */
  async getAllLinks() {
    const { data, error } = await supabase
      .from('social_links')
      .select('*')
      .order('display_order', { ascending: true });

    if (error) throw error;
    return data as SocialLink[];
  },

  /**
   * Get social links only (not quick links)
   */
  async getSocialLinks(activeOnly = true) {
    const query = supabase
      .from('social_links')
      .select('*')
      .eq('type', 'social');

    if (activeOnly) query.eq('is_active', true);

    const { data, error } = await query.order('display_order', {
      ascending: true,
    });

    if (error) throw error;
    return data as SocialLink[];
  },

  /**
   * Get quick links only
   */
  async getQuickLinks(activeOnly = true) {
    const query = supabase
      .from('social_links')
      .select('*')
      .eq('type', 'quick_link');

    if (activeOnly) query.eq('is_active', true);

    const { data, error } = await query.order('display_order', {
      ascending: true,
    });

    if (error) throw error;
    return data as SocialLink[];
  },

  /**
   * Get single link by ID
   */
  async getLinkById(id: number) {
    const { data, error } = await supabase
      .from('social_links')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    return data as SocialLink;
  },

  /**
   * Create new link
   */
  async createLink(input: CreateSocialLinkInput) {
    const { data, error } = await supabase
      .from('social_links')
      .insert([
        {
          ...input,
          is_active: input.is_active ?? true,
        },
      ])
      .select()
      .single();

    if (error) throw error;
    return data as SocialLink;
  },

  /**
   * Update existing link
   */
  async updateLink(id: number, updates: Partial<SocialLink>) {
    const { data, error } = await supabase
      .from('social_links')
      .update({
        ...updates,
        updated_at: new Date().toISOString(),
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as SocialLink;
  },

  /**
   * Delete link
   */
  async deleteLink(id: number) {
    const { error } = await supabase.from('social_links').delete().eq('id', id);

    if (error) throw error;
    return { success: true };
  },

  /**
   * Update display order for multiple links
   */
  async updateDisplayOrder(links: Array<{ id: number; display_order: number }>) {
    const updates = links.map((link) => ({
      id: link.id,
      display_order: link.display_order,
      updated_at: new Date().toISOString(),
    }));

    // Batch update using rpc or multiple updates
    const promises = updates.map((update) =>
      supabase
        .from('social_links')
        .update(update)
        .eq('id', update.id)
    );

    const results = await Promise.all(promises);
    const errors = results.filter((r) => r.error);

    if (errors.length > 0) {
      throw new Error(`Failed to update ${errors.length} links`);
    }

    return { success: true, updated: links.length };
  },

  /**
   * Toggle link active status
   */
  async toggleLink(id: number) {
    const link = await this.getLinkById(id);
    return this.updateLink(id, { is_active: !link.is_active });
  },

  /**
   * Batch update links
   */
  async batchUpdate(
    updates: Array<{ id: number; changes: Partial<SocialLink> }>
  ) {
    const promises = updates.map(({ id, changes }) =>
      this.updateLink(id, changes)
    );

    return Promise.all(promises);
  },
};
