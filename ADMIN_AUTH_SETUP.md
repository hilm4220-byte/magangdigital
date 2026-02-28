# Admin Authentication Setup Guide

Panduan lengkap untuk setup authentication admin dengan Supabase dan Email/Password.

## 📋 Overview

Login admin sekarang menggunakan:
- ✅ Email sebagai username
- ✅ Password yang di-hash dengan bcrypt
- ✅ Supabase sebagai database
- ✅ Validasi real-time

## 🚀 Langkah-Langkah Setup

### 1. Install Dependencies

Jalankan perintah ini untuk install package yang dibutuhkan:

```bash
npm install bcryptjs
npm install --save-dev @types/bcryptjs
```

### 2. Buat Database Table

Copy seluruh SQL dari file `DATABASE_ADMIN_AUTH.sql` ke Supabase SQL Editor:
1. Buka Supabase Dashboard
2. Pilih tab "SQL Editor"
3. Klik "New Query"
4. Paste semua SQL dari `DATABASE_ADMIN_AUTH.sql`
5. Klik "Run"

### 3. Generate Password Hash

Untuk membuat admin user baru dengan password yang aman:

#### Opsi A: Menggunakan Online Tool (Paling Mudah)
1. Buka https://bcrypt.online/
2. Masukkan password Anda di kolom "text"
3. Copy hash yang dihasilkan
4. Ganti di SQL dengan hash tersebut

#### Opsi B: Menggunakan Node.js Terminal
```bash
node

# Di dalam Node.js shell:
const bcrypt = require('bcryptjs');
const hash = bcrypt.hashSync('password_anda_di_sini', 12);
console.log(hash);
```

Contoh hasil:
```
$2a$12$abc123...xyz789
```

### 4. Insert Admin User ke Database

Jalankan query di bawah ini di Supabase SQL Editor (setelah replace hash):

```sql
INSERT INTO admin_users (email, password_hash, full_name, is_active)
VALUES (
  'admin@digimagang.id',
  '$2a$12$abc123...xyz789', -- Ganti dengan hash yang Anda generate
  'Administrator',
  TRUE
)
ON CONFLICT (email) DO NOTHING;
```

Atau update yang sudah ada:
```sql
UPDATE admin_users 
SET password_hash = '$2a$12$abc123...xyz789'
WHERE email = 'admin@digimagang.id';
```

### 5. Test Login

1. Jalankan development server:
```bash
npm run dev
```

2. Buka http://localhost:5173/login

3. Login dengan:
   - Email: `admin@digimagang.id` (atau email yang Anda set)
   - Password: Password yang Anda set

## 📊 Database Schema

### admin_users Table

| Column | Type | Deskripsi |
|--------|------|-----------|
| id | UUID | Primary key (auto-generated) |
| email | VARCHAR(255) | Email unique untuk login |
| password_hash | VARCHAR(255) | Bcrypt hash password (jangan simpan plain text!) |
| full_name | VARCHAR(255) | Nama lengkap admin |
| is_active | BOOLEAN | Status admin (aktif/nonaktif) |
| created_at | TIMESTAMP | Waktu akun dibuat |
| updated_at | TIMESTAMP | Waktu akun diupdate |

## 🔐 Security Best Practices

1. **Jangan pernah** simpan password plain text di database
2. **Selalu** gunakan bcrypt untuk hash password
3. **Ubah password default** dari `admin123` ke password yang kuat
4. **Disable akun** yang tidak lagi digunakan dengan set `is_active = FALSE`
5. **Jangan commit** file yang berisi password ke git

## 👥 Menambah Admin User Baru

### Step 1: Generate Password Hash
1. Buka https://bcrypt.online/
2. Masukkan password baru
3. Copy hash yang dihasilkan

### Step 2: Insert ke Database
Jalankan query di Supabase SQL Editor:

```sql
INSERT INTO admin_users (email, password_hash, full_name, is_active)
VALUES (
  'newadmin@digimagang.id',
  '$2a$12$...paste_hash_di_sini...',
  'Nama Admin Baru',
  TRUE
);
```

## 🔄 Mengubah Password Admin

```sql
UPDATE admin_users 
SET password_hash = '$2a$12$...hashed_password_baru...'
WHERE email = 'admin@digimagang.id';
```

## ⚠️ Disable Admin User

Jika ada admin yang sudah tidak bekerja atau password lupa:

```sql
UPDATE admin_users 
SET is_active = FALSE
WHERE email = 'admin@digimagang.id';
```

Untuk re-enable:
```sql
UPDATE admin_users 
SET is_active = TRUE
WHERE email = 'admin@digimagang.id';
```

## 🧪 Testing Validasi

### Test 1: Login dengan email benar
- Email: `admin@digimagang.id`
- Password: `admin123`
- Expected: Redirect ke /admin ✅

### Test 2: Login dengan email salah
- Email: `wrong@digimagang.id`
- Password: `admin123`
- Expected: Error "Email atau password salah" ✅

### Test 3: Login dengan password salah
- Email: `admin@digimagang.id`
- Password: `wrongpassword`
- Expected: Error "Email atau password salah" ✅

### Test 4: Admin user nonaktif
- Set `is_active = FALSE`
- Coba login
- Expected: Error "Akun admin ini telah dinonaktifkan" ✅

## 🐛 Troubleshooting

### Error: "Cannot find module 'bcryptjs'"
Solusi:
```bash
npm install bcryptjs
npm install --save-dev @types/bcryptjs
```

### Error: "Email atau password salah" (padahal semua benar)
Kemungkinan:
1. Hash password tidak benar - generate ulang di bcrypt.online
2. Email tidak match - pastikan email di database sama persis
3. is_active = FALSE - check nilai di database

### Session hilang setelah refresh
Ini adalah behavior normal karena menggunakan sessionStorage. Untuk persistent login, bisa modifikasi ke localStorage atau gunakan Authorization header.

## 📝 File-File yang Berubah

- `src/pages/LoginAdmin.tsx` - Login page dengan email + password
- `src/pages/AdminPanel.tsx` - Check session yang lebih ketat
- `DATABASE_ADMIN_AUTH.sql` - Schema admin_users table

## 🔗 Related Documentation

- [DATABASE_ADMIN_AUTH.sql](DATABASE_ADMIN_AUTH.sql) - SQL untuk setup table
- [ADMIN_SETUP.md](ADMIN_SETUP.md) - Setup keseluruhan admin panel
- [bcryptjs Documentation](https://www.npmjs.com/package/bcryptjs)

---

**Last Updated:** February 2025
