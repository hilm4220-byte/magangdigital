# Supabase Keep-Alive Setup

Mencegah Supabase project dari Paused State (free tier di-pause setelah 1 minggu inactivity).

## 🚀 Solusi 1: GitHub Actions (RECOMMENDED)

Paling simple dan gratis!

### Setup:

1. **File sudah dibuat:** `.github/workflows/keep-alive.yml`

2. **Push ke GitHub:**
```bash
git add .github/workflows/keep-alive.yml
git commit -m "Add Supabase keep-alive cron job"
git push origin main
```

3. **Verify di GitHub:**
   - Buka repository di GitHub
   - Pilih tab **Actions**
   - Cari workflow **"Supabase Keep Alive"**
   - Status seharusnya **"All workflows have completed successfully"** ✅

4. **Cron Schedule:**
   - Setiap hari jam 9:00 UTC
   - Bisa customize di file `.github/workflows/keep-alive.yml` line 10
   - Format: `'Minute Hour DayOfMonth Month DayOfWeek'`

### Contoh Cron Schedule:

```yaml
# Setiap hari jam 9 pagi UTC
- cron: '0 9 * * *'

# Setiap hari jam 00:00 (tengah malam)
- cron: '0 0 * * *'

# Setiap 6 jam
- cron: '0 0,6,12,18 * * *'

# Setiap hari kerja pukul 8 pagi
- cron: '0 8 * * 1-5'
```

---

## 🚀 Solusi 2: Vercel Cron (Jika Deploy ke Vercel)

Untuk menjaga aktifitas juga dari sisi Vercel deployment.

### Setup:

1. **File sudah dibuat:** `api/cron.ts`

2. **Set Environment Variable di Vercel:**
   - Buka Vercel Dashboard → **Settings** → **Environment Variables**
   - Tambah variable:
     - Name: `CRON_SECRET`
     - Value: `your_secret_key_here` (apa saja, buat sendiri)
     - Environments: Production ✅

3. **Push ke GitHub:**
```bash
git add api/cron.ts
git commit -m "Add Vercel cron endpoint"
git push origin main
```

4. **Vercel akan auto-trigger:**
   - Setiap hari jam 9:00 UTC
   - Bisa lihat logs di Vercel Dashboard → **Functions**

### Custom Cron Schedule di Vercel:

Edit `api/cron.ts` line terakhir:
```typescript
export const config = {
  crons: ['0 9 * * *'],  // Setiap hari jam 9 UTC
};
```

---

## 📊 Perbandingan Solusi

| Fitur | GitHub Actions | Vercel Cron |
|-------|---|---|
| Setup | Mudah | Medium |
| Gratis | ✅ Ya | ✅ Ya |
| Reliability | Very High | High |
| Monitoring | GitHub Actions tab | Vercel Dashboard |
| Cocok untuk | Semua project | Project di Vercel |

**Rekomendasi:** Gunakan **GitHub Actions** (lebih simple) + **Vercel Cron** (double backup).

---

## ✅ Cara Verify Sudah Jalan

### GitHub Actions:
1. Buka **GitHub Repository** → **Actions** tab
2. Lihat workflow **"Supabase Keep Alive"**
3. Klik untuk lihat logs
4. Status: 🟢 Success

### Vercel Cron:
1. Buka **Vercel Dashboard** → **Project Settings**
2. Scroll ke **Cron Jobs** section
3. Seharusnya terlihat cron job yang scheduled

---

## 🔒 Security

**Jangan expose secrets!** File ini sudah aman karena:
- GitHub Actions: Menggunakan `${{ secrets.VITE_SUPABASE_ANON_KEY }}`
- Vercel: CRON_SECRET di-set di environment variables (hidden)

---

## 📝 Troubleshooting

### Workflow tidak jalan?
1. Check GitHub Actions tab untuk errors
2. Pastikan `.github/workflows/keep-alive.yml` syntax benar (YAML spacing penting!)
3. Pastikan `VITE_SUPABASE_ANON_KEY` benar

### Vercel Function 404?
1. Pastikan folder `api/` ada di root project
2. Pastikan file `api/cron.ts` tidak error
3. Tunggu ~1-2 menit setelah push untuk Vercel deploy

### Masih di-pause juga?
1. Check apakah request benar-benar di-execute (lihat logs)
2. Mungkin perlu run lebih sering (3x sehari) - edit cron schedule
3. Manual trigger dari GitHub Actions tab untuk test

---

## 🎯 Best Practice

1. **Gunakan GitHub Actions** sebagai primary
2. **Tambah Vercel Cron** sebagai double backup
3. **Monitor logs** setiap minggu di GitHub Actions
4. **Test manual** dari GitHub Actions tab (tombol "Run workflow")

---

**Last Updated:** March 2026
**Purpose:** Prevent Supabase Free Tier from being paused due to inactivity
