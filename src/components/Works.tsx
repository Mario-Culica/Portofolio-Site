import { useRef, type CSSProperties } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeader from './SectionHeader'
import { SITE } from '../data/site'

type Project = {
  title: string
  description: string
  tags: string[]
  image: string
  imagePosition?: string
  span: number // columns out of 12 on tablet and up
  ratio: string
  link?: string
}

const PROJECTS: Project[] = [
  {
    title: 'Little Taco Shop',
    description: 'Site de restaurant cu meniu, ore de funcționare și pagină de contact.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/1.webp',
    span: 5,
    ratio: '4 / 5',
    link: 'https://github.com/Mario-Culica/The-Little-Taco-Shop-Project',
  },
  {
    title: 'ML Income Dashboard',
    description: 'Dashboard interactiv pentru compararea modelelor ML pe UCI Adult Income dataset.',
    tags: ['Python', 'Scikit-learn', 'Streamlit'],
    image: '/projects/4.webp',
    span: 7,
    ratio: '16 / 10',
    link: 'https://github.com/Mario-Culica/Machine-Learning---Adult-Income-Pipeline',
  },
  {
    title: 'Little Lemon Restaurant',
    description:
      'Website complet pentru restaurant cu pagini de meniu, rezervări și program de funcționare.',
    tags: ['HTML', 'CSS', 'JavaScript'],
    image: '/projects/3.webp',
    span: 8,
    ratio: '5 / 3',
  },
  {
    title: 'Sistem Gestiune Farmacie',
    description:
      'Aplicație CLI pentru gestionarea produselor, rafturilor și achizițiilor unei farmacii.',
    tags: ['C++', 'OOP', 'CLI'],
    image: '/projects/2.webp',
    span: 4,
    ratio: '4 / 5',
  },
  {
    title: 'People Count App',
    description: 'Aplicație web pentru numărarea persoanelor cu istoric salvat și resetare.',
    tags: ['JavaScript', 'HTML', 'CSS'],
    image: '/projects/5.webp',
    imagePosition: 'center',
    span: 6,
    ratio: '16 / 9',
    link: 'https://github.com/Mario-Culica/People-Count-Project',
  },
  {
    title: 'Restaurant Sections',
    description:
      'Secțiuni complete de restaurant — meniu cu prețuri, recenzii clienți și card-uri de produse.',
    tags: ['React', 'JavaScript', 'CSS'],
    image: '/projects/6.webp',
    span: 6,
    ratio: '16 / 9',
    link: 'https://github.com/Mario-Culica/2026-Meta-Frontend-Capstone',
  },
]

export default function Works() {
  const headerRef = useRef<HTMLDivElement>(null)
  const inView = useInView(headerRef, { once: true, margin: '-100px' })

  return (
    <section id="works" className="bg-[hsl(0_0%_6%)] py-20">
      <div className="mx-auto max-w-[1200px] px-6">
        <motion.div
          ref={headerRef}
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
        >
          <SectionHeader
            eyebrow="Selected Work"
            title={
              <>
                Featured <span className="font-display italic">projects</span>
              </>
            }
            description="Proiecte reale — de la concept la lansare."
            action={
              <a className="ghost-btn" href={SITE.github} target="_blank" rel="noopener noreferrer">
                View on GitHub →
              </a>
            }
          />
        </motion.div>

        <div className="bento">
          {PROJECTS.map((project, i) => {
            const cardProps = {
              className: 'bento-card',
              style: { '--span': project.span, '--ratio': project.ratio } as CSSProperties,
              initial: { opacity: 0, y: 40 },
              animate: inView ? { opacity: 1, y: 0 } : {},
              transition: { duration: 0.8, delay: i * 0.1 },
            }

            const content = (
              <>
                <img
                  className="card-image"
                  src={project.image}
                  alt={`Screenshot ${project.title}`}
                  loading="lazy"
                  style={{ objectPosition: project.imagePosition ?? 'top center' }}
                />

                <div className="card-label">
                  <div className="mb-1.5 flex flex-wrap gap-1">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="rounded-full bg-[rgba(137,170,204,0.15)] px-2 py-0.5 text-[9px] uppercase tracking-widest text-[rgba(137,170,204,0.9)]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <p className="text-[13px] font-semibold text-white">{project.title}</p>
                </div>

                <div className="card-overlay">
                  <p className="max-w-[220px] text-[13px] leading-relaxed text-muted">
                    {project.description}
                  </p>
                  {project.link && (
                    <span className="relative">
                      <span className="accent-gradient absolute -inset-0.5 rounded-full" />
                      <span className="relative block rounded-full bg-surface px-5 py-2.5 text-xs font-medium text-white">
                        View — <span className="font-display italic">{project.title}</span>
                      </span>
                    </span>
                  )}
                </div>
              </>
            )

            return project.link ? (
              <motion.a
                key={project.title}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                {...cardProps}
              >
                {content}
              </motion.a>
            ) : (
              <motion.div key={project.title} {...cardProps}>
                {content}
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
