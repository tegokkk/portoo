# Hasil perbaikan portfolio

Tanggal: 29 Oktober 2026. Cakupan: task list P1, P2, serta pemeriksaan teknis dan responsivitas.

## Perubahan yang diterapkan

- **Tipografi:** navigasi dan CTA 11–12 px atau lebih, metadata penting 10–12 px, paragraf utama 16 px atau lebih. Heading menggunakan skala responsif. Target tombol utama minimal 44 px.
- **WORK:** identitas Tego dan role terlihat sejak awal; fallback font langsung tampil; jarak animasi dipersingkat dari 1,6 menjadi 1,15 tinggi viewport. Tombol Enter portfolio melewati intro dan memindahkan fokus ke konten.
- **Hero:** folder diberi nama Certificates, Tech Stack, Projects, About. Folder dan konten mengikuti aliran layout, sehingga tidak bertabrakan pada layar pendek. View projects menjadi CTA utama; Contact, CV, dan case study menjadi aksi pendukung.
- **Header:** indikator section aktif, penutupan menu via tombol/Escape, pemulihan fokus, dan penguncian scroll latar saat menu terbuka. Jarak navigasi diperbaiki agar scroll padding tidak dihitung dua kali.
- **Kontrol scroll:** panah naik/turun ganda dihapus. Back to top berada dekat footer pada layar di bawah 1440 px agar tidak menutupi konten.
- **About:** paragraf diringkas, kartu identitas diperjelas, stage menjadi 460 px, ayunan dan posisi kartu dibatasi. Angka project mencerminkan empat project tanpa tanda plus. Statistik mobile dibuat dalam tiga kolom ringkas.
- **Projects:** empat nama dapat dipilih langsung; deck, judul, deskripsi, tags, Live, Repo, dan case study mengikuti pilihan yang sama. Preview memakai object-fit contain. Petunjuk drag dekat deck. Case study memuat ruang lingkup peran, tantangan, implementasi, dan hasil kualitatif; tidak menambahkan angka penggunaan atau konversi yang belum tersedia.
- **Certificates:** overlap dihapus, issuer/nama diperbesar, controls dan petunjuk lebih jelas. Tujuh kartu/PDF tetap tersedia. Galeri tetap finite, mendukung drag, touch, tombol, dan keyboard.
- **Stack:** Next.js dan TypeScript ditambahkan ke katalog frontend; teknologi inti ditonjolkan, nama kelompok dipersingkat, deskripsi mencakup empat project.
- **Contact:** judul dipadatkan menjadi dua baris, email ditonjolkan. Pesan status tetap terlihat. Validasi menolak input whitespace; request memiliki timeout 15 detik. Status sukses hanya muncul setelah respons server OK. Fallback menjelaskan bahwa pengguna perlu melanjutkan pengiriman di aplikasi email.
- **Modal:** Live/Repo tampil sebelum preview panjang. Scroll modal tidak menggerakkan latar. Focus trap juga menangani Shift+Tab ketika kontainer dialog sendiri difokuskan; Escape, backdrop, dan pengembalian fokus diperiksa.
- **Motion:** reduced motion diterapkan ke komponen Motion, deck, intro, dan lanyard. Overlay kartu drag dibersihkan ketika navigasi berjalan dalam reduced motion. Temuan React refs/immutability dari lint diselesaikan.

## Bahasa

Bahasa utama navigasi, tombol, petunjuk interaksi, status form, serta accessible labels adalah **English**, mengikuti label portfolio sebelumnya. Cerita pribadi, deskripsi project, dan penjelasan teknis tetap **Bahasa Indonesia**. Dokumen memakai `lang="en"`; paragraf naratif utama diberi `lang="id"`. Nama resmi sertifikat dan teknologi dipertahankan.

## Hasil verifikasi

| Pemeriksaan | Hasil |
| --- | --- |
| `npm run typecheck` | Lulus |
| `npm run lint` | Lulus, tanpa error/warning |
| `npm run build` | Lulus |
| `npm run test:smoke` | Lulus |
| `npm run test:interactions` | Lulus |
| Lebar viewport | 320, 360, 430, 768, 980, 1024, 1280, 1440, 2560 px |
| Layar pendek | 1280 × 600 px |
| Overflow horizontal / judul | Tidak terdeteksi pada enam section utama di sembilan lebar viewport |
| Project | Empat pilihan langsung, panah, drag, keyboard, sinkronisasi preview/teks/repo |
| Sertifikat | Tujuh modal dan PDF, respons 200 serta signature `%PDF-`, galeri berhenti di batas akhir |
| Modal | Mouse wheel, keyboard, focus trap, Escape, backdrop, pengembalian fokus, touch pada case study panjang |
| ID card | Mouse drag, flip tombol, keyboard, touch flip, containment setelah drag |
| WORK | Mouse wheel, tombol masuk, keyboard Enter, touch scroll, reduced motion |
| Horizontal wheel | Input wheel horizontal untuk galeri, sebagai simulasi gesture trackpad |
| Form | Validasi, loading, sukses, error server, error jaringan melalui response mock; fallback email tanpa POST |
| Aset | 40 referensi file portfolio tersedia di `public` dan hasil build `dist`; tidak ada respons aset lokal 4xx/5xx selama smoke test |
| Link project | Empat Live dan empat Repo merespons HTTP 200; detail di `artifacts/audit/link-checks.json` |

Screenshot hasil pemeriksaan disimpan di `artifacts/audit/`, termasuk section pada lebar 320, 430, dan 1440 px serta intro pada 1280 px. Screenshot diperiksa untuk hierarchy, wrapping, layout kartu, dan clipping. Snapshot dapat memperlihatkan project atau sisi ID card yang aktif pada saat pengujian.

## Batas verifikasi

- Pengujian browser menggunakan Chromium desktop dan emulasi touch/mobile, bukan perangkat iOS/Android fisik atau Safari/Firefox.
- Respons sukses/gagal form diintersep oleh test. Tidak ada pesan sungguhan yang dikirim; penerimaan email produksi belum dibuktikan.
- HTTP 200 menunjukkan URL project dapat diakses. Pengujian ini tidak mencakup seluruh fitur bisnis di aplikasi project, seperti transaksi, kamera, printer, atau pemesanan WhatsApp.
- Pemeriksaan keterbacaan/kontras mencakup surface utama, label, dan focus state; bukan sertifikasi aksesibilitas formal.

Semua perubahan diterapkan di workspace lokal. Tidak ada deployment atau pengiriman pesan eksternal.
