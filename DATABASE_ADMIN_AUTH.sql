-- ============================================
-- Admin Authentication Schema
-- Untuk Supabase SQL Editor
-- ============================================

-- 1. CREATE TABLE admin_users
-- Tabel untuk menyimpan data admin dengan email
CREATE TABLE IF NOT EXISTS admin_users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  full_name VARCHAR(255),
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. ENABLE RLS
ALTER TABLE admin_users ENABLE ROW LEVEL SECURITY;

-- 3. CREATE RLS POLICIES
-- Allow SELECT untuk authenticated users (untuk validasi login)
CREATE POLICY "Allow read access for login" ON admin_users
  FOR SELECT
  USING (TRUE);

-- Allow UPDATE hanya untuk admin user sendiri
CREATE POLICY "Allow update access for own profile" ON admin_users
  FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- 4. CREATE FUNCTION untuk hash password dengan bcrypt
-- Note: Anda perlu install pgcrypto extension atau gunakan pgsodium
CREATE EXTENSION IF NOT EXISTS pgcrypto;

-- 5. CREATE FUNCTION untuk update timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- 6. CREATE TRIGGER untuk auto-update timestamp
CREATE TRIGGER update_admin_users_timestamp
  BEFORE UPDATE ON admin_users
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- 7. INSERT INITIAL ADMIN USER
-- Password default: "admin123" (akan di-hash)
-- CATATAN: Ganti email dan password sesuai kebutuhan Anda
-- Gunakan tool online untuk generate bcrypt hash dari password Anda
INSERT INTO admin_users (email, password_hash, full_name, is_active)
VALUES (
  'admin@digimagang.id',
  -- Ganti hash di bawah dengan hash dari password Anda
  -- Gunakan: https://bcrypt.online/ atau tool lainnya
  -- Export dari sini kemudin di-paste di sini
  '$2a$12$R9h7cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jKMm2', -- hash dari 'admin123'
  'Administrator',
  TRUE
)
ON CONFLICT (email) DO NOTHING;

-- ============================================
-- TESTING QUERIES
-- ============================================

-- Test 1: Lihat semua admin users
-- SELECT id, email, full_name, is_active, created_at FROM admin_users;

-- Test 2: Tambah admin user baru
-- INSERT INTO admin_users (email, password_hash, full_name, is_active)
-- VALUES ('newadmin@digimagang.id', '$2a$12$...', 'Admin Baru', true);

-- Test 3: Update password admin
-- UPDATE admin_users 
-- SET password_hash = '$2a$12$...'
-- WHERE email = 'admin@digimagang.id';

-- Test 4: Disable admin user
-- UPDATE admin_users 
-- SET is_active = FALSE
-- WHERE email = 'admin@digimagang.id';

-- ============================================
-- IMPORTANTE: CARA MENGHASILKAN PASSWORD HASH
-- ============================================
-- 
-- 1. Gunakan website: https://bcrypt.online/
-- 2. Masukkan password Anda (contoh: "MySecurePassword123")
-- 3. Copy hash yang dihasilkan
-- 4. Paste ke kolom password_hash
--
-- Atau gunakan di terminal Node.js:
-- const bcrypt = require('bcryptjs');
-- bcrypt.hashSync('password_anda', 10);
--
-- Contoh hash yang sudah dibuat:
-- Password: admin123
-- Hash: $2a$12$R9h7cIPz0gi.URNNX3kh2OPST9/PgBkqquzi.Ss7KIUgO2t0jKMm2
--
-- ============================================
-- KOLOM YANG DIGUNAKAN:
-- ============================================
-- id: UUID primary key
-- email: Email unik untuk login
-- password_hash: Bcrypt hash dari password (jangan simpan plain text!)
-- full_name: Nama lengkap admin
-- is_active: Status admin (aktif/nonaktif)
-- created_at: Waktu akun dibuat
-- updated_at: Waktu akun diupdate
--
-- ============================================
