# PRD Editorial Redesign v1

Tanggal: 4 Juli 2026
Status: Ready for coding

Paket PRD ini dibuat untuk merombak tampilan portfolio Tego Saputra ke gaya editorial brutalist print portfolio, berdasarkan referensi gambar dan HTML Stitch yang dilampirkan.

## Batas Utama

Ini adalah redesign tampilan, bukan rebuild produk.

Yang boleh berubah:
- Layout section.
- Styling CSS.
- Komposisi visual.
- Hierarki tipografi.
- Cara card, modal, dan form tampil.
- Copy mikro yang sifatnya label visual.

Yang tidak boleh berubah:
- Data portfolio di `src/data/portfolio.ts`.
- Fitur modal project, certificate, dan CV.
- Download CV.
- Link live demo dan repo.
- Contact form dan fallback email.
- Smooth scroll, scroll progress, custom cursor, dan scroll controls.
- Struktur navigasi Home, About, Portfolio, Contact.

## Urutan Baca Untuk Coding

1. `01-PRD.md`
2. `02-DESIGN-SYSTEM.md`
3. `03-FEATURE-LOCK.md`
4. `04-IMPLEMENTATION-SLICES.md`
5. `05-OUR-CONTENTS-CAROUSEL.md` sebagai addendum terbaru untuk section Portfolio / Our Contents.

## Prinsip Eksekusi

Mulai dari CSS dan komposisi React yang sudah ada. Jangan tambah dependency baru. Pakai `lucide-react`, `motion`, `lenis`, data existing, dan asset existing.

Skipped: wireframe gambar baru. Add when layout final butuh visual QA side-by-side.
