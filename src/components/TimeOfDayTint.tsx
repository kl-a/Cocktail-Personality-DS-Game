'use client'

import { useEffect } from 'react'

export default function TimeOfDayTint() {
  useEffect(() => {
    const h    = new Date().getHours()
    const tint =
      h >= 6  && h < 12 ? 'morning'   :
      h >= 12 && h < 18 ? 'afternoon' :
      h >= 18 && h < 22 ? 'evening'   : 'night'
    document.documentElement.dataset.time = tint
  }, [])
  return null
}
