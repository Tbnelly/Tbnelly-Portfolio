import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi'
import { TbQuote } from 'react-icons/tb'
import SectionContainer from '../components/layout/SectionContainer'
import SectionTag from '../components/ui/SectionTag'
import Card from '../components/ui/Card'
import FadeInView from '../components/animations/FadeInView'
import { testimonials } from '../data/testimonials'

// ─── Testimonials uses a carousel pattern ─────────────────────────────
// activeIndex tracks which testimonial is showing
// prev/next buttons move through the array
// AnimatePresence handles the slide transition

function Testimonials() {
  const [activeIndex, setActiveIndex] = useState(0)
  const [direction, setDirection] = useState(1) // 1=forward, -1=backward

  const prev = () => {
    setDirection(-1)
    setActiveIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1))
  }

  const next = () => {
    setDirection(1)
    setActiveIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1))
  }

  const slideVariants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  }

  return (
    <SectionContainer id="testimonials">
      <div className="flex flex-col gap-12">

        {/* ── Header ── */}
        <FadeInView>
          <div className="text-center">
            <SectionTag>Testimonials</SectionTag>
            <h2 className="text-3xl sm:text-4xl font-black text-text-primary mt-1">
              What People <span className="text-accent">Say</span>
            </h2>
          </div>
        </FadeInView>

        {/* ── Carousel ── */}
        <div className="max-w-2xl mx-auto w-full">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={activeIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
              >
                <Card className="text-center p-8 flex flex-col items-center gap-6">
                  {/* Quote Icon */}
                  <TbQuote size={40} className="text-accent opacity-60" />

                  {/* Message */}
                  <p className="text-text-secondary text-base leading-relaxed italic">
                    "{testimonials[activeIndex].message}"
                  </p>

                  {/* Author */}
                  <div className="flex flex-col items-center gap-1">
                    <div className="w-10 h-10 rounded-full bg-accent/20 border border-accent/30 flex items-center justify-center">
                      <span className="text-accent font-bold text-sm">
                        {testimonials[activeIndex].name.charAt(0)}
                      </span>
                    </div>
                    <p className="text-text-primary font-semibold text-sm">
                      {testimonials[activeIndex].name}
                    </p>
                    <p className="text-text-muted text-xs">
                      {testimonials[activeIndex].role}
                    </p>
                  </div>
                </Card>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* ── Controls ── */}
          <div className="flex items-center justify-center gap-6 mt-6">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all duration-200"
            >
              <FiChevronLeft size={18} />
            </button>

            {/* Dot indicators */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > activeIndex ? 1 : -1)
                    setActiveIndex(i)
                  }}
                  className={`transition-all duration-300 rounded-full ${
                    i === activeIndex
                      ? 'w-6 h-2 bg-accent'
                      : 'w-2 h-2 bg-border hover:bg-text-muted'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-all duration-200"
            >
              <FiChevronRight size={18} />
            </button>
          </div>
        </div>

      </div>
    </SectionContainer>
  )
}

export default Testimonials