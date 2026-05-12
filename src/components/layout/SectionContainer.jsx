import { cn } from '../../utils/cn'

// SectionContainer = the consistent wrapper for EVERY section
// Ensures:
// - Same max width across all sections (1280px)
// - Same horizontal padding (prevents content touching screen edges)
// - Same vertical spacing between sections
// - The "id" prop enables smooth scroll navigation (#about, #skills etc.)

// PROPS:
// id → the anchor for navbar smooth scroll links
// className → override/extend styles per section if needed

function SectionContainer({ id, className, children }) {
  return (
    <section
      id={id}
      className={cn(
        'w-full py-20 px-4 sm:px-6 lg:px-8',
        className
      )}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  )
}

export default SectionContainer