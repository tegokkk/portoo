import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  size: number
  alpha: number
  life: number
  maxLife: number
}

interface Star {
  x: number
  y: number
  size: number
  alpha: number
  twinkleSpeed: number
  phase: number
}

export function FlickeringGrid() {
  const gridRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<HTMLCanvasElement>(null)
  const starsRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || isCoarsePointer) return

    const canvases = [gridRef.current, particlesRef.current, starsRef.current].filter(
      Boolean,
    ) as HTMLCanvasElement[]

    function resize() {
      const w = window.innerWidth
      const h = window.innerHeight
      for (const c of canvases) {
        c.width = w
        c.height = h
      }
    }
    resize()
    window.addEventListener("resize", resize)

    // Grid layer
    const gridCtx = gridRef.current!.getContext("2d")!
    // Particles layer
    const partCtx = particlesRef.current!.getContext("2d")!
    // Stars layer
    const starsCtx = starsRef.current!.getContext("2d")!

    const CELL = 32
    const particles: Particle[] = []
    const MAX_PARTICLES = isCoarsePointer ? 0 : 40

    const stars: Star[] = []
    const STAR_COUNT = isCoarsePointer ? 48 : 120

    function initStars() {
      stars.length = 0
      const w = window.innerWidth
      const h = window.innerHeight
      for (let i = 0; i < STAR_COUNT; i++) {
        stars.push({
          x: Math.random() * w,
          y: Math.random() * h,
          size: Math.random() * 1.5 + 0.5,
          alpha: Math.random() * 0.5 + 0.2,
          twinkleSpeed: Math.random() * 0.02 + 0.005,
          phase: Math.random() * Math.PI * 2,
        })
      }
    }
    initStars()

    // grid state with "flicker" memory
    interface CellState {
      current: number
      target: number
      speed: number
    }
    let grid: CellState[][] = []

    function buildGrid() {
      const cols = Math.ceil(window.innerWidth / CELL) + 1
      const rows = Math.ceil(window.innerHeight / CELL) + 1
      grid = Array.from({ length: cols }, () =>
        Array.from({ length: rows }, () => ({
          current: 0,
          target: Math.random(),
          speed: 0.02 + Math.random() * 0.06,
        })),
      )
    }
    buildGrid()

    // Mouse trail for particles
    const mouse = { x: -9999, y: -9999 }
    function onMouse(e: MouseEvent) {
      mouse.x = e.clientX
      mouse.y = e.clientY
    }
    if (!isCoarsePointer) window.addEventListener("mousemove", onMouse)

    function spawnParticles() {
      if (particles.length >= MAX_PARTICLES) return
      if (mouse.x < 0) return
      for (let i = 0; i < 2; i++) {
        const angle = Math.random() * Math.PI * 2
        const speed = 0.5 + Math.random() * 1.5
        particles.push({
          x: mouse.x + (Math.random() - 0.5) * 20,
          y: mouse.y + (Math.random() - 0.5) * 20,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          size: Math.random() * 2 + 1,
          alpha: 0.6,
          life: 0,
          maxLife: 60 + Math.random() * 40,
        })
      }
    }

    let animId = 0
    let frame = 0
    let running = !document.hidden

    function onVisibilityChange() {
      running = !document.hidden
      if (running && !animId) animId = requestAnimationFrame(animate)
    }
    document.addEventListener("visibilitychange", onVisibilityChange)

    function animate() {
      if (!running) {
        animId = 0
        return
      }

      frame++

      // --- Grid ---
      gridCtx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for (let x = 0; x < grid.length; x++) {
        for (let y = 0; y < grid[x].length; y++) {
          const cell = grid[x][y]
          if (Math.random() < 0.005) {
            cell.target = Math.random()
          }
          cell.current += (cell.target - cell.current) * cell.speed
          if (cell.current > 0.01) {
            gridCtx.fillStyle = `rgba(255, 255, 255, ${cell.current * 0.03})`
            gridCtx.fillRect(x * CELL, y * CELL, CELL, CELL)
          }
        }
      }

      // --- Stars ---
      starsCtx.clearRect(0, 0, window.innerWidth, window.innerHeight)
      for (const star of stars) {
        const twinkle = Math.sin(frame * star.twinkleSpeed + star.phase) * 0.3 + 0.7
        starsCtx.beginPath()
        starsCtx.arc(star.x, star.y, star.size, 0, Math.PI * 2)
        starsCtx.fillStyle = `rgba(255, 255, 255, ${star.alpha * twinkle})`
        starsCtx.fill()
      }

      // --- Particles ---
      partCtx.clearRect(0, 0, window.innerWidth, window.innerHeight)

      if (frame % 3 === 0) spawnParticles()

      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i]
        p.x += p.vx
        p.y += p.vy
        p.vx *= 0.98
        p.vy *= 0.98
        p.life++
        p.alpha = 0.6 * (1 - p.life / p.maxLife)

        if (p.life >= p.maxLife || p.alpha <= 0.01) {
          particles.splice(i, 1)
          continue
        }

        partCtx.beginPath()
        partCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        partCtx.fillStyle = `rgba(100, 140, 255, ${p.alpha})`
        partCtx.fill()

        partCtx.shadowColor = "rgba(100, 140, 255, 0.5)"
        partCtx.shadowBlur = 6
        partCtx.beginPath()
        partCtx.arc(p.x, p.y, p.size * 0.5, 0, Math.PI * 2)
        partCtx.fillStyle = `rgba(180, 210, 255, ${p.alpha * 0.5})`
        partCtx.fill()
        partCtx.shadowBlur = 0
      }

      animId = requestAnimationFrame(animate)
    }

    animId = requestAnimationFrame(animate)

    return () => {
      cancelAnimationFrame(animId)
      document.removeEventListener("visibilitychange", onVisibilityChange)
      window.removeEventListener("resize", resize)
      if (!isCoarsePointer) window.removeEventListener("mousemove", onMouse)
    }
  }, [])

  return (
    <div className="background-canvases" aria-hidden="true">
      <canvas ref={gridRef} className="bg-canvas" />
      <canvas ref={starsRef} className="bg-canvas" />
      <canvas ref={particlesRef} className="bg-canvas" />
    </div>
  )
}
