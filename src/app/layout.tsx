import type { Metadata } from 'next'
import './globals.css'
import Sparkles    from '@/components/Sparkles'
import AudioPlayer from '@/components/AudioPlayer'

export const metadata: Metadata = {
  title: 'A Night That Escalated Way Too Quickly',
  description: 'Make choices. Regret nothing. Get a cocktail.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Sparkles />
        {children}
        <AudioPlayer />
      </body>
    </html>
  )
}
