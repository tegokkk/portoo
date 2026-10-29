import { useCallback, useReducer } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { ArrowUpRight, FileText } from "lucide-react"
import { projects } from "@/data/portfolio"
import type { Project } from "@/data/types"

interface Props {
  onOpenProject: (project: Project) => void
}

const STACK_DEPTH = 3

const positionStyles = [
  { scale: 1, y: 12 },
  { scale: 0.95, y: -16 },
  { scale: 0.9, y: -44 },
]

function getVisible(activeIndex: number) {
  const result: { project: Project; depth: number }[] = []
  for (let d = 0; d < Math.min(STACK_DEPTH, projects.length); d++) {
    const idx = (activeIndex + d) % projects.length
    result.push({ project: projects[idx], depth: d })
  }
  return result
}

export function PortfolioStack({ onOpenProject }: Props) {
  const [activeIndex, advance] = useReducer(
    (current: number) => (current + 1) % projects.length,
    0,
  )
  const shouldReduce = useReducedMotion()

  const handleAdvance = useCallback(() => advance(), [])

  const visible = getVisible(activeIndex)
  const frontProject = visible[0]?.project

  return (
    <div className="stack-area" aria-label="Portfolio card stack">
      {/* Stack background cards */}
      <div className="stack-cards">
        <AnimatePresence mode="popLayout">
          {visible.map(({ project, depth }) => (
            <motion.article
              key={project.slug}
              className="portfolio-stack-card"
              style={{ zIndex: STACK_DEPTH - depth }}
              initial={
                shouldReduce
                  ? false
                  : { scale: positionStyles[depth]?.scale ?? 0.88, y: 60, opacity: 0 }
              }
              animate={
                shouldReduce
                  ? {}
                  : {
                      scale: positionStyles[depth]?.scale ?? 0.88,
                      y: positionStyles[depth]?.y ?? -44,
                      opacity: depth === 0 ? 1 : 0.72 - depth * 0.14,
                    }
              }
              exit={shouldReduce ? {} : { y: 80, opacity: 0, scale: 0.88 }}
              transition={{ type: "spring", duration: 1, bounce: 0 }}
            >
              {/* Image area */}
              <div className="stack-card-image">
                <img
                  src={project.screenshot}
                  alt={`${project.name} preview`}
                  loading="lazy"
                  decoding="async"
                />
              </div>

              {/* Footer — only front card fully interactive */}
              <div className="stack-card-footer">
                <div className="stack-card-meta">
                  <p className="stack-card-sub">{project.subtitle}</p>
                  <h3 className="stack-card-title">{project.name}</h3>
                </div>

                {depth === 0 ? (
                  <div className="stack-card-actions">
                    <button
                      type="button"
                      className="stack-card-cta"
                      onClick={() => onOpenProject(project)}
                      aria-label="Open featured project case study"
                    >
                      <FileText size={15} />
                      Case Study
                    </button>
                    <button
                      type="button"
                      className="stack-card-next"
                      onClick={handleAdvance}
                      aria-label="Next project"
                    >
                      <ArrowUpRight size={15} />
                    </button>
                  </div>
                ) : (
                  <div className="stack-card-actions stack-card-actions--ghost" aria-hidden="true">
                    <span className="stack-card-cta stack-card-cta--ghost">
                      <FileText size={15} />
                      Case Study
                    </span>
                  </div>
                )}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

      {/* Dot indicator */}
      <div className="stack-dots" aria-hidden="true">
        {projects.map((p, i) => (
          <span
            key={p.slug}
            className={`stack-dot${i === activeIndex % projects.length ? " stack-dot--active" : ""}`}
          />
        ))}
      </div>

      {/* Advance hint */}
      <button
        type="button"
        className="stack-advance-hint"
        onClick={handleAdvance}
        aria-label={`Next project: ${frontProject ? projects[(activeIndex + 1) % projects.length]?.name : ""}`}
      >
        <ArrowUpRight size={13} />
        next project
      </button>
    </div>
  )
}
