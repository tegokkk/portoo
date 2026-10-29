# Execution Checklist — Interactivity Upgrade

### Website Portofolio Tego Saputra · turunan dari `PRD-INTERACTIVE-v3.md`

Estimasi total: **±28–41 jam kerja** (P1: ±10–17 jam · P2: ±13–18 jam · P3: ±4,5–5,5 jam)

Cara pakai: kerjakan berurutan per prioritas (P1 → P2 → P3). Centang `[x]` setiap task selesai + lolos acceptance criteria. Setiap task independen — bisa di-commit terpisah per task untuk memudahkan rollback.

---

## 🔴 PRIORITY 1 — High Impact (kerjakan pertama)

### P1.1 — Scroll-reveal animasi per section & card

- **Effort:** 4–6 jam · **File:** `src/App.jsx`
- **Task:**
  - [ ] Buat komponen wrapper `<Reveal>` pakai `motion.div` + `whileInView` (Framer Motion), `viewport={{ once: true, amount: 0.2 }}`
  - [ ] Terapkan ke setiap `<section>` (Hero, About, Portfolio, Contact) dan setiap card di dalamnya (project card, certificate card, tech category card)
  - [ ] Fade-in + translateY(20–30px) → posisi normal, durasi 500–600ms, easing `easeOut`
  - [ ] Tambahkan `useReducedMotion()` dari Framer Motion untuk skip animasi jika user set reduced motion
- **Acceptance:** Semua section & card muncul dengan reveal animation saat pertama kali masuk viewport; tidak replay saat scroll naik-turun; tidak ada animasi saat `prefers-reduced-motion: reduce`.

### P1.2 — Hero stagger animation

- **Effort:** 2 jam · **File:** `src/App.jsx`
- **Task:**
  - [ ] Bungkus elemen hero (nama → role → tagline → social pills → CTA buttons) dalam `motion.div` dengan `variants` staggerChildren (~0.1–0.15s delay antar elemen)
  - [ ] Urutan: nama → role/badge status → tagline → pill sosial → tombol CTA
  - [ ] Jalan otomatis saat page load (bukan scroll-trigger, karena ini section pertama)
- **Acceptance:** Elemen hero muncul berurutan dari atas ke bawah dengan jeda halus, total durasi ≤1 detik, terasa satu kesatuan bukan patah-patah.

### P1.3 — Stats counter animation (0 → angka target)

- **Effort:** 2–3 jam · **File:** `src/App.jsx`
- **Task:**
  - [ ] Buat hook `useCountUp(target, duration)` atau pakai `animate()` dari Framer Motion pada stat cards (`2 Projects`, `1 Certificate`, `10+ Technologies`)
  - [ ] Trigger saat card masuk viewport (`whileInView`), bukan saat page load
  - [ ] Durasi hitung ±1–1.5 detik, easing `easeOut`
- **Acceptance:** Angka di stat card menghitung naik dari 0 ke angka final saat section About discroll masuk viewport, hanya sekali.

### P1.4 — Hover lift effect pada project & tech cards

- **Effort:** 1–2 jam · **File:** `src/App.jsx` + `src/styles.css`
- **Task:**
  - [ ] Tambah CSS transition `transform: translateY(-4px) scale(1.01)` + `box-shadow` halus saat `:hover`
  - [ ] Terapkan ke project card, certificate card, tech category card
  - [ ] Transisi 200–250ms, easing `ease-out`
- **Acceptance:** Semua card interaktif terangkat halus saat di-hover di desktop; tidak ada efek residual di mobile/touch (gunakan `@media (hover: hover)`).

### P1.5 — Tab content stagger (kartu masuk satu per satu)

- **Effort:** 1–2 jam · **File:** `src/App.jsx`
- **Task:**
  - [ ] Di dalam `AnimatePresence` yang sudah ada untuk tab Projects/Certificates/Tech Stack, tambahkan `staggerChildren` pada container kartu
  - [ ] Tiap kartu fade-in + translateY kecil dengan delay bertahap (~0.08–0.1s)
- **Acceptance:** Saat pindah tab, kartu-kartu muncul satu per satu (bukan sekaligus), transisi tab tetap terasa cepat (<600ms total).

### P1.6 — Toast auto-dismiss setelah 4 detik

- **Effort:** 30 menit · **File:** `src/App.jsx`
- **Task:**
  - [ ] Cari state `toast` (sudah ada di `App()`), tambahkan `useEffect` dengan `setTimeout(() => setToast(""), 4000)` setiap kali `toast` berubah jadi non-empty
  - [ ] Pastikan timeout di-clear jika komponen unmount / toast baru muncul sebelum timeout lama selesai
- **Acceptance:** Toast notifikasi hilang otomatis 4 detik setelah muncul, tanpa perlu interaksi user, tidak ada bug toast menumpuk.

### P1.7 — Certificate preview tanpa grayscale filter (bug fix)

- **Effort:** 10 menit · **File:** `src/styles.css`
- **Task:**
  - [ ] Cari rule CSS yang menerapkan `filter: grayscale(...)` pada elemen certificate image/preview
  - [ ] Hapus atau override khusus untuk certificate (grayscale seharusnya hanya untuk foto profil sesuai PRD v2.0 §5.6, bukan sertifikat)
- **Acceptance:** Preview sertifikat AI Foundations tampil dengan warna asli (tidak hitam-putih) baik di card maupun modal lightbox.

---

## 🟡 PRIORITY 2 — Medium Impact

### P2.1 — Custom cursor (dot follower)

- **Effort:** 2–3 jam · **File:** `src/App.jsx`
- **Task:**
  - [ ] Buat komponen `<CustomCursor>` — dot kecil mengikuti posisi mouse via `mousemove` listener + `requestAnimationFrame` untuk smoothing
  - [ ] Scale up saat hover elemen interaktif (link, button, card)
  - [ ] Aktifkan hanya jika `window.matchMedia('(hover: hover) and (pointer: fine)').matches`
- **Acceptance:** Cursor custom muncul halus mengikuti mouse di desktop, membesar saat hover elemen klikable, tidak muncul sama sekali di mobile/tablet/touch device.

### P2.2 — Loading/intro screen (0.8–1.5 detik)

- **Effort:** 1–2 jam · **File:** `src/App.jsx`
- **Task:**
  - [ ] Buat komponen `<IntroScreen>` full-screen overlay dengan animasi singkat (misal nama/logo fade+scale)
  - [ ] Cek `sessionStorage` — tampilkan hanya sekali per sesi browser
  - [ ] Auto-hide via `setTimeout` atau `onAnimationComplete`, lalu `AnimatePresence` exit fade
- **Acceptance:** Intro screen muncul sekali saat kunjungan pertama per sesi, hilang otomatis maks 1.5 detik, tidak muncul lagi saat refresh dalam sesi yang sama.

### P2.3 — Mouse parallax effect pada photo card

- **Effort:** 2 jam · **File:** `src/App.jsx`
- **Task:**
  - [ ] Track posisi mouse relatif ke card foto profil, terapkan `transform: translate/rotate` ringan (maks ±8–10px / ±3–5deg) via `motion.div` + `useMotionValue`/`useSpring`
  - [ ] Aktif hanya di desktop (`pointer: fine`)
- **Acceptance:** Foto profil bergerak halus mengikuti arah mouse saat kursor di area card, kembali ke posisi normal saat mouse keluar area, terasa subtle bukan berlebihan.

### P2.4 — Scroll progress bar di atas halaman

- **Effort:** 1 jam · **File:** `src/App.jsx`
- **Task:**
  - [ ] Bar tipis fixed di top viewport, width diikat ke `useScroll()` + `useSpring()` dari Framer Motion (scroll progress 0–100%)
  - [ ] Warna sesuai token `--accent`
- **Acceptance:** Bar mengisi dari 0% ke 100% seiring scroll dari atas ke bawah halaman, smooth tanpa jank.

### P2.5 — Timeline dot & line draw animation

- **Effort:** 2–3 jam · **File:** `src/App.jsx` + `src/styles.css`
- **Task:**
  - [ ] Pada mini education timeline (About section), animasikan garis vertikal "tergambar" (stroke-dashoffset atau scaleY dari 0→1) saat scroll masuk viewport
  - [ ] Dot muncul berurutan mengikuti garis, delay bertahap per item timeline
- **Acceptance:** Garis timeline terlihat "tumbuh" dari atas ke bawah saat section About discroll, dot pendidikan muncul menyusul garis, sekali trigger saja.

### P2.6 — Signal card floating animation

- **Effort:** 30 menit · **File:** `src/App.jsx`
- **Task:**
  - [ ] Tambahkan animasi loop halus (`animate={{ y: [0, -6, 0] }}`, `repeat: Infinity`, durasi ±3s, easing `easeInOut`) pada elemen badge status "Open for work"
- **Acceptance:** Badge status melayang naik-turun sangat halus secara berkelanjutan, tidak mengganggu keterbacaan teks di sekitarnya.

### P2.7 — Tech stack dengan ikon teknologi

- **Effort:** 3–4 jam · **File:** `src/App.jsx` + `public/icons`
- **Task:**
  - [ ] Kumpulkan/simpan ikon SVG tiap teknologi (React, Vite, Tailwind, Node.js, PostgreSQL, dll) di `public/icons/`
  - [ ] Update tab Tech Stack: tiap item teknologi tampil dengan ikon + label (bukan hanya teks dipisah `/` seperti PRD v2.0 awal)
  - [ ] Pastikan ikon konsisten style (outline/mono) agar selaras tema dark
- **Acceptance:** Setiap teknologi di tab Tech Stack punya ikon visual yang jelas dan konsisten, layout tetap rapi di mobile & desktop.

### P2.8 — Scroll to top button

- **Effort:** 1 jam · **File:** `src/App.jsx`
- **Task:**
  - [ ] Tombol fixed di kanan-bawah, muncul (`AnimatePresence`) setelah scroll melewati threshold tertentu (misal >600px)
  - [ ] Klik → smooth scroll ke top (`window.scrollTo({ top: 0, behavior: 'smooth' })`)
- **Acceptance:** Tombol muncul dengan fade/scale setelah user scroll cukup jauh, hilang saat kembali ke atas, klik langsung smooth-scroll ke hero.

### P2.9 — Ambient glow di section hero & contact

- **Effort:** 1 jam · **File:** `src/styles.css`
- **Task:**
  - [ ] Tambahkan `radial-gradient` blur besar (soft glow) di background Hero & Contact section, opacity rendah (~5–10%), warna dari `--accent` atau putih pudar
  - [ ] Pastikan tidak mengganggu kontras teks (cek WCAG AA tetap terpenuhi, sesuai NFR-4 PRD v2.0)
- **Acceptance:** Ada nuansa cahaya lembut di background hero & contact, tidak mengganggu keterbacaan, tidak menambah beban render signifikan.

---

## 🟢 PRIORITY 3 — Enhancements

### P3.1 — SEO meta tags di index.html

- **Effort:** 30 menit · **File:** `index.html`
- **Task:**
  - [ ] Tambahkan `<title>`, `<meta name="description">`, Open Graph tags (`og:title`, `og:description`, `og:image`, `og:url`), Twitter card tags
  - [ ] Pastikan favicon sudah ter-reference dengan benar (sudah ada `public/favicon.svg`)
- **Acceptance:** Meta tags lengkap, hasil share link ke medsos menampilkan preview yang benar (cek via debugger OG seperti Facebook Sharing Debugger / metatags.io).

### P3.2 — Lazy loading gambar dengan blur placeholder

- **Effort:** 1–2 jam · **File:** `src/App.jsx`
- **Task:**
  - [ ] Tambahkan `loading="lazy"` + `decoding="async"` pada semua `<img>` non-critical (screenshot proyek, sertifikat)
  - [ ] Implementasi blur-up placeholder (bisa pakai tiny base64 blur atau skeleton shimmer CSS sebelum gambar full load)
  - [ ] Set `width`/`height`/`aspect-ratio` eksplisit untuk cegah CLS (sesuai NFR-I5 di PRD)
- **Acceptance:** Gambar dimuat lazy saat mendekati viewport, ada placeholder blur/skeleton sebelum gambar asli tampil, tidak ada layout shift saat gambar selesai load.

### P3.3 — Formspree endpoint setup (.env)

- **Effort:** 30 menit · **File:** `.env.local`
- **Task:**
  - [ ] Daftar akun Formspree, buat form baru untuk endpoint kontak
  - [ ] Isi `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/<form-id>` di `.env.local` (lokal) dan di Vercel Project Settings → Environment Variables (production)
  - [ ] Redeploy dan test kirim pesan end-to-end
- **Acceptance:** Form kontak berhasil mengirim email ke `tegosaputra02@gmail.com` via Formspree tanpa fallback ke `mailto:`.

### P3.4 — Background blur pada konten saat modal buka

- **Effort:** 30 menit · **File:** `src/styles.css`
- **Task:**
  - [ ] Tambahkan `backdrop-filter: blur(6–10px)` pada overlay `ModalShell` yang sudah ada
  - [ ] Pastikan fallback aman di browser yang belum support `backdrop-filter` (opacity overlay gelap tetap jadi fallback)
- **Acceptance:** Saat modal project/certificate terbuka, konten di belakangnya terlihat blur, bukan hanya gelap flat.

### P3.5 — Project card preview on hover (quick peek)

- **Effort:** 2 jam · **File:** `src/App.jsx`
- **Task:**
  - [ ] Saat hover project card (desktop only) cukup lama (~400ms delay), tampilkan tooltip/preview kecil berisi ringkasan fitur utama tanpa perlu klik buka modal penuh
  - [ ] Auto-hide saat mouse leave
- **Acceptance:** Quick-peek muncul halus setelah delay hover, tidak flicker saat mouse lewat cepat, hanya aktif di desktop.

---

## Checklist Umum Sebelum Dianggap "Selesai"

- [x] `npm run build` sukses tanpa warning baru
- [x] Test manual di Chrome DevTools dengan `prefers-reduced-motion: reduce` aktif — semua animasi non-esensial ter-skip
- [x] Test manual di mobile viewport (≤480px) dan tablet (768px) — custom cursor & parallax tidak aktif
- [x] Re-run Lighthouse (Performance ≥85, Accessibility ≥90) setelah P1+P2 selesai
- [x] Tidak ada console error/warning di production build (`npm run preview`)
- [ ] Commit terpisah per task/task-group untuk memudahkan review & rollback

---

## Status Eksekusi Codex - 2 Juli 2026

- [x] P1.1 Scroll reveal section/card via Framer Motion wrapper.
- [x] P1.2 Hero stagger animation.
- [x] P1.3 Stats count-up animation.
- [x] P1.4 Hover lift desktop-only.
- [x] P1.5 Tab content stagger.
- [x] P1.6 Toast auto-dismiss 4 detik.
- [x] P1.7 Certificate preview warna asli.
- [x] P2.1 Custom cursor desktop-only.
- [x] P2.2 Intro screen sekali per sesi.
- [x] P2.3 Mouse parallax pada profile photo desktop-only.
- [x] P2.4 Scroll progress bar.
- [x] P2.5 Timeline draw animation.
- [x] P2.6 Floating signal/status card.
- [x] P2.7 Tech stack icon chips.
- [x] P2.8 Scroll-to-top button.
- [x] P2.9 Ambient glow hero/contact.
- [x] P3.1 SEO meta tags sudah ada di `index.html`.
- [x] P3.2 Lazy image + blur/skeleton placeholder + explicit dimensions.
- [x] P3.3 Formspree endpoint lokal sudah di-set ke `https://formspree.io/f/mpqgyevk`; Vercel env var tetap perlu diisi saat deploy production.
- [x] P3.4 Modal backdrop blur.
- [x] P3.5 Project quick-peek desktop-only.
- [x] `npm run build` sukses.
- [x] Production preview dicek: tidak ada console error/warning.
- [x] Mobile/reduced-motion dicek: custom cursor dan parallax nonaktif.
- [x] Lighthouse audit selesai: Performance 87, Accessibility 95, Best Practices 100, SEO 92.
- [x] P1 diverifikasi ulang pada 3 Juli 2026: section reveal eksplisit, reduced-motion fallback, tab content, toast auto-dismiss, dan certificate preview warna asli.
- [x] P2 diverifikasi ulang pada 3 Juli 2026: custom cursor desktop-only, intro sekali per sesi, parallax desktop, scroll progress/top, timeline draw, floating status, tech icons, dan ambient glow.
- [x] P3 diverifikasi ulang pada 3 Juli 2026: SEO meta lengkap, lazy image + dimensions, Formspree POST ke endpoint, modal backdrop blur, dan quick-peek desktop-only.

---

## Status Eksekusi Codex - 3 Juli 2026 - PRD Production Fix + UI Polish v1

- [x] P0.1 Form kontak nyata ditambahkan di `src/App.jsx` dengan field name, email, message, dan label `htmlFor`/`id` yang terasosiasi.
- [x] P0.2 Submit state ditambahkan: `isSubmitting`, toast success/error, dan auto-dismiss 4 detik.
- [x] P0.3 Fallback Formspree kosong ditambahkan: toast konfigurasi muncul dan email langsung tetap tersedia.
- [x] P1.1 `public/robots.txt` ditambahkan dengan `Allow: /` dan sitemap production.
- [x] P1.2 `public/llms.txt` ditambahkan dengan ringkasan portfolio dan tautan penting.
- [x] P1.3 Label form terasosiasi sudah diverifikasi lewat DOM Playwright.
- [x] P2.1 Font Google dipindah dari CSS `@import` ke `<head>` dengan preconnect untuk mengurangi CSS dependency chain.
- [x] P2.3 WebP dibuat untuk foto profil, screenshot proyek, dan preview sertifikat; gambar utama memakai `<picture>` fallback.
- [x] P3.2 `.gitignore` ditambah untuk `.tmp-video-analysis/`, `.agents/`, `.codex/`, dan env lokal.
- [x] P3.3 `.env.example` ditambahkan dengan placeholder `VITE_FORMSPREE_ENDPOINT`.
- [x] UI polish: token warna diselaraskan ke palet dark technical, form styling mengikuti surface/border/radius sistem, stat angka memakai `tabular-nums`, card grid dibuat equal-height, certificate preview tidak grayscale.
- [x] Verifikasi: `npm run build` sukses pada 3 Juli 2026, output CSS `25.96 kB gzip 6.39 kB`, JS `353.71 kB gzip 111.95 kB`.
- [x] Production preview diverifikasi pada `http://localhost:4173`: form ada, labels valid, tidak ada horizontal overflow, 5 WebP `<source>` terdeteksi, `/robots.txt` dan `/llms.txt` status 200.
