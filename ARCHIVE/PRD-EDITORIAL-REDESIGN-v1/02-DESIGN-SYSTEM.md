# Design System: Editorial Brutalist Paper Portfolio

## Style Target

Referensi visual:
- Editorial portfolio.
- Brutalist print layout.
- Paper sheets on black canvas.
- High contrast monochrome.
- Hot pink accent.
- Large geometric typography.

Referensi Stitch boleh dipakai sebagai layout inspiration, bukan source code langsung.

## Visual Tokens

```css
--bg: #000000;
--paper: #f2f2f0;
--paper-soft: #e3e3e1;
--ink: #050505;
--muted: #666666;
--line: #cfcfcf;
--accent: #f5427d;
--accent-ink: #ffffff;
--radius: 8px;
--container: min(1200px, calc(100vw - 32px));
```

Catatan:
- Gunakan hitam sebagai canvas luar.
- Gunakan paper/off-white sebagai permukaan section.
- Gunakan pink hanya untuk highlight, active card, focus, dan CTA penting.
- Hindari gradient, glow besar, glassmorphism, decorative blobs, dan neon.

## Typography

Utama:
- Heading besar: existing `Neogen` bila cocok, fallback `Space Grotesk`, `Arial Black`, sans-serif.
- Body: system sans atau Hanken Grotesk bila sudah dipakai lewat CSS import.
- Label/meta: `ui-monospace`, `JetBrains Mono`, `SFMono-Regular`, monospace.

Aturan:
- H1 "Portfolio" harus menjadi visual anchor.
- Heading section besar, uppercase atau title case tebal.
- Label kecil memakai uppercase/mono.
- Jangan pakai letter-spacing negatif ekstrem.
- Font size responsive memakai `clamp()`, bukan viewport-only scaling.

## Layout Pattern

Global:
- Body hitam.
- Section utama berupa `.paper-sheet`.
- Antar sheet dipisah gap hitam tebal.
- Konten di dalam sheet memakai grid editorial.

Hero:
- Top metadata row: identity, year pill, role pill, circular arrow.
- H1 besar: `Portfolio`.
- Pink label: `Tego Saputra - Developer Portfolio`.
- Metadata bawah: contact, date/year, website/social.
- CTA tetap: View Projects, Download CV.

About:
- H2 besar: `About Me`.
- Kiri: portrait grayscale + basic info.
- Kanan: timeline existing.
- CTA tetap: Preview CV, Download CV.

Portfolio:
- Kiri: copyright/catalog label + heading `Selected Works` atau `Our Contents`.
- Kanan: card grid bernomor.
- Card 01 dan 02 memakai project existing.
- Card certificate dan tech stack boleh menjadi entry catalog tambahan.
- Klik project tetap membuka project modal.

Tech:
- Catalog grid berisi tech icon existing.
- Grouping mengikuti `techStack`.
- Tidak perlu filter atau tab baru.

Certificate:
- Preview certificate, metadata, verify, open PDF.
- Tetap bisa membuka certificate modal.

Contact:
- Headline besar.
- Email/social links.
- Form seperti printed form: border bawah, focus pink, button hitam/pink.

## Motion

- Reveal halus 150-300ms untuk micro interaction.
- Section reveal boleh tetap memakai existing `motion`.
- Hindari infinite decorative animation.
- Respect `prefers-reduced-motion`.

## Accessibility

- Focus state terlihat jelas.
- Semua button punya label accessible.
- Jangan gunakan warna pink sebagai satu-satunya indikator.
- Kontras teks di paper minimal AA.
- Mobile tidak boleh overflow horizontal.
