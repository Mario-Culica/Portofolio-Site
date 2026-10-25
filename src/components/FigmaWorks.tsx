import { useRef, type CSSProperties } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { SITE } from '../data/site'

type Design = {
  title: string
  category: string
  description: string
  image: string
  imagePosition?: string
  span: number
  ratio: string
}

const DESIGNS: Design[] = [
  {
    title: 'Flora',
    category: 'Florărie · UI Design',
    description:
      'Landing page elegant pentru o florărie — dark theme, aranjamente florale și call-to-action simplu.',
    image: '/figma/1.webp',
    span: 8,
    ratio: '5 / 3',
  },
  {
    title: 'DayVet',
    category: 'Clinică Veterinară · UI Design',
    description:
      'Site modern pentru o clinică veterinară — design curat, light theme și programare online.',
    image: '/figma/2.webp',
    span: 4,
    ratio: '4 / 5',
  },
  {
    title: 'Yelenium',
    category: 'Yoga & Wellness · UI Design',
    description:
      'Website pentru sesiuni de yoga — paleta naturală, secțiuni de clase și programare vizită.',
    image: '/figma/3.webp',
    imagePosition: 'center 30%',
    span: 4,
    ratio: '4 / 5',
  },
  {
    title: 'FurDeco',
    category: 'Mobilă & Decor · UI Design',
    description:
      'E-commerce de mobilă premium — colecții, produse populare și design inspirat din lemn natural.',
    image: '/figma/4.webp',
    imagePosition: 'center',
    span: 8,
    ratio: '5 / 3',
  },
  {
    title: 'AirFix',
    category: 'Smart Home · UI Design',
    description:
      'Site de prezentare pentru umidificatoare smart — hero impactant, catalog produse și secțiune About.',
    image: '/figma/5.webp',
    imagePosition: 'center',
    span: 6,
    ratio: '4 / 3',
  },
  {
    title: 'FitLife',
    category: 'Fitness & Gym · UI Design',
    description:
      'Aplicație web pentru un gym modern — dark theme, autentificare și hero motivațional.',
    image: '/figma/6.webp',
    span: 6,
    ratio: '4 / 3',
  },
]

function FigmaLogo() {
  return (
    <svg width="13" height="13" viewBox="0 0 38 57" fill="none" aria-hidden="true">
      <path d="M19 28.5A9.5 9.5 0 1 1 28.5 19 9.5 9.5 0 0 1 19 28.5z" fill="#1ABCFE" />
      <path d="M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z" fill="#0ACF83" />
      <path d="M19 0v19h9.5a9.5 9.5 0 0 0 0-19z" fill="#FF7262" />
      <path d="M0 9.5a9.5 9.5 0 0 0 9.5 9.5H19V0H9.5A9.5 9.5 0 0 0 0 9.5z" fill="#F24E1E" />
      <path d="M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z" fill="#A259FF" />
    </svg>
  )
}

export default function FigmaWorks() {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-80px' })

  return (
    <section id="figma-works" className="bg-bg py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          ref={headerRef}
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <SectionHeader
            eyebrow="UI / UX Design"
            title={
              <>
                Lucrările mele <span className="font-display italic">Figma</span>
              </>
            }
            description="Prototipuri și interfețe UI/UX realizate în Figma — florărie, clinică, yoga, mobilă, smart home și gym."
            action={
              <a className="ghost-btn" href={SITE.figma} target="_blank" rel="noopener noreferrer">
                <FigmaLogo />
                View on Figma ↗
              </a>
            }
          />
        </motion.div>

        <div className="bento">
          {DESIGNS.map((design, i) => (
            <motion.div
              key={design.title}
              className="bento-card"
              style={{ '--span': design.span, '--ratio': design.ratio } as CSSProperties}
              initial={{ opacity: 0, y: 40 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: i * 0.1 }}
            >
              <img
                className="card-image"
                src={design.image}
                alt={`Design ${design.title}`}
                loading="lazy"
                style={{ objectPosition: design.imagePosition ?? 'top center' }}
              />

              <div className="card-label">
                <p className="mb-1 text-[9px] uppercase tracking-[0.2em] text-white/45">
                  {design.category}
                </p>
                <p className="text-sm font-semibold text-white">{design.title}</p>
              </div>

              <div className="card-overlay">
                <p className="text-[9px] uppercase tracking-[0.25em] text-[rgba(137,170,204,0.8)]">
                  {design.category}
                </p>
                <p className="font-display text-lg italic leading-tight text-white">
                  {design.title}
                </p>
                <p className="max-w-[220px] text-[13px] leading-relaxed text-muted">
                  {design.description}
                </p>
                <a
                  href={SITE.figma}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative mt-1 no-underline"
                >
                  <span className="accent-gradient absolute -inset-0.5 rounded-full" />
                  <span className="relative block rounded-full bg-surface px-5 py-2.5 text-xs font-medium text-white">
                    Deschide în Figma ↗
                  </span>
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
