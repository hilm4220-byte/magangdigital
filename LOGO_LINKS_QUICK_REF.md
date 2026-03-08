# 🎯 Quick Reference - Logo Links Database

## 📦 Files Created/Updated

### New Files:
✅ `DATABASE_LOGO_LINKS.sql` - SQL script untuk create table  
✅ `LOGO_LINKS_SETUP.md` - Dokumentasi lengkap  
✅ `src/hooks/useSocialLinks.ts` - Reusable hook  
✅ `src/lib/socialLinksService.ts` - Admin service  

### Updated Files:
✅ `src/components/sections/FooterSection.tsx` - Integrated with database  

---

## 🚀 Quick Start (3 Langkah)

### 1️⃣ Jalankan SQL Script
```
Supabase → SQL Editor → Paste isi DATABASE_LOGO_LINKS.sql → Run
```

### 2️⃣ Verifikasi
```sql
SELECT * FROM social_links;
```

### 3️⃣ Test
```bash
npm run dev
# Buka footer - harusnya muncul links dari database
```

---

## 💾 Database Schema

```sql
social_links {
  id: BIGINT (primary key)
  type: 'social' | 'quick_link'
  name: VARCHAR
  url: VARCHAR
  icon_type: 'instagram' | 'facebook' | 'twitter' | 'whatsapp' | 'email' | 'link'
  label: VARCHAR (text yang ditampilkan)
  display_order: INT (urutan)
  is_active: BOOLEAN
  created_at: TIMESTAMP
  updated_at: TIMESTAMP (auto)
}
```

---

## 🔧 Common Tasks

### Update Link URL
```sql
UPDATE social_links 
SET url = 'https://instagram.com/new_handle' 
WHERE name = 'Instagram';
```

### Disable Link
```sql
UPDATE social_links 
SET is_active = FALSE 
WHERE name = 'Twitter';
```

### Add New Link
```sql
INSERT INTO social_links 
(type, name, url, icon_type, label, display_order, is_active) 
VALUES 
('social', 'TikTok', 'https://tiktok.com/@digimagang', 'link', 'TikTok', 6, TRUE);
```

### Reorder Links
```sql
UPDATE social_links 
SET display_order = 2 
WHERE name = 'Facebook';
```

---

## 🎣 Using Hooks & Services

### Hook Usage (dalam component)
```typescript
import { useSocialLinks } from '@/hooks/useSocialLinks';

const MyComponent = () => {
  const { socialLinks, quickLinks, loading, error } = useSocialLinks();
  // Use data...
};
```

### Service Usage (dalam admin)
```typescript
import { socialLinksService } from '@/lib/socialLinksService';

// Get social links
const links = await socialLinksService.getSocialLinks();

// Update link
await socialLinksService.updateLink(id, { url: 'https://...' });

// Toggle active
await socialLinksService.toggleLink(id);

// Create new
await socialLinksService.createLink({
  type: 'social',
  name: 'LinkedIn',
  url: 'https://linkedin.com/company/digimagang',
  icon_type: 'link',
  label: 'LinkedIn',
  display_order: 7
});
```

---

## 🔄 Real-time Sync

Perubahan di database otomatis muncul di footer tanpa reload!

**Teknis:**
- Supabase Realtime → WebSocket
- Subscribe ke `social_links_channel`
- Payload changes trigger useState update

---

## ✨ Icon Types Supported

| icon_type | Result |
|-----------|--------|
| `instagram` | <Instagram icon> |
| `facebook` | <Facebook icon> |
| `twitter` | <Twitter icon> |
| `whatsapp` | <MessageCircle icon> |
| `email` | <Mail icon> |
| `link` | <Link icon> |

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Footer tidak update | Cek RLS policy di Supabase |
| Links tidak muncul | Pastikan `is_active = TRUE` |
| Real-time tidak kerja | Enable Realtime di Supabase settings |
| Error di console | Cek `.env.local` credentials |

---

## 📚 Full Documentation

Lihat `LOGO_LINKS_SETUP.md` untuk dokumentasi lengkap dan contoh lebih detail.

---

**Status: ✅ READY TO USE**

Database sudah siap! Tinggal run SQL script di Supabase dan selesai.
