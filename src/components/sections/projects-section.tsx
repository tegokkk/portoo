import { useState } from "react"
import { Code2, ExternalLink, FileText } from "lucide-react"
import { SectionReveal } from "@/components/section-reveal"
import CardDeckCarousel from "@/components/ui/card-deck-carousel"
import { projects } from "@/data/portfolio"
import type { Project } from "@/data/types"

interface ProjectsSectionProps {
  onOpenProject: (project: Project) => void
}

const slides = projects.map((project) => ({
  image: project.screenshot,
  title: project.name,
  caption: project.subtitle,
  alt: `Preview ${project.name}`,
}))

export function ProjectsSection({ onOpenProject }: ProjectsSectionProps) {
  const [selected, setSelected] = useState(0)
  const project = projects[selected] ?? projects[0]

  return (
    <section id="portfolio" className="section-shell portfolio-section">
      <SectionReveal className="paper-sheet portfolio-paper">
        <div className="projects-topline"><span>Selected works</span><span>2025–2026 edition</span></div>
        <div className="projects-heading">
          <span>Digital architecture</span><h2>Selected Work</h2><span>{String(projects.length).padStart(2, "0")} projects</span>
        </div>
        <div className="project-picker" role="group" aria-label="Choose a project">
          {projects.map((item, index) => <button key={item.slug} type="button" aria-pressed={selected === index} onClick={() => setSelected(index)}><span>{String(index + 1).padStart(2, "0")}</span>{item.name}</button>)}
        </div>
        <div className="project-deck-layout">
          <div className="project-deck-copy">
            <span className="project-index">Project // {String(selected + 1).padStart(2, "0")}</span>
            <h3>{project.name}</h3>
            <strong>{project.subtitle}</strong>
            <p lang="id">{project.description}</p>
            <div className="project-deck-tags">{project.tech.slice(0, 4).map((tech) => <span key={tech}>{tech}</span>)}</div>
            <div className="project-links">
              <button className="primary-button" type="button" onClick={() => onOpenProject(project)}><FileText size={16} /> Case Study</button>
              <a className="secondary-button" href={project.live} target="_blank" rel="noopener noreferrer"><ExternalLink size={16} /> Live</a>
              <a className="secondary-button" href={project.repo} target="_blank" rel="noopener noreferrer"><Code2 size={16} /> Repo</a>
            </div>
          </div>
          <div className="project-deck-preview"><CardDeckCarousel className="project-deck" slides={slides} activeIndex={selected} onChange={setSelected} height="460px" cardWidth="min(100%, 600px)" aspect="16 / 10" scatter={5} autoplay={0} background="var(--paper-soft)" ink="var(--ink)" ariaLabel="Selected projects. Use arrow keys or drag to change project." /><p className="deck-hint">Drag a card or use the arrows to explore.</p></div>
        </div>
        <div className="projects-footer-note"><span>TEGO SAPUTRA</span><span>4 projects / Web development</span></div>
      </SectionReveal>
    </section>
  )
}
