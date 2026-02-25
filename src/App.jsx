import { useState } from 'react'
import MainMenu from './components/MainMenu'
import QuizEngine from './components/QuizEngine'
import { quizzes } from './data/quizzes'

export default function App() {
  // null  → show MainMenu
  // string → run that quiz (matched by quiz.id)
  const [currentQuizId, setCurrentQuizId] = useState(null)

  const currentQuiz = currentQuizId
    ? quizzes.find((q) => q.id === currentQuizId)
    : null

  return (
    <div className="min-h-screen field-bg">
      {currentQuizId && currentQuiz ? (
        <QuizEngine
          quiz={currentQuiz}
          onExit={() => setCurrentQuizId(null)}
        />
      ) : (
        <MainMenu
          quizzes={quizzes}
          onSelectQuiz={(id) => setCurrentQuizId(id)}
        />
      )}
    </div>
  )
}
