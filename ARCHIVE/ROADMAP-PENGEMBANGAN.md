# Roadmap Pengembangan Portfolio Tego Saputra

Dokumen ini berisi rencana pengerjaan untuk mengembangkan web portfolio dari sisi tampilan, UX, konten, teknis, performa, aksesibilitas, dan kesiapan production.

## Kondisi Saat Ini

Project sudah memiliki fondasi yang cukup baik:

- Vite + React sudah berjalan.
- Tailwind CSS v4 sudah aktif melalui `src/styles.css`.
- TypeScript support sudah tersedia melalui `tsconfig.json`.
- Struktur folder sudah mulai rapi:
  - `src/sections`
  - `src/components`
  - `src/components/shared`
  - `src/components/modals`
  - `src/components/ui`
- SEO dasar sudah tersedia di `index.html`.
- Data portfolio sudah dipusatkan di `src/data/portfolio.ts`.
- Build dan typecheck berhasil.

Verifikasi yang perlu dijaga:

```bash
npm run typecheck
npm run build
```

## Default Path Project

Path penting yang dipakai project:

- Components utama: `src/components`
- shadcn UI components: `src/components/ui`
- Sections halaman: `src/sections`
- Shared components: `src/components/shared`
- Styles utama: `src/styles.css`
- Styles portfolio: `src/styles/creative-portfolio.css`
- Data portfolio: `src/data/portfolio.ts`
- Utility: `src/lib`

Folder `src/components/ui` penting karena shadcn CLI akan menaruh komponen seperti `button`, `card`, `dialog`, `badge`, `input`, dan `textarea` di sana. Folder ini memisahkan primitive UI reusable dari komponen khusus halaman.

## Catatan Penting

Folder shadcn UI sudah tersedia di:

```txt
src/components/ui
```

Folder tersebut sudah berisi komponen dasar shadcn seperti `button`, `card`, `dialog`, `badge`, `input`, dan `textarea`.

Komponen wave background sudah tersedia. Path kompatibel yang bisa dipakai:

```txt
src/components/ui/wave-background.tsx
```

Dependency `simplex-noise` sudah tercatat di `package.json`.

## Tujuan Pengembangan

Tujuan utama pengembangan web ini:

- Membuat first impression lebih kuat dan profesional.
- Menampilkan project sebagai studi kasus, bukan hanya daftar karya.
- Meningkatkan konsistensi desain dengan sistem UI reusable.
- Memperkuat konten untuk recruiter, client, dan reviewer teknis.
- Menjaga performa, aksesibilitas, dan SEO tetap baik.
- Menyiapkan codebase agar lebih mudah dikembangkan.

## Prioritas Pengerjaan

### P0 - Fondasi Teknis

- [x] Pastikan `npm run typecheck` selalu lulus.
- [x] Pastikan `npm run build` selalu lulus.
- [x] Tambahkan script `lint`.
- [x] Tambahkan script `format`.
- [x] Tambahkan konfigurasi ESLint.
- [x] Tambahkan konfigurasi Prettier.
- [ ] Rapikan dependency yang belum dipakai.
- [x] Pastikan semua dependency yang dipakai tercatat langsung di `package.json`.

### P1 - Hero Section

Masalah saat ini:

Hero sudah bersih, tetapi belum cukup kuat sebagai first impression portfolio developer.

Target:

- Hero terasa lebih personal, modern, dan memorable.
- Nama dan role langsung jelas di viewport pertama.
- CTA utama mudah dipahami.
- Visual utama lebih kuat daripada sekadar portrait card.

Checklist pengerjaan:

- [x] Ganti copy generik menjadi lebih tajam.
- [x] Tambahkan visual background interaktif, misalnya `Waves`.
- [x] Pastikan visual background tidak mengganggu keterbacaan teks.
- [x] Tambahkan tech highlight singkat di hero.
- [x] Tambahkan CTA `View Projects` dan `Download CV` yang lebih jelas.
- [x] Pastikan hero tetap bagus di mobile.

Contoh arah copy:

```txt
Saya membangun aplikasi web full-stack yang rapi, cepat, dan siap dipakai untuk alur kerja nyata.
```

### P2 - Project Section dan Case Study

Masalah saat ini:

Project sudah tampil, tetapi belum terasa sebagai studi kasus profesional.

Target:

- Project card mudah dipindai.
- Project detail menjelaskan problem, solusi, role, fitur, stack, dan impact.
- Viewer bisa memahami kualitas kerja tanpa harus membuka repository.

Checklist pengerjaan:

- [x] Perkuat layout project card.
- [x] Tampilkan 3 fitur utama per project.
- [x] Tampilkan stack utama dengan badge yang konsisten.
- [x] Upgrade modal project menjadi format case study.
- [x] Tambahkan bagian `Problem`.
- [x] Tambahkan bagian `Solution`.
- [x] Tambahkan bagian `My Role`.
- [ ] Tambahkan bagian `Tech Decisions`.
- [x] Tambahkan bagian `Key Features`.
- [x] Tambahkan bagian `Screenshots`.
- [x] Tambahkan bagian `Challenges`.
- [x] Tambahkan bagian `What I Learned`.

Data yang disarankan untuk ditambahkan ke setiap project:

```js
metrics: [
  { label: "Core Features", value: "5+" },
  { label: "Stack", value: "Full-stack" },
]

challenges: [
  "Validasi GPS agar tidak mudah dimanipulasi",
  "Mengatur data absensi agar mudah diaudit admin",
]

learnings: [
  "Mendesain flow produk dari user sampai admin",
  "Mengelola integrasi frontend, backend, dan database",
]
```

### P3 - About dan Credibility

Masalah saat ini:

About section sudah ada, tetapi bisa dibuat lebih kuat sebagai bukti kompetensi.

Target:

- About tidak hanya menjelaskan diri, tetapi membangun trust.
- Sertifikat, GitHub, CV, dan tech stack punya posisi yang jelas.

Checklist pengerjaan:

- [ ] Tambahkan timeline pendidikan dan pengalaman.
- [ ] Tambahkan ringkasan fokus skill.
- [x] Tambahkan GitHub signal atau contribution summary.
- [ ] Tambahkan certificate block yang lebih ringkas.
- [x] Tambahkan CV preview yang mudah dibuka.
- [ ] Tambahkan CTA kontak di akhir About.

Konten yang disarankan:

- Fokus: full-stack web app, dashboard, auth, database, responsive UI.
- Strength: React, Node.js, Express, Prisma, PostgreSQL, Supabase.
- Goal: internship, freelance, project collaboration.

### P4 - Contact Section

Masalah saat ini:

Form kontak sudah ada, tetapi fallback dan kejelasan channel bisa diperkuat.

Target:

- User mudah menghubungi lewat form, email, atau sosial.
- Jika Formspree belum aktif, user tetap punya jalur kontak jelas.

Checklist pengerjaan:

- [x] Tambahkan status konfigurasi Formspree.
- [x] Tambahkan fallback email yang lebih jelas.
- [ ] Tambahkan tombol WhatsApp jika ingin menerima kontak langsung.
- [ ] Tambahkan validasi form yang lebih baik.
- [x] Tambahkan loading dan success state yang lebih polished.
- [x] Tambahkan error message yang spesifik.

### P5 - Design System dan shadcn UI

Masalah saat ini:

Struktur shadcn sudah ada, tetapi belum dimanfaatkan.

Target:

- Komponen UI konsisten.
- Button, card, modal, badge, input, dan textarea reusable.
- Styling lebih mudah dijaga saat project bertambah.

Checklist pengerjaan:

- [x] Generate atau buat `src/components/ui/button.tsx`.
- [x] Generate atau buat `src/components/ui/card.tsx`.
- [x] Generate atau buat `src/components/ui/dialog.tsx`.
- [x] Generate atau buat `src/components/ui/badge.tsx`.
- [x] Generate atau buat `src/components/ui/input.tsx`.
- [x] Generate atau buat `src/components/ui/textarea.tsx`.
- [ ] Migrasi tombol custom ke komponen `Button`.
- [ ] Migrasi modal custom ke komponen `Dialog` jika cocok.
- [x] Pastikan token warna Tailwind tetap sesuai desain portfolio.

Command referensi:

```bash
npx shadcn@latest add button card dialog badge input textarea
```

### P6 - TypeScript Migration

Masalah saat ini:

TypeScript sudah tersedia, tetapi sebagian besar file masih `.jsx`.

Target:

- Data dan komponen utama punya typing jelas.
- Error lebih mudah ditemukan sebelum build.
- Project lebih siap dikembangkan.

Checklist pengerjaan:

- [x] Ubah `src/data/portfolio.js` menjadi `src/data/portfolio.ts`.
- [x] Buat type `Profile`.
- [x] Buat type `Project`.
- [x] Buat type `Certificate`.
- [x] Buat type `TechStackGroup`.
- [x] Migrasi `App.jsx` ke `App.tsx`.
- [x] Migrasi sections satu per satu ke `.tsx`.
- [x] Migrasi shared components ke `.tsx`.
- [x] Pastikan `npm run typecheck` lulus setelah setiap migrasi.

### P7 - Performance

Data Lighthouse terbaru setelah eksekusi ulang 3 Juli 2026 pada preview lokal:

- Performance: 81
- Accessibility: 100
- Best Practices: 100
- SEO: 100
- FCP: 3.3s
- LCP: 3.6s
- Speed Index: 3.3s
- CLS: 0
- TBT: 160ms

Masalah utama:

TBT sudah masuk target di bawah 200ms, tetapi FCP, LCP, dan Speed Index masih perlu dioptimasi agar Performance bisa naik ke 90+.

Checklist pengerjaan:

- [x] Lazy-load modal components.
- [x] Lazy-load heavy animation components.
- [x] Pastikan gambar memakai WebP jika tersedia.
- [x] Pastikan gambar punya width dan height.
- [ ] Kurangi animasi yang berjalan terus-menerus di mobile.
- [x] Matikan efek berat saat `prefers-reduced-motion` aktif.
- [x] Jalankan Lighthouse ulang setelah perubahan besar.

Target performa:

- Performance minimal 90.
- TBT di bawah 200ms.
- CLS tetap 0.
- LCP di bawah 2s.

### P8 - Accessibility

Kondisi saat ini cukup baik, tetapi tetap perlu dijaga.

Checklist pengerjaan:

- [x] Pastikan semua tombol punya label jelas.
- [x] Pastikan link eksternal memakai teks yang mudah dipahami.
- [ ] Pastikan kontras warna cukup.
- [x] Pastikan modal focus trap bekerja.
- [x] Pastikan ESC bisa menutup modal.
- [x] Pastikan keyboard navigation lancar.
- [x] Pastikan form label tersambung ke input.
- [x] Test dengan keyboard tanpa mouse.

### P9 - SEO dan Sharing Preview

Kondisi saat ini sudah cukup baik.

Checklist pengerjaan:

- [ ] Pastikan title dan description lebih tajam.
- [x] Tambahkan structured data `Person`.
- [x] Tambahkan structured data `CreativeWork` untuk project.
- [ ] Pastikan OG image terlihat bagus saat dibagikan.
- [ ] Buat OG image khusus, bukan hanya foto profil.
- [ ] Pastikan `sitemap.xml` sesuai domain production.
- [ ] Pastikan `robots.txt` benar.

### P10 - Testing

Belum ada test otomatis khusus.

Checklist pengerjaan:

- [x] Tambahkan Playwright smoke test.
- [x] Test halaman berhasil load.
- [x] Test nav scroll ke section.
- [x] Test project modal bisa dibuka dan ditutup.
- [x] Test certificate modal bisa dibuka.
- [x] Test contact form fallback.
- [x] Test mobile viewport.

Command referensi:

```bash
npm install -D @playwright/test
npx playwright install
```

## Urutan Eksekusi Yang Disarankan

### Sprint 1 - Visual Impact

- [x] Pasang `wave-background.tsx` ke `src/components/ui`.
- [x] Install `simplex-noise`.
- [x] Integrasikan wave background ke Hero.
- [x] Rework copy Hero.
- [x] Polish CTA dan spacing mobile.

### Sprint 2 - Portfolio Depth

- [x] Upgrade data project.
- [x] Upgrade project card.
- [x] Upgrade project modal menjadi case study.
- [x] Tambahkan challenge dan learning per project.
- [ ] Tambahkan screenshot tambahan jika tersedia.

### Sprint 3 - UI System

- [x] Tambahkan komponen shadcn dasar.
- [x] Buat `Button`, `Card`, `Badge`, `Dialog`, `Input`, `Textarea`.
- [ ] Migrasi komponen yang paling sering dipakai.
- [ ] Rapikan CSS custom yang duplikat.

### Sprint 4 - TypeScript dan Quality

- [x] Migrasi data ke TypeScript.
- [x] Migrasi section utama ke TypeScript.
- [x] Tambahkan lint dan format.
- [x] Tambahkan Playwright smoke test.

### Sprint 5 - Production Polish

- [x] Lighthouse ulang.
- [x] Optimasi TBT.
- [x] Tambahkan structured data.
- [ ] Tambahkan OG image khusus.
- [ ] Final QA desktop dan mobile.

## Kriteria Selesai

Web dianggap jauh lebih matang jika memenuhi ini:

- [x] First viewport langsung menunjukkan identitas dan spesialisasi.
- [x] Project tampil sebagai case study, bukan sekadar daftar link.
- [x] Contact flow jelas dan bisa digunakan.
- [x] Build dan typecheck selalu lulus.
- [ ] Lighthouse performance minimal 90.
- [x] Tidak ada layout shift besar.
- [x] Mobile experience rapi.
- [x] Komponen UI dasar sudah reusable.
- [x] Data project mudah ditambah tanpa mengubah layout besar.

## Status Eksekusi Terbaru

Sudah dieksekusi pada sesi ini dan/atau oleh Antigravity sebelumnya:

- Sprint 1 visual impact sudah berjalan: wave background, hero copy, tech highlight, dan CTA hero aktif.
- Sprint 2 portfolio depth sebagian besar sudah berjalan: data project, fitur utama, metrics, challenges, learnings, dan case-study modal aktif.
- Sprint 3 UI system sebagian sudah berjalan: komponen dasar shadcn tersedia di `src/components/ui`.
- Sprint 4 TypeScript dan quality sebagian besar sudah berjalan: data, app, sections, shared components, lint, format, typecheck, dan build valid.
- P4 contact sudah diperkuat dengan status Formspree, fallback email, typed form events, loading state, dan error message yang lebih spesifik.

Gate terakhir yang sudah lulus:

```bash
npm run typecheck
npm run lint
npm run format:check
npm run build
npm run test:smoke
```

Lighthouse terbaru sudah dijalankan ulang dan tersimpan di `lighthouse-report.json`:

```txt
Performance: 81
Accessibility: 100
Best Practices: 100
SEO: 100
FCP: 3.3s
LCP: 3.6s
Speed Index: 3.3s
CLS: 0
TBT: 160ms
```

Catatan: Lighthouse CLI berhasil menulis report, tetapi Chrome launcher masih mengeluarkan error cleanup temp `EPERM` di Windows. Report tetap valid dan preview server sudah dihentikan.

Sisa besar yang belum dieksekusi penuh:

- Tambah bagian `Tech Decisions` di project case study.
- Tambah timeline pendidikan/pengalaman dan ringkasan fokus skill di About.
- Tambah tombol WhatsApp jika memang ingin channel kontak langsung.
- Migrasi tombol/modal custom agar benar-benar memakai komponen shadcn UI.
- Optimasi FCP/LCP/Speed Index agar Performance naik dari 81 ke 90+.
- Tambah OG image khusus dan verifikasi `sitemap.xml` / `robots.txt`.
- Rapikan dependency yang belum dipakai dan CSS custom yang duplikat.

## Risiko Yang Perlu Dijaga

- Terlalu banyak animasi bisa menurunkan performa.
- Visual terlalu gelap bisa mengurangi keterbacaan.
- Project detail yang terlalu pendek bisa membuat portfolio terasa kurang profesional.
- Migrasi TypeScript sekaligus terlalu besar bisa membuat pengerjaan lambat.
- Mengganti semua CSS sekaligus bisa merusak layout yang sudah stabil.

## Rekomendasi Langkah Pertama

Langkah pertama yang paling berdampak:

1. Perbaiki Hero Section.
2. Pasang Wave Background dengan benar.
3. Upgrade Project Modal menjadi studi kasus.

Tiga hal ini paling cepat menaikkan kualitas persepsi website.
