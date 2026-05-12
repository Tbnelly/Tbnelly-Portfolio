import { cn } from '../../utils/cn'

// Badge = small pill label used for:
// - Tech stack tags on project cards ("React", "Node.js")
// - Status indicators ("Available", "Featured")
// - Skill category labels

// PROPS:
// variant → 'accent' (lime green), 'dark' (subtle), 'outline'
// className → extensible as always

const variants = {
  accent: 'bg-accent text-black font-semibold',
  dark: 'bg-bg-card text-text-secondary border border-border',
  outline: 'border border-accent text-accent',
  success: 'bg-green-500/20 text-green-400 border border-green-500/30',
}

function Badge({ variant = 'dark', className, children }) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-3 py-1',
        'rounded-full text-xs font-medium',
        'transition-colors duration-200',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}

export default Badge