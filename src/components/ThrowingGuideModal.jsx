// ThrowingGuideModal — GSWAP quick-reference guide for the Backhand Throw.
// Triggered before the quiz starts and via the "Study Guide" button during it.

import imgGripTop    from '../assets/grip-top.png'
import imgGripUnder  from '../assets/grip-under.png'
import imgStance     from '../assets/side-on-stance.png'
import imgWrist      from '../assets/wrist-snap.png'
import imgAngle      from '../assets/flat-angle.png'
import imgPoint      from '../assets/point-hand-at-target.png'

function GuideImage({ src, alt, className = '' }) {
  return (
    <img
      src={src}
      alt={alt}
      className={`w-full rounded-xl object-contain ${className}`}
      loading="lazy"
    />
  )
}

const STEPS = [
  {
    letter: 'G',
    word: 'Grip',
    accent: 'indigo',
    body: (
      <>
        <p className="font-body text-sm text-gray-700 leading-relaxed mb-3">
          Start from a fist around the edge of the disc. All four fingers curl under the rim, with
          your index finger running along the edge. Your thumb rests flat on top.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="bg-white rounded-xl border-2 border-indigo-200 p-2">
              <GuideImage src={imgGripUnder} alt="Fingers curled under the rim" />
            </div>
            <p className="font-display text-xs text-indigo-700 text-center">Fingers under the rim</p>
            <p className="font-body text-xs text-gray-500 text-center leading-snug">
              All four fingers curl under — index finger runs along the edge.
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="bg-white rounded-xl border-2 border-indigo-200 p-2">
              <GuideImage src={imgGripTop} alt="Thumb on top of disc" />
            </div>
            <p className="font-display text-xs text-indigo-700 text-center">Thumb on top</p>
            <p className="font-body text-xs text-gray-500 text-center leading-snug">
              Thumb rests flat on top — always.
            </p>
          </div>
        </div>
        <p className="font-body text-xs text-gray-400 mt-2 italic text-center">
          The disc should feel firm — not floppy.
        </p>
      </>
    ),
  },
  {
    letter: 'S',
    word: 'Stance',
    accent: 'lime',
    body: (
      <div className="flex gap-3 items-start">
        <div className="flex-shrink-0 w-28">
          <div className="bg-white rounded-xl border-2 border-lime-200 p-1.5">
            <GuideImage src={imgStance} alt="Side-on throwing stance illustration" />
          </div>
        </div>
        <p className="font-body text-sm text-gray-700 leading-relaxed">
          Turn <strong>side-on</strong> so your <strong>throwing shoulder points toward the
          target</strong>. Imagine a line from your back shoulder, through your throwing shoulder,
          straight to where you want the disc to go. Your front foot (throwing-arm side) steps
          toward the target; your back foot is the <strong>pivot</strong> — it stays planted.
          Knees slightly bent, weight balanced.
        </p>
      </div>
    ),
  },
  {
    letter: 'W',
    word: 'Wrist',
    accent: 'yellow',
    body: (
      <>
        <div className="bg-white rounded-xl border-2 border-yellow-200 p-2 mb-3">
          <GuideImage src={imgWrist} alt="Wrist snap motion diagram" className="max-h-32" />
        </div>
        <p className="font-body text-sm text-gray-700 leading-relaxed">
          Start with your wrist <strong>curled in</strong> toward your body. As you release, snap
          it away. That snap puts spin on the disc — and <em>spin is everything</em>. No snap = no
          spin = wobbly throw that goes nowhere.
        </p>
      </>
    ),
  },
  {
    letter: 'A',
    word: 'Angle',
    accent: 'orange',
    body: (
      <div className="flex gap-3 items-start">
        <div className="flex-shrink-0 w-28">
          <div className="bg-white rounded-xl border-2 border-orange-200 overflow-hidden">
            <GuideImage src={imgAngle} alt="Player releasing disc flat" className="object-cover aspect-square" />
          </div>
        </div>
        <p className="font-body text-sm text-gray-700 leading-relaxed">
          The disc should leave your hand <strong>flat — level with the ground</strong>. The
          angle at release is the angle it flies. Tilted up in front sends it high and far off
          target. As you improve, try small tilts to see how they change the flight path.
        </p>
      </div>
    ),
  },
  {
    letter: 'P',
    word: 'Point',
    accent: 'pink',
    body: (
      <>
        <div className="bg-white rounded-xl border-2 border-pink-200 p-2 mb-3">
          <GuideImage src={imgPoint} alt="Follow-through — point hand at target diagram" className="max-h-44" />
        </div>
        <p className="font-body text-sm text-gray-700 leading-relaxed">
          During the throw, swing your arm toward the target and finish with your arm
          extended and hand <strong>pointing at your target</strong>. The follow-through is
          part of the throw — not something that happens after it. Full follow-through = full
          power + full accuracy.
        </p>
      </>
    ),
  },
]

const ACCENT = {
  indigo: { header: 'bg-indigo-800', light: 'bg-indigo-50', border: 'border-indigo-200' },
  lime:   { header: 'bg-lime-500',   light: 'bg-lime-50',   border: 'border-lime-200'   },
  yellow: { header: 'bg-yellow-500', light: 'bg-yellow-50', border: 'border-yellow-200' },
  orange: { header: 'bg-orange-500', light: 'bg-orange-50', border: 'border-orange-200' },
  pink:   { header: 'bg-pink-500',   light: 'bg-pink-50',   border: 'border-pink-200'   },
}

export default function ThrowingGuideModal({ onClose, startLabel = 'Got it — back to the quiz!' }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Backhand Throw Study Guide"
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-[#1E1B4B]/80 backdrop-blur-sm"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sheet */}
      <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden card-shadow flex flex-col max-h-[92vh]">

        {/* Header */}
        <div className="bg-indigo-600 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <p className="font-display text-white text-xl leading-none">Backhand Throw</p>
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
            onClick={onClose}
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
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-display text-lg transition-colors btn-press"
          >
            {startLabel}
          </button>
        </div>
      </div>
    </div>
  )
}
