# 📊 Database Schema Setup - Step by Step

Panduan lengkap untuk membuat database di Supabase yang cocok dengan aplikasi DigiMagang.

---

## 🎯 Quick Start (Singkat)

1. **Buka Supabase Dashboard**
   - Login ke https://supabase.com
   - Pilih project Anda

2. **Go to SQL Editor**
   - Klik `SQL Editor` di sidebar kiri
   - Klik `New Query`

3. **Copy & Paste SQL**
   - Buka file `DATABASE_SCHEMA.sql` di project
   - Copy semua kode
   - Paste ke Supabase SQL Editor
   - Klik `RUN` (tombol hijau)

4. **Done! ✓**
   - Table `footer_settings` sudah terbuat
   - Data initial sudah ter-insert
   - Real-time dan RLS policy sudah aktif

---

## 📋 File yang Dibutuhkan

📁 **DATABASE_SCHEMA.sql** - Lengkap dengan:
- ✅ Table creation
- ✅ RLS policies
- ✅ Real-time config
- ✅ Initial data
- ✅ Auto-update timestamp trigger

---

## 🔍 Penjelasan Detail

### 1. **CREATE TABLE footer_settings**

```sql
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
```

**Kolom:**
| Field | Type | Purpose |
|-------|------|---------|
| `id` | BIGINT | Primary key (auto-increment) |
| `phone` | VARCHAR(20) | Nomor WhatsApp kontak |
| `email` | VARCHAR(100) | Email kontak |
| `address` | TEXT | Alamat fisik kantor |
| `instagram` | VARCHAR(255) | URL Instagram profile |
| `facebook` | VARCHAR(255) | URL Facebook profile |
| `twitter` | VARCHAR(255) | URL Twitter/X profile |
| `copyright` | TEXT | Text copyright di footer |
| `created_at` | TIMESTAMP | Auto set saat create |
| `updated_at` | TIMESTAMP | Auto update saat edit |

---

### 2. **ENABLE REAL-TIME**

```sql
ALTER TABLE footer_settings REPLICA IDENTITY FULL;
```

**Fungsi:**
- Mengaktifkan real-time subscription
- Frontend bisa mendengarkan perubahan dengan `.on('*')`
- Saat admin mengubah data, landing page update otomatis

---

### 3. **ENABLE ROW LEVEL SECURITY (RLS)**

```sql
ALTER TABLE footer_settings ENABLE ROW LEVEL SECURITY;
```

**Fungsi:**
- Mengaktifkan RLS policies
- Mengatur siapa yang bisa baca/edit/delete data
- Lebih aman dari public access

**Policies yang dibuat:**
```
┌─────────────────────────────────────────────┐
│ All users (anonymous)                       │
├─────────────────────────────────────────────┤
│ ✅ SELECT - Bisa baca (untuk landing page) │
│ ✅ UPDATE - Bisa edit (password di app)    │
│ ✅ INSERT - Bisa insert (password di app)  │
│ ✅ DELETE - Bisa delete (password di app)  │
└─────────────────────────────────────────────┘
```

**Catatan:**
- Password check dilakukan di aplikasi (`VITE_ADMIN_PASSWORD`)
- Bukan di database (lebih fleksibel)
- Semua policies ALLOW (trust aplikasi untuk validasi)

---

### 4. **INSERT INITIAL DATA**

```sql
INSERT INTO footer_settings (
  phone, email, address, instagram, facebook, twitter, copyright
) VALUES (
  '+6281234567890',
  'info@digimagang.id',
  'Jakarta, Indonesia',
  'https://instagram.com/digimagang',
  'https://facebook.com/digimagang',
  'https://twitter.com/digimagang',
  '© 2026 DigiMagang. All rights reserved.'
);
```

**Hasil:**
- 1 row inserted dengan default values
- ID akan auto-generate (biasanya id = 1)
- `created_at` dan `updated_at` otomatis set ke current timestamp

---

### 5. **AUTO-UPDATE TIMESTAMP TRIGGER**

```sql
CREATE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = CURRENT_TIMESTAMP;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_footer_settings_timestamp
  BEFORE UPDATE ON footer_settings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
```

**Fungsi:**
- Setiap kali ada UPDATE, kolom `updated_at` otomatis di-set ke waktu sekarang
- Tidak perlu di-set manual dari aplikasi
- Berguna untuk tracking perubahan terakhir

**Contoh:**
```
Data awalnya:
- updated_at: 2026-02-27 10:00:00

Admin ubah phone:
- updated_at: otomatis menjadi 2026-02-27 10:05:30
```

---

## 🚀 Cara Run di Supabase

### Step 1: Buka Supabase Dashboard
```
https://supabase.com/dashboard
→ Pilih project Anda
```

### Step 2: Go to SQL Editor
```
sidebar kiri → SQL Editor
→ Klik "New Query"
```

### Step 3: Copy Semua SQL
```
Buka DATABASE_SCHEMA.sql
Ctrl+A untuk select semua
Ctrl+C untuk copy
```

### Step 4: Paste ke Supabase
```
Paste ke SQL Editor Supabase
Ctrl+V
```

### Step 5: Run Query
```
Klik tombol "RUN" (biru hijau di kanan atas)
Tunggu sampai selesai
```

### Step 6: Verify
```
Klik "Table Editor" di sidebar
Lihat apakah "footer_settings" muncul
Klik tabel untuk lihat data
```

---

## ✅ Verification Checklist

Setelah run SQL, pastikan:

- [ ] **Table Created**
  - Go to `Table Editor`
  - Lihat apakah `footer_settings` ada di list

- [ ] **Columns Correct**
  - Klik `footer_settings`
  - Pastikan ada kolom: phone, email, address, instagram, facebook, twitter, copyright, created_at, updated_at

- [ ] **Data Inserted**
  - Lihat apakah ada 1 row dengan data default
  - phone = '+6281234567890'
  - email = 'info@digimagang.id'

- [ ] **RLS Enabled**
  - Klik `footer_settings`
  - Go to `Auth` tab
  - Pastikan RLS toggle = ON (biru)

- [ ] **Real-time Enabled**
  - Go to `Replication` tab
  - Pastikan `footer_settings` ada di list

---

## 🧪 Testing Database

Setelah setup, test dengan queries:

### Test 1: Read Data
```sql
SELECT * FROM footer_settings;
```
**Expected:** 1 row muncul dengan data default

### Test 2: Update Phone
```sql
UPDATE footer_settings 
SET phone = '+628987654321' 
WHERE id = 1;
```
**Expected:** Updated successfully

### Test 3: Check Update
```sql
SELECT * FROM footer_settings WHERE id = 1;
```
**Expected:** 
- phone = '+628987654321' (updated)
- updated_at = waktu sekarang (auto-updated)

### Test 4: Update Email
```sql
UPDATE footer_settings 
SET email = 'contact@digimagang.com' 
WHERE id = 1;
```
**Expected:** Updated successfully

---

## 🔗 Connection ke Aplikasi

Setelah database siap, aplikasi akan:

### 1. **Read Data** (Landing Page)
```
FooterSection.tsx
  ↓
useEffect: fetch from supabase
  ↓
SELECT * FROM footer_settings
  ↓
Display di footer
```

### 2. **Subscribe Real-time** (Landing Page)
```
FooterSection.tsx
  ↓
useEffect: listen to changes
  ↓
REALTIME from footer_settings
  ↓
Auto-update saat admin ubah
```

### 3. **Update Data** (Admin Panel)
```
AdminPanel.tsx
  ↓
User ubah form + klik Save
  ↓
UPDATE footer_settings SET ...
  ↓
Database updated
  ↓
Landing page auto-refresh
```

---

## 📊 Data Flow

```
Admin Panel (AdminPanel.tsx)
    ↓
Form dengan 7 fields
    ↓
User ubah & klik "Simpan"
    ↓
UPDATE footer_settings (di Supabase)
    ↓
Database berubah
    ↓
Real-time subscription trigger
    ↓
Landing Page (FooterSection.tsx)
    ↓
State update otomatis
    ↓
Footer render dengan data baru
    ↓
User lihat perubahan realtime ✓
```

---

## 🛠️ Maintenance

### Backup Data
```sql
-- Export data
SELECT * FROM footer_settings;
-- Manual copy ke text file
```

### Reset ke Default
```sql
UPDATE footer_settings 
SET 
  phone = '+6281234567890',
  email = 'info@digimagang.id',
  address = 'Jakarta, Indonesia',
  instagram = 'https://instagram.com/digimagang',
  facebook = 'https://facebook.com/digimagang',
  twitter = 'https://twitter.com/digimagang',
  copyright = '© 2026 DigiMagang. All rights reserved.'
WHERE id = 1;
```

### Check Update History
```sql
SELECT id, updated_at, phone 
FROM footer_settings 
ORDER BY updated_at DESC;
```

---

## 🐛 Troubleshooting

### Problem: "Table already exists"
**Solution:** SQL sudah pernah di-run. Abaikan, atau:
```sql
DROP TABLE footer_settings;
-- Lalu run ulang
```

### Problem: "id does not exist"
**Solution:** Table belum di-create. Run SQL lagi.

### Problem: Real-time tidak jalan
**Solution:** Pastikan REPLICA IDENTITY FULL sudah di-run:
```sql
ALTER TABLE footer_settings REPLICA IDENTITY FULL;
```

### Problem: RLS error saat fetch
**Solution:** Pastikan RLS policies sudah aktif:
```sql
-- Check status
SELECT * FROM pg_policies WHERE tablename = 'footer_settings';
-- Harus ada 4 policies
```

---

## 📝 Summary

| Step | Status | Command |
|------|--------|---------|
| 1. Copy SQL | ✅ | Buka DATABASE_SCHEMA.sql |
| 2. Paste to Supabase | ✅ | SQL Editor → New Query |
| 3. Run SQL | ✅ | Klik tombol RUN |
| 4. Verify Table | ✅ | Table Editor → footer_settings |
| 5. Check Data | ✅ | 1 row default data muncul |
| 6. Test Update | ✅ | Run test queries |
| 7. Enable Real-time | ✅ | Replication settings |
| 8. Test from App | ✅ | npm run dev + test |

**Total Time:** ~5 menit untuk setup + verify

---

## 🎉 Next Steps

1. **Copy SQL dan Run di Supabase** ← Anda di sini
2. Verify table & data created ✓
3. Restart dev server: `npm run dev`
4. Test login: `http://localhost:5173/login`
5. Test admin panel: `http://localhost:5173/admin`
6. Test real-time: ubah data di admin, lihat landing page update

**All files siap!** 🚀
