import { useState, useEffect } from 'react'

// useActiveSection tracks which section is currently visible
// in the viewport using the IntersectionObserver API.
//
// HOW IT WORKS:
// - We observe all elements matching the selector (section[id])
// - When a section enters the viewport, we update activeSection state
// - The navbar uses this to highlight the correct link
//
// WHY IntersectionObserver instead of scroll events?
// - Much more performant — doesn't fire on every pixel scrolled
// - Browser-native API built exactly for this use case
// - No manual position calculations needed

export function useActiveSection(sectionIds) {
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const observers = []

    sectionIds.forEach((id) => {
      const element = document.getElementById(id)
      if (!element) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          // When section is more than 40% visible, mark it active
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        {
          // rootMargin: shrinks the "viewport" for detection
          // -20% top means section must be 20% past the top to trigger
          rootMargin: '-20% 0px -60% 0px',
          threshold: 0,
        }
      )

      observer.observe(element)
      observers.push(observer)
    })

    // Cleanup: disconnect all observers on unmount
    return () => observers.forEach((obs) => obs.disconnect())
  }, [sectionIds])

  return activeSection
}