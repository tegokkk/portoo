import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "motion/react"
import { Menu, X } from "lucide-react"
import { navItems, profile } from "@/data/portfolio"
import { scrollTo, lockScroll } from "@/lib/scroll"

export function Header() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState("")
  const shouldReduce = useReducedMotion()
  const navRef = useRef<HTMLElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const update = () => {
      const sections = navItems.map((item) => document.getElementById(item.id)).filter((el): el is HTMLElement => Boolean(el)).sort((a, b) => a.getBoundingClientRect().top - b.getBoundingClientRect().top)
      setActive(sections.filter((el) => el.getBoundingClientRect().top <= window.innerHeight * 0.35).slice(-1)[0]?.id ?? "")
    }
    const resize = () => { if (window.innerWidth > 980) setOpen(false); update() }
    window.addEventListener("scroll", update, { passive: true })
    window.addEventListener("resize", resize)
    update()
    return () => { window.removeEventListener("scroll", update); window.removeEventListener("resize", resize) }
  }, [])

  const go = (id: string) => {
    lockScroll(false)
    scrollTo(id)
    setOpen(false)
  }

  useEffect(() => {
    if (!open) return
    lockScroll(true)
    document.body.classList.add("menu-open")

    const background = Array.from(
      document.querySelectorAll<HTMLElement>("#main-content, .site-footer, .scroll-buttons, .scroll-top"),
    ).map((element) => ({ element, wasInert: element.inert }))
    background.forEach(({ element }) => { element.inert = true })

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false)
        buttonRef.current?.focus()
        return
      }

      if (event.key !== "Tab") return
      const focusables = navRef.current?.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      )
      if (!focusables?.length) return

      const first = focusables[0]
      const last = focusables[focusables.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }

    window.addEventListener("keydown", onKeyDown)
    navRef.current?.querySelector<HTMLElement>("button")?.focus()
    return () => {
      lockScroll(false)
      document.body.classList.remove("menu-open")
      window.removeEventListener("keydown", onKeyDown)
      background.forEach(({ element, wasInert }) => { element.inert = wasInert })
    }
  }, [open])

  return (
    <motion.header
      className="site-header"
      initial={shouldReduce ? false : { y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: shouldReduce ? 0 : 0.35, ease: "easeOut" }}
    >
      <a className="brand-button" href="#home" onClick={(event) => { event.preventDefault(); go("home") }}>
        <strong>TEGO.DEV</strong>
      </a>

      {/* Desktop nav */}
      <nav className="nav-panel nav-desktop" aria-label="Main navigation">
        {navItems.map((item) => (
          <button className="nav-link" aria-current={active === item.id ? "location" : undefined} key={item.id} type="button" onClick={() => go(item.id)}>
            {item.label}
          </button>
        ))}
      </nav>

      <div className="header-right">
        <a className="header-cv" href={profile.cv} download>
          Download CV <span aria-hidden="true">→</span>
        </a>
        <button
          ref={buttonRef}
          className="menu-button"
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-controls="mobile-nav-panel"
          aria-expanded={open}
          aria-label={open ? "Toggle menu — close" : "Toggle menu — open"}
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {/* Mobile nav overlay */}
      <AnimatePresence>
        {open && (
          <>
            <motion.button
              className="nav-mobile-scrim"
              type="button"
              aria-label="Close navigation"
              onClick={() => { setOpen(false); buttonRef.current?.focus() }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <motion.nav
              ref={navRef}
              id="mobile-nav-panel"
              className="nav-mobile-overlay"
              data-lenis-prevent
              aria-label="Main navigation"
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: "100%" }}
              transition={shouldReduce ? { duration: 0 } : { type: "spring", damping: 25, stiffness: 300 }}
            >
              <button className="nav-link nav-mobile-link" type="button" onClick={() => { setOpen(false); buttonRef.current?.focus() }}>Close menu <X size={18} /></button>
              {navItems.map((item) => (
                <button
                  className="nav-link nav-mobile-link"
                  key={item.id}
                  type="button"
                  aria-current={active === item.id ? "location" : undefined}
                  onClick={() => { go(item.id); buttonRef.current?.focus() }}
                >
                  {item.label}
                </button>
              ))}
            </motion.nav>
          </>
        )}
      </AnimatePresence>
    </motion.header>
  )
}
