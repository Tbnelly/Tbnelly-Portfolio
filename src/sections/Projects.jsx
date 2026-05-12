import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiGithub, FiExternalLink, FiFolder } from 'react-icons/fi'
import SectionContainer from '../components/layout/SectionContainer'
import SectionTag from '../components/ui/SectionTag'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import FadeInView from '../components/animations/FadeInView'
import { projects } from '../data/projects'
import { cn } from '../utils/cn'

// ─── Filter Categories ────────────────────────────────────────────────
// 'All' + unique categories extracted from projects data
// Using Set to remove duplicates, spread to convert back to array
const getCategories = () => [
  'All',
  ...new Set(projects.map((p) => p.category)),
]

// ─── Filter Tab ───────────────────────────────────────────────────────
function FilterTab({ label, count, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-btn text-sm font-medium transition-all duration-200',
        'flex items-center gap-2',
        active
          ? 'bg-accent text-black'
          : 'text-text-secondary hover:text-text-primary border border-border hover:border-accent/50'
      )}
    >
      {label}
      <span className={cn(
        'text-xs px-1.5 py-0.5 rounded-full',
        active ? 'bg-black/20 text-black' : 'bg-bg-card text-text-muted'
      )}>
        {count}
      </span>
    </button>
  )
}

// ─── Project Card ─────────────────────────────────────────────────────
// TEACHING MOMENT:
// We use Microlink API to generate live website previews.
// The API takes any URL and returns a screenshot.
// Format: https://api.microlink.io/?url=YOUR_URL&screenshot=true&embed=screenshot.url
// This saves us from manually taking and storing screenshots for every project.

function ProjectCard({ project, index }) {
  const previewUrl = project.live
    ? `https://api.microlink.io/?url=${encodeURIComponent(project.live)}&screenshot=true&embed=screenshot.url`
    : null

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30, scale: 0.95 }}
      transition={{
        duration: 0.4,
        delay: index * 0.08,
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
    >
      <Card
        hover
        className="flex flex-col gap-4 h-full group overflow-hidden p-0"
      >
        {/* ── Preview Image ── */}
        <div className="relative w-full h-44 overflow-hidden bg-bg-secondary rounded-t-card">
          {previewUrl ? (
            <img
              src={previewUrl}
              alt={`${project.title} preview`}
              className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
              // If Microlink fails, show fallback
              onError={(e) => {
                e.target.style.display = 'none'
                e.target.nextSibling.style.display = 'flex'
              }}
            />
          ) : null}

          {/* Fallback when no preview */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ display: previewUrl ? 'none' : 'flex' }}
          >
            <FiFolder size={40} className="text-text-muted" />
          </div>

          {/* Status Badge overlay */}
          <div className="absolute top-3 right-3">
            <Badge
              variant={project.status === 'live' ? 'success' : 'dark'}
              className="text-xs"
            >
              {project.status === 'live' ? '● Live' : 'In Progress'}
            </Badge>
          </div>

          {/* Featured badge */}
          {project.featured && (
            <div className="absolute top-3 left-3">
              <Badge variant="accent" className="text-xs">
                Featured
              </Badge>
            </div>
          )}

          {/* Hover overlay with links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-bg-primary/80 backdrop-blur-sm flex items-center justify-center gap-4"
          >
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-accent text-black text-sm font-semibold rounded-btn hover:bg-accent-hover transition-colors"
              >
                <FiExternalLink size={14} />
                Live Demo
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-border text-text-primary text-sm font-medium rounded-btn hover:border-accent hover:text-accent transition-colors"
              >
                <FiGithub size={14} />
                Code
              </a>
            )}
          </motion.div>
        </div>

        {/* ── Card Content ── */}
        <div className="flex flex-col gap-3 p-5 flex-1">
          <h3 className="text-text-primary font-bold text-base leading-snug">
            {project.title}
          </h3>
          <p className="text-text-muted text-xs leading-relaxed flex-1">
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-1.5 pt-2 border-t border-border">
            {project.tech.map((tech) => (
              <Badge key={tech} variant="dark" className="text-xs">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

// ─── Projects Section ─────────────────────────────────────────────────
function Projects() {
  const [activeFilter, setActiveFilter] = useState('All')
  const categories = getCategories()

  const filtered =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter)

  return (
    <SectionContainer id="projects">
      <div className="flex flex-col gap-12">

        {/* ── Header ── */}
        <FadeInView>
          <div className="text-center">
            <SectionTag>Portfolio</SectionTag>
            <h2 className="text-3xl sm:text-4xl font-black text-text-primary mt-1">
              Featured <span className="text-accent">Projects</span>
            </h2>
            <p className="text-text-secondary text-base mt-3 max-w-xl mx-auto">
              Real projects built with real technologies. Each one solving a
              real problem.
            </p>
          </div>
        </FadeInView>

        {/* ── Filter Tabs ── */}
        <FadeInView delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((cat) => {
              const count =
                cat === 'All'
                  ? projects.length
                  : projects.filter((p) => p.category === cat).length
              return (
                <FilterTab
                  key={cat}
                  label={cat}
                  count={count}
                  active={activeFilter === cat}
                  onClick={() => setActiveFilter(cat)}
                />
              )
            })}
          </div>
        </FadeInView>

        {/* ── Projects Grid ── */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project, i) => (
              <ProjectCard
                key={project.id}
                project={project}
                index={i}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── GitHub CTA ── */}
        <FadeInView delay={0.2}>
          <div className="text-center">
            <p className="text-text-muted text-sm mb-4">
              Want to see more? Check out my GitHub for all projects.
            </p>
            <a
              href="https://github.com/Tbnelly"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 border border-border text-text-secondary hover:text-accent hover:border-accent rounded-btn text-sm font-medium transition-all duration-200"
            >
              <FiGithub size={16} />
              View All on GitHub
            </a>
          </div>
        </FadeInView>

      </div>
    </SectionContainer>
  )
}

export default Projects