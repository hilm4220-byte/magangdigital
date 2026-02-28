-- ============================================
-- Update Database Schema - Add Hero Program Title
-- Untuk Supabase SQL Editor
-- ============================================

-- ADD COLUMN untuk Hero Program Title
ALTER TABLE footer_settings 
ADD COLUMN IF NOT EXISTS hero_program_title TEXT DEFAULT 'Program Magang & PKL 2025';

-- ============================================
-- TESTING QUERIES
-- ============================================

-- Test 1: Lihat kolom baru
-- SELECT hero_program_title FROM footer_settings;

-- Test 2: Update hero program title
-- UPDATE footer_settings 
-- SET hero_program_title = 'Program Magang & PKL 2025'
-- WHERE id = 1;

-- ============================================
-- KOLOM BARU YANG DITAMBAH:
-- ============================================
-- hero_program_title - Judul program di Hero section yang bisa diubah di admin panel
-- Default value: 'Program Magang & PKL 2025'
-- ============================================
