# Styleguide Implementasi Portfolio Tego

Panduan ini menerjemahkan dua referensi komponen:

- `Navbar1`: floating pill navigation, CTA kontras, mobile overlay.
- `AnimatedCardStack`: card portfolio bertumpuk, image-first, spring motion.

Targetnya bukan memindahkan komponen mentah, tapi mengadaptasi bahasa visualnya ke web portfolio ini.

## Prinsip Visual

- Pertahankan arah utama repo: dark editorial portfolio, grid halus, tipografi besar, microcopy monospace.
- Gunakan komponen referensi sebagai pola interaksi: header ringkas dan card stack bergerak.
- Jangan ubah web menjadi landing page SaaS generik.
- Satu aksen utama cukup: `--accent` pink. Warna lain hanya netral, paper, atau ink.
- Komponen harus terasa padat, cepat dibaca, dan cocok untuk portfolio developer.

## Stack dan Batasan

- Project saat ini: Vite, React, TypeScript, CSS global.
- `components.json` sudah mengarah ke `@/components/ui`, tapi project belum memakai Tailwind sebagai styling utama.
- Jangan paste class Tailwind dari referensi apa adanya kecuali Tailwind benar-benar dipasang.
- Dependency yang sudah cocok: `motion` dan `lucide-react`.
- Pakai `motion/react`, bukan menambah `framer-motion`.

```tsx
import { motion, AnimatePresence } from "motion/react"
```

## Token Utama

Pakai token yang sudah ada di `src/styles/tokens.css`.

| Role | Token | Nilai |
| --- | --- | --- |
| Background utama | `--bg` | `#05070a` |
| Paper surface | `--paper` | `#f4f1ea` |
| Paper soft | `--paper-soft` | `#e6e0d6` |
| Ink | `--ink` | `#050505` |
| Muted text | `--muted` | `#666666` |
| Border line | `--line` | `#cfcfcf` |
| Accent | `--accent` | `#f5427d` |
| Accent readable | `--accent-readable` | `#c91f58` |
| Radius dasar | `--radius` | `8px` |
| Container | `--container` | `min(1200px, calc(100vw - 32px))` |

## Tipografi

- Display: `var(--display)` untuk nama, headline, angka besar, judul section.
- Sans: `var(--sans)` untuk paragraf dan UI normal.
- Mono: `var(--mono)` untuk nav, label kecil, badge, metadata, action kecil.
- Microcopy selalu uppercase, 10px sampai 13px.
- Body copy pakai line-height sekitar `1.6`.
- Jangan tambah font baru.

## Header Pill

Adaptasi dari `Navbar1`, tapi tetap cocok dengan dark portfolio.

### Struktur

- Pakai komponen existing: `src/components/layout/header.tsx`.
- Style utama tetap di `src/styles/header.css`.
- Header fixed, center, compact, dan mengambang.
- Desktop: brand di kiri, nav di tengah, CTA/CV di kanan.
- Mobile: tombol `Menu`/`X` dari `lucide-react`, overlay nav fullscreen.

### Bentuk

- Tinggi header: 48px sampai 58px.
- Radius header: `999px` untuk pill.
- Padding desktop: 8px 12px sampai 10px 16px.
- Shadow: lembut, jangan glossy.
- Border: 1px solid dengan opacity rendah.

### Warna

Mode default untuk repo ini:

```css
.site-header {
  border-radius: 999px;
  background: rgba(0, 0, 0, 0.84);
  border-color: rgba(242, 242, 240, 0.22);
  color: var(--paper);
  backdrop-filter: blur(14px);
}
```

Mode light pill boleh dipakai hanya bila header berada di atas dark hero dan butuh kontras seperti referensi:

```css
.site-header.light-pill {
  background: rgba(244, 241, 234, 0.94);
  color: var(--ink);
  border-color: rgba(5, 5, 5, 0.1);
}
```

### CTA

- CTA utama: hitam/paper pada mode light, paper/ink pada mode dark.
- Hover CTA: pindah ke `--accent`.
- Jangan pakai gradient logo dari referensi sebagai identitas utama. Brand repo sudah memakai `tego.dev` dan mark angka.

## Mobile Navigation

- Buka/tutup dengan `AnimatePresence`.
- Overlay menutup viewport penuh.
- Esc menutup menu.
- Fokus keyboard tetap berada dalam nav saat overlay terbuka.
- Tombol menu wajib punya `aria-expanded`, `aria-controls`, dan `aria-label`.
- Mobile nav item tinggi minimal 44px.

Motion yang dipakai:

```tsx
initial={{ opacity: 0, x: "100%" }}
animate={{ opacity: 1, x: 0 }}
exit={{ opacity: 0, x: "100%" }}
transition={{ type: "spring", damping: 25, stiffness: 300 }}
```

## Card Stack Portfolio

Adaptasi dari `AnimatedCardStack` untuk area `Selected Work`.

### Kapan Dipakai

- Cocok sebagai preview portfolio di hero atau section portfolio.
- Jangan mengganti semua project card bila jumlah project sedikit dan detail case study masih lebih penting.
- Versi paling aman: jadikan card stack sebagai highlight visual, sementara card list existing tetap menjadi akses detail.

### Struktur Card

Setiap card minimal berisi:

- image project
- nama project
- subtitle singkat
- CTA `Case Study` atau `Read`

Gunakan data dari `src/data/portfolio.ts`, bukan data dummy referensi.

### Ukuran

- Mobile card: lebar sekitar 324px, tinggi 280px.
- Desktop card: lebar maksimal 512px.
- Area stack: tinggi sekitar 380px.
- Image: aspect ratio 16:9 atau tinggi tetap 190px sampai 220px.
- Card harus punya dimensi stabil supaya hover dan animasi tidak menggeser layout.

### Visual

```css
.portfolio-stack-card {
  overflow: hidden;
  border: 1px solid rgba(246, 246, 241, 0.18);
  border-radius: var(--radius) var(--radius) 0 0;
  background: #101010;
  color: #f6f6f1;
  box-shadow: 0 18px 46px rgba(0, 0, 0, 0.28);
}
```

Jika card berada di paper section terang, balikkan surface ke `var(--paper-soft)` dan text ke `var(--ink)`.

### Posisi Stack

Gunakan pola sederhana dari referensi:

```ts
const positionStyles = [
  { scale: 1, y: 12 },
  { scale: 0.95, y: -16 },
  { scale: 0.9, y: -44 },
]
```

- Card depan punya z-index paling tinggi.
- Card keluar bergerak ke bawah.
- Card baru masuk dari belakang.
- Jangan tambah carousel library.

## Motion

- Reuse helper di `src/lib/motion.ts` untuk fade, stagger, modal, dan section reveal.
- Pakai spring hanya untuk menu mobile dan card stack.
- Hover biasa cukup 150ms sampai 220ms.
- Entrance section cukup 0.4s sampai 0.7s.
- Card stack boleh 0.8s sampai 1s.
- Selalu hormati `prefers-reduced-motion`.

Standar card stack:

```tsx
transition={{
  type: "spring",
  duration: 1,
  bounce: 0,
}}
```

## Buttons dan Links

- Icon dari `lucide-react`.
- Button aksi utama tinggi minimal 44px.
- Pill boleh untuk nav, badge, dan CTA kecil.
- Button dalam card boleh rounded full bila action-nya kecil seperti `Read`.
- Button besar di section tetap mengikuti gaya existing: border tegas, radius kecil.
- Hover jangan membuat layout shift.

## Images

- Portfolio card harus image-first.
- Gunakan aset project existing di `public/assets`.
- Jangan pakai image URL luar untuk implementasi final.
- `alt` wajib spesifik: nama project atau konteks visual.
- Object-fit: `cover` untuk preview, `contain` untuk sertifikat/dokumen.

## Responsive

Checkpoint wajib:

- 375px mobile
- 768px tablet
- 1024px laptop
- 1440px desktop

Aturan:

- Tidak boleh horizontal scroll.
- Header tidak boleh menutup konten saat anchor scroll.
- Card stack harus tetap berada di tengah.
- Text button tidak boleh pecah keluar container.
- Project title panjang harus truncate atau wrap dengan sengaja.

## Aksesibilitas

- Semua button punya label jelas.
- Icon-only button wajib `aria-label`.
- Overlay mobile bisa ditutup dengan Esc.
- Focus visible memakai token existing.
- Jangan menurunkan kontras text muted di bawah batas nyaman dibaca.
- Animasi bukan satu-satunya cara memahami perubahan state.

## File Tujuan

Gunakan file existing lebih dulu:

- Header: `src/components/layout/header.tsx`
- Header styles: `src/styles/header.css`
- Project section: `src/components/sections/projects-section.tsx`
- Project styles: `src/styles/projects.css`
- Motion helper: `src/lib/motion.ts`
- Data project: `src/data/portfolio.ts`

Buat `src/components/ui` hanya bila komponen baru dipakai ulang di lebih dari satu tempat.

## Checklist Implementasi

- [ ] Tidak menambah `framer-motion`; pakai `motion/react`.
- [ ] Tidak menambah Tailwind hanya untuk dua komponen ini.
- [ ] Header berubah menjadi pill tanpa merusak mobile nav.
- [ ] Card stack memakai data project asli.
- [ ] Hover dan motion tidak menyebabkan layout shift.
- [ ] Focus visible tetap terlihat.
- [ ] `prefers-reduced-motion` aman.
- [ ] Build, typecheck, dan smoke test tetap lewat.

## Keputusan Singkat

Shortest path: ubah CSS dan komponen existing, bukan migrasi styling.

Skipped: Tailwind migration, full shadcn rebuild, dependency `framer-motion`.

Add later when: banyak komponen shadcn baru benar-benar dibutuhkan di beberapa halaman.
