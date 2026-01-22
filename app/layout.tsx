import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BrandVault | Firma de Blindaje Federal',
  description: 'Protección estratégica de marcas en México. Auditoría, registro y blindaje jurídico de activos intangibles ante el IMPI.',
  keywords: 'registro de marca, IMPI, propiedad intelectual, protección de marca, México, blindaje federal',
  authors: [{ name: 'BrandVault' }],
  openGraph: {
    title: 'BrandVault | Firma de Blindaje Federal',
    description: 'Protección estratégica de marcas en México.',
    url: 'https://brandvault.mx',
    siteName: 'BrandVault',
    locale: 'es_MX',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BrandVault | Firma de Blindaje Federal',
    description: 'Protección estratégica de marcas en México.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="icon" type="image/png" href="/logo.png" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-vault-black text-white antialiased">
        {/* Noise overlay for texture */}
        <div className="noise-overlay" aria-hidden="true" />
        
        {children}
      </body>
    </html>
  )
}
