import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-vault-black flex items-center justify-center px-6">
      <div className="max-w-md text-center">
        {/* Logo */}
        <Link href="/" className="inline-flex items-center gap-3 mb-12 group">
          <img src="/logo.png" alt="BrandVault" className="w-12 h-12 object-contain" />
          <span className="text-xl font-serif font-bold tracking-[0.15em] text-gold-400 group-hover:text-gold-300 transition-colors">
            BRANDVAULT
          </span>
        </Link>
        
        {/* Content */}
        <div className="card-premium rounded-2xl p-10">
          <span className="text-5xl block mb-6">🔍</span>
          <h1 className="text-2xl font-serif font-bold text-white mb-4">
            Expediente no encontrado
          </h1>
          <p className="text-sm text-white/50 mb-8 leading-relaxed">
            El número de expediente que buscas no está en nuestro sistema de alertas.
            Si crees que es un error o necesitas información sobre otra marca, contáctanos.
          </p>
          
          <div className="space-y-3">
            <a 
              href="https://wa.me/522294641516?text=Hola,%20no%20encontré%20mi%20marca%20en%20el%20sistema%20de%20reportes."
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold block w-full py-4 text-[10px] tracking-[0.15em] uppercase rounded-lg"
            >
              Contactar por WhatsApp
            </a>
            
            <Link 
              href="/"
              className="btn-gold-outline block w-full py-4 text-[10px] tracking-[0.15em] uppercase rounded-lg"
            >
              Volver al inicio
            </Link>
          </div>
        </div>
      </div>
    </main>
  )
}
