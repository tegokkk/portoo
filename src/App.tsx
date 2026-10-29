import { useCallback, useEffect, useMemo, useState } from "react"
import { ArrowUp } from "lucide-react"
import { FlickeringGrid } from "@/components/background/FlickeringGrid"
import { Header } from "@/components/layout/header"
import { CertificateModal, CvModal, ProjectModal } from "@/components/modals/portfolio-modals"
import { ScrollProgress } from "@/components/scroll-progress"
import { AboutSection } from "@/components/sections/about-section"
import { CertificateSection } from "@/components/sections/certificate-section"
import { ContactSection } from "@/components/sections/contact-section"
import { HeroSection } from "@/components/sections/hero-section"
import { GlyphSection } from "@/components/sections/glyph-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { TechSection } from "@/components/sections/tech-section"
import { profile } from "@/data/portfolio"
import type { Certificate, Project } from "@/data/types"
import { useLenis } from "@/hooks/use-lenis"
import { scrollTop, setLenis } from "@/lib/scroll"

function App() {
  const year = useMemo(() => new Date().getFullYear(), [])
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [activeCertificate, setActiveCertificate] = useState<Certificate | null>(null)
  const [showCv, setShowCv] = useState(false)
  const [showTop, setShowTop] = useState(false)
  const closeProject = useCallback(() => setActiveProject(null), [])
  const closeCertificate = useCallback(() => setActiveCertificate(null), [])
  const closeCv = useCallback(() => setShowCv(false), [])
  const hasModal = Boolean(activeProject || activeCertificate || showCv)

  const { lenisRef } = useLenis()

  useEffect(() => {
    setLenis(lenisRef.current)
  }, [lenisRef])

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > window.innerHeight * 0.7)
    }
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    const lenis = lenisRef.current
    document.body.classList.toggle("modal-open", hasModal)
    if (hasModal) {
      lenis?.stop()
    } else {
      lenis?.start()
    }

    return () => {
      document.body.classList.remove("modal-open")
      lenis?.start()
    }
  }, [hasModal, lenisRef])

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to main content
      </a>
      <FlickeringGrid />
      <ScrollProgress />
      <Header />
      <main id="main-content">
        <GlyphSection>
          <HeroSection onOpenProject={setActiveProject} />
        </GlyphSection>
        <AboutSection onOpenCv={() => setShowCv(true)} />
        <ProjectsSection onOpenProject={setActiveProject} />
        <CertificateSection onOpenCertificate={setActiveCertificate} />
        <TechSection />
        <ContactSection />
      </main>
      {showTop ? (
        <button className="scroll-top" type="button" onClick={scrollTop} aria-label="Scroll to top">
          <ArrowUp size={18} />
        </button>
      ) : null}
      <footer className="site-footer">
        <span>{profile.name}</span>
        <span>{year}</span>
        <span>Portfolio and selected work</span>
      </footer>
      {activeProject ? (
        <ProjectModal project={activeProject} onClose={closeProject} />
      ) : null}
      {activeCertificate ? <CertificateModal certificate={activeCertificate} onClose={closeCertificate} /> : null}
      {showCv ? <CvModal onClose={closeCv} /> : null}
    </>
  )
}

export default App
