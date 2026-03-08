-- ============================================
-- Logo Links Database Schema
-- Untuk Supabase SQL Editor
-- ============================================

-- 1. CREATE TABLE social_links
-- Tabel untuk menyimpan semua social media dan quick links
CREATE TABLE IF NOT EXISTS social_links (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  type VARCHAR(50) NOT NULL, -- 'social' atau 'quick_link'
  name VARCHAR(255) NOT NULL, -- Instagram, WhatsApp, Facebook, dll
  url VARCHAR(500) NOT NULL, -- Full URL atau email address (NO mailto: prefix for email)
  icon_type VARCHAR(100), -- instagram, facebook, twitter, whatsapp, email, link
  label VARCHAR(255), -- Text displayed to user
  display_order INT DEFAULT 0, -- Sort order (1, 2, 3, ...)
  is_active BOOLEAN DEFAULT TRUE, -- Toggle visibility
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- IMPORTANT NOTES ON EMAIL FIELD:
-- For icon_type='email', store just the email address without 'mailto:'
-- Example: 'info@digimagang.id' (NOT 'mailto:info@digimagang.id')
-- Frontend will automatically format it as mailto: link when rendering

-- 2. ENABLE REAL-TIME
ALTER TABLE social_links REPLICA IDENTITY FULL;

-- 3. ENABLE RLS
ALTER TABLE social_links ENABLE ROW LEVEL SECURITY;

-- 4. POLICY - Allow READ untuk semua user
CREATE POLICY "Allow read access for all" ON social_links
  FOR SELECT
  USING (TRUE);

-- 5. POLICY - Allow UPDATE untuk admin
CREATE POLICY "Allow update access for authenticated admin" ON social_links
  FOR UPDATE
  USING (TRUE)
  WITH CHECK (TRUE);

-- 6. POLICY - Allow INSERT untuk admin
CREATE POLICY "Allow insert access for authenticated admin" ON social_links
  FOR INSERT
  WITH CHECK (TRUE);

-- 7. POLICY - Allow DELETE untuk admin
CREATE POLICY "Allow delete access for authenticated admin" ON social_links
  FOR DELETE
  USING (TRUE);

-- 8. CREATE TRIGGER untuk auto-update timestamp
CREATE TRIGGER update_social_links_timestamp
  BEFORE UPDATE ON social_links
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 9. INSERT INITIAL DATA - Social Links
INSERT INTO social_links (type, name, url, icon_type, label, display_order, is_active) VALUES
-- Social Media Links
('social', 'Instagram', 'https://instagram.com/digimagang', 'instagram', 'Instagram', 1, TRUE),
('social', 'WhatsApp', 'https://wa.me/+6281234567890', 'whatsapp', 'WhatsApp', 2, TRUE),
('social', 'Email', 'info@digimagang.id', 'email', 'Email', 3, TRUE),
('social', 'Facebook', 'https://facebook.com/digimagang', 'facebook', 'Facebook', 4, TRUE),
('social', 'Twitter', 'https://twitter.com/digimagang', 'twitter', 'Twitter', 5, FALSE),

-- Quick Links
('quick_link', 'Tentang Program', '#tentang', 'link', 'Tentang Program', 1, TRUE),
('quick_link', 'Kurikulum', '#kurikulum', 'link', 'Kurikulum', 2, TRUE),
('quick_link', 'Sistem Komisi', '#komisi', 'link', 'Sistem Komisi', 3, TRUE),
('quick_link', 'FAQ', '#faq', 'link', 'FAQ', 4, TRUE);

-- ============================================
-- TESTING QUERIES
-- ============================================

-- Test 1: Lihat semua social links
-- SELECT * FROM social_links WHERE type = 'social' AND is_active = TRUE ORDER BY display_order;

-- Test 2: Lihat semua quick links
-- SELECT * FROM social_links WHERE type = 'quick_link' AND is_active = TRUE ORDER BY display_order;

-- Test 3: Update Instagram URL
-- UPDATE social_links 
-- SET url = 'https://instagram.com/your_new_handle' 
-- WHERE name = 'Instagram';

-- Test 4: Update Email (store as email address only, no mailto:)
-- UPDATE social_links 
-- SET url = 'contact@digimagang.id' 
-- WHERE name = 'Email' AND icon_type = 'email';

-- Test 5: Update WhatsApp number
-- UPDATE social_links 
-- SET url = 'https://wa.me/+6282345678901' 
-- WHERE name = 'WhatsApp';

-- Test 6: Disable/Enable social link
-- UPDATE social_links 
-- SET is_active = FALSE 
-- WHERE name = 'Twitter';

-- Test 7: Add new social link
-- INSERT INTO social_links (type, name, url, icon_type, label, display_order, is_active) 
-- VALUES ('social', 'LinkedIn', 'https://linkedin.com/company/digimagang', 'link', 'LinkedIn', 6, TRUE);

-- NOTES:
-- - Email field should be stored as plain email address (e.g., 'info@digimagang.id')
-- - Frontend will automatically format it as mailto: link
-- - All social links are clickable - email uses mailto:, others open in new tab
-- - Quick links use anchors (#) or relative paths for internal navigation
