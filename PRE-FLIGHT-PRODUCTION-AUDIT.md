# Pre-Flight Production Audit — Tego Portfolio

Tanggal audit: 29 Oktober 2026. Cakupan: source lokal React/Vite, build lokal, preview production lokal, pengujian browser, tautan publik, dan project yang terlihat pada koneksi Vercel saat audit. Audit ini tidak melakukan deploy atau mengirim formulir sungguhan.

## 1. Status kesiapan deploy

**🔴 BLOCKED — 78/100 (skor penilaian audit setelah tindak lanjut warning).** Build aplikasi berhasil dan beberapa warning source sudah diperbaiki. URL produksi yang dipakai metadata masih 404 dan audit dependency masih menemukan advisory severity tinggi. Status ini dapat berubah setelah kedua hal tersebut diperbaiki dan deployment target diverifikasi.

## 2. Matriks kesiapan

| Kategori | Status | Catatan ringkas |
| --- | --- | --- |
| Build & TypeScript | PASS | `npm run typecheck`, `npm run lint`, dan `npm run build` lulus. Bundle: JS 432,73 KB (gzip 137,42 KB), CSS 54,44 KB (gzip 10,90 KB). Tidak ditemukan `@ts-ignore` atau `@ts-expect-error`. |
| Secrets & Environment | WARN | `.env.example` sekarang mengosongkan endpoint opsional; kode menerima hanya URL Formspree valid dan memakai fallback email jika tidak valid. `.env.local` terisi dan diabaikan `.gitignore`. Riwayat commit dan environment Vercel Production belum dapat diverifikasi karena folder ini bukan checkout Git dan project portfolio tidak muncul pada koneksi Vercel yang diperiksa. Variabel `VITE_` adalah nilai publik pada bundle client; jangan menaruh secret di sana. |
| Assets & CV Link | WARN | 41 referensi aset lokal ditemukan, semuanya ada. CV dan tujuh PDF sertifikat valid. Empat demo dan empat repo GitHub mengembalikan 200. Semua tautan eksternal yang diuji kini memakai `rel="noopener noreferrer"`. LinkedIn mengembalikan 999 pada pengecekan otomatis, sehingga validitasnya belum bisa dipastikan. URL aset pada domain canonical masih 404. |
| SEO & Open Graph | FAIL | Title, description, theme-color, canonical, OG/Twitter URL absolut, JSON-LD valid (5 node), sitemap, robots, dan favicon SVG ada. Namun `https://tego-saputra.vercel.app/` serta OG image pada domain tersebut mengembalikan 404. Gambar OG saat ini berasio potret 960×1280. |
| Form & Interactivity | WARN | Validasi HTML, loading, sukses/gagal jaringan, dan fallback `mailto:` lulus pada pengujian dengan request Formspree yang di-*mock*. Saat API gagal, form kini menawarkan tautan email siap kirim berisi input pengguna. Submit sungguhan dan environment Production Vercel belum diverifikasi. Modal proyek/sertifikat/CV lulus tes close, backdrop, Escape, fokus, serta scroll-lock. |
| Responsiveness & Overflow | PASS | Preview build diuji pada 320, 360, 375, 390, dan 430 px: tidak ada overflow horizontal. Smoke test juga lulus pada 768, 980, 1024, 1280, 1440, dan 2560 px. Navigasi dan interaksi touch lulus. |
| Performance & Fonts | WARN | Font memakai `preconnect` dan `display=swap`. Dimensi intrinsik gambar kartu ID, screenshot modal, dan sertifikat kini tersedia. Progress scroll tidak lagi memicu render ulang seluruh App, dan kanvas latar berhenti di perangkat pointer sentuh. Core Web Vitals produksi serta 60 fps pada perangkat nyata belum diukur. |
| Aksesibilitas | WARN | Skip link kini tepat 44 px; alt dekoratif, label tombol ikon, focus trap modal, dan reduced motion tersedia. Audit pembaca layar/kontras menyeluruh belum dijalankan. `<html lang="en">` dipertahankan untuk UI utama berbahasa Inggris; paragraf Indonesia utama memakai `lang="id"`. |
| Vercel Configuration | FAIL | `vercel.json` memakai `npm run build`, output `dist`, framework `vite`, dan kini menambahkan tiga security headers dasar. Tidak ada subroute SPA, jadi rewrite belum diperlukan. Namun alias canonical 404 dan tidak ditemukan pada koneksi Vercel yang diperiksa; project/deployment produksi belum dapat diverifikasi. |

## 3. Blocker kritis (P0)

1. **Domain produksi metadata belum aktif/terhubung.** `index.html` baris 13, 19–20, 31, 45–104, `public/robots.txt`, dan `public/sitemap.xml` memakai `https://tego-saputra.vercel.app/`. Pemeriksaan HTTP saat audit: halaman utama, OG image, dan CV pada domain itu semuanya **404**. Koneksi Vercel yang tersedia tidak menampilkan project portfolio; pencarian alias juga 404. Tentukan domain final, hubungkan ke deployment produksi yang benar, lalu samakan canonical, OG/Twitter, JSON-LD, robots, dan sitemap. Uji semuanya setelah deployment.
2. **Advisory dependency severity tinggi masih terbuka.** `npm audit --omit=dev --audit-level=high` gagal dengan 4 paket high: `vite@8.1.2`, `postcss@8.5.16`, `nanoid@3.3.15`, dan `source-map-js@1.2.1`. Audit penuh: 8 high + 1 moderate. Rantai ini terutama tooling build/development, bukan bukti celah pada JS statis yang dikirim ke browser, tetapi melanggar gerbang audit nol kegagalan. Perbarui lockfile/dependency ke versi yang diperbaiki, lalu jalankan ulang seluruh gate. Contoh rujukan: [advisory Vite](https://github.com/advisories/GHSA-587h-7wmj-h5pm), [advisory PostCSS](https://github.com/advisories/GHSA-r28c-9q8g-f849).

## 4. Perbaikan minor dan verifikasi tersisa (P1/P2)

- **P1 — Form produksi:** pastikan `VITE_FORMSPREE_ENDPOINT` disetel pada environment Production Vercel yang benar. `.env.local` tidak ikut Git. Jalankan satu pengujian submit nyata secara terkendali setelah deploy; tes saat ini menggunakan mock agar tidak mengirim pesan.
- **P1 — Security headers:** `vercel.json` kini mendefinisikan `X-Content-Type-Options`, `Referrer-Policy`, dan `Permissions-Policy`. Verifikasi header pada URL final setelah deploy. CSP perlu diuji bersama Google Fonts dan skrip aplikasi sebelum diberlakukan. [Dokumentasi konfigurasi Vercel](https://vercel.com/docs/project-configuration).
- **P1 — Social preview:** buat gambar OG lanskap khusus, misalnya 1200×630, lalu gunakan URL absolut pada domain final. Foto potret 960×1280 saat ini bisa terpotong pada kartu sosial.
- **P1 — Performa:** ukur LCP, CLS, dan INP pada URL production/preview final di perangkat mobile nyata. Pertimbangkan code splitting jika hasil pengukuran menunjukkan masalah. Build lokal bukan pengganti Core Web Vitals produksi.
- **P2 — A11y/metadata:** skip link sudah memenuhi 44 px; tambahkan apple-touch-icon bila pengalaman home-screen iOS diperlukan. Uji kontras dan pembaca layar secara manual.
- **P2 — Tautan eksternal:** `rel="noopener noreferrer"` sudah diterapkan. LinkedIn menolak bot (HTTP 999), jadi cek manual di browser sebelum rilis.
- **P2 — Routing:** saat ini navigasi memakai hash/section. Tambahkan rewrite SPA hanya jika nanti ada subroute client-side.
- **Verifikasi rilis:** folder kerja ini tidak memiliki metadata `.git`. Sebelum `git push`, buka/siapkan repository yang benar dan pastikan `.env.local` tetap diabaikan. Tidak ada dasar untuk menyatakan status commit atau riwayat secret dari folder ini.

## 5. CLI runbook sebelum push

Jalankan dari checkout Git proyek yang benar, setelah memperbaiki P0 dan menyelaraskan domain final:

```powershell
npm ci
npm audit --audit-level=high
npm run lint
npm run typecheck
npm run build
npm run test:smoke
npm run test:interactions
git status --short
```

Sesudah preview/production terpasang, cek HTTP 200 untuk homepage, canonical, OG image, CV, `robots.txt`, dan `sitemap.xml`; lakukan tes formulir sungguhan dengan izin pemilik inbox; lalu ukur Core Web Vitals pada URL final. Jangan menganggap build lokal membuktikan alias Vercel atau environment Production sudah benar.

## Bukti pengujian yang dijalankan

- `npm run typecheck` — PASS.
- `npm run lint` — PASS.
- `npm run build` — PASS, tanpa warning fatal.
- `npm run test:smoke` — PASS: 9 lebar viewport, 7 PDF, modal, CV, form mock, carousel, aset, dan overflow.
- `npm run test:interactions` — PASS setelah tindak lanjut: mouse/touch, menu, drag kartu ID, modal, scroll progress, dan fallback email.
- Form mock kini memeriksa tautan email siap kirim pada kegagalan API, serta ketiadaannya setelah sukses.
- Preview production lokal: skip link 44 px dan tidak ada overflow pada 375/390 px setelah perubahan.
- Preview hasil build pada 320/360/375/390/430 px — tidak ada overflow atau respons lokal 4xx/5xx.
- Pemeriksaan HTTP tautan eksternal — 4 demo dan 4 repo GitHub 200; domain portfolio 404; LinkedIn 999 (tidak konklusif).

Audit ini menilai source dan lingkungan yang tersedia pada tanggal di atas. Tidak ada pengukuran Lighthouse/CrUX baru pada domain production karena domain canonical belum aktif.
