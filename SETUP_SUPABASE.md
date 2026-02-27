# Setup Supabase Credentials

Error yang Anda alami:
```
Uncaught Error: supabaseUrl is required.
```

Ini berarti **environment variables belum dikonfigurasi**. 

## 🚀 Cara Fix (5 Menit)

### Step 1: Buat Supabase Project (Jika Belum Ada)

1. Kunjungi https://supabase.com
2. Klik **Sign In** atau **Sign Up**
3. Klik **New Project**
4. Isi form:
   - **Project Name:** magangdigital (atau nama pilihan Anda)
   - **Database Password:** Buat password kuat
   - **Region:** Pilih yang terdekat (Asia Southeast 1 untuk Indonesia)
5. Klik **Create New Project**
6. **Tunggu 1-2 menit** sampai project selesai dibuat

### Step 2: Dapatkan Credentials

1. Setelah project selesai, pergi ke **Settings** (ikon gear di sidebar)
2. Pilih **API** dari sidebar kiri
3. Copy kedua values ini:

```
📋 Project URL
https://[YOUR-PROJECT-ID].supabase.co

🔑 anon public
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### Step 3: Edit `.env.local`

Di root project Anda, sudah ada file `.env.local`. Edit dengan editor favorit:

```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_ADMIN_PASSWORD=admin123
```

**Contoh lengkap:**
```
VITE_SUPABASE_URL=https://ljhgfjdkshg.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxqaGdmamRrc2hnaiwic2VjcmV0IjoidHlwZXNjcmlwdCJ9.rGhjfkdshfkdsf
VITE_ADMIN_PASSWORD=buatkanjadi123456
```

### Step 4: Buat Database Table

1. Di Supabase Dashboard, pilih **SQL Editor**
2. Klik **New Query** (atau **+** button)
3. Copy-paste query ini:

```sql
-- Create footer_settings table
CREATE TABLE IF NOT EXISTS footer_settings (
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

-- Enable RLS (Row Level Security)
ALTER TABLE footer_settings ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Anyone can read footer_settings"
ON footer_settings FOR SELECT
USING (true);

CREATE POLICY "Anyone can insert footer_settings"
ON footer_settings FOR INSERT
WITH CHECK (true);

CREATE POLICY "Anyone can update footer_settings"
ON footer_settings FOR UPDATE
USING (true);

-- Create initial footer data
INSERT INTO footer_settings (phone, email, address, instagram, facebook, twitter, copyright_text)
VALUES (
  '628123456789',
  'info@digimagang.id',
  'Jl. Contoh No. 123, Kota, Provinsi',
  'https://instagram.com/digimagang',
  'https://facebook.com/digimagang',
  'https://twitter.com/digimagang',
  '© 2026 DigiMagang. All rights reserved.'
);
```

4. Klik **Run** (atau Ctrl+Enter)
5. ✅ Seharusnya berhasil

### Step 5: Restart Development Server

```bash
# Stop dev server (Ctrl+C)
# Restart
npm run dev
```

**Selesai!** Website Anda sekarang terkoneksi ke Supabase.

---

## ❓ Troubleshooting

### Error: "Cannot find module '@supabase/supabase-js'"
```bash
npm install @supabase/supabase-js
```

### Error Masih Muncul Setelah Setup
1. Pastikan `.env.local` sudah di-save
2. Restart dev server: `Ctrl+C` lalu `npm run dev`
3. Clear browser cache: `Ctrl+Shift+Delete`
4. Refresh halaman

### Error: "Invalid API key"
Credentials yang Anda salin mungkin salah:
1. Cek lagi di Supabase Dashboard → Settings → API
2. Pastikan URL dan Key cocok
3. Jangan ada spasi atau quotes tambahan

### Supabase URL tidak valid
Format yang benar:
```
✅ https://ljhgfjdkshg.supabase.co
❌ https://ljhgfjdkshg.supabase.co/
❌ https://ljhgfjdkshg.supabase.com (salah domain)
```

### Key tidak valid
- Pastikan Anda copy dari "**anon public**", bukan "service_role"
- Length harus ~200+ karakter, bukan cuma beberapa karakter
- Jangan ada line breaks atau spasi

---

## 📝 Checklist

- [ ] Buat Supabase project
- [ ] Copy Project URL
- [ ] Copy Anon Public Key
- [ ] Edit `.env.local`
- [ ] Paste URL ke `VITE_SUPABASE_URL`
- [ ] Paste Key ke `VITE_SUPABASE_ANON_KEY`
- [ ] Set `VITE_ADMIN_PASSWORD` ke password pilihan
- [ ] Save `.env.local`
- [ ] Buat SQL table di Supabase
- [ ] Restart dev server
- [ ] Test di browser: http://localhost:5173

---

## 🎯 Verifikasi Setup

Setelah setup, Anda seharusnya bisa:

1. ✅ Akses `/login` → login page muncul
2. ✅ Login dengan password dari `VITE_ADMIN_PASSWORD`
3. ✅ Akses `/admin` → admin panel muncul
4. ✅ Edit footer data → data tersimpan di Supabase
5. ✅ Lihat update di footer website (real-time)

Jika semua berjalan, Anda berhasil! 🎉

---

## 📚 Dokumentasi Lengkap

- Lihat `ADMIN_SETUP.md` untuk setup detail
- Lihat `QUICK_START.md` untuk quick reference
- Lihat `FOOTER_UPDATE.md` untuk fitur real-time

---

## 💡 Tips

1. **Jangan comit `.env.local`** ke Git (add ke `.gitignore`)
2. **Untuk production (Vercel)**, set environment variables di Vercel dashboard
3. **Jangan share credentials** dengan orang lain
4. **Backup credentials** Anda di tempat aman
5. **RLS policies** sudah dikonfigurasi untuk public read/write (OK untuk sekarang, nanti bisa dibatasi)

---

**Setelah selesai, kirim saya pesan jika masih ada error!** 🚀
