import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  FiMail, FiPhone, FiMapPin,
  FiGithub, FiLinkedin, FiSend, FiCheck,
} from 'react-icons/fi'
import SectionContainer from '../components/layout/SectionContainer'
import SectionTag from '../components/ui/SectionTag'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import FadeInView from '../components/animations/FadeInView'
import { SOCIAL_LINKS, SITE_CONFIG } from '../constants'

// ─── Contact Info Item ────────────────────────────────────────────────
function ContactItem({ icon: Icon, label, value, href }) {
  const content = (
    <div className="flex items-center gap-4 group">
      <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 group-hover:bg-accent group-hover:border-accent transition-all duration-300">
        <Icon size={16} className="text-accent group-hover:text-black transition-colors duration-300" />
      </div>
      <div>
        <p className="text-text-muted text-xs">{label}</p>
        <p className="text-text-primary text-sm font-medium">{value}</p>
      </div>
    </div>
  )

  return href ? (
    <a href={href} className="block">{content}</a>
  ) : (
    <div>{content}</div>
  )
}

// ─── Contact Form ─────────────────────────────────────────────────────
// TEACHING MOMENT — Controlled Form Pattern:
// Every input has a value tied to state (controlled component).
// onChange updates state on every keystroke.
// onSubmit reads from state to process the form.
// This is the standard React form pattern.

function ContactForm() {
  const [form, setForm] = useState({
    name: '', email: '', subject: '', budget: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    // Computed property name: [e.target.name] dynamically sets
    // the right key in the object without needing separate handlers
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault() // prevents page reload on submit
    setLoading(true)

    // Simulate form submission (replace with EmailJS or Formspree later)
    await new Promise((resolve) => setTimeout(resolve, 1500))

    setLoading(false)
    setSubmitted(true)
  }

  // Input class — reused across all fields for consistency
  const inputClass = `
    w-full bg-bg-secondary border border-border rounded-btn
    px-4 py-3 text-text-primary text-sm
    placeholder:text-text-muted
    focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30
    transition-all duration-200
  `

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center gap-4 py-16 text-center"
      >
        <div className="w-16 h-16 rounded-full bg-green-500/20 border border-green-500/30 flex items-center justify-center">
          <FiCheck size={28} className="text-green-400" />
        </div>
        <h3 className="text-text-primary font-bold text-xl">Message Sent!</h3>
        <p className="text-text-secondary text-sm max-w-xs">
          Thanks for reaching out. I'll get back to you within 24 hours.
        </p>
        <button
          onClick={() => { setSubmitted(false); setForm({ name: '', email: '', subject: '', budget: '', message: '' }) }}
          className="text-accent text-sm hover:underline mt-2"
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      {/* Name + Email Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-text-secondary text-xs font-medium">Your Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Oluwatobiloba"
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-text-secondary text-xs font-medium">Your Email</label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@email.com"
            required
            className={inputClass}
          />
        </div>
      </div>

      {/* Subject + Budget Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-text-secondary text-xs font-medium">Subject</label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Project Inquiry"
            required
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-text-secondary text-xs font-medium">Your Budget (optional)</label>
          <input
            name="budget"
            value={form.budget}
            onChange={handleChange}
            placeholder="e.g. $500 – $1000"
            className={inputClass}
          />
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label className="text-text-secondary text-xs font-medium">Message</label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          required
          rows={5}
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Submit */}
      <Button
        type="submit"
        size="md"
        className="w-full justify-center"
        disabled={loading}
      >
        {loading ? (
          <>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full"
            />
            Sending...
          </>
        ) : (
          <>
            <FiSend size={16} />
            Send Message
          </>
        )}
      </Button>
    </form>
  )
}

// ─── Contact Section ──────────────────────────────────────────────────
function Contact() {
  return (
    <SectionContainer id="contact" className="bg-bg-secondary">
      <div className="flex flex-col gap-12">

        {/* ── Header ── */}
        <FadeInView>
          <div className="text-center">
            <SectionTag>Get In Touch</SectionTag>
            <h2 className="text-3xl sm:text-4xl font-black text-text-primary mt-1">
              Let's <span className="text-accent">Work Together</span>
            </h2>
            <p className="text-text-secondary text-base mt-3 max-w-xl mx-auto">
              Have a project in mind or want to discuss opportunities?
              I'd love to hear from you.
            </p>
          </div>
        </FadeInView>

        {/* ── Two Column Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left — Contact Info */}
          <FadeInView direction="left">
            <div className="flex flex-col gap-8">
              <div>
                <h3 className="text-text-primary font-bold text-xl mb-2">
                  Contact Information
                </h3>
                <p className="text-text-secondary text-sm leading-relaxed">
                  I'm currently available for freelance work and open to
                  full-time frontend or full-stack positions.
                </p>
              </div>

              <div className="flex flex-col gap-5">
                <ContactItem
                  icon={FiMail}
                  label="Email"
                  value={SITE_CONFIG.email}
                  href={`mailto:${SITE_CONFIG.email}`}
                />
                <ContactItem
                  icon={FiPhone}
                  label="Phone"
                  value={SITE_CONFIG.phone}
                  href={`tel:${SITE_CONFIG.phone}`}
                />
                <ContactItem
                  icon={FiMapPin}
                  label="Location"
                  value={SITE_CONFIG.location}
                />
              </div>

              {/* Social Links */}
              <div className="flex flex-col gap-3">
                <p className="text-text-muted text-xs font-medium uppercase tracking-widest">
                  Find me online
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: FiGithub, href: SOCIAL_LINKS.github, label: 'GitHub' },
                    { icon: FiLinkedin, href: `https://${SOCIAL_LINKS.linkedin}`, label: 'LinkedIn' },
                    { icon: FiMail, href: `mailto:${SOCIAL_LINKS.email}`, label: 'Email' },
                  ].map(({ icon: Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={label}
                      className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all duration-200"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              {/* Availability Card */}
              <Card className="border-green-500/20 bg-green-500/5">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <div>
                    <p className="text-text-primary text-sm font-semibold">
                      Available for work
                    </p>
                    <p className="text-text-muted text-xs">
                      Response time: within 24 hours
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </FadeInView>

          {/* Right — Contact Form */}
          <FadeInView direction="right" delay={0.2}>
            <Card className="p-6 sm:p-8">
              <ContactForm />
            </Card>
          </FadeInView>

        </div>
      </div>
    </SectionContainer>
  )
}

export default Contact