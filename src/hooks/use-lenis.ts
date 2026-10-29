import Lenis from "lenis"
import { useEffect, useRef } from "react"

export function useLenis() {
  const lenisRef = useRef<Lenis | null>(null)
  const rafRef = useRef(0)

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.5,
    })

    function raf(time: number) {
      lenis.raf(time)
      rafRef.current = requestAnimationFrame(raf)
    }
    rafRef.current = requestAnimationFrame(raf)

    lenisRef.current = lenis

    return () => {
      cancelAnimationFrame(rafRef.current)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [])

  return { lenisRef }
}
