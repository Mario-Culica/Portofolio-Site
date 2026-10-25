import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import HLSVideo from './HLSVideo'
import { scrollToSection } from '../lib/scroll'

const ROLES = ['Fullstack Developer', 'Frontend Developer', 'UI/UX Designer', 'Data Analyst']

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap
        .timeline({ delay: 0.1 })
        .fromTo(
          '.name-reveal',
          { opacity: 0, y: 50 },
          { opacity: 1, y: 0, duration: 1.2, ease: 'power3.out' },
          0.1,
        )
        .fromTo(
          '.blur-in',
          { opacity: 0, filter: 'blur(10px)', y: 20 },
          { opacity: 1, filter: 'blur(0px)', y: 0, duration: 1, stagger: 0.1, ease: 'power3.out' },
          0.3,
        )
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => setRoleIndex((i) => (i + 1) % ROLES.length), 2200)
    return () => clearInterval(timer)
  }, [])

  return (
    <section
      id="hero"
      ref={sectionRef}
      className="relative flex h-screen w-full items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0 overflow-hidden">
        <HLSVideo className="absolute left-1/2 top-1/2 min-h-full min-w-full -translate-x-1/2 -translate-y-1/2 object-cover" />
      </div>
      <div className="absolute inset-0 bg-black/40" />
      <div className="absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-bg to-transparent" />

      <div className="relative z-10 mx-auto max-w-5xl px-6 text-center">
        <p className="blur-in mb-8 text-xs uppercase tracking-[0.3em] text-muted">
          Fullstack Developer · Bucharest 2026
        </p>

        <h1 className="name-reveal mb-6 font-display text-[clamp(3rem,9vw,7.5rem)] italic leading-[0.9] tracking-tight text-text-primary">
          Mario Alexandru
          <br />
          Culică
        </h1>

        <p className="blur-in mb-4 text-sm text-muted md:text-base">
          Open to roles as a{' '}
          <span
            key={roleIndex}
            className="inline-block font-display italic text-text-primary"
            style={{ animation: 'role-fade 0.4s ease forwards' }}
          >
            {ROLES[roleIndex]}
          </span>
        </p>

        <p className="blur-in mx-auto mb-12 max-w-md text-sm text-muted md:text-base">
          Building modern web applications with React, Angular, Python & REST APIs. Passionate about
          efficient, scalable solutions and great UI.
        </p>

        <div className="blur-in inline-flex flex-wrap justify-center gap-4">
          <div className="grad-border">
            <button
              type="button"
              onClick={() => scrollToSection('works')}
              className="relative rounded-full bg-text-primary px-7 py-3.5 text-sm font-medium text-bg transition-transform duration-300 hover:scale-105"
            >
              See Projects
            </button>
          </div>
          <div className="grad-border">
            <button
              type="button"
              onClick={() => scrollToSection('contact')}
              className="relative rounded-full border-2 border-stroke bg-bg px-7 py-3.5 text-sm text-text-primary transition-transform duration-300 hover:scale-105"
            >
              Hire me
            </button>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">Scroll</span>
        <div className="relative h-10 w-px overflow-hidden bg-stroke">
          <div
            className="accent-gradient absolute h-full w-full"
            style={{ animation: 'scroll-down 1.5s ease-in-out infinite' }}
          />
        </div>
      </div>
    </section>
  )
}
