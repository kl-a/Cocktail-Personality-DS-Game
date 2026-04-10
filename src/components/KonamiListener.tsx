'use client'

import { useCallback } from 'react'
import { useRouter }   from 'next/navigation'
import { useKonamiCode } from '@/hooks/useKonamiCode'
import { playKonami }    from '@/lib/sounds'

export default function KonamiListener() {
  const router = useRouter()

  const handleKonami = useCallback(() => {
    playKonami()
    setTimeout(() => {
      router.push(`/result?cocktail=${encodeURIComponent("The Bartender's Secret")}`)
    }, 700)
  }, [router])

  useKonamiCode(handleKonami)
  return null
}
