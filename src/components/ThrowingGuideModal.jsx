// ThrowingGuideModal — GSWAP quick-reference guide for the Backhand Throw
// Shown before or during Quiz 3 via a "Study Guide" button.
// Drop grip-basic.jpg and grip-power.jpg into /public to enable the photos.

const STEPS = [
  {
    letter: 'G',
    word: 'Grip',
    color: 'bg-indigo-600',
    lightColor: 'bg-indigo-50',
    borderColor: 'border-indigo-200',
    textColor: 'text-indigo-700',
    body: (
      <>
        <p className="font-body text-sm text-gray-700 leading-relaxed">
          Start by making a fist around the edge of the disc. There are two grips to try:
        </p>
        <div className="mt-3 grid grid-cols-2 gap-3">
          <GripCard
            label="Basic Grip"
            description="Index finger along the rim, middle finger underneath or curled under, thumb on top."
            imgSrc="/grip-basic.jpg"
          />
          <GripCard
            label="Power Grip"
            description="All fingers curled under the rim for extra power. Thumb still on top."
            imgSrc="/grip-power.jpg"
          />
        </div>
        <p className="font-body text-xs text-gray-500 mt-2 italic">
          Try both and use whichever feels most comfortable and firm.
        </p>
      </>
    ),
  },
  {
    letter: 'S',
    word: 'Stance',
    color: 'bg-lime-500',
    lightColor: 'bg-lime-50',
    borderColor: 'border-lime-200',
    textColor: 'text-lime-700',
    body: (
      <p className="font-body text-sm text-gray-700 leading-relaxed">
        Turn <strong>side-on</strong> so your throwing arm is closer to your target. Imagine a line
        running from your back shoulder, through your throwing shoulder, and straight out to where
        you want the disc to go. Your throwing arm starts relaxed in front of your body, ready to
        swing. Keep your knees slightly bent and weight balanced.
      </p>
    ),
  },
  {
    letter: 'W',
    word: 'Wrist',
    color: 'bg-yellow-500',
    lightColor: 'bg-yellow-50',
    borderColor: 'border-yellow-200',
    textColor: 'text-yellow-700',
    body: (
      <p className="font-body text-sm text-gray-700 leading-relaxed">
        <strong>Load:</strong> bend your wrist toward your body as your arm swings back.{' '}
        <strong>Snap:</strong> at the moment of release, snap your wrist away from your body. That
        snap is what puts spin on the disc — and <em>spin is vital</em>. A disc with good spin flies
        flat and straight. No snap = wobbly throw that goes nowhere.
      </p>
    ),
  },
  {
    letter: 'A',
    word: 'Angle',
    color: 'bg-orange-500',
    lightColor: 'bg-orange-50',
    borderColor: 'border-orange-200',
    textColor: 'text-orange-700',
    body: (
      <p className="font-body text-sm text-gray-700 leading-relaxed">
        The disc should leave your hand <strong>flat</strong> — or very slightly nose-down. The
        angle at release is the angle it flies. Nose-up sends the disc high and far off target.
        As you get more comfortable, try tilting slightly to see how it changes the flight path.
      </p>
    ),
  },
  {
    letter: 'P',
    word: 'Point',
    color: 'bg-pink-500',
    lightColor: 'bg-pink-50',
    borderColor: 'border-pink-200',
    textColor: 'text-pink-700',
    body: (
      <p className="font-body text-sm text-gray-700 leading-relaxed">
        After you release, keep your arm swinging forward and{' '}
        <strong>point your hand at your target</strong>. Don&apos;t stop the motion at your wrist.
        Think of throwing <em>through</em> the target, not just <em>to</em> it. Full follow-through
        = full power + full accuracy.
      </p>
    ),
  },
]

function GripCard({ label, description, imgSrc }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-full aspect-square rounded-xl overflow-hidden bg-indigo-100 border-2 border-indigo-200 flex items-center justify-center">
        <img
          src={imgSrc}
          alt={label}
          className="w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = 'none'
            e.target.nextSibling.style.display = 'flex'
          }}
        />
        {/* Shown only if image fails to load */}
        <div
          className="hidden w-full h-full items-center justify-center flex-col gap-1 p-2"
          aria-hidden="true"
        >
          <span className="text-3xl">🤚</span>
          <span className="font-body text-xs text-indigo-400 text-center leading-tight">
            {label} photo
          </span>
        </div>
      </div>
      <p className="font-display text-xs text-indigo-700 text-center">{label}</p>
      <p className="font-body text-xs text-gray-500 text-center leading-snug">{description}</p>
    </div>
  )
}

export default function ThrowingGuideModal({ onClose }) {
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
      <div className="relative w-full sm:max-w-lg bg-white rounded-t-3xl sm:rounded-3xl overflow-hidden card-shadow flex flex-col max-h-[90vh]">

        {/* Header */}
        <div className="bg-indigo-600 px-6 py-4 flex items-center justify-between flex-shrink-0">
          <div>
            <p className="font-display text-white text-xl leading-none">Backhand Throw</p>
            <p className="font-body text-indigo-300 text-sm mt-0.5">
              G · S · W · A · P quick guide
            </p>
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
          {STEPS.map(({ letter, word, color, lightColor, borderColor, textColor, body }) => (
            <div
              key={letter}
              className={`rounded-2xl border-2 ${borderColor} ${lightColor} overflow-hidden`}
            >
              <div className={`${color} px-4 py-2 flex items-center gap-2`}>
                <span className="font-display text-white text-2xl leading-none w-7 text-center">
                  {letter}
                </span>
                <span className="font-display text-white text-base">{word}</span>
              </div>
              <div className="px-4 py-3">{body}</div>
            </div>
          ))}

          <p className="font-body text-xs text-gray-400 text-center pb-2">
            This is an open-book quiz — refer back anytime!
          </p>
        </div>

        {/* Sticky close button */}
        <div className="flex-shrink-0 px-5 pb-5 pt-3 border-t border-gray-100">
          <button
            onClick={onClose}
            className="w-full py-3.5 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-display text-lg transition-colors btn-press"
          >
            Got it — back to the quiz!
          </button>
        </div>
      </div>
    </div>
  )
}
