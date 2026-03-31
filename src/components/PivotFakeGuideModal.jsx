// PivotFakeGuideModal — study guide for Pivot & Fake (Level 4 cert).
// Triggered before Quiz 6 and via the "Study Guide" button during it.

import { useEffect, useRef, useState } from 'react'
import imgPivotFoot from '../assets/pivot_foot.jpg'
import gifDumpPass        from '../assets/quiz6/dump-pass.gif'
import gifFakeEmOut       from '../assets/quiz6/fake-em-out.gif'
import gifFakeHighThrowLow from '../assets/quiz6/fake-high-throw-low.gif'
import gifPracticePivotFake from '../assets/quiz6/practice-pivot-fake.gif'

// ─── GIF duration helper ──────────────────────────────────────────────────────
function parseGifDurationMs(bytes) {
  let ms = 0
  for (let i = 0; i < bytes.length - 8; i++) {
    if (bytes[i] === 0x21 && bytes[i + 1] === 0xF9 && bytes[i + 2] === 0x04) {
      ms += (bytes[i + 4] + bytes[i + 5] * 256) * 10
    }
  }
  return ms || 3000
}

// ─── GifPlayer ───────────────────────────────────────────────────────────────
function GifPlayer({ src, alt, className = '' }) {
  const [playing,     setPlaying]     = useState(false)
  const [posterReady, setPosterReady] = useState(false)
  const [durationMs,  setDurationMs]  = useState(null)
  const canvasRef = useRef(null)
  const timerRef  = useRef(null)

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
      <canvas
        ref={canvasRef}
        className="w-full block"
        style={{ display: !playing && posterReady ? 'block' : 'none' }}
      />
      {playing && <img src={src} alt={alt} className="w-full block" />}
      {!playing && !posterReady && (
        <div className="w-full h-24 flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-gray-200 border-t-gray-400 rounded-full animate-spin" />
        </div>
      )}
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
      {playing && (
        <div className="absolute bottom-2 right-2 flex items-center gap-1.5 bg-black/50 rounded-full px-2.5 py-1">
          <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse inline-block" />
          <span className="font-body text-white text-xs font-bold">Tap to stop</span>
        </div>
      )}
    </div>
  )
}

// ─── Guide sections ───────────────────────────────────────────────────────────
const STEPS = [
  {
    emoji: '🧠',
    word: 'Stay Calm — Find the Dump',
    accent: 'indigo',
    body: (
      <>
        <p className="font-body text-sm text-gray-700 leading-relaxed">
          It can feel stressful to throw when someone is right in your face! Good players stay
          calm and use their skills. When the count gets close to 10, look for a nearby teammate
          and throw them an easy <strong>"dump" pass</strong> to start the count over.
        </p>
        <GifPlayer src={gifDumpPass} alt="Player finds a nearby teammate for a dump pass" className="mt-3" />
      </>
    ),
  },
  {
    emoji: '🦶',
    word: 'Use Your Pivot Foot',
    accent: 'violet',
    body: (
      <>
        <p className="font-body text-sm text-gray-700 leading-relaxed mb-1">
          Keep one foot planted on the ground — that&apos;s your <strong>pivot foot</strong>.
          Then step out wide to the left or right with your other foot. This creates space
          around the defender so you can throw!
        </p>
        <p className="font-body text-sm font-bold text-violet-700 mb-3">
          One foot stays, one foot moves!
        </p>
        <img
          src={imgPivotFoot}
          alt="Pivot foot — one foot planted, one foot stepping wide"
          className="w-full rounded-xl"
        />
      </>
    ),
  },
  {
    emoji: '🎭',
    word: 'Fake \'Em Out!',
    accent: 'purple',
    body: (
      <>
        <p className="font-body text-sm text-gray-700 leading-relaxed">
          Move your body quickly to one side like you&apos;re going to throw, but{' '}
          <strong>don&apos;t let go!</strong> The defender will jump that way. Now throw to
          the other side, where they left an opening.
        </p>
        <GifPlayer src={gifFakeEmOut} alt="Thrower fakes and the defender jumps, opening the other side" className="mt-3" />
      </>
    ),
  },
  {
    emoji: '↕️',
    word: 'Fake Low, Throw High',
    accent: 'pink',
    body: (
      <>
        <p className="font-body text-sm text-gray-700 leading-relaxed">
          Pretend you&apos;re about to throw up high, then send it low instead. Or pretend
          you&apos;re throwing low, then send it high! The defender chases the fake — and your
          real throw goes right past them. <strong>Fake high, throw low. Fake low, throw high!</strong>
        </p>
        <GifPlayer src={gifFakeHighThrowLow} alt="Fake high throw low — defender moves up, throw goes low" className="mt-3" />
      </>
    ),
  },
  {
    emoji: '🖐️',
    word: 'Learn Two Throws',
    accent: 'teal',
    body: (
      <p className="font-body text-sm text-gray-700 leading-relaxed">
        When practicing, keep working on both your <strong>backhand</strong> and{' '}
        <strong>forehand</strong> throws so that you can throw from either side of your body.
        If you only have one throw, the defender just blocks it — two throws means they
        can&apos;t stop you!
      </p>
    ),
  },
  {
    emoji: '🔄',
    word: 'Always Practice Faking & Pivoting',
    accent: 'emerald',
    body: (
      <>
        <p className="font-body text-sm text-gray-700 leading-relaxed">
          Whenever you practice your throws, be sure to practice your faking and pivoting too.
          Faking and pivoting are <strong>the most important skills</strong> for being a great thrower.
        </p>
        <GifPlayer src={gifPracticePivotFake} alt="Players practicing pivot and fake drills" className="mt-3" />
      </>
    ),
  },
]

const ACCENT = {
  indigo:  { header: 'bg-indigo-600',  light: 'bg-indigo-50',  border: 'border-indigo-200'  },
  violet:  { header: 'bg-violet-600',  light: 'bg-violet-50',  border: 'border-violet-200'  },
  purple:  { header: 'bg-purple-600',  light: 'bg-purple-50',  border: 'border-purple-200'  },
  pink:    { header: 'bg-pink-500',    light: 'bg-pink-50',    border: 'border-pink-200'    },
  teal:    { header: 'bg-teal-500',    light: 'bg-teal-50',    border: 'border-teal-200'    },
  emerald: { header: 'bg-emerald-600', light: 'bg-emerald-50', border: 'border-emerald-200' },
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
          {STEPS.map(({ emoji, word, accent, body }) => {
            const { header, light, border } = ACCENT[accent]
            return (
              <div key={word} className={`rounded-2xl border-2 ${border} ${light} overflow-hidden`}>
                <div className={`${header} px-4 py-2 flex items-center gap-2`}>
                  <span className="font-display text-white text-xl leading-none w-7 text-center">
                    {emoji}
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
            className="w-full py-3.5 rounded-2xl bg-violet-600 hover:bg-violet-500 text-white font-display text-lg transition-colors btn-press"
          >
            {startLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
