import { motion, useReducedMotion } from "motion/react"
import { useRef } from "react"
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react"
import { SectionReveal } from "@/components/section-reveal"
import { certificates } from "@/data/portfolio"
import type { Certificate } from "@/data/types"

interface CertificateSectionProps {
  onOpenCertificate: (certificate: Certificate) => void
}

export function CertificateSection({ onOpenCertificate }: CertificateSectionProps) {
  const reducedMotion = useReducedMotion()
  const scrollRef = useRef<HTMLDivElement>(null)
  const dragRef = useRef({ down: false, moved: false, x: 0, left: 0 })

  const move = (direction: number) => {
    const scroll = scrollRef.current
    if (scroll) scroll.scrollLeft += direction * Math.min(260, scroll.clientWidth * 0.75)
  }

  return (
    <section id="certificates" className="section-shell certificate-section">
      <SectionReveal className="paper-sheet certificate-paper">
        <div className="certificate-gallery-heading">
          <p className="section-kicker">Credentials / Learning archive</p>
          <h2>Certificates<span>.</span></h2>
          <p lang="id">Catatan pembelajaran, pencapaian, dan partisipasi saya dalam teknologi dan komunitas.</p>
        </div>
        <div className="certificate-gallery-controls" aria-label="Certificate navigation">
          <span>7 certificates · Drag or use the arrows</span>
          <button type="button" onClick={() => move(-1)} aria-label="Previous certificates"><ArrowLeft size={20} /></button>
          <button type="button" onClick={() => move(1)} aria-label="Next certificates"><ArrowRight size={20} /></button>
        </div>
        <div
          ref={scrollRef}
          className="certificate-gallery-scroll"
          aria-label="Certificate gallery"
          role="region"
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.target !== event.currentTarget) return
            if (event.key === "ArrowRight" || event.key === "ArrowLeft") { event.preventDefault(); move(event.key === "ArrowRight" ? 1 : -1) }
          }}
          onPointerDown={(event) => {
            if (event.pointerType !== "mouse" || event.button !== 0) return
            dragRef.current = { down: true, moved: false, x: event.clientX, left: event.currentTarget.scrollLeft }
          }}
          onPointerMove={(event) => {
            const drag = dragRef.current
            if (!drag.down) return
            if (!drag.moved && Math.abs(event.clientX - drag.x) > 5) {
              drag.moved = true
              event.currentTarget.setPointerCapture(event.pointerId)
            }
            if (drag.moved) {
              event.preventDefault()
              event.currentTarget.scrollLeft = drag.left - (event.clientX - drag.x)
              drag.left = event.currentTarget.scrollLeft
              drag.x = event.clientX
            }
          }}
          onPointerUp={() => { dragRef.current.down = false }}
          onPointerCancel={() => { dragRef.current.down = false }}
          onPointerLeave={() => { if (!dragRef.current.moved) dragRef.current.down = false }}
          onClickCapture={(event) => {
            if (dragRef.current.moved) { event.preventDefault(); event.stopPropagation(); dragRef.current.moved = false }
          }}
        >
          <motion.div className="certificate-gallery" initial="hidden" whileInView="visible" viewport={{ once: true, amount: 0.15 }} variants={{ hidden: {}, visible: { transition: { staggerChildren: reducedMotion ? 0 : 0.08 } } }}>
            <div className="certificate-gallery-group">
            {certificates.map((item, index) => (
              <motion.button
                className="certificate-gallery-card"
                key={item.slug}
                type="button"
                onClick={() => onOpenCertificate(item)}
                aria-label={`View certificate ${item.name}`}
                variants={{ hidden: { opacity: reducedMotion ? 1 : 0, y: reducedMotion ? 0 : 30 }, visible: { opacity: 1, y: 0 } }}
                transition={{ duration: reducedMotion ? 0 : 0.35 }}
                whileHover={reducedMotion ? undefined : { y: -12, zIndex: 20 }}
                whileFocus={{ zIndex: 20 }}
              >
                <div className="certificate-gallery-image"><img src={item.preview} alt="" width={item.previewSize.width} height={item.previewSize.height} loading="lazy" /></div>
                <div className="certificate-gallery-meta"><span>{String(index + 1).padStart(2, "0")} / {item.issuer}</span><ArrowUpRight size={16} aria-hidden="true" /></div>
                <strong>{item.name}</strong>
              </motion.button>
            ))}</div>
          </motion.div>
        </div>
        <p className="certificate-gallery-note">{String(certificates.length).padStart(2, "0")} credentials <span>Select a certificate to view details and PDF</span></p>
      </SectionReveal>
    </section>
  )
}
