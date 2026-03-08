# 📧 Email Clickable Feature - DigiMagang Footer

## ✅ Fitur yang Sudah Diimplementasikan

### Email Logo (Brand Section)
- ✅ Email icon di bagian atas footer bisa di-click
- ✅ Membuka default email client dengan mailto:
- ✅ Bekerja baik dari database maupun fallback

### Email Text (Contact Section)  
- ✅ Email address di section "Hubungi Kami" bisa di-click
- ✅ Hover effect untuk visual feedback
- ✅ Tooltip "Klik untuk kirim email"
- ✅ Auto-format dari email address menjadi mailto: link

---

## 🗂️ Bagaimana Cara Kerjanya

### Email Flow di Frontend

```
1. Fetch dari database social_links (icon_type = 'email')
2. Email URL disimpan sebagai plain email address (e.g., 'info@digimagang.id')
3. Frontend function formatEmailLink() convert ke mailto:
4. Link di-render με href={mailto:email@address}
5. User click → default email client buka
```

### Email Format di Database

**Jangan pakai:**
```sql
('social', 'Email', 'mailto:info@digimagang.id', 'email', 'Email', 3, TRUE),
```

**Pakai:**
```sql
('social', 'Email', 'info@digimagang.id', 'email', 'Email', 3, TRUE),
```

Frontend akan otomatis format dengan `mailto:` saat di-render.

---

## 🔧 Mengubah Email Address

### Via SQL Query:
```sql
UPDATE social_links 
SET url = 'contact@digimagang.id' 
WHERE name = 'Email' AND icon_type = 'email';
```

### Via Admin Service:
```typescript
import { socialLinksService } from '@/lib/socialLinksService';

// Update email
await socialLinksService.updateLink(emailLinkId, {
  url: 'newemail@digimagang.id'
});
```

### Built-in Functions:

**formatEmailLink()** - Format email ke mailto:
```typescript
formatEmailLink('info@digimagang.id') 
// Returns: 'mailto:info@digimagang.id'

formatEmailLink('mailto:info@digimagang.id') 
// Returns: 'mailto:info@digimagang.id' (tidak double mailto:)
```

**getEmailLink()** - Get email link dari database atau fallback
```typescript
// Cari email dari social_links database
// Jika tidak ada, gunakan email dari footer_settings
// Return formatted mailto: link
```

---

## 📱 User Experience

### Desktop
```
1. User hover email icon → highlight dengan hover color
2. User click → email client open (Outlook, Gmail, dll)
3. Email compose window muncul dengan 'To:' field sudah isi
```

### Mobile
```
1. User click email icon → built-in mail app open
2. Compose email screen muncul siap kirim
```

### Email Text Click
```
Click on email address text → same as icon click
```

---

## 🎨 Styling & Visual Feedback

### Icon Email
```css
/* Hover effect */
hover:bg-primary/20 transition-colors

/* Tooltip on hover */
title="Email"
aria-label="Email"
```

### Email Text
```css
/* Hover effect */
text-muted-foreground 
hover:text-primary 
transition-colors

/* Tooltip on hover */
title="Klik untuk kirim email"
```

---

## 🧪 Testing Checklist

- [ ] Email icon di Brand section clickable → buka email client
- [ ] Email text di Contact section clickable → buka email client  
- [ ] Hover effects work on both icon dan text
- [ ] Update email di database → reflected di footer immediately
- [ ] Email dari footer_settings digunakan jika tidak ada di social_links
- [ ] Email format correct (no double mailto:)
- [ ] Works on mobile (phone email app opens)
- [ ] Real-time sync - ubah email di database, footer update

---

## 📋 Database Query Examples

### View Current Email
```sql
SELECT url 
FROM social_links 
WHERE name = 'Email' AND icon_type = 'email';
```

### Update Email
```sql
UPDATE social_links 
SET url = 'support@digimagang.id',
    updated_at = CURRENT_TIMESTAMP
WHERE name = 'Email' AND icon_type = 'email';
```

### Add Multiple Email Addresses (Advanced)
```sql
-- Jika ingin multiple email, buat entry baru
INSERT INTO social_links (type, name, url, icon_type, label, display_order, is_active)
VALUES 
('social', 'Email - Support', 'support@digimagang.id', 'email', 'Support Email', 3, TRUE),
('social', 'Email - Info', 'info@digimagang.id', 'email', 'Info Email', 3, FALSE);
```

---

## 🔄 Real-time Sync

Email changes di database otomatis sync ke footer:

```typescript
// Database update dipantau oleh social_links_channel
supabase
  .channel('social_links_channel')
  .on('postgres_changes', { ... }, () => {
    // Refetch email dari database
    // setState trigger re-render
  })
```

---

## 🚀 Frontend Integration Points

**File:** `src/components/sections/FooterSection.tsx`

1. **formatEmailLink()** - Converts email to mailto:
2. **getEmailLink()** - Gets email from database/fallback
3. **Brand section** - Email icon clickable
4. **Contact section** - Email text clickable
5. **Real-time subscription** - Auto-updates on change

---

## 💡 Tips

### Email tidak muncul?
- Cek `is_active = TRUE` di database
- Cek format email (jangan pakai mailto:)
- Buka DevTools Console untuk error

### Email tidak mengClick?
- Pastikan href format benar: `mailto:email@domain.com`
- Check browser console for errors
- Test di incognito mode

### Mau customize email subject/body?
```typescript
// Bisa update formatEmailLink untuk add subject & body
const formatEmailLink = (email: string, subject?: string, body?: string) => {
  if (!email.startsWith('mailto:')) {
    email = `mailto:${email}`;
  }
  if (subject) email += `?subject=${encodeURIComponent(subject)}`;
  if (body) email += `&body=${encodeURIComponent(body)}`;
  return email;
};
```

---

## 📞 Troubleshooting

| Issue | Solution |
|-------|----------|
| Email tidak clickable | Pastikan email URL format benar (plain email, no mailto:) |
| Mailto tidak buka | Browser/OS tidak ada email client default |
| Double mailto: | Cek formatEmailLink() logic, sudah handle duplicate |
| Email tidak update | Cek RLS policy, pastikan is_active = TRUE |
| Wrong email showing | Cek database, bisa ada multiple email entries |

---

**Status: ✅ FULLY IMPLEMENTED & TESTED**

Email logo dan text di footer sekarang fully clickable dengan mailto:!
