import type { Metadata, Viewport } from 'next'
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

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#0056A6',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://solucionesintegralesjs.com'),
  title: {
    default: 'SOLUCIONES INTEGRALES JS S.A.C. | Ingeniería Industrial de Excelencia en Perú',
    template: '%s | SOLUCIONES INTEGRALES JS S.A.C.',
  },
  description: 'Empresa peruana líder en ingeniería industrial: estructuras metálicas, piping industrial, montaje, obras civiles y mantenimiento. +15 años de experiencia. Clientes: Goodyear, Backus, San Fernando, Ransa. Lima, Perú.',
  keywords: [
    // Servicios principales
    'estructuras metálicas Lima',
    'estructuras metálicas Perú',
    'piping industrial',
    'montaje industrial',
    'ingeniería estructural',
    'obras civiles industriales',
    'mantenimiento industrial',
    'soldadura industrial',
    'tanques industriales',
    'tuberías industriales',
    // Ubicación
    'ingeniería Lima',
    'ingeniería Perú',
    'construcción industrial Lima',
    'empresa de ingeniería Perú',
    // Servicios específicos
    'fabricación estructuras metálicas',
    'montaje de equipos industriales',
    'instalación de tuberías',
    'señalización industrial',
    'mantenimiento preventivo industrial',
    'diseño estructural',
    'cálculo estructural',
    // Industrias
    'industria manufacturera',
    'plantas industriales',
    'naves industriales',
    'almacenes industriales',
  ],
  authors: [{ name: 'SOLUCIONES INTEGRALES JS S.A.C.', url: 'https://solucionesintegralesjs.com' }],
  creator: 'SOLUCIONES INTEGRALES JS S.A.C.',
  publisher: 'SOLUCIONES INTEGRALES JS S.A.C.',
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  category: 'Ingeniería Industrial',
  classification: 'Servicios de Ingeniería',
  referrer: 'origin-when-cross-origin',
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'SOLUCIONES INTEGRALES JS S.A.C. | Ingeniería Industrial de Excelencia',
    description: 'Empresa peruana líder en estructuras metálicas, piping industrial, montaje y mantenimiento. +15 años transformando la industria peruana.',
    type: 'website',
    locale: 'es_PE',
    url: 'https://solucionesintegralesjs.com',
    siteName: 'SOLUCIONES INTEGRALES JS S.A.C.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'SOLUCIONES INTEGRALES JS S.A.C. - Ingeniería Industrial de Excelencia',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'SOLUCIONES INTEGRALES JS S.A.C. | Ingeniería Industrial',
    description: 'Estructuras metálicas, piping industrial, montaje y mantenimiento en Perú. +15 años de experiencia.',
    images: ['/og-image.jpg'],
    creator: '@solucionesjs',
  },
  alternates: {
    canonical: 'https://solucionesintegralesjs.com',
    languages: {
      'es-PE': 'https://solucionesintegralesjs.com',
      'es': 'https://solucionesintegralesjs.com',
    },
  },
  verification: {
    google: 'tu-codigo-de-verificacion-google',
    // yandex: 'tu-codigo-yandex',
    // bing: 'tu-codigo-bing',
  },
  other: {
    'geo.region': 'PE-LIM',
    'geo.placename': 'Lima',
    'geo.position': '-12.0464;-77.0428',
    'ICBM': '-12.0464, -77.0428',
    'rating': 'general',
    'distribution': 'global',
    'revisit-after': '7 days',
  },
}

// Schema.org JSON-LD structured data
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://solucionesintegralesjs.com/#organization',
      name: 'SOLUCIONES INTEGRALES JS S.A.C.',
      alternateName: 'Soluciones Integrales JS',
      url: 'https://solucionesintegralesjs.com',
      logo: {
        '@type': 'ImageObject',
        url: 'https://solucionesintegralesjs.com/logo.png',
        width: 512,
        height: 512,
      },
      description: 'Empresa peruana especializada en ingeniería industrial: estructuras metálicas, piping, montaje, obras civiles y mantenimiento. Más de 15 años de experiencia.',
      foundingDate: '2009',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lima',
        addressRegion: 'Lima',
        addressCountry: 'PE',
      },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+51-999-999-999',
          contactType: 'customer service',
          availableLanguage: ['Spanish'],
          areaServed: 'PE',
        },
      ],
      sameAs: [
        'https://linkedin.com/company/soluciones-integrales-js',
        'https://facebook.com/solucionesintegralesjs',
        'https://instagram.com/solucionesintegralesjs',
      ],
      knowsAbout: [
        'Estructuras Metálicas',
        'Piping Industrial',
        'Montaje Industrial',
        'Ingeniería Estructural',
        'Obras Civiles',
        'Mantenimiento Industrial',
        'Soldadura Industrial',
        'Tanques Industriales',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': 'https://solucionesintegralesjs.com/#website',
      url: 'https://solucionesintegralesjs.com',
      name: 'SOLUCIONES INTEGRALES JS S.A.C.',
      description: 'Ingeniería Industrial de Excelencia en Perú',
      publisher: {
        '@id': 'https://solucionesintegralesjs.com/#organization',
      },
      inLanguage: 'es-PE',
    },
    {
      '@type': 'LocalBusiness',
      '@id': 'https://solucionesintegralesjs.com/#localbusiness',
      name: 'SOLUCIONES INTEGRALES JS S.A.C.',
      image: 'https://solucionesintegralesjs.com/og-image.jpg',
      '@type': ['LocalBusiness', 'ProfessionalService'],
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Lima',
        addressRegion: 'Lima',
        addressCountry: 'PE',
      },
      geo: {
        '@type': 'GeoCoordinates',
        latitude: -12.0464,
        longitude: -77.0428,
      },
      url: 'https://solucionesintegralesjs.com',
      telephone: '+51-999-999-999',
      priceRange: '$$',
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '18:00',
        },
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: 'Saturday',
          opens: '08:00',
          closes: '13:00',
        },
      ],
      areaServed: {
        '@type': 'Country',
        name: 'Perú',
      },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: 'Servicios de Ingeniería Industrial',
        itemListElement: [
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Estructuras Metálicas',
              description: 'Diseño, fabricación y montaje de estructuras metálicas para naves industriales, almacenes y edificaciones.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Piping Industrial',
              description: 'Sistemas de tuberías para vapor, gases, líquidos y productos químicos.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Montaje Industrial',
              description: 'Montaje y desmontaje de equipos industriales y maquinaria.',
            },
          },
          {
            '@type': 'Offer',
            itemOffered: {
              '@type': 'Service',
              name: 'Mantenimiento Industrial',
              description: 'Mantenimiento preventivo y correctivo para instalaciones industriales.',
            },
          },
        ],
      },
    },
  ],
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {/* Preconnect to external resources */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
      </head>
      <body className={`${inter.variable} ${spaceGrotesk.variable} ${jetbrainsMono.variable} font-sans bg-graphite text-white antialiased`}>
        {children}
      </body>
    </html>
  )
}
