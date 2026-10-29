# Product Requirements Document (PRD) — v3.0

# Interactivity Upgrade — Website Portofolio Tego Saputra

|                       |                                                                                                                                                                                       |
| --------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Versi**             | 3.0 — Interactivity Layer (turunan dari PORTO.md v2.0)                                                                                                                                |
| **Tanggal**           | 2 Juli 2026                                                                                                                                                                           |
| **Pemilik Produk**    | Tego Saputra (GitHub: tegokkk)                                                                                                                                                        |
| **Status**            | Ready for execution                                                                                                                                                                   |
| **Basis**             | `PORTO.md` v2.0 (struktur & design language) — dokumen ini FOKUS pada lapisan interaksi/animasi di atas struktur yang sudah ada                                                       |
| **Codebase saat ini** | React 19 + Vite + Tailwind CSS 4 + Framer Motion + lucide-react. `src/App.jsx` (770 baris), `src/styles.css` (1080 baris). Framer Motion baru dipakai terbatas: transisi tab & modal. |

---

## 1. Latar Belakang

Website portofolio v2.0 sudah lengkap secara struktur (Hero, About, Portfolio tab, Contact, modal detail) dan sudah production-ready secara konten. Yang belum ada adalah **lapisan interaktivitas** yang membuat website terasa "hidup" dan premium — scroll animation, micro-interaction, custom cursor, dan polish di detail kecil (loading state, hover, transition).

Tujuannya bukan menambah fitur baru, tapi **meningkatkan kualitas pengalaman (UX polish)** dari website yang sudah ada tanpa mengubah struktur informasi atau data yang sudah didefinisikan di `PORTO.md` v2.0.

## 2. Tujuan

1. Membuat setiap section terasa hidup lewat scroll-reveal & stagger animation, tanpa mengorbankan performa.
2. Menambahkan micro-interaction (hover, cursor, parallax) yang memperkuat kesan _developer aesthetic — clean, precise, technical_.
3. Menutup celah UX kecil yang tersisa (toast tidak auto-dismiss, certificate preview ke-grayscale, dsb).
4. Menjaga aksesibilitas: semua animasi harus menghormati `prefers-reduced-motion`.
5. Tidak menambah bundle size / waktu load secara signifikan (tetap dalam target Lighthouse Performance ≥85 dari PRD v2.0).

## 3. Non-Goals

- Tidak mengubah data proyek, sertifikat, tech stack, atau copy yang sudah final di PRD v2.0.
- Tidak mengganti struktur routing (tetap single-page + modal, bukan halaman terpisah).
- Tidak menambahkan backend baru — Formspree tetap jadi solusi form (hanya perlu setup endpoint).
- Fitur "Nice-to-Have Fase 2" di PRD v2.0 (guestbook, blog, GitHub stats, light mode) **tidak** termasuk scope ini.

## 4. Prinsip Desain Interaksi

| Prinsip                                            | Penjelasan                                                                                                                                                          |
| -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Purposeful, bukan dekoratif**                    | Setiap animasi harus menuntun perhatian (reveal saat scroll, feedback saat aksi), bukan sekadar "ramai".                                                            |
| **Cepat & ringan**                                 | Durasi animasi 200–600ms untuk micro-interaction, maksimal ~800ms untuk entrance section. Easing halus (`ease-out` / custom cubic-bezier), tidak bouncy berlebihan. |
| **Konsisten dengan tone monospace/code-aesthetic** | Timing dan style animasi selaras dengan identitas "developer portfolio" — presisi, bukan playful.                                                                   |
| **Accessible by default**                          | Semua animasi non-esensial di-skip otomatis saat `prefers-reduced-motion: reduce` terdeteksi.                                                                       |
| **Progressive, tidak blocking**                    | Konten tetap bisa diakses/dibaca meski JS animasi gagal load atau lambat (no FOUC, no invisible content).                                                           |

## 5. Ruang Lingkup Fungsional

Scope dibagi 3 tingkat prioritas berdasarkan dampak terhadap kesan pertama pengunjung (recruiter/klien) vs effort implementasi. Rincian task per item ada di dokumen terpisah **`EXECUTION-CHECKLIST.md`**.

### 5.1 Priority 1 — High Impact (dikerjakan pertama)

Elemen yang paling menentukan "wow factor" 5 detik pertama dan konsistensi interaksi inti: scroll-reveal per section/card, hero stagger, stats counter, hover lift pada card, tab content stagger, toast auto-dismiss, fix certificate preview grayscale.

### 5.2 Priority 2 — Medium Impact

Polish tambahan yang memperkuat kesan premium tapi tidak kritikal di first impression: custom cursor, loading/intro screen, mouse parallax pada foto, scroll progress bar, timeline draw animation, floating signal card, ikon tech stack, scroll-to-top, ambient glow.

### 5.3 Priority 3 — Enhancements

Perbaikan teknis & SEO yang tidak terlihat langsung tapi penting untuk kualitas produksi: meta tags SEO, lazy loading gambar dengan blur placeholder, setup endpoint Formspree, background blur saat modal, quick-peek preview kartu proyek.

## 6. Kebutuhan Non-Fungsional (tambahan dari PRD v2.0)

| ID     | Kebutuhan                                                                                                                                                                                          |
| ------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| NFR-I1 | Semua animasi entrance (scroll-reveal, stagger) memakai `IntersectionObserver` atau Framer Motion `whileInView`, trigger sekali per elemen (`once: true`) — tidak replay setiap scroll naik-turun. |
| NFR-I2 | Custom cursor & parallax **dinonaktifkan otomatis** di perangkat touch/mobile (deteksi via media query `(hover: hover) and (pointer: fine)`).                                                      |
| NFR-I3 | Loading/intro screen maksimal 1.5 detik dan hanya tampil sekali per sesi (pakai `sessionStorage`), tidak mengulang tiap navigasi internal.                                                         |
| NFR-I4 | Semua animasi baru menghormati `prefers-reduced-motion: reduce` — fallback ke tampil langsung tanpa transisi.                                                                                      |
| NFR-I5 | Tidak ada Cumulative Layout Shift (CLS) tambahan akibat lazy-load gambar — wajib pakai `width`/`height`/`aspect-ratio` eksplisit + blur placeholder.                                               |
| NFR-I6 | Total penambahan bundle JS akibat fitur baru ini < 30KB gzip (custom cursor, parallax, dsb ditulis native/CSS sebisa mungkin, hindari library tambahan yang berat).                                |

## 7. Kriteria Sukses (Definition of Done)

- Semua task Priority 1 selesai dan lolos manual QA (desktop + mobile + `prefers-reduced-motion` aktif).
- Lighthouse Performance tidak turun dari baseline sebelum perubahan (re-audit setelah P1+P2 selesai).
- Tidak ada console error/warning baru di browser setelah build production (`npm run build && npm run preview`).
- Certificate preview tidak lagi ter-grayscale (bug fix P1).
- Form kontak berhasil terkirim via Formspree endpoint yang sudah di-set di `.env.local` / Vercel env vars.
- Review visual: setiap section terasa "reveal" saat pertama kali discroll ke viewport, tidak ada elemen yang muncul tiba-tiba/patah (jank).

## 8. Risiko Tambahan

| Risiko                                                          | Mitigasi                                                                                             |
| --------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------- |
| Custom cursor mengganggu pengalaman di trackpad/device tertentu | Auto-disable di non-`pointer:fine`, sediakan cara nonaktif cepat jika buggy (feature flag sederhana) |
| Terlalu banyak animasi membuat halaman terasa "berat"/lambat    | Prioritaskan P1 dulu, ukur Lighthouse sebelum lanjut ke P2/P3                                        |
| Loading screen mengganggu recruiter yang buru-buru              | Durasi dibatasi ketat ≤1.5 detik, skip-able, hanya sekali per sesi                                   |
| Parallax/scroll-reveal berat di HP low-end                      | Uji di throttled CPU (Chrome DevTools 4x slowdown) sebelum dianggap selesai                          |

## 9. Referensi

- `PORTO.md` v2.0 — PRD struktural & design language (sumber kebenaran untuk data, layout, warna, tipografi).
- `EXECUTION-CHECKLIST.md` — breakdown task teknis siap eksekusi, urut prioritas, dengan target file & acceptance criteria.

---

_PRD v3.0 ini melengkapi, bukan menggantikan, PORTO.md v2.0. Semua keputusan visual (warna, tipografi, layout) tetap merujuk ke dokumen v2.0._
