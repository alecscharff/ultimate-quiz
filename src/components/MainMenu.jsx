import { useState } from 'react'

// ─── Decorative floating disc ───────────────────────────────────────────────
function FloatingDisc({ className, style }) {
  return (
    <div
      className={`absolute pointer-events-none select-none animate-spin-slow opacity-10 ${className}`}
      style={style}
      aria-hidden="true"
    >
      <div className="rounded-full border-4 border-lime-400 border-dashed flex items-center justify-center">
        <span>🥏</span>
      </div>
    </div>
  )
}

// ─── Individual quiz card ───────────────────────────────────────────────────
function QuizCard({ quiz, index, onSelect }) {
  const [pressed, setPressed] = useState(false)

  const disabled = quiz.comingSoon

  function handleClick() {
    if (!disabled) onSelect(quiz.id)
  }

  return (
    <div
      className="animate-slide-up"
      style={{ animationDelay: `${index * 120 + 80}ms`, opacity: 0, animationFillMode: 'forwards' }}
    >
      <button
        onClick={handleClick}
        onPointerDown={() => !disabled && setPressed(true)}
        onPointerUp={() => setPressed(false)}
        onPointerLeave={() => setPressed(false)}
        disabled={disabled}
        aria-label={`${quiz.title}${disabled ? ' — coming soon' : ' — start quiz'}`}
        className={`
          w-full text-left rounded-3xl overflow-hidden
          transition-transform duration-100
          ${disabled ? 'cursor-not-allowed' : 'cursor-pointer active:scale-[0.98]'}
          ${!disabled ? 'card-shadow' : ''}
          focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-lime-400/60
        `}
        style={
          !disabled
            ? { boxShadow: pressed ? '0 3px 0px rgba(0,0,0,0.28), 0 6px 16px rgba(0,0,0,0.25)' : undefined }
            : undefined
        }
      >
        {/* Accent stripe */}
        <div
          className={`h-2.5 w-full ${
            disabled ? 'bg-indigo-700/50' : 'bg-lime-400'
          }`}
        />

        {/* Card body */}
        <div
          className={`p-5 ${
            disabled
              ? 'bg-indigo-900/60 border border-indigo-700/40'
              : 'bg-white'
          }`}
        >
          <div className="flex items-start gap-4">
            {/* Emoji badge */}
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0 ${
                disabled
                  ? 'bg-indigo-800/60'
                  : 'bg-indigo-50 border-2 border-indigo-100'
              }`}
            >
              {quiz.emoji}
            </div>

            {/* Text block */}
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <h2
                  className={`font-display text-xl leading-tight ${
                    disabled ? 'text-indigo-300' : 'text-[#1E1B4B]'
                  }`}
                >
                  {quiz.title}
                </h2>

                {disabled ? (
                  <span className="flex-shrink-0 inline-block bg-indigo-700/60 text-indigo-300 text-xs font-bold font-body px-2.5 py-1 rounded-full border border-indigo-600/50 whitespace-nowrap">
                    Coming Soon
                  </span>
                ) : (
                  <div className="flex-shrink-0 w-9 h-9 rounded-full bg-indigo-600 flex items-center justify-center group-hover:bg-lime-400 transition-colors duration-200">
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={3}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                )}
              </div>

              <p
                className={`text-sm mt-1 font-body font-semibold leading-snug ${
                  disabled ? 'text-indigo-400' : 'text-indigo-500'
                }`}
              >
                {quiz.description}
              </p>

              {/* Meta chips */}
              {!disabled && (
                <div className="mt-2.5 flex items-center gap-2 flex-wrap">
                  <span className="text-xs font-bold font-body bg-indigo-100 text-indigo-700 px-2.5 py-0.5 rounded-full">
                    {quiz.questionCount} Questions
                  </span>
                  <span className="text-xs font-bold font-body bg-lime-100 text-lime-700 px-2.5 py-0.5 rounded-full">
                    ~{quiz.estimatedMinutes} min
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* CTA row */}
          {!disabled && (
            <div className="mt-4 py-3.5 rounded-2xl bg-indigo-600 text-white text-center font-display text-base transition-colors duration-150 hover:bg-indigo-500">
              Let's Go! 🚀
            </div>
          )}
        </div>
      </button>
    </div>
  )
}

// ─── Main menu ──────────────────────────────────────────────────────────────
export default function MainMenu({ quizzes, onSelectQuiz }) {
  return (
    <div className="min-h-screen flex flex-col items-center px-4 py-10 relative overflow-hidden">

      {/* Decorative background discs */}
      <FloatingDisc
        className="w-32 h-32 text-2xl top-[-20px] right-[-20px]"
        style={{ animationDirection: 'reverse' }}
      />
      <FloatingDisc
        className="w-20 h-20 text-xl bottom-24 left-[-10px]"
        style={{ animationDuration: '14s' }}
      />
      <FloatingDisc
        className="w-14 h-14 text-sm bottom-[45%] right-4"
        style={{ animationDuration: '18s', animationDirection: 'reverse' }}
      />

      {/* ── Header ─────────────────────────────────────────────────────── */}
      <div
        className="flex flex-col items-center mb-8 animate-slide-up"
        style={{ animationFillMode: 'forwards', opacity: 0 }}
      >
        {/* Spinning disc logo */}
        <div className="relative mb-3">
          <div className="animate-spin-slow w-24 h-24 rounded-full border-4 border-dashed border-lime-400/70 flex items-center justify-center">
            <span className="text-5xl not-italic" style={{ animation: 'none' }}>🥏</span>
          </div>
          {/* Glow ring */}
          <div className="absolute inset-0 rounded-full bg-lime-400/10 blur-xl" />
        </div>

        <h1 className="font-display text-5xl sm:text-6xl text-white leading-none text-shadow text-center">
          Wedgwood
        </h1>
        <h1 className="font-display text-4xl sm:text-5xl text-lime-400 leading-tight text-shadow text-center">
          Ultimate Quiz
        </h1>

        <div className="mt-4 px-5 py-2 rounded-full bg-indigo-700/60 border border-indigo-500/40 backdrop-blur-sm">
          <p className="text-indigo-200 text-sm font-body font-bold tracking-wide">
            Pick a quiz and let's play! 🥏
          </p>
        </div>
      </div>

      {/* ── Quiz cards ─────────────────────────────────────────────────── */}
      <div className="w-full max-w-md flex flex-col gap-5">
        {quizzes.map((quiz, i) => (
          <QuizCard
            key={quiz.id}
            quiz={quiz}
            index={i}
            onSelect={onSelectQuiz}
          />
        ))}
      </div>

      {/* ── Footer ─────────────────────────────────────────────────────── */}
      <p className="mt-10 text-indigo-500/70 text-xs font-body text-center">
        Wedgwood Elementary • Ultimate Frisbee League
      </p>
    </div>
  )
}
