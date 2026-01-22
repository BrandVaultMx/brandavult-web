import { leads, getLeadByExpediente, getAllExpedientes } from '@/data/leads'
import { notFound } from 'next/navigation'
import Link from 'next/link'

// Generar rutas estáticas
export async function generateStaticParams() {
  return getAllExpedientes().map((expediente) => ({
    expediente,
  }))
}

// Metadata dinámica
export async function generateMetadata({ params }: { params: { expediente: string } }) {
  const lead = getLeadByExpediente(params.expediente)
  
  if (!lead) {
    return { title: 'Reporte no encontrado | BrandVault' }
  }
  
  return {
    title: `${lead.marca} - Diagnóstico de Marca | BrandVault`,
    description: `Reporte de declaración de uso para la marca ${lead.marca}. ${lead.diasRestantes} días restantes para cumplir con el Art. 233 LFPPI.`,
  }
}

// Componentes de iconos
const AlertIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const CalendarIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="4" width="18" height="18" rx="2" stroke="currentColor" strokeWidth="1.5"/>
    <path d="M16 2V6M8 2V6M3 10H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const WhatsAppIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
)

const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

// Función para obtener color de urgencia
function getUrgencyConfig(urgencia: string, diasRestantes: number) {
  if (diasRestantes <= 30 || urgencia === 'CRÍTICA') {
    return {
      color: 'text-red-400',
      bg: 'bg-red-500/10',
      border: 'border-red-500/30',
      label: 'URGENTE',
      description: 'Acción inmediata requerida'
    }
  }
  if (diasRestantes <= 90 || urgencia === 'ALTA') {
    return {
      color: 'text-amber-400',
      bg: 'bg-amber-500/10',
      border: 'border-amber-500/30',
      label: 'IMPORTANTE',
      description: 'Programar acción pronto'
    }
  }
  if (diasRestantes <= 150 || urgencia === 'MEDIA') {
    return {
      color: 'text-yellow-400',
      bg: 'bg-yellow-500/10',
      border: 'border-yellow-500/30',
      label: 'ATENCIÓN',
      description: 'Planificar en las próximas semanas'
    }
  }
  return {
    color: 'text-emerald-400',
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/30',
    label: 'ESTABLE',
    description: 'Tiempo disponible para actuar'
  }
}

// Formatear fecha
function formatDate(dateString: string) {
  const date = new Date(dateString)
  return date.toLocaleDateString('es-MX', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric'
  })
}

export default function ReportePage({ params }: { params: { expediente: string } }) {
  const lead = getLeadByExpediente(params.expediente)
  
  if (!lead) {
    notFound()
  }
  
  const urgencyConfig = getUrgencyConfig(lead.urgencia, lead.diasRestantes)
  const whatsappMessage = `Hola, vi el diagnóstico de mi marca "${lead.marca}" (Expediente: ${lead.expediente}). Me gustaría recibir ayuda con la Declaración de Uso.`
  
  return (
    <main className="min-h-screen bg-[#030303]">
      {/* Header */}
      <header className="border-b border-white/5">
        <div className="max-w-4xl mx-auto px-6 py-6">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="relative w-8 h-8">
              <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
                <defs>
                  <linearGradient id="goldGradientReport" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#B8962E"/>
                    <stop offset="50%" stopColor="#D4AF37"/>
                    <stop offset="100%" stopColor="#F1D592"/>
                  </linearGradient>
                </defs>
                <path 
                  d="M20 2L4 8V18C4 28 20 38 20 38C20 38 36 28 36 18V8L20 2Z" 
                  stroke="url(#goldGradientReport)" 
                  strokeWidth="2" 
                  fill="none"
                />
                <circle cx="20" cy="20" r="4" fill="url(#goldGradientReport)"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-lg font-bold tracking-wider text-white group-hover:text-gold-400 transition-colors">
                BRANDVAULT
              </span>
              <span className="text-[9px] tracking-[0.2em] text-gold-400/70 uppercase">
                Protección de Marcas
              </span>
            </div>
          </Link>
        </div>
      </header>
      
      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        {/* Alert Banner */}
        <div className={`${urgencyConfig.bg} ${urgencyConfig.border} border rounded-2xl p-5 mb-10 flex items-center gap-4`}>
          <div className={`${urgencyConfig.color}`}>
            <AlertIcon className="w-6 h-6" />
          </div>
          <div>
            <p className={`font-semibold ${urgencyConfig.color}`}>
              {urgencyConfig.label}
            </p>
            <p className="text-white/50 text-sm">
              {urgencyConfig.description}
            </p>
          </div>
        </div>
        
        {/* Brand Header */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 rounded-full border border-gold-400/20 bg-gold-400/5 text-xs tracking-[0.15em] text-gold-400 uppercase mb-6">
            Marca Registrada
          </span>
          
          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white mb-3">
            {lead.marca}
          </h1>
          
          <p className="text-white/40 text-sm">
            Expediente IMPI: {lead.expediente}
          </p>
        </div>
        
        {/* Info Card */}
        <div className="bg-gradient-to-b from-vault-light/50 to-vault-dark/50 border border-white/5 rounded-2xl p-8 mb-8">
          <h2 className="text-xs tracking-[0.2em] text-gold-400 uppercase mb-8 text-center">
            Diagnóstico de Declaración de Uso
          </h2>
          
          <div className="mb-8">
            <span className="text-xs text-white/40 uppercase tracking-wide">Titular</span>
            <p className="text-lg text-white font-medium mt-1">{lead.titular}</p>
          </div>
          
          <div className="grid sm:grid-cols-2 gap-6 mb-8">
            <div>
              <span className="text-xs text-white/40 uppercase tracking-wide">Fecha de Registro</span>
              <p className="text-white mt-1">{formatDate(lead.fechaRegistro)}</p>
            </div>
            <div>
              <span className="text-xs text-white/40 uppercase tracking-wide">Fecha Límite</span>
              <p className={`${urgencyConfig.color} font-semibold mt-1`}>
                {formatDate(lead.fechaLimite)}
              </p>
            </div>
          </div>
          
          {/* Countdown */}
          <div className="bg-vault-black/50 rounded-xl p-8 text-center border border-white/5">
            <div className="font-serif text-6xl sm:text-7xl text-gold-400 mb-2">
              {lead.diasRestantes}
            </div>
            <p className="text-white/40 text-sm tracking-[0.15em] uppercase">
              Días Restantes
            </p>
          </div>
        </div>
        
        {/* Explanation */}
        <div className="bg-vault-light/30 border border-white/5 rounded-2xl p-8 mb-10">
          <h3 className="font-serif text-xl text-white mb-4">
            ¿Qué significa esto?
          </h3>
          
          <p className="text-white/60 leading-relaxed mb-4">
            Según el <strong className="text-white">Artículo 233 de la LFPPI</strong>, todas las marcas 
            registradas deben presentar una <strong className="text-gold-400">Declaración de Uso</strong> ante 
            el IMPI dentro de los 3 años siguientes a su registro, con un período de gracia de 3 meses adicionales.
          </p>
          
          <p className="text-white/60 leading-relaxed">
            Si no se presenta a tiempo, <strong className="text-white">el registro de tu marca se cancela 
            automáticamente</strong> y cualquier tercero podría registrarla legalmente.
          </p>
        </div>
        
        {/* CTAs */}
        <div className="text-center">
          <h3 className="font-serif text-2xl text-white mb-3">
            ¿Necesitas ayuda con el trámite?
          </h3>
          <p className="text-white/50 mb-8">
            Nos encargamos de todo el proceso en 72 horas hábiles.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://calendly.com/brandvault/15min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-premium inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm"
            >
              <CalendarIcon className="w-5 h-5" />
              AGENDAR LLAMADA DE 15 MINUTOS
            </a>
            
            <a
              href={`https://wa.me/522294641516?text=${encodeURIComponent(whatsappMessage)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-outline-premium inline-flex items-center justify-center gap-3 px-8 py-4 rounded-xl text-sm"
            >
              <WhatsAppIcon className="w-5 h-5" />
              ESCRIBIR POR WHATSAPP
            </a>
          </div>
          
          {/* Guarantee */}
          <div className="inline-flex items-center gap-2 mt-8 px-5 py-2.5 rounded-full bg-emerald-500/10 border border-emerald-500/20">
            <CheckIcon className="w-4 h-4 text-emerald-400" />
            <span className="text-sm text-emerald-400">
              Si no es viable, no pagas. Diagnóstico sin costo.
            </span>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <footer className="border-t border-white/5 mt-20">
        <div className="max-w-4xl mx-auto px-6 py-8 text-center">
          <p className="text-xs text-white/30 mb-2">
            BrandVault | Protección de Marcas en México
          </p>
          <p className="text-xs text-white/20">
            Este reporte es informativo. La información se obtuvo de fuentes públicas del IMPI. 
            Consulta con un profesional para confirmar tu situación específica.
          </p>
        </div>
      </footer>
    </main>
  )
}
