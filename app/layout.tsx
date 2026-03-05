import type { Metadata } from 'next'
import { Cormorant_Garamond, Outfit, Caveat } from 'next/font/google'
import './globals.css'

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-serif',
})

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['200', '300', '400', '500'],
  variable: '--font-sans',
})

const caveat = Caveat({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-hand',
})

export const metadata: Metadata = {
  title: 'everlong — letters that last',
  description: 'a slow letter platform for people who believe real things take time.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${cormorant.variable} ${outfit.variable} ${caveat.variable}`}>
      <body className="bg-bg text-txt font-sans font-light antialiased min-h-screen overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
