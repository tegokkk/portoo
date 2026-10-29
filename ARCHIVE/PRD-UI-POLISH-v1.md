# Product Requirements Document (PRD) — v1.0

# UI Visual Polish — Website Portofolio Tego Saputra

|                      |                                                                                                                                          |
| -------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Versi**            | 1.0 — UI Visual Polish                                                                                                                   |
| **Tanggal**          | 3 Juli 2026                                                                                                                              |
| **Pemilik Produk**   | Tego Saputra (GitHub: tegokkk)                                                                                                           |
| **Status**           | Ready for execution                                                                                                                      |
| **Basis**            | `DESIGN.md` (analisis referensi video desain), `PORTO.md` v2.0, hasil review `.tmp-video-analysis/ui-check-2/` (desktop, mobile, tablet) |
| **Berjalan bersama** | `PRD-PRODUCTION-FIX-v1.md` (perbaikan fungsional) — dokumen ini murni soal kualitas visual, tidak mengubah fungsi.                       |

---

## 1. Latar Belakang

`DESIGN.md` sudah mendefinisikan arah visual yang jelas dari analisis video referensi: **"Dark Technical SaaS Dashboard"** — near-black background, permukaan charcoal low-contrast, radius tight, accent color terbatas, tanpa gradient/dekorasi berlebihan. Website saat ini sudah mengimplementasikan sebagian besar layer interaktif (`PRD-INTERACTIVE-v3.md`) dan punya fondasi styling di `src/styles/*.css`, tapi belum ada audit khusus yang memverifikasi konsistensi eksekusi visual terhadap acuan `DESIGN.md` di seluruh section — mengingat sudah ada 3 iterasi screenshot QA (`ui-check`, `ui-check-2`) yang mengindikasikan proses refinement masih berlangsung.

Dokumen ini menyusun poles UI sebagai pekerjaan terstruktur: audit konsistensi terhadap `DESIGN.md`, lalu perbaikan detail per section.

## 2. Tujuan

1. Memastikan seluruh section (Hero, About, Portfolio, Tech Stack, Contact, Footer) konsisten mengikuti palet warna, tipografi, dan spacing yang didefinisikan di `DESIGN.md`.
2. Menaikkan kesan "produk teknis presisi" — bukan portofolio generik — lewat detail kecil: alignment grid, hierarki tipografi, konsistensi radius/border, dan penggunaan warna aksen yang disiplin.
3. Menutup gap visual antara desktop, tablet, dan mobile (berdasarkan 3 breakpoint yang sudah diuji di `.tmp-video-analysis/ui-check-2/`).
4. Menjaga readability dan kontras tetap memenuhi WCAG AA meski tema dominan gelap.

## 3. Non-Goals

- Tidak mengubah data/konten (nama, deskripsi proyek, tech stack) — itu domain `PORTO.md` v2.0.
- Tidak mengubah animasi/interaksi yang sudah dieksekusi di `PRD-INTERACTIVE-v3.md`, kecuali jika animasi tersebut menyebabkan masalah visual (mis. flash of unstyled content).
- Tidak menambah section baru.
- Tidak mengubah copy/tone bahasa.

## 4. Prinsip Desain (dari `DESIGN.md`)

| Prinsip                                | Penjelasan                                                                                                  |
| -------------------------------------- | ----------------------------------------------------------------------------------------------------------- |
| **Product-led, bukan marketing-heavy** | Hindari hero besar dekoratif; utamakan konten yang terasa seperti dashboard produk — padat tapi terkontrol. |
| **Kontras rendah antar-permukaan**     | Gunakan gradasi charcoal (base → surface → raised → card) bukan lompatan kontras tajam antar-layer.         |
| **Radius ketat & profesional**         | Hindari radius besar/bulat berlebihan pada card dan button — kesan teknis, bukan playful.                   |
| **Aksen warna terbatas & bermakna**    | Warna aksen (`--accent`) hanya untuk status, CTA, dan penekanan data — tidak dipakai dekoratif.             |
| **Grid stabil**                        | Alignment konsisten antar-section, hindari elemen yang "mengambang" tanpa keterkaitan grid.                 |

## 5. Ruang Lingkup Fungsional

### 5.1 Priority 1 — Audit Konsistensi Visual (kerjakan pertama)

| ID   | Task                                    | File                                                                                        | Detail                                                                                                                                                                                                                                              |
| ---- | --------------------------------------- | ------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| U1.1 | Audit palet warna aktual vs `DESIGN.md` | `src/styles/base.css`                                                                       | Bandingkan CSS variable warna (`--bg`, `--surface`, `--card`, `--accent`, dll.) dengan palet yang diekstrak di `DESIGN.md` §3 (Base black `#000001`, Main surface `#0C0C0C`, Raised `#151515`, Card `#1E1E1E`). Perbaiki penyimpangan.              |
| U1.2 | Audit tipografi                         | `src/styles/base.css`, `src/styles/hero.css`                                                | Pastikan hierarki heading (H1 hero → H2 section title → H3 card title) punya scale yang jelas dan konsisten di semua section, termasuk font-weight dan letter-spacing untuk kesan "technical/monospace" yang disebut di `PRD-INTERACTIVE-v3.md` §4. |
| U1.3 | Audit radius & border                   | `src/styles/*.css`                                                                          | Cek semua card (project card, tech chip, certificate card) — samakan radius (target: tight, bukan pill/rounded besar) dan ketebalan border tipis konsisten sesuai `DESIGN.md`.                                                                      |
| U1.4 | Audit 3 breakpoint dari QA screenshot   | `.tmp-video-analysis/ui-check-2/desktop.png`, `mobile.png`, `tablet.png` vs kondisi terkini | Bandingkan screenshot QA terakhir dengan render situs saat ini — pastikan tidak ada regresi dari iterasi refinement yang sudah dilakukan sebelumnya.                                                                                                |

### 5.2 Priority 2 — Poles Per Section

| ID   | Section                                          | Task                                                                                                                                                                                                                                                                   |
| ---- | ------------------------------------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| U2.1 | Hero                                             | Pastikan komposisi mengikuti pola "left copy, right visual panel" ala `DESIGN.md` §2 jika memungkinkan dalam layout single-column mobile-first yang ada; perkuat status badge ("Open for work") agar terasa seperti status indicator dashboard, bukan badge marketing. |
| U2.2 | About / Stats                                    | Rapikan grid stat card (Projects/Certificate/Technologies) agar sejajar sempurna di semua breakpoint; pastikan angka counter (dari `PRD-INTERACTIVE-v3.md` P1.3) punya tipografi tabular (`font-variant-numeric: tabular-nums`) agar tidak "bergeser" saat menghitung. |
| U2.3 | Portfolio (tab Projects/Certificates/Tech Stack) | Samakan tinggi card dalam satu baris (equal height grid), perbaiki konsistensi padding internal card, pastikan ikon tech stack (`public/icons/*.svg`) punya ukuran & alignment vertikal yang seragam.                                                                  |
| U2.4 | Modal detail proyek/sertifikat                   | Audit `src/components/modals.jsx` — pastikan modal mengikuti prinsip permukaan charcoal berlapis (bukan overlay hitam pekat polos), radius konsisten dengan card di halaman utama.                                                                                     |
| U2.5 | Contact section                                  | Setelah form kontak nyata dibangun (lihat `PRD-PRODUCTION-FIX-v1.md` P0.1), styling input/textarea/button harus mengikuti sistem desain yang sama: border tipis, focus state jelas dengan warna aksen, radius konsisten dengan card lain.                              |
| U2.6 | Footer                                           | Pastikan footer minimal, tidak "berat" secara visual, selaras dengan prinsip negative space besar di `DESIGN.md`.                                                                                                                                                      |

### 5.3 Priority 3 — Detail & Micro-polish

| ID   | Task                                                                                                                                                    |
| ---- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| U3.1 | Cek konsistensi warna hover/focus state di semua elemen interaktif (link, button, card) — harus satu sistem, bukan warna ad-hoc berbeda per komponen.   |
| U3.2 | Cek kontras teks-di-atas-gambar (mis. overlay di project screenshot) memenuhi WCAG AA (rasio kontras ≥4.5:1 untuk teks normal).                         |
| U3.3 | Pastikan ambient glow (dari `PRD-INTERACTIVE-v3.md` P2.9) tidak menyebabkan color banding atau performa render turun di GPU low-end.                    |
| U3.4 | Review scrollbar custom (jika ada) dan cursor kustom (dari P2.1) tetap dalam palet warna yang sama dengan tema keseluruhan.                             |
| U3.5 | Pastikan favicon (`public/favicon.svg`) dan preview OG image (`profile-tego.jpeg`) merepresentasikan brand secara konsisten dengan tema dark technical. |

## 6. Kebutuhan Non-Fungsional

| ID     | Kebutuhan                                                                                                                                                                                |
| ------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NFR-U1 | Semua perubahan visual tidak boleh menurunkan skor Lighthouse Performance yang sudah dicapai (baseline 87, target ≥90 sesuai `PRD-PRODUCTION-FIX-v1.md`).                                |
| NFR-U2 | Kontras warna teks-terhadap-background minimal WCAG AA di seluruh section, termasuk dalam kondisi ambient glow aktif.                                                                    |
| NFR-U3 | Konsistensi visual harus terverifikasi di 3 breakpoint minimum: mobile (≤480px), tablet (768px), desktop (≥1280px) — sesuai struktur pengujian yang sudah ada di `.tmp-video-analysis/`. |
| NFR-U4 | Tidak ada perubahan visual yang memicu Cumulative Layout Shift (CLS) baru.                                                                                                               |

## 7. Kriteria Sukses (Definition of Done)

- Perbandingan side-by-side screenshot sebelum/sesudah menunjukkan konsistensi palet warna, radius, dan tipografi di semua section sesuai `DESIGN.md`.
- Tidak ada elemen yang secara visual "menyimpang" dari sistem desain (radius berbeda sendiri, warna aksen dipakai di luar konteks CTA/status).
- Review manual di 3 breakpoint (mobile/tablet/desktop) tidak menemukan elemen yang terpotong, tidak sejajar, atau overflow.
- Lighthouse Accessibility tetap ≥98 setelah semua perubahan visual (kontras tidak turun).
- Tidak ada regresi performa (bundle CSS tidak membengkak signifikan, animasi tetap smooth).

## 8. Risiko

| Risiko                                                                       | Mitigasi                                                                                                                 |
| ---------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------ |
| Terlalu banyak micro-adjustment tanpa arah jelas ("bikin bagus" tanpa acuan) | Selalu rujuk balik ke palet & prinsip di `DESIGN.md` §3–§4 sebelum mengubah nilai CSS apa pun.                           |
| Perubahan radius/warna di satu komponen tidak konsisten ke komponen lain     | Gunakan CSS variable terpusat (`src/styles/base.css`) alih-alih hardcode nilai per file.                                 |
| QA visual hanya dicek di desktop, mobile terlewat                            | Wajib screenshot ulang 3 breakpoint setelah setiap batch perubahan, bandingkan dengan `.tmp-video-analysis/ui-check-2/`. |

## 9. Referensi

- `DESIGN.md` — sumber kebenaran palet warna, komposisi, dan prinsip visual (Dark Technical SaaS Dashboard).
- `PORTO.md` v2.0 — struktur & design language dasar.
- `PRD-INTERACTIVE-v3.md` — lapisan animasi/interaksi yang sudah berjalan, jangan diregresi.
- `PRD-PRODUCTION-FIX-v1.md` — perbaikan fungsional yang berjalan paralel (form kontak, SEO, accessibility, performance).
- `.tmp-video-analysis/ui-check-2/{desktop,mobile,tablet}.png` — baseline screenshot QA terakhir untuk perbandingan.

---

_PRD ini murni tentang kualitas visual — dieksekusi setelah atau bersamaan dengan PRD-PRODUCTION-FIX-v1.md, tanpa saling mengganggu scope masing-masing._
