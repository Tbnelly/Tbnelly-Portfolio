import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import Home from './pages/Home'

// PageWrapper gives the entire site a smooth fade-in on load
// AnimatePresence handles route transitions later when we add more pages
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AnimatePresence mode="wait">
        <Routes>
          <Route
            path="/"
            element={
              <PageWrapper>
                <Home />
              </PageWrapper>
            }
          />
        </Routes>
      </AnimatePresence>
    </BrowserRouter>
  )
}

export default App