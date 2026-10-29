import type { FormEvent } from "react"
import { useState } from "react"
import { motion, useReducedMotion } from "motion/react"
import { Check, Code2, Globe2, Mail, Send } from "lucide-react"
import { SectionReveal } from "@/components/section-reveal"
import { profile, socials } from "@/data/portfolio"
import { staggerContainer, staggerItem } from "@/lib/motion"

export function ContactSection() {
  const reduced = useReducedMotion()
  const [toast, setToast] = useState("")
  const [fallbackHref, setFallbackHref] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const configured = Boolean(profile.formspreeEndpoint)
  const contactSocials = socials.filter((social) => social.label.toLowerCase() !== "email")

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (submitting) return
    const form = event.currentTarget
    const data = Object.fromEntries(new window.FormData(form))
    const payload = {
      name: String(data.name || "").trim(),
      email: String(data.email || "").trim(),
      projectType: String(data.project_type || "web_dev").trim(),
      message: String(data.message || "").trim(),
      source: "tego-saputra-portfolio",
    }

    if (!payload.name || !payload.message) {
      setFallbackHref("")
      setToast("Enter your name and project details, using more than spaces.")
      return
    }
    const preparedEmail = `mailto:${profile.email}?subject=${encodeURIComponent(
      `Project note from ${payload.name}`,
    )}&body=${encodeURIComponent(`${payload.message}\n\nProject type: ${payload.projectType}\nReply to: ${payload.email}`)}`
    if (!configured) {
      setFallbackHref(preparedEmail)
      window.location.href = preparedEmail
      setToast("Continue in your email app to send the message. If it does not open, use the email link above.")
      return
    }

    setSubmitting(true)
    setToast("")
    setFallbackHref("")
    try {
      const response = await fetch(profile.formspreeEndpoint, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        signal: AbortSignal.timeout(15000),
      })
      if (!response.ok) throw new Error("Form request failed")
      form.reset()
      setToast("Message sent. I’ll reply by email.")
    } catch {
      setFallbackHref(preparedEmail)
      setToast("Message not sent. Try again or email me directly.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <section id="contact" className="section-shell contact-section">
      <SectionReveal className="paper-sheet contact-paper">
        <div className="contact-hero-heading">
          <div>
            <p className="section-kicker">Contact / Collaboration</p>
            <h2>Work<br />with me.</h2>
            <p className="contact-hero-copy" lang="id">
              Ceritakan kebutuhan aplikasi, website, atau ide produk Anda. Mari diskusikan cara mewujudkannya.
            </p>
          </div>
          <aside className="contact-card">
            <div className="contact-card-heading">
              <span>Contact me</span>
              <Check size={18} />
            </div>
            <a href={`mailto:${profile.email}`}><Mail size={17} /> {profile.email}</a>
            <a href={contactSocials[0]?.href ?? "#"} target="_blank" rel="noopener noreferrer"><Code2 size={17} /> GitHub / tegokkk</a>
            <a href={contactSocials[1]?.href ?? "#"} target="_blank" rel="noopener noreferrer"><Globe2 size={17} /> LinkedIn / Tego</a>
          </aside>
        </div>

        <div className="contact-divider" />

        <div className="contact-work-grid">
          <div className="inquiry-form-wrap">
            <div className="folder-tab contact-folder-tab">Inquiry.form</div>
            <div className="inquiry-form-panel">
              <p className="form-status">
                {configured ? "Contact form is ready." : "Your email app will open with a prepared message."}
              </p>
              <motion.form
                className="contact-form"
                onSubmit={submit}
                aria-busy={submitting}
                initial={reduced ? false : "hidden"}
                whileInView="visible"
                viewport={{ once: true }}
                variants={staggerContainer}
              >
                <div className="contact-form-two-col">
                  <motion.label variants={staggerItem}>
                    Name
                    <input name="name" type="text" placeholder="Your name" autoComplete="name" required />
                  </motion.label>
                  <motion.label variants={staggerItem}>
                    Email address
                    <input name="email" type="email" placeholder="you@example.com" autoComplete="email" required />
                  </motion.label>
                </div>
                <motion.label variants={staggerItem}>
                  Project type
                  <select name="project_type" defaultValue="web_dev">
                    <option value="web_dev">Web development</option>
                    <option value="ui_design">UI/UX design</option>
                    <option value="full_stack">Full-stack application</option>
                    <option value="consulting">Technical consulting</option>
                  </select>
                </motion.label>
                <motion.label variants={staggerItem}>
                  Project details
                    <textarea name="message" aria-label="Message" rows={5} placeholder="Describe your project, timeline, and goals..." required />
                </motion.label>
                <motion.div className="contact-submit-row" variants={staggerItem}>
                  <button className="primary-button" type="submit" disabled={submitting}>
                    <Send size={16} /> {submitting ? "Sending" : "Send message"}
                  </button>
                </motion.div>
              </motion.form>
              {toast ? <div className="form-toast" role="status">
                {toast}
                {fallbackHref ? <a className="form-fallback-link" href={fallbackHref}>Open prepared email</a> : null}
              </div> : null}
            </div>
          </div>

          <aside className="contact-side-info">
            <div className="status-card">
              <div className="status-card-heading"><span /> <h3>Current status</h3></div>
              <p>Currently <strong>open</strong> for freelance projects and technical consultation.</p>
              <div className="status-tags"><span>Frontend</span><span>Design systems</span></div>
            </div>
            <div className="operating-base">
              <span>Operating base</span>
              <strong>Indonesia,<br />GMT+7</strong>
              <small>Available for remote collaboration</small>
            </div>
          </aside>
        </div>
      </SectionReveal>
    </section>
  )
}
