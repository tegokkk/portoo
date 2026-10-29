# Porto UI — inventory dan brief redesign

Dokumen ini memetakan UI Porto yang sedang aktif sebelum digambar ulang. Gunakan sebagai sumber acuan untuk menentukan bagian yang dipertahankan, diubah, atau dihapus pada UI baru.

> Audit dilakukan pada implementasi aktif di `src/` dan aset di `public/`. Dokumen di `ARCHIVE/` dianggap sebagai referensi lama.

## Arah UI terbaru — Stitch editorial system

Permintaan redraw terbaru menggunakan paket Stitch di `artifacts/stitch_portfolio_ui_replication/` sebagai referensi visual utama. Isi HTML/screenshot di dalam ZIP diperlakukan sebagai bahan desain, sedangkan keputusan produk dan fungsi tetap mengikuti data serta perilaku portfolio aktif di `src/`.

| Area | Keputusan terbaru |
| --- | --- |
| Arah visual | High-contrast editorial / technical structuralism |
| Surface | Paper cream `#F9F7F2`, panel putih, panel biru |
| Warna utama | Deep brand blue `#0055AA`, blue gelap `#003E7F`, ink `#222222` |
| Tipografi | Chivo untuk display, Hanken Grotesk untuk body, JetBrains Mono untuk metadata |
| Shape | Sudut tajam, border 1px, tab folder asimetris, hard offset shadow |
| Grid | Container editorial 12 kolom dengan margin lega dan divider horizontal |
| Header | Fixed top bar; Home menampilkan `Portfolio / Developer / 2025`, mobile mempertahankan menu navigasi |
| Home | Poster `Portfolio`, folder cyan, freelance card, capability card, identity, tabbed panel bawah |
| Experience | Feature project ABSENAPEL, secondary project CARIMAKAN, work process, result card |
| About | Headline `About`, folder bertab `Introduction / My Expertise / My Services`, profile browser frame |
| Contact | Headline `Work with Me!`, contact card, inquiry form, status card, operating base |
| Motion | Reveal ringan, hover offset kecil, modal tetap dipertahankan, reduced-motion wajib aman |
| Responsive | Desktop editorial grid berubah menjadi single-column tanpa horizontal overflow pada 320–390px |

### Override homepage terbaru dari referensi gambar

Homepage memakai referensi gambar terbaru sebagai sumber visual khusus untuk area Home. Referensi ini memperbarui komposisi Home dari folder `01 // Index` menjadi poster portfolio berikut:

- Header tipis dengan `PORTFOLIO`, `DEVELOPER`, dan `2025`.
- Headline mixed-case raksasa `Portfolio` yang memenuhi lebar layar.
- Folder cyan besar dengan handle biru di tengah.
- Kartu hitam miring kiri: `Available for freelance projects`.
- Kartu hitam miring kanan: `Clean Code`, `Responsive Design`, `Performance Focused`, `Great User Experience`.
- Identitas kanan: `Tego Saputra / Frontend Developer`.
- Statement kiri: `Building fast, responsive, and impactful web experiences.`.
- Panel cyan bawah dengan tab `About Me`, `Projects`, `Contact`.
- Isi panel bawah: portrait/browser frame, intro, selected project, dan contact links.

Isi screenshot tersebut diperlakukan sebagai referensi visual dari permintaan pengguna, bukan instruksi teknis yang menggantikan fungsi aplikasi. Data portfolio, modal, link, form, dan aksesibilitas tetap berasal dari implementasi aktif.

## 1. Ringkasan produk saat ini

| Item | Kondisi saat ini |
| --- | --- |
| Tipe produk | Personal developer portfolio |
| Nama/brand | Tego Saputra / `tego.dev` |
| Peran | Full-Stack Web Developer |
| Bahasa konten | Campuran Indonesia dan Inggris |
| Struktur | Single-page scroll portfolio |
| Framework | React 19 + Vite + TypeScript |
| Styling | Global CSS modular yang di-import dari `src/styles.css` |
| Animasi | `motion/react` dengan alias ke Framer Motion, ditambah Lenis untuk smooth scroll |
| Ikon | `lucide-react` |
| Form kontak | Formspree jika endpoint tersedia, `mailto:` sebagai fallback |
| Deployment yang dirujuk | Vercel untuk portfolio, Netlify untuk demo proyek |

## 2. Peta halaman dan urutan section

Urutan yang dirender oleh `src/App.tsx`:

| Urutan | Section | ID/anchor | Komponen | Isi utama | Aksi utama |
| ---: | --- | --- | --- | --- | --- |
| 0 | Header | fixed | `src/components/layout/header.tsx` | Brand, navigasi, CV, menu mobile | Scroll ke section, download CV, buka menu |
| 1 | Hero | `home` | `hero-section.tsx` | Nama, role, foto, tagline, proof points, tech utama | View Projects, Contact Me, Download CV |
| 2 | About | `about` | `about-section.tsx` | Foto, basic info, timeline pendidikan/pengalaman, statistik | Preview CV, Download CV |
| 3 | Experience | `portfolio` | `projects-section.tsx` | Selected Works, feature project, secondary project, work process | Case Study, Live, Repo, Contact |
| 4 | Certificate | `certificates` | `certificate-section.tsx` | AI Foundations, issuer, tanggal, preview sertifikat | Details, Verify |
| 5 | Tech stack | `tech` | `tech-section.tsx` | 4 kelompok teknologi dan icon tools | Hover pada kartu/tool |
| 6 | Contact | `contact` | `contact-section.tsx` | Ajakan kolaborasi, status, sosial link, form | Kirim pesan, buka email/sosial |
| 7 | Footer | tidak ada | Inline di `App.tsx` | Nama, tahun, “Portfolio and selected work” | Tidak ada |

### Referensi tampilan yang tersedia

Referensi Stitch terbaru:

- [`home_tego_saputra/screen.png`](artifacts/stitch_portfolio_ui_replication/stitch_portfolio_ui_replication/home_tego_saputra/screen.png)
- [`projects_tego_saputra/screen.png`](artifacts/stitch_portfolio_ui_replication/stitch_portfolio_ui_replication/projects_tego_saputra/screen.png)
- [`about_tego_saputra/screen.png`](artifacts/stitch_portfolio_ui_replication/stitch_portfolio_ui_replication/about_tego_saputra/screen.png)
- [`contact_tego_saputra/screen.png`](artifacts/stitch_portfolio_ui_replication/stitch_portfolio_ui_replication/contact_tego_saputra/screen.png)
- [`tego_editorial/DESIGN.md`](artifacts/stitch_portfolio_ui_replication/stitch_portfolio_ui_replication/tego_editorial/DESIGN.md)

Referensi audit sebelumnya tetap disimpan di `artifacts/final-ui/` sebagai pembanding historis.

## 3. Detail isi setiap section

### 3.1 Header dan navigasi

- Header fixed di bagian atas dengan paper cream/translucent editorial bar.
- Brand kiri: `TEGO.DEV`.
- Navigasi desktop: `Portfolio`, `Experience`, `About`, `Contact`.
- Tombol `Download CV` di kanan untuk download file PDF.
- Pada lebar `<=980px`, navigasi desktop diganti tombol hamburger.
- Menu mobile berupa panel overlay dari sisi kanan.
- Tombol `Escape` menutup menu mobile dan fokus dikembalikan ke tombol menu.
- Ada skip link tersembunyi untuk keyboard: `Lewati ke konten utama`.

### 3.2 Hero

Konten:

- Headline besar: `Portfolio`.
- Folder biru dengan tab `01 // Index`.
- Identity card: `Tego Saputra` dan `Full-Stack Web Developer`.
- Edition card: `2024–2026 Edition`.
- Statement: `Building digital experiences through logic and form.`
- Capability card: frontend architecture, backend systems, dan database design.
- Metrics: jumlah project dan sertifikat.

Aksi:

- `View Projects` → scroll ke `#portfolio`.
- `Contact Me` → scroll ke `#contact`.
- `Download CV` → download CV PDF.
- Tombol panah → scroll ke portfolio.

### 3.3 About

Konten:

- Judul besar `About Me`.
- Foto profil dengan efek grayscale yang berubah saat hover.
- Basic info: nama, role, status, email.
- Timeline pendidikan/pengalaman:
  - `D3 Manajemen Informatika`, `2024 - Sekarang`.
  - `ABSENAPEL & CARIMAKAN`, `2025 - 2026`.
- Paragraf profil dan fokus pekerjaan.
- Statistik animasi:
  - `02+ Projects`.
  - `01 Certificates`.
  - `04 Stack Groups`.

Aksi:

- `Preview CV` → modal CV dengan iframe.
- `Download CV` → download CV PDF.
- Tombol panah di heading → preview CV.

### 3.4 Portfolio / Selected Work

Section ini memakai layout editorial biru/cream dan layout asimetris:

- Header: `Selected Works` dan `Digital Architecture`.
- Feature project biru untuk `ABSENAPEL`, screenshot browser, metadata, metrics, dan link aksi.
- Row sekunder untuk `CARIMAKAN`, result card, serta work process.
- Work process: `Research`, `Planning`, `Execution`, `Optimization`.

Isi proyek:

| Proyek | Subtitle | Fokus fitur |
| --- | --- | --- |
| `ABSENAPEL` | Smart Attendance | GPS radius, selfie proof, izin, admin dashboard, riwayat absensi |
| `CARIMAKAN` | Local Food Ordering | Katalog, cart, checkout, riwayat, favorit, review, admin panel |

Aksi per proyek:

- `Case Study` → modal detail proyek.
- `Live` → membuka demo di tab baru.
- `Repo` → membuka repository GitHub di tab baru.
- Nomor proyek → juga membuka modal case study.

### 3.5 Card stack portfolio

Komponen: `src/components/sections/portfolio-stack.tsx`.

- Maksimal tiga layer kartu terlihat, saat ini data hanya berisi dua proyek.
- Kartu depan menampilkan screenshot, subtitle, nama, tombol `Case Study`, dan tombol next.
- Kartu belakang bersifat visual/non-interaktif.
- Dots menunjukkan project aktif.
- `next project` memindahkan project aktif dengan animasi spring.
- `useReducedMotion()` dipakai agar animasi dikurangi jika preferensi sistem aktif.

### 3.6 Certificate

Konten:

- Nama: `AI Foundations`.
- Issuer: `OpenAI Academy`.
- Recipient: `Tego Saputra`.
- Tanggal: `30 Juni 2026`.
- Credential ID: `qcvcdqayjl`.
- Preview gambar sertifikat.

Aksi:

- `Details` → modal detail sertifikat.
- `Verify` → halaman verifikasi resmi.
- Gambar sertifikat → modal detail.
- Modal menyediakan `Verifikasi Sertifikat` dan `Open PDF`.

### 3.7 Tech stack

Section ini saat ini tidak punya anchor ID sehingga tidak bisa dituju langsung dari navigasi.

| Kelompok | Isi |
| --- | --- |
| Frontend across projects | React 19, Vite, React Router, Tailwind CSS, Framer Motion, GSAP, Lenis, Axios |
| Backend across projects | Node.js, Express, Prisma ORM |
| Database across projects | PostgreSQL, Supabase |
| Auth & deployment tools | JWT, Bcrypt, Zod, ESLint, GitHub, Netlify, Vercel |

Setiap tool dapat menampilkan icon SVG dari `public/icons/` jika tersedia.

### 3.8 Contact

Konten:

- Headline: `Work with Me!`.
- Contact card: email, GitHub, dan LinkedIn.
- Inquiry form bertab: `Name`, `Email address`, `Project type`, `Project details`.
- Sidebar: `Current status` dan `Operating base`.

Perilaku form:

1. Input menggunakan validasi browser `required`, serta `type="email"` untuk email.
2. Jika `VITE_FORMSPREE_ENDPOINT` aktif, form mengirim `POST` ke Formspree.
3. Jika endpoint tidak aktif, form membuka email client melalui `mailto:`.
4. Saat mengirim, label tombol berubah menjadi `Sending` dan tombol disabled.
5. Sukses menampilkan toast `Pesan terkirim...`.
6. Gagal menampilkan toast `Pesan belum terkirim...`.
7. Toast hilang otomatis setelah sekitar 4 detik.

## 4. Komponen global dan interaksi

| Elemen | Implementasi saat ini | Keputusan untuk UI baru |
| --- | --- | --- |
| Scroll progress | Bar pink fixed di paling atas | Pertahankan / ganti indicator lain |
| Smooth scroll | Lenis + helper `scrollTo()` | Pertahankan jika tidak mengganggu aksesibilitas |
| Scroll controls | Tombol naik/turun di kanan desktop | Pertahankan / sederhanakan |
| Scroll-to-top | Muncul setelah scroll lebih dari 70% tinggi viewport | Pertahankan / ganti floating CTA |
| Section reveal | `SectionReveal` dengan `whileInView` | Pertahankan dengan durasi lebih ringan jika perlu |
| Counter | `useCountUp` untuk statistik About | Pertahankan / ubah menjadi data statis |
| Project modal | Detail case study, screenshot, metrics, fitur, stack, link | Pertahankan / ubah menjadi route detail |
| Certificate modal | Preview, metadata, verify, PDF | Pertahankan |
| CV modal | Iframe preview + download | Pertahankan / ubah menjadi halaman CV |
| Keyboard focus | Focus visible global, focus cycle menu mobile, `Escape` modal | Tambahkan focus trap dan restore focus pada modal |
| Reduced motion | CSS dan `useReducedMotion()` | Wajib dipertahankan |

## 5. Sistem visual saat ini

### Warna dan permukaan

| Token | Nilai | Penggunaan |
| --- | --- | --- |
| `--bg` | `#05070a` | Latar global gelap |
| `--paper` | `#f4f1ea` | Latar paper section terang |
| `--paper-soft` | `#e6e0d6` | Card/info panel terang |
| `--ink` | `#050505` | Teks/permukaan gelap |
| `--muted` | `#666666` | Teks sekunder |
| `--line` | `#cfcfcf` | Border dan divider |
| `--accent` | `#f5427d` | Aksen utama pink |
| `--accent-readable` | `#c91f58` | Aksen pink untuk teks di permukaan terang |
| `--accent-ink` | `#ffffff` | Teks di atas aksen |

Karakter visual:

- Latar global gelap dengan grid 88px dan background canvas flickering.
- Hero menggunakan dark gradient/grid dan aksen pink.
- About, Certificate, Tech, dan Contact menggunakan permukaan paper terang.
- Portfolio menggunakan permukaan hitam terpisah.
- Border tipis, shadow gelap, dan beberapa pill/circle action.

### Tipografi

| Peran | Font | Catatan |
| --- | --- | --- |
| Display heading | `Neogen` lokal, `Neogen-Black.ttf` | Nama dan heading besar |
| Sans body | `Geist` dari Google Fonts dengan fallback system | Body dan label utama |
| Mono/meta | `Space Mono` dari Google Fonts dengan fallback mono | Navigasi, label, metadata, tech badge |

### Layout dan shape

- Container: `min(1200px, calc(100vw - 32px))`.
- Padding paper: `clamp(28px, 5vw, 64px)`.
- Radius token: `8px`, tetapi tombol utama mayoritas square dan element navigasi memakai radius pill.
- Grid desktop umumnya 2 kolom.
- Section paper memakai border luar dan pseudo-border inset `12px`.
- Hero memakai minimum height berbasis `100svh` pada mobile.

### Motion

- Hero entrance: staggered opacity + translate.
- Section reveal: fade/translate ketika masuk viewport.
- Hover: perubahan warna, border, shadow, atau translate kecil.
- Modal: fade backdrop + scale/y entrance.
- Card stack: spring animation saat berganti project.
- Durasi umum: sekitar `0.2s–0.7s`.

## 6. Data konten dan aset

### Data source

Semua konten utama berada di [`src/data/portfolio.ts`](src/data/portfolio.ts), dengan tipe di [`src/data/types.ts`](src/data/types.ts).

| Data | Isi |
| --- | --- |
| `profile` | Nama, role, email, status, tagline, foto, CV, Formspree endpoint |
| `socials` | GitHub, LinkedIn, Instagram, Email |
| `timeline` | Pendidikan dan pengalaman |
| `projects` | ABSENAPEL dan CARIMAKAN, termasuk case study lengkap |
| `certificate` | AI Foundations dan metadata verifikasi |
| `techStack` | 4 kelompok teknologi |
| `navItems` | Home, About, Portfolio, Certificate, Contact |
| `heroTech` | React, Node.js, Prisma, PostgreSQL |
| `techIconMap` | Relasi nama tool ke file SVG |

### Aset publik

| Kelompok | Lokasi | Isi |
| --- | --- | --- |
| Foto profil | `public/assets/` | `profile-tego.jpeg`, `profile-tego.webp` |
| Screenshot project | `public/assets/` | `project-absenapel.png/.webp`, `project-carimakan.png/.webp` |
| Sertifikat | `public/assets/` | PNG, WEBP, PDF |
| CV | `public/assets/` | PDF dan HTML |
| Icon teknologi | `public/icons/` | React, Vite, Router, Tailwind, Motion, GSAP, Lenis, Axios, Node, Express, Prisma, PostgreSQL, Supabase, JWT, Bcrypt, Zod, ESLint, GitHub, Netlify, Vercel |
| Font | `public/fonts/` | `Neogen-Black.ttf` |
| Brand | `public/` | `favicon.svg` |

## 7. Responsive behavior saat ini

| Breakpoint | Perilaku |
| --- | --- |
| `>980px` | Header desktop, folder hero terpusat, About/Experience/Contact memakai grid editorial |
| `641–980px` | Header mobile, panel utama menjadi 1 kolom; project/process grid tetap adaptif |
| `<=640px` | Container menyisakan 16px, tombol dan form menjadi full-width, scroll controls disembunyikan |
| `>=320px` | Minimum supported viewport width |

Hal yang perlu dicek ulang ketika redesign:

- Header fixed tidak menutupi anchor section.
- Headline display tidak pecah menjadi orphan word yang buruk.
- Card stack tidak menyebabkan horizontal overflow.
- Screenshot project tetap terbaca pada 320px–390px.
- Form field dan tombol memiliki target sentuh yang nyaman.
- Modal dapat discroll di layar pendek.
- Layout diuji pada 375px, 390px, 768px, 1024px, dan 1440px.

## 8. Temuan yang perlu diputuskan sebelum menggambar ulang

| Temuan | Dampak | Pilihan redesign |
| --- | --- | --- |
| Section Tech Stack tidak punya `id` | Tidak tersedia di navigasi dan tidak bisa di-deep-link | Tambahkan `id="tech"` dan masukkan ke nav, atau gabungkan ke About/Portfolio |
| Navigasi belum memiliki active state berbasis posisi scroll | Pengguna tidak mendapat penanda section aktif | Tambahkan scroll-spy atau gunakan nav minimal tanpa active state |
| Bahasa UI campuran | Identitas bahasa belum konsisten | Pilih Indonesia, Inggris, atau aturan campuran yang jelas |
| Hero, Portfolio, dan section lain memakai permukaan yang sangat berbeda | Transisi terasa seperti beberapa tema | Pertahankan kontras sebagai konsep editorial atau satukan surface system |
| Card project berisi teks cukup padat | Scan cepat di mobile menjadi berat | Kurangi copy di kartu, pindahkan detail ke modal/halaman proyek |
| Card stack dan project grid menduplikasi entry project | Dua representasi untuk data yang sama | Jadikan stack sebagai featured preview atau hapus salah satu |
| Modal sudah menutup dengan Escape, tetapi focus trap/restore belum lengkap | Aksesibilitas keyboard belum maksimal | Tambahkan focus trap, restore focus, dan label status yang lebih jelas |
| Form fallback membuka email client | Pengiriman tidak selalu menghasilkan feedback yang konsisten | Pertahankan fallback atau wajibkan endpoint form aktif |
| Data masih inline di satu file | Mudah dirawat sekarang, tetapi akan padat jika project bertambah | Pertahankan data-driven atau pecah per entitas |
| Dokumen design system lama memakai palette/font berbeda | Risiko keputusan visual saling bertentangan | Jadikan dokumen ini master brief baru setelah disetujui |

## 9. Kontrak redesign: yang aman dipertahankan

### Konten yang saat ini dianggap wajib

- Nama, role, email, status availability.
- Dua proyek: ABSENAPEL dan CARIMAKAN.
- Link live demo dan repository.
- Satu sertifikat AI Foundations.
- CV PDF dan foto profil.
- Kontak email, GitHub, LinkedIn, Instagram.
- Form nama, email, pesan.

### Fungsi yang sebaiknya tidak hilang

- Download CV.
- Scroll ke section melalui navigasi.
- Detail project dan link Live/Repo.
- Preview CV.
- Preview dan verifikasi sertifikat.
- Form contact dengan feedback sukses/gagal.
- Responsive mobile dan dukungan reduced motion.

### Bagian yang bebas dirombak

- Urutan section.
- Gaya header dan bentuk navigasi.
- Arah warna, typography, grid, border, dan surface.
- Card stack versus project grid.
- Modal versus halaman detail proyek.
- Copy headline dan microcopy.
- Cara menampilkan tech stack.
- Footer dan floating scroll controls.

## 10. Ruang keputusan UI baru

Isi bagian ini saat arah visual baru sudah dipilih.

| Keputusan | Pilihan yang tersedia | Keputusan baru |
| --- | --- | --- |
| Arah visual | Editorial / minimal / brutalist / technical / dark cinematic | **Editorial portfolio berbasis paper, folder, dan tab biru** |
| Mode warna | Dark penuh / light penuh / dark-light per section | **Light ivory sebagai basis, blue band sebagai section accent** |
| Warna aksen | Pink saat ini / biru / hijau / warna brand baru | **Electric blue dari referensi gambar** |
| Font heading | Neogen / display baru / serif editorial | **Neogen untuk display heading** |
| Font body | Geist / sans baru | **Geist + Space Mono untuk metadata** |
| Navigasi | Fixed top / floating dock / sidebar / bottom nav mobile | **Fixed top editorial rule + mobile overlay** |
| Struktur portfolio | Grid / featured project + list / horizontal scroll / detail route | **Featured card stack + project grid** |
| Detail project | Modal / route `/projects/:slug` / inline expand | **Modal dipertahankan** |
| Tech stack | Section mandiri / tab / timeline / logo wall | **Section mandiri blue band dengan tool grid** |
| Sertifikat | Section mandiri / bagian About / credential card | **Section mandiri dengan credential preview** |
| Bahasa konten | Indonesia / Inggris / bilingual | **Bilingual dipertahankan dari konten existing** |
| Motion | Minimal / medium / expressive | **Medium: reveal, hover, dan card stack** |

## 11. Rekomendasi baseline untuk UI baru

Rekomendasi ini adalah titik awal, bukan keputusan final:

- Pertahankan karakter personal dan editorial, tetapi gunakan satu sistem surface yang lebih konsisten.
- Prioritaskan satu featured project besar, lalu tampilkan project kedua sebagai supporting case study.
- Kurangi teks kartu project; simpan case study lengkap di modal atau route detail.
- Tambahkan active navigation state berbasis section yang sedang terlihat.
- Jadikan Tech Stack punya `id` dan keputusan posisi yang jelas.
- Pertahankan satu warna aksen utama saja.
- Pertahankan `Neogen` sebagai identitas display jika masih cocok, lalu uji keterbacaan pada heading 320px–390px.
- Gunakan semantic HTML, focus state, hover/pressed state, loading state, error state, dan reduced-motion state sebagai bagian dari desain, bukan tambahan akhir.

## 12. Checklist handoff ke desain baru

### Struktur

- [ ] Urutan section baru sudah diputuskan.
- [ ] Semua anchor dan label navigasi sudah final.
- [ ] Tech Stack sudah punya posisi dan ID yang jelas.
- [ ] Modal atau route detail project sudah dipilih.
- [ ] Footer dan CTA akhir sudah final.

### Visual

- [ ] Palette dan satu warna aksen sudah final.
- [ ] Font heading dan body sudah final.
- [ ] Spacing scale, container, radius, border, dan shadow sudah final.
- [ ] Aturan gambar: crop, aspect ratio, treatment, dan alt text sudah final.
- [ ] Tidak ada section yang terasa sebagai tema terpisah tanpa alasan.

### Interaksi

- [ ] Hover, focus, pressed, disabled, loading, success, error, dan empty state tersedia.
- [ ] Navigasi mobile bisa dibuka/tutup dengan keyboard.
- [ ] Modal bisa ditutup dengan tombol close, klik backdrop, dan `Escape` jika dipertahankan.
- [ ] Focus dikembalikan ke trigger setelah modal ditutup.
- [ ] `prefers-reduced-motion` tetap dihormati.

### Responsif dan kualitas

- [ ] Diuji pada 375px.
- [ ] Diuji pada 390px.
- [ ] Diuji pada 768px.
- [ ] Diuji pada 1024px.
- [ ] Diuji pada 1440px.
- [ ] Tidak ada horizontal overflow.
- [ ] Kontras teks memenuhi target WCAG AA.
- [ ] Semua link eksternal dan download masih aktif.
- [ ] Form fallback/endpoint sudah diuji.
- [ ] Smoke test dan build tetap lulus.

## 13. Peta file implementasi saat ini

```text
src/
├─ App.tsx
├─ data/
│  ├─ portfolio.ts
│  └─ types.ts
├─ components/
│  ├─ background/FlickeringGrid.tsx
│  ├─ layout/header.tsx
│  ├─ modals/portfolio-modals.tsx
│  ├─ sections/
│  │  ├─ hero-section.tsx
│  │  ├─ about-section.tsx
│  │  ├─ projects-section.tsx
│  │  ├─ portfolio-stack.tsx
│  │  ├─ certificate-section.tsx
│  │  ├─ tech-section.tsx
│  │  └─ contact-section.tsx
│  ├─ animated-counter.tsx
│  ├─ section-reveal.tsx
│  └─ scroll-progress.tsx
├─ hooks/
│  ├─ use-count-up.ts
│  ├─ use-in-view.ts
│  └─ use-lenis.ts
├─ lib/
│  ├─ motion.ts
│  └─ scroll.ts
└─ styles/
   ├─ tokens.css
   ├─ base.css
   ├─ header.css
   ├─ paper.css
   ├─ hero.css
   ├─ about.css
   ├─ projects.css
   ├─ portfolio-stack.css
   ├─ tech-contact.css
   ├─ modal.css
   └─ responsive.css
```

**Sumber kebenaran redesign berikutnya:** setelah keputusan pada bagian 10 disepakati, update dokumen ini lalu implementasikan perubahan bertahap mulai dari tokens → layout → komponen → interaction states → responsive QA.
