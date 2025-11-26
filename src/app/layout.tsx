import type { Metadata } from 'next'
import { Inter, Space_Grotesk, JetBrains_Mono } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://solucionesintegralesjs.com'),
  title: 'SOLUCIONES INTEGRALES JS S.A.C. | Ingeniería Industrial de Excelencia',
  description: 'Empresa peruana especializada en servicios de ingeniería, estructuras metálicas, piping industrial, montaje y mantenimiento. Más de 15 años de experiencia.',
  keywords: [
    'estructuras metálicas',
    'piping industrial',
    'montaje industrial',
    'ingeniería estructural',
    'obras civiles',
    'mantenimiento industrial',
    'Lima',
    'Perú'
  ],
  authors: [{ name: 'SOLUCIONES INTEGRALES JS S.A.C.' }],
  openGraph: {
    title: 'SOLUCIONES INTEGRALES JS S.A.C.',
    description: 'Ingeniería Industrial de Excelencia - Transformamos visiones en estructuras reales',
    type: 'website',
    locale: 'es_PE',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans bg-graphite text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
