import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL || '';
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY || '';

const supabase = createClient(supabaseUrl, supabaseKey);

export default async function handler(
  request: VercelRequest,
  response: VercelResponse,
) {
  // Security: Check if request dari Vercel Cron (atau local)
  if (request.headers.authorization !== `Bearer ${process.env.CRON_SECRET}`) {
    return response.status(401).json({ error: 'Unauthorized' });
  }

  try {
    // Query sederhana untuk keep database active
    const { data, error } = await supabase
      .from('footer_settings')
      .select('id, updated_at')
      .limit(1);

    if (error) {
      console.error('Keep-alive error:', error);
      return response.status(500).json({ 
        error: 'Database query failed',
        details: error.message 
      });
    }

    return response.status(200).json({
      success: true,
      message: 'Supabase Keep-Alive executed successfully',
      timestamp: new Date().toISOString(),
      recordsChecked: data?.length || 0,
    });
  } catch (err) {
    console.error('Unexpected error:', err);
    return response.status(500).json({ 
      error: 'Internal server error',
      details: err instanceof Error ? err.message : 'Unknown error'
    });
  }
}

// Config untuk Vercel Cron
export const config = {
  // Jalankan setiap hari jam 9 pagi (timezone server)
  crons: ['0 9 * * *'],
};
