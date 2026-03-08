# Setup Database Logo Links - DigiMagang

## 📋 Panduan Lengkap

### 1. **Setup Database di Supabase**

#### Langkah 1: Buka Supabase Console
- Login ke [Supabase Dashboard](https://supabase.com)
- Pilih project DigiMagang Anda
- Pergi ke **SQL Editor**

#### Langkah 2: Jalankan SQL Script
1. Klik **"New Query"**
2. Copy-paste seluruh kode dari file `DATABASE_LOGO_LINKS.sql`
3. Klik **"Run"** button atau tekan `Ctrl+Enter`

**Atau gunakan file langsung:**
```bash
# File: DATABASE_LOGO_LINKS.sql sudah tersedia di root project
```

### 2. **Verifikasi Database Berhasil Dibuat**

Jalankan query berikut di Supabase SQL Editor untuk melihat data:

```sql
-- Lihat semua social links
SELECT * FROM social_links WHERE type = 'social' ORDER BY display_order;

-- Lihat semua quick links
SELECT * FROM social_links WHERE type = 'quick_link' ORDER BY display_order;
```

### 3. **Struktur Tabel `social_links`**

| Column | Type | Deskripsi |
|--------|------|-----------|
| `id` | BIGINT | ID unik (auto-generated) |
| `type` | VARCHAR | `'social'` atau `'quick_link'` |
| `name` | VARCHAR | Nama yang deskriptif (Instagram, Facebook, dll) |
| `url` | VARCHAR | URL link (http://...) |
| `icon_type` | VARCHAR | Tipe icon: `instagram`, `facebook`, `twitter`, `whatsapp`, `email`, `link` |
| `label` | VARCHAR | Text yang ditampilkan |
| `display_order` | INT | Urutan tampilan (1, 2, 3, ...) |
| `is_active` | BOOLEAN | Aktif/nonaktif link |
| `created_at` | TIMESTAMP | Waktu dibuat (auto) |
| `updated_at` | TIMESTAMP | Waktu diupdate (auto) |

### 4. **Mengelola Links dari Admin Panel**

#### Update/Edit Link
```sql
-- Contoh: Update Instagram URL
UPDATE social_links 
SET url = 'https://instagram.com/your_new_handle' 
WHERE name = 'Instagram';

-- Contoh: Update WhatsApp number
UPDATE social_links 
SET url = 'https://wa.me/+6281234567890' 
WHERE name = 'WhatsApp';

-- Contoh: Disable Twitter
UPDATE social_links 
SET is_active = FALSE 
WHERE name = 'Twitter';
```

#### Tambah Link Baru
```sql
INSERT INTO social_links (type, name, url, icon_type, label, display_order, is_active) 
VALUES 
('social', 'TikTok', 'https://tiktok.com/@digimagang', 'link', 'TikTok', 6, TRUE),
('quick_link', 'Blog', '/blog', 'link', 'Blog Kami', 5, TRUE);
```

### 5. **Frontend Implementation**

Komponen `FooterSection.tsx` sudah diupdate untuk:
- ✅ Fetch social links dari database
- ✅ Fetch quick links dari database
- ✅ Real-time sync dengan Supabase
- ✅ Fallback ke hardcoded data jika database kosong
- ✅ Dynamic icon rendering berdasarkan `icon_type`

### 6. **Testing**

1. **Jalankan aplikasi:**
   ```bash
   npm run dev
   ```

2. **Lihat footer** - harusnya menampilkan links dari database

3. **Update database:**
   ```sql
   UPDATE social_links 
   SET label = 'Instagram Kami' 
   WHERE name = 'Instagram';
   ```

4. **Lihat real-time update** - perubahan langsung muncul di footer tanpa reload!

### 7. **Troubleshooting**

#### Footer tidak menampilkan links
- ✅ Pastikan `DATABASE_LOGO_LINKS.sql` sudah dijalankan di Supabase
- ✅ Cek Supabase credentials di `.env.local`
- ✅ Buka DevTools Console (F12) untuk melihat error

#### RLS (Row Level Security) Error
- Pastikan RLS policy sudah aktif untuk table `social_links`
- Run SQL script ulang jika belum

#### Real-time tidak working
- Cek bahwa Realtime sudah enabled di Supabase settings
- Buka browser console untuk error details

### 8. **Kolaborasi dengan Admin Panel**

Di masa depan, bisa buat admin panel untuk mengelola links:

```typescript
// Contoh cara update dari UI
const updateLink = async (id: number, url: string) => {
  const { error } = await supabase
    .from('social_links')
    .update({ url })
    .eq('id', id);
  
  if (error) console.error('Update failed:', error);
};
```

## 📝 Data yang Sudah Diinisialisasi

### Social Links:
- Instagram
- WhatsApp
- Email
- Facebook
- Twitter (inactive)

### Quick Links:
- Tentang Program
- Kurikulum
- Sistem Komisi
- FAQ

## 🔄 Sinkronisasi Real-time

Perubahan di database otomatis sync ke frontend karena:
- ✅ Table memiliki `ALTER TABLE social_links REPLICA IDENTITY FULL`
- ✅ Frontend subscribe ke channel `social_links_channel`
- ✅ Update/Insert/Delete langsung trigger UI refresh

---

**Selesai!** 🎉 Logo links sekarang fully dynamic dan manageable dari database Supabase.
