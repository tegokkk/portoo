# PRD Addendum: Our Contents Carousel

Tanggal: 4 Juli 2026
Status: Ready for coding
Prioritas: P0 visual update untuk section Portfolio / Our Contents

## Ringkasan

Addendum ini mengganti arah visual lama pada section `Our Contents` dari grid catalog menjadi dark portfolio carousel seperti referensi baru. Perubahan ini hanya merombak tampilan dan interaksi presentasi project, bukan merombak fitur portfolio yang sudah ada.

Section tetap memakai data dan action existing:
- Project dari `projects`.
- Certificate dari `certificate`.
- Project modal existing.
- Certificate modal existing.
- Link Live, Repo, Verify.
- Smooth scroll, motion reveal, dan responsive behavior existing.

## Tujuan

Membuat section Portfolio terasa lebih fokus, cinematic, dan layak lomba web design melalui satu panggung visual gelap dengan carousel 3 kartu:
- Kartu tengah sebagai item aktif dan fokus utama.
- Kartu kiri dan kanan sebagai preview item sebelum/sesudah.
- Rail garis tipis horizontal sebagai elemen komposisi.
- CTA magenta pill di bawah carousel.
- Title pendek di atas, mengikuti referensi: `Portfolio`.

## Non-Goals

Jangan lakukan hal berikut pada slice ini:
- Jangan rebuild seluruh website.
- Jangan mengubah struktur data di `src/data/portfolio.ts`.
- Jangan menghapus modal project, certificate, CV, atau contact form.
- Jangan menambah route baru.
- Jangan menambah dependency carousel baru.
- Jangan membuat data dummy untuk memenuhi tampilan.
- Jangan mengganti semua section lain karena referensi ini hanya untuk `Our Contents`.

## Referensi Visual

Referensi memperlihatkan:
- Background hitam solid.
- Judul `Portfolio` di tengah atas.
- Tiga preview karya tersusun horizontal.
- Kartu tengah lebih besar, berada di foreground, dan memakai border putih.
- Kartu samping lebih kecil, berada di belakang/di kiri-kanan, juga memakai border putih.
- Garis horizontal tipis melewati area kartu sebagai rail.
- Tombol rounded magenta di bawah center card.
- Mood visual: minimal, gelap, portfolio showcase, fokus ke karya.

Interpretasi untuk website ini:
- Kartu tengah adalah active portfolio item.
- Kartu kiri dan kanan adalah previous/next preview.
- Tombol bawah membuka detail item aktif.
- Kartu samping bisa diklik untuk mengganti active item.
- Jika item aktif adalah certificate, CTA membuka certificate modal.

## Scope Section

Target utama:
- `src/components/sections/projects-section.tsx`
- `src/styles/projects.css`

File pendukung bila perlu:
- `src/components/shared/portfolio-image.tsx`
- `src/data/types.ts`, hanya jika butuh tipe view-model lokal yang aman.

Jika logic carousel membuat `projects-section.tsx` terlalu padat, pecah komponen baru:
- `src/components/sections/portfolio-carousel.tsx`

Tetap jaga file kecil dan mudah dibaca.

## Konten Yang Ditampilkan

Carousel harus mengambil minimal 3 item dari data existing:
1. Project pertama dari `projects`.
2. Project kedua dari `projects`.
3. Certificate dari `certificate` sebagai item showcase ketiga.

Jika jumlah project bertambah nanti:
- Semua project masuk daftar carousel.
- Certificate tetap boleh menjadi item terakhir.
- Carousel memakai loop previous/next.

Tidak boleh ada placeholder kosong.

## Struktur UI

Section tetap berada dalam `section#portfolio`.

Komposisi desktop:
1. Dark stage container.
2. Top label kecil opsional: `(c){profile.name} Design Portfolio`.
3. Title tengah: `Portfolio`.
4. Carousel viewport.
5. Rail line horizontal di belakang kartu.
6. Three-card composition:
   - Previous card: left, smaller, dimmed.
   - Active card: center, larger, strongest border.
   - Next card: right, smaller, dimmed.
7. CTA pill magenta: `View Details` atau `See Work`.
8. Small controls: dots atau prev/next icon buttons.

Komposisi mobile:
- Title tetap di atas.
- Active card tampil paling dominan.
- Preview kiri/kanan boleh menjadi thumbnail kecil di bawah atau peeking cards.
- Tidak boleh ada horizontal overflow.
- CTA tetap mudah disentuh minimal 44px height.
- Prev/next controls harus dapat dipakai dengan tap.

## Visual Spec

Container:
- Background: near black, misalnya `#050505` atau token existing dark.
- Inner padding desktop: 56-80px vertical.
- Inner padding mobile: 32-40px vertical.
- Max width mengikuti paper/editorial container existing.
- Boleh tetap berada di atas paper sheet, tetapi stage-nya harus jelas hitam seperti referensi.

Title:
- Text: `Portfolio`.
- Align center.
- Font weight 700 atau 800.
- Size desktop sekitar 28-40px.
- Size mobile sekitar 24-32px.
- Warna putih/off-white.

Cards:
- Aspect ratio disarankan `16 / 9` atau `4 / 3`, sesuai screenshot project.
- Active card width desktop sekitar 360-460px.
- Side card width desktop sekitar 260-340px.
- Border: 2px solid off-white untuk active, 1px untuk side.
- Background image memakai screenshot existing.
- Overlay gelap tipis agar teks tetap terbaca.
- Active card boleh memiliki subtle shadow/glow putih tipis, bukan glow berlebihan.

Rail:
- 1px line horizontal berwarna white/gray dengan opacity rendah.
- Rail berada di belakang cards.
- Rail tidak boleh mengganggu klik card.

CTA:
- Pill magenta mengikuti referensi dan desain existing pink accent.
- Warna: gunakan accent pink existing bila ada; fallback `#ff3f8d` atau `#ff2fb3`.
- Text putih.
- Radius penuh.
- Padding nyaman.
- Hover: sedikit lebih terang atau border putih.
- Focus: outline jelas.

Typography mikro:
- Project title boleh tampil di dalam active card bagian bawah.
- Subtitle/tech maksimal 1-2 baris.
- Jangan isi card dengan teks panjang; detail tetap di modal.

## Interaksi

Action utama:
- Klik active card: buka modal item aktif.
- Klik CTA: buka modal item aktif.
- Klik side card: jadikan item tersebut active, tidak langsung membuka modal.
- Prev/next buttons: mengganti active item.
- Dots: mengganti active item.

Keyboard:
- Button harus focusable.
- Enter/Space pada active card dan CTA membuka modal.
- Enter/Space pada side card memilih item.
- ArrowLeft/ArrowRight boleh didukung jika implementasinya sederhana.

Motion:
- Transisi active item 250-400ms.
- Gunakan transform dan opacity, bukan layout shift berat.
- Respect `prefers-reduced-motion`.
- Jangan memakai autoplay sebagai default. Portfolio harus terasa terkendali, bukan iklan.

## Feature Lock

Fitur ini wajib tetap bekerja setelah redesign:
- Project modal terbuka dari item project.
- Certificate modal terbuka dari item certificate.
- Link Live project tetap tersedia di modal atau action existing.
- Link Repo project tetap tersedia di modal atau action existing.
- Verify certificate tetap tersedia.
- Section `#portfolio` tetap bisa dicapai dari nav dan CTA hero.
- Scroll progress dan smooth scroll tidak rusak.
- Build, typecheck, dan smoke test tetap pass.

## Data Model View

Implementasi boleh membuat view-model lokal di component:

```ts
type PortfolioCarouselItem =
  | { kind: "project"; id: string; title: string; subtitle: string; image: string; onOpen: () => void }
  | { kind: "certificate"; id: string; title: string; subtitle: string; image: string; onOpen: () => void }
```

Namun jangan memindahkan atau mengubah sumber data utama.

## Acceptance Criteria

P0:
- Section `Our Contents` berubah menjadi dark carousel stage sesuai referensi.
- Tampil 3 item: project, project, certificate.
- Active item berada di tengah dan lebih besar.
- Side items lebih kecil dan bisa dipilih.
- CTA magenta membuka detail item aktif.
- Project modal dan certificate modal tetap berfungsi.
- Tidak ada horizontal scroll di 375px.
- Typecheck, build, dan smoke test pass.

P1:
- Dots atau prev/next controls tersedia dan accessible.
- Active card menampilkan title/subtitle ringkas.
- Rail line terlihat proporsional di desktop dan mobile.
- Hover/focus state rapi tanpa layout shift.
- Reduced motion aman.

P2:
- Gesture swipe mobile jika mudah dan tidak menambah dependency.
- Subtle parallax atau depth effect pada side cards.
- Keyboard ArrowLeft/ArrowRight untuk carousel.

## Responsive QA

Wajib cek manual:
- 375px: active card tidak kepotong, CTA tidak overlap.
- 768px: side previews masih terbaca atau berubah jadi thumbnails.
- 1024px: three-card composition mulai utuh.
- 1440px: card tidak terlalu melebar dan tetap fokus di tengah.

Masalah yang harus dihindari:
- Side card keluar viewport di mobile.
- CTA menumpuk di atas card.
- Rail line terlihat seperti bug karena terlalu tebal.
- Border card pecah karena image aspect ratio tidak stabil.
- Text project terlalu panjang di dalam card.

## Implementation Slices

### Slice 1: Item Mapping

Files:
- `src/components/sections/projects-section.tsx`

Tasks:
- Buat array view-model carousel dari `projects` dan `certificate`.
- Tambahkan state `activeIndex`.
- Buat helper previous/next index dengan loop.

Done when:
- Tidak ada data dummy.
- Project dan certificate sama-sama bisa menjadi active item.

### Slice 2: Carousel Markup

Files:
- `src/components/sections/projects-section.tsx`

Tasks:
- Ganti `project-grid` visual utama menjadi carousel stage.
- Pertahankan callback `onOpenProject` dan `onOpenCertificate`.
- Active card memakai button.
- Side cards memakai button untuk select active.

Done when:
- Klik active membuka modal.
- Klik side card mengganti active.

### Slice 3: Visual CSS

Files:
- `src/styles/projects.css`

Tasks:
- Tambahkan class stage, title, rail, card positions, CTA, controls.
- Buat responsive rules untuk 375, 768, 1024, 1440.
- Pastikan no horizontal scroll.

Done when:
- Visual sudah mendekati referensi baru.
- Active/side hierarchy jelas.

### Slice 4: Preserve Secondary Actions

Files:
- `src/components/sections/projects-section.tsx`

Tasks:
- Live/Repo/Verify tidak wajib tampil di stage utama, tetapi tetap ada di modal/card detail existing.
- Jika secondary actions ditaruh di bawah stage, jangan bikin section ramai.

Done when:
- User tetap bisa mencapai Live, Repo, dan Verify.

### Slice 5: QA

Commands:
```bash
npm run typecheck
npm run build
npm run test:smoke
```

Manual:
- Buka project modal dari active card.
- Buka certificate modal dari active certificate.
- Cek nav ke `#portfolio`.
- Cek mobile 375px.

## Design Judgment Notes

Referensi ini kuat karena memberi satu focal point yang jelas. Dibanding grid catalog lama, carousel dark stage akan terasa lebih premium dan lebih mudah diingat. Risiko utamanya adalah section menjadi terlalu kosong jika hanya ada dua project. Karena itu certificate harus ikut menjadi item ketiga, sehingga komposisi three-card tetap utuh tanpa data palsu.

Jaga agar stage ini tidak berubah menjadi slider komersial. Portfolio harus tetap terasa seperti editorial showcase: tenang, tajam, dan terkurasi.
