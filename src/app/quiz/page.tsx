'use client'

import { useState, useEffect, useRef, useCallback, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import DSFrame    from '@/components/DSFrame'
import GlassShelf from '@/components/GlassShelf'
import quizDataEn from '@/assets/quiz.json'
import quizDataZh from '@/assets/quiz.zh.json'
import { calculateResult } from '@/lib/scoring'
import { playAnswerTone, playConfirm } from '@/lib/sounds'
import { getGlasses } from '@/lib/glassHistory'
import { useLang } from '@/context/LanguageContext'
import { UI } from '@/lib/translations'

type AAAnswer = { text: string; score: number; water: boolean }

export default function QuizPage() {
  const { lang }                       = useLang()
  const t                              = UI[lang]
  const quizData                       = lang === 'zh' ? quizDataZh : quizDataEn

  const [current,  setCurrent]  = useState(0)
  const [answers,  setAnswers]  = useState<Record<string, number>>({})
  const [selected, setSelected] = useState<number | null>(null)
  const [shaking,  setShaking]  = useState(false)
  const [idle,     setIdle]     = useState(false)
  const [glasses,  setGlasses]  = useState<string[]>([])
  const idleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  const router = useRouter()

  // Read glass history once on mount (client-only)
  useEffect(() => {
    setGlasses(getGlasses())
  }, [])

  // Build the questions array — prepend AA question when the tab is full
  const questions = useMemo(
    () => glasses.length >= 5
      ? [{ ...t.aaQuestion, id: 'aa_check', dimension: 'attitude' }, ...quizData.questions]
      : quizData.questions,
    [glasses.length, lang], // eslint-disable-line react-hooks/exhaustive-deps
  )
  const TOTAL    = questions.length
  const question = questions[current]

  // Shuffle tone slots on every new question
  const toneOrder = useMemo(() => {
    const arr = [0, 1, 2, 3, 4]
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[arr[i], arr[j]] = [arr[j], arr[i]]
    }
    return arr
  }, [current]) // eslint-disable-line react-hooks/exhaustive-deps

  // Reset idle timer on question change or selection
  useEffect(() => {
    setIdle(false)
    clearTimeout(idleTimer.current)
    idleTimer.current = setTimeout(() => setIdle(true), 3500)
    return () => clearTimeout(idleTimer.current)
  }, [current, selected])

  const handleAnswer = useCallback((score: number, slotIndex: number, water = false) => {
    if (selected !== null) return
    playAnswerTone(toneOrder[slotIndex])
    setSelected(score)
    setShaking(true)
    setTimeout(() => setShaking(false), 300)

    // AA question "yes" answer → redirect to glass of water screen
    if (water) {
      setTimeout(() => {
        router.push(`/result?cocktail=${encodeURIComponent('Glass of Water')}`)
      }, 220)
      return
    }

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
  }, [selected, answers, current, question.id, router, toneOrder, TOTAL])

  const topScreen = (
    <>
      <div className="screen-top-header">
        {t.dimensionLabels[question.dimension] ?? question.dimension}
      </div>

      <div className="dimension-badge">{question.dimension}</div>

      <div className="screen-top-subtitle" style={{ color: 'var(--text-dim)', fontSize: 16 }}>
        {t.questionOf(current + 1, TOTAL)}
      </div>

      <div className="progress-dots">
        {questions.map((_, i) => (
          <div
            key={i}
            className={
              'progress-dot' +
              (i < current  ? ' done'    : '') +
              (i === current ? ' current' : '')
            }
          />
        ))}
      </div>
    </>
  )

  const bottomScreen = (
    <div key={current} className="question-wipe">
      <div className="question-number">{t.questionLabel(current + 1)}</div>
      <div className="question-text">{question.text}</div>

      <ul className={`answer-list${idle ? ' answer-list--idle' : ''}`}>
        {question.answers.map((ans, i) => {
          const isSelected = selected === ans.score
          const water = 'water' in (ans as AAAnswer) ? (ans as AAAnswer).water : false
          return (
            <li key={ans.score}>
              <button
                className={`answer-btn${isSelected ? ' answer-btn--selected' : ''}`}
                onClick={() => handleAnswer(ans.score, i, water)}
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

  return (
    <>
      <GlassShelf glasses={glasses} />
      <DSFrame topScreen={topScreen} bottomScreen={bottomScreen} shake={shaking} />
    </>
  )
}
