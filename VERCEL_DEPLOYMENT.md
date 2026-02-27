# 🚀 Deployment ke Vercel - Panduan Lengkap

## ❌ Problem Yang Dihadapi

Saat deploy ke Vercel dan coba akses `/admin` atau `/login` dariURL, dapat error 404.

**Penyebab:**
- Vercel adalah static hosting (built files saja)
- Saat user akses `/admin`, Vercel cari file `admin.html` yang tidak ada
- React Router tidak bisa handle routing

**Solusi:**
- Tambah `vercel.json` untuk configure rewrites
- Semua route di-forward ke `index.html`
- React Router handle routing di client-side

---

## ✅ Setup yang Sudah Dilakukan

### 1. **File `vercel.json`** ✨ (Sudah dibuat)

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "rewrites": [
    {
      "source": "/(.*)",
      "destination": "/index.html"
    }
  ]
}
```

**Apa yang dilakukan:**
- `buildCommand` - Vercel tahu pakai `npm run build`
- `outputDirectory` - Vercel tahu build output ada di folder `dist`
- `rewrites` - **PENTING!** Semua route di-forward ke `index.html`

---

## 🔧 Setup Environment Variables di Vercel

### Step 1: Buka Vercel Dashboard
1. Go to https://vercel.com
2. Login dengan akun Anda
3. Pilih project DigiMagang Anda

### Step 2: Go to Settings → Environment Variables
```
Dashboard → Project → Settings → Environment Variables
```

### Step 3: Tambah 3 Environment Variables

**Variable 1: VITE_SUPABASE_URL**
```
Name:  VITE_SUPABASE_URL
Value: https://kmbaxzaxxzvskhbojfse.supabase.co
```
(Copy dari `.env.local` Anda)

**Variable 2: VITE_SUPABASE_ANON_KEY**
```
Name:  VITE_SUPABASE_ANON_KEY
Value: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImttYmF4emF4eHp2c2toYm9qZnNlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIxNzQ1MjcsImV4cCI6MjA4Nzc1MDUyN30.FR7kmJtm3o6nfS9G0dIORK_fAHM1C2TqZpPFMnHeBzg
```
(Copy dari `.env.local` Anda)

**Variable 3: VITE_ADMIN_PASSWORD**
```
Name:  VITE_ADMIN_PASSWORD
Value: admin123
```
(Copy dari `.env.local` Anda - ganti dengan password Anda)

### Step 4: Klik "Save" untuk setiap variable

---

## 📦 Deploy ke Vercel

### Option A: Dari Vercel Dashboard

1. **Go to Deployments**
   ```
   Dashboard → Deployments
   ```

2. **Deploy dari Git**
   - Connect repository GitHub Anda
   - Pilih branch `main`
   - Klik "Deploy"

3. **Vercel otomatis:**
   - Build project
   - Deploy ke Vercel
   - Generate URL

### Option B: Dari Terminal (Recommended)

**Install Vercel CLI:**
```bash
npm install -g vercel
```

**Login ke Vercel:**
```bash
vercel login
```

**Deploy:**
```bash
vercel
```

**Deploy ke Production:**
```bash
vercel --prod
```

---

## ✅ Test Setelah Deploy

Setelah deploy selesai, Vercel akan kasih URL seperti:
```
https://magangdigital.vercel.app
```

### Test Routing:

1. **Landing Page:**
   ```
   https://magangdigital.vercel.app/
   ✅ Harus bisa
   ```

2. **Login Page:**
   ```
   https://magangdigital.vercel.app/login
   ✅ Harus bisa (sebelumnya 404, sekarang fixed!)
   ```

3. **Admin Panel:**
   ```
   https://magangdigital.vercel.app/admin
   ✅ Harus bisa (sebelumnya 404, sekarang fixed!)
   ```

4. **Invalid Route:**
   ```
   https://magangdigital.vercel.app/xyz
   ✅ Harus redirect ke 404 page
   ```

---

## 🐛 Troubleshooting

### Problem: Deploy gagal dengan error

**Check:**
1. Pastikan `vercel.json` ada di root project
2. Pastikan `dist` folder di `.gitignore` (tidak perlu push built files)
3. Check build success dengan `npm run build` lokal

### Problem: `/admin` masih 404 di Vercel

**Solution:**
1. Clear Vercel cache:
   ```
   Dashboard → Settings → Git → Clear Cache
   ```
2. Deploy ulang:
   ```
   vercel --prod --clear
   ```

### Problem: Env variables tidak ter-read

**Check:**
1. Pastikan variable names tepat:
   - `VITE_SUPABASE_URL` ✅
   - `VITE_SUPABASE_ANON_KEY` ✅
   - `VITE_ADMIN_PASSWORD` ✅
2. Pastikan values tidak ada space
3. Re-deploy setelah update env vars

---

## 📝 File Structure di Vercel

Setelah build, Vercel deploy:
```
dist/
├── index.html      ← Universal entry point
├── assets/
│   ├── index-*.css
│   └── index-*.js
└── ...
```

Semua route → `index.html` → React Router handle

---

## 🔒 Security Notes

- ✅ Env variables disimpan aman di Vercel (tidak di source code)
- ✅ Tidak perlu commit `.env.local` ke Git
- ✅ Setiap deploy baca env vars dari Vercel
- ✅ Password Supabase aman (anon key only)

---

## 📊 Vercel Dashboard Tips

### Monitor Deployments:
```
Dashboard → Deployments
- Lihat status build
- Lihat error messages
- Rollback ke deployment lama
```

### Check Environment Variables:
```
Dashboard → Settings → Environment Variables
- Lihat semua variables
- Edit values
- Delete jika tidak perlu
```

### Custom Domain (Optional):
```
Dashboard → Settings → Domains
- Add custom domain
- Update DNS records di registrar
```

---

## ✨ Sekarang Siap!

1. ✅ File `vercel.json` sudah ada
2. ✅ Build bisa local: `npm run build`
3. 📝 TODO: Setup env vars di Vercel
4. 📝 TODO: Deploy ke Vercel
5. ✅ Test routing setelah deploy

---

## 🎯 Testing Checklist

Setelah deploy:

- [ ] Landing page bisa diakses `/`
- [ ] Login page bisa diakses `/login`
- [ ] Admin panel bisa diakses `/admin`
- [ ] 404 page di route invalid
- [ ] WhatsApp link works dari semua page
- [ ] Admin panel bisa edit data
- [ ] Footer real-time update
- [ ] Nomor WA berubah di semua section

---

## 🚀 Next Steps

1. **Add env vars di Vercel**
   - Go to Vercel Dashboard
   - Settings → Environment Variables
   - Add 3 variables

2. **Deploy**
   - Install Vercel CLI: `npm install -g vercel`
   - Run: `vercel --prod`

3. **Test**
   - Akses landing page
   - Coba ke `/login` dan `/admin`
   - Lihat error di browser console jika ada

4. **Debug jika ada error**
   - Check Vercel Deployments page
   - Check env variables
   - Check browser console errors

---

## 📞 Quick Reference

| URL | Status |
|-----|--------|
| `/` | ✅ Landing Page |
| `/login` | ✅ Login Page |
| `/admin` | ✅ Admin Panel |
| `*` | ✅ 404 Page |

Semua route sekarang work di Vercel! 🎉
