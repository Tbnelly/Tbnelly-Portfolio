import { FiGithub, FiLinkedin, FiMail, FiHeart } from 'react-icons/fi'
import { NAV_LINKS, SOCIAL_LINKS } from '../../constants'

function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="bg-bg-secondary border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">

          {/* Brand */}
          <div className="flex flex-col gap-4">
            <a href="#" className="text-xl font-bold text-text-primary">
              TB<span className="text-accent">Nelly</span>
            </a>
            <p className="text-text-muted text-sm leading-relaxed max-w-xs">
              Full-Stack Developer from Lagos, Nigeria. Building clean,
              fast, and user-focused digital products.
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
                  className="w-9 h-9 rounded-lg border border-border flex items-center justify-center text-text-muted hover:text-accent hover:border-accent transition-all duration-200"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="flex flex-col gap-4">
            <p className="text-text-primary font-semibold text-sm">Navigation</p>
            <nav className="flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-text-muted text-sm hover:text-accent transition-colors duration-200"
                >
                  {link.label}
                </a>
              ))}
            </nav>
          </div>

          {/* CTA */}
          <div className="flex flex-col gap-4">
            <p className="text-text-primary font-semibold text-sm">
              Open to Opportunities
            </p>
            <p className="text-text-muted text-sm leading-relaxed">
              Looking for a frontend or full-stack developer? Let's build
              something great together.
            </p>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-black text-sm font-semibold rounded-btn hover:bg-accent-hover transition-colors duration-200 self-start"
            >
              Hire Me
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-text-muted text-xs">
            © {year} Oluwatobiloba Bamidele-Nelly. All rights reserved.
          </p>
          <p className="text-text-muted text-xs flex items-center gap-1">
            Built with <FiHeart size={11} className="text-accent" /> using React + TailwindCSS v4
          </p>
        </div>

      </div>
    </footer>
  )
}

export default Footer