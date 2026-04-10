'use client'

import { useEffect, useState } from 'react'

interface Props {
  text:       string
  speed?:     number  // ms per character
  className?: string
}

export default function TypewriterText({ text, speed = 18, className }: Props) {
  const [shown, setShown] = useState('')
  const [done,  setDone]  = useState(false)

  useEffect(() => {
    setShown('')
    setDone(false)
    let i = 0
    const id = setInterval(() => {
      i++
      setShown(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(id)
        setDone(true)
      }
    }, speed)
    return () => clearInterval(id)
  }, [text, speed])

  return (
    <span className={className}>
      {shown}
      {!done && <span className="typewriter-cursor" aria-hidden="true">▌</span>}
    </span>
  )
}
