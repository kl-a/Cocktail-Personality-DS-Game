'use client'

import Link from 'next/link'
import DSFrame from '@/components/DSFrame'
import quizDataEn from '@/assets/quiz.json'
import quizDataZh from '@/assets/quiz.zh.json'
import { useLang } from '@/context/LanguageContext'
import { UI } from '@/lib/translations'

export default function HomePage() {
  const { lang } = useLang()
  const t        = UI[lang]
  const quizData = lang === 'zh' ? quizDataZh : quizDataEn

  const topScreen = (
    <>
      <div className="screen-top-header">{t.topHeader}</div>
      <div className="screen-top-title">
        {t.titleLine1}<br />{t.titleLine2}<br />{t.titleLine3}
      </div>
      <div className="screen-top-subtitle">{t.subtitle}</div>
      <div style={{ marginTop: 'auto', display: 'flex', gap: 4, justifyContent: 'flex-end', opacity: 0.4 }}>
        {[...Array(3)].map((_, i) => (
          <div key={i} style={{ width: 4, height: 4, background: 'var(--mint)' }} />
        ))}
      </div>
    </>
  )

  const bottomScreen = (
    <>
      <div className="question-number">
        {t.questionCount(quizData.questions.length)} &nbsp;·&nbsp; {t.oneCocktail}
      </div>
      <div className="question-text">{t.tagline}</div>

      <div style={{ marginTop: 12 }}>
        <div style={{
          fontFamily: 'var(--font-pixel)',
          fontSize: 6,
          color: 'var(--text-dim)',
          lineHeight: 2,
          marginBottom: 16,
        }}>
          {t.answerLine1}<br />
          {t.answerLine2}<br />
          {t.answerLine3}
        </div>

        <Link href="/quiz" className="start-btn">▶ &nbsp;{t.start.replace('▶  ', '')}</Link>
      </div>

      <div className="touch-prompt">{t.touchToBegin}</div>
    </>
  )

  return <DSFrame topScreen={topScreen} bottomScreen={bottomScreen} />
}
