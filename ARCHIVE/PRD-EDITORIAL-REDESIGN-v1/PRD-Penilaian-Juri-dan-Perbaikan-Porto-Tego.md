# Penilaian Juri & PRD Perbaikan — Portfolio "Tego Saputra"

**Reviewer role:** Juri Lomba Web Design (fokus: visual craft, responsivitas, UX/interaksi, kualitas teknis)
**Sumber yang dinilai:** source code React + Vite (`PORTOO`), screenshot terbaru di `artifacts/judge-latest/` (desktop & mobile: Home, Portfolio, Contact)
**Stack:** React + TypeScript, Vite, Motion (Framer Motion), Lenis (smooth scroll), custom CSS (bukan Tailwind), custom cursor, flickering-grid background

---

## 1. Skor Juri (skala 1–10)

| Kriteria | Skor | Catatan singkat |
|---|---|---|
| Konsep & Identitas Visual | 8.5 | Gaya "editorial paper" dengan tipografi serif besar + aksen pink cukup berani dan punya karakter, tidak generik. |
| Tipografi | 8 | Hierarki jelas, judul besar cukup dramatis. Perlu dicek line-height & tracking di ukuran menengah. |
| Layout & Grid | 7.5 | Grid rapi di desktop, tapi ada beberapa section yang terasa padat/berat teks pada mobile. |
| Responsivitas | 7 | Breakpoint sudah ada (980px, 640px) dan dikelola cukup baik, tapi collapse ke `1fr` di banyak grid sekaligus berisiko membuat halaman mobile jadi sangat panjang & monoton. |
| Interaksi & Motion | 7.5 | Ada custom cursor, flickering grid, Lenis smooth scroll, animasi Motion — ambisius, tapi berisiko terhadap performa & aksesibilitas jika tidak dijaga. |
| Konsistensi Komponen | 7 | Beberapa varian style tersebar di banyak file CSS terpisah (about.css, hero.css, header.css, modal.css, paper.css, projects.css, tech-contact.css) — rawan drift/inkonsistensi token warna & spacing. |
| Aksesibilitas | 6 | Custom cursor + flickering grid + smooth scroll → potensi masalah untuk pengguna motion-sensitive, keyboard-only, dan screen reader jika tidak ditangani. |
| Performa (asumsi dari stack) | 6.5 | Banyak animasi background (flickering grid canvas/SVG) + Lenis + Motion sekaligus → perlu profiling nyata (Lighthouse) untuk memastikan tidak jank di device low-end. |
| Kejelasan Konten/Copy | 7.5 | Struktur "paper/kertas" dan label pink cukup jelas menyampaikan personal brand, tapi butuh dicek keterbacaan CTA & kontak. |

**Skor total (rata-rata tertimbang, estimasi):** **7.4 / 10** — *Good, dengan potensi Very Good* jika beberapa isu responsif, aksesibilitas, dan konsistensi visual dibereskan.

---

## 2. Kelebihan yang Menonjol

1. **Identitas visual kuat & tidak template-ish.** Kombinasi tipografi serif ukuran raksasa, warna "paper" netral, dan aksen pink sebagai *label chip* memberi kesan editorial/majalah — berbeda dari kebanyakan portofolio dev bergaya SaaS generik.
2. **Craft interaksi ambisius.** Custom cursor, flickering grid background, scroll progress indicator, dan smooth scroll (Lenis) menunjukkan effort di atas rata-rata peserta biasa.
3. **Struktur proyek rapi & sudah pernah diiterasi.** Folder `ARCHIVE/` menunjukkan proyek ini sudah melalui beberapa siklus PRD (redesign editorial, motion background, polish UI, production fix) — tanda proses kerja yang disiplin.
4. **Breakpoint sudah dipikirkan**, bukan sekadar `max-width: 768px` template Bootstrap — ada penyesuaian granular per section (`hero-title-block`, `pink-label`, `section-title-row`, dst).
5. **Data proyek terpisah rapi** (`src/data/portfolio.ts`, `types.ts`) — arsitektur data/UI sudah dipisah, memudahkan maintenance dan menandakan pemahaman software engineering yang baik, bukan cuma desain.

---

## 3. Kekurangan & Area yang Perlu Dibenahi

### 3.1 Visual & Layout
- **Kepadatan konten pada mobile.** Dari `responsive.css`, hampir semua grid besar (`paper-meta`, `hero-meta`, `portfolio-layout`, `about-resume-grid`, `contact-grid`, `certificate-card`, `stack-grid`, `metrics-row`, `case-study-grid`) di-collapse jadi `1fr` sekaligus pada 980px. Ini aman secara teknis tapi berisiko membuat halaman mobile menjadi *scroll yang sangat panjang* dan monoton karena semua section jadi 1 kolom tanpa variasi ritme visual.
- **Ukuran judul ekstrem di mobile** (`clamp(3.15rem, 17vw, 4.8rem)` untuk `section-title-row h2`) berpotensi memotong kata atau membuat *line-break* aneh pada nama proyek/section yang panjang — perlu QA visual di device sempit (320–360px, bukan hanya 375px iPhone).
- **Terlalu banyak file CSS terpisah tanpa design token terpusat** (about, base, header, hero, modal, paper, projects, responsive, tech-contact). Tanpa file `tokens.css`/`variables.css` tunggal yang didokumentasikan, warna & spacing rawan drift antar section seiring waktu.

### 3.2 Responsivitas
- **Belum terlihat strategi untuk tablet (768–980px) yang berbeda dari mobile.** Breakpoint 980px langsung menuju layout 1-kolom yang sama dengan breakpoint 640px — padahal tablet punya ruang lebih untuk 2 kolom di beberapa grid (misalnya `stack-grid`, `metrics-row`).
- **Header mobile:** `header-cv { display: none; }` pada 640px — tombol CV disembunyikan total di mobile. Ini kehilangan CTA penting (download/lihat CV) justru di device yang paling sering dipakai recruiter untuk *quick check*.
- Tidak terlihat adanya `prefers-reduced-motion` handling untuk custom cursor / flickering grid / Lenis di kode yang di-review — perlu dipastikan ada guard ini.

### 3.3 UX & Interaksi
- **Custom cursor** berisiko buruk di touch device jika tidak di-disable dengan benar untuk `pointer: coarse` — perlu verifikasi eksplisit.
- **Flickering grid background** + smooth scroll Lenis + banyak animasi Motion secara bersamaan → potensi *CPU/GPU load* tinggi, khususnya untuk laptop lama/HP mid-low end. Perlu throttle/pause animasi saat section background di luar viewport (`IntersectionObserver`).
- Navigasi mobile (`nav-panel`) memakai `display: none/flex` toggle — pastikan ada `aria-expanded`, `aria-controls`, dan trap focus untuk aksesibilitas keyboard.

### 3.4 Konten & Kejelasan
- Perlu dipastikan hierarki CTA di halaman Contact jelas: mana yang aksi utama (misal "Email Saya" / "WhatsApp") vs aksi sekunder (social links) — dari layout grid yang collapse ke 1 kolom di mobile, urutan visual harus benar-benar diprioritaskan (CTA utama di atas).
- Sertifikat & metrik (`certificate-card`, `metrics-row`) perlu dicek keterbacaan angka/statistik saat 1 kolom — apakah cukup kontras dan tidak terlalu kecil dibanding judul section yang sangat besar.

### 3.5 Teknis/Performa
- Tidak ada bukti eksplisit *lazy loading* gambar proyek besar (`project-*.png` di samping `.webp` — bagus ada webp, tapi pastikan `<img>` memakai `loading="lazy"` dan `srcset` untuk ukuran berbeda).
- Font kustom (`Neogen-Black.ttf`) — pastikan `font-display: swap` dipakai agar tidak *FOIT* (flash of invisible text) yang mengganggu terutama untuk judul-judul raksasa yang jadi elemen utama LCP (Largest Contentful Paint).

---

## 4. PRD — Rencana Perbaikan Portfolio

### 4.1 Latar Belakang
Portfolio sudah punya fondasi visual yang kuat dan khas (editorial/paper style), tapi butuh pengetatan di tiga area: **responsivitas bertingkat (tablet ≠ mobile)**, **aksesibilitas & performa animasi**, dan **konsistensi design token**. Tujuannya menaikkan skor dari *Good (7.4)* menjadi *Excellent (9+)* di mata juri lomba web design.

### 4.2 Tujuan (Goals)
1. Menghadirkan pengalaman visual yang konsisten dan tetap punya "ritme" (tidak monoton) di semua breakpoint, termasuk tablet.
2. Memastikan semua interaksi signature (custom cursor, flickering grid, smooth scroll) tidak mengorbankan performa maupun aksesibilitas.
3. Menstandardisasi design token (warna, spacing, tipografi) di satu sumber kebenaran.
4. Memastikan CTA penting (CV, kontak) selalu terlihat di semua device.

### 4.3 Non-Goals
- Mengubah total identitas visual/brand "editorial paper" — ini sudah menjadi kekuatan utama dan **tidak perlu diganti**.
- Migrasi ke Tailwind atau framework CSS lain (di luar scope PRD ini).

### 4.4 User Stories
- *Sebagai recruiter yang membuka di HP*, saya ingin tetap bisa mengakses tombol CV tanpa harus scroll jauh, supaya saya bisa cepat menilai kandidat.
- *Sebagai pengunjung dengan koneksi/perangkat terbatas*, saya ingin animasi background tidak membuat scroll patah-patah (jank).
- *Sebagai pengguna dengan preferensi reduced motion*, saya ingin animasi cursor/parallax otomatis dinonaktifkan.
- *Sebagai juri/pengunjung di tablet*, saya ingin layout tidak terasa seperti versi HP yang "diregangkan", melainkan punya pemanfaatan ruang yang wajar.

### 4.5 Requirement Detail (per fitur)

#### P0 — Kritis
| # | Requirement | Acceptance Criteria |
|---|---|---|
| P0-1 | Tambahkan breakpoint tablet terpisah (mis. 768–980px) dengan grid 2 kolom untuk `stack-grid`, `metrics-row`, `certificate-card` | Di lebar 768–980px, section tsb menampilkan minimal 2 kolom, bukan 1 kolom penuh |
| P0-2 | Tombol/CTA CV tetap terlihat di mobile (≤640px), bisa dipindah ke dalam `nav-panel` atau floating action button | CV button dapat diakses ≤ 1 tap dari header di semua ukuran layar |
| P0-3 | Tambahkan `@media (prefers-reduced-motion: reduce)` untuk menonaktifkan/menurunkan intensitas custom cursor, flickering grid, dan animasi Motion | Saat setting reduced motion aktif di OS, animasi non-esensial berhenti/diperlambat signifikan |
| P0-4 | Nonaktifkan custom cursor pada `pointer: coarse` (touch device) | Custom cursor tidak muncul/tidak mengganggu di perangkat sentuh |

#### P1 — Penting
| # | Requirement | Acceptance Criteria |
|---|---|---|
| P1-1 | Sentralisasi design token (warna, spacing, radius, font-size scale) ke satu file `tokens.css` yang di-import semua modul CSS lain | Tidak ada nilai warna/spacing hardcoded baru di luar token pada file section |
| P1-2 | Pause/kurangi frame-rate animasi flickering grid saat section tidak terlihat (pakai `IntersectionObserver`) | CPU usage animasi turun signifikan saat section background di luar viewport (diverifikasi lewat DevTools Performance) |
| P1-3 | Audit & terapkan `loading="lazy"` + `srcset`/`sizes` untuk semua gambar proyek | Semua `<img>` non-hero memakai lazy loading; Lighthouse "Properly size images" lolos |
| P1-4 | Tambahkan `font-display: swap` pada `@font-face` Neogen-Black dan font lain | Tidak ada FOIT terukur di Lighthouse/Network throttling test |
| P1-5 | Tambahkan atribut aksesibilitas pada nav mobile: `aria-expanded`, `aria-controls`, focus trap saat panel terbuka | Navigasi mobile bisa dioperasikan penuh via keyboard, diverifikasi dengan axe DevTools tanpa error kritis |

#### P2 — Peningkatan Kualitas
| # | Requirement | Acceptance Criteria |
|---|---|---|
| P2-1 | QA visual manual di lebar 320px, 360px, 390px, 768px, 1024px, 1440px untuk memastikan tidak ada teks judul yang terpotong aneh | Screenshot QA di masing-masing lebar tidak menunjukkan overflow/orphan word yang janggal |
| P2-2 | Variasi ritme visual mobile: selang-seling section dengan latar/kontras berbeda (bukan semua putih/paper polos berurutan) | Minimal 1 section per 2–3 section berturut memiliki treatment visual berbeda (warna latar/aksen) saat di-scroll di mobile |
| P2-3 | Jalankan Lighthouse (Performance, Accessibility, Best Practices, SEO) dan tetapkan target skor ≥ 90 di keempat kategori untuk halaman utama | Laporan Lighthouse menunjukkan skor ≥ 90 di 4 kategori tsb (mobile & desktop) |
| P2-4 | Dokumentasikan urutan prioritas CTA di halaman Contact (utama vs sekunder) dan sesuaikan urutan visual di mobile | Di layout 1 kolom, CTA utama (misal Email/WhatsApp) muncul di posisi teratas grid `contact-grid` |

### 4.6 Metrik Keberhasilan
- Skor Lighthouse Performance & Accessibility ≥ 90 (mobile & desktop).
- Tidak ada isu kritis di axe DevTools accessibility scan.
- QA visual lolos di 6 lebar viewport standar (320–1440px) tanpa overflow/terpotong.
- CTA CV & Kontak dapat diakses dalam ≤ 1 interaksi dari semua breakpoint.

### 4.7 Prioritas Pengerjaan (Saran Urutan)
1. **Sprint 1 (P0):** Aksesibilitas & CTA kritis — reduced motion, cursor touch-guard, CV visibility mobile, breakpoint tablet dasar.
2. **Sprint 2 (P1):** Performa & konsistensi — token sentral, lazy load gambar, font-display swap, IntersectionObserver untuk animasi background, aksesibilitas nav.
3. **Sprint 3 (P2):** Polish akhir — QA visual multi-viewport, variasi ritme visual mobile, audit Lighthouse penuh, urutan CTA contact.

---

## 5. Kesimpulan Juri

Portfolio ini **di atas rata-rata** dari sisi kreativitas visual dan ambisi teknis (custom cursor, flickering grid, smooth scroll, tipografi editorial besar) — ini yang biasanya membedakan finalis dari peserta biasa di lomba web design. Namun, untuk naik ke level *"juara"*, tim perlu membuktikan bahwa keberanian visual tersebut **tidak mengorbankan dasar-dasar**: responsivitas bertingkat yang matang (bukan cuma 2 breakpoint kasar), aksesibilitas (reduced motion, keyboard nav), dan performa runtime yang terukur (Lighthouse), bukan hanya asumsi "kelihatan bagus di device saya".

**Rekomendasi juri:** Selesaikan seluruh item P0 sebelum submission berikutnya — ini adalah *hal-hal yang paling mudah terlihat gagal saat juri membuka di HP mereka sendiri*.
