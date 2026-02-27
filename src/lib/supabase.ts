import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Validate environment variables
if (!supabaseUrl || !supabaseAnonKey) {
  console.error(
    '%cSupabase Configuration Error',
    'color: red; font-weight: bold; font-size: 14px'
  );
  console.error(
    '%cMissing environment variables. Please follow these steps:\n\n' +
    '1. Create a .env.local file in the project root\n' +
    '2. Add your Supabase credentials:\n' +
    '   VITE_SUPABASE_URL=https://your-project.supabase.co\n' +
    '   VITE_SUPABASE_ANON_KEY=your_anon_key_here\n' +
    '   VITE_ADMIN_PASSWORD=your_admin_password\n\n' +
    '3. Get your credentials from Supabase Dashboard → Settings → API\n' +
    '4. Restart development server (npm run dev)\n\n' +
    'Documentation: Check ADMIN_SETUP.md for more details',
    'color: #ff6b6b; font-size: 12px'
  );

  // For development, provide fallback (will only show features without real data)
  if (import.meta.env.DEV) {
    console.warn(
      '%cDevelopment Mode: Using empty Supabase client. Features requiring database will not work.',
      'color: orange; font-size: 12px'
    );
  }
}

export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : createClient('https://placeholder.supabase.co', 'placeholder-key');

export type Database = {
  public: {
    Tables: {
      footer_settings: {
        Row: {
          id: string;
          phone: string;
          email: string;
          address: string;
          instagram: string;
          facebook: string;
          twitter: string;
          copyright_text: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          phone: string;
          email: string;
          address: string;
          instagram: string;
          facebook: string;
          twitter: string;
          copyright_text: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          phone?: string;
          email?: string;
          address?: string;
          instagram?: string;
          facebook?: string;
          twitter?: string;
          copyright_text?: string;
          updated_at?: string;
        };
      };
    };
  };
};
