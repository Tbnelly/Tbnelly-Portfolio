import { cn } from '../../utils/cn'

// SectionTag = the small labeled pill above section headings
// Exactly like the "PORTFOLIO" and "TESTIMONIALS" labels
// you see in the Dribbble design inspiration
//
// Usage: <SectionTag>PORTFOLIO</SectionTag>
// Renders a small accent-colored label above the section title

function SectionTag({ className, children }) {
  return (
    <span
      className={cn(
        'inline-block text-accent text-xs font-bold tracking-widest uppercase',
        'mb-3',
        className
      )}
    >
      {children}
    </span>
  )
}

export default SectionTag