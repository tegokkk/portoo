import { useEffect, useRef, useState } from "react"

/**
 * Lightweight IntersectionObserver hook.
 * Returns [ref, isInView] — attach ref to any element to detect visibility.
 */
export function useInView(threshold = 0.15): [React.RefObject<HTMLDivElement | null>, boolean] {
  const ref = useRef<HTMLDivElement | null>(null)
  const [isInView, setIsInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Respect prefers-reduced-motion: skip animation, show immediately
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setIsInView(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true)
          observer.unobserve(el)
        }
      },
      { threshold },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [threshold])

  return [ref, isInView]
}
