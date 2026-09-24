import './globals.scss'
import { Inter } from 'next/font/google'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export const metadata: Metadata = {
  title: `Directory Directory — The Directory of Directories`,
  description: `Find focused directories for what you're into. Start somewhere better.`,
  applicationName: `Directory Directory`,
  appleWebApp: { capable: true, title: `Directory Directory`, statusBarStyle: `default` },
}

export const viewport: Viewport = {
  width: `device-width`,
  initialScale: 1,
}

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang={`en`} id={`directory-document`}>
      <body id={`directory-body`} className={`directory-body ${inter.variable}`}>
        {children}
      </body>
    </html>
  )
}
