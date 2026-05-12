import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import SectionContainer from '../components/layout/SectionContainer'
import SectionTag from '../components/ui/SectionTag'
import Card from '../components/ui/Card'
import FadeInView from '../components/animations/FadeInView'
import { skillCategories } from '../data/skills'
import { cn } from '../utils/cn'

// ─── Skill Card ───────────────────────────────────────────────────────
// Each individual skill — icon + name + colored glow on hover
// 
// PROPS:
// skill → { name, icon: IconComponent, color }
// index → used for stagger delay

function SkillCard({ skill, index }) {
  const Icon = skill.icon

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{
        duration: 0.3,
        delay: index * 0.04, // stagger each card slightly
        ease: [0.21, 0.47, 0.32, 0.98],
      }}
      // layout prop tells Framer Motion to animate position changes
      // when cards reorder during filter switching
      layout
    >
      <Card
        hover
        className="flex flex-col items-center gap-3 p-4 text-center group"
      >
        {/* Icon wrapper — glows with the tech's own brand color on hover */}
        <div
          className="w-12 h-12 rounded-xl flex items-center justify-center transition-all duration-300 bg-bg-secondary group-hover:scale-110"
          style={{
            // Dynamic inline style for brand color glow
            // We can't do this with Tailwind alone because the color is dynamic
            boxShadow: `0 0 0 1px ${skill.color}22`,
          }}
        >
          <Icon
            size={26}
            style={{ color: skill.color }}
            className="transition-transform duration-300 group-hover:scale-110"
          />
        </div>

        <span className="text-text-secondary text-xs font-medium group-hover:text-text-primary transition-colors duration-200">
          {skill.name}
        </span>
      </Card>
    </motion.div>
  )
}

// ─── Category Filter Tab ──────────────────────────────────────────────
function FilterTab({ label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'px-4 py-2 rounded-btn text-sm font-medium transition-all duration-200',
        active
          ? 'bg-accent text-black'
          : 'text-text-secondary hover:text-text-primary border border-border hover:border-accent/50'
      )}
    >
      {label}
    </button>
  )
}

// ─── Skills Section ───────────────────────────────────────────────────
function Skills() {
  // activeCategory controls which filter tab is selected
  // 'All' shows every skill, otherwise filters by category label
  const [activeCategory, setActiveCategory] = useState('All')

  // Build filter tabs: 'All' + each category label
  const tabs = ['All', ...skillCategories.map((c) => c.label)]

  // Flatten all skills into one array for the 'All' view
  // flatMap = map + flatten one level deep
  const allSkills = skillCategories.flatMap((cat) =>
    cat.skills.map((skill) => ({ ...skill, category: cat.label }))
  )

  // Filter logic:
  // If 'All' selected → show everything
  // Otherwise → only show skills matching the active category
  const visibleSkills =
    activeCategory === 'All'
      ? allSkills
      : allSkills.filter((s) => s.category === activeCategory)

  return (
    <SectionContainer id="skills">
      <div className="flex flex-col gap-12">

        {/* ── Header ── */}
        <FadeInView>
          <div className="text-center">
            <SectionTag>Technical Skills</SectionTag>
            <h2 className="text-3xl sm:text-4xl font-black text-text-primary mt-1">
              My Tech <span className="text-accent">Arsenal</span>
            </h2>
            <p className="text-text-secondary text-base mt-3 max-w-xl mx-auto">
              Technologies I work with to build fast, responsive, and scalable web applications.
            </p>
          </div>
        </FadeInView>

        {/* ── Filter Tabs ── */}
        <FadeInView delay={0.1}>
          <div className="flex flex-wrap justify-center gap-3">
            {tabs.map((tab) => (
              <FilterTab
                key={tab}
                label={tab}
                active={activeCategory === tab}
                onClick={() => setActiveCategory(tab)}
              />
            ))}
          </div>
        </FadeInView>

        {/* ── Skills Grid ── */}
        {/*
          AnimatePresence enables exit animations when skills
          are filtered out. Without it, cards just instantly disappear.
          
          TEACHING MOMENT — `layout` prop on motion.div:
          When we filter, cards that remain animate to their new
          positions smoothly instead of jumping. This is called
          "layout animation" and it's one of Framer Motion's
          most powerful features.
        */}
        <motion.div
          layout
          className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-3"
        >
          <AnimatePresence mode="popLayout">
            {visibleSkills.map((skill, i) => (
              <SkillCard
                key={skill.name}
                skill={skill}
                index={i}
              />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── Skill Count ── */}
        <FadeInView delay={0.2}>
          <p className="text-center text-text-muted text-sm">
            Showing{' '}
            <span className="text-accent font-semibold">{visibleSkills.length}</span>
            {' '}of{' '}
            <span className="text-accent font-semibold">{allSkills.length}</span>
            {' '}skills
          </p>
        </FadeInView>

      </div>
    </SectionContainer>
  )
}

export default Skills