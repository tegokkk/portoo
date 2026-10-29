# Product Requirements Document (PRD) — v1.0

# Motion Upgrade — Framer Motion & Animated Background — Portofolio Tego Saputra

|                       |                                                                                                                                                                                                                       |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Versi**             | 1.0 — Motion & Animated Background Layer                                                                                                                                                                              |
| **Tanggal**           | 3 Juli 2026                                                                                                                                                                                                           |
| **Pemilik Produk**    | Tego Saputra (GitHub: tegokkk)                                                                                                                                                                                        |
| **Status**            | Draft — siap direview sebelum eksekusi                                                                                                                                                                                |
| **Basis**             | Codebase aktual saat ini (`src/App.tsx`, `src/styles.css`), spesifikasi komponen `flickering-grid.tsx` (pola shadcn) yang dilampirkan sebagai referensi background animasi                                            |
| **Codebase saat ini** | React 19 + Vite + TypeScript, **CSS murni** (`src/styles.css`, 816 baris, custom properties). **Belum ada** Framer Motion, **belum ada** Tailwind terpasang meski `components.json` sudah dikonfigurasi untuk shadcn. |
| **Berjalan bersama**  | Melengkapi `ARCHIVE/PRD-INTERACTIVE-v3.md` (yang mendeskripsikan visi animasi tapi belum terealisasi di kode saat ini) — dokumen ini adalah versi yang dieksekusikan terhadap kondisi kode aktual.                    |

---

## 1. Latar Belakang

Dokumen `ARCHIVE/PRD-INTERACTIVE-v3.md` sudah pernah mendefinisikan visi "website terasa hidup" lewat scroll-reveal, stagger, dan micro-interaction. Namun setelah audit terhadap kode yang ada saat ini (`src/App.tsx`, `package.json`), lapisan animasi tersebut **belum terpasang**: tidak ada dependency `framer-motion`, tidak ada Tailwind, dan seluruh styling masih CSS manual berbasis custom properties (`--bg`, `--accent`, dst). Satu-satunya penanda "reduced motion" yang sudah ada adalah helper `prefersReducedMotion()` di `App.tsx`.

Di sisi lain, pemilik produk ingin menambahkan **layer background animasi** bergaya "flickering grid" (kotak-kotak kecil yang berkedip halus di belakang konten, dirender via `<canvas>`) sebagai identitas visual tambahan — pola ini datang dari spesifikasi komponen shadcn (`flickering-grid.tsx` + `demo.tsx`) yang dilampirkan sebagai referensi.

Kebutuhan utamanya ada dua, dan keduanya harus dipenuhi bersamaan:

1. **Full motion layer** — Framer Motion dipakai di seluruh section (bukan cuma modal/tab seperti rencana lama), untuk entrance, scroll-reveal, hover, dan transisi.
2. **Animated background** — layer background berbasis canvas (flickering grid) yang berjalan terus-menerus di belakang konten tanpa mengganggu keterbacaan.
3. **Tetap ringan** — ini adalah _hard constraint_, bukan preferensi. Situs ini adalah portofolio yang akan dibuka recruiter dari HP/koneksi biasa; tambahan animasi tidak boleh menurunkan performa yang sudah dicapai.

## 2. Tujuan

1. Memasang Framer Motion (`motion` package) sebagai fondasi animasi di seluruh halaman: Header, Hero, About, Portfolio (tab Projects/Certificates/Tech Stack), Contact, Footer, dan ketiga modal (`ProjectModal`, `CertificateModal`, `CvModal`).
2. Mengimplementasikan komponen `FlickeringGrid` sebagai layer background animasi global (di belakang Hero, dan opsional di section lain), diadaptasi dari spesifikasi shadcn yang dilampirkan.
3. Menjaga performa: tidak ada penurunan Lighthouse Performance dari baseline saat ini, tidak ada penambahan bundle JS yang signifikan, animasi tetap 60fps di perangkat menengah.
4. Menghormati `prefers-reduced-motion` di semua animasi baru, termasuk background canvas (yang harus berhenti/statis, bukan cuma "lebih lambat").
5. Menjadikan seluruh sistem animasi konsisten & terpusat (satu set variant/util Framer Motion yang dipakai ulang), bukan animasi ad-hoc per komponen.

## 3. Non-Goals

- **Tidak** memasang GSAP atau Lenis meski keduanya disebut sebagai tech stack di proyek lain milik pemilik produk (`portfolio.ts`) — menambah dua library animasi/scroll sekaligus bertentangan langsung dengan constraint "tetap ringan". Framer Motion saja cukup untuk seluruh scope di dokumen ini.
- **Tidak** memasang Tailwind CSS secara penuh hanya demi menjalankan satu komponen shadcn. Lihat keputusan teknis di §5.1.
- Tidak mengubah data/konten (nama, deskripsi proyek, tech stack, copy) — itu tetap domain `PORTO.md`.
- Tidak mengubah struktur informasi/section yang sudah ada — motion adalah lapisan tambahan, bukan restrukturisasi halaman.
- Tidak menambahkan custom cursor atau parallax mouse-follow di fase ini (disimpan sebagai catatan Fase 2 opsional di §10, karena berisiko terhadap constraint performa jika dikerjakan tergesa).

## 4. Keputusan Teknis Kunci

### 4.1 Komponen `FlickeringGrid` — adaptasi, bukan copy-paste mentah

Spesifikasi yang dilampirkan mengasumsikan proyek shadcn dengan Tailwind aktif (`className="w-full h-full"`, alias `@/components/ui/...`). Kondisi proyek ini:

| Kebutuhan shadcn                     | Kondisi aktual proyek                                                                 | Keputusan                                                                                                                                                                                                                                                                                                                                                                                                      |
| ------------------------------------ | ------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Folder `/components/ui`              | Belum ada folder `src/components` sama sekali                                         | **Buat** `src/components/ui/` — ini folder konvensi shadcn agar komponen UI reusable terpisah dari section-level component di `App.tsx`, dan agar kompatibel jika suatu saat CLI shadcn dipakai untuk komponen lain.                                                                                                                                                                                           |
| Alias `@/components/ui/...`          | `@` sudah dipetakan ke `./src` di `tsconfig.json` **dan** `vite.config.js`            | Sudah siap pakai, tidak perlu setup tambahan.                                                                                                                                                                                                                                                                                                                                                                  |
| Tailwind utility classes di komponen | Tailwind **tidak terpasang**; styling proyek 100% CSS custom property di `styles.css` | **Adaptasi**: tulis ulang class Tailwind (`w-full h-full`, `pointer-events-none`, `absolute inset-0 size-full`) menjadi CSS biasa di `styles.css` (mis. `.flickering-grid-container`, `.flickering-grid-canvas`) dengan properti yang sama persis. Logika canvas (`useRef`, `requestAnimationFrame`, `ResizeObserver`, `IntersectionObserver`) **tidak berubah** — itu murni JS/TS, tidak bergantung Tailwind. |

**Alasan menolak instalasi Tailwind penuh**: menambah Tailwind (+ PostCSS, config, purge pipeline) untuk satu komponen kecil menambah kompleksitas build dan risiko konflik dengan sistem CSS custom property yang sudah matang (816 baris, dipakai konsisten di semua section) — bertentangan langsung dengan prinsip "tetap ringan". Logika canvas itu sendiri sudah native dan ringan (~2KB gzip), jadi nilai yang hilang dari tidak memakai Tailwind sangat kecil.

### 4.2 Pemilihan library animasi

- **Framer Motion** (`motion` di npm, versi terbaru pasca-rebrand) — dipakai untuk semua animasi berbasis komponen React: entrance, `whileInView`, `whileHover`, `whileTap`, `AnimatePresence` untuk modal/tab.
- **Tidak** GSAP/Lenis (lihat Non-Goals §3).
- Estimasi tambahan bundle: `motion` (core, tanpa fitur 3D/layout-projection berat) ≈ 35–45KB gzip. Ini yang dipantau lewat NFR-B1 di §7.

## 5. Ruang Lingkup Fungsional

### 5.1 Fase 0 — Fondasi (dikerjakan pertama, blocking untuk fase lain)

| ID   | Task                                                       | Detail                                                                                                                                                                   |
| ---- | ---------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| F0.1 | Install `motion` (Framer Motion) sebagai dependency        | Tambahkan ke `package.json`, bukan `latest` tanpa pin — kunci versi minor untuk stabilitas build.                                                                        |
| F0.2 | Buat folder `src/components/ui/`                           | Sesuai konvensi shadcn di `components.json`; tempat untuk `flickering-grid.tsx` dan komponen UI reusable berikutnya.                                                     |
| F0.3 | Buat `src/components/ui/flickering-grid.tsx`               | Port dari spesifikasi lampiran, class Tailwind diganti CSS class (lihat §4.1). Props (`squareSize`, `gridGap`, `flickerChance`, `color`, `maxOpacity`, dll.) tetap sama. |
| F0.4 | Buat `src/lib/motion.ts` (variant terpusat)                | Satu file berisi variant reusable (`fadeUp`, `staggerContainer`, `scaleIn`, dst.) + util `reducedMotionVariant()` — semua section import dari sini, bukan inline ad-hoc. |
| F0.5 | Integrasikan cek `prefers-reduced-motion` ke Framer Motion | Gunakan hook `useReducedMotion()` bawaan Framer Motion di `src/lib/motion.ts`, sinkron dengan helper `prefersReducedMotion()` yang sudah ada di `App.tsx`.               |

### 5.2 Fase 1 — Background Animation Layer

| ID   | Task                                                   | Detail                                                                                                                                                                                                   |
| ---- | ------------------------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| F1.1 | Pasang `FlickeringGrid` di belakang `HeroSection`      | Absolute-positioned di belakang konten hero, `color` mengikuti `--accent` atau `--line` dari tema dark yang ada, `maxOpacity` rendah (0.15–0.3) agar teks tetap kontras tinggi (lihat NFR-B4).           |
| F1.2 | Opsional: pasang versi lebih redup di `ContactSection` | Hanya jika F1.1 lolos QA performa; grid dengan opacity lebih rendah lagi sebagai aksen penutup halaman, bukan wajib di fase ini.                                                                         |
| F1.3 | Pause otomatis di luar viewport                        | Sudah ada di logika komponen (`IntersectionObserver` + `isInView`) — pastikan perilaku ini diverifikasi jalan (canvas berhenti render saat section discroll lewat).                                      |
| F1.4 | Nonaktifkan animasi grid saat `prefers-reduced-motion` | Saat reduced motion aktif, render grid dalam kondisi statis (opacity tetap, tanpa `requestAnimationFrame` loop) — bukan dihilangkan total, agar identitas visual tetap ada tanpa memicu motion sickness. |

### 5.3 Fase 2 — Motion per Section

| ID   | Section                                                        | Task                                                                                                                                                                           |
| ---- | -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| F2.1 | Header                                                         | `initial`/`animate` slide-down halus saat mount; nav mobile (`nav-panel open/close`) pakai `AnimatePresence` + height/opacity transition, ganti toggle class manual saat ini.  |
| F2.2 | Hero                                                           | Stagger entrance untuk badge status → heading → tagline → tech pills → CTA, memakai variant `staggerContainer` dari §5.1.                                                      |
| F2.3 | About                                                          | Scroll-reveal (`whileInView`, `once: true`) untuk copy dan stat card; angka statistik (Projects/Certificate/Technologies) dianimasikan count-up saat masuk viewport.           |
| F2.4 | Portfolio (tab Projects/Certificates/Tech Stack)               | Transisi antar-tab pakai `AnimatePresence mode="wait"`; card dalam tab aktif stagger masuk; hover card memakai `whileHover` (lift + shadow ringan, bukan scale besar).         |
| F2.5 | Tech Stack                                                     | Ikon tech stack fade/scale-in stagger saat section masuk viewport.                                                                                                             |
| F2.6 | Contact                                                        | Form field dan tombol submit dapat `whileFocus`/`whileTap` feedback; toast sukses/gagal pakai `AnimatePresence` untuk masuk-keluar halus, auto-dismiss tetap dipertahankan.    |
| F2.7 | Modal (`Modal`, `ProjectModal`, `CertificateModal`, `CvModal`) | Ganti transisi buka/tutup jadi `AnimatePresence` + backdrop fade + panel scale/slide-up, konsisten di ketiga modal (satu shared `Modal` wrapper, tidak diduplikasi per modal). |
| F2.8 | Footer                                                         | Fade-in ringan saat masuk viewport — minim, sesuai prinsip "footer tidak berat" dari `PRD-UI-POLISH-v1.md`.                                                                    |
| F2.9 | Scroll progress (opsional, low priority)                       | Bar tipis di atas halaman berbasis `useScroll` Framer Motion — hanya dikerjakan setelah F2.1–F2.8 lolos QA performa.                                                           |

### 5.4 Fase 3 — QA & Performance Pass

| ID   | Task                                                                                                                                     |
| ---- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| F3.1 | Audit ulang Lighthouse (Performance, Accessibility) di mobile & desktop, bandingkan dengan baseline sebelum Fase 0.                      |
| F3.2 | Uji CPU throttling 4x (Chrome DevTools) khusus untuk section dengan `FlickeringGrid` aktif — pastikan tidak jank.                        |
| F3.3 | Uji manual dengan `prefers-reduced-motion: reduce` aktif di OS — pastikan semua animasi (termasuk background) fallback sesuai §5.1/§5.2. |
| F3.4 | Cek bundle size akhir (`npm run build`, lihat output size) terhadap budget di NFR-B1.                                                    |

## 6. Prinsip Desain Animasi

| Prinsip                                   | Penjelasan                                                                                                                                                           |
| ----------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Satu sumber kebenaran**                 | Semua variant animasi didefinisikan di `src/lib/motion.ts`, dipakai ulang lintas section — bukan inline per komponen.                                                |
| **Purposeful, bukan dekoratif**           | Animasi menuntun perhatian (reveal, feedback aksi) — background grid sengaja dibuat _subtle_, bukan elemen dominan.                                                  |
| **Cepat & ringan**                        | Durasi 200–500ms micro-interaction, maksimal ~700ms entrance section. Easing `ease-out` konsisten.                                                                   |
| **Sekali per elemen**                     | Scroll-reveal pakai `viewport={{ once: true }}` — tidak replay tiap scroll naik-turun.                                                                               |
| **Accessible by default**                 | `prefers-reduced-motion` dicek satu kali di level util (§5.1 F0.5), bukan dicek berulang manual di tiap komponen.                                                    |
| **Background = ambience, bukan gangguan** | `FlickeringGrid` selalu di `z-index` paling belakang, `pointer-events: none`, opacity rendah, tidak pernah menutupi teks dengan kontras yang mengganggu keterbacaan. |

## 7. Kebutuhan Non-Fungsional

| ID     | Kebutuhan                                                                                                                                                   |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NFR-B1 | Tambahan bundle JS (gzip) dari seluruh scope ini (Framer Motion + FlickeringGrid + variant util) **< 60KB gzip** total.                                     |
| NFR-B2 | Lighthouse Performance (mobile) tidak turun dari baseline sebelum perubahan; target tetap ≥85 (mengikuti baseline `PRD-INTERACTIVE-v3.md`).                 |
| NFR-B3 | Animasi canvas (`FlickeringGrid`) berjalan di frame rate stabil tanpa drop di bawah ~50fps pada perangkat mid-range (uji dengan throttling 4x).             |
| NFR-B4 | Kontras teks di atas area dengan background grid aktif tetap memenuhi WCAG AA (≥4.5:1) — `maxOpacity` grid dibatasi sesuai kebutuhan ini, bukan sebaliknya. |
| NFR-B5 | Semua animasi entrance memakai `viewport={{ once: true }}` — tidak ada re-trigger berulang yang membebani main thread saat scroll cepat.                    |
| NFR-B6 | `FlickeringGrid` wajib berhenti me-render (bukan hanya "melambat") saat elemen di luar viewport, dan saat `prefers-reduced-motion: reduce` aktif.           |
| NFR-B7 | Tidak ada Cumulative Layout Shift (CLS) baru akibat mount komponen animasi — canvas dan elemen bermotion harus punya ukuran ter-reserve (CSS container).    |
| NFR-B8 | Custom hook/util animasi ditulis TypeScript strict (selaras `tsconfig.json` — `"strict": true`), tanpa `any` di kode baru.                                  |

## 8. Kriteria Sukses (Definition of Done)

- Framer Motion terpasang dan dipakai konsisten di seluruh section & modal yang tercantum di §5.3, memakai variant terpusat dari `src/lib/motion.ts`.
- `FlickeringGrid` aktif di belakang Hero (minimal), berhenti otomatis di luar viewport, dan fallback statis saat `prefers-reduced-motion`.
- Lighthouse Performance & Accessibility (mobile + desktop) tidak turun dari baseline sebelum eksekusi PRD ini.
- Bundle JS tambahan terverifikasi di bawah budget NFR-B1 lewat output `npm run build`.
- QA manual dengan CPU throttling 4x dan `prefers-reduced-motion` aktif tidak menemukan jank atau elemen yang gagal fallback.
- Tidak ada Tailwind yang terpasang di `package.json` (kecuali keputusan ini direvisi secara sadar di iterasi berikutnya).
- Tidak ada console error/warning baru setelah `npm run build && npm run preview`.

## 9. Risiko

| Risiko                                                                         | Mitigasi                                                                                                              |
| ------------------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------- |
| Canvas background membebani perangkat low-end meski sudah dioptimalkan         | Batasi hanya di Hero pada fase awal (F1.1), section lain (F1.2) opsional dan hanya lanjut jika QA performa lolos.     |
| Terlalu banyak animasi terasa "ramai" dan mengganggu recruiter yang buru-buru  | Pegang prinsip "purposeful, bukan dekoratif" di §6; review visual sebelum dianggap selesai, bukan hanya cek teknis.   |
| Adaptasi CSS dari Tailwind ke custom CSS meleset dari spesifikasi visual asli  | Bandingkan hasil render `demo.tsx` (referensi) dengan hasil adaptasi secara visual side-by-side sebelum merge.        |
| Framer Motion menambah bundle lebih dari perkiraan                             | Cek ukuran aktual lewat `npm run build` setelah F0.1, bandingkan dengan budget NFR-B1 sebelum lanjut ke Fase 2.       |
| Reduced-motion fallback tidak konsisten antara CSS lama dan Framer Motion baru | Satukan sumber kebenaran di `src/lib/motion.ts` (F0.5) — semua komponen (lama maupun baru) merujuk ke util yang sama. |

## 10. Catatan Fase 2 Opsional (di luar scope dokumen ini)

Item berikut sengaja **tidak** masuk scope v1.0 karena berisiko terhadap constraint "tetap ringan" jika dikerjakan bersamaan dengan fondasi motion:

- Custom cursor & mouse-parallax pada foto profil.
- Layer `FlickeringGrid` tambahan di section selain Hero/Contact.
- Scroll-linked reveal yang lebih kompleks (mis. horizontal scroll section, pinned section).

Item-item ini bisa diajukan sebagai PRD v2.0 terpisah setelah baseline performa dari dokumen ini terverifikasi stabil.

## 11. Referensi

- `ARCHIVE/PRD-INTERACTIVE-v3.md` — visi awal lapisan interaktivitas (belum terealisasi di kode saat ini; dokumen ini menggantikan bagian motion-nya dengan rencana yang sesuai kondisi kode aktual).
- `ARCHIVE/PRD-UI-POLISH-v1.md` — prinsip visual (kontras, radius, konsistensi) yang tetap berlaku dan tidak boleh diregresi oleh animasi baru.
- `ARCHIVE/DESIGN.md` — sumber kebenaran palet warna & tipografi, dipakai untuk menentukan warna `FlickeringGrid`.
- Spesifikasi `flickering-grid.tsx` / `demo.tsx` (lampiran) — sumber pola komponen background, diadaptasi sesuai §4.1.
- `components.json`, `tsconfig.json`, `vite.config.js` — konfigurasi alias `@/*` yang sudah siap dipakai tanpa perubahan tambahan.

---

_PRD v1.0 ini fokus murni pada lapisan motion (Framer Motion) dan background animasi (FlickeringGrid). Tidak mengubah data, struktur informasi, atau prinsip visual yang sudah ditetapkan di dokumen-dokumen `ARCHIVE/` sebelumnya._
