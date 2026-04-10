'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import DSFrame from '@/components/DSFrame'
import quizData from '@/assets/quiz.json'
import { calculateResult } from '@/lib/scoring'
import { playAnswerTone, playConfirm } from '@/lib/sounds'

const TOTAL = quizData.questions.length

const DIMENSION_LABELS: Record<string, string> = {
  movement:       'Energy',
  speech:         'Expression',
  expressiveness: 'Presence',
  attitude:       'Vibe',
}

export default function QuizPage() {
  const [current,  setCurrent]  = useState(0)
  const [answers,  setAnswers]  = useState<Record<string, number>>({})
  const [selected, setSelected] = useState<number | null>(null)
  const [shaking,  setShaking]  = useState(false)
  const [idle,     setIdle]     = useState(false)
  const idleTimer               = useRef<ReturnType<typeof setTimeout>>()
  const router = useRouter()

  const question = quizData.questions[current]

  // Shuffle tone slots on every new question so each answer button gets a unique note
  const toneOrder = useMemo(() => {
    const arr = [0, 1, 2, 3, 4]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [current]) // eslint-disable-line react-hooks/exhaustive-deps

  // Reset idle timer whenever the question advances or an answer is selected
  useEffect(() => {
    setIdle(false)
    clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => setIdle(true), 3500)
    return () => clearTimeout(idleTimer.current)
  }, [current, selected])

  const handleAnswer = useCallback((score: number, slotIndex: number) => {
    if (selected !== null) return   // prevent double-tap
    playAnswerTone(toneOrder[slotIndex])
    setSelected(score)
    setShaking(true)

    // Reset shake class so it can re-trigger on the next answer
    setTimeout(() => setShaking(false), 300)

    setTimeout(() => {
      playConfirm()
      const newAnswers = { ...answers, [question.id]: score }
      setAnswers(newAnswers)

      if (current < TOTAL - 1) {
        setCurrent(current + 1)
        setSelected(null)
      } else {
        const result = calculateResult(newAnswers)
        router.push(`/result?cocktail=${encodeURIComponent(result.cocktailName)}`)
      }
    }, 220)
  }, [selected, answers, current, question.id, router, toneOrder])

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
    // key={current} causes React to remount this div when the question changes,
    // which restarts the CSS wipe-in animation each time.
    <div key={current} className="question-wipe">
      <div className="question-number">Q{current + 1}</div>
      <div className="question-text">{question.text}</div>

      <ul className={`answer-list${idle ? ' answer-list--idle' : ''}`}>
        {question.answers.map((ans, i) => {
          const isSelected = selected === ans.score
          return (
            <li key={ans.score}>
              <button
                className={`answer-btn${isSelected ? ' answer-btn--selected' : ''}`}
                onClick={() => handleAnswer(ans.score, i)}
                disabled={selected !== null}
                style={isSelected ? {
                  borderColor: 'var(--mint)',
                  background:  'rgba(125,207,182,0.12)',
                  color:       'var(--mint)',
                } : undefined}
              >
                {ans.text}
              </button>
            </li>
          )
        })}
      </ul>
    </div>
  )

  return <DSFrame topScreen={topScreen} bottomScreen={bottomScreen} shake={shaking}/>
}
