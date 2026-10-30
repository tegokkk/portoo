import { AtSign, Bot, Code2, Cpu, Database, Globe2, Mail, Server, ShieldCheck, Smartphone } from "lucide-react"
import type {
  Certificate,
  NavItem,
  Profile,
  Project,
  Social,
  TabEntry,
  TechStackGroup,
  TimelineEntry,
} from "./types"

const configuredFormEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT?.trim() ?? ""
const formEndpoint = /^https:\/\/formspree\.io\/f\/[A-Za-z0-9_-]+$/.test(configuredFormEndpoint)
  ? configuredFormEndpoint
  : ""

const profile: Profile = {
  name: "Tego Saputra",
  role: "Full-Stack Web Developer",
  email: "tegosaputra02@gmail.com",
  status: "Open for internship / freelance work",
  tagline:
    "Saya membangun aplikasi web full-stack yang rapi, responsif, dan punya alur pengguna yang jelas.",
  photo: "/assets/profile-tego.jpeg",
  cv: "/assets/tego-saputra-cv.pdf",
  formspreeEndpoint: formEndpoint,
}

const socials: Social[] = [
  { label: "GitHub", href: "https://github.com/tegokkk", icon: Code2 },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/tego-saputra-893782383/",
    icon: Globe2,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/tegosaputra_?igsh=Z2FhZ2ExM2djcTBx&utm_source=qr",
    icon: AtSign,
  },
  { label: "Email", href: "mailto:tegosaputra02@gmail.com", icon: Mail },
]

const timeline: TimelineEntry[] = [
  {
    type: "education",
    institution: "Teknologi Informasi",
    program: "D3 Manajemen Informatika",
    period: "2024 - Sekarang",
    description:
      "Fokus pada pengembangan aplikasi web, sistem informasi, database, dan implementasi proyek full-stack.",
  },
  {
    type: "experience",
    institution: "Personal Full-Stack Projects",
    program: "ABSENAPEL & CARIMAKAN",
    period: "2025 - 2026",
    description:
      "Merancang, membangun, dan merilis aplikasi React, Express, Prisma, PostgreSQL, dan Supabase dari kebutuhan produk sampai live demo.",
  },
]

const projects: Project[] = [
  {
    slug: "absenapel",
    name: "ABSENAPEL",
    subtitle: "Smart Attendance",
    summary:
      "Web absensi apel digital dengan validasi GPS, selfie sebagai bukti hadir, pengajuan izin, dan admin dashboard.",
    note: "Demo Netlify mungkin membutuhkan beberapa detik saat cold-start.",
    screenshot: "/assets/project-absenapel.png",
    screenshotSize: { width: 1918, height: 943 },
    visual: {
      eyebrow: "Attendance Flow",
      lines: ["GPS radius check", "Selfie proof", "Admin recap"],
    },
    description:
      "ABSENAPEL adalah sistem absensi berbasis web untuk lingkungan akademik. Mahasiswa mengisi absensi dengan validasi radius GPS dan selfie langsung sebagai bukti kehadiran, sementara admin mengelola jadwal, lokasi, dan rekap absensi secara real-time.",
    features: [
      "Validasi radius GPS otomatis saat absen",
      "Selfie sebagai bukti kehadiran nyata",
      "Pengajuan dan persetujuan izin mahasiswa",
      "Dashboard admin untuk jadwal, lokasi, dan rekap",
      "Riwayat absensi per mahasiswa",
    ],
    caseStudy: [
      {
        label: "Problem",
        value:
          "Absensi apel manual sulit divalidasi karena lokasi, bukti kehadiran, dan rekap data tersebar.",
      },
      {
        label: "Solution",
        value:
          "Membuat alur absensi berbasis GPS dan selfie. Kedua bukti ditempatkan bersama catatan absensi agar admin dapat meninjau lokasi dan kehadiran dari dashboard yang sama.",
      },
      {
        label: "Role",
        value:
          "Merancang flow produk, membangun frontend React, backend Express, auth JWT, schema Prisma, dan integrasi database.",
      },
      {
        label: "Impact",
        value:
          "Proses absensi menjadi lebih mudah diaudit karena bukti lokasi, wajah, izin, dan riwayat tersedia dalam satu sistem.",
      },
    ],
    tech: [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "Framer Motion",
      "Node.js",
      "Express",
      "Prisma ORM",
      "PostgreSQL",
      "Supabase",
      "JWT",
      "Bcrypt",
    ],
    metrics: [
      { label: "Core Features", value: "5+" },
      { label: "Tech Stack", value: "Full-Stack" },
      { label: "Role", value: "Solo Dev" },
    ],
    challenges: [
      "Validasi GPS agar tidak mudah dimanipulasi pengguna",
      "Memastikan selfie tersimpan dengan aman dan mudah diaudit admin",
      "Sinkronisasi jadwal dan titik apel secara real-time",
    ],
    learnings: [
      "Mendesain flow produk yang konsisten dari sisi user sampai admin",
      "Mengelola integrasi frontend, backend, dan database dalam satu codebase",
      "Menerapkan auth JWT dengan session yang aman di Express",
    ],
    live: "https://projekmandiri.netlify.app",
    repo: "https://github.com/tegokkk/ABSENAPEL",
  },
  {
    slug: "carimakan",
    name: "CARIMAKAN",
    subtitle: "Local Food Ordering",
    summary:
      "Web pemesanan makanan lokal bergaya retro dengan katalog menu, cart, checkout, riwayat, favorit, review, dan admin panel.",
    note: "Demo Netlify mungkin membutuhkan beberapa detik saat cold-start.",
    screenshot: "/assets/project-carimakan.png",
    screenshotSize: { width: 1918, height: 946 },
    visual: {
      eyebrow: "Ordering Flow",
      lines: ["Menu catalog", "Cart checkout", "Admin orders"],
    },
    description:
      "CARIMAKAN adalah platform pemesanan makanan lokal dengan tampilan retro yang unik. Pengguna dapat menjelajahi katalog menu, menambah ke cart, checkout, melihat riwayat pesanan, menyimpan favorit, memberi review, dan admin mengelola data melalui panel terpisah.",
    features: [
      "Katalog dan pencarian menu dengan rekomendasi",
      "Cart dan checkout end-to-end",
      "Riwayat pesanan dan daftar favorit",
      "Rating dan review menu oleh pengguna",
      "Admin panel untuk menu, restoran, user, dan pesanan",
    ],
    caseStudy: [
      {
        label: "Problem",
        value:
          "Pengguna butuh pengalaman cari makanan lokal yang cepat, jelas, dan tetap punya karakter visual yang mudah diingat.",
      },
      {
        label: "Solution",
        value:
          "Membangun katalog, cart, checkout, dan riwayat dalam satu flow. Panel admin dipisahkan dari antarmuka pembeli untuk membedakan kebutuhan pemesanan dan pengelolaan data.",
      },
      {
        label: "Role",
        value:
          "Mengembangkan UI retro, state belanja, endpoint backend, validasi data, auth, dan dashboard pengelolaan pesanan.",
      },
      {
        label: "Impact",
        value:
          "Demo menampilkan alur produk food ordering end-to-end dari discovery menu sampai pengelolaan pesanan admin.",
      },
    ],
    tech: [
      "React 19",
      "Vite",
      "Tailwind CSS",
      "GSAP",
      "Lenis",
      "Node.js",
      "Express",
      "Prisma ORM",
      "PostgreSQL",
      "Supabase",
      "JWT",
      "Bcrypt",
      "Zod",
    ],
    metrics: [
      { label: "Core Features", value: "8+" },
      { label: "Tech Stack", value: "Full-Stack" },
      { label: "Role", value: "Solo Dev" },
    ],
    challenges: [
      "Menjaga state belanja tetap konsisten saat user berpindah halaman",
      "Membangun admin panel yang mudah dipakai untuk kelola pesanan",
      "Merancang tampilan retro yang tetap cepat dan ringan di mobile",
    ],
    learnings: [
      "Membangun flow e-commerce end-to-end dari discovery sampai checkout",
      "Mengelola validasi data dengan Zod di sisi backend dan frontend",
      "Mendesain UI retro yang tetap accessible dan performant",
    ],
    live: "https://carimakan2.netlify.app",
    repo: "https://github.com/tegokkk/CARIMAKAN",
  },
  {
    slug: "photobooth", name: "POINTER PHOTOBOOTH", subtitle: "Interactive Photo Kiosk",
    summary: "Aplikasi kiosk photobooth berbasis web untuk acara dan kebutuhan komersial.",
    description: "Aplikasi photobooth berbasis browser dengan pilihan frame, sesi kamera, pratinjau foto, cetak, dan berbagi melalui QR.",
    note: "Beberapa fitur membutuhkan kamera dan perangkat cetak yang sesuai.",
    screenshot: "/assets/project-photobooth.png", screenshotSize: { width: 1024, height: 473 },
    visual: { eyebrow: "Photo kiosk", lines: ["Frame selection", "Camera capture", "Print and share"] },
    features: ["Katalog frame dan pratinjau", "Pengambilan foto dengan countdown dan retake", "Editing foto dan komposisi canvas", "Cetak serta berbagi melalui QR", "Dashboard operator dan monitoring"],
    caseStudy: [
      { label: "Problem", value: "Sesi photobooth perlu mudah dioperasikan oleh tamu dan operator acara." },
      { label: "Solution", value: "Alur kiosk menghubungkan pemilihan frame, kamera, pratinjau, cetak, dan berbagi digital." },
      { label: "Role", value: "Pengembangan aplikasi photobooth: antarmuka kiosk dan integrasi layanan backend." },
      { label: "Outcome", value: "Repository mendokumentasikan alur frame, kamera, pratinjau, cetak, dan QR. Belum ada metrik penggunaan produksi yang dipublikasikan." },
      { label: "Architecture", value: "Canvas digunakan untuk komposisi foto dan frame. Frontend Next.js terhubung ke API Express, Prisma, database, dan penyimpanan objek untuk layanan sesi kiosk." },
    ],
    tech: ["Next.js", "React", "TypeScript", "Express", "Prisma ORM", "PostgreSQL"],
    challenges: ["Menghubungkan pilihan frame, izin kamera, retake, dan hasil akhir dalam satu sesi kiosk.", "Memisahkan pratinjau browser dari kebutuhan kamera dan printer pada perangkat acara."], learnings: [], live: "https://photobooth-frontend-three.vercel.app/", repo: "https://github.com/tegokkk/PHOTOBOOTH1",
  },
  {
    slug: "decormoment", name: "DECORMOMENT.BDL", subtitle: "Acrylic Board Rental",
    summary: "Situs katalog dan pemesanan papan ucapan akrilik di Bandar Lampung.",
    description: "Landing page bisnis papan ucapan akrilik yang menyajikan katalog produk, informasi layanan, dan alur pemesanan melalui WhatsApp.",
    note: "Pemesanan diteruskan ke WhatsApp bisnis.",
    screenshot: "/assets/project-decormoment.png", screenshotSize: { width: 1024, height: 510 },
    visual: { eyebrow: "Product catalog", lines: ["Product gallery", "Responsive layout", "WhatsApp inquiry"] },
    features: ["Katalog produk dengan carousel", "Pemesanan melalui WhatsApp", "Informasi layanan dan FAQ", "Tampilan responsif untuk mobile", "Static export dan metadata SEO"],
    caseStudy: [
      { label: "Problem", value: "Pelanggan membutuhkan cara yang jelas untuk melihat pilihan papan dan menghubungi penyedia." },
      { label: "Solution", value: "Landing page menyatukan katalog visual, informasi produk, dan tautan pemesanan WhatsApp." },
      { label: "Role", value: "Pengembangan website katalog dan integrasi tautan pemesanan WhatsApp." },
      { label: "Outcome", value: "Website menyatukan katalog, FAQ, dan akses WhatsApp. Belum ada data konversi pemesanan yang dipublikasikan." },
      { label: "Implementation", value: "Next.js menggunakan static export untuk halaman katalog. CSS Modules dan token desain menjaga konsistensi tampilan; WhatsApp menjadi jalur pemesanan langsung tanpa checkout terpisah." },
    ],
    tech: ["Next.js", "React", "CSS Modules", "Lenis"],
    challenges: ["Menjaga katalog mudah dipindai di mobile dan jalur pemesanan WhatsApp mudah ditemukan."], learnings: [], live: "https://decormoment-bdl.vercel.app/", repo: "https://github.com/tegokkk/DECORMOMENT.BDL",
  },
]

const certificate: Certificate = {
  slug: "ai-foundations",
  name: "AI Foundations",
  issuer: "OpenAI Academy",
  recipient: "Tego Saputra",
  issuedAt: "30 Juni 2026",
  credentialId: "qcvcdqayjl",
  verifyUrl: "https://academy.openai.com/public/certificate/qcvcdqayjl",
  file: "/assets/certificate-qcvcdqayjl.pdf",
  preview: "/assets/certificate-qcvcdqayjl.png",
  previewSize: { width: 1684, height: 1191 },
}

const certificates: Certificate[] = [
  certificate,
  { slug: "classifying-data", name: "Classifying Data Using IBM Granite", issuer: "IBM SkillsBuild", recipient: "Tego Saputra", issuedAt: "28 September 2026", credentialId: "ALM-COURSE_4058910", file: "/assets/cert-classifying-data-ibm-granite.pdf", preview: "/assets/cert-classifying-data-ibm-granite.png", previewSize: { width: 1200, height: 849 } },
  { slug: "getting-started-data-course", name: "Getting Started with Data — Completion", issuer: "IBM SkillsBuild", recipient: "Tego Saputra", issuedAt: "28 September 2026", credentialId: "PLAN-14F2691E3A32", file: "/assets/cert-getting-started-data-course.pdf", preview: "/assets/cert-getting-started-data-course.png", previewSize: { width: 1200, height: 849 } },
  { slug: "code-generation-granite", name: "Code Generation and Optimization Using IBM Granite", issuer: "IBM SkillsBuild", recipient: "Tego Saputra", issuedAt: "11 September 2025", verifyUrl: "https://www.credly.com/badges/ed1a754e-fa70-4f26-893e-c2a03f2c3ed5", file: "/assets/cert-code-generation-ibm-granite.pdf", preview: "/assets/cert-code-generation-ibm-granite.png", previewSize: { width: 1200, height: 928 } },
  { slug: "getting-started-data-badge", name: "Getting Started with Data — Badge", issuer: "IBM SkillsBuild", recipient: "Tego Saputra", issuedAt: "28 September 2026", verifyUrl: "https://www.credly.com/badges/a615b74a-2a9a-4fd3-8d44-5b2d5f6acf0f", file: "/assets/cert-getting-started-data-badge.pdf", preview: "/assets/cert-getting-started-data-badge.png", previewSize: { width: 1200, height: 928 } },
  { slug: "icgstm-2026", name: "ICGSTM 2026 — Certificate of Participation", issuer: "INTI International University", recipient: "Tego Saputra", issuedAt: "22 Juli 2026", file: "/assets/cert-icgstm-2026.pdf", preview: "/assets/cert-icgstm-2026.png", previewSize: { width: 849, height: 1200 } },
  { slug: "ai-agents", name: "Unleashing the Power of AI Agents", issuer: "IBM SkillsBuild", recipient: "Tego Saputra", issuedAt: "28 September 2026", credentialId: "ALM-COURSE_3825456", file: "/assets/cert-ai-agents.pdf", preview: "/assets/cert-ai-agents.png", previewSize: { width: 1200, height: 849 } },
]

const techStack: TechStackGroup[] = [
  {
    category: "Frontend",
    icon: Cpu,
    values: [
      "React 19",
      "Next.js",
      "TypeScript",
      "Vite",
      "React Router",
      "Tailwind CSS",
      "Framer Motion",
      "GSAP",
      "Lenis",
      "Axios",
      "HTML / CSS / JavaScript",
    ],
  },
  {
    category: "Backend & API",
    icon: Server,
    values: ["Node.js", "Express", "Next.js API", "PHP", "Python", "Prisma ORM", "REST API"],
  },
  { category: "Database", icon: Database, values: ["PostgreSQL", "MySQL / MariaDB", "Supabase"] },
  { category: "Mobile", icon: Smartphone, values: ["Flutter", "Dart", "Android"] },
  { category: "AI & voice", icon: Bot, values: ["Vercel AI SDK", "Google Gemini", "OpenAI API", "SpeechRecognition", "pyttsx3"] },
  {
    category: "Security & tooling",
    icon: ShieldCheck,
    values: ["JWT", "Bcrypt", "Zod", "Joi", "Playwright", "Vitest", "Docker", "GitHub", "Netlify", "Vercel"],
  },
]

const tabs: TabEntry[] = [
  ["projects", "Projects"],
  ["certificates", "Certificates"],
  ["tech", "Tech Stack"],
]

const navItems: NavItem[] = [
  { id: "home", label: "Portfolio" },
  { id: "portfolio", label: "Projects" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
]

const heroTech: string[] = ["React", "Node.js", "Prisma", "PostgreSQL"]

const techIconMap: Record<string, string> = {
  "React 19": "/icons/react.svg",
  Vite: "/icons/vite.svg",
  "React Router": "/icons/router.svg",
  "Tailwind CSS": "/icons/tailwind.svg",
  "Framer Motion": "/icons/motion.svg",
  GSAP: "/icons/gsap.svg",
  Lenis: "/icons/lenis.svg",
  Axios: "/icons/axios.svg",
  "Node.js": "/icons/node.svg",
  Express: "/icons/express.svg",
  "Prisma ORM": "/icons/prisma.svg",
  PostgreSQL: "/icons/postgresql.svg",
  Supabase: "/icons/supabase.svg",
  JWT: "/icons/jwt.svg",
  Bcrypt: "/icons/bcrypt.svg",
  Zod: "/icons/zod.svg",
  ESLint: "/icons/eslint.svg",
  GitHub: "/icons/github.svg",
  Netlify: "/icons/netlify.svg",
  Vercel: "/icons/vercel.svg",
}

export {
  certificate,
  certificates,
  heroTech,
  navItems,
  profile,
  projects,
  socials,
  tabs,
  techIconMap,
  techStack,
  timeline,
}
