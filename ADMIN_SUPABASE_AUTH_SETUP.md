# Supabase Authentication Setup

Panduan setup admin authentication menggunakan built-in Supabase Authentication.

## 📋 Overview

Login admin sekarang menggunakan:
- ✅ Supabase Authentication (built-in)
- ✅ Email sebagai username
- ✅ Password management by Supabase
- ✅ Session management otomatis
- ✅ Real-time auth state checking

## 🚀 Langkah-Langkah Setup

### 1. Buat Admin User di Supabase

1. Buka Supabase Dashboard
2. Pilih menu **Authentication** → **Users**
3. Klik tombol **"Create new user"** / **"Add user"**
4. Isi form:
   - **Email**: `admin@digimagang.id` (ganti dengan email Anda)
   - **Password**: Buat password yang kuat
   - **Confirm password**: Ulangi password
   - **Auto Confirm user**: Toggle ON (agar user langsung aktif)

5. Klik **"Create user"**

### 2. Test Login

1. Jalankan development server:
```bash
npm run dev
```

2. Buka http://localhost:5173/login

3. Login dengan:
   - Email: Email yang Anda buat di Supabase
   - Password: Password yang Anda set

4. Jika berhasil, akan redirect ke `/admin` ✅

## 🔐 Security Features

- ✅ Password di-hash dan di-manage oleh Supabase
- ✅ Automatic logout ketika close browser
- ✅ Real-time auth state checking
- ✅ Auto redirect ke login jika session tidak valid
- ✅ RLS policies support untuk advanced security

## 👥 Menambah Admin User Baru

1. Di Supabase Dashboard → **Authentication** → **Users**
2. Klik **"Create new user"**
3. Isi email dan password
4. Klik **"Create user"**

User akan mendapat email konfirmasi (jika enabled di Supabase settings).

## 🔄 Reset Password User

Jika user lupa password:

1. Di Supabase Dashboard → **Authentication** → **Users**
2. Cari user yang lupa password
3. Klik **menu 3 titik** di user tersebut
4. Pilih **"Reset password"**
5. User akan menerima email reset password

## ⚠️ Disable/Remove Admin User

### Disable (User tetap ada, tapi tidak bisa login)
1. Di Supabase Dashboard → **Authentication** → **Users**
2. Cari user
3. Klik **menu 3 titik**
4. Pilih **"Disable user"**

### Delete (Hapus user sepenuhnya)
1. Di Supabase Dashboard → **Authentication** → **Users**
2. Cari user
3. Klik **menu 3 titik**
4. Pilih **"Delete user"**

## 🧪 Testing

### Test 1: Login dengan credentials benar
- Email: Email yang terdaftar
- Password: Password yang terdaftar
- Expected: Redirect ke /admin ✅

### Test 2: Login dengan email salah
- Email: wrong@email.com
- Password: (apapun)
- Expected: Error "Email atau password salah" ✅

### Test 3: Login dengan password salah
- Email: Email yang terdaftar
- Password: wrong_password
- Expected: Error "Email atau password salah" ✅

### Test 4: Logout
- Klik tombol "Logout" di admin panel
- Expected: Redirect ke /login ✅
- Akses /admin langsung → redirect ke /login ✅

## 📊 Fitur Supabase Auth

### Email Verification
Opsi untuk mengirim email konfirmasi saat user baru dibuat.

Settings di Supabase Dashboard:
- **Authentication** → **Providers** → **Email**
- Toggle "Confirm email"

### Rate Limiting
Supabase sudah built-in protection terhadap brute force attacks.

### Session Management
- Session otomatis tersimpan di browser
- Berlaku selama user tidak logout
- Hapus session: Logout atau tutup browser

### Multi-device Login
User bisa login dari multiple devices secara bersamaan.

## 🔐 Best Practices

1. **Buat Password Kuat**
   - Minimal 8 karakter
   - Mix: huruf, angka, simbol
   - Contoh: `MyAdm1n@2025!`

2. **Jangan Share Credentials**
   - Setiap admin harus punya akun sendiri
   - Audit log ada di Supabase

3. **Monitor User Activity**
   - Check "Last sign in" di Supabase Dashboard
   - Monitor inactive users

4. **Backup Recovery Email**
   - Pastikan email yang digunakan aktif
   - Untuk reset password berlanjut

## 🐛 Troubleshooting

### Error: "Email atau password salah"
Kemungkinan:
1. Email belum terdaftar di Supabase
2. Password salah
3. User sudah di-disable di Supabase

Solusi:
- Check di Supabase Dashboard → Authentication → Users
- Pastikan user ada dan status "Active"

### Login page tidak muncul / Blank page
Kemungkinan:
1. Supabase URL atau key tidak configured
2. Network error

Solusi:
- Check file `.env.local` ada VITE_SUPABASE_URL dan VITE_SUPABASE_ANON_KEY
- Check internet connection
- Check browser console untuk error

### Session hilang setelah page refresh
Ini normal jika menggunakan session yang ephemeral.

Untuk persistent login:
```typescript
// Modify to store token di localStorage
const { data } = await supabase.auth.signInWithPassword({...});
localStorage.setItem('authToken', data.session.access_token);
```

## 📝 File-File Updated

- `src/pages/LoginAdmin.tsx` - Login dengan Supabase auth
- `src/pages/AdminPanel.tsx` - Check session dari Supabase
- `DATABASE_ADMIN_AUTH.sql` - Tidak perlu lagi ❌

## ✨ Keuntungan Supabase Auth

- ✅ Tidak perlu manage password hash sendiri
- ✅ Built-in email verification
- ✅ Built-in password reset
- ✅ Built-in session management
- ✅ Multi-factor authentication support (MFA)
- ✅ Social login support (Google, GitHub, dll)
- ✅ Audit logs tercatat otomatis
- ✅ GDPR compliant

## 🔗 Related Documentation

- [ADMIN_SETUP.md](ADMIN_SETUP.md) - Setup keseluruhan admin panel
- [Supabase Auth Docs](https://supabase.com/docs/guides/auth)
- [Supabase Dashboard](https://app.supabase.com)

---

**Last Updated:** February 2025
**Authentication**: Supabase Built-in Auth
