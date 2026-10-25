import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import SectionHeader from './SectionHeader'

const LINES = [
  { type: 'comment', text: '// mario-alexandru-culica.ts' },
  { type: 'blank', text: '' },
  { type: 'keyword', text: 'const', rest: ' developer = {' },
  { type: 'prop', text: '  name:', rest: ' "Mario Alexandru Culică",' },
  { type: 'prop', text: '  role:', rest: ' "Fullstack Developer",' },
  { type: 'prop', text: '  location:', rest: ' "Bucharest, Romania",' },
  { type: 'blank', text: '' },
  { type: 'prop', text: '  education:', rest: ' [' },
  { type: 'string', text: '    "BSc Economic Cybernetics — UB 2025",' },
  { type: 'string', text: '    "MSc Business Data Analytics — UB 2027",' },
  { type: 'close', text: '  ],' },
  { type: 'blank', text: '' },
  { type: 'prop', text: '  stack:', rest: ' [' },
  { type: 'string', text: '    "React", "Angular", "TypeScript",' },
  { type: 'string', text: '    "Python", "SQL", "REST APIs",' },
  { type: 'string', text: '    "Figma", "ML / Scikit-learn",' },
  { type: 'close', text: '  ],' },
  { type: 'blank', text: '' },
  { type: 'prop', text: '  certificates:', rest: ' [' },
  { type: 'string', text: '    "Meta Front-End Developer — 2025",' },
  { type: 'string', text: '    "Meta Back-End Developer — 2026",' },
  { type: 'string', text: '    "Webcase UI/UX Degree — 2026",' },
  { type: 'close', text: '  ],' },
  { type: 'blank', text: '' },
  { type: 'prop', text: '  awards:', rest: ' [' },
  { type: 'string', text: '    "🏆 Dream Team — Allianz Țiriac Hackathon 2025",' },
  { type: 'string', text: '    "🥇 1st Place — Academia de Asigurări 2026",' },
  { type: 'close', text: '  ],' },
  { type: 'blank', text: '' },
  { type: 'prop', text: '  passions:', rest: ' [' },
  { type: 'string', text: '    "💻 Web Development & UI/UX Design",' },
  { type: 'string', text: '    "🏋️  Fitness & Gym",' },
  { type: 'string', text: '    "🎮 Video Games",' },
  { type: 'string', text: '    "📚 Reading Books",' },
  { type: 'close', text: '  ],' },
  { type: 'blank', text: '' },
  { type: 'prop', text: '  available:', rest: ' true,' },
  { type: 'closing', text: '}' },
  { type: 'blank', text: '' },
  { type: 'func', text: 'console.log', rest: `("Let's build something together.")` },
]

const C: Record<string, string> = {
  comment: '#6A9955',
  keyword: '#569CD6',
  prop: '#9CDCFE',
  string: '#CE9178',
  func: '#DCDCAA',
  closing: '#D4D4D4',
  close: '#D4D4D4',
}

function renderLine(text: string, type: string, key: number) {
  if (type === 'blank') return <div key={key} style={{ height: '18px' }} />
  if (type === 'prop' && text.includes(':')) {
    const ci = text.indexOf(':')
    return (
      <div key={key} style={{ lineHeight: '1.75' }}>
        <span style={{ color: '#9CDCFE' }}>{text.slice(0, ci + 1)}</span>
        <span style={{ color: '#D4D4D4' }}>{text.slice(ci + 1)}</span>
      </div>
    )
  }
  if (type === 'keyword') {
    const si = text.indexOf(' ')
    return (
      <div key={key} style={{ lineHeight: '1.75' }}>
        <span style={{ color: '#569CD6' }}>{text.slice(0, si)}</span>
        <span style={{ color: '#D4D4D4' }}>{text.slice(si)}</span>
      </div>
    )
  }
  if (type === 'func') {
    const pi = text.indexOf('(')
    return (
      <div key={key} style={{ lineHeight: '1.75' }}>
        <span style={{ color: '#DCDCAA' }}>{text.slice(0, pi)}</span>
        <span style={{ color: '#D4D4D4' }}>(</span>
        <span style={{ color: '#CE9178' }}>{text.slice(pi + 1, -1)}</span>
        <span style={{ color: '#D4D4D4' }}>)</span>
      </div>
    )
  }
  return (
    <div key={key} style={{ lineHeight: '1.75', color: C[type] || '#D4D4D4' }}>
      {text}
    </div>
  )
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const termRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-120px' })

  const [done, setDone] = useState(false)
  const [started, setStarted] = useState(false)
  const [displayedLines, setDisplayedLines] = useState<{ text: string; type: string }[]>([])
  const [curLine, setCurLine] = useState(0)
  const [curChar, setCurChar] = useState(0)
  const [photoVisible, setPhotoVisible] = useState(false)

  useEffect(() => {
    if (isInView && !started) {
      setStarted(true)
      setTimeout(() => setPhotoVisible(true), 300)
    }
  }, [isInView, started])

  useEffect(() => {
    if (!started || done) return
    if (curLine >= LINES.length) {
      setDone(true)
      return
    }
    const line = LINES[curLine]
    const full =
      line.type === 'prop' || line.type === 'keyword' || line.type === 'func'
        ? line.text + (line.rest ?? '')
        : line.text
    if (line.type === 'blank') {
      const t = setTimeout(() => {
        setDisplayedLines((p) => [...p, { text: '', type: 'blank' }])
        setCurLine((l) => l + 1)
        setCurChar(0)
      }, 45)
      return () => clearTimeout(t)
    }
    if (curChar < full.length) {
      const t = setTimeout(() => setCurChar((c) => c + 1), 15)
      return () => clearTimeout(t)
    }
    const t = setTimeout(() => {
      setDisplayedLines((p) => [...p, { text: full, type: line.type }])
      setCurLine((l) => l + 1)
      setCurChar(0)
    }, 80)
    return () => clearTimeout(t)
  }, [started, curLine, curChar, done])

  useEffect(() => {
    if (termRef.current) termRef.current.scrollTop = termRef.current.scrollHeight
  }, [displayedLines, curChar])

  const curData = LINES[curLine]
  const curFull = curData
    ? curData.type === 'prop' || curData.type === 'keyword' || curData.type === 'func'
      ? curData.text + (curData.rest ?? '')
      : curData.text
    : ''
  const partialTxt = curFull.slice(0, curChar)

  return (
    <section id="about" style={{ background: 'hsl(var(--bg))', padding: '5rem 0' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1.5rem' }}>
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9 }}
        >
          <SectionHeader
            eyebrow="About me"
            title={
              <>
                Cine sunt <span className="font-display italic">eu</span>
              </>
            }
          />
        </motion.div>

        <div
          ref={sectionRef}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit,minmax(300px,1fr))',
            gap: '3rem',
            alignItems: 'start',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            <motion.div
              style={{
                position: 'relative',
                borderRadius: '24px',
                overflow: 'hidden',
                aspectRatio: '3/4',
                maxHeight: '500px',
                border: '1px solid hsl(var(--stroke))',
              }}
              initial={{ opacity: 0, y: 40 }}
              animate={photoVisible ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <img
                src="/mario.webp"
                alt="Mario Alexandru Culică"
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'top center',
                  animation: photoVisible ? 'photo-float 6s ease-in-out infinite' : 'none',
                }}
              />
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: '140px',
                  background: 'linear-gradient(to top, hsl(var(--bg)/0.85), transparent)',
                }}
              />
              <div style={{ position: 'absolute', bottom: '16px', left: '16px', right: '16px' }}>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    borderRadius: '9999px',
                    padding: '8px 16px',
                    border: '1px solid hsl(var(--stroke))',
                    backdropFilter: 'blur(12px)',
                    background: 'rgba(10,10,10,0.7)',
                  }}
                >
                  <span
                    style={{
                      width: '8px',
                      height: '8px',
                      borderRadius: '50%',
                      background: '#22c55e',
                      flexShrink: 0,
                      animation: 'pulse-dot 2s ease-in-out infinite',
                      boxShadow: '0 0 6px #22c55e',
                    }}
                  />
                  <span style={{ fontSize: '12px', color: 'hsl(var(--text))' }}>
                    Available for projects
                  </span>
                </div>
              </div>
              <div
                style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '24px',
                  boxShadow: 'inset 0 0 0 1px rgba(137,170,204,0.15)',
                  pointerEvents: 'none',
                }}
              />
            </motion.div>

            <motion.div
              style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.3 }}
            >
              <p style={{ fontSize: '14px', color: 'hsl(var(--muted))', lineHeight: 1.8 }}>
                Totul a început la liceu — primul contact cu{' '}
                <strong style={{ color: 'hsl(var(--text))' }}>C/C++</strong> m-a făcut să realizez
                că programarea nu e doar logică rece, ci o formă de exprimare personală. Am
                descoperit că fiecare developer lasă o{' '}
                <strong style={{ color: 'hsl(var(--text))' }}>amprentă unică</strong> în codul său —
                mai ales în UI/UX — și asta m-a fascinat imediat.
              </p>
              <p style={{ fontSize: '14px', color: 'hsl(var(--muted))', lineHeight: 1.8 }}>
                Am ales calea de{' '}
                <strong style={{ color: 'hsl(var(--text))' }}>Fullstack Developer</strong> pentru că
                nu mă mulțumesc să văd doar o parte din imagine. Îmi place să construiesc produse
                complete — de la interfața vizuală, până la logica din spate care o face să
                funcționeze.
              </p>
              <p style={{ fontSize: '14px', color: 'hsl(var(--muted))', lineHeight: 1.8 }}>
                În afara ecranului, mă regăsești la{' '}
                <strong style={{ color: 'hsl(var(--text))' }}>sală</strong> 🏋️, cufundat într-un{' '}
                <strong style={{ color: 'hsl(var(--text))' }}>joc video</strong> 🎮 sau citind o{' '}
                <strong style={{ color: 'hsl(var(--text))' }}>carte</strong> 📚. Cred că echilibrul
                dintre minte și corp e cheia pentru a produce lucruri cu adevărat bune.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', paddingTop: '8px' }}>
                {[
                  '📍 Bucharest',
                  '🎓 Univ. Bucharest',
                  '🏋️ Fitness',
                  '🎮 Gaming',
                  '📚 Reading',
                ].map((c) => (
                  <span
                    key={c}
                    style={{
                      fontSize: '12px',
                      color: 'hsl(var(--muted))',
                      padding: '6px 14px',
                      borderRadius: '9999px',
                      border: '1px solid hsl(var(--stroke))',
                      background: 'rgba(255,255,255,0.02)',
                    }}
                  >
                    {c}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1, delay: 0.2 }}
            style={{
              borderRadius: '16px',
              overflow: 'hidden',
              border: '1px solid hsl(var(--stroke))',
              position: 'sticky',
              top: '96px',
              boxShadow: '0 0 60px rgba(86,156,214,0.07),0 20px 60px rgba(0,0,0,0.4)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 16px',
                borderBottom: '1px solid hsl(var(--stroke))',
                background: '#1E1E1E',
              }}
            >
              <div style={{ display: 'flex', gap: '6px' }}>
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#FF5F56',
                  }}
                />
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#FFBD2E',
                  }}
                />
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    background: '#27C93F',
                  }}
                />
              </div>
              <div
                style={{
                  marginLeft: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '4px 12px',
                  borderRadius: '4px',
                  background: '#2D2D2D',
                  color: '#CCCCCC',
                  fontSize: '12px',
                }}
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  stroke="#569CD6"
                  strokeWidth="2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
                developer.ts
              </div>
              <div
                style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '12px' }}
              >
                <span style={{ fontSize: '11px', color: '#858585' }}>TypeScript</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      background: done ? '#27C93F' : '#FFBD2E',
                      boxShadow: done ? '0 0 6px #27C93F' : '0 0 6px #FFBD2E',
                      animation: done ? 'none' : 'pulse-dot 1s ease-in-out infinite',
                    }}
                  />
                  <span style={{ fontSize: '11px', color: '#858585' }}>
                    {done ? 'Done' : 'Typing...'}
                  </span>
                </div>
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                background: '#1E1E1E',
                minHeight: '480px',
                maxHeight: '580px',
              }}
            >
              <div
                style={{
                  userSelect: 'none',
                  padding: '16px 12px',
                  textAlign: 'right',
                  flexShrink: 0,
                  minWidth: '44px',
                  borderRight: '1px solid #2D2D2D',
                  color: '#4E4E4E',
                  fontFamily: '"Fira Code","Consolas",monospace',
                  fontSize: '13px',
                  lineHeight: '1.75',
                  overflowY: 'hidden',
                }}
              >
                {Array.from({ length: Math.max(displayedLines.length + 3, 28) }).map((_, i) => (
                  <div key={i}>{i + 1}</div>
                ))}
              </div>
              <div
                ref={termRef}
                style={{
                  flex: 1,
                  padding: '16px 20px',
                  overflowY: 'auto',
                  overflowX: 'auto',
                  fontFamily: '"Fira Code","Consolas",monospace',
                  fontSize: '13px',
                  lineHeight: '1.75',
                  color: '#D4D4D4',
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#3E3E3E #1E1E1E',
                }}
              >
                {displayedLines.map((l, i) => renderLine(l.text, l.type, i))}
                {!done && curLine < LINES.length && (
                  <div style={{ lineHeight: '1.75', display: 'flex', alignItems: 'center' }}>
                    {(() => {
                      const t = curData?.type ?? 'blank'
                      if (t === 'prop' && partialTxt.includes(':')) {
                        const ci = partialTxt.indexOf(':')
                        return (
                          <>
                            <span style={{ color: '#9CDCFE' }}>{partialTxt.slice(0, ci + 1)}</span>
                            <span style={{ color: '#D4D4D4' }}>{partialTxt.slice(ci + 1)}</span>
                          </>
                        )
                      }
                      if (t === 'keyword' && partialTxt.includes(' ')) {
                        const si = partialTxt.indexOf(' ')
                        return (
                          <>
                            <span style={{ color: '#569CD6' }}>{partialTxt.slice(0, si)}</span>
                            <span style={{ color: '#D4D4D4' }}>{partialTxt.slice(si)}</span>
                          </>
                        )
                      }
                      return <span style={{ color: C[t] || '#D4D4D4' }}>{partialTxt}</span>
                    })()}
                    <span
                      style={{
                        display: 'inline-block',
                        width: '2px',
                        height: '1.1em',
                        marginLeft: '1px',
                        background: '#AEAFAD',
                        animation: 'blink-cursor 1s step-end infinite',
                        verticalAlign: 'middle',
                      }}
                    />
                  </div>
                )}
                {done && (
                  <motion.div
                    style={{ marginTop: '4px', lineHeight: '1.75' }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                  >
                    <span style={{ color: '#858585' }}>▶ </span>
                    <span style={{ color: '#CE9178' }}>"Let's build something together."</span>
                  </motion.div>
                )}
              </div>
            </div>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: '6px 16px',
                background: '#007ACC',
                color: 'rgba(255,255,255,0.85)',
                fontSize: '11px',
              }}
            >
              <div style={{ display: 'flex', gap: '16px' }}>
                <span>⎇ main</span>
                <span>TypeScript</span>
              </div>
              <div style={{ display: 'flex', gap: '16px' }}>
                <span>UTF-8</span>
                <span>
                  Ln {displayedLines.length}, Col {curChar}
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
