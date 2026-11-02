"use client"

import * as React from "react"

export interface LanyardBadgeProps {
  /** Card front. Replaces the built-in front entirely. */
  front?: React.ReactNode
  /** Card back. Replaces the built-in back entirely. */
  back?: React.ReactNode
  /** Built-in front: the event title. */
  title?: string
  /** Built-in front: the line under the title. */
  subtitle?: string
  /** Built-in back: the wearer's name. */
  name?: string
  /** Built-in back: the wearer's role. */
  role?: string
  /** Script line printed along the strap. */
  strapText?: string
  /** Condensed label printed along the strap. */
  strapLabel?: string
  /** Strap colour, #rrggbb. */
  strapColor?: string
  /** Ornament and print colour. */
  inkColor?: string
  /** Built-in card stock colour. */
  cardColor?: string
  /** Show the "Show back / Show front" button in the top corner. */
  flipButton?: boolean
  /** Card width in px. */
  cardWidth?: number
  /** Root height. A definite length — never a percentage. */
  height?: string
  /** Extra root class names. */
  className?: string
}

// #region physics
export type Pt = { x: number; y: number; px: number; py: number; w: number }
export type Link = [number, number, number]
export type Spin = { a: number; v: number }

export function integrate(pts: Pt[], dt: number, gravity: number, damping: number) {
  for (const p of pts) {
    if (!p.w) continue
    const vx = (p.x - p.px) * damping
    const vy = (p.y - p.py) * damping
    p.px = p.x
    p.py = p.y
    p.x += vx
    p.y += vy + gravity * dt * dt
  }
}

export function solve(pts: Pt[], links: Link[], iterations: number) {
  for (let k = 0; k < iterations; k++) {
    for (const [i, j, rest] of links) {
      const a = pts[i]
      const b = pts[j]
      const ws = a.w + b.w
      if (!ws) continue
      const dx = b.x - a.x
      const dy = b.y - a.y
      const d = Math.hypot(dx, dy) || 1e-6
      const f = (d - rest) / (d * ws)
      a.x += dx * f * a.w
      a.y += dy * f * a.w
      b.x -= dx * f * b.w
      b.y -= dy * f * b.w
    }
  }
}

export function spinStep(s: Spin, target: number, dt: number, drive: number) {
  s.v += (-(s.a - target) * 18 - s.v * 3.2 + drive) * dt
  s.a += s.v * dt
}

export function swingAngle(top: Pt, bottom: Pt) {
  return Math.atan2(bottom.x - top.x, bottom.y - top.y)
}
// #endregion

const DISPLAY = '"Oswald", "Bebas Neue", "Arial Narrow", Impact, sans-serif'

const METAL = "linear-gradient(to right, #4f545e 0%, #e3e6ec 38%, #7a808c 70%, #3d414a 100%)"
const PLASTIC = "linear-gradient(180deg, #b8bec8 0%, #7d8492 100%)"

/** Cool, blue-black tint so shadows sit naturally on the blue folder instead of turning grey. */
const SHADOW_RGB = "4, 14, 36"

function usePrefersReducedMotion() {
  const [reduced, setReduced] = React.useState(false)
  React.useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    setReduced(mq.matches)
    const h = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener("change", h)
    return () => mq.removeEventListener("change", h)
  }, [])
  return reduced
}

export default function LanyardBadge({
  front,
  back,
  title = "The Future Is Handmade",
  subtitle = "Design Week · Vol. 2 · 2026",
  name = "Alex Morgan",
  role = "Documentation",
  strapColor = "#0055aa",
  inkColor = "#b3e8ef",
  cardColor = "#f9f7f2",
  flipButton = true,
  cardWidth = 200,
  height = "460px",
  className = "",
}: LanyardBadgeProps) {
  const rootRef = React.useRef<HTMLElement | null>(null)
  const cardRef = React.useRef<HTMLDivElement | null>(null)
  const innerRef = React.useRef<HTMLDivElement | null>(null)
  const swingRef = React.useRef<HTMLSpanElement | null>(null)
  const ringRef = React.useRef<HTMLSpanElement | null>(null)
  const cordRef = React.useRef<HTMLSpanElement | null>(null)
  const penumbraRef = React.useRef<HTMLSpanElement | null>(null)
  const umbraRef = React.useRef<HTMLSpanElement | null>(null)
  const reduced = usePrefersReducedMotion()
  const flipRef = React.useRef<() => void>(() => {})

  const [showBack, setShowBack] = React.useState(false)
  const backRef = React.useRef(showBack)
  React.useLayoutEffect(() => {
    backRef.current = showBack
  }, [showBack])

  const cw = cardWidth
  const ch = Math.round(cardWidth * 1.58)

  // Proportions matched to team-lanyard-rail strap geometry
  const u = cw / 170
  const ring = Math.round(8.5 * u)
  const railY = 8 + ring
  const pivotY = Math.round(railY + ring * 0.72)
  const strapW = Math.max(13, Math.round(14 * u))
  const strapLen = Math.round(48 * u)
  const crimpH = Math.round(6.5 * u)
  const reelSize = Math.round(25 * u)
  const cordRest = Math.round(14 * u)
  const clipH = Math.round(14.5 * u)
  const clipW = Math.round(33 * u)
  const cardOffset = Math.round(clipH * 0.62)

  const reelTop = Math.round(strapLen + crimpH * 0.55)
  const cordStart = Math.round(reelTop + reelSize * 0.82)
  const restDist = cordStart + cordRest

  React.useEffect(() => {
    const root = rootRef.current
    const card = cardRef.current
    const inner = innerRef.current
    const swingEl = swingRef.current
    const ringEl = ringRef.current
    const cordEl = cordRef.current
    const penumbraEl = penumbraRef.current
    const umbraEl = umbraRef.current
    if (!root || !card || !inner) return

    let W = Math.max(1, root.clientWidth)
    let H = Math.max(1, root.clientHeight)

    let pts: Pt[] = []
    let links: Link[] = []
    let iPivot = 0
    let iTop = 0
    let iCard = 0

    const spin: Spin = { a: 0, v: 0 }
    let spinTarget = backRef.current ? Math.PI : 0
    spin.a = spinTarget

    /** 0 = hanging at rest, 1 = lifted off the surface while being pulled. Drives the shadow. */
    let lift = 0

    const STEP = 1 / 120
    const GRAVITY = 2500
    const ITER = 16
    // The retractable cord behaves like a stiff spring: free to be pulled anywhere, it reels the card back in on release.
    const ROPE_K = 2200
    const ROPE_C = 16
    const MAX_TILT = 0.9

    const add = (x: number, y: number, w: number) => {
      pts.push({ x, y, px: x, py: y, w })
      return pts.length - 1
    }

    const rope = () => {
      const P = pts[iPivot]
      const T = pts[iTop]
      if (!T.w) return
      const dx = T.x - P.x
      const dy = T.y - P.y
      const d = Math.hypot(dx, dy) || 1e-6
      const ext = d - restDist
      if (ext <= 0) return
      const ux = dx / d
      const uy = dy / d
      const radialVelocity = (T.x - T.px) * ux + (T.y - T.py) * uy
      const pull = ROPE_K * ext * STEP * STEP + ROPE_C * radialVelocity * STEP
      T.x -= ux * pull
      T.y -= uy * pull
    }

    const build = () => {
      W = Math.max(1, root.clientWidth)
      H = Math.max(1, root.clientHeight)
      pts = []
      links = []

      const cx = W / 2
      iPivot = add(cx, pivotY, 0)
      iTop = add(cx, pivotY + restDist, 0.8)
      iCard = add(cx, pivotY + restDist + cardOffset + ch * 0.5, 0.35)

      links.push([iTop, iCard, cardOffset + ch * 0.5])

      if (ringEl) ringEl.style.left = `${(cx - 4.5 * u).toFixed(2)}px`
      if (swingEl) {
        swingEl.style.left = `${cx.toFixed(2)}px`
        swingEl.style.top = `${pivotY}px`
      }

      if (reduced) {
        for (let i = 0; i < 600; i++) {
          integrate(pts, STEP, GRAVITY, 0.98)
          rope()
          solve(pts, links, ITER)
        }
      } else {
        pts[iCard].x += Math.min(cw * 0.14, W * 0.05)
        pts[iCard].px = pts[iCard].x - 1.5
        spin.v = 0.35
      }
    }

    const updateVisuals = () => {
      const P = pts[iPivot]
      const T = pts[iTop]
      const C = pts[iCard]

      // strap + cord: from the fixed pivot to the card clip, no matter how far it is pulled
      const dx = T.x - P.x
      const dy = T.y - P.y
      const dist = Math.hypot(dx, dy)
      const strapAngle = -Math.atan2(dx, Math.max(8, dy))
      if (swingEl) swingEl.style.transform = `rotate(${((strapAngle * 180) / Math.PI).toFixed(3)}deg)`
      if (cordEl) cordEl.style.height = `${Math.max(2, dist + 2 - cordStart).toFixed(2)}px`

      // card: hinged on its clip, hangs along the clip → centre-of-mass axis
      const tilt = Math.max(-MAX_TILT, Math.min(MAX_TILT, swingAngle(T, C)))
      const rot = -tilt
      card.style.transform = `translate3d(${(T.x - cw / 2).toFixed(2)}px, ${T.y.toFixed(2)}px, 0) rotate(${rot.toFixed(4)}rad)`

      inner.style.transform = `perspective(1100px) rotateY(${spin.a.toFixed(4)}rad)`
      const dim = 1 - Math.abs(Math.cos(spin.a))
      inner.style.setProperty("--lyd-dim", (dim * 0.48).toFixed(3))
      inner.style.setProperty("--lyd-shine", (50 + Math.sin(spin.a) * 70 + rot * 80).toFixed(1) + "%")

      // shadow: light stays fixed top-left, so the offset is rotated back out of the card's own frame.
      // Lifting the card (dragging) pushes the shadow further away and softens it, like a real object leaving the wall.
      const facing = Math.max(0.1, Math.abs(Math.cos(spin.a)))
      const cos = Math.cos(rot)
      const sin = Math.sin(rot)
      const place = (el: HTMLSpanElement | null, ox: number, oy: number, grow: number, opacity: number) => {
        if (!el) return
        const lx = ox * cos + oy * sin
        const ly = -ox * sin + oy * cos
        el.style.transform = `translate3d(${lx.toFixed(2)}px, ${ly.toFixed(2)}px, 0) scale(${(facing * grow).toFixed(3)}, ${grow.toFixed(3)})`
        el.style.opacity = opacity.toFixed(3)
      }
      place(penumbraEl, 7 + 15 * lift, 13 + 26 * lift, 1 + 0.06 * lift, 0.5 - 0.15 * lift)
      place(umbraEl, 2.5 + 4 * lift, 4.5 + 7 * lift, 1, 0.34 - 0.16 * lift)
    }

    // ---- interaction -----------------------------------------------------
    type Drag = { id: number; ox: number; oy: number; tx: number; ty: number; sx: number; sy: number; moved: boolean }
    let drag: Drag | null = null

    const local = (e: PointerEvent) => {
      const r = root.getBoundingClientRect()
      return [e.clientX - r.left, e.clientY - r.top]
    }

    const flip = () => {
      spinTarget = spinTarget === 0 ? Math.PI : 0
      setShowBack(spinTarget !== 0)
      if (reduced) {
        spin.a = spinTarget
        spin.v = 0
        updateVisuals()
      }
    }
    flipRef.current = flip

    const onDown = (e: PointerEvent) => {
      if (e.button > 0) return
      e.preventDefault()
      const [x, y] = local(e)
      const T = pts[iTop]
      drag = { id: e.pointerId, ox: T.x - x, oy: T.y - y, tx: T.x, ty: T.y, sx: x, sy: y, moved: false }
      pts[iTop].w = 0
      card.setPointerCapture(e.pointerId)
      card.style.cursor = "grabbing"
    }

    const onMove = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      const [x, y] = local(e)
      drag.tx = x + drag.ox
      drag.ty = y + drag.oy
      if (Math.hypot(x - drag.sx, y - drag.sy) > 5) drag.moved = true
      if (reduced) {
        const T = pts[iTop]
        T.x = drag.tx
        T.y = drag.ty
        T.px = T.x
        T.py = T.y
        solve(pts, links, ITER)
        lift = drag.moved ? 1 : 0
        updateVisuals()
      }
    }

    const onUp = (e: PointerEvent) => {
      if (!drag || e.pointerId !== drag.id) return
      if (e.type !== "pointercancel" && !drag.moved) flip()
      drag = null
      pts[iTop].w = 0.8
      card.style.cursor = "grab"
      if (reduced) {
        lift = 0
        updateVisuals()
      }
    }

    card.addEventListener("pointerdown", onDown)
    card.addEventListener("pointermove", onMove)
    card.addEventListener("pointerup", onUp)
    card.addEventListener("pointercancel", onUp)

    // ---- loop --------------------------------------------------------------
    let raf = 0
    let acc = 0
    let last = performance.now()
    let t = 0

    const tick = (now: number) => {
      acc += Math.min(0.05, (now - last) / 1000)
      last = now
      let steps = 0
      while (acc >= STEP && steps < 8) {
        acc -= STEP
        steps++
        t += STEP
        if (drag) {
          const T = pts[iTop]
          T.px = T.x
          T.py = T.y
          T.x += (drag.tx - T.x) * 0.35
          T.y += (drag.ty - T.y) * 0.35
        }
        const C = pts[iCard]
        if (!reduced && !drag) {
          C.x += (18 * Math.sin(t * 0.75) + 10 * Math.sin(t * 1.9)) * STEP * STEP
        }
        integrate(pts, STEP, GRAVITY, 0.992)
        rope()
        solve(pts, links, ITER)
        const vx = (C.x - C.px) / STEP
        spinStep(spin, spinTarget, STEP, vx * 0.03 + (reduced ? 0 : 0.5 * Math.sin(t * 0.5)))
        const liftTarget = drag && drag.moved ? 1 : 0
        lift += (liftTarget - lift) * 0.05
      }
      updateVisuals()
      raf = requestAnimationFrame(tick)
    }

    build()
    updateVisuals()

    const visibility = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !reduced && !raf) {
        last = performance.now()
        raf = requestAnimationFrame(tick)
      } else if (!entry.isIntersecting && raf) {
        cancelAnimationFrame(raf)
        raf = 0
      }
    })
    visibility.observe(root)

    const observer = new ResizeObserver(() => {
      if (Math.abs(root.clientWidth - W) < 1 && Math.abs(root.clientHeight - H) < 1) return
      build()
      updateVisuals()
    })
    observer.observe(root)

    return () => {
      cancelAnimationFrame(raf)
      visibility.disconnect()
      observer.disconnect()
      card.removeEventListener("pointerdown", onDown)
      card.removeEventListener("pointermove", onMove)
      card.removeEventListener("pointerup", onUp)
      card.removeEventListener("pointercancel", onUp)
    }
  }, [reduced, cw, ch, u, pivotY, restDist, cardOffset, cordStart])

  const face: React.CSSProperties = {
    position: "absolute",
    inset: 0,
    borderRadius: 10,
    overflow: "hidden",
    backfaceVisibility: "hidden",
    WebkitBackfaceVisibility: "hidden",
    // only a hairline edge: the real cast shadow lives in its own layer so it doesn't spin with the card
    boxShadow: `0 0 0 1px rgba(${SHADOW_RGB}, 0.12), 0 1px 2px rgba(${SHADOW_RGB}, 0.2)`,
  }

  const shade = (
    <div
      aria-hidden="true"
      style={{
        position: "absolute",
        inset: 0,
        pointerEvents: "none",
        background:
          "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.28) 50%, transparent 65%) var(--lyd-shine, 50%) 0 / 250% 100% no-repeat, rgba(0,0,0,var(--lyd-dim, 0))",
      }}
    />
  )

  return (
    <section ref={rootRef} className={"lanyard-badge " + className} style={{ height }}>
      {/* Top Anchor Ring */}
      <span
        ref={ringRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          left: `calc(50% - ${4.5 * u}px)`,
          top: railY - ring,
          width: 9 * u,
          height: ring * 2,
          borderRadius: 999,
          border: `${Math.max(1.8, 2.2 * u).toFixed(2)}px solid #c2c7d0`,
          boxShadow: "inset 1px 0 0 rgba(0,0,0,0.28)",
          boxSizing: "border-box",
          filter: `drop-shadow(1px 2px 1.5px rgba(${SHADOW_RGB}, 0.4))`,
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Swinging Lanyard Strap, Crimp, Reel & Cord (origin at the pivot) */}
      <span
        ref={swingRef}
        data-swing
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "50%",
          top: pivotY,
          width: 0,
          height: 0,
          transformOrigin: "0px 0px",
          // one soft contact shadow + one long ambient shadow, cast by the whole assembly
          filter: `drop-shadow(1px 2px 1px rgba(${SHADOW_RGB}, 0.32)) drop-shadow(5px 9px 6px rgba(${SHADOW_RGB}, 0.22))`,
          pointerEvents: "none",
          zIndex: 2,
        }}
      >
        {/* Woven Ribbon Strap */}
        <span
          style={{
            position: "absolute",
            left: -strapW / 2,
            top: -2,
            width: strapW,
            height: strapLen + 2,
            background: [
              "repeating-linear-gradient(135deg, rgba(255,255,255,0.16) 0 1px, transparent 1px 3px)",
              "repeating-linear-gradient(45deg, rgba(0,0,0,0.15) 0 1px, transparent 1px 3px)",
              `linear-gradient(90deg, color-mix(in oklab, ${strapColor} 65%, black) 0%, ${strapColor} 16%, color-mix(in oklab, ${strapColor} 82%, white) 48%, ${strapColor} 80%, color-mix(in oklab, ${strapColor} 62%, black) 100%)`,
            ].join(","),
          }}
        >
          <span
            style={{
              position: "absolute",
              top: 0,
              bottom: 0,
              left: 1.5,
              right: 1.5,
              borderLeft: "1px dashed rgba(255,255,255,0.38)",
              borderRight: "1px dashed rgba(255,255,255,0.38)",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: 7 * u,
              background: "rgba(0,0,0,0.26)",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 2,
              right: 2,
              top: 9 * u,
              borderTop: "1px dashed rgba(255,255,255,0.48)",
            }}
          />
        </span>

        {/* Top Loop Clasp */}
        <svg
          aria-hidden="true"
          style={{
            position: "absolute",
            left: -(strapW * 1.5) / 2,
            top: -4 * u,
            width: strapW * 1.5,
            height: 8 * u,
            overflow: "visible",
          }}
          viewBox="0 0 30 16"
          preserveAspectRatio="none"
        >
          <rect x="2" y="3" width="26" height="10" rx="5" fill="none" stroke="#c5cad3" strokeWidth="3" />
          <path d="M7 4.5 H23" stroke="white" strokeOpacity="0.65" strokeWidth="1" />
        </svg>

        {/* Metal Crimp */}
        <span
          style={{
            position: "absolute",
            left: -(strapW + 3) / 2,
            top: strapLen - crimpH * 0.4,
            width: strapW + 3,
            height: crimpH,
            borderRadius: 2,
            background: METAL,
          }}
        />

        {/* Retractable Badge Reel (Yoyo) */}
        <span
          style={{
            position: "absolute",
            left: -reelSize / 2,
            top: reelTop,
            width: reelSize,
            height: reelSize,
            borderRadius: "50%",
            background: "radial-gradient(circle at 34% 30%, #585e6c 0%, #23262e 58%, #121418 100%)",
            boxShadow: "inset 0 -1px 2px rgba(0,0,0,0.45)",
          }}
        >
          <span
            style={{
              position: "absolute",
              inset: "14%",
              borderRadius: "50%",
              border: "1px solid rgba(255,255,255,0.22)",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "34%",
              top: "34%",
              width: "32%",
              height: "32%",
              borderRadius: "50%",
              background: METAL,
            }}
          />
        </span>

        {/* Retractable Cord — stretches as far as the card is pulled */}
        <span
          ref={cordRef}
          style={{
            position: "absolute",
            left: -0.75,
            top: cordStart,
            width: 1.5,
            height: cordRest,
            background: "rgba(235, 238, 245, 0.88)",
            transformOrigin: "50% 0",
          }}
        />
      </span>

      {/* Draggable & Flippable 3D ID Card + Plastic Badge Clip */}
      <div
        ref={cardRef}
        role="button"
        tabIndex={0}
        aria-label={
          showBack
            ? "Tego Saputra ID card, portfolio details on back. Press to show front."
            : "Tego Saputra, Wakil Ketua Divisi Minat dan Bakat. Drag or press to flip ID card."
        }
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault()
            flipRef.current()
          }
        }}
        onDragStart={(e) => e.preventDefault()}
        aria-pressed={showBack}
        className="lanyard-card"
        style={{
          width: cw,
          height: ch + cardOffset,
          transformOrigin: "50% 0",
          cursor: "grab",
          touchAction: "none",
          willChange: "transform",
          zIndex: 4,
        }}
      >
        {/* Cast shadow: wide soft penumbra + tight umbra, kept in world orientation */}
        <span
          ref={penumbraRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: cardOffset,
            width: cw,
            height: ch,
            borderRadius: 14,
            background: `rgb(${SHADOW_RGB})`,
            filter: "blur(13px)",
            opacity: 0.5,
            pointerEvents: "none",
          }}
        />
        <span
          ref={umbraRef}
          aria-hidden="true"
          style={{
            position: "absolute",
            left: 0,
            top: cardOffset,
            width: cw,
            height: ch,
            borderRadius: 11,
            background: `rgb(${SHADOW_RGB})`,
            filter: "blur(3.5px)",
            opacity: 0.34,
            pointerEvents: "none",
          }}
        />

        {/* 3D Card Body */}
        <div
          ref={innerRef}
          style={{
            position: "absolute",
            left: 0,
            right: 0,
            top: cardOffset,
            height: ch,
            transformStyle: "preserve-3d",
          }}
        >
          <div style={face}>
            {front ?? (
              <div style={{ position: "relative", width: "100%", height: "100%", background: cardColor, color: inkColor }}>
                <div style={{ padding: 20 }}>
                  <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 22 }}>{title}</div>
                  <div style={{ fontSize: 10, marginTop: 4 }}>{subtitle}</div>
                </div>
              </div>
            )}
            {shade}
          </div>
          <div style={{ ...face, transform: "rotateY(180deg)" }}>
            {back ?? (
              <div style={{ position: "relative", width: "100%", height: "100%", background: cardColor, color: strapColor }}>
                <div style={{ padding: 20 }}>
                  <div style={{ fontFamily: DISPLAY, fontWeight: 700, fontSize: 18 }}>{name}</div>
                  <div style={{ fontSize: 11, marginTop: 4 }}>{role}</div>
                </div>
              </div>
            )}
            {shade}
          </div>
        </div>

        {/* Plastic Badge Clip */}
        <span
          aria-hidden="true"
          style={{
            position: "absolute",
            left: (cw - clipW) / 2,
            top: 0,
            width: clipW,
            height: clipH + 10 * u,
            filter: `drop-shadow(1px 2px 1.5px rgba(${SHADOW_RGB}, 0.4))`,
            pointerEvents: "none",
            zIndex: 4,
          }}
        >
          <span
            style={{
              position: "absolute",
              left: (clipW - clipW * 0.42) / 2,
              top: clipH * 0.7,
              width: clipW * 0.42,
              height: cardOffset - clipH * 0.7 + 12 * u,
              borderRadius: "0 0 2px 2px",
              background: PLASTIC,
            }}
          />
          <span
            style={{
              position: "absolute",
              left: 0,
              right: 0,
              top: 0,
              height: clipH,
              clipPath: "polygon(24% 0, 76% 0, 100% 72%, 94% 100%, 6% 100%, 0 72%)",
              background: PLASTIC,
            }}
          />
          <span
            style={{
              position: "absolute",
              left: "30%",
              right: "30%",
              top: 1,
              height: 1,
              background: "rgba(255,255,255,0.55)",
            }}
          />
          <span
            style={{
              position: "absolute",
              left: (clipW - clipH * 0.34) / 2,
              top: clipH * 0.14,
              width: clipH * 0.34,
              height: clipH * 0.34,
              borderRadius: "50%",
              background: "#f9f7f2",
              boxShadow: "inset 0 1px 1px rgba(0,0,0,0.45)",
            }}
          />
        </span>
      </div>

      {flipButton && (
        <button type="button" onClick={() => flipRef.current()} aria-pressed={showBack} className="lanyard-flip">
          <svg
            viewBox="0 0 24 24"
            width={16}
            height={16}
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            style={{ transform: showBack ? "scaleX(-1)" : "none", transition: "transform 0.4s ease" }}
          >
            <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
            <path d="M21 3v5h-5" />
            <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
            <path d="M3 21v-5h5" />
          </svg>
          {showBack ? "Show front" : "Show back"}
        </button>
      )}
    </section>
  )
}
