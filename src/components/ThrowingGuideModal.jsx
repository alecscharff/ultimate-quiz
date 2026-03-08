// ThrowingGuideModal — GSWAP quick-reference guide for the Backhand Throw.
// Triggered before the quiz starts and via the "Study Guide" button during it.

const base = import.meta.env.BASE_URL

function GuideImage({ file, alt, className = '' }) {
  return (
    <img
      src={`${base}${file}`}
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
          Start with a fist around the edge of the disc. There are two grips — try both and use
          whichever feels most firm and comfortable.
        </p>
        <div className="grid grid-cols-2 gap-3">
          <div className="flex flex-col gap-1.5">
            <div className="bg-white rounded-xl border-2 border-indigo-200 p-2">
              <GuideImage file="grip-top.png" alt="Grip view from top — thumb on top of disc" />
            </div>
            <p className="font-display text-xs text-indigo-700 text-center">Thumb on top</p>
            <p className="font-body text-xs text-gray-500 text-center leading-snug">
              Index finger along the rim, thumb resting flat on top.
            </p>
          </div>
          <div className="flex flex-col gap-1.5">
            <div className="bg-white rounded-xl border-2 border-indigo-200 p-2">
              <GuideImage file="grip-under.png" alt="Grip view from underneath — fingers curled under rim" />
            </div>
            <p className="font-display text-xs text-indigo-700 text-center">Fingers under the rim</p>
            <p className="font-body text-xs text-gray-500 text-center leading-snug">
              Middle finger (and others) curl under the rim for control.
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
            <GuideImage file="side-on-stance.png" alt="Side-on throwing stance illustration" />
          </div>
        </div>
        <p className="font-body text-sm text-gray-700 leading-relaxed">
          Turn <strong>side-on</strong> with your throwing arm closer to the target. Imagine a line
          from your back shoulder, through your throwing shoulder, out to where you want the disc to
          go. Start with your throwing arm relaxed in front, ready to swing. Knees slightly bent,
          weight balanced.
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
          <GuideImage file="wrist-snap.png" alt="Wrist snap motion diagram" className="max-h-32" />
        </div>
        <p className="font-body text-sm text-gray-700 leading-relaxed">
          <strong>Load:</strong> bend your wrist toward your body as your arm swings.{' '}
          <strong>Snap:</strong> at the moment of release, snap your wrist away from your body.
          That snap puts spin on the disc — and <em>spin is vital</em>. No snap = wobbly throw that
          goes nowhere.
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
            <GuideImage file="flat-angle.png" alt="Player releasing disc flat" className="object-cover aspect-square" />
          </div>
        </div>
        <p className="font-body text-sm text-gray-700 leading-relaxed">
          The disc should leave your hand <strong>flat</strong> — or very slightly nose-down. The
          angle at release is the angle it flies. Nose-up sends it high and far off target.
          As you improve, experiment with tilt to see how it curves the flight path.
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
          <GuideImage file="point-hand-at-target.png" alt="Follow-through — point hand at target diagram" className="max-h-44" />
        </div>
        <p className="font-body text-sm text-gray-700 leading-relaxed">
          After you release, keep your arm swinging forward and{' '}
          <strong>point your hand at your target</strong>. Don&apos;t stop the motion at your wrist.
          Think of throwing <em>through</em> the target, not just <em>to</em> it. Full
          follow-through = full power + full accuracy.
        </p>
      </>
    ),
  },
]

const ACCENT = {
  indigo: { header: 'bg-indigo-600', light: 'bg-indigo-50', border: 'border-indigo-200' },
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
