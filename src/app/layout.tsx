import type { Metadata } from 'next'
import './globals.css'
import Sparkles        from '@/components/Sparkles'
import AudioPlayer     from '@/components/AudioPlayer'
import BootScreen      from '@/components/BootScreen'
import TimeOfDayTint   from '@/components/TimeOfDayTint'
import KonamiListener  from '@/components/KonamiListener'
import LanguageToggle  from '@/components/LanguageToggle'
import { LanguageProvider } from '@/context/LanguageContext'

export const metadata: Metadata = {
  title: 'A Night That Escalated Way Too Quickly',
  description: 'Make choices. Regret nothing. Get a cocktail.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <LanguageProvider>
          <LanguageToggle />
          <BootScreen />
          <TimeOfDayTint />
          <KonamiListener />
          <Sparkles />
          {children}
          <AudioPlayer />
        </LanguageProvider>
      </body>
    </html>
  )
}
