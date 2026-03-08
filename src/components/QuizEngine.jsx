import { useState } from 'react'
import ProgressBar from './ProgressBar'
import FeedbackModal from './FeedbackModal'
import ThrowingGuideModal from './ThrowingGuideModal'

// ─── Letter labels for the four answer buttons ───────────────────────────────
const LETTERS = ['A', 'B', 'C', 'D']

// ─── Scoring helpers ─────────────────────────────────────────────────────────
function getScoreMessage(score, total) {
  if (score === total) {
    return { message: "PERFECT! You're a true Ultimate expert!", emoji: '🏆', colorClass: 'text-lime-400' }
  }
  if (score / total >= 0.8) {
    return { message: 'Amazing! You really know your stuff!',   emoji: '⭐', colorClass: 'text-yellow-400' }
  }
  if (score / total >= 0.6) {
    return { message: 'Great job! Keep practicing!',            emoji: '🙌', colorClass: 'text-indigo-300' }
  }
  return { message: 'Good try! Review with your coach and try again!', emoji: '💪', colorClass: 'text-orange-400' }
}

// ─── Single answer button ────────────────────────────────────────────────────
function AnswerButton({ label, letterIndex, selected, isCorrect, revealed, onClick }) {
  let containerClass = 'bg-indigo-50 border-2 border-indigo-200 text-[#1E1B4B] hover:bg-indigo-100 active:scale-95'
  let badgeClass     = 'bg-indigo-200 text-indigo-700'
  let icon           = null

  if (revealed) {
    if (isCorrect) {
      containerClass = 'bg-lime-100 border-2 border-lime-400 text-lime-900'
      badgeClass     = 'bg-lime-500 text-white'
      icon           = '✓'
    } else if (selected) {
      containerClass = 'bg-orange-100 border-2 border-orange-400 text-orange-900'
      badgeClass     = 'bg-orange-500 text-white'
      icon           = '✗'
    } else {
      containerClass = 'bg-gray-50 border-2 border-gray-200 text-gray-400'
      badgeClass     = 'bg-gray-200 text-gray-400'
    }
  }

  return (
    <button
      onClick={onClick}
      disabled={revealed}
      aria-pressed={selected}
      aria-label={`Option ${LETTERS[letterIndex]}: ${label}${revealed && isCorrect ? ' — correct' : ''}${revealed && selected && !isCorrect ? ' — incorrect' : ''}`}
      className={`
        relative p-4 rounded-2xl text-left font-body font-bold text-sm leading-snug
        min-h-[64px] transition-all duration-200
        focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-indigo-400/60
        ${containerClass}
        ${!revealed ? 'btn-press cursor-pointer' : 'cursor-default'}
      `}
    >
      <div className="flex items-start gap-2.5">
        <span
          className={`flex-shrink-0 w-6 h-6 rounded-lg flex items-center justify-center text-xs font-display transition-colors duration-200 ${badgeClass}`}
        >
          {LETTERS[letterIndex]}
        </span>
        <span className="pt-px">{label}</span>
      </div>

      {revealed && icon && (
        <span className="absolute top-2.5 right-3 text-sm font-bold" aria-hidden="true">
          {icon}
        </span>
      )}
    </button>
  )
}

const SHEETS_URL = import.meta.env.VITE_SHEETS_URL ?? 'https://script.google.com/macros/s/AKfycbydyhgZnqJgJLloO4kcMvhx4L6t3Q_TksrhuynJVFhkewsea1O25hwTWvPF8vioybsf/exec'

// ─── Results screen ───────────────────────────────────────────────────────────
function ResultsScreen({ score, total, answers, isRetakeMode, onRetakeWrong, onExit, certLevel, quizTitle }) {
  const { message, emoji, colorClass } = getScoreMessage(score, total)
  const pct        = Math.round((score / total) * 100)
  const wrongCount = answers.filter((a) => !a).length

  const [name,        setName]        = useState('')
  const [submitState, setSubmitState] = useState('idle') // idle | loading | done | error

  async function handleCertSubmit() {
    if (!SHEETS_URL || submitState !== 'idle') return
    setSubmitState('loading')
    try {
      await fetch(SHEETS_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim() || 'Anonymous',
          quizTitle,
          certLevel,
          score,
          total,
        }),
      })
      setSubmitState('done')
    } catch {
      setSubmitState('error')
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-3xl overflow-hidden card-shadow animate-bounce-in">
          {/* Top stripe — orange if retake round, lime otherwise */}
          <div className={`h-3 ${isRetakeMode ? 'bg-orange-400' : 'bg-lime-400'}`} />

          <div className="p-7 sm:p-9 text-center">
            {/* Retake-mode label */}
            {isRetakeMode && (
              <p className="font-body font-bold text-orange-500 text-sm mb-3">
                🔄 Missed-question retake
              </p>
            )}

            {/* Score emoji */}
            <div className="text-7xl mb-3 block animate-float" role="img" aria-label={emoji}>
              {emoji}
            </div>

            {/* Numeric score */}
            <div className="font-display text-6xl text-[#1E1B4B] mb-1 leading-none">
              {score}
              <span className="text-3xl text-indigo-300">/{total}</span>
            </div>

            <p className="font-display text-lg text-indigo-400 mb-4">
              {pct}% correct!
            </p>

            {/* Score bar */}
            <div className="w-full h-5 bg-indigo-100 rounded-full overflow-hidden mb-5">
              <div
                className="h-full bg-lime-400 rounded-full relative"
                style={{
                  width: `${pct}%`,
                  transition: 'width 1.1s cubic-bezier(0.22, 1, 0.36, 1) 0.3s',
                }}
              >
                <div className="absolute inset-0 bg-gradient-to-b from-white/30 to-transparent rounded-full" />
              </div>
            </div>

            {/* Encouraging message */}
            <p className={`font-display text-xl leading-snug mb-5 ${colorClass}`}>
              {message}
            </p>

            {/* Per-question dots */}
            <div
              className="flex justify-center gap-2 mb-6 flex-wrap"
              aria-label="Question results"
            >
              {answers.map((correct, i) => (
                <div
                  key={i}
                  className={`
                    w-8 h-8 rounded-full flex items-center justify-center
                    text-xs font-display text-white
                    ${correct ? 'bg-lime-500' : 'bg-orange-400'}
                  `}
                  title={`Q${i + 1}: ${correct ? 'Correct' : 'Incorrect'}`}
                  aria-label={`Question ${i + 1}: ${correct ? 'correct' : 'incorrect'}`}
                >
                  {i + 1}
                </div>
              ))}
            </div>

            {/* ── Certification submission (Quiz 3+) ───────────────────── */}
            {certLevel && (
              <div className="mb-5 rounded-2xl bg-indigo-50 border-2 border-indigo-200 p-4 text-left">
                <p className="font-display text-base text-[#1E1B4B] mb-1">
                  🎓 Ready to attempt certification?
                </p>
                <p className="font-body text-xs text-indigo-500 mb-3">
                  {certLevel} — let your coach know you want to be tested!
                </p>

                {submitState === 'done' ? (
                  <p className="font-display text-lime-600 text-sm text-center py-2">
                    ✓ Your coach has been notified. Nice work!
                  </p>
                ) : (
                  <div className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Your name (optional)"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      maxLength={40}
                      className="flex-1 min-w-0 rounded-xl border-2 border-indigo-200 bg-white px-3 py-2 font-body text-sm text-[#1E1B4B] placeholder-indigo-300 focus:outline-none focus:border-indigo-400"
                    />
                    <button
                      onClick={handleCertSubmit}
                      disabled={submitState === 'loading'}
                      className="flex-shrink-0 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white font-display text-sm transition-colors duration-150 btn-press disabled:opacity-60"
                    >
                      {submitState === 'loading' ? '...' : "I'm Ready!"}
                    </button>
                  </div>
                )}

                {submitState === 'error' && (
                  <p className="font-body text-xs text-orange-500 mt-2">
                    Something went wrong — ask your coach to note it manually.
                  </p>
                )}
              </div>
            )}

            {/* ── Action buttons ───────────────────────────────────────── */}
            <div className="flex flex-col gap-3">
              {/* Retake wrong — only shown when there are misses */}
              {wrongCount > 0 && (
                <button
                  onClick={onRetakeWrong}
                  className="w-full py-4 rounded-2xl bg-orange-500 hover:bg-orange-400 text-white font-display text-xl transition-colors duration-150 btn-press"
                >
                  Practice {wrongCount} Missed Question{wrongCount > 1 ? 's' : ''} 🔄
                </button>
              )}

              {/* Back to menu — always shown */}
              <button
                onClick={onExit}
                className={`
                  w-full py-4 rounded-2xl font-display text-xl transition-colors duration-150 btn-press
                  ${wrongCount > 0
                    ? 'bg-indigo-100 hover:bg-indigo-200 text-indigo-700'
                    : 'bg-indigo-600 hover:bg-indigo-500 text-white'}
                `}
              >
                Back to Menu 🏠
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Main quiz engine ─────────────────────────────────────────────────────────
export default function QuizEngine({ quiz, onExit }) {
  // questionsQueue is the active set — starts as the full quiz, becomes the
  // wrong-answers subset after the player hits "Practice Missed Questions".
  const [questionsQueue, setQuestionsQueue] = useState(quiz.questions)
  const [isRetakeMode,   setIsRetakeMode]   = useState(false)

  const [currentIndex,  setCurrentIndex]  = useState(0)
  const [selectedIndex, setSelectedIndex] = useState(null)
  const [showModal,     setShowModal]     = useState(false)
  const [score,         setScore]         = useState(0)
  const [answers,       setAnswers]       = useState([]) // boolean per question
  const [showResults,   setShowResults]   = useState(false)
  const [showGuide,     setShowGuide]     = useState(false)

  const question  = questionsQueue[currentIndex]
  const isLast    = currentIndex === questionsQueue.length - 1
  const isCorrect = selectedIndex === question?.correctIndex

  // User picks an answer
  function handleSelect(index) {
    if (selectedIndex !== null) return
    const correct = index === question.correctIndex
    setSelectedIndex(index)
    if (correct) setScore((s) => s + 1)
    setAnswers((prev) => [...prev, correct])
    setShowModal(true)
  }

  // Dismiss modal and advance
  function handleNext() {
    setShowModal(false)
    if (isLast) {
      setShowResults(true)
    } else {
      setCurrentIndex((i) => i + 1)
      setSelectedIndex(null)
    }
  }

  // Restart with only the questions the player missed
  function handleRetakeWrong() {
    const wrongQuestions = questionsQueue.filter((_, i) => !answers[i])
    setQuestionsQueue(wrongQuestions)
    setIsRetakeMode(true)
    setCurrentIndex(0)
    setSelectedIndex(null)
    setShowModal(false)
    setScore(0)
    setAnswers([])
    setShowResults(false)
  }

  // ── Results screen ──────────────────────────────────────────────────────
  if (showResults) {
    return (
      <ResultsScreen
        score={score}
        total={questionsQueue.length}
        answers={answers}
        isRetakeMode={isRetakeMode}
        onRetakeWrong={handleRetakeWrong}
        onExit={onExit}
        certLevel={quiz.certLevel}
        quizTitle={quiz.title}
      />
    )
  }

  // ── Quiz question screen ────────────────────────────────────────────────
  return (
    <div className="min-h-screen flex flex-col px-4 py-6 max-w-lg mx-auto">

      {/* Top bar: back button + optional guide button */}
      <div className="flex items-center justify-between mb-6">
        <button
          onClick={onExit}
          className="flex items-center gap-1.5 text-indigo-400 hover:text-indigo-200 transition-colors font-body font-bold text-sm w-fit"
          aria-label="Back to main menu"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Back to Menu
        </button>

        {quiz.hasGuide && (
          <button
            onClick={() => setShowGuide(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-indigo-700 hover:bg-indigo-600 text-indigo-200 hover:text-white font-body font-bold text-sm transition-colors"
            aria-label="Open study guide"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Study Guide
          </button>
        )}
      </div>

      {/* Quiz title + optional retake banner */}
      <div className="mb-4">
        <p className="font-display text-base text-indigo-300">
          {quiz.emoji} {quiz.title}
        </p>
        {isRetakeMode && (
          <p className="font-body font-bold text-orange-400 text-xs mt-1">
            🔄 Retake — practicing {questionsQueue.length} missed question{questionsQueue.length > 1 ? 's' : ''}
          </p>
        )}
      </div>

      {/* Progress bar */}
      <ProgressBar current={currentIndex + 1} total={questionsQueue.length} />

      {/* Question card — key forces re-mount for slide-in animation */}
      <div
        key={`${isRetakeMode}-${currentIndex}`}
        className="mt-6 bg-white rounded-3xl p-5 sm:p-7 card-shadow animate-slide-up"
        style={{ animationFillMode: 'forwards', opacity: 0 }}
      >
        {/* Question number badge + text */}
        <div className="flex items-start gap-3 mb-6">
          <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center ${isRetakeMode ? 'bg-orange-500' : 'bg-indigo-600'}`}>
            <span className="font-display text-white text-lg">{currentIndex + 1}</span>
          </div>
          <h2 className="font-display text-xl text-[#1E1B4B] leading-snug pt-1">
            {question.question}
          </h2>
        </div>

        {/* 2 × 2 answer grid */}
        <div className="grid grid-cols-2 gap-3" role="group" aria-label="Answer choices">
          {question.options.map((option, i) => (
            <AnswerButton
              key={i}
              label={option}
              letterIndex={i}
              selected={selectedIndex === i}
              isCorrect={i === question.correctIndex}
              revealed={selectedIndex !== null}
              onClick={() => handleSelect(i)}
            />
          ))}
        </div>
      </div>

      {/* Feedback modal */}
      {showModal && (
        <FeedbackModal
          isCorrect={isCorrect}
          coachTip={question.coachTip}
          correctAnswer={question.options[question.correctIndex]}
          onNext={handleNext}
          isLast={isLast}
        />
      )}

      {/* Study guide modal */}
      {showGuide && <ThrowingGuideModal onClose={() => setShowGuide(false)} />}
    </div>
  )
}
