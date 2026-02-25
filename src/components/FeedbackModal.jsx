import { useEffect, useState } from 'react'

// ─── A single confetti particle ─────────────────────────────────────────────
function Confetto({ style }) {
  return (
    <div
      className="absolute w-3 h-3 rounded-sm animate-confetti-fall pointer-events-none"
      style={style}
      aria-hidden="true"
    />
  )
}

const CONFETTI_COLORS = ['#A3E635', '#818CF8', '#F472B6', '#FB923C', '#34D399', '#FCD34D']

// ─── FeedbackModal ──────────────────────────────────────────────────────────
/**
 * Props:
 *   isCorrect    – boolean
 *   coachTip     – string
 *   correctAnswer – string (shown when wrong)
 *   onNext       – () => void
 *   isLast       – boolean (changes button label)
 */
export default function FeedbackModal({ isCorrect, coachTip, correctAnswer, onNext, isLast }) {
  const [confetti, setConfetti] = useState([])

  // Spawn confetti on correct answers
  useEffect(() => {
    if (!isCorrect) return
    const particles = Array.from({ length: 24 }, (_, i) => ({
      id: i,
      left: `${4 + Math.random() * 92}%`,
      backgroundColor: CONFETTI_COLORS[i % CONFETTI_COLORS.length],
      animationDelay: `${(Math.random() * 0.6).toFixed(2)}s`,
      width:  `${8 + Math.random() * 10}px`,
      height: `${8 + Math.random() * 10}px`,
      transform: `rotate(${Math.floor(Math.random() * 360)}deg)`,
      borderRadius: Math.random() > 0.5 ? '50%' : '3px',
    }))
    setConfetti(particles)
  }, [isCorrect])

  const accentBg   = isCorrect ? 'bg-lime-400'   : 'bg-orange-400'
  const tipBorder  = isCorrect ? 'border-lime-200 bg-lime-50'  : 'border-orange-200 bg-orange-50'
  const tipLabel   = isCorrect ? 'text-lime-700'  : 'text-orange-700'
  const btnColor   = isCorrect
    ? 'bg-lime-500 hover:bg-lime-400 active:bg-lime-600'
    : 'bg-orange-500 hover:bg-orange-400 active:bg-orange-600'

  return (
    /* Full-screen overlay */
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-live="assertive"
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/65 backdrop-blur-sm" />

      {/* Confetti layer */}
      {isCorrect && (
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          {confetti.map((p) => (
            <Confetto
              key={p.id}
              style={{
                left:            p.left,
                top:             '-16px',
                backgroundColor: p.backgroundColor,
                animationDelay:  p.animationDelay,
                width:           p.width,
                height:          p.height,
                transform:       p.transform,
                borderRadius:    p.borderRadius,
              }}
            />
          ))}
        </div>
      )}

      {/* Modal card */}
      <div className="relative z-10 w-full max-w-md rounded-3xl overflow-hidden animate-modal-in shadow-2xl">
        {/* Top accent bar */}
        <div className={`h-3 ${accentBg}`} />

        {/* Content */}
        <div className="bg-white p-6 sm:p-8">

          {/* Result header */}
          <div className="text-center mb-5">
            <div
              className="text-6xl sm:text-7xl mb-2 block animate-bounce-in"
              role="img"
              aria-label={isCorrect ? 'Celebration' : 'Oops'}
            >
              {isCorrect ? '🎉' : '😅'}
            </div>

            <h2
              className={`font-display text-2xl sm:text-3xl ${
                isCorrect ? 'text-lime-600' : 'text-orange-500'
              }`}
            >
              {isCorrect ? "That's right!" : 'Not quite!'}
            </h2>

            {!isCorrect && (
              <p className="text-gray-600 text-sm font-body font-semibold mt-1.5">
                The answer was:{' '}
                <span className="text-indigo-700 font-bold">{correctAnswer}</span>
              </p>
            )}
          </div>

          {/* Coach's Tip box */}
          <div className={`rounded-2xl p-4 mb-5 border-2 ${tipBorder}`}>
            <div className="flex items-start gap-3">
              <span className="text-2xl flex-shrink-0" role="img" aria-label="Coach">🏃</span>
              <div>
                <p className={`font-display text-sm mb-1 ${tipLabel}`}>
                  Coach's Tip
                </p>
                <p className="text-gray-700 text-sm font-body font-semibold leading-relaxed">
                  {coachTip}
                </p>
              </div>
            </div>
          </div>

          {/* Next / Finish button */}
          <button
            onClick={onNext}
            className={`
              w-full py-4 rounded-2xl font-display text-xl text-white
              transition-all duration-100 btn-press
              ${btnColor}
            `}
            autoFocus
          >
            {isLast ? 'See My Score! 🏆' : 'Next Question →'}
          </button>
        </div>
      </div>
    </div>
  )
}
