import { FiCode, FiSmartphone, FiServer, FiGlobe } from 'react-icons/fi'
import SectionContainer from '../components/layout/SectionContainer'
import SectionTag from '../components/ui/SectionTag'
import Card from '../components/ui/Card'
import FadeInView from '../components/animations/FadeInView'


// ─── What I Do Cards Data ─────────────────────────────────────────────
// Keeping data close to where it's used is fine for small,
// section-specific data that won't be reused elsewhere.
// Larger datasets (projects, skills) live in /data/ folder.

const whatIDo = [
  {
    icon: FiCode,
    title: 'Frontend Development',
    description:
      'Building responsive, pixel-perfect UIs with React, Next.js, Vue.js and TailwindCSS.',
  },
  {
    icon: FiServer,
    title: 'Backend Development',
    description:
      'REST APIs and server-side logic with Node.js, Express.js, Laravel and MySQL.',
  },
  {
    icon: FiSmartphone,
    title: 'Mobile Development',
    description:
      'Cross-platform mobile apps using React Native with authentication and real-time features.',
  },
  {
    icon: FiGlobe,
    title: 'Full-Stack Projects',
    description:
      'End-to-end web applications from database design to deployed production product.',
  },
]

// ─── Stat Item ────────────────────────────────────────────────────────
function StatItem({ value, label }) {
  return (
    <div className="flex flex-col items-center text-center">
      <span className="text-3xl sm:text-4xl font-black text-accent">{value}</span>
      <span className="text-text-secondary text-sm mt-1">{label}</span>
    </div>
  )
}

// ─── About Section ────────────────────────────────────────────────────
function About() {
  return (
    <SectionContainer id="about" className="bg-bg-secondary">
      <div className="flex flex-col gap-16">

        {/* ── TOP: Tag + Heading + Bio ── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left — Text */}
          <FadeInView direction="left">
            <div className="flex flex-col gap-6">
              <div>
                <SectionTag>About Me</SectionTag>
                <h2 className="text-3xl sm:text-4xl font-black text-text-primary leading-tight">
                  A Developer Who Cares
                  <br />
                  <span className="text-accent">About the Details</span>
                </h2>
              </div>

              <div className="flex flex-col gap-4 text-text-secondary text-base leading-relaxed">
                <p>
                  I'm <span className="text-text-primary font-semibold">Oluwatobiloba Bamidele-Nelly</span> —
                  a full-stack (frontend-focused) developer based in Lagos, Nigeria.
                  I'm passionate about building digital products that are not just
                  functional but genuinely enjoyable to use.
                </p>
                <p>
                  I recently completed my B.Sc. in Computer Science at Lead City University
                  and a competitive internship at HNG (HNGi13), where I built and shipped
                  real products used by real users across web and mobile platforms.
                </p>
                <p>
                  My stack spans React, Next.js, Vue.js, Node.js, Laravel, and MySQL —
                  and I'm always learning. I believe great software is built at the
                  intersection of clean code and thoughtful design.
                </p>
              </div>

              {/* Career Goal Highlight */}
              <div className="border-l-2 border-accent pl-4">
                <p className="text-text-secondary text-sm italic">
                  "Currently seeking frontend or full-stack roles where I can contribute
                  to impactful products, grow with a strong team, and keep pushing
                  my craft forward."
                </p>
              </div>
            </div>
          </FadeInView>

          {/* Right — Stats */}
          <FadeInView direction="right" delay={0.2}>
            <Card className="p-8">
              {/* Stats Row */}
              <div className="grid grid-cols-3 gap-6 mb-8 pb-8 border-b border-border">
                <StatItem value="2+" label="Years Learning" />
                <StatItem value="10+" label="Projects Built" />
                <StatItem value="5+" label="Tech Stacks" />
              </div>

              {/* Personal Details */}
              <div className="flex flex-col gap-4">
                {[
                  { label: 'Name', value: 'Oluwatobiloba Bamidele-Nelly' },
                  { label: 'Alias', value: 'TBNelly' },
                  { label: 'Location', value: 'Lagos State, Nigeria' },
                  { label: 'Email', value: 'nellytobiloba@gmail.com' },
                  { label: 'Phone', value: '+2347044788434' },
                  { label: 'Status', value: '✅ Available for work' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex items-start gap-3">
                    <span className="text-text-muted text-sm w-20 shrink-0">
                      {label}
                    </span>
                    <span className="text-accent text-sm font-medium">→</span>
                    <span className="text-text-primary text-sm">{value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </FadeInView>
        </div>

        {/* ── BOTTOM: What I Do Cards ── */}
        <div>
          <FadeInView>
            <div className="text-center mb-10">
              <SectionTag>What I Do</SectionTag>
              <h3 className="text-2xl sm:text-3xl font-black text-text-primary">
                How I Can Help You
              </h3>
            </div>
          </FadeInView>

          {/* 
            PATTERN: Staggered grid reveal
            Each card gets a slightly higher delay (i * 0.1)
            This creates a left-to-right cascade effect
          */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {whatIDo.map((item, i) => (
              <FadeInView key={item.title} delay={i * 0.1} direction="up">
                <Card hover className="flex flex-col gap-4 h-full">
                  {/* Icon Container */}
                  <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0">
                    <item.icon size={22} className="text-accent" />
                  </div>
                  <div>
                    <h4 className="text-text-primary font-semibold text-sm mb-2">
                      {item.title}
                    </h4>
                    <p className="text-text-muted text-xs leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </Card>
              </FadeInView>
            ))}
          </div>
        </div>

      </div>
    </SectionContainer>
  )
}

export default About