# Feature Lock

Dokumen ini adalah pagar supaya redesign tidak berubah menjadi rewrite fitur.

## Data Yang Wajib Tetap Dipakai

Sumber data utama:
- `profile`
- `socials`
- `timeline`
- `projects`
- `certificate`
- `techStack`
- `techIconMap`
- `navItems`
- `heroTech`

File:
- `src/data/portfolio.ts`

Jangan mengganti data ini dengan data dummy dari Stitch.

## Fitur Wajib Tetap Ada

Navigation:
- Brand button scroll ke `home`.
- Nav items: Home, About, Portfolio, Contact.
- Mobile menu tetap ada.

Scroll:
- Lenis smooth scroll tetap.
- Scroll progress tetap.
- Scroll up/down controls tetap.
- Scroll-to-top tetap muncul setelah scroll.

Hero:
- `profile.status`.
- `profile.tagline`.
- Hero tech pills.
- View Projects.
- Download CV.

About:
- Profile name dan tagline.
- Timeline existing.
- Preview CV modal.
- Download CV.
- Stats/counters boleh diubah tampilannya, bukan fungsinya.

Portfolio:
- Semua project dari `projects`.
- Project card membuka modal detail.
- Live link.
- Repo link.
- Tech badges.
- Features summary.

Project Modal:
- Description.
- Screenshot.
- Metrics.
- Case study.
- Key features.
- Full tech list.
- Live Demo.
- Source Code.
- Note.

Certificate:
- Certificate preview.
- Certificate modal.
- Verify certificate.
- Open PDF.

Tech:
- Semua tech stack group.
- Icon dari `techIconMap` bila tersedia.

Contact:
- Mailto direct link.
- Social links.
- Contact form.
- Formspree endpoint bila ada.
- Fallback email bila endpoint kosong.
- Toast/status message.

Footer:
- Name.
- Year.
- Portfolio label.

## Yang Boleh Disederhanakan

- Urutan visual section boleh tetap: Hero, About, Portfolio, Tech, Contact.
- Card catalog boleh menggantikan gaya card lama selama action project tetap ada.
- Background `FlickeringGrid` boleh diturunkan opacity atau disembunyikan bila mengganggu paper style.

## Yang Tidak Boleh Dilakukan

- Menghapus modal karena layout card baru sudah punya info singkat.
- Menghapus contact form karena ada email link.
- Menghapus tech stack karena sudah muncul di project.
- Menghapus certificate karena bukan project.
- Mengganti link asli project dengan placeholder.
- Menambah route baru bila anchor section cukup.
