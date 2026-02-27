-- ============================================
-- Update Database Schema - Add WhatsApp Messages
-- Untuk Supabase SQL Editor
-- ============================================

-- ADD COLUMNS untuk custom WhatsApp messages
ALTER TABLE footer_settings 
ADD COLUMN IF NOT EXISTS whatsapp_message_hero TEXT DEFAULT 'Halo, saya tertarik dengan program magang digital marketing',
ADD COLUMN IF NOT EXISTS whatsapp_message_cta TEXT DEFAULT 'Halo, saya mau daftar program magang digital marketing',
ADD COLUMN IF NOT EXISTS whatsapp_message_footer TEXT DEFAULT 'Halo, saya tertarik dengan program DigiMagang. Bisa informasi lebih lanjut?';

-- ============================================
-- TESTING QUERIES
-- ============================================

-- Test 1: Lihat kolom baru
-- SELECT whatsapp_message_hero, whatsapp_message_cta, whatsapp_message_footer FROM footer_settings;

-- Test 2: Update pesan Hero
-- UPDATE footer_settings 
-- SET whatsapp_message_hero = 'Halo, saya ingin tahu lebih lanjut tentang program INI'
-- WHERE id = 1;

-- Test 3: Update pesan CTA
-- UPDATE footer_settings 
-- SET whatsapp_message_cta = 'Saya mau coba program kalian'
-- WHERE id = 1;

-- Test 4: Update pesan Footer
-- UPDATE footer_settings 
-- SET whatsapp_message_footer = 'Ada yang bisa dibantu?'
-- WHERE id = 1;

-- ============================================
-- KOLOM BARU YANG DITAMBAH:
-- ============================================
-- whatsapp_message_hero - Pesan otomatis untuk Hero section
-- whatsapp_message_cta - Pesan otomatis untuk CTA section
-- whatsapp_message_footer - Pesan otomatis untuk Footer section
-- 
-- Setiap field punya default value yang sama seperti sebelumnya
-- ============================================
