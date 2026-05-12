import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import Hero from '../sections/Hero'
import About from '../sections/About'
import Skills from '../sections/Skills'
import Experience from '../sections/Experience'
import Projects from '../sections/Projects'
import Services from '../sections/Services'
import Testimonials from '../sections/Testimonials'
import Contact from '../sections/Contact'

function Home() {
  return (
    <>
      <Navbar />
      <main className="bg-bg-primary">
        <Hero />
        <About />
        <Skills />
        <Experience />
        <Projects />
        <Services />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}

export default Home