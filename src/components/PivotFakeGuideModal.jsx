// PivotFakeGuideModal — study guide for Pivot & Fake (Level 4 cert).
// Triggered before Quiz 6 and via the "Study Guide" button during it.

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
            <svg className="w-5 h-5 text-violet-700 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
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
    letter: '🦶',
    word: 'Pivot Foot',
    accent: 'violet',
    body: (
      <>
        <p className="font-body text-sm text-gray-700 leading-relaxed mb-3">
          The foot <strong>opposite your throwing hand</strong> is your pivot foot — it stays
          planted while you hold the disc. <strong>Lift it = travel.</strong>
        </p>
        {/* TODO: replace with <PlaceholderAsset> or real img once asset is ready */}
        <PlaceholderAsset emoji="📸" label="Pivot foot diagram — throwing hand right, left foot planted" />
      </>
    ),
  },
  {
    letter: '🔭',
    word: 'Face Up Field',
    accent: 'indigo',
    body: (
      <p className="font-body text-sm text-gray-700 leading-relaxed">
        After catching, turn to <strong>face up field</strong> — toward the end zone you&apos;re
        attacking. This gives you the best view of all your options: cutters, open lanes, and
        the whole offense spread out in front of you.
      </p>
    ),
  },
  {
    letter: '🎭',
    word: 'Sell the Fake',
    accent: 'purple',
    body: (
      <>
        <p className="font-body text-sm text-gray-700 leading-relaxed mb-3">
          A fake only works if the defender believes it. <strong>Full arm, shoulder, and hip
          commitment</strong> — make it look exactly like a real throw.
        </p>
        {/* TODO: replace with <GifPlayer src={imgBhFake} alt="Convincing backhand fake — full body commitment" /> once asset is ready */}
        <PlaceholderAsset emoji="🎬" label="Convincing backhand fake — full body commitment" />
      </>
    ),
  },
  {
    letter: '👁',
    word: 'Eye Contact',
    accent: 'pink',
    body: (
      <p className="font-body text-sm text-gray-700 leading-relaxed">
        Don&apos;t stare at your real target too early — the defense will read your eyes. Wait
        until <strong>just before release</strong> to look at who you&apos;re throwing to.
      </p>
    ),
  },
  {
    letter: '⚡',
    word: 'One Good Fake',
    accent: 'teal',
    body: (
      <>
        <p className="font-body text-sm text-gray-700 leading-relaxed mb-3">
          One convincing fake is enough. Too many fakes wastes your stall count and gives the
          defense time to recover. <strong>Fake → Pivot → Throw.</strong>
        </p>
        {/* TODO: replace with <GifPlayer src={imgFakePivotThrow} alt="One fake, pivot, throw — full combo" /> once asset is ready */}
        <PlaceholderAsset emoji="🎬" label="One fake, pivot, throw — full combo" />
      </>
    ),
  },
]

const FAKE_TYPES = [
  {
    letter: '↔',
    word: 'Backhand → Forehand Fake',
    accent: 'emerald',
    body: (
      <>
        <p className="font-body text-sm text-gray-700 leading-relaxed mb-3">
          Pump the backhand to move the defender one way, then <strong>pivot to throw forehand</strong> the
          other way.
        </p>
        {/* TODO: replace with <GifPlayer src={imgBhFhFake} alt="Backhand-forehand fake combo" /> once asset is ready */}
        <PlaceholderAsset emoji="🎬" label="Backhand-forehand fake combo" />
      </>
    ),
  },
  {
    letter: '↕',
    word: 'Forehand → Forehand Fake',
    accent: 'orange',
    body: (
      <>
        <p className="font-body text-sm text-gray-700 leading-relaxed mb-3">
          Fake forehand <strong>high</strong> (or outside), then deliver forehand <strong>low</strong> (or
          inside). Same arm, different target.
        </p>
        {/* TODO: replace with <GifPlayer src={imgFhFhFake} alt="Forehand-forehand fake — high to low" /> once asset is ready */}
        <PlaceholderAsset emoji="🎬" label="Forehand-forehand fake — high to low" />
      </>
    ),
  },
]

const ACCENT = {
  violet:  { header: 'bg-violet-600',  light: 'bg-violet-50',  border: 'border-violet-200'  },
  indigo:  { header: 'bg-indigo-600',  light: 'bg-indigo-50',  border: 'border-indigo-200'  },
  purple:  { header: 'bg-purple-600',  light: 'bg-purple-50',  border: 'border-purple-200'  },
  pink:    { header: 'bg-pink-500',    light: 'bg-pink-50',    border: 'border-pink-200'    },
  teal:    { header: 'bg-teal-500',    light: 'bg-teal-50',    border: 'border-teal-200'    },
  emerald: { header: 'bg-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-200' },
  orange:  { header: 'bg-orange-500',  light: 'bg-orange-50',  border: 'border-orange-200'  },
}

export default function PivotFakeGuideModal({ onClose, startLabel = 'Got it — back to the quiz!', targetRect = null }) {
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
      aria-label="Pivot and Fake Study Guide"
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
        <div className="bg-violet-600 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <p className="font-display text-white text-xl leading-none">Pivot &amp; Fake</p>
            <p className="font-body text-violet-100 text-xs mt-1">Level 4 Certification</p>
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

          {/* Core pivot & fake steps */}
          {STEPS.map(({ letter, word, accent, body }) => {
            const { header, light, border } = ACCENT[accent]
            return (
              <div key={word} className={`rounded-2xl border-2 ${border} ${light} overflow-hidden`}>
                <div className={`${header} px-4 py-2 flex items-center gap-2`}>
                  <span className="font-display text-white text-xl leading-none w-7 text-center">
                    {letter}
                  </span>
                  <span className="font-display text-white text-base">{word}</span>
                </div>
                <div className="px-4 py-3">{body}</div>
              </div>
            )
          })}

          {/* Fake types section divider */}
          <div className="pt-1">
            <p className="font-display text-sm text-gray-400 uppercase tracking-wider mb-3 px-1">
              Fake Types
            </p>
            {FAKE_TYPES.map(({ letter, word, accent, body }) => {
              const { header, light, border } = ACCENT[accent]
              return (
                <div key={word} className={`rounded-2xl border-2 ${border} ${light} overflow-hidden mb-4`}>
                  <div className={`${header} px-4 py-2 flex items-center gap-2`}>
                    <span className="font-display text-white text-xl leading-none w-7 text-center">
                      {letter}
                    </span>
                    <span className="font-display text-white text-base">{word}</span>
                  </div>
                  <div className="px-4 py-3">{body}</div>
                </div>
              )
            })}
          </div>

          <p className="font-body text-xs text-gray-400 text-center pb-1">
            This is an open-book quiz — refer back anytime!
          </p>
        </div>

        {/* Sticky close/start button */}
        <div className="flex-shrink-0 px-5 pb-5 pt-3 border-t border-gray-100">
          <button
            onClick={handleClose}
            className="w-full py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-display text-lg transition-colors btn-press"
          >
            {startLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
