import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import {
  FiMail, FiPhone, FiMapPin,
  FiGithub, FiLinkedin, FiSend, FiCheck, FiAlertCircle,
} from 'react-icons/fi'
import SectionContainer from '../components/layout/SectionContainer'
import SectionTag from '../components/ui/SectionTag'
import Card from '../components/ui/Card'
import Button from '../components/ui/Button'
import FadeInView from '../components/animations/FadeInView'
import { SOCIAL_LINKS } from '../constants'

// ─── Environment Variables ────────────────────────────────────────────
const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY

// ─── Character Limits ─────────────────────────────────────────────────
const LIMITS = {
  name: 60,
  email: 100,
  subject: 100,
  budget: 40,
  message: 1000,
}

// ─── Sanitize input: strip HTML/script tags ───────────────────────────
const sanitize = (value) => value.replace(/<[^>]*>/g, '')

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
  return href ? <a href={href} className="block">{content}</a> : <div>{content}</div>
}

// ─── Contact Form ─────────────────────────────────────────────────────
function ContactForm() {
  const formRef = useRef(null)

  const [form, setForm] = useState({
    name: '', email: '', subject: '', budget: '', message: '',
  })

  const [status, setStatus] = useState('idle')

  const handleChange = (e) => {
    const { name, value } = e.target
    const limit = LIMITS[name]
    // Sanitize + enforce character limit
    const cleaned = sanitize(value).slice(0, limit)
    setForm((prev) => ({ ...prev, [name]: cleaned }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setStatus('loading')

    try {
      await emailjs.sendForm(
        SERVICE_ID,
        TEMPLATE_ID,
        formRef.current,
        { publicKey: PUBLIC_KEY }
      )

      setStatus('success')
      setForm({ name: '', email: '', subject: '', budget: '', message: '' })

    } catch (error) {
      console.error('EmailJS error:', error)
      setStatus('error')
    }
  }

  const inputClass = `
    w-full bg-bg-secondary border border-border rounded-btn
    px-4 py-3 text-text-primary text-sm
    placeholder:text-text-muted
    focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30
    transition-all duration-200
  `

  // ── Success State ──
  if (status === 'success') {
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
          Thanks for reaching out! I'll get back to you at{' '}
          <span className="text-accent">{form.email || 'your email'}</span>{' '}
          within 24 hours.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-accent text-sm hover:underline mt-2"
        >
          Send another message
        </button>
      </motion.div>
    )
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-4">

      {/* Error Banner */}
      {status === 'error' && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-3 px-4 py-3 rounded-btn bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
        >
          <FiAlertCircle size={16} className="shrink-0" />
          <span>
            Something went wrong. Please try emailing me directly at{' '}
            <a href="mailto:nellytobiloba@gmail.com" className="underline">
              nellytobiloba@gmail.com
            </a>
          </span>
        </motion.div>
      )}

      {/* Name + Email */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-text-secondary text-xs font-medium">
            Your Name
          </label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="John Doe"
            required
            maxLength={LIMITS.name}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-text-secondary text-xs font-medium">
            Your Email
          </label>
          <input
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            placeholder="you@email.com"
            required
            maxLength={LIMITS.email}
            className={inputClass}
          />
        </div>
      </div>

      {/* Subject + Budget */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="flex flex-col gap-1.5">
          <label className="text-text-secondary text-xs font-medium">
            Subject
          </label>
          <input
            name="subject"
            value={form.subject}
            onChange={handleChange}
            placeholder="Project Inquiry"
            required
            maxLength={LIMITS.subject}
            className={inputClass}
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-text-secondary text-xs font-medium">
            Budget (optional)
          </label>
          <input
            name="budget"
            value={form.budget}
            onChange={handleChange}
            placeholder="e.g. $500 – $1000"
            maxLength={LIMITS.budget}
            className={inputClass}
          />
        </div>
      </div>

      {/* Message */}
      <div className="flex flex-col gap-1.5">
        <label className="text-text-secondary text-xs font-medium">
          Message
        </label>
        <textarea
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Tell me about your project..."
          required
          rows={5}
          maxLength={LIMITS.message}
          className={`${inputClass} resize-none`}
        />
        {/* Character counter for message only */}
        <p className="text-text-muted text-xs text-right">
          {form.message.length} / {LIMITS.message}
        </p>
      </div>

      {/* Submit Button */}
      <Button
        type="submit"
        size="md"
        className="w-full justify-center"
        disabled={status === 'loading'}
      >
        {status === 'loading' ? (
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
                  value="nellytobiloba@gmail.com"
                  href="mailto:nellytobiloba@gmail.com"
                />
                <ContactItem
                  icon={FiPhone}
                  label="Phone"
                  value="+2347044788434"
                  href="tel:+2347044788434"
                />
                <ContactItem
                  icon={FiMapPin}
                  label="Location"
                  value="Lagos State, Nigeria"
                />
              </div>

              <div className="flex flex-col gap-3">
                <p className="text-text-muted text-xs font-medium uppercase tracking-widest">
                  Find me online
                </p>
                <div className="flex gap-3">
                  {[
                    { icon: FiGithub, href: SOCIAL_LINKS.github },
                    { icon: FiLinkedin, href: `https://${SOCIAL_LINKS.linkedin}` },
                    { icon: FiMail, href: `mailto:${SOCIAL_LINKS.email}` },
                  ].map(({ icon: Icon, href }, i) => (
                    <a
                      key={i}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 rounded-xl border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all duration-200"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>

              <Card className="border-green-500/20 bg-green-500/5">
                <div className="flex items-center gap-3">
                  <div className="w-2.5 h-2.5 rounded-full bg-green-400 animate-pulse" />
                  <div>
                    <p className="text-text-primary text-sm font-semibold">
                      Available for work
                    </p>
                    <p className="text-text-muted text-xs">a
                      Response time: within 24 hours
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </FadeInView>

          {/* Right — Form */}
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