import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { scrollToSection } from '../lib/scroll'

// Home and Contact are hidden on phones: the logo scrolls to the top
// and "Hire me" scrolls to the contact section, so the pill stays narrow.
const LINKS = [
  { label: 'Home', id: 'hero', hideOnMobile: true },
  { label: 'About', id: 'about' },
  { label: 'Projects', id: 'works' },
  { label: 'UI/UX', id: 'figma-works' },
  { label: 'Contact', id: 'contact', hideOnMobile: true },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Highlight the section that is crossing the middle of the viewport
  useEffect(() => {
    const sections = LINKS.map((link) => document.getElementById(link.id)).filter(
      (el): el is HTMLElement => el !== null,
    )
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' },
    )
    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  return (
    <motion.header
      className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <nav
        aria-label="Main"
        className={`inline-flex items-center gap-0.5 rounded-full border border-white/10 bg-surface p-2 backdrop-blur-md transition-shadow duration-300 ${
          scrolled ? 'shadow-lg shadow-black/40' : ''
        }`}
      >
        <button
          type="button"
          aria-label="Back to top"
          onClick={() => scrollToSection('hero')}
          className="group relative mr-1 h-9 w-9 flex-shrink-0"
        >
          <span className="accent-gradient absolute -inset-0.5 rounded-full" />
          <span className="absolute inset-0.5 flex items-center justify-center rounded-full bg-bg font-display text-[13px] italic transition-transform group-hover:scale-110">
            MC
          </span>
        </button>

        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        {LINKS.map((link) => (
          <button
            key={link.id}
            type="button"
            data-active={active === link.id}
            onClick={() => scrollToSection(link.id)}
            className={`nav-item ${link.hideOnMobile ? 'hidden sm:block' : ''}`}
          >
            {link.label}
          </button>
        ))}

        <span className="mx-1 hidden h-5 w-px bg-stroke sm:block" />

        <div className="grad-border">
          <button type="button" onClick={() => scrollToSection('contact')} className="nav-cta">
            Hire me
          </button>
        </div>
      </nav>
    </motion.header>
  )
}
