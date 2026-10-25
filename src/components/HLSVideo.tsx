import { useEffect, useRef, useState } from 'react'
import Hls from 'hls.js'

const SRC = 'https://stream.mux.com/Aa02T7oM1wH5Mk5EEVDYhbZ1ChcdhRsS2m1NYyx4Ua1g.m3u8'

/* Fundal de rezerva (stele care se misca) — se vede doar cat timp
   videoul nu porneste, sau daca stream-ul nu poate fi incarcat. */
function StarField({ active }: { active: boolean }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!active) return
    const canvas = ref.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const stars = Array.from({ length: 170 }, () => ({
      x: Math.random(),
      y: Math.random(),
      z: Math.random() * 0.8 + 0.2,
    }))
    let raf = 0

    const resize = () => {
      canvas.width = canvas.clientWidth
      canvas.height = canvas.clientHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const draw = () => {
      const { width: w, height: h } = canvas
      const bg = ctx.createRadialGradient(
        w * 0.5,
        h * 0.55,
        0,
        w * 0.5,
        h * 0.55,
        Math.max(w, h) * 0.8,
      )
      bg.addColorStop(0, '#0b1730')
      bg.addColorStop(1, '#030409')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, w, h)

      for (const s of stars) {
        s.x -= 0.00012 * s.z
        if (s.x < 0) {
          s.x = 1
          s.y = Math.random()
        }
        ctx.globalAlpha = 0.35 + s.z * 0.65
        ctx.fillStyle = '#cfe0ff'
        ctx.beginPath()
        ctx.arc(s.x * w, s.y * h, s.z * 1.5, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [active])

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  )
}

export default function HLSVideo({
  className = '',
  flipped = false,
}: {
  className?: string
  flipped?: boolean
}) {
  const ref = useRef<HTMLVideoElement>(null)
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return

    const onPlaying = () => setPlaying(true)
    video.addEventListener('playing', onPlaying)

    let hls: Hls | null = null
    let retries = 0

    if (Hls.isSupported()) {
      // hls.js primul (ordinea recomandata de documentatie), nativ doar ca rezerva
      hls = new Hls({ enableWorker: false })
      hls.on(Hls.Events.ERROR, (_evt, data) => {
        console.warn('[HLS]', data.type, data.details, 'fatal:', data.fatal)
        if (!data.fatal || !hls) return
        if (data.type === Hls.ErrorTypes.NETWORK_ERROR && retries < 3) {
          retries++
          hls.startLoad()
        } else if (data.type === Hls.ErrorTypes.MEDIA_ERROR && retries < 3) {
          retries++
          hls.recoverMediaError()
        } else {
          console.error('[HLS] stream-ul nu poate fi redat — se foloseste fundalul de rezerva')
          hls.destroy()
          hls = null
        }
      })
      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        video.play().catch((err) => console.warn('[HLS] play() respins:', err))
      })
      hls.loadSource(SRC)
      hls.attachMedia(video)
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = SRC
      video.play().catch((err) => console.warn('[HLS] play() respins:', err))
    } else {
      console.error('[HLS] acest browser nu poate reda HLS')
    }

    // Important: curatam la unmount, altfel React StrictMode creeaza 2 instante pe acelasi <video>
    return () => {
      video.removeEventListener('playing', onPlaying)
      hls?.destroy()
    }
  }, [])

  return (
    <>
      <StarField active={!playing} />
      <video
        ref={ref}
        autoPlay
        muted
        loop
        playsInline
        className={className}
        style={{
          opacity: playing ? 1 : 0,
          transition: 'opacity 1s ease',
          ...(flipped ? { transform: 'translate(-50%,-50%) scaleY(-1)' } : {}),
        }}
      />
    </>
  )
}
