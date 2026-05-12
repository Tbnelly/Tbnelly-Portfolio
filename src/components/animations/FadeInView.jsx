import { motion } from 'framer-motion'

// FadeInView = wraps any element and animates it into view
// when it enters the viewport (scroll reveal effect)
//
// HOW IT WORKS:
// - Framer Motion's `whileInView` triggers animation when element enters viewport
// - `initial` = the starting state (invisible, shifted down)
// - `whileInView` = the end state (visible, normal position)
// - `viewport={{ once: true }}` = animates ONCE, not every time you scroll past
// - `transition` = controls duration and easing
//
// PROPS:
// delay    → stagger timing (0, 0.1, 0.2...) for sequential reveals
// direction → 'up' | 'down' | 'left' | 'right' — where it animates FROM
// duration  → how long the animation takes
// className → layout classes from parent

const directionVariants = {
  up:    { y: 40, x: 0 },
  down:  { y: -40, x: 0 },
  left:  { x: 40, y: 0 },
  right: { x: -40, y: 0 },
}

function FadeInView({
  children,
  delay = 0,
  direction = 'up',
  duration = 0.6,
  className,
}) {
  const hiddenState = {
    opacity: 0,
    ...directionVariants[direction],
  }

  return (
    <motion.div
      initial={hiddenState}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{
        duration,
        delay,
        ease: [0.21, 0.47, 0.32, 0.98], // custom cubic-bezier = premium feel
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

export default FadeInView