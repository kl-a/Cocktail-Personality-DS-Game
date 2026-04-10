import Link from 'next/link'
import DSFrame from '@/components/DSFrame'
import quizData from '@/assets/quiz.json'

const topScreen = (
  <>
    <div className="screen-top-header">✦ Touch Detective ✦</div>
    <div className="screen-top-title">A Night That<br />Escalated Way<br />Too Quickly</div>
    <div className="screen-top-subtitle">
      A cocktail personality quiz
    </div>
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
      {quizData.questions.length} questions &nbsp;·&nbsp; 1 cocktail
    </div>
    <div className="question-text">
      {quizData.quizMeta.description}
    </div>

    <div style={{ marginTop: 12 }}>
      <div style={{
        fontFamily: 'var(--font-pixel)',
        fontSize: 6,
        color: 'var(--text-dim)',
        lineHeight: 2,
        marginBottom: 16,
      }}>
        Answer honestly.<br />
        Or don&apos;t. We&apos;ll figure<br />
        you out anyway.
      </div>

      <Link href="/quiz" className="start-btn">▶ &nbsp;START</Link>
    </div>

    <div className="touch-prompt">TOUCH TO BEGIN</div>
  </>
)

export default function HomePage() {
  return <DSFrame topScreen={topScreen} bottomScreen={bottomScreen} />
}
