import type { ReactNode } from "react"
import { useEffect, useRef } from "react"
import { motion, useReducedMotion } from "motion/react"
import { ArrowUpRight, Award, Code2, Download, FileText, X } from "lucide-react"
import { PortfolioImage } from "@/components/shared/portfolio-image"
import { profile } from "@/data/portfolio"
import type { Certificate, Project } from "@/data/types"

function Modal({
  children,
  titleId,
  onClose,
}: {
  children: ReactNode
  titleId: string
  onClose: () => void
}) {
  const dialogRef = useRef<HTMLDivElement>(null)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    const previousFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null
    const background = Array.from(
      document.querySelectorAll<HTMLElement>(
        "#main-content, .site-header, .site-footer, .scroll-buttons, .scroll-top",
      ),
    ).map((element) => ({ element, wasInert: element.inert }))

    background.forEach(({ element }) => { element.inert = true })
    const dialog = dialogRef.current
    const closeButton = dialog?.querySelector<HTMLElement>("[data-modal-close]")
    ;(closeButton ?? dialog)?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault()
        onClose()
        return
      }

      if (event.key !== "Tab" || !dialog) return
      const focusables = Array.from(
        dialog.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), iframe, [tabindex]:not([tabindex="-1"])',
        ),
      ).filter((element) => element.getAttribute("aria-hidden") !== "true")
      if (!focusables.length) {
        event.preventDefault()
        dialog.focus()
        return
      }

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog || !dialog.contains(document.activeElement))) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && (document.activeElement === last || !dialog.contains(document.activeElement))) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    return () => {
      window.removeEventListener("keydown", onKeyDown)
      background.forEach(({ element, wasInert }) => { element.inert = wasInert })
      if (previousFocus?.isConnected) previousFocus.focus()
    }
  }, [onClose])

  return (
    <motion.div
      className="modal-backdrop"
      onPointerDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
      initial={shouldReduce ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: shouldReduce ? 0 : 0.2 }}
    >
      <motion.div
        ref={dialogRef}
        className="modal paper-sheet"
        data-lenis-prevent
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        tabIndex={-1}
        initial={shouldReduce ? false : { opacity: 0, scale: 0.96, y: 18 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 18 }}
        transition={{ duration: shouldReduce ? 0 : 0.25, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  const titleId = `project-title-${project.slug}`

  return (
    <Modal titleId={titleId} onClose={onClose}>
      <button
        className="modal-close"
        data-modal-close
        type="button"
        onClick={onClose}
        aria-label="Close project details"
      >
        <X size={18} />
      </button>
      <p className="section-kicker">Case study</p>
      <h2 id={titleId}>
        {project.name} <span>{project.subtitle}</span>
      </h2>
      <p lang="id">{project.description}</p>
      <div className="modal-actions">
        <a className="primary-button" href={project.live} target="_blank" rel="noopener noreferrer">
          <ArrowUpRight size={18} /> Live Demo
        </a>
        <a className="secondary-button" href={project.repo} target="_blank" rel="noopener noreferrer">
          <Code2 size={18} /> Source Code
        </a>
      </div>

      <PortfolioImage
        className="modal-shot"
        src={project.screenshot}
        alt={`Screenshot ${project.name}`}
        width={project.screenshotSize.width}
        height={project.screenshotSize.height}
      />
      <div className="metrics-row">
        {project.metrics?.map((metric) => (
          <span key={metric.label}>
            <strong>{metric.value}</strong>
            {metric.label}
          </span>
        ))}
      </div>
      <div className="case-study-grid">
        {project.caseStudy.map((item) => (
          <article key={item.label}>
            <strong>{item.label}</strong>
            <p lang="id">{item.value}</p>
          </article>
        ))}
      </div>
      {project.challenges?.length ? <article><h3>Challenges</h3><ul className="modal-list" lang="id">{project.challenges.map((item) => <li key={item}>{item}</li>)}</ul></article> : null}
      <h3>Key Features</h3>
      <ul className="modal-list" lang="id">
        {project.features.map((feature) => (
          <li key={feature}>{feature}</li>
        ))}
      </ul>
      <div className="badge-row">
        {project.tech.map((tech) => (
          <span key={tech}>{tech}</span>
        ))}
      </div>
      <small lang="id">{project.note}</small>
    </Modal>
  )
}

function CertificateModal({ certificate, onClose }: { certificate: Certificate; onClose: () => void }) {
  return (
    <Modal titleId="certificate-title" onClose={onClose}>
      <button className="modal-close" data-modal-close type="button" onClick={onClose} aria-label="Close certificate">
        <X size={18} />
      </button>
      <p className="section-kicker">Certificate detail</p>
      <h2 id="certificate-title">{certificate.name}</h2>
      <p>
        {certificate.issuer} / {certificate.recipient} / {certificate.issuedAt}
      </p>
      <img
        className="modal-shot certificate-shot"
        src={certificate.preview}
        alt={`Sertifikat ${certificate.name}`}
        width={certificate.previewSize.width}
        height={certificate.previewSize.height}
      />
      <div className="modal-actions">
        {certificate.verifyUrl ? <a className="primary-button" href={certificate.verifyUrl} target="_blank" rel="noopener noreferrer">
          <Award size={18} /> Verify certificate
        </a> : null}
        <a className="secondary-button" href={certificate.file} target="_blank" rel="noopener noreferrer">
          <FileText size={18} /> Open PDF
        </a>
      </div>
    </Modal>
  )
}

function CvModal({ onClose }: { onClose: () => void }) {
  return (
    <Modal titleId="cv-title" onClose={onClose}>
      <button className="modal-close" data-modal-close type="button" onClick={onClose} aria-label="Close CV preview">
        <X size={18} />
      </button>
      <p className="section-kicker">CV preview</p>
      <h2 id="cv-title">CV {profile.name}</h2>
      <iframe className="cv-frame" title={`Preview CV ${profile.name}`} src={profile.cv} />
      <div className="modal-actions">
        <a className="primary-button" href={profile.cv} download>
          <Download size={18} /> Download CV
        </a>
      </div>
    </Modal>
  )
}

export { CertificateModal, CvModal, ProjectModal }
