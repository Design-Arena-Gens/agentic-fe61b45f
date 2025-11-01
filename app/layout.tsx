import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AI Psychologist',
  description: 'A supportive AI psychologist agent to help with your mental wellbeing',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
