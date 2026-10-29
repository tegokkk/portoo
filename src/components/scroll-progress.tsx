import { useEffect, useRef } from "react"

export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const bar = barRef.current
    if (!bar) return

    let frame = 0
    const update = () => {
      frame = 0
      const scrollable = document.documentElement.scrollHeight - window.innerHeight
      const progress = scrollable > 0 ? Math.min(1, Math.max(0, window.scrollY / scrollable)) : 0
      bar.style.transform = `scaleX(${progress})`
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }

    schedule()
    window.addEventListener("scroll", schedule, { passive: true })
    window.addEventListener("resize", schedule)
    const observer = new ResizeObserver(schedule)
    observer.observe(document.documentElement)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", schedule)
      window.removeEventListener("resize", schedule)
      observer.disconnect()
    }
  }, [])

  return <div ref={barRef} className="scroll-progress-bar" style={{ transform: "scaleX(0)" }} aria-hidden="true" />
}
