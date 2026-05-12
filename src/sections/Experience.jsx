import { FiBriefcase, FiBook, FiAward, FiCheck } from 'react-icons/fi'
import SectionContainer from '../components/layout/SectionContainer'
import SectionTag from '../components/ui/SectionTag'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import FadeInView from '../components/animations/FadeInView'
import { experiences, education, certifications } from '../data/experience'

// ─── Timeline Item ────────────────────────────────────────────────────
// The vertical timeline UI — a line on the left with
// a dot marker at each entry point.
//
// PATTERN: We pass the icon, color, and content as props
// keeping the Timeline reusable for both Experience and Education

function TimelineItem({ icon: Icon, iconColor = 'text-accent', period, title, subtitle, location, highlights, delay = 0 }) {
  return (
    <FadeInView delay={delay} direction="left">
      <div className="relative flex gap-6">

        {/* ── Timeline Line + Dot ── */}
        <div className="flex flex-col items-center">
          {/* Dot with icon */}
          <div className={`
            w-10 h-10 rounded-full shrink-0
            bg-bg-card border-2 border-accent
            flex items-center justify-center
            shadow-[0_0_12px_rgba(200,255,0,0.3)]
          `}>
            <Icon size={16} className={iconColor} />
          </div>
          {/* Vertical line — hidden on last item via CSS */}
          <div className="w-px flex-1 bg-border mt-2 min-h-8" />
        </div>

        {/* ── Content Card ── */}
        <div className="pb-10 flex-1">
          <Card className="flex flex-col gap-3">
            {/* Period Badge */}
            <Badge variant="dark" className="self-start text-xs">
              {period}
            </Badge>

            {/* Role + Company */}
            <div>
              <h3 className="text-text-primary font-bold text-base">
                {title}
              </h3>
              <p className="text-accent text-sm font-medium mt-0.5">
                {subtitle}
              </p>
              {location && (
                <p className="text-text-muted text-xs mt-0.5">{location}</p>
              )}
            </div>

            {/* Highlights List */}
            {highlights && (
              <ul className="flex flex-col gap-2 mt-1">
                {highlights.map((point, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <FiCheck
                      size={14}
                      className="text-accent shrink-0 mt-0.5"
                    />
                    <span className="text-text-secondary text-sm leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>

      </div>
    </FadeInView>
  )
}

// ─── Section Column Header ────────────────────────────────────────────
function ColumnHeader({ icon: Icon, title }) {
  return (
    <div className="flex items-center gap-3 mb-8">
      <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center">
        <Icon size={18} className="text-accent" />
      </div>
      <h3 className="text-xl font-bold text-text-primary">{title}</h3>
    </div>
  )
}

// ─── Experience Section ───────────────────────────────────────────────
function Experience() {
  return (
    <SectionContainer id="experience" className="bg-bg-secondary">
      <div className="flex flex-col gap-12">

        {/* ── Header ── */}
        <FadeInView>
          <div className="text-center">
            <SectionTag>Background</SectionTag>
            <h2 className="text-3xl sm:text-4xl font-black text-text-primary mt-1">
              Experience &{' '}
              <span className="text-accent">Education</span>
            </h2>
            <p className="text-text-secondary text-base mt-3 max-w-xl mx-auto">
              My professional journey, academic background, and certifications
              that shaped who I am as a developer.
            </p>
          </div>
        </FadeInView>

        {/* ── Two Column Layout ── */}
        {/*
          On mobile: single column (flex-col)
          On desktop: side by side (lg:grid-cols-2)
          Each column has its own timeline
        */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">

          {/* ── LEFT: Work Experience ── */}
          <div>
            <FadeInView>
              <ColumnHeader icon={FiBriefcase} title="Work Experience" />
            </FadeInView>

            <div>
              {experiences.map((exp, i) => (
                <TimelineItem
                  key={exp.id}
                  icon={FiBriefcase}
                  period={exp.period}
                  title={exp.role}
                  subtitle={exp.company}
                  location={exp.location}
                  highlights={exp.highlights}
                  delay={i * 0.15}
                />
              ))}
            </div>
          </div>

          {/* ── RIGHT: Education + Certifications ── */}
          <div>
            <FadeInView>
              <ColumnHeader icon={FiBook} title="Education" />
            </FadeInView>

            <div>
              {education.map((edu, i) => (
                <TimelineItem
                  key={edu.id}
                  icon={FiBook}
                  period={edu.period}
                  title={edu.degree}
                  subtitle={edu.institution}
                  delay={i * 0.15}
                />
              ))}
            </div>

            {/* Certifications */}
            <FadeInView delay={0.3}>
              <ColumnHeader icon={FiAward} title="Certifications" />
            </FadeInView>

            <div>
              {certifications.map((cert, i) => (
                <TimelineItem
                  key={cert.id}
                  icon={FiAward}
                  period={cert.period}
                  title={cert.title}
                  subtitle={cert.issuer}
                  delay={0.3 + i * 0.15}
                />
              ))}
            </div>
          </div>

        </div>

      </div>
    </SectionContainer>
  )
}

export default Experience