import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { gsap } from 'gsap'
import HLSVideo from './HLSVideo'
import { SITE, STATS } from '../data/site'

const GMAIL_COMPOSE = `https://mail.google.com/mail/?view=cm&fs=1&to=${SITE.email}&su=${encodeURIComponent('Salut, Mario!')}`

const SOCIALS = [
  { label: 'GH', title: 'GitHub', href: SITE.github },
  { label: 'LI', title: 'LinkedIn', href: SITE.linkedin },
  { label: 'FG', title: 'Figma', href: SITE.figma },
].filter((social) => social.href)

export default function Contact() {
  const contentRef = useRef<HTMLDivElement>(null)
  const marqueeRef = useRef<HTMLDivElement>(null)
  const inView = useInView(contentRef, { once: true, margin: '-80px' })
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!marqueeRef.current) return
    const ctx = gsap.context(() => {
      gsap.to(marqueeRef.current, { xPercent: -50, duration: 40, ease: 'none', repeat: -1 })
    })
    return () => ctx.revert()
  }, [])

  // A mailto: link only works if the visitor has a mail app set up, so
  // we also offer Gmail and a plain "copy address" button.
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(SITE.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      // Clipboard can be blocked; the address is visible on screen anyway.
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden bg-bg pb-12 pt-20">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <HLSVideo
          className="absolute left-1/2 top-1/2 min-h-full min-w-full object-cover"
          flipped
        />
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div ref={contentRef} className="relative z-10">
        <motion.div
          className="mx-auto mb-16 max-w-[1200px] px-6"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <div className="grid grid-cols-3 gap-6 border-y border-white/[0.08] py-10 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="accent-text font-display text-[clamp(2.5rem,6vw,4.5rem)] italic leading-none">
                  {stat.value}
                </div>
                <div className="mt-2 text-[11px] uppercase tracking-[0.15em] text-muted">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="mb-16 overflow-hidden" aria-hidden="true">
          <div ref={marqueeRef} className="flex whitespace-nowrap will-change-transform">
            {Array.from({ length: 12 }).map((_, i) => (
              <span
                key={i}
                className="select-none pr-6 font-display text-[clamp(2rem,5vw,3.5rem)] italic text-text-primary/5"
              >
                BUILDING THE FUTURE •
              </span>
            ))}
          </div>
        </div>

        <motion.div
          className="mb-16 px-6 text-center"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.1 }}
        >
          <p className="mb-6 text-[10px] uppercase tracking-[0.3em] text-muted">Get in touch</p>
          <h2 className="text-[clamp(2rem,5vw,3.5rem)] leading-tight text-text-primary">
            Ai un proiect?
          </h2>
          <h2 className="mb-10 font-display text-[clamp(2rem,5vw,3.5rem)] italic leading-tight text-text-primary">
            Hai să construim ceva.
          </h2>
          <p className="mx-auto mb-10 max-w-sm text-sm text-muted">
            Disponibil pentru proiecte freelance, colaborări și oportunități full-time.
          </p>

          <div className="grad-border inline-flex">
            <a
              href={`mailto:${SITE.email}`}
              className="relative inline-flex items-center gap-3 rounded-full border border-white/10 bg-[rgba(20,20,20,0.6)] px-8 py-4 text-base text-text-primary no-underline backdrop-blur-md"
            >
              {SITE.email} ↗
            </a>
          </div>

          <div className="mt-5 flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            <a className="text-btn" href={GMAIL_COMPOSE} target="_blank" rel="noopener noreferrer">
              Deschide în Gmail ↗
            </a>
            <button type="button" className="text-btn" onClick={copyEmail}>
              {copied ? 'Copiat ✓' : 'Copiază adresa'}
            </button>
            <a className="text-btn" href={`tel:${SITE.phone}`}>
              {SITE.phoneLabel}
            </a>
          </div>
        </motion.div>

        <motion.div
          className="mx-auto max-w-[1200px] px-6"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-white/[0.07] pt-8">
            <div className="flex gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={social.title}
                  aria-label={social.title}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-stroke text-[11px] text-muted no-underline transition-colors hover:border-muted hover:text-text-primary"
                >
                  {social.label}
                </a>
              ))}
            </div>

            <div className="flex items-center gap-2 text-sm text-muted">
              <span
                className="h-2 w-2 rounded-full bg-[#22c55e]"
                style={{
                  animation: 'pulse-dot 2s ease-in-out infinite',
                  boxShadow: '0 0 6px #22c55e',
                }}
              />
              Disponibil pentru proiecte
            </div>

            <p className="text-xs text-muted">© 2026 {SITE.name}</p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
