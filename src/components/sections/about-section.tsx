import { motion, useReducedMotion } from "motion/react"
import { Download, FileText } from "lucide-react"
import { AnimatedCounter } from "@/components/animated-counter"
import { SectionReveal } from "@/components/section-reveal"
import LanyardBadge from "@/components/ui/lanyard-badge"
import { certificates, profile, projects, techStack, timeline } from "@/data/portfolio"
import { staggerContainer, staggerItem } from "@/lib/motion"

interface AboutSectionProps {
  onOpenCv: () => void
}

export function AboutSection({ onOpenCv }: AboutSectionProps) {
  const reduced = useReducedMotion()
  const education = timeline.find((item) => item.type === "education")
  const experience = timeline.find((item) => item.type === "experience")

  return (
    <section id="about" className="section-shell about-section">
      <SectionReveal className="paper-sheet about-paper">
        <div className="editorial-section-header">
          <div>
            <p className="section-kicker">About / 2026 Edition</p>
            <h2>About</h2>
          </div>
          <span>Tego Saputra<br />2026 Edition</span>
        </div>

        <motion.div
          className="about-folder"
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          <div className="about-folder-label">
            <span>Profile / Introduction</span>
            <span>Background &amp; focus areas</span>
          </div>

          <div className="about-folder-body">
            <motion.aside className="about-profile" variants={staggerItem}>
              <LanyardBadge
                className="about-lanyard"
                height="460px"
                cardWidth={200}
                strapColor="#003e7f"
                inkColor="#b3e8ef"
                cardColor="#f9f7f2"
                strapText="tego saputra"
                strapLabel="FULL-STACK DEVELOPER"
                front={<div className="id-face id-face-front" aria-hidden="true">
                  <img className="id-card-full-image" src="/assets/id-card-minat-bakat.jpg" alt="" width={800} height={1265} loading="lazy" draggable={false} />
                </div>}
                back={<div className="id-face id-face-back" aria-hidden="true">
                  <div className="id-card-top"><span>TEGO.DEV</span></div>
                  <span className="id-card-kicker">Focus areas</span>
                  <strong>Build with<br />purpose.</strong>
                  <p lang="id">Frontend, backend, dan sistem web yang jelas dan mudah digunakan.</p>
                  <div className="id-card-tags"><span>React</span><span>Node.js</span><span>PostgreSQL</span></div>
                  <div className="id-card-footer"><span>INDONESIA / GMT+7</span><span>2026</span></div>
                </div>}
              />
            </motion.aside>

            <motion.div className="about-copy" variants={staggerItem}>
              <div className="about-copy-heading">
                <span>Profile overview</span>
              </div>
              <p lang="id">
                Saya mengembangkan aplikasi dari antarmuka sampai API dan database. Fokus saya: alur yang mudah dipahami, tampilan responsif, dan pengelolaan data yang terstruktur.
              </p>

              <div className="about-details">
                <div>
                  <span>Education</span>
                  <strong>{education?.program}</strong>
                  <small>{education?.period}</small>
                </div>
                <div>
                  <span>Experience</span>
                  <strong>{experience?.program}</strong>
                  <small>{experience?.period}</small>
                </div>
                <div>
                  <span>Focus areas</span>
                  <div className="focus-badges">
                    <b>Frontend</b>
                    <b>Backend</b>
                    <b>Systems design</b>
                  </div>
                </div>
              </div>

              <div className="about-actions">
                <button className="primary-button" type="button" onClick={onOpenCv}>
                  <FileText size={16} /> Preview CV
                </button>
                <a className="secondary-button" href={profile.cv} download>
                  <Download size={16} /> Download CV
                </a>
              </div>
            </motion.div>
          </div>
        </motion.div>

        <motion.div
          className="stats-grid"
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={staggerContainer}
        >
          <AnimatedCounter end={projects.length} label="Projects" duration={2200} />
          <AnimatedCounter end={certificates.length} label="Certificates" duration={2000} />
          <AnimatedCounter end={techStack.length} label="Stack groups" duration={2000} />
        </motion.div>
      </SectionReveal>
    </section>
  )
}
