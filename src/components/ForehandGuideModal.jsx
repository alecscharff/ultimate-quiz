// ForehandGuideModal — GLADS quick-reference guide for the Forehand Throw.
// Triggered before Quiz 5 and via the "Study Guide" button during it.

import { useEffect, useRef, useState } from 'react'

// ─── GIF duration helper ──────────────────────────────────────────────────────
// Parses Graphics Control Extension blocks from the GIF binary to sum frame
// delays (stored in centiseconds) and return total duration in milliseconds.
function parseGifDurationMs(bytes) {
  let ms = 0
  for (let i = 0; i < bytes.length - 8; i++) {
    if (bytes[i] === 0x21 && bytes[i + 1] === 0xF9 && bytes[i + 2] === 0x04) {
      ms += (bytes[i + 4] + bytes[i + 5] * 256) * 10
    }
  }
  return ms || 3000 // fallback 3 s if no delay info found
}

// ─── GifPlayer ───────────────────────────────────────────────────────────────
// Shows the first frame as a static poster (via canvas). Tap to play the
// animation; it stops automatically after one full loop.
function GifPlayer({ src, alt, className = '' }) {
  const [playing,     setPlaying]     = useState(false)
  const [posterReady, setPosterReady] = useState(false)
  const [durationMs,  setDurationMs]  = useState(null)
  const canvasRef = useRef(null)
  const timerRef  = useRef(null)

  // On mount: capture first frame via Image, and parse GIF duration via fetch.
  useEffect(() => {
    let alive = true

    const img = new Image()
    img.onload = () => {
      if (!alive) return
      const canvas = canvasRef.current
      if (!canvas) return
      canvas.width  = img.naturalWidth
      canvas.height = img.naturalHeight
      canvas.getContext('2d').drawImage(img, 0, 0)
      setPosterReady(true)
    }
    img.src = src

    fetch(src)
      .then(r => r.arrayBuffer())
      .then(buf => { if (alive) setDurationMs(parseGifDurationMs(new Uint8Array(buf))) })
      .catch(() => { if (alive) setDurationMs(3000) })

    return () => {
      alive = false
      clearTimeout(timerRef.current)
    }
  }, [src])

  function handleTap() {
    if (playing) {
      clearTimeout(timerRef.current)
      setPlaying(false)
    } else {
      setPlaying(true)
      timerRef.current = setTimeout(() => setPlaying(false), durationMs ?? 3000)
    }
  }

  return (
    <div
      className={`relative cursor-pointer select-none rounded-lg overflow-hidden bg-gray-50 ${className}`}
      onClick={handleTap}
      role="button"
      aria-label={playing ? 'Stop animation' : 'Play animation'}
    >
      {/* Canvas holds the first frame — visible only when paused and ready */}
      <canvas
        ref={canvasRef}
        className="w-full block"
        style={{ display: !playing && posterReady ? 'block' : 'none' }}
      />

      {/* GIF only mounted while playing — forces restart from frame 1 each time */}
      {playing && (
        <img src={src} alt={alt} className="w-full block" />
      )}

      {/* Spinner while first frame is loading */}
      {!playing && !posterReady && (
        <div className="w-full h-24 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-gray-200 border-t-gray-400 rounded-full animate-spin" />
        </div>
      )}

      {/* Tap-to-play overlay on the poster */}
      {!playing && posterReady && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 bg-black/20">
          <div className="w-11 h-11 rounded-full bg-white/95 flex items-center justify-center shadow-md">
            <svg className="w-5 h-5 text-emerald-700 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
          <span className="font-body font-bold text-white text-xs drop-shadow-md">Tap to play</span>
        </div>
      )}

      {/* Tap-to-stop badge while playing */}
      {playing && (
        <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/50 rounded-full px-2.5 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
          <span className="font-body text-white text-xs font-bold">Tap to stop</span>
        </div>
      )}
    </div>
  )
}

// ─── PlaceholderAsset ─────────────────────────────────────────────────────────
// Renders a styled placeholder div until the real image/GIF asset is ready.
function PlaceholderAsset({ emoji = '📸', label, className = '' }) {
  return (
    <div
      className={`w-full rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 flex flex-col items-center justify-center gap-2 py-6 px-4 ${className}`}
    >
      <span className="text-3xl" role="img" aria-hidden="true">{emoji}</span>
      <p className="font-body text-xs text-gray-400 text-center leading-snug">{label}</p>
    </div>
  )
}

// ─── Guide sections ───────────────────────────────────────────────────────────
const STEPS = [
  {
    letter: 'G',
    word: 'Grip',
    accent: 'emerald',
    body: (
      <>
        <p className="font-body text-sm text-gray-700 leading-relaxed mb-3">
          <strong>Shake hands with the disc.</strong> Standard grip: two fingers inside the rim,
          two on the outside. Thumb rests on top.
        </p>
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex flex-col gap-1.5">
            {/* TODO: replace with <GifPlayer src={imgStandardGrip} alt="Standard forehand grip — two fingers inside rim, two outside" /> once asset is ready */}
            <PlaceholderAsset emoji="📸" label="Standard forehand grip — two fingers inside rim, two outside" />
          </div>
          <div className="flex flex-col gap-1.5">
            {/* TODO: replace with <GifPlayer src={imgPeaceSignGrip} alt="Peace sign grip — index and middle fingers along inside rim" /> once asset is ready */}
            <PlaceholderAsset emoji="📸" label="Peace sign grip — index and middle fingers along inside rim" />
          </div>
        </div>
        <p className="font-body text-xs text-gray-500 leading-relaxed">
          If you&apos;re still building strength, try the <strong>peace sign grip</strong> — split
          your index and middle fingers along the inside of the rim. Transition to the standard grip
          as your grip gets stronger.
        </p>
      </>
    ),
  },
  {
    letter: 'L',
    word: 'Lock it',
    accent: 'teal',
    body: (
      <>
        <p className="font-body text-sm text-gray-700 leading-relaxed mb-3">
          The disc <strong>shouldn&apos;t budge</strong> on a fake. Test it before you throw —
          shake the disc gently. If it moves, tighten up.
        </p>
        {/* TODO: replace with <GifPlayer src={imgShakeTest} alt="Shaking the disc to test grip — disc stays put" /> once asset is ready */}
        <PlaceholderAsset emoji="🎬" label="Shaking the disc to test grip — disc stays put" />
      </>
    ),
  },
  {
    letter: 'A',
    word: 'Aim',
    accent: 'lime',
    body: (
      <>
        <p className="font-body text-sm text-gray-700 leading-relaxed mb-3">
          <strong>Chest faces target</strong> — the opposite of the backhand! Step out with your
          free foot toward the target just before you throw.
        </p>
        {/* TODO: replace with <GifPlayer src={imgForehandStance} alt="Forehand stance — chest to target, step out with free foot" /> once asset is ready */}
        <PlaceholderAsset emoji="🎬" label="Forehand stance — chest to target, step out with free foot" />
      </>
    ),
  },
  {
    letter: 'D',
    word: 'Disc angle',
    accent: 'orange',
    body: (
      <>
        <p className="font-body text-sm text-gray-700 leading-relaxed mb-3">
          The disc must stay <strong>parallel to the ground</strong> throughout the entire throw.
          Any tilt = off-course throw.
        </p>
        {/* TODO: replace with <GuideImage src={imgDiscAngle} alt="Disc held parallel to ground — flat angle throughout throw" /> once asset is ready */}
        <PlaceholderAsset emoji="📸" label="Disc held parallel to ground — flat angle throughout throw" />
      </>
    ),
  },
  {
    letter: 'S',
    word: 'Snap',
    accent: 'yellow',
    body: (
      <>
        <p className="font-body text-sm text-gray-700 leading-relaxed mb-3">
          Wrist <strong>bends back first</strong>, then snaps forward — like flicking something icky
          off your fingers.
        </p>
        {/* TODO: replace with <GuideImage src={imgWristSnap} alt="Wrist loaded back, ready to snap forward" /> once asset is ready */}
        <PlaceholderAsset emoji="📸" label="Wrist loaded back, ready to snap forward" className="mb-3" />
        <p className="font-body text-xs text-gray-500 leading-relaxed">
          Best drill: practice <strong>wrist-only throws</strong> before adding your arm. If you can
          throw 10 feet with just your wrist, you&apos;ve got the snap.
        </p>
      </>
    ),
  },
]

const ACCENT = {
  emerald: { header: 'bg-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-200' },
  teal:    { header: 'bg-teal-500',    light: 'bg-teal-50',    border: 'border-teal-200'    },
  lime:    { header: 'bg-lime-500',    light: 'bg-lime-50',    border: 'border-lime-200'    },
  orange:  { header: 'bg-orange-500',  light: 'bg-orange-50',  border: 'border-orange-200'  },
  yellow:  { header: 'bg-yellow-500',  light: 'bg-yellow-50',  border: 'border-yellow-200'  },
}

export default function ForehandGuideModal({ onClose, startLabel = 'Got it — back to the quiz!', targetRect = null }) {
  const sheetRef  = useRef(null)
  const [closing,   setClosing]   = useState(false)
  const [exitStyle, setExitStyle] = useState({})

  function handleClose() {
    if (closing) return
    if (targetRect && sheetRef.current) {
      const sheet = sheetRef.current.getBoundingClientRect()
      const tx = (targetRect.left + targetRect.width  / 2) - (sheet.left + sheet.width  / 2)
      const ty = (targetRect.top  + targetRect.height / 2) - (sheet.top  + sheet.height / 2)
      setExitStyle({
        transform: `translate(${tx}px, ${ty}px) scale(0.05)`,
        opacity: 0,
        transition: 'transform 0.35s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease-in',
        pointerEvents: 'none',
      })
    } else {
      setExitStyle({
        transform: 'scale(0.05)',
        opacity: 0,
        transition: 'transform 0.3s ease-in, opacity 0.25s ease-in',
        pointerEvents: 'none',
      })
    }
    setClosing(true)
    setTimeout(onClose, 360)
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Forehand Throw Study Guide"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1E1B4B]/80 backdrop-blur-sm transition-opacity duration-300"
        style={{ opacity: closing ? 0 : undefined }}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div
        ref={sheetRef}
        style={exitStyle}
        className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden card-shadow flex flex-col max-h-[92vh]"
      >
        {/* Header */}
        <div className="bg-emerald-600 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <p className="font-display text-white text-xl leading-none">Forehand Throw</p>
            <div className="flex gap-1.5 mt-1.5">
              {STEPS.map(({ letter, accent }) => (
                <span
                  key={letter}
                  className={`${ACCENT[accent].header} font-display text-white text-xs w-6 h-6 rounded-lg flex items-center justify-center`}
                >
                  {letter}
                </span>
              ))}
            </div>
          </div>
          <button
            onClick={handleClose}
            className="w-9 h-9 rounded-xl bg-white/20 hover:bg-white/30 flex items-center justify-center text-white transition-colors"
            aria-label="Close guide"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Scrollable content */}
        <div className="overflow-y-auto flex-1 px-5 py-5 space-y-4">

          {/* Intro section — full-width, no letter tile */}
          <div className="rounded-2xl border-2 border-emerald-200 bg-emerald-50 overflow-hidden">
            <div className="bg-emerald-600 px-4 py-2">
              <span className="font-display text-white text-base">The Forehand (Flick)</span>
            </div>
            <div className="px-4 py-3">
              <p className="font-body text-sm text-gray-700 leading-relaxed mb-3">
                Ultimate players need to throw from both sides of their body. The forehand —
                also called the &ldquo;flick&rdquo; — might seem tricky at first, but many players
                find it easier to master than the backhand!
              </p>
              {/* TODO: replace with <GifPlayer src={imgForehandAction} alt="Awesome forehand flick throw in action" /> once asset is ready */}
              <PlaceholderAsset emoji="🎬" label="Awesome forehand flick throw in action" />
            </div>
          </div>

          {STEPS.map(({ letter, word, accent, body }) => {
            const { header, light, border } = ACCENT[accent]
            return (
              <div key={letter} className={`rounded-2xl border-2 ${border} ${light} overflow-hidden`}>
                <div className={`${header} px-4 py-2 flex items-center gap-2`}>
                  <span className="font-display text-white text-2xl leading-none w-7 text-center">
                    {letter}
                  </span>
                  <span className="font-display text-white text-base">{word}</span>
                </div>
                <div className="px-4 py-3">{body}</div>
              </div>
            )
          })}

          <p className="font-body text-xs text-gray-400 text-center pb-1">
            This is an open-book quiz — refer back anytime!
          </p>
        </div>

        {/* Sticky close/start button */}
        <div className="flex-shrink-0 px-5 pb-5 pt-3 border-t border-gray-100">
          <button
            onClick={handleClose}
            className="w-full py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-display text-lg transition-colors btn-press"
          >
            {startLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
