import { cn } from '../../utils/cn'

const variants = {
  primary: `
    bg-accent text-black font-semibold
    hover:bg-accent-hover
    shadow-[0_0_20px_rgba(200,255,0,0.25)]
    hover:shadow-[0_0_30px_rgba(200,255,0,0.4)]
  `,
  outline: `
    border border-accent text-accent
    hover:bg-accent hover:text-black
  `,
  ghost: `
    text-text-secondary hover:text-text-primary
    hover:bg-bg-card
  `,
}

const sizes = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  as: Tag = 'button', // ← 'as' prop: defaults to button, can be 'a'
  ...props
}) {
  return (
    <Tag
      className={cn(
        'inline-flex items-center gap-2 rounded-btn',
        'font-medium transition-all duration-300 cursor-pointer',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {children}
    </Tag>
  )
}

export default Button