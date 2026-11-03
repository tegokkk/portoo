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
  role: "Full-Stack Web Developer & Software Engineer",
  email: "tegosaputra02@gmail.com",
  status: "Available for Projects & Opportunities",
  tagline:
    "Membangun aplikasi web full-stack dari rancangan antarmuka, logika API, hingga skema database. Fokus pada kode yang terstruktur, kinerja ringan, dan pengalaman pengguna yang nyaman.",
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
      "Fokus pada pengembangan aplikasi web, basis data, dan rekayasa perangkat lunak full-stack melalui proyek praktis.",
  },
  {
    type: "experience",
    institution: "Personal Full-Stack Projects",
    program: "ABSENAPEL & CARIMAKAN",
    period: "2025 - 2026",
    description:
      "Membangun dan merilis proyek web full-stack mandiri dari perancangan arsitektur, integrasi database, hingga live deployment.",
  },
]

const projects: Project[] = [
  {
    slug: "absenapel",
    name: "ABSENAPEL",
    subtitle: "Smart Attendance",
    roleBadge: "Full-Stack Developer",
    impactSummary:
      "Sistem presensi apel akademik dengan kunci radius GPS dan bukti selfie langsung, lengkap dengan rekap admin real-time.",
    summary:
      "Web absensi apel digital dengan validasi radius GPS, selfie kamera langsung, perizinan, dan dashboard rekap admin.",
    note: "Demo Netlify mungkin membutuhkan beberapa detik saat cold-start.",
    screenshot: "/assets/project-absenapel.png",
    screenshotSize: { width: 1918, height: 943 },
    visual: {
      eyebrow: "Attendance Flow",
      lines: ["GPS radius check", "Selfie proof", "Admin recap"],
    },
    description:
      "ABSENAPEL adalah sistem presensi apel digital berbasis web untuk lingkungan akademik. Mahasiswa melakukan absensi dengan validasi radius GPS dan foto selfie langsung, sementara admin mengelola jadwal, lokasi titik apel, serta rekap data secara real-time.",
    features: [
      "Validasi radius GPS otomatis saat absen",
      "Selfie kamera langsung sebagai bukti kehadiran",
      "Pengajuan dan persetujuan izin mahasiswa",
      "Dashboard admin untuk jadwal, lokasi titik, dan rekap",
      "Riwayat presensi per mahasiswa",
    ],
    caseStudy: [
      {
        label: "Problem",
        value:
          "Presensi apel manual rawan titip absen dan menyulitkan rekap kehadiran karena data lokasi dan bukti hadir tidak terpusat.",
      },
      {
        label: "Solution",
        value:
          "Membangun alur absensi dengan verifikasi radius GPS dan tangkapan kamera langsung. Seluruh data tervalidasi masuk ke dashboard terpusat untuk audit admin.",
      },
      {
        label: "Role",
        value:
          "Merancang alur produk, membangun frontend React, backend Express, otentikasi JWT, skema Prisma, dan database PostgreSQL.",
      },
      {
        label: "Impact",
        value:
          "Meningkatkan akurasi kehadiran mahasiswa dan memangkas waktu rekap presensi admin secara signifikan.",
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
      "Mencegah manipulasi lokasi GPS dari browser atau perangkat mahasiswa",
      "Mengoptimalkan kompresi foto selfie agar hemat bandwidth dan cepat tersimpan",
      "Sinkronisasi status dan jadwal titik apel secara akurat dan real-time",
    ],
    learnings: [
      "Merancang arsitektur aplikasi yang seimbang antara kemudahan user dan ketegasan validasi",
      "Penerapan otentikasi JWT dan otorisasi role (mahasiswa vs admin) di Express",
      "Manajemen skema database dan relasi data menggunakan Prisma ORM",
    ],
    live: "https://projekmandiri.netlify.app",
    repo: "https://github.com/tegokkk/ABSENAPEL",
  },
  {
    slug: "carimakan",
    name: "CARIMAKAN",
    subtitle: "Local Food Ordering",
    roleBadge: "Full-Stack Developer",
    impactSummary:
      "Platform pesan kuliner lokal bertema retro dengan alur belanja lengkap, mulai dari katalog menu hingga panel pesanan penjual.",
    summary:
      "Web pemesanan makanan lokal bertema retro dengan fitur keranjang, checkout, riwayat pesanan, ulasan, dan panel admin.",
    note: "Demo Netlify mungkin membutuhkan beberapa detik saat cold-start.",
    screenshot: "/assets/project-carimakan.png",
    screenshotSize: { width: 1918, height: 946 },
    visual: {
      eyebrow: "Ordering Flow",
      lines: ["Menu catalog", "Cart checkout", "Admin orders"],
    },
    description:
      "CARIMAKAN adalah platform pemesanan makanan lokal dengan konsep visual retro yang unik. Pengguna dapat menjelajahi menu, mengelola keranjang, melakukan checkout, melihat riwayat pesanan, memberi ulasan, sementara pengelola resto mengatur menu dan status pesanan via panel admin.",
    features: [
      "Katalog dan pencarian menu dengan filter rekomendasi",
      "Alur keranjang dan checkout yang mulus",
      "Riwayat pesanan dan daftar menu favorit",
      "Sistem rating dan ulasan dari pembeli",
      "Panel admin untuk pengelolaan menu, kategori, dan pesanan",
    ],
    caseStudy: [
      {
        label: "Problem",
        value:
          "Pemesanan kuliner lokal sering kali minim identitas visual yang khas dan proses checkout yang membingungkan bagi pembeli pemula.",
      },
      {
        label: "Solution",
        value:
          "Menghadirkan pengalaman belanja yang fun bertema retro dengan alur keranjang belanja yang intuitif, didukung panel admin untuk pembaruan menu dan status pesanan.",
      },
      {
        label: "Role",
        value:
          "Mengembangkan UI/UX retro dengan React & Tailwind, mengelola client state belanja, serta membangun REST API dan skema database.",
      },
      {
        label: "Impact",
        value:
          "Menghadirkan prototipe e-commerce kuliner yang interaktif dan siap pakai, dari pencarian menu hingga manajemen pesanan selesai.",
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
      "Menjaga konsistensi dan persistensi keranjang belanja saat user berpindah halaman",
      "Mendesain tampilan retro yang unik tanpa mengorbankan kecepatan loading dan aksesibilitas mobile",
      "Validasi skema request checkout secara menyeluruh menggunakan Zod di client dan server",
    ],
    learnings: [
      "Merancang alur e-commerce yang ramah pengguna dari discovery hingga order confirmation",
      "Penerapan validasi skema runtime dengan Zod untuk mencegah payload error",
      "Eksplorasi estetika retro modern menggunakan CSS modular dan animasi ringan",
    ],
    live: "https://carimakan2.netlify.app",
    repo: "https://github.com/tegokkk/CARIMAKAN",
  },
  {
    slug: "photobooth",
    name: "POINTER PHOTOBOOTH",
    subtitle: "Interactive Photo Kiosk",
    roleBadge: "Full-Stack Kiosk Engineer",
    impactSummary:
      "Aplikasi kiosk photobooth berbasis web yang mengotomatisasi sesi foto: pemilihan frame, kamera live, preview, hingga cetak dan unduh via QR.",
    summary: "Aplikasi kiosk photobooth berbasis web untuk kebutuhan acara dan instalasi interaktif.",
    description:
      "POINTER PHOTOBOOTH adalah aplikasi web kiosk untuk acara dan instalasi interaktif. Pengunjung dapat memilih template frame, berfoto dengan countdown otomatis, melihat pratinjau hasil, serta mencetak atau mengunduh foto langsung ke ponsel melalui QR code.",
    note: "Membutuhkan izin akses kamera browser untuk mencoba sesi foto.",
    screenshot: "/assets/project-photobooth.png",
    screenshotSize: { width: 1024, height: 473 },
    visual: { eyebrow: "Photo kiosk", lines: ["Frame selection", "Camera capture", "Print and share"] },
    features: [
      "Katalog template frame dengan live preview",
      "Pengambilan foto dengan countdown timer dan fitur retake",
      "Komposisi foto dan frame otomatis menggunakan HTML5 Canvas",
      "Cetak langsung serta unduh file digital via QR code",
      "Panel kontrol operator untuk pengaturan sesi dan cetak",
    ],
    caseStudy: [
      {
        label: "Problem",
        value: "Sesi foto booth konvensional di acara sering membutuhkan operator khusus dan proses transfer file foto ke tamu yang memakan waktu.",
      },
      {
        label: "Solution",
        value: "Membangun sistem kiosk swalayan (self-service) di browser yang memandu pengunjung dari pemilihan frame foto, timer capture, rendering canvas, hingga pembagian file lewat QR code.",
      },
      {
        label: "Role",
        value: "Mengembangkan antarmuka kiosk, manipulasi canvas untuk penggabungan foto & frame, serta integrasi endpoint backend.",
      },
      {
        label: "Outcome",
        value: "Berhasil mengotomatisasi seluruh alur sesi foto di acara, mempercepat pergantian tamu dan mempermudah distribusi hasil foto secara instan.",
      },
      {
        label: "Architecture",
        value: "Manipulasi HTML5 Canvas untuk komposisi frame resolusi tinggi secara client-side, dipadukan dengan Next.js dan backend Express/Prisma untuk manajemen sesi dan link QR.",
      },
    ],
    tech: ["Next.js", "React", "TypeScript", "Express", "Prisma ORM", "PostgreSQL"],
    challenges: [
      "Menangani izin kamera browser dan penyesuaian rasio resolusi foto berbagai webcam",
      "Mengoptimalkan proses rendering canvas agar penggabungan frame foto tetap mulus tanpa lag",
    ],
    learnings: [
      "Teknik manipulasi image data dan rendering multi-layer di HTML5 Canvas",
      "Pengelolaan state mesin interaktif untuk alur kiosk self-service",
    ],
    live: "https://photobooth-frontend-three.vercel.app/",
    repo: "https://github.com/tegokkk/PHOTOBOOTH1",
  },
  {
    slug: "decormoment",
    name: "DECORMOMENT.BDL",
    subtitle: "Acrylic Board Rental",
    roleBadge: "Frontend & Web Engineer",
    impactSummary:
      "Katalog interaktif sewa papan akrilik di Bandar Lampung yang langsung terhubung ke chat WhatsApp dengan format pesanan otomatis.",
    summary: "Website katalog dan pemesanan sewa papan ucapan akrilik di Bandar Lampung.",
    description:
      "DECORMOMENT.BDL adalah web katalog untuk bisnis penyewaan papan ucapan akrilik. Pengunjung dapat meninjau galeri variasi papan, pricelist, testimoni, dan melakukan reservasi langsung melalui pesan WhatsApp yang sudah diformat rapi.",
    note: "Pemesanan diteruskan langsung ke WhatsApp admin bisnis.",
    screenshot: "/assets/project-decormoment.png",
    screenshotSize: { width: 1024, height: 510 },
    visual: { eyebrow: "Product catalog", lines: ["Product gallery", "Responsive layout", "WhatsApp inquiry"] },
    features: [
      "Galeri katalog papan ucapan dengan carousel responsif",
      "Generator pesan otomatis langsung ke WhatsApp admin",
      "Pricelist transparan, informasi layanan, dan FAQ lengkap",
      "Navigasi cepat dan optimal di layar smartphone",
      "Optimasi SEO lokal untuk kata kunci sewa papan akrilik Bandar Lampung",
    ],
    caseStudy: [
      {
        label: "Problem",
        value: "Calon pelanggan sering kesulitan melihat detail model papan akrilik yang tersedia dan format chat pemesanan di media sosial sering kali tidak lengkap.",
      },
      {
        label: "Solution",
        value: "Menyediakan katalog visual responsif berbasis web dengan tombol reservasi yang langsung men-generate detail produk dan tanggal sewa ke WhatsApp pemilik bisnis.",
      },
      {
        label: "Role",
        value: "Mendesain dan mengembangkan website katalog responsif, optimasi performa loading gambar, serta integrasi generator pesanan WhatsApp.",
      },
      {
        label: "Outcome",
        value: "Memudahkan calon penyewa melihat referensi produk secara mandiri dan mempercepat alur konsultasi pemesanan tanpa bolak-balik menanyakan katalog.",
      },
      {
        label: "Implementation",
        value: "Dibangun dengan Next.js static export dan CSS modular untuk memastikan loading instan di mobile, dengan metadata SEO untuk pencarian lokal di Bandar Lampung.",
      },
    ],
    tech: ["Next.js", "React", "CSS Modules", "Lenis"],
    challenges: [
      "Menjaga bobot gambar katalog tetap tajam namun sangat ringan saat diakses via koneksi mobile",
      "Membuat alur konsultasi pemesanan via WhatsApp terasa praktis dan bebas friksi bagi pengguna",
    ],
    learnings: [
      "Optimasi aset visual responsif untuk web bisnis lokal berbasis mobile",
      "Penerapan struktur meta tag SEO untuk visibilitas penelusuran daerah tertentu",
    ],
    live: "https://decormoment-bdl.vercel.app/",
    repo: "https://github.com/tegokkk/DECORMOMENT.BDL",
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
  {
    slug: "hki-ormawa-hmj",
    name: "HKI — Sistem Informasi Manajemen ORMAWA dan HMJ Berbasis Web dengan Arsitektur Multi-Tenant",
    issuer: "Kementerian Hukum Republik Indonesia",
    recipient: "Tego Saputra (pencipta bersama)",
    issuedAt: "3 November 2026 (tanggal permohonan)",
    credentialId: "Nomor pencatatan: 001584450",
    file: "/assets/hki-ormawa-hmj.pdf",
    preview: "/assets/hki-ormawa-hmj.png",
    previewSize: { width: 835, height: 1181 },
  },
  certificate,
  {
    slug: "generative-ai-software-development",
    name: "Use Generative AI for Software Development",
    issuer: "IBM SkillsBuild",
    recipient: "Tego Saputra",
    issuedAt: "11 September 2025",
    credentialId: "MDL-504",
    file: "/assets/cert-generative-ai-software-development.pdf",
    preview: "/assets/cert-generative-ai-software-development.png",
    previewSize: { width: 1200, height: 849 },
  },
  {
    slug: "ibm-granite-models-software-development",
    name: "IBM Granite Models for Software Development",
    issuer: "IBM SkillsBuild",
    recipient: "Tego Saputra",
    issuedAt: "11 September 2025",
    credentialId: "MDL-567",
    file: "/assets/cert-ibm-granite-models-software-development.pdf",
    preview: "/assets/cert-ibm-granite-models-software-development.png",
    previewSize: { width: 1200, height: 849 },
  },
  {
    slug: "code-generation-granite-course",
    name: "Code Generation and Optimization Using IBM Granite — Completion",
    issuer: "IBM SkillsBuild",
    recipient: "Tego Saputra",
    issuedAt: "11 September 2025",
    credentialId: "MDL-566",
    file: "/assets/cert-code-generation-granite-course.pdf",
    preview: "/assets/cert-code-generation-granite-course.png",
    previewSize: { width: 1200, height: 849 },
  },
  {
    slug: "code-generation-granite",
    name: "Code Generation and Optimization Using IBM Granite",
    issuer: "IBM SkillsBuild",
    recipient: "Tego Saputra",
    issuedAt: "11 September 2025",
    verifyUrl: "https://www.credly.com/badges/ed1a754e-fa70-4f26-893e-c2a03f2c3ed5",
    file: "/assets/cert-code-generation-ibm-granite.pdf",
    preview: "/assets/cert-code-generation-ibm-granite.png",
    previewSize: { width: 1200, height: 928 },
  },
  { slug: "classifying-data", name: "Classifying Data Using IBM Granite", issuer: "IBM SkillsBuild", recipient: "Tego Saputra", issuedAt: "28 September 2026", credentialId: "ALM-COURSE_4058910", file: "/assets/cert-classifying-data-ibm-granite.pdf", preview: "/assets/cert-classifying-data-ibm-granite.png", previewSize: { width: 1200, height: 849 } },
  { slug: "getting-started-data-course", name: "Getting Started with Data — Completion", issuer: "IBM SkillsBuild", recipient: "Tego Saputra", issuedAt: "28 September 2026", credentialId: "PLAN-14F2691E3A32", file: "/assets/cert-getting-started-data-course.pdf", preview: "/assets/cert-getting-started-data-course.png", previewSize: { width: 1200, height: 849 } },
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
  { id: "about", label: "About" },
  { id: "portfolio", label: "Projects" },
  { id: "certificates", label: "Certificates" },
  { id: "tech", label: "Tech Stack" },
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
