# Implementation Slices

Gunakan slice ini saat mulai coding. Satu slice selesai dulu, verify, baru lanjut.

## Slice 1: Theme Tokens And Global Shell

Files:
- `src/styles.css`

Tasks:
- Ganti token warna ke paper editorial.
- Set body black canvas.
- Tambah reusable classes: `.paper-sheet`, `.paper-meta`, `.editorial-pill`, `.circle-action`.
- Pastikan focus state, button cursor, image sizing, no horizontal scroll.

Done when:
- App masih render.
- Background hitam dan section paper terlihat.
- Tidak ada dependency baru.

## Slice 2: Header And Hero

Files:
- `src/App.tsx`
- `src/styles.css`

Tasks:
- Ubah header agar lebih tipis/editorial.
- Hero menjadi paper panel: metadata row, huge Portfolio, pink label, bottom metadata.
- CTA existing tetap dipakai.
- Jangan ubah `scrollTo`, `useLenis`, atau data profile.

Done when:
- Home nav bekerja.
- View Projects scroll ke portfolio.
- Download CV tetap download.

## Slice 3: About Resume Panel

Files:
- `src/App.tsx`
- `src/styles.css`

Tasks:
- About jadi resume/editorial panel.
- Portrait grayscale.
- Basic info dari profile.
- Timeline dari `timeline`.
- Preview CV dan Download CV tetap ada.

Done when:
- CV modal terbuka.
- Timeline tidak memakai data dummy Stitch.

## Slice 4: Portfolio Catalog Cards

Files:
- `src/App.tsx`
- `src/styles.css`

Tasks:
- Project grid jadi catalog cards bernomor.
- Project 01 bisa featured pink.
- Project cards tetap menampilkan summary, tech, dan action.
- Click tetap membuka `ProjectModal`.

Done when:
- Semua project existing muncul.
- Live dan Repo links tetap ada.
- Project modal tetap lengkap.

## Slice 5: Certificate, Tech, Contact

Files:
- `src/App.tsx`
- `src/styles.css`

Tasks:
- Tech jadi catalog/index grid.
- Certificate card mengikuti paper style.
- Contact form jadi printed-form style.
- Social links tetap dari `socials`.

Done when:
- Certificate modal, verify, PDF bekerja.
- Contact form submit/fallback tetap bekerja.

## Slice 6: Modal And Motion Polish

Files:
- `src/App.tsx`
- `src/styles.css`

Tasks:
- Modal ikut paper/editorial style.
- Backdrop tetap jelas.
- Close button accessible.
- Motion tetap halus dan reduced-motion aman.

Done when:
- Project, certificate, dan CV modal bisa dibuka/tutup.
- Escape close tetap bekerja.

## Slice 7: QA

Commands:
```bash
npm run typecheck
npm run build
npm run test:smoke
```

Manual viewport:
- 375px mobile.
- 768px tablet.
- 1024px laptop.
- 1440px desktop.

Check:
- No horizontal scroll.
- Text tidak overlap.
- Button/link focus visible.
- Semua CTA bekerja.
- Semua modal bekerja.
- Paper sheets tetap terasa seperti referensi.

## File Size Rule

Jangan pecah komponen sebelum perlu. Bila `src/App.tsx` makin sulit dibaca, pecah hanya komponen besar yang sudah ada batas natural:
- `HeroSection`
- `AboutSection`
- `ProjectsSection`
- `TechSection`
- `ContactSection`
- `Modal`

Skipped: abstraction design-token TypeScript. Add when token dipakai lintas package, bukan hanya CSS.
