-- ============================================
-- DigiMagang Database Schema
-- Untuk Supabase SQL Editor
-- ============================================

-- 1. CREATE TABLE footer_settings
-- Tabel ini menyimpan semua konfigurasi footer
CREATE TABLE IF NOT EXISTS footer_settings (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  phone VARCHAR(20) NOT NULL DEFAULT '+6281234567890',
  email VARCHAR(100) NOT NULL DEFAULT 'info@digimagang.id',
  address TEXT NOT NULL DEFAULT 'Jakarta, Indonesia',
  instagram VARCHAR(255) NOT NULL DEFAULT 'https://instagram.com/digimagang',
  facebook VARCHAR(255) NOT NULL DEFAULT 'https://facebook.com/digimagang',
  twitter VARCHAR(255) NOT NULL DEFAULT 'https://twitter.com/digimagang',
  copyright TEXT NOT NULL DEFAULT '© 2026 DigiMagang. All rights reserved.',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. ENABLE REAL-TIME (Realtime)
-- Supaya perubahan di table bisa di dengarkan secara real-time dari frontend
ALTER TABLE footer_settings REPLICA IDENTITY FULL;

-- 3. CREATE RLS POLICY - ENABLE RLS
ALTER TABLE footer_settings ENABLE ROW LEVEL SECURITY;

-- 4. POLICY - Allow READ untuk semua user (untuk landing page)
CREATE POLICY "Allow read access for all" ON footer_settings
  FOR SELECT
  USING (TRUE);

-- 5. POLICY - Allow UPDATE hanya dengan password yang benar
-- (Implementasi password check di aplikasi, bukan di database)
CREATE POLICY "Allow update access for authenticated admin" ON footer_settings
  FOR UPDATE
  USING (TRUE)
  WITH CHECK (TRUE);

-- 6. POLICY - Allow INSERT hanya dengan password yang benar
CREATE POLICY "Allow insert access for authenticated admin" ON footer_settings
  FOR INSERT
  WITH CHECK (TRUE);

-- 7. POLICY - Allow DELETE hanya dengan password yang benar
CREATE POLICY "Allow delete access for authenticated admin" ON footer_settings
  FOR DELETE
  USING (TRUE);

-- 8. INSERT INITIAL DATA
-- Masukkan data default footer
INSERT INTO footer_settings (
  phone,
  email,
  address,
  instagram,
  facebook,
  twitter,
  copyright
) VALUES (
  '+6281234567890',
  'info@digimagang.id',
  'Jakarta, Indonesia',
  'https://instagram.com/digimagang',
  'https://facebook.com/digimagang',
  'https://twitter.com/digimagang',
  '© 2026 DigiMagang. All rights reserved.'
);

-- 9. CREATE FUNCTION untuk update timestamp
-- Otomatis update kolom updated_at saat ada perubahan
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 10. CREATE TRIGGER untuk auto-update timestamp
CREATE TRIGGER update_footer_settings_timestamp
  BEFORE UPDATE ON footer_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- ============================================
-- TESTING QUERIES
-- ============================================

-- Test 1: Lihat semua data
-- SELECT * FROM footer_settings;

-- Test 2: Update nomor WhatsApp
-- UPDATE footer_settings 
-- SET phone = '+628987654321' 
-- WHERE id = 1;

-- Test 3: Update email
-- UPDATE footer_settings 
-- SET email = 'contact@digimagang.id' 
-- WHERE id = 1;

-- Test 4: Update social media
-- UPDATE footer_settings 
-- SET instagram = 'https://instagram.com/digimagang2024'
-- WHERE id = 1;

-- Test 5: Lihat data terbaru
-- SELECT * FROM footer_settings WHERE id = 1;

-- ============================================
-- STRUCTURE EXPLANATION
-- ============================================
-- 
-- COLUMNS:
-- - id: Primary key (auto-increment)
-- - phone: Nomor WhatsApp (20 char)
-- - email: Email kontak (100 char)
-- - address: Alamat fisik (text)
-- - instagram: URL Instagram (255 char)
-- - facebook: URL Facebook (255 char)
-- - twitter: URL Twitter/X (255 char)
-- - copyright: Text copyright (text)
-- - created_at: Waktu dibuat (auto set)
-- - updated_at: Waktu diupdate (auto update)
--
-- RLS POLICIES:
-- - SELECT: Available untuk semua (public landing page bisa baca)
-- - UPDATE: Available untuk semua (password check di aplikasi)
-- - INSERT: Available untuk semua (password check di aplikasi)
-- - DELETE: Available untuk semua (password check di aplikasi)
--
-- REALTIME:
-- - REPLICA IDENTITY FULL memungkinkan realtime subscriptions
-- - Frontend bisa listen ke perubahan data secara real-time
--
-- TRIGGER:
-- - Otomatis update kolom 'updated_at' setiap ada perubahan
-- - Untuk tracking kapan terakhir kali data berubah
--
-- ============================================
