# Product Requirements Document (PRD) — v1.0

# Production Fix & Hardening — Website Portofolio Tego Saputra

|                       |                                                                                                                                                  |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------ |
| **Versi**             | 1.0 — Production Fix & Hardening                                                                                                                 |
| **Tanggal**           | 3 Juli 2026                                                                                                                                      |
| **Pemilik Produk**    | Tego Saputra (GitHub: tegokkk)                                                                                                                   |
| **Status**            | Ready for execution                                                                                                                              |
| **Basis temuan**      | Audit menyeluruh terhadap `PORTOO.zip` (kode sumber `src/`, `EXECUTION-CHECKLIST.md`, `README.md`, `lighthouse-report.json` tanggal 2 Juli 2026) |
| **Codebase saat ini** | React 19 + Vite + Tailwind CSS 4 + Framer Motion + lucide-react + Lenis                                                                          |

---

## 1. Latar Belakang

Audit terhadap hasil kerja `EXECUTION-CHECKLIST.md` v3 menemukan kesenjangan antara **status yang dilaporkan "selesai"** dan **kondisi kode sesungguhnya**. Yang paling signifikan: fitur form kontak via Formspree ditandai selesai dan diverifikasi ulang (3 Juli 2026), tapi `src/App.jsx` tidak memiliki elemen `<form>`/`<input>`/`<textarea>` sama sekali — hanya tautan `mailto:`. Selain itu, laporan Lighthouse terbaru menunjukkan tiga kategori belum memenuhi standar produksi: SEO (robots.txt hilang), Accessibility (form tanpa label), dan Agentic Browsing (llms.txt hilang, accessibility tree tidak well-formed).

Dokumen ini adalah PRD **perbaikan (fix), bukan fitur baru** — tujuannya menutup kesenjangan antara klaim "selesai" dan kenyataan, serta membawa situs ke kondisi benar-benar siap produksi.

## 2. Tujuan

1. Membuat form kontak yang benar-benar fungsional dan terkirim via Formspree, sesuai yang sudah diklaim selesai di `EXECUTION-CHECKLIST.md`.
2. Menutup tiga defisit Lighthouse: SEO (robots.txt), Accessibility (label form), Agentic Browsing (llms.txt + accessibility tree).
3. Menaikkan skor Performance Lighthouse dari 87 dengan menuntaskan item yang skornya 0 (render-blocking, unused JS, forced reflow, network dependency tree).
4. Membersihkan artefak development yang tidak seharusnya ikut dalam deliverable/repo (node_modules, folder analisis sementara, tool config agent).
5. Memastikan checklist status dan kode sumber selalu selaras — tidak ada lagi task tercentang `[x]` tanpa bukti di kode.

## 3. Non-Goals

- Tidak mengubah struktur informasi, data proyek/sertifikat/tech stack yang sudah final di `PORTO.md` v2.0.
- Tidak menambahkan halaman/route baru — tetap single-page + modal.
- Tidak mengganti Formspree dengan backend custom.
- Tidak termasuk polesan visual/estetika (dibahas terpisah di **PRD-UI-POLISH-v1.md**).

## 4. Ruang Lingkup Fungsional

### 4.1 Priority 0 — Kesenjangan Kritis (blocker, kerjakan pertama)

| ID   | Task                                           | File                             | Detail                                                                                                                                                                                                                                                                      |
| ---- | ---------------------------------------------- | -------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P0.1 | Bangun ulang form kontak nyata                 | `src/App.jsx`, `src/components/` | Tambahkan `<form>` dengan field nama, email, pesan (`<input>`/`<textarea>` dengan `<label>` yang terasosiasi via `htmlFor`/`id`, bukan hanya placeholder). Submit via `fetch()` ke `formEndpoint` dari `src/data/portfolio.js` (variabel ini sudah ada tapi belum dipakai). |
| P0.2 | State submit: loading, success, error          | `src/App.jsx`                    | `isSubmitting`, `toast` (sukses/gagal) muncul dan auto-dismiss 4 detik (logic ini sudah ada di CSS `.form-toast` tapi belum ada pemicunya di JS).                                                                                                                           |
| P0.3 | Fallback jika `VITE_FORMSPREE_ENDPOINT` kosong | `src/App.jsx`                    | Tampilkan toast konfigurasi + sarankan tautan `mailto:` langsung (perilaku ini sudah didokumentasikan di README, implementasikan sesuai deskripsi).                                                                                                                         |
| P0.4 | Update `EXECUTION-CHECKLIST.md`                | `EXECUTION-CHECKLIST.md`         | Setelah P0.1–P0.3 selesai dan terverifikasi jalan di `npm run build && npm run preview`, baru tandai ulang item P1.6 dan P3.3 sebagai selesai — jangan tandai selesai berdasarkan asumsi.                                                                                   |

### 4.2 Priority 1 — Lighthouse Compliance

| ID   | Task                          | File                                       | Target audit                                                                                                                                                                                                                                                                                      |
| ---- | ----------------------------- | ------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P1.1 | Tambahkan `public/robots.txt` | `public/robots.txt` (baru)                 | `robots-txt` audit → score 1. Minimal: `User-agent: *`, `Allow: /`, `Sitemap: https://tego-saputra.vercel.app/sitemap.xml`.                                                                                                                                                                       |
| P1.2 | Tambahkan `public/llms.txt`   | `public/llms.txt` (baru)                   | `llms-txt` audit → score 1. Ikuti spesifikasi llmstxt.org: judul, ringkasan singkat, daftar tautan penting (Home, Projects, CV, Contact) dalam format markdown.                                                                                                                                   |
| P1.3 | Label form yang terasosiasi   | `src/App.jsx` (bagian dari P0.1)           | `label` & `label-content-name-mismatch` audit → score 1. Setiap `<input>`/`<textarea>` wajib punya `<label htmlFor="...">` yang match `id`, atau `aria-label` jika label disembunyikan secara visual.                                                                                             |
| P1.4 | Perbaiki accessibility tree   | `src/App.jsx`, `src/components/modals.jsx` | `agent-accessibility-tree` audit. Audit ulang struktur heading (h1→h2→h3 berurutan tanpa loncat level), landmark region (`<main>`, `<nav>`, `<footer>` sudah ada — pastikan tidak ada nested landmark yang salah), dan pastikan modal punya `role="dialog"` + `aria-modal="true"` yang konsisten. |

### 4.3 Priority 2 — Performance Hardening

| ID   | Task                                     | Detail                                                                                                                                                                                                                                                                            |
| ---- | ---------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| P2.1 | Render-blocking requests → 0             | Audit `render-blocking-insight`. Pastikan CSS kritikal di-inline atau di-split, font (jika ada) pakai `font-display: swap` + preload.                                                                                                                                             |
| P2.2 | Unused JavaScript → 0                    | Audit `unused-javascript`. Cek `lucide-react` — pastikan import per-icon (tree-shakeable), bukan barrel import penuh. Cek apakah semua fitur Framer Motion yang di-import benar-benar dipakai.                                                                                    |
| P2.3 | Perbaiki image delivery                  | Audit `image-delivery-insight` (skor 0.5). Konversi `project-absenapel.png`, `project-carimakan.png`, `certificate-*.png`, `profile-tego.jpeg` ke format modern (WebP/AVIF) dengan fallback, dan pastikan ukuran render sesuai `screenshotSize` yang sudah didefinisikan di data. |
| P2.4 | Kurangi forced reflow & main-thread work | Audit `forced-reflow-insight`, `mainthread-work-breakdown`. Cek animasi custom cursor/parallax (P2.1–P2.3 di `EXECUTION-CHECKLIST.md` lama) — pastikan baca-tulis DOM tidak bergantian dalam satu frame (batching via `requestAnimationFrame`).                                   |
| P2.5 | Sederhanakan network dependency tree     | Audit `network-dependency-tree-insight`. Cek rantai import CSS/JS di `src/styles.css` dan `main.jsx` — kurangi kedalaman chain request kritikal.                                                                                                                                  |

### 4.4 Priority 3 — Repo & Deliverable Hygiene

| ID   | Task                                                                      | Detail                                                                                                                                                                                                                                                                                     |
| ---- | ------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| P3.1 | Pastikan `node_modules/` tidak ikut ter-zip/ter-share                     | Sudah ada di `.gitignore`, tapi tetap ikut dalam arsip yang dibagikan. Buat proses export/zip yang menghormati `.gitignore` (`git archive`, atau exclude manual).                                                                                                                          |
| P3.2 | Keluarkan folder kerja sementara dari deliverable                         | `.tmp-video-analysis/`, `.agents/`, `.codex/` adalah artefak proses development (analisis video referensi desain, config AI coding tool) — bukan bagian dari aplikasi. Tambahkan ke `.gitignore` dan pastikan tidak ikut saat share ke pihak lain (misalnya untuk review recruiter/klien). |
| P3.3 | Jangan sertakan `.env.local` berisi endpoint asli saat membagikan project | Endpoint Formspree publik risikonya rendah, tapi sebagai kebiasaan baik: gunakan `.env.example` dengan placeholder saat membagikan source code, simpan `.env.local` asli hanya di environment deploy.                                                                                      |
| P3.4 | Selaraskan status checklist dengan kode                                   | Setiap kali task ditandai `[x]`, lampirkan bukti verifikasi (screenshot, hasil `npm run build`, atau commit hash) — mencegah kejadian seperti P0.1 terulang.                                                                                                                               |

## 5. Kebutuhan Non-Fungsional

| ID     | Kebutuhan                                                                                                                                                                                 |
| ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NFR-F1 | Form kontak harus bisa dikirim end-to-end (submit → email diterima di `tegosaputra02@gmail.com`) sebelum P0 dianggap selesai — bukan hanya lolos review kode.                             |
| NFR-F2 | Setelah semua Priority 0–2 selesai, re-run Lighthouse: target Performance ≥90, Accessibility ≥98, SEO ≥98, Agentic Browsing ≥80.                                                          |
| NFR-F3 | Tidak ada regresi terhadap fitur interaktivitas yang sudah ada di `EXECUTION-CHECKLIST.md` v3 (scroll-reveal, custom cursor, dll.) — jalankan smoke test manual setelah setiap perubahan. |
| NFR-F4 | Semua perubahan form kontak tetap menghormati `prefers-reduced-motion` untuk animasi toast/transisi state.                                                                                |

## 6. Kriteria Sukses (Definition of Done)

- Mengisi dan submit form kontak di situs live menghasilkan email masuk ke `tegosaputra02@gmail.com`, tanpa membuka aplikasi email (`mailto:`) sebagai satu-satunya jalan.
- `public/robots.txt` dan `public/llms.txt` dapat diakses di `/robots.txt` dan `/llms.txt` pada domain production.
- Re-audit Lighthouse menunjukkan: Performance ≥90, Accessibility ≥98, SEO ≥98, Best Practices tetap 100, Agentic Browsing ≥80.
- Arsip/repo yang dibagikan ke pihak eksternal tidak lagi berisi `node_modules/`, `.tmp-video-analysis/`, `.agents/`, `.codex/`.
- `EXECUTION-CHECKLIST.md` dan `PRD_ACCEPTANCE.md` merefleksikan kondisi kode yang sebenarnya, terverifikasi lewat `npm run build && npm run preview` tanpa error/warning baru.

## 7. Risiko

| Risiko                                                             | Mitigasi                                                                                                                    |
| ------------------------------------------------------------------ | --------------------------------------------------------------------------------------------------------------------------- |
| Formspree free tier ada limit submission bulanan                   | Cek dashboard Formspree, siapkan fallback `mailto:` yang tetap tampil sebagai opsi sekunder di UI, bukan dihilangkan total. |
| Konversi gambar ke WebP/AVIF mengubah tampilan di browser lama     | Gunakan `<picture>` dengan fallback ke format asli (PNG/JPEG) via `<source>`.                                               |
| Perbaikan accessibility tree tanpa sengaja mengubah styling visual | Pisahkan perubahan struktur HTML/ARIA dari perubahan CSS, review satu per satu.                                             |

## 8. Referensi

- `PORTO.md` v2.0 — struktur & design language dasar.
- `PRD-INTERACTIVE-v3.md` — PRD lapisan interaktivitas (sudah dieksekusi).
- `EXECUTION-CHECKLIST.md` — checklist teknis yang perlu diverifikasi ulang terhadap kode aktual.
- `lighthouse-report.json` (2 Juli 2026) — sumber data audit performa/SEO/accessibility/agentic-browsing.

---

_PRD ini adalah lapisan perbaikan di atas PRD-INTERACTIVE-v3.md — fokus menutup gap antara status "selesai" yang dilaporkan dan kondisi kode sesungguhnya, bukan menambah fitur baru._
