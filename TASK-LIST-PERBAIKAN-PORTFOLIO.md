# Task List Perbaikan Portfolio Tego Saputra

Dokumen ini menyusun hasil analisis kondisi portfolio setelah penambahan slide WORK, ID card, galeri sertifikat, dan deck project. Centang tugas setelah perubahan dan pemeriksaan terkait selesai.

## Status eksekusi — 29 Oktober 2026

Perbaikan P1/P2 telah diterapkan. Pemeriksaan otomatis menggunakan Chromium dengan viewport desktop dan emulasi touch/mobile. Rincian perubahan, hasil uji, screenshot, dan batas verifikasi ada di [HASIL-PERBAIKAN-PORTFOLIO.md](HASIL-PERBAIKAN-PORTFOLIO.md).

Form diuji dengan respons simulasi; pengiriman email produksi tidak dilakukan. Delapan tautan Live/Repo merespons HTTP 200, tanpa menguji seluruh fitur aplikasi tujuan.

## Prioritas P1 — Konten, keterbacaan, dan alur utama

### 1. Perbaiki ukuran teks dan target interaksi

- [x] Audit ukuran teks pada header, slide WORK, hero, ID card, project, sertifikat, tech stack, dan contact.
- [x] Naikkan teks tombol utama dan navigasi ke sekitar 11–12 px atau lebih sesuai ruang yang tersedia.
- [x] Naikkan metadata penting ke sekitar 10–12 px; hindari teks 7–8 px untuk informasi yang perlu dibaca.
- [x] Pastikan body text nyaman dibaca pada desktop dan mobile, umumnya minimal 14–16 px.
- [x] Pastikan tombol dan tautan utama memiliki area sentuh minimal 44 × 44 px serta focus state yang terlihat.

**Selesai jika:** nama, role, label, dan CTA terbaca tanpa zoom pada layar 320–430 px; tidak ada informasi penting yang hanya bergantung pada teks dekoratif kecil.

### 2. Rapikan slide WORK dan alur awal

- [x] Tampilkan identitas singkat Tego atau role pada frame awal slide WORK.
- [x] Ganti area loading kosong dengan fallback yang tetap memperlihatkan teks dan navigasi.
- [x] Perbesar dan perjelas tombol **Enter portfolio**.
- [x] Evaluasi jarak scroll animasi agar pengunjung cepat mencapai hero Tego Saputra.
- [x] Periksa alur mouse wheel, trackpad, sentuhan, keyboard, dan reduced motion.

**Selesai jika:** pengunjung dapat mengetahui siapa pemilik portfolio dan cara masuk tanpa menunggu area kosong; animasi menuju hero berjalan dan tetap bisa dilewati melalui kontrol yang tersedia.

### 3. Perjelas navigasi hero dan header

- [x] Ganti label folder yang membingungkan dengan tujuan sebenarnya: **Certificates**, **Tech Stack**, **Projects**, dan **About**.
- [x] Tetapkan **View Projects** sebagai CTA utama; rapikan prioritas Contact, Download CV, dan Featured Case Study.
- [x] Tinjau ukuran nama dan posisi CTA pada layar laptop yang pendek.
- [x] Tinjau tombol scroll mengambang; kurangi kontrol yang berulang dan pastikan tidak menutupi isi.
- [x] Tambahkan indikator navigasi aktif berdasarkan section jika tetap jelas dan tidak mengganggu.

**Selesai jika:** setiap label menggambarkan section yang dibuka, CTA utama mudah ditemukan, dan kontrol mengambang tidak menutupi teks atau tombol.

### 4. Rapikan About dan ID card

- [x] Perbesar nama dan role pada ID card; hilangkan metadata yang terlalu kecil atau tidak membantu.
- [x] Ringkas paragraf About agar tidak mengulang manfaat yang sama.
- [x] Sesuaikan tinggi area lanyard agar seimbang dengan kolom teks About.
- [x] Batasi posisi atau ayunan kartu pada mobile agar tidak terpotong.
- [x] Periksa tarik, balik, tombol flip, keyboard, dan reduced motion.

**Selesai jika:** kartu dan foto tetap utuh pada lebar 320–430 px; nama/role terbaca dan kedua sisi dapat dibuka dengan mouse, sentuhan, serta keyboard.

### 5. Tingkatkan keterlihatan semua project

- [x] Tambahkan daftar nama atau indikator yang dapat dipilih langsung untuk keempat project.
- [x] Letakkan petunjuk drag dan tombol navigasi dekat deck.
- [x] Sesuaikan tinggi deck dengan layar pendek dan mobile; periksa rasio keempat preview.
- [x] Pastikan judul, deskripsi, tag, Case Study, Live, dan Repo selalu mengikuti project aktif.
- [x] Lengkapi case study dengan peran, tantangan, keputusan teknis, dan hasil yang dapat dibuktikan.
- [x] Periksa tautan Live dan Repo untuk ABSENAPEL, CARIMAKAN, PHOTOBOOTH, dan DECORMOMENT.

**Selesai jika:** semua project dapat dipilih tanpa harus menekan panah berulang kali, preview tidak terpotong, dan setiap tombol membuka tujuan project yang benar.

### 6. Rapikan galeri sertifikat

- [x] Kurangi overlap kartu desktop agar nama dan issuer tidak tertutup.
- [x] Perbesar label issuer, nama sertifikat, dan indikator jumlah.
- [x] Posisikan petunjuk geser dan tombol panah di tempat yang mudah terlihat.
- [x] Pertahankan scroll horizontal yang berhenti di awal dan akhir galeri.
- [x] Periksa drag mouse, sentuhan, tombol panah, fokus keyboard, serta pembukaan setiap sertifikat.
- [x] Periksa ketujuh PDF dan tampilkan tombol verifikasi hanya jika URL tersedia.

**Selesai jika:** tujuh sertifikat dapat ditemukan dan dibuka dengan mudah; preview landscape/portrait tetap proporsional dan tautan PDF sesuai kartu.

### 7. Perjelas tech stack

- [x] Perbarui deskripsi agar mencerminkan empat project yang sekarang ditampilkan.
- [x] Tonjolkan teknologi utama yang paling relevan, lalu kelompokkan alat pendukung.
- [x] Perbesar label tag dan sesuaikan jarak ikon dengan teks.
- [x] Rapikan perbedaan kepadatan antar empat kelompok tanpa menghilangkan informasi penting.

**Selesai jika:** recruiter dapat menemukan teknologi utama dengan cepat dan semua tag tetap terbaca pada mobile.

### 8. Sederhanakan contact dan bahasa UI

- [x] Kurangi ukuran judul **Work with Me** pada layar kecil agar jalur kontak lebih cepat terlihat.
- [x] Tonjolkan email langsung untuk pengunjung yang tidak ingin mengisi form.
- [x] Tentukan satu bahasa utama untuk navigasi, tombol, status, dan pesan error; dokumentasikan pilihan untuk konten naratif.
- [x] Perjelas status pengiriman form tanpa menyatakan pesan terkirim sebelum server mengonfirmasi.
- [x] Periksa validasi, loading, sukses, gagal, dan fallback email.

**Selesai jika:** pengunjung dapat menemukan email atau mengirim pesan dengan jelas, dan setiap status form sesuai hasil yang benar-benar diterima.

## Prioritas P2 — Konsistensi dan polish

### 9. Rapikan visual dan ritme halaman

- [x] Samakan sumbu kiri/kanan, container, dan jarak antar section pada desktop dan mobile.
- [x] Tinjau ulang skala heading About, Selected Work, Certificates, Stack, dan Contact.
- [x] Kurangi kombinasi dekorasi yang berulang dalam satu viewport.
- [x] Pastikan hard shadow, border, warna biru, cream, dan cyan digunakan konsisten.
- [x] Periksa wrapping judul panjang serta line-length paragraf.

**Selesai jika:** setiap section memiliki satu focal point, jarak terasa konsisten, dan tidak ada teks terpotong atau wrap yang mengganggu.

### 10. Rapikan modal dan aksesibilitas

- [x] Periksa scroll mouse, sentuhan, dan keyboard pada modal project, sertifikat, dan CV.
- [x] Periksa Escape, backdrop, fokus awal, focus trap, dan pengembalian fokus ke tombol pembuka.
- [x] Pertimbangkan menampilkan Live/Repo lebih awal dalam case study yang panjang.
- [x] Periksa kontras teks kecil, link, badge, focus ring, dan status pada semua surface.
- [x] Periksa semua animasi dengan `prefers-reduced-motion: reduce`.

**Selesai jika:** modal dapat digunakan tanpa mouse dan semua konten dapat diakses tanpa halaman belakang ikut bergulir.

## Pemeriksaan akhir

### Responsivitas

- [x] Extreme small: 320 px.
- [x] Mobile: 360 px dan 430 px.
- [x] Tablet: 768 px dan 980 px.
- [x] Laptop: 1024 px dan 1280 px, termasuk viewport pendek.
- [x] Desktop: 1440 px.
- [x] Ultrawide: pastikan container tetap terpusat dan tidak merenggang.
- [x] Pada setiap ukuran, periksa overflow horizontal, clipping, wrapping, target sentuh, dan akses ke CTA.

### Fungsi dan kualitas teknis

- [x] Jalankan `npm run typecheck`.
- [x] Jalankan `npm run lint` dan selesaikan error yang relevan.
- [x] Jalankan `npm run build`.
- [x] Siapkan browser Playwright yang sesuai lalu jalankan `npm run test:smoke`; perbarui pemeriksaan yang tidak lagi sesuai dengan UI saat ini.
- [x] Uji navigasi header, slide WORK, lanyard, deck project, galeri sertifikat, modal, CV, dan form.
- [x] Periksa tautan eksternal dan aset pada hasil build.
- [x] Catat hasil pemeriksaan dan masalah yang masih tersisa.

## Catatan kondisi saat daftar dibuat

- TypeScript berhasil diperiksa pada audit terakhir.
- Smoke test belum dapat dijalankan karena executable Chromium untuk Playwright belum tersedia.
- Lint belum selesai saat pemeriksaan terakhir dihentikan.
- Scroll mouse pada modal case study telah diperiksa pada browser desktop.
- Pengiriman form, seluruh demo live, dan seluruh ukuran viewport belum diverifikasi pada audit terakhir.
