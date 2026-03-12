// PancakeCatchGuideModal — study guide for the Pancake Catch (Level 2 cert).
// Triggered before Quiz 4 and via the "Study Guide" button during it.

import { useEffect, useRef, useState } from 'react'
import imgCoolCatch    from '../assets/cool-catch.gif'
import imgCatchingZone from '../assets/catching-zone.gif'
import imgPancakeEyes  from '../assets/pancake-eyes.gif'
import imgMoveToDisc   from '../assets/move-to-disc.gif'
import imgCutToDisc    from '../assets/cut-to-disc.gif'
import imgPancakePalm  from '../assets/pancake-palm.gif'

// ─── GifPlayer ───────────────────────────────────────────────────────────────
// Shows the first frame as a static poster (via canvas). Tap to play the
// animation; tap again to stop and reset to the first frame.
function GifPlayer({ src, alt, className = '' }) {
  const [playing,     setPlaying]     = useState(false)
  const [posterReady, setPosterReady] = useState(false)
  const canvasRef = useRef(null)

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
    return () => { alive = false }
  }, [src])

  return (
    <div
      className={`relative cursor-pointer select-none rounded-lg overflow-hidden bg-gray-50 ${className}`}
      onClick={() => setPlaying(p => !p)}
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
            <svg className="w-5 h-5 text-indigo-700 translate-x-0.5" fill="currentColor" viewBox="0 0 24 24">
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

// ─── Guide sections ───────────────────────────────────────────────────────────
const STEPS = [
  {
    letter: '🥏',
    word: 'The Pancake Catch',
    accent: 'lime',
    body: (
      <>
        <div className="border-2 border-lime-200 rounded-xl overflow-hidden mb-3">
          <GifPlayer src={imgCoolCatch} alt="Pancake catch in action" />
        </div>
        <p className="font-body text-sm text-gray-700 leading-relaxed">
          The pancake catch is the <strong>easiest and most reliable</strong> catch in ultimate — for
          beginners and experienced players alike. Hold your <strong>bottom hand palm-up like a tray</strong>,
          top hand palm-down like a lid. As the disc arrives, <strong>close both hands around it</strong> and
          pull it into your chest. Simple, solid, dependable.
        </p>
      </>
    ),
  },
  {
    letter: '🐊',
    word: 'Alligator Mouth',
    accent: 'teal',
    body: (
      <>
        <div className="border-2 border-teal-200 rounded-xl overflow-hidden mb-3">
          <GifPlayer src={imgPancakeEyes} alt="Forearms closing like an alligator mouth to catch the disc" />
        </div>
        <p className="font-body text-sm text-gray-700 leading-relaxed">
          Think of your <strong>forearms as the jaws of an alligator</strong> — they close on
          the disc by hinging at the elbow. Flapping your whole arms from the shoulder makes
          the catch slow and harder to control. Keep your elbows bent and in front of you and
          let the forearms do the work.
        </p>
      </>
    ),
  },
  {
    letter: '↕',
    word: 'Catching Zone',
    accent: 'indigo',
    body: (
      <>
        <div className="border-2 border-indigo-200 rounded-xl overflow-hidden mb-3">
          <GifPlayer src={imgCatchingZone} alt="Catching zone between waist and chin height" />
        </div>
        <p className="font-body text-sm text-gray-700 leading-relaxed">
          The pancake works best when the disc is thrown <strong>between your waist and chin
          height</strong>. That&apos;s your sweet spot — meet it with both hands, then{' '}
          <strong>pull it in toward your chest</strong> to lock it down securely.
        </p>
      </>
    ),
  },
  {
    letter: '👀',
    word: 'Watch the Disc',
    accent: 'yellow',
    body: (
      <>
        <div className="border-2 border-yellow-200 rounded-xl overflow-hidden mb-3">
          <GifPlayer src={imgPancakeEyes} alt="Eyes tracking the disc into the catch" />
        </div>
        <p className="font-body text-sm text-gray-700 leading-relaxed">
          <strong>ALWAYS</strong> keep your eyes on the disc until it is firmly under your
          control. Watch it all the way into your hands — don&apos;t look away early. Most drops
          happen in the last second when players stop watching.
        </p>
      </>
    ),
  },
  {
    letter: '🏃',
    word: 'Move to the Disc',
    accent: 'orange',
    body: (
      <>
        <div className="border-2 border-orange-200 rounded-xl overflow-hidden mb-3">
          <GifPlayer src={imgMoveToDisc} alt="Player moving feet to get chest behind the disc" />
        </div>
        <p className="font-body text-sm text-gray-700 leading-relaxed">
          Get your <strong>chest right behind the disc</strong>. If the throw is off, move your feet
          to get there — step, jump, or slide. Don&apos;t just reach with your arms. Your whole body
          is your catching tool.
        </p>
      </>
    ),
  },
  {
    letter: '⚡',
    word: 'Cut to the Disc',
    accent: 'pink',
    body: (
      <>
        <div className="border-2 border-pink-200 rounded-xl overflow-hidden mb-3">
          <GifPlayer src={imgCutToDisc} alt="Player cutting hard toward the disc" />
        </div>
        <p className="font-body text-sm text-gray-700 leading-relaxed">
          In a game, <strong>running toward the disc</strong> makes you more likely to get it before
          an opponent. Don&apos;t wait — cut hard and early. The player who moves first wins the disc.
        </p>
      </>
    ),
  },
  {
    letter: '✋',
    word: 'Show Your Palm',
    accent: 'teal',
    body: (
      <>
        <div className="border-2 border-teal-200 rounded-xl overflow-hidden mb-3">
          <GifPlayer src={imgPancakePalm} alt="Hand showing palm facing the disc" />
        </div>
        <p className="font-body text-sm text-gray-700 leading-relaxed">
          Worried about jamming your fingertips? Instead of pointing your fingers straight at the
          disc, <strong>turn your hand so your palm faces the disc</strong> as you wait for it. The
          disc hits your palm — not the tips of your fingers.
        </p>
      </>
    ),
  },
]

const ACCENT = {
  lime:   { header: 'bg-lime-500',   light: 'bg-lime-50',   border: 'border-lime-200'   },
  indigo: { header: 'bg-indigo-600', light: 'bg-indigo-50', border: 'border-indigo-200' },
  yellow: { header: 'bg-yellow-500', light: 'bg-yellow-50', border: 'border-yellow-200' },
  orange: { header: 'bg-orange-500', light: 'bg-orange-50', border: 'border-orange-200' },
  pink:   { header: 'bg-pink-500',   light: 'bg-pink-50',   border: 'border-pink-200'   },
  teal:   { header: 'bg-teal-500',   light: 'bg-teal-50',   border: 'border-teal-200'   },
}

export default function PancakeCatchGuideModal({ onClose, startLabel = 'Got it — back to the quiz!', targetRect = null }) {
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
      aria-label="Pancake Catch Study Guide"
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
        <div className="bg-lime-500 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <p className="font-display text-white text-xl leading-none">Pancake Catch</p>
            <p className="font-body text-lime-100 text-xs mt-1">Level 2 Certification</p>
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

          <p className="font-body text-xs text-gray-400 text-center pb-1">
            This is an open-book quiz — refer back anytime!
          </p>
        </div>

        {/* Sticky close/start button */}
        <div className="flex-shrink-0 px-5 pb-5 pt-3 border-t border-gray-100">
          <button
            onClick={handleClose}
            className="w-full py-3.5 rounded-2xl bg-lime-500 hover:bg-lime-400 text-white font-display text-lg transition-colors btn-press"
          >
            {startLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
