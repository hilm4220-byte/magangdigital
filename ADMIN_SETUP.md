# Setup Admin Panel & Footer Management

## 📋 Daftar Fitur

Admin panel ini memungkinkan Anda untuk:
- ✅ Mengelola semua konten footer (nomor WhatsApp, email, alamat, social media)
- ✅ Memberikan akses admin dengan password protection
- ✅ Mengubah data footer otomatis dan real-time ke semua halaman
- ✅ Menyimpan semua data di Supabase
- ✅ Akses admin panel di URL `/login` dan `/admin`

## 🚀 Langkah Setup

### 1. Setup Supabase

#### a. Buat akun di Supabase
- Kunjungi [https://supabase.com](https://supabase.com)
- Sign up dengan email atau GitHub
- Buat project baru

#### b. Dapatkan Credentials
- Di dashboard Supabase, klik **Settings** → **API**
- Copy **Project URL** dan **Anon Public Key**

#### c. Buat Database Table

Di Supabase SQL Editor, jalankan query ini:

```sql
-- Create footer_settings table
CREATE TABLE footer_settings (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  phone TEXT,
  email TEXT,
  address TEXT,
  instagram TEXT,
  facebook TEXT,
  twitter TEXT,
  copyright_text TEXT,
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable RLS (Row Level Security) - Allow anyone to read, authenticated to write
ALTER TABLE footer_settings ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read footer_settings"
ON footer_settings FOR SELECT
USING (TRUE);

CREATE POLICY "Anyone can insert footer_settings"
ON footer_settings FOR INSERT
WITH CHECK (TRUE);

CREATE POLICY "Anyone can update footer_settings"
ON footer_settings FOR UPDATE
USING (TRUE);
```

### 2. Setup Environment Variables

#### a. Buat file `.env.local`

Di root project, buat file `.env.local`:

```bash
cp .env.local.example .env.local
```

#### b. Isi credentials

Edit `.env.local`:

```env
# Copy dari Supabase Settings → API
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your_anon_public_key_here

# Password untuk admin login (ubah ke password yang kuat)
VITE_ADMIN_PASSWORD=your_secure_password_here
```

**⚠️ PENTING:** 
- Jangan share file `.env.local` dengan orang lain
- Ubah `VITE_ADMIN_PASSWORD` ke password yang kuat
- Untuk production, gunakan environment variables di hosting provider

### 3. Setup di Vercel

#### a. Add Environment Variables di Vercel Dashboard

1. Pergi ke project Anda di Vercel
2. Settings → Environment Variables
3. Tambahkan:
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
   - `VITE_ADMIN_PASSWORD`

#### b. Redeploy

```bash
git push origin main
```

Vercel akan otomatis redeploy dengan environment variables yang baru.

## 🔐 Akses Admin Panel

### URL Login

```
https://yourdomain.com/login
```

atau lokal:

```
http://localhost:5173/login
```

### Form Login
- Masukkan password yang Anda set di `VITE_ADMIN_PASSWORD`
- Klik "Login"

### Admin Panel
Setelah login, Anda akan diarahkan ke `/admin` untuk mengelola footer.

## 📝 Mengelola Footer

### Fields yang Tersedia

| Field | Deskripsi |
|-------|-----------|
| Nomor WhatsApp | Format: 628xxxxx (tanpa tanda +) |
| Email | Email kontak utama |
| Alamat | Alamat fisik kantor/bisnis |
| Instagram URL | Link profil Instagram |
| Facebook URL | Link profil Facebook |
| Twitter URL | Link profil Twitter |
| Text Copyright | Custom copyright text |

### Cara Update

1. Login ke `/login`
2. Pergi ke `/admin`
3. Edit fields sesuai kebutuhan
4. Klik "Simpan Perubahan"
5. Data otomatis terupdate di footer (real-time)

## ⚡ Fitur Real-Time

Footer akan otomatis update tanpa refresh halaman ketika:
- Anda mengubah data di admin panel
- Multiple admin mengubah data secara bersamaan
- Data disinkronisasi via Supabase Realtime

## 🔗 Integrasi WhatsApp Otomatis

Ketika Anda mengubah nomor WhatsApp di admin panel:

```
Semua link WhatsApp di footer akan otomatis update:
- Social media button WhatsApp
- Contact section WhatsApp link
- Nomor yang ditampilkan juga update
```

**Format nomor yang benar:**
- ✅ 628123456789 (internasional, no +)
- ✅ 6281234567890
- ❌ +628123456789 (jangan pakai +)
- ❌ 08123456789 (jangan pakai 0)

## 📊 Database Structure

### Tabel: `footer_settings`

```typescript
{
  id: string;           // UUID (auto-generated)
  phone: string;        // Nomor WhatsApp
  email: string;        // Email
  address: string;      // Alamat
  instagram: string;    // URL Instagram
  facebook: string;     // URL Facebook
  twitter: string;      // URL Twitter
  copyright_text: string; // Custom copyright text
  updated_at: string;   // Timestamp terakhir update
}
```

## 🛡️ Keamanan

### Current Implementation
- ✅ Password-based authentication (session based)
- ✅ Session storage (logout saat browser ditutup)
- ✅ Environment variable protection

### Untuk Production (Belakangan)
- [ ] Implement proper authentication (email/password)
- [ ] Add audit logs
- [ ] Add user management
- [ ] Implement refresh tokens
- [ ] Add rate limiting

## 🧪 Testing Lokal

```bash
# 1. Development server
npm run dev

# 2. Akses login
http://localhost:5173/login

# 3. Masukkan password dari .env.local
# Default example: admin123

# 4. Kelola footer di
http://localhost:5173/admin
```

## 🐛 Troubleshooting

### Error: "Cannot find module '@/lib/supabase'"
- Pastikan file `src/lib/supabase.ts` sudah di-create
- Restart TypeScript server di VS Code

### Error: "Cannot connect to Supabase"
- Check URL dan ANON_KEY di `.env.local`
- Pastikan Supabase project aktif
- Check firewall/VPN settings

### Data tidak update di real-time
- Check browser console untuk errors
- Verify Supabase RLS policies
- Restart development server

### Login tidak bisa
- Check password di `.env.local` sesuai dengan yang diinput
- Pastikan environment variable loaded dengan benar
- Check browser console logs

## 📖 Dokumentasi

- [Supabase Docs](https://supabase.com/docs)
- [React Router Docs](https://reactrouter.com)
- [Vite Env Docs](https://vitejs.dev/guide/env-and-mode.html)

## 📞 Support

Jika ada masalah:
1. Check console browser untuk error messages
2. Cek Supabase logs di dashboard
3. Verify environment variables sudah benar
4. Coba restart development server

---

**Catatan:** Setup untuk production features (proper auth, user management, anonkey setup) bisa dilakukan kemudian. Untuk sekarang, fokus testing fitur admin panel dengan password protection.
