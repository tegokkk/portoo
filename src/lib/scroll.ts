import type Lenis from "lenis"

const lenis = { current: null as Lenis | null }

function setLenis(instance: Lenis | null) {
  lenis.current = instance
}

function scrollTo(id: string, offset = id === "home" ? 0 : -96) {
  const element = document.getElementById(id)
  if (!element) return
  const top = element.getBoundingClientRect().top + window.scrollY + offset
  if (lenis.current) {
    // Numeric targets avoid applying CSS scroll padding/margin a second time.
    lenis.current.scrollTo(top)
  } else {
    window.scrollTo({ top, behavior: "auto" })
  }
}

function scrollPage(direction: number) {
  if (lenis.current) {
    lenis.current.scrollTo(window.scrollY + window.innerHeight * direction)
  } else {
    window.scrollTo({ top: window.scrollY + window.innerHeight * direction, behavior: "auto" })
  }
}

function scrollTop() {
  if (lenis.current) {
    lenis.current.scrollTo(0)
  } else {
    window.scrollTo({ top: 0, behavior: "auto" })
  }
}

function lockScroll(locked: boolean) {
  if (locked) lenis.current?.stop()
  else lenis.current?.start()
}

export { scrollPage, scrollTo, scrollTop, setLenis, lockScroll }
