import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'BrandVault | Firma de Blindaje Federal de Marcas',
  description: 'Protección estratégica de marcas en México. Auditoría, registro y blindaje jurídico de activos intangibles ante el IMPI. Garantía de cero riesgo.',
  keywords: 'registro de marca México, IMPI, propiedad intelectual, protección de marca, blindaje federal',
  authors: [{ name: 'BrandVault' }],
  metadataBase: new URL('https://brandvault.mx'),
  openGraph: {
    title: 'BrandVault | Firma de Blindaje Federal de Marcas',
    description: 'Protección estratégica de marcas en México. Blindaje jurídico ante el IMPI.',
    url: 'https://brandvault.mx',
    siteName: 'BrandVault',
    locale: 'es_MX',
    type: 'website',
  },
  robots: { index: true, follow: true },
  icons: { icon: '/logo.png' },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="bg-[#030303] text-white antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  )
}
