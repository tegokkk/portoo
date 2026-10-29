// Type definitions for portfolio data

import type { LucideIcon } from "lucide-react"

export interface Profile {
  name: string
  role: string
  email: string
  status: string
  tagline: string
  photo: string
  cv: string
  formspreeEndpoint: string
}

export interface Social {
  label: string
  href: string
  icon: LucideIcon
}

export interface TimelineEntry {
  type: "education" | "experience"
  institution: string
  program: string
  period: string
  description: string
}

export interface ProjectMetric {
  label: string
  value: string
}

export interface CaseStudyItem {
  label: string
  value: string
}

export interface ProjectVisual {
  eyebrow: string
  lines: string[]
}

export interface ScreenshotSize {
  width: number
  height: number
}

export interface Project {
  slug: string
  name: string
  subtitle: string
  summary: string
  note: string
  screenshot: string
  screenshotSize: ScreenshotSize
  visual: ProjectVisual
  description: string
  features: string[]
  caseStudy: CaseStudyItem[]
  tech: string[]
  metrics?: ProjectMetric[]
  challenges?: string[]
  learnings?: string[]
  live: string
  repo: string
}

export interface Certificate {
  slug: string
  name: string
  issuer: string
  recipient: string
  issuedAt: string
  credentialId?: string
  verifyUrl?: string
  file: string
  preview: string
  previewSize: ScreenshotSize
}

export interface TechStackGroup {
  category: string
  icon: LucideIcon
  values: string[]
}

export type TabEntry = [string, string]

export interface NavItem {
  id: string
  label: string
}
