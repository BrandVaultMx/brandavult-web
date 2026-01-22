import { leads, getLead } from '@/data/leads'
import { notFound } from 'next/navigation'
import Link from 'next/link'

// Generate static paths for all leads
export async function generateStaticParams() {
  return Object.keys(leads).map((expediente) => ({
    expediente,
  }))
}

// Metadata for SEO
export async function generateMetadata({ params }: { params: { expediente: string } }) {
  const lead = getLead(params.expediente)
  
  if (!lead) {
    return { title: 'Marca no encontrada | BrandVault' }
  }
  
  return {
    title: `${lead.marca} - Reporte de Marca | BrandVault`,
    description: `Diagnóstico de Declaración de Uso para ${lead.marca}. Fecha límite: ${lead.fechaLimite}`,
  }
}

// Urgency configuration
const urgenciaConfig = {
  'CRÍTICO': {
    bgClass: 'bg-red-500/10',
    borderClass: 'border-red-500',
    textClass: 'text-red-500',
    emoji: '🔴',
    message: 'Acción inmediata requerida'
  },
  'URGENTE': {
    bgClass: 'bg-orange-500/10',
    borderClass: 'border-orange-500',
    textClass: 'text-orange-500',
    emoji: '🟠',
    message: 'Actuar en las próximas semanas'
  },
  'IMPORTANTE': {
    bgClass: 'bg-gold-400/10',
    borderClass: 'border-gold-400',
    textClass: 'text-gold-400',
    emoji: '🟡',
    message: 'Programar acción pronto'
  },
  'PREVENTIVO': {
    bgClass: 'bg-green-500/10',
    borderClass: 'border-green-500',
    textClass: 'text-green-500',
    emoji: '🟢',
    message: 'Tiempo suficiente para planificar'
  }
}

export default function ReporteMarca({ params }: { params: { expediente: string } }) {
  const lead = getLead(params.expediente)
  
  if (!lead) {
    notFound()
  }

  const config = urgenciaConfig[lead.urgencia]
  const whatsappMessage = encodeURIComponent(
    `Hola, vi el reporte de mi marca ${lead.marca} (expediente ${lead.expediente}) y me gustaría más información sobre la declaración de uso.`
  )

  return (
    <main className="min-h-screen bg-vault-black">
      {/* Header */}
      <header className="w-full py-6 px-6 border-b border-white/5">
        <div className="max-w-2xl mx-auto">
          <Link href="/" className="flex items-center gap-3 justify-center group">
            <img src="/logo.png" alt="BrandVault" className="w-10 h-10 object-contain" />
            <div className="flex flex-col">
              <span className="text-lg font-serif font-bold tracking-[0.15em] text-gold-400 group-hover:text-gold-300 transition-colors">
                BRANDVAULT
              </span>
              <span className="text-[7px] uppercase tracking-[0.35em] text-white/40">
                Protección de Marcas
              </span>
            </div>
          </Link>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 py-10">
        {/* Alert Box */}
        <div className={`flex items-center gap-5 p-5 rounded-xl border-2 ${config.bgClass} ${config.borderClass} mb-10 animate-fade-in-up`}>
          <span className="text-4xl">{config.emoji}</span>
          <div>
            <p className={`text-base font-bold tracking-wide ${config.textClass}`}>
              {lead.urgencia}
            </p>
            <p className="text-sm text-white/50">{config.message}</p>
          </div>
        </div>

        {/* Brand Name Section */}
        <div className="text-center mb-10 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
          <span className="inline-block px-4 py-2 bg-gold-400/10 border border-gold-400/30 rounded-full text-[9px] uppercase tracking-[0.2em] text-gold-400 mb-6">
            Marca Registrada
          </span>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-white mb-3 leading-tight">
            {lead.marca}
          </h1>
          <p className="text-sm text-white/40">
            Expediente IMPI: {lead.expediente}
          </p>
        </div>

        {/* Report Card */}
        <div className="card-premium rounded-2xl p-8 md:p-10 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-gold-400 mb-8 pb-4 border-b border-white/10">
            Diagnóstico de Declaración de Uso
          </h2>
          
          <div className="space-y-6">
            {/* Titular */}
            <div>
              <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2">Titular</p>
              <p className="text-base text-white font-medium">{lead.titular}</p>
            </div>
            
            {/* Dates Row */}
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2">Fecha de Registro</p>
                <p className="text-base text-white">{lead.fechaRegistro}</p>
              </div>
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-white/40 mb-2">Fecha Límite</p>
                <p className={`text-base font-bold ${lead.diasRestantes <= 60 ? 'text-red-400' : 'text-gold-400'}`}>
                  {lead.fechaLimite}
                </p>
              </div>
            </div>

            {/* Days Counter */}
            <div className="bg-vault-light rounded-xl p-8 text-center relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-gold-600 via-gold-400 to-gold-600" />
              <p className="text-6xl md:text-7xl font-serif font-bold text-gold-400 leading-none mb-2">
                {lead.diasRestantes}
              </p>
              <p className="text-[10px] uppercase tracking-[0.25em] text-white/40">
                días restantes
              </p>
            </div>
          </div>
        </div>

        {/* Info Section */}
        <div className="card-premium rounded-2xl p-8 mb-8 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <h3 className="text-lg font-serif font-semibold text-white mb-5">¿Qué significa esto?</h3>
          <div className="space-y-4 text-sm text-white/60 leading-relaxed">
            <p>
              Según el <strong className="text-white">Artículo 233 de la LFPPI</strong>, todas las marcas 
              registradas deben presentar una <strong className="text-white">Declaración de Uso</strong> ante 
              el IMPI dentro de los 3 años siguientes a su registro, con un período de gracia de 3 meses adicionales.
            </p>
            <p className="text-white/80 font-medium">
              Si no se presenta a tiempo, el registro de tu marca se cancela automáticamente y cualquier 
              tercero podría registrarla legalmente.
            </p>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center py-8 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <h3 className="text-2xl font-serif font-semibold text-white mb-3">
            ¿Necesitas ayuda con el trámite?
          </h3>
          <p className="text-sm text-white/50 mb-8">
            Nos encargamos de todo el proceso en 72 horas hábiles.
          </p>
          
          <div className="space-y-3">
            <a 
              href="https://calendly.com/roberto-consultoria-brandvault/brandvault-revision-de-marca-15-min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold block w-full py-5 text-[11px] tracking-[0.15em] uppercase rounded-lg"
            >
              📅 Agendar llamada de 15 minutos
            </a>
            
            <a 
              href={`https://wa.me/522294641516?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-gold-outline block w-full py-5 text-[11px] tracking-[0.15em] uppercase rounded-lg"
            >
              💬 Escribir por WhatsApp
            </a>
          </div>

          {/* Guarantee */}
          <div className="mt-8 inline-flex items-center gap-3 px-5 py-3 bg-green-500/10 rounded-lg">
            <span className="text-green-400">✓</span>
            <span className="text-xs text-green-400">
              Si no es viable, no pagas. Diagnóstico sin costo.
            </span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="py-10 px-6 border-t border-white/5">
        <div className="max-w-2xl mx-auto text-center">
          <p className="text-xs text-white/40 mb-3">
            BrandVault | Protección de Marcas en México
          </p>
          <p className="text-[10px] text-white/20 leading-relaxed max-w-md mx-auto">
            Este reporte es informativo. La información se obtuvo de fuentes públicas del IMPI. 
            Consulta con un profesional para confirmar tu situación específica.
          </p>
        </div>
      </footer>
    </main>
  )
}
