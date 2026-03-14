import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'everlong — letters that last',
  description: 'a slow letter platform for people who believe real things take time.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
