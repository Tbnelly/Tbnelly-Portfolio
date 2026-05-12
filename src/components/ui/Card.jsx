import { cn } from '../../utils/cn'

// Card = the rounded dark box used throughout the design
// Used for: project cards, skill cards, experience items,
// testimonial cards, pricing cards, info cards in hero

// PROPS:
// hover → adds lift + glow on hover (for interactive cards)
// className → extensible

function Card({ hover = false, className, children }) {
  return (
    <div
      className={cn(
        'bg-bg-card rounded-card p-6',
        'border border-border',
        // Hover effects only when hover=true
        hover && [
          'transition-all duration-300 cursor-pointer',
          'hover:-translate-y-1',
          'hover:border-accent/30',
          'hover:shadow-[0_8px_30px_rgba(200,255,0,0.08)]',
        ],
        className
      )}
    >
      {children}
    </div>
  )
}

export default Card