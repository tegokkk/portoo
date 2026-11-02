import { motion, useReducedMotion } from "motion/react"
import { SectionReveal } from "@/components/section-reveal"
import { techIconMap, techStack } from "@/data/portfolio"
import { staggerContainer, staggerItem } from "@/lib/motion"

export function TechSection() {
  const reduced = useReducedMotion()
  return (
    <section id="tech" className="section-shell tech-section" aria-label="Tech stack">
      <SectionReveal className="paper-sheet tech-paper">
        <div className="tech-heading">
          <div className="section-title-row compact">
            <h2>Stack</h2>
            <span />
            <p>Core Catalog</p>
          </div>
          <p lang="id">
            Perangkat dan teknologi yang sehari-hari saya gunakan untuk membangun aplikasi web full-stack,
            sistem informasi, aplikasi mobile, hingga integrasi model AI.
          </p>
        </div>
        <div className="core-stack" aria-label="Core technologies"><span>Core technologies</span><strong>React / Next.js / Node.js / PostgreSQL</strong></div>
        <motion.div
          className="stack-grid bento-stack-grid"
          initial={reduced ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={staggerContainer}
        >
          {techStack.map((group, index) => (
            <motion.article
              key={group.category}
              className={`stack-card bento-card bento-card--${index + 1}`}
              variants={staggerItem}
              onPointerMove={(event) => {
                const rect = event.currentTarget.getBoundingClientRect()
                event.currentTarget.style.setProperty("--mouse-x", `${event.clientX - rect.left}px`)
                event.currentTarget.style.setProperty("--mouse-y", `${event.clientY - rect.top}px`)
              }}
            >
              <div className="stack-card-title">
                <group.icon size={20} />
                <h3>{group.category}</h3>
                <span>{group.values.length} tools</span>
              </div>
              <div className="tool-grid">
                {group.values.map((tool) => (
                  <span key={tool} className="tech-icon">
                    {techIconMap[tool] ? (
                      <img src={techIconMap[tool]} alt="" width="20" height="20" loading="lazy" />
                    ) : null}
                    {tool}
                  </span>
                ))}
              </div>
            </motion.article>
          ))}
        </motion.div>
      </SectionReveal>
    </section>
  )
}
