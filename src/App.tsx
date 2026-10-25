import { useState } from 'react'
import LoadingScreen from './components/LoadingScreen'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Works from './components/Works'
import FigmaWorks from './components/FigmaWorks'
import Contact from './components/Contact'

export default function App() {
  const [loading, setLoading] = useState(true)
  return (
    <>
      {loading && <LoadingScreen onComplete={() => setLoading(false)} />}
      {!loading && (
        <>
          <Navbar />
          <main>
            <Hero />
            <About />
            <Works />
            <FigmaWorks />
            <Contact />
          </main>
        </>
      )}
    </>
  )
}
