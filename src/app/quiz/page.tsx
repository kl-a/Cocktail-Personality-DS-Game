'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import DSFrame from '@/components/DSFrame'
import quizData from '@/assets/quiz.json'
import { calculateResult } from '@/lib/scoring'

const TOTAL = quizData.questions.length

const DIMENSION_LABELS: Record<string, string> = {
  movement:       'Energy',
  speech:         'Expression',
  expressiveness: 'Presence',
  attitude:       'Vibe',
}

export default function QuizPage() {
  const [current, setCurrent]   = useState(0)
  const [answers, setAnswers]   = useState<Record<string, number>>({})
  const [selected, setSelected] = useState<number | null>(null)
  const router = useRouter()

  const question = quizData.questions[current]

  function handleAnswer(score: number) {
    if (selected !== null) return   // prevent double-tap
    setSelected(score)

    setTimeout(() => {
      const newAnswers = { ...answers, [question.id]: score }
      setAnswers(newAnswers)

      if (current < TOTAL - 1) {
        setCurrent(current + 1)
        setSelected(null)
      } else {
        const result = calculateResult(newAnswers)
        router.push(`/result?cocktail=${encodeURIComponent(result.cocktailName)}`)
      }
    }, 180)
  }

  const topScreen = (
    <>
      <div className="screen-top-header">
        {DIMENSION_LABELS[question.dimension] ?? question.dimension}
      </div>

      <div className="dimension-badge">{question.dimension}</div>

      <div className="screen-top-subtitle" style={{ color: 'var(--text-dim)', fontSize: 16 }}>
        Question {current + 1} of {TOTAL}
      </div>

      {/* Progress dots */}
      <div className="progress-dots">
        {quizData.questions.map((_, i) => (
          <div
            key={i}
            className={
              'progress-dot' +
              (i < current ? ' done' : '') +
              (i === current ? ' current' : '')
            }
          />
        ))}
      </div>
    </>
  )

  const bottomScreen = (
    <>
      <div className="question-number">Q{current + 1}</div>
      <div className="question-text">{question.text}</div>

      <ul className="answer-list">
        {question.answers.map((ans) => (
          <li key={ans.score}>
            <button
              className="answer-btn"
              onClick={() => handleAnswer(ans.score)}
              disabled={selected !== null}
              style={selected === ans.score ? {
                borderColor: 'var(--mint)',
                background: 'rgba(125,207,182,0.12)',
                color: 'var(--mint)',
              } : undefined}
            >
              {ans.text}
            </button>
          </li>
        ))}
      </ul>
    </>
  )

  return <DSFrame topScreen={topScreen} bottomScreen={bottomScreen} />
}
