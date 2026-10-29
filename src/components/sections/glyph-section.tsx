import { useEffect, useState } from "react"
import type { ReactNode } from "react"
import GlyphPortal from "@/components/ui/glyph-portal"

export function GlyphSection({ children }: { children: ReactNode }) {
  const [font, setFont] = useState('"Arial Black"')

  useEffect(() => {
    let mounted = true
    let settled = false
    const finish = (family: string) => {
      if (mounted && !settled) { settled = true; setFont(family) }
    }
    const timeout = window.setTimeout(() => finish('"Arial Black"'), 1800)
    void document.fonts.load('900 100px "Chivo"', "WORK").then(
      (faces) => { if (faces.length) { clearTimeout(timeout); finish('"Chivo"') } },
      () => { clearTimeout(timeout); finish('"Arial Black"') },
    )
    return () => { mounted = false; clearTimeout(timeout) }
  }, [])

  return (
    <GlyphPortal
      className="portfolio-glyph"
      word="WORK"
      fontFamily={font}
      fontWeight={900}
      scrollLength={1.15}
      enterLabel="Enter portfolio"
      style={{ "--gp-paper": "#f9f7f2", "--gp-ink": "#222222", "--gp-field": "#003e7f", "--gp-foreground": "#f9f7f2" }}
      background={<div className="glyph-field" />}
      front={<div className="glyph-front"><span>Tego Saputra<br />Full-Stack Web Developer</span><span>Selected projects<br />2025—2026</span></div>}
    >
      {children}
    </GlyphPortal>
  )
}
