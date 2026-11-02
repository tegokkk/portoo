import { motion, useReducedMotion } from "motion/react"
import { ArrowRight, Download, Mail } from "lucide-react"
import { profile, projects } from "@/data/portfolio"
import type { Project } from "@/data/types"
import { staggerContainer, staggerItem } from "@/lib/motion"
import { scrollTo } from "@/lib/scroll"

interface HeroSectionProps {
  onOpenProject?: (project: Project) => void
}

const folderLayers = [
  {
    target: "certificates",
    label: "Certificates",
    detail: "Certificate archive",
    className: "hero-layer--illustration",
  },
  {
    target: "tech",
    label: "Tech Stack",
    detail: "Tools & capabilities",
    className: "hero-layer--content",
  },
  {
    target: "portfolio",
    label: "Projects",
    detail: "Selected projects",
    className: "hero-layer--packaging",
  },
  {
    target: "about",
    label: "About",
    detail: "Profile & experience",
    className: "hero-layer--branding",
  },
]

export function HeroSection({ onOpenProject }: HeroSectionProps) {
  const featuredProject = projects[0]
  const shouldReduce = useReducedMotion()

  return (
    <section id="home" className="section-shell hero-section">
      <motion.div
        className="hero-stage"
        initial={shouldReduce ? false : "hidden"}
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div className="hero-collection-label" variants={staggerItem}>
          <span>PORTFOLIO / DEVELOPER</span>
          <span>2025—2026 / VOL. 01</span>
        </motion.div>

        <nav className="hero-layer-stack" aria-label="Portfolio sections">
          {folderLayers.map(({ target, label, detail, className }) => (
            <div className={`hero-layer ${className}`} key={target}>
              <a
                className="hero-layer-tab"
                href={`#${target}`}
                onClick={(event) => {
                  event.preventDefault()
                  scrollTo(target)
                }}
                aria-label={`${label.replace(/[()]/g, "").trim()} — ${detail}`}
              >
                <span>{label}</span>
                <small>{detail}</small>
                <ArrowRight size={16} aria-hidden="true" />
              </a>
            </div>
          ))}
        </nav>

        <motion.div className="hero-cover" variants={staggerItem}>
          <div className="hero-cover-topline">
            <div className="hero-topline-left">
            </div>
            <div className="hero-volume">
              <span>PROJECT</span>
              <span>COMPILATION</span>
              <strong>VOL. 01</strong>
            </div>
          </div>

          <div className="hero-cover-title">
            <p className="hero-role-eyebrow">{profile.role} / Indonesia</p>
            <h1>{profile.name}</h1>
            <p className="hero-value-headline" lang="id">
              Membangun aplikasi web full-stack yang rapi, cepat, dan siap pakai
            </p>
          </div>

          <div className="hero-cover-bottom">
            <p lang="id">{profile.tagline}</p>
            <div className="hero-cover-actions">
              <a
                className="hero-cover-link hero-cta-primary"
                href="#portfolio"
                onClick={(event) => {
                  event.preventDefault()
                  scrollTo("portfolio")
                }}
              >
                View projects <ArrowRight size={16} aria-hidden="true" />
              </a>
              <a className="hero-cover-link hero-cover-link--muted hero-cta-secondary" href={profile.cv} download>
                <Download size={15} aria-hidden="true" /> Download CV
              </a>
              <a
                className="hero-cover-link hero-cover-link--muted hero-cta-secondary"
                href="#contact"
                onClick={(event) => {
                  event.preventDefault()
                  scrollTo("contact")
                }}
              >
                <Mail size={15} aria-hidden="true" /> Contact
              </a>
              {onOpenProject ? (
                <button
                  className="hero-featured-link"
                  type="button"
                  onClick={() => onOpenProject(featuredProject)}
                >
                  Featured case study <ArrowRight size={15} aria-hidden="true" />
                </button>
              ) : null}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
