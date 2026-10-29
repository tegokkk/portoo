# Audit UI Portfolio Tego Saputra

## Ruang lingkup

Audit ini mencakup source React/Vite di `src/` dan tampilan lokal yang terlihat di browser pada viewport desktop sekitar **1250 × 585 px**. Domain `tego.dev` tidak dapat dibaca melalui browser web yang tersedia. Penilaian tablet dan ponsel adalah tinjauan aturan CSS; ukuran tersebut belum diuji langsung di browser.

## 1. Executive scorecard

| Area           |   Skor | Ringkasan                                                                                               |
| -------------- | -----: | ------------------------------------------------------------------------------------------------------- |
| Visual polish  | 74/100 | Arah editorial khas; warna, ornamen, dan bayangan belum sepenuhnya menjadi satu sistem.                 |
| Layout & grid  | 61/100 | Ada container dan komposisi asimetris, tetapi belum ada grid 12 kolom yang digunakan konsisten.         |
| UX flow        | 66/100 | Tujuan halaman jelas setelah scroll; hero dan beberapa label belum membantu orientasi dengan cepat.     |
| Typography     | 72/100 | Pasangan font sesuai brief; headline hero memakai body font dan teks kecil perlu pemeriksaan kontras.   |
| Responsiveness | 57/100 | Breakpoint tersedia, tetapi hero masih tinggi dan aturan responsif lama bercampur dengan override baru. |
| Conversion     | 67/100 | Project, kontak, sertifikat, dan CV tersedia; identitas serta CTA utama kurang cepat terlihat.          |

## 2. Kekuatan yang perlu dipertahankan

- Identitas folder berlapis, sudut tegas, garis tipis, dan bayangan offset terasa khas.
- ABSENAPEL dan CARIMAKAN memiliki ringkasan, gambar, tautan demo/repo, fitur, dan case study.
- Email, form, tautan verifikasi sertifikat, dan CV tersedia.
- Sudah ada skip link, focus-visible global, label form, nama aksesibel untuk tombol ikon, dan dukungan reduced motion di beberapa komponen.
- Container konten dan padding section memberi ruang yang cukup pada sebagian besar halaman.

## 3. Temuan utama

1. **Hero menunda pesan utama.** Pada viewport yang diamati, area folder kosong mendominasi layar; nama, role, headline “Portfolio”, dan CTA berada lebih jauh ke bawah. Focal point dan value utama tidak langsung terbaca.
2. **Palet berbeda dari brief.** Brief meminta paper cream, ink, deep blue, dan cyan. Implementasi menjadikan hijau gelap/sage sebagai warna dominan hero dan header, sementara biru tampil kuat pada CTA dan tech section.
3. **Sumbu layout belum konsisten.** Container konten dibatasi 1320 px, sedangkan hero dapat mencapai 1420 px. Token `--grid-gutter` ada, tetapi belum menjadi sistem grid bersama.
4. **Tahun/edisi saling bertentangan.** Hero menampilkan 2025–2026, header menampilkan 2025, sedangkan metadata projects menyebut “2023–2024 Edition”.
5. **Kontras teks kecil perlu diperbaiki.** `#727783` pada `#F9F7F2` memiliki rasio sekitar **4.19:1**, sedikit di bawah WCAG AA **4.5:1** untuk teks normal. Putih pada `#0055AA` sekitar **7.29:1** dan memadai.
6. **Bayangan dan bidang warna bersaing.** Banyak kartu memakai hard shadow, kadang ink dan kadang biru; bidang biru besar di tech section berbeda bobot dari section lain.
7. **Navigasi desktop lebih menyerupai masthead.** Tautan nav desktop disembunyikan; yang tampak adalah “Portfolio”, “Developer”, dan tahun. Folder hero menjadi jalur navigasi utama.
8. **Label statis menyerupai tab.** Label kategori About tampak interaktif, padahal tidak bertindak sebagai kontrol.
9. **Fokus modal/drawer belum lengkap.** Modal belum terlihat mengelola fokus awal, focus trap, atau pengembalian fokus ke pemicu. Drawer mobile juga belum membuat konten di belakangnya inert.
10. **CV kurang cepat ditemukan di mobile.** Tombol CV header disembunyikan pada ukuran kecil; tautan unduhan baru ditemukan di section About.

## 4. Audit section per section

| Section                    | Temuan                                                                                                                | Arah perbaikan                                                                                                                           |
| -------------------------- | --------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| Header & mobile navigation | Header tetap terlihat. Di desktop tautan nav disembunyikan; di mobile CV header disembunyikan.                        | Sediakan navigasi desktop yang jelas, status section aktif, dan satu jalur unduh CV yang mudah ditemukan di mobile.                      |
| Hero                       | Folder berlapis kuat sebagai identitas, tetapi bidang kosong mengambil ruang. Headline generik dan memakai body font. | Tampilkan nama, role/value, dan CTA project pada awal viewport. Jadikan folder elemen pendukung dan gunakan display font untuk headline. |
| About                      | Memuat foto, ringkasan, pendidikan, pengalaman, area fokus, dan CV.                                                   | Ubah kategori yang tampak seperti tab menjadi label statis yang jelas, atau berikan perilaku tab yang sebenarnya.                        |
| Projects                   | ABSENAPEL mendapat prioritas; demo, repo, case study, metrik, dan proses tersedia.                                    | Samakan metadata tahun. Perjelas urutan nama → problem/value → role → demo; kurangi elemen yang berebut perhatian.                       |
| Certificates               | Preview, detail, dan verifikasi tersedia.                                                                             | Utamakan nama sertifikat dan issuer; pastikan preview tetap terbaca di layar kecil.                                                      |
| Tech stack                 | Empat kelompok teknologi mudah dipahami.                                                                              | Kurangi bobot bidang biru dan jumlah bayangan; tonjolkan nama teknologi dan keterkaitannya dengan project.                               |
| Contact                    | Email, sosial, status kerja, zona waktu, dan form tersedia.                                                           | Tetapkan bahasa UI yang konsisten dan pertahankan email langsung sebagai alternatif yang mudah dijangkau.                                |
| Modals & popups            | Case study, sertifikat, dan CV terbuka di halaman yang sama.                                                          | Atur fokus awal, focus trap, return-focus, dan penguncian scroll. Naikkan tombol close dari 40 × 40 px ke setidaknya 44 × 44 px.         |

## 5. Backlog prioritas

### P0 — Kritis

- [ ] Tata ulang hero supaya identitas, role/value, dan CTA project tampil di viewport pertama.
- [ ] Kurangi luas folder kosong atau isi tiap bidang dengan informasi yang membantu orientasi.
- [ ] Seragamkan tahun dan edisi pada hero, header, projects, dan footer.

### P1 — Penting

- [ ] Putuskan peran warna hijau/sage dan biru sesuai identitas yang diinginkan; terapkan konsisten pada seluruh section.
- [ ] Samakan container serta sumbu grid, atau dokumentasikan pengecualian hero sebagai layout yang sengaja lebih lebar.
- [ ] Perbaiki kontras token teks muted agar memenuhi minimal 4.5:1 pada background yang dipakai.
- [ ] Jadikan label statis About tidak menyerupai kontrol, atau implementasikan perilaku tab.
- [ ] Lengkapi pengelolaan fokus modal dan drawer.
- [ ] Periksa layout langsung pada 320, 360, 430, 768, 980, 1024, 1280, dan ultrawide.
- [ ] Pertahankan jalur CV yang mudah terlihat pada mobile.

### P2 — Nice to have

- [ ] Batasi hard shadow ke kartu atau overlay yang memang perlu terasa bertingkat.
- [ ] Konsolidasikan aturan hero responsif yang berasal dari generasi layout berbeda.
- [ ] Tetapkan bahasa utama UI dan kebijakan konten dwibahasa.
- [ ] Audit ukuran touch target pada semua tombol/link interaktif.

## 6. Action plan pengerjaan

1. **Pass 1 — Hero & conversion:** susun ulang hero, tampilkan nama/role/value/CTA lebih awal, dan pastikan unduh CV mudah ditemukan.
2. **Pass 2 — Design system:** konsolidasikan warna, ukuran container, grid, spacing, typography, border, dan shadow menjadi token yang dipakai lintas section.
3. **Pass 3 — Content consistency:** samakan tahun/edisi dan kebijakan bahasa; rapikan label statis yang tampak interaktif.
4. **Pass 4 — Accessibility:** perbaiki kontras, fokus modal/drawer, touch target, dan perilaku keyboard.
5. **Pass 5 — Responsive review:** periksa breakpoint kecil hingga ultrawide dan rapikan CSS override yang tumpang tindih.

## 7. Contoh token dan struktur grid

```css
:root {
  --container: min(1320px, calc(100% - 2 * clamp(16px, 4vw, 48px)));
  --grid-gap: clamp(16px, 2vw, 24px);
  --section-space: clamp(64px, 8vw, 120px);
  --muted: #626873; /* cek rasio kontras pada setiap surface */
}

.content-grid {
  display: grid;
  grid-template-columns: repeat(12, minmax(0, 1fr));
  gap: var(--grid-gap);
}

.section-shell {
  padding-bottom: var(--section-space);
}
```

## 8. Arah responsif hero

Jangan bergantung pada stage absolut setinggi 900–980 px untuk menampilkan pesan utama. Pindahkan headline dan CTA ke alur layout yang mudah beradaptasi, lalu biarkan folder menjadi lapisan visual pendukung.

```css
.hero-stage {
  min-height: min(780px, calc(100svh - var(--header-height)));
}

@media (max-width: 640px) {
  .hero-stage {
    min-height: auto;
    display: grid;
    align-content: start;
    gap: 24px;
  }

  .hero-cover {
    position: relative;
    inset: auto;
  }
}
```

## Referensi source

- [Hero](src/components/sections/hero-section.tsx)
- [Header](src/components/layout/header.tsx)
- [Design tokens](src/styles/tokens.css)
- [Hero styles](src/styles/hero.css)
- [Responsive styles](src/styles/responsive.css)
- [Project section](src/components/sections/projects-section.tsx)
- [Modal components](src/components/modals/portfolio-modals.tsx)
