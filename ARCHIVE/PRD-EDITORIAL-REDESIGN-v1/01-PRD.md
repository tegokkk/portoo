# PRD: Editorial Brutalist Portfolio Redesign

## Ringkasan

Website portfolio Tego Saputra akan dirombak tampilannya menjadi seperti halaman portfolio cetak/editorial: kanvas hitam, panel kertas terang, heading besar, grid tegas, divider tipis, label kecil, dan aksen hot pink.

Perombakan ini hanya menyasar UI. Seluruh fitur yang sudah ada wajib tetap berjalan.

## Masalah

Tampilan saat ini sudah punya fitur portfolio lengkap, tetapi arah visual baru yang diinginkan berbeda total: dari dark technical portfolio menjadi editorial print portfolio. Tanpa PRD yang jelas, risiko paling besar adalah fitur ikut berubah, data dummy dari Stitch masuk ke production, atau file komponen membesar karena semua layout ditumpuk di satu tempat.

## Tujuan

- Membuat tampilan terasa seperti portfolio desain premium berbasis paper panels.
- Mempertahankan semua fitur existing.
- Menggunakan data asli dari `src/data/portfolio.ts`.
- Memecah pekerjaan coding menjadi slice kecil agar konteks tidak membesar.
- Menjaga responsive layout di mobile, tablet, dan desktop.

## Non-Goals

- Tidak membuat app baru dari nol.
- Tidak mengganti stack React/Vite.
- Tidak menambah dependency UI baru.
- Tidak mengganti data project, certificate, profile, atau social links dengan data dummy.
- Tidak menghapus modal, form, scroll controls, atau interaksi existing.
- Tidak membuat dashboard, CMS, atau fitur admin baru.

## Target User

Recruiter, calon klien, dan reviewer project yang ingin cepat memahami:
- Siapa Tego Saputra.
- Skill full-stack yang dipakai.
- Project yang pernah dibuat.
- Bukti sertifikat.
- Cara menghubungi.

## Success Criteria

- First viewport langsung terasa seperti referensi: black canvas + large paper sheet + huge "Portfolio".
- About section memakai layout editorial resume: portrait, basic info, timeline.
- Portfolio section memakai grid card bernomor seperti catalog contents.
- Project detail modal tetap membuka case study existing.
- Certificate modal, CV modal, contact form, dan social links tetap bekerja.
- Tidak ada horizontal scroll di 375px, 768px, 1024px, dan 1440px.
- Build dan typecheck lulus.

## Acceptance Checklist

- [ ] `npm run typecheck` lulus.
- [ ] `npm run build` lulus.
- [ ] `npm run test:smoke` lulus bila smoke test masih relevan.
- [ ] Semua tombol CTA bisa diklik.
- [ ] Semua modal bisa dibuka dan ditutup.
- [ ] Form contact tetap submit atau fallback email.
- [ ] Keyboard focus terlihat.
- [ ] `prefers-reduced-motion` tetap dihormati.
- [ ] Tidak ada data dummy dari Stitch HTML.
