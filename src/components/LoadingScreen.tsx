import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

const WORDS = ['Design', 'Code', 'Build']

export default function LoadingScreen({ onComplete }: { onComplete: () => void }) {
  const [count, setCount] = useState(0)
  const [wordIndex, setWordIndex] = useState(0)
  const rafRef = useRef<number>(0)
  const startRef = useRef<number>(0)

  useEffect(() => {
    const wi = setInterval(() => setWordIndex((i) => (i + 1) % WORDS.length), 900)
    const tick = (now: number) => {
      if (!startRef.current) startRef.current = now
      const p = Math.min((now - startRef.current) / 2700, 1)
      setCount(Math.floor(p * 100))
      if (p < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        clearInterval(wi)
        setTimeout(onComplete, 400)
      }
    }
    rafRef.current = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(rafRef.current)
      clearInterval(wi)
    }
  }, [onComplete])

  return (
    <div
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: 'hsl(var(--bg))' }}
    >
      <motion.span
        className="absolute top-8 left-8 text-xs uppercase tracking-[0.3em]"
        style={{ color: 'hsl(var(--muted))' }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        Mario Alexandru Culică
      </motion.span>

      <div className="h-20 flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.span
            key={wordIndex}
            className="font-display italic"
            style={{ fontSize: 'clamp(2.5rem,6vw,5rem)', color: 'hsl(var(--text)/0.8)' }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35 }}
          >
            {WORDS[wordIndex]}
          </motion.span>
        </AnimatePresence>
      </div>

      <motion.div
        className="absolute bottom-12 right-8 font-display tabular-nums leading-none"
        style={{ fontSize: 'clamp(4rem,10vw,8rem)', color: 'hsl(var(--text))' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
      >
        {String(count).padStart(3, '0')}
      </motion.div>

      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ background: 'hsl(var(--stroke)/0.5)' }}
      >
        <div
          className="h-full origin-left accent-gradient"
          style={{
            transform: `scaleX(${count / 100})`,
            transition: 'transform 0.05s linear',
            boxShadow: '0 0 8px rgba(137,170,204,0.4)',
          }}
        />
      </div>
    </div>
  )
}
