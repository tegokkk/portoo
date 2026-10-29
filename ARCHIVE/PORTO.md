# Product Requirements Document (PRD) — v2.0

# Website Portofolio Pribadi — Tego Saputra

|                         |                                                                                                                                        |
| ----------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| **Versi**               | 2.0 — Revisi Pasca Referensi Kedua                                                                                                     |
| **Tanggal**             | 2 Juli 2026                                                                                                                            |
| **Pemilik Produk**      | Tego Saputra (GitHub: tegokkk)                                                                                                         |
| **Status**              | Final Draft — siap eksekusi coding                                                                                                     |
| **Perubahan dari v1.0** | Integrasi referensi desain kedua (nik.khvat), penambahan seksi Work/Experience, update panduan visual, restrukturisasi layout komponen |

---

## 1. Latar Belakang

Tego Saputra memiliki dua aplikasi full-stack yang sudah live (ABSENAPEL dan CARIMAKAN), satu sertifikat kursus (AI Foundations — OpenAI Academy), dan pengalaman pendidikan di bidang Manajemen Informatika. Belum ada satu titik terpusat yang merepresentasikan semua ini secara profesional dan visual.

Dibutuhkan **website portofolio pribadi** yang menggabungkan dua arah desain referensi menjadi satu identitas visual baru yang khas — bukan hasil tiru-meniru keduanya, melainkan interpretasi yang sesuai dengan karakter Tego sebagai developer.

---

## 2. Sintesis Referensi Desain

Kedua referensi dipakai sebagai **inspirasi sumber konsep**, bukan template. Berikut pemetaan kontribusi masing-masing:

| Elemen          | Referensi 1 (TikTok @itsme.ikky\_)           | Referensi 2 (nik.khvat)                            | Keputusan untuk Tego                                               |
| --------------- | -------------------------------------------- | -------------------------------------------------- | ------------------------------------------------------------------ |
| Latar belakang  | Dark + subtle grid/blueprint                 | Pure matte black                                   | Dark + grid sangat halus (subtle), tidak mencolok                  |
| Photo treatment | Polaroid bergantung, B&W                     | B&W full-width dalam card                          | B&W foto dalam card/frame yang khas                                |
| Section header  | Judul besar biasa                            | `.../ Section Name ...` path-style                 | Adopsi path-style `// section_name` dengan sentuhan code-aesthetic |
| Navigasi        | Navbar sticky (Home/About/Portfolio/Contact) | Tab teks horizontal (Main/About/Projects/Articles) | Navbar sticky + scroll-spy aktif                                   |
| Portfolio       | Tab: Projects / Certificates / Tech Stack    | Project cards inline + work timeline               | Gabung: tab system dipertahankan + timeline di About               |
| Tech Stack      | Grid ikon di dalam tab                       | Category cards (Front-end/Back-end/DevOps)         | Category cards di dalam tab Tech Stack                             |
| Project card    | Thumbnail + tombol Detail                    | Thumbnail + badge tags + deskripsi bold/italic     | Keduanya digabung: thumbnail + badge + deskripsi + tombol          |
| Social links    | Tautan di footer/contact                     | Pill buttons di hero                               | Pill buttons di hero + diulang di footer                           |
| Kontak          | Form + social list                           | Footer besar nama + social grid                    | Keduanya: form + footer nama besar                                 |
| Articles/Blog   | Tidak ada                                    | Ada (artikel text)                                 | Nice-to-have fase 2                                                |
| Tipografi       | Grotesk bold                                 | Serif/italic mix untuk body                        | Bold grotesk untuk headline, italic untuk emphasis di body         |

---

## 3. Tujuan Produk

1. Menyajikan identitas diri (nama, peran, tagline) secara langsung dan kuat di hero section.
2. Menampilkan riwayat pendidikan/pengalaman (About + mini timeline) sebagai konteks profesional.
3. Memamerkan 2 proyek sistem beserta detail lengkap dan tautan live.
4. Menampilkan sertifikat AI Foundations sebagai kredensial nyata.
5. Menyajikan tech stack secara terstruktur per kategori.
6. Menyediakan kanal kontak yang jelas dan mudah diakses.
7. Menghadirkan kesan **developer aesthetic** — clean, dark, typographic-forward — tanpa berlebihan.

---

## 4. Target Pengguna

| Persona                   | Kebutuhan Utama                                      |
| ------------------------- | ---------------------------------------------------- |
| Recruiter / HR perusahaan | Nilai kemampuan teknis dalam < 2 menit, kontak mudah |
| Dosen / penguji akademik  | Detail proyek terstruktur, link live demo & repo     |
| Klien freelance potensial | Kualitas UI, portofolio nyata, cara menghubungi      |
| Sesama developer          | Source code GitHub, tech stack yang digunakan        |

---

## 5. Panduan Visual & Design Language

### 5.1 Palet Warna

| Token              | Nilai     | Penggunaan                       |
| ------------------ | --------- | -------------------------------- |
| `--bg-primary`     | `#0d0d0d` | Background utama halaman         |
| `--bg-card`        | `#161616` | Background semua card/panel      |
| `--bg-card-hover`  | `#1e1e1e` | Hover state card                 |
| `--border`         | `#2a2a2a` | Garis tepi card, divider         |
| `--text-primary`   | `#f0f0f0` | Teks utama/judul                 |
| `--text-secondary` | `#888888` | Teks supporting, label, metadata |
| `--text-muted`     | `#555555` | Placeholder, teks sangat subtle  |
| `--accent`         | `#ffffff` | CTA button, badge aktif          |
| `--accent-dim`     | `#3a3a3a` | Badge/pill non-aktif             |

> **Grid background:** subtle dot-grid atau line-grid dengan opacity 3–5% di atas `--bg-primary`. Tidak boleh mengganggu keterbacaan konten.

### 5.2 Tipografi

| Elemen                     | Gaya                                                     |
| -------------------------- | -------------------------------------------------------- |
| Hero headline              | Display/Grotesk bold, ukuran besar (clamp 48–80px)       |
| Section header             | Monospace atau Grotesk, ukuran sedang, path-style prefix |
| Body text                  | Sans-serif regular, italic untuk emphasis penting        |
| Tech badge / label         | Monospace kecil atau Sans-serif semibold                 |
| Metadata (tanggal, durasi) | Sans-serif light/regular, `--text-secondary`             |

### 5.3 Gaya Section Header

Setiap section diawali dengan header bergaya **code path notation**:

```
// about_me
// portfolio_showcase
// work_experience
// contact
```

Bisa dipadukan dengan nomor urut: `01 // hero` dst. Keputusan final diserahkan ke developer saat implementasi.

### 5.4 Komponen Card

- Border-radius: `12px` atau `16px`
- Background: `--bg-card`
- Border: `1px solid --border`
- Hover: background naik ke `--bg-card-hover`, border sedikit lebih terang
- Padding dalam: `20–24px`

### 5.5 Pill / Badge

- Tech tag: background `--accent-dim`, teks `--text-primary`, font monospace kecil, padding `4px 10px`, border-radius `999px`
- Social link pill: border `1px solid --border`, ikon + label, background transparan, hover fill `--bg-card`

### 5.6 Foto Profil

- Treatment: **hitam-putih** (grayscale)
- Framing: dalam card dengan `overflow: hidden`, atau framing kustom bergaya polaroid/frame bergantung
- Opsional: sedikit grain/noise overlay untuk kesan fotografi

---

## 6. Arsitektur Halaman (Sitemap)

```
/  (single-page, scroll-based)
│
├── [01] Hero
│     ├── Nama + Peran
│     ├── Tagline singkat
│     ├── Pill sosial (GitHub, LinkedIn, Instagram, dll)
│     └── CTA button "Lihat Proyek"
│
├── [02] About
│     ├── Section header // about_me
│     ├── Bio paragraf dengan bold/italic emphasis
│     ├── Foto B&W dalam card/frame
│     ├── Mini education/experience timeline
│     └── Stat cards (Proyek, Sertifikat, Teknologi)
│
├── [03] Portfolio Showcase
│     ├── Section header // portfolio
│     ├── Tab switcher: Projects | Certificates | Tech Stack
│     │
│     ├── [Tab: Projects]
│     │     ├── Kartu ABSENAPEL
│     │     └── Kartu CARIMAKAN
│     │
│     ├── [Tab: Certificates]
│     │     └── Kartu AI Foundations — OpenAI Academy
│     │
│     └── [Tab: Tech Stack]
│           ├── Category card: Frontend
│           ├── Category card: Backend
│           ├── Category card: Database
│           └── Category card: Auth & Tools
│
├── [04] Project Detail (modal atau halaman terpisah /project/:slug)
│     ├── Judul + deskripsi lengkap
│     ├── Stat cards (jml teknologi, jml fitur)
│     ├── Key Features list
│     ├── Tech badges
│     └── Tombol Live Demo + Source Code
│
├── [05] Certificate Detail (modal)
│     ├── Gambar sertifikat (lightbox)
│     ├── Metadata
│     └── Tombol Verifikasi
│
└── [06] Contact
      ├── Section header // contact
      ├── Sub-judul / ajakan
      ├── Form: Nama, Email, Pesan, Kirim
      ├── Tautan sosial (pill grid)
      └── Footer: Nama besar + peran + copyright
```

---

## 7. Alur Pengguna (User Flow)

1. **Masuk** → Hero langsung memperkenalkan nama, peran, dan pill sosial.
2. **Scroll ke About** → membaca bio + melihat foto + timeline pendidikan + stat ringkas.
3. **Scroll ke Portfolio** → memilih tab Projects / Certificates / Tech Stack.
4. **Klik kartu proyek** → buka modal/halaman detail (fitur, tech, link demo & repo).
5. **Klik kartu sertifikat** → buka modal detail + tombol verifikasi URL resmi.
6. **Scroll ke Contact** → isi form atau klik sosial link; footer menampilkan nama besar sebagai penutup.

---

## 8. Kebutuhan Fungsional Detail

### 8.1 Hero Section

| ID     | Kebutuhan                                                                                       |
| ------ | ----------------------------------------------------------------------------------------------- |
| FR-1.1 | Nama lengkap "Tego Saputra" + peran (mis. "Full-Stack Web Developer") tampil besar di atas fold |
| FR-1.2 | Tagline 1–2 kalimat dengan **bold** dan _italic_ untuk emphasis kata kunci                      |
| FR-1.3 | Badge status: `● Open for work / internship` (dot hijau/putih berkedip)                         |
| FR-1.4 | Pill sosial horizontal: GitHub, LinkedIn, Instagram (ikon + label, klik buka tab baru)          |
| FR-1.5 | CTA button "Lihat Proyek" → scroll smooth ke #portfolio                                         |
| FR-1.6 | Elemen dekoratif subtle (grid background, atau ornamen tipografi) di background                 |

### 8.2 About Section

| ID     | Kebutuhan                                                                                                               |
| ------ | ----------------------------------------------------------------------------------------------------------------------- |
| FR-2.1 | Section header bergaya path/code: `// about_me`                                                                         |
| FR-2.2 | Paragraf bio 2–4 kalimat dengan bold/italic pada kata kunci (nama, keahlian, jumlah tahun)                              |
| FR-2.3 | Foto profil B&W dalam card/frame dengan aspek rasio portrait                                                            |
| FR-2.4 | Mini education timeline: tampilkan jenjang pendidikan (SMK/D3/S1 Manajemen Informatika) dengan nama institusi dan tahun |
| FR-2.5 | Stat cards: `2 Projects` · `1 Certificate` · `10+ Technologies`                                                         |
| FR-2.6 | Tombol "Download CV" (jika file tersedia) dan "View Projects"                                                           |

### 8.3 Portfolio Showcase — Tab Projects

| ID     | Kebutuhan                                                                                                                |
| ------ | ------------------------------------------------------------------------------------------------------------------------ |
| FR-3.1 | Tab switcher 3 item (Projects / Certificates / Tech Stack), state aktif jelas                                            |
| FR-3.2 | Kartu proyek: thumbnail/screenshot, nama proyek, deskripsi singkat 1–2 kalimat, 3 tech badge teratas, tombol "Details →" |
| FR-3.3 | Animasi transisi tab (fade atau slide)                                                                                   |
| FR-3.4 | Klik kartu/tombol → buka modal atau halaman detail (FR-6.x)                                                              |

### 8.4 Portfolio Showcase — Tab Certificates

| ID     | Kebutuhan                                                                                                 |
| ------ | --------------------------------------------------------------------------------------------------------- |
| FR-4.1 | Kartu sertifikat: preview gambar sertifikat (thumbnail), nama kursus, penerbit, tanggal, badge "Verified" |
| FR-4.2 | Klik → modal lightbox gambar penuh + metadata + tombol "Verifikasi →"                                     |

### 8.5 Portfolio Showcase — Tab Tech Stack

| ID     | Kebutuhan                                                                                                  |
| ------ | ---------------------------------------------------------------------------------------------------------- |
| FR-5.1 | Category cards masing-masing tampil sebagai panel terpisah dengan judul kategori                           |
| FR-5.2 | Isi tiap card: list teknologi dalam format teks dengan pemisah `/` (contoh: `React / Vite / Tailwind CSS`) |
| FR-5.3 | 4 kategori: **Frontend**, **Backend**, **Database**, **Auth & Tools**                                      |

### 8.6 Detail Proyek (modal / route)

| ID     | Kebutuhan                                                   |
| ------ | ----------------------------------------------------------- |
| FR-6.1 | Judul proyek, deskripsi panjang dengan bold/italic emphasis |
| FR-6.2 | Stat mini: `N Technologies Used` · `N Key Features`         |
| FR-6.3 | List "Key Features" (3–6 poin)                              |
| FR-6.4 | Tech badges (semua teknologi)                               |
| FR-6.5 | Tombol: `↗ Live Demo` dan `⌥ Source Code (GitHub)`          |
| FR-6.6 | Tombol/link "← Kembali" ke list proyek                      |
| FR-6.7 | Screenshot/gambar aplikasi jika tersedia                    |

### 8.7 Detail Sertifikat (modal)

| ID     | Kebutuhan                                                   |
| ------ | ----------------------------------------------------------- |
| FR-7.1 | Lightbox gambar sertifikat resolusi penuh                   |
| FR-7.2 | Metadata: Nama Kursus, Penerbit, Nama Penerima, Tanggal, ID |
| FR-7.3 | Tombol `↗ Verifikasi Sertifikat` menuju URL resmi           |

### 8.8 Contact Section

| ID     | Kebutuhan                                                  |
| ------ | ---------------------------------------------------------- |
| FR-8.1 | Section header `// contact`                                |
| FR-8.2 | Sub-teks ajakan singkat (mis. "Ada proyek? Mari ngobrol.") |
| FR-8.3 | Form: Nama, Email, Pesan (textarea), tombol "Kirim Pesan"  |
| FR-8.4 | Validasi form client-side: required, format email          |
| FR-8.5 | Feedback kirim: toast notifikasi sukses/gagal              |
| FR-8.6 | Sosial link pills: GitHub, LinkedIn, Instagram (minimal)   |

### 8.9 Footer

| ID     | Kebutuhan                                                              |
| ------ | ---------------------------------------------------------------------- |
| FR-9.1 | Nama "Tego Saputra" ditampilkan besar sebagai elemen penutup visual    |
| FR-9.2 | Peran singkat di bawah nama                                            |
| FR-9.3 | Grid sosial link 2 kolom (GitHub, LinkedIn, Instagram, Telegram/Email) |
| FR-9.4 | Teks copyright: `© 2026 Tego Saputra`                                  |

### 8.10 Navigasi

| ID      | Kebutuhan                                                                              |
| ------- | -------------------------------------------------------------------------------------- |
| FR-10.1 | Navbar sticky di atas: logo/nama kiri, menu kanan (Home / About / Portfolio / Contact) |
| FR-10.2 | Active highlight berdasarkan posisi scroll (scroll-spy)                                |
| FR-10.3 | Mobile: hamburger menu atau bottom nav                                                 |
| FR-10.4 | Smooth scroll ke seksi saat klik menu                                                  |

---

## 9. Kebutuhan Non-Fungsional

| ID    | Kebutuhan                                                                                                   |
| ----- | ----------------------------------------------------------------------------------------------------------- |
| NFR-1 | **Responsif** penuh: mobile ≤480px, tablet 768px, desktop ≥1280px                                           |
| NFR-2 | **Performa**: Lighthouse ≥85, gambar lazy-load & dikompresi                                                 |
| NFR-3 | **SEO dasar**: meta title, description, Open Graph, favicon                                                 |
| NFR-4 | **Aksesibilitas**: kontras WCAG AA, alt text semua gambar, navigasi keyboard                                |
| NFR-5 | **Form keamanan**: honeypot spam basic, validasi server jika pakai backend form                             |
| NFR-6 | **Deploy**: Vercel/Netlify, CI dari GitHub repo                                                             |
| NFR-7 | **Maintainability**: data proyek & sertifikat sebagai array/JSON statis, mudah ditambah tanpa ubah komponen |
| NFR-8 | **Animasi**: preferensi `prefers-reduced-motion` dihormati                                                  |

---

## 10. Fitur Nice-to-Have (Fase 2)

| Fitur                         | Catatan                                               |
| ----------------------------- | ----------------------------------------------------- |
| Guestbook / komentar publik   | Butuh backend + DB — pisah ke fase 2                  |
| Halaman Articles/Blog         | Bisa pakai MDX atau CMS ringan (Contentlayer, Sanity) |
| Statistik GitHub otomatis     | Via GitHub API — jumlah repo, commit                  |
| Light mode toggle             | Opsional, dark sebagai default                        |
| Animasi scroll-reveal halaman | Framer Motion / GSAP ScrollTrigger                    |
| Filter/search proyek          | Berguna saat jumlah proyek ≥5                         |
| Resume/CV generator PDF       | Buat CV dari data portofolio secara otomatis          |

---

## 11. Lampiran A — Data Proyek

### A.1 ABSENAPEL

| Atribut               | Detail                                                                                                                                                                                                                                                                                                                                |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Slug**              | `absenapel`                                                                                                                                                                                                                                                                                                                           |
| **Nama**              | ABSENAPEL — Smart Attendance                                                                                                                                                                                                                                                                                                          |
| **Deskripsi singkat** | Web absensi apel digital dengan validasi GPS, selfie sebagai bukti hadir, pengajuan izin, dan admin dashboard                                                                                                                                                                                                                         |
| **Deskripsi panjang** | ABSENAPEL adalah sistem absensi berbasis web yang dirancang untuk lingkungan akademik (Manajemen Informatika). Mahasiswa mengisi absensi dengan validasi **radius GPS** dan **selfie langsung** sebagai bukti kehadiran yang tidak bisa dipalsukan. Admin dapat mengelola jadwal, lokasi, dan melihat rekap absensi secara real-time. |
| **Key Features**      | Validasi radius GPS otomatis saat absen · Selfie sebagai bukti kehadiran nyata · Pengajuan & persetujuan izin mahasiswa · Dashboard admin: kelola jadwal, lokasi, rekap · Riwayat absensi per mahasiswa                                                                                                                               |
| **Tech Stack**        | React 19, Vite, Tailwind CSS, Framer Motion, Node.js, Express, Prisma ORM, PostgreSQL, Supabase, JWT, Bcrypt                                                                                                                                                                                                                          |
| **Live Demo**         | `https://projekmandiri.netlify.app`                                                                                                                                                                                                                                                                                                   |
| **Repository**        | `https://github.com/tegokkk/ABSENAPEL`                                                                                                                                                                                                                                                                                                |

### A.2 CARIMAKAN

| Atribut               | Detail                                                                                                                                                                                                                                                                                                          |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Slug**              | `carimakan`                                                                                                                                                                                                                                                                                                     |
| **Nama**              | CARIMAKAN                                                                                                                                                                                                                                                                                                       |
| **Deskripsi singkat** | Web pemesanan makanan lokal bergaya retro dengan katalog menu, cart, checkout, riwayat, favorit, review, dan admin panel                                                                                                                                                                                        |
| **Deskripsi panjang** | CARIMAKAN adalah platform pemesanan makanan lokal dengan tampilan _retro_ yang unik. Pengguna bisa menjelajahi katalog menu, menambah ke cart, checkout, melihat riwayat pesanan, menyimpan favorit, dan memberikan review. Admin mengelola menu, kategori, restoran, dan semua pesanan melalui panel terpisah. |
| **Key Features**      | Katalog & pencarian menu dengan rekomendasi · Cart dan checkout end-to-end · Riwayat pesanan & daftar favorit · Rating & review menu oleh pengguna · Admin panel lengkap (menu, restoran, user, pesanan)                                                                                                        |
| **Tech Stack**        | React 19, Vite, Tailwind CSS, GSAP, Lenis, Node.js, Express, Prisma ORM, PostgreSQL, Supabase, JWT, Bcrypt, Zod                                                                                                                                                                                                 |
| **Live Demo**         | `https://carimakan2.netlify.app`                                                                                                                                                                                                                                                                                |
| **Repository**        | `https://github.com/tegokkk/CARIMAKAN`                                                                                                                                                                                                                                                                          |

---

## 12. Lampiran B — Data Sertifikat

| Atribut            | Detail                                                              |
| ------------------ | ------------------------------------------------------------------- |
| **Slug**           | `ai-foundations`                                                    |
| **Nama Kursus**    | AI Foundations                                                      |
| **Penerbit**       | OpenAI Academy                                                      |
| **Nama Penerima**  | Tego Saputra                                                        |
| **Tanggal Terbit** | 30 Juni 2026                                                        |
| **ID Sertifikat**  | `qcvcdqayjl`                                                        |
| **URL Verifikasi** | `https://academy.openai.com/public/certificate/qcvcdqayjl`          |
| **File Gambar**    | `certificate-qcvcdqayjl.pdf` / `.png` (konversi untuk tampilan web) |

---

## 13. Lampiran C — Data Tech Stack (per Kategori)

| Kategori         | Teknologi                                                                            |
| ---------------- | ------------------------------------------------------------------------------------ |
| **Frontend**     | React 19 / Vite / React Router / Tailwind CSS / Framer Motion / GSAP / Lenis / Axios |
| **Backend**      | Node.js / Express / Prisma ORM                                                       |
| **Database**     | PostgreSQL / Supabase                                                                |
| **Auth & Tools** | JWT / Bcrypt / Zod / ESLint / GitHub / Netlify                                       |

---

## 14. Lampiran D — Data About / Timeline Pendidikan

> _Isi detail (nama institusi, tahun, dll) diisi oleh Tego sebelum coding dimulai. Struktur yang dibutuhkan:_

```json
[
  {
    "type": "education",
    "institution": "Nama Sekolah/Kampus",
    "program": "Manajemen Informatika / Rekayasa Perangkat Lunak",
    "period": "20XX — 20XX",
    "description": "Opsional: deskripsi singkat atau prestasi"
  }
]
```

---

## 15. Rekomendasi Tech Stack Pembangunan Website

| Layer         | Pilihan                 | Catatan                                          |
| ------------- | ----------------------- | ------------------------------------------------ |
| Framework     | **React + Vite**        | Konsisten dengan stack proyek Tego, build cepat  |
| Styling       | **Tailwind CSS**        | Dark theme + grid pattern custom mudah dibuat    |
| Animasi       | **Framer Motion**       | Transisi tab, hover card, scroll-reveal          |
| Form handling | **Formspree / EmailJS** | Tidak perlu backend tambahan untuk MVP           |
| Hosting       | **Vercel**              | Auto-deploy dari GitHub, free tier cukup         |
| Routing       | React Router v6         | Untuk project detail page jika tidak pakai modal |

---

## 16. Pertanyaan Terbuka — Harus Dijawab Sebelum Coding

| #   | Pertanyaan                                                                  | Keputusan Default jika tidak dijawab |
| --- | --------------------------------------------------------------------------- | ------------------------------------ |
| Q1  | Foto profil tersedia? (file apa, orientasi portrait?)                       | Gunakan placeholder monokrom         |
| Q2  | Data pendidikan / timeline: nama sekolah, jurusan, tahun?                   | Kosongkan section timeline           |
| Q3  | Domain custom atau subdomain gratis (Vercel/Netlify)?                       | Subdomain gratis                     |
| Q4  | File CV PDF tersedia untuk tombol Download CV?                              | Tombol disembunyikan                 |
| Q5  | Tautan sosial aktif: LinkedIn, Instagram, Telegram, dll?                    | Hanya GitHub yang diisi              |
| Q6  | Prefer modal atau halaman terpisah untuk detail proyek?                     | Modal (lebih smooth untuk SPA)       |
| Q7  | Nama/peran yang ingin ditampilkan: "Full-Stack Developer"? "Web Developer"? | "Full-Stack Web Developer"           |

---

## 17. Metrik Keberhasilan

- Website live dan diakses error-free di mobile + desktop.
- Kedua proyek, 1 sertifikat, dan tech stack terdokumentasi lengkap dengan link aktif.
- Form kontak mengirim pesan ke email Tego.
- Lighthouse Score: Performance ≥85, Accessibility ≥90.
- Visual sesuai panduan design language di seksi 5 dokumen ini.

---

## 18. Risiko

| Risiko                              | Mitigasi                                                                         |
| ----------------------------------- | -------------------------------------------------------------------------------- |
| Live demo Netlify cold-start / down | Tambahkan catatan "Demo mungkin loading 30 detik" di UI atau screenshot fallback |
| Foto profil belum tersedia          | Pakai placeholder dulu, ganti setelah foto ada                                   |
| Form contact gagal kirim            | Gunakan Formspree (free 50 submission/bulan) sebagai solusi cepat                |
| Konten About/Timeline belum lengkap | Kosongkan section, render hanya jika data array tidak kosong                     |

---

_PRD v2.0 — siap sebagai acuan langsung ke tahap coding. Setiap komponen memiliki ID fungsional (FR-x.x) yang bisa dijadikan checklist development._
