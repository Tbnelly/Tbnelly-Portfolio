import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { NAV_LINKS } from '../../constants'
import { useActiveSection } from '../../hooks/useActiveSection'
import Button from '../ui/Button'
import { cn } from '../../utils/cn'

// Extract section IDs from nav links
// '#about' → 'about'
const SECTION_IDS = NAV_LINKS.map((link) => link.href.replace('#', ''))

function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  // Track which section is active
  const activeSection = useActiveSection(SECTION_IDS)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // FIXED: now accepts href and scrolls smoothly after menu closes
  const handleNavClick = (e, href) => {
    e.preventDefault()
    setIsOpen(false)
    setTimeout(() => {
      const id = href.replace('#', '')
      const el = document.getElementById(id)
      if (el) el.scrollIntoView({ behavior: 'smooth' })
    }, 150)
  }

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={cn(
        'fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 lg:px-8 transition-all duration-300',
        scrolled
          ? 'py-3 bg-bg-primary/90 backdrop-blur-md border-b border-border'
          : 'py-5 bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto flex items-center justify-between">

        {/* Logo */}
        <a
          href="#"
          className="text-xl font-bold text-text-primary hover:text-accent transition-colors duration-200"
        >
          TB<span className="text-accent">Nelly</span>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => {
            const sectionId = link.href.replace('#', '')
            const isActive = activeSection === sectionId

            return (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  'text-sm font-medium transition-colors duration-200 relative group',
                  isActive
                    ? 'text-accent'
                    : 'text-text-secondary hover:text-accent'
                )}
              >
                {link.label}
                {/* Active underline indicator */}
                <motion.span
                  className="absolute -bottom-1 left-0 h-px bg-accent"
                  initial={false}
                  animate={{ width: isActive ? '100%' : '0%' }}
                  transition={{ duration: 0.3, ease: 'easeInOut' }}
                />
              </a>
            )
          })}
        </nav>

        {/* Hire Me Button */}
        <div className="hidden md:block">
          <Button as="a" href="#contact" size="sm">
            Hire Me
          </Button>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-text-primary hover:text-accent transition-colors p-1"
          aria-label="Toggle mobile menu"
        >
          {isOpen ? <HiX size={24} /> : <HiMenu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="md:hidden overflow-hidden bg-bg-secondary border-t border-border mt-3"
          >
            <nav className="flex flex-col px-4 py-4 gap-1">
              {NAV_LINKS.map((link, i) => {
                const sectionId = link.href.replace('#', '')
                const isActive = activeSection === sectionId

                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)} // FIXED
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className={cn(
                      'py-3 px-2 text-sm font-medium border-b border-border last:border-0 transition-colors duration-200',
                      isActive
                        ? 'text-accent'
                        : 'text-text-secondary hover:text-accent'
                    )}
                  >
                    {link.label}
                  </motion.a>
                )
              })}
              <div className="pt-4">
                <Button
                  as="a"
                  href="#contact"
                  onClick={(e) => handleNavClick(e, '#contact')} // FIXED
                  className="w-full justify-center"
                >
                  Hire Me
                </Button>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

export default Navbar