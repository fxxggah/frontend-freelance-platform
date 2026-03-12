import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" })

export const metadata: Metadata = {
  title: 'ClickJob - Plataforma Freelance',
  description: 'Plataforma para conectar freelancers e empregadores. Publique e encontre oportunidades de trabalho.',
  generator: 'Gabriel Oliveira'
}

export const viewport: Viewport = {
  themeColor: '#0d9488',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} font-sans antialiased`}>
        {/* O Navbar foi removido daqui para não aparecer na Landing Page */}
        {children}
        <Analytics />
      </body>
    </html>
  )
}