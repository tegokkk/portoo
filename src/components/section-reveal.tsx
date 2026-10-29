import { motion, useReducedMotion } from "motion/react"
import { useInView } from "@/hooks/use-in-view"
import { fadeUp } from "@/lib/motion"
import type { ReactNode } from "react"

interface SectionRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

/**
 * Wraps a section with scroll-triggered fade-up animation.
 * Respects prefers-reduced-motion automatically.
 */
export function SectionReveal({ children, className, delay = 0 }: SectionRevealProps) {
  const reduced = useReducedMotion()
  const [ref, isInView] = useInView(0.1)

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduced ? false : "hidden"}
      animate={reduced || isInView ? "visible" : "hidden"}
      variants={{
        ...fadeUp,
        visible: {
          ...fadeUp.visible,
          transition: { ...fadeUp.visible.transition, delay },
        },
      }}
    >
      {children}
    </motion.div>
  )
}
