import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen bg-[#030303] flex items-center justify-center px-6">
      <div className="text-center max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <div className="relative w-16 h-16">
            <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
              <defs>
                <linearGradient id="goldGradient404" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="#B8962E"/>
                  <stop offset="50%" stopColor="#D4AF37"/>
                  <stop offset="100%" stopColor="#F1D592"/>
                </linearGradient>
              </defs>
              <path 
                d="M20 2L4 8V18C4 28 20 38 20 38C20 38 36 28 36 18V8L20 2Z" 
                stroke="url(#goldGradient404)" 
                strokeWidth="2" 
                fill="none"
                opacity="0.5"
              />
            </svg>
          </div>
        </div>
        
        <h1 className="font-serif text-5xl text-white mb-4">404</h1>
        
        <p className="text-white/50 mb-8">
          Este expediente no se encuentra en nuestro sistema. 
          Verifica el número o contacta a nuestro equipo.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="btn-premium px-6 py-3 rounded-xl text-sm inline-block"
          >
            IR AL INICIO
          </Link>
          
          <a
            href="https://wa.me/522294641516?text=Hola,%20tengo%20una%20consulta%20sobre%20un%20expediente%20de%20marca"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-outline-premium px-6 py-3 rounded-xl text-sm inline-block"
          >
            CONTACTAR
          </a>
        </div>
      </div>
    </main>
  )
}
