'use client'

import Image from 'next/image'
import { useState } from 'react'

export default function Home() {
  const [name, setName] = useState('')
  const [brand, setBrand] = useState('')

  const handleWhatsApp = () => {
    const phone = '522294641516'
    let message = 'Hola BrandVault, quiero información sobre el blindaje de mi marca.'
    
    if (name && brand) {
      message = `Hola, soy ${name}. Solicito el Diagnóstico de Viabilidad para la marca: *${brand}*.`
    } else if (brand) {
      message = `Hola, solicito el Diagnóstico de Viabilidad para la marca: *${brand}*.`
    }
    
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(message)}`, '_blank')
  }

  const handlePayment = (type: string) => {
    const phone = '522294641516'
    const messages: Record<string, string> = {
      factura: 'Hola BrandVault, requiero Factura para mi blindaje. ¿Cuál es el proceso?',
      spei: 'Hola BrandVault, prefiero pagar vía Transferencia SPEI. ¿Me comparten la cuenta?',
      consultoria: 'Hola BrandVault, solicito una consultoría directa sobre el blindaje de mi marca.',
    }
    window.open(`https://api.whatsapp.com/send?phone=${phone}&text=${encodeURIComponent(messages[type] || '')}`, '_blank')
  }

  return (
    <main className="min-h-screen">
      {/* Announcement Bar */}
      <div className="w-full bg-gradient-to-r from-gold-500 via-gold-400 to-gold-500 text-vault-black py-2.5 px-4 text-center relative z-50">
        <p className="text-[10px] md:text-xs uppercase tracking-[0.2em] font-bold flex items-center justify-center gap-2">
          <span className="w-2 h-2 bg-vault-black rounded-full animate-pulse" />
          Protege tu marca antes de que alguien más lo haga
        </p>
      </div>

      {/* Navigation */}
      <nav className="w-full bg-vault-black/90 backdrop-blur-md border-b border-white/5 py-4 px-6 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <img src="/logo.png" alt="BrandVault" className="w-11 h-11 object-contain" />
            <div className="flex flex-col">
              <span className="text-xl font-serif font-bold tracking-[0.15em] text-white leading-none">BRANDVAULT</span>
              <span className="text-[8px] uppercase tracking-[0.35em] text-gold-400/70">Firma de Blindaje</span>
            </div>
          </div>
          
          <div className="hidden md:flex gap-10 text-[10px] uppercase tracking-[0.2em] font-medium text-white/50">
            <a href="#metodologia" className="hover:text-gold-400 transition-colors link-underline">Metodología</a>
            <a href="#inversion" className="hover:text-gold-400 transition-colors link-underline">Inversión</a>
            <a href="#faq" className="hover:text-gold-400 transition-colors link-underline">FAQ</a>
          </div>

          <button 
            onClick={() => handlePayment('consultoria')}
            className="hidden md:block border border-gold-400/50 text-gold-400 px-6 py-2.5 text-[9px] uppercase tracking-[0.2em] hover:bg-gold-400 hover:text-vault-black transition-all duration-300"
          >
            Consultoría
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="hero-gradient relative min-h-[90vh] flex items-center justify-center px-6 py-20 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-10 w-72 h-72 bg-gold-400/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gold-400/3 rounded-full blur-[120px]" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-5 py-2.5 bg-white/5 border border-white/10 rounded-full mb-10 animate-fade-in-up">
            <span className="w-1.5 h-1.5 bg-gold-400 rounded-full" />
            <span className="text-[10px] uppercase tracking-[0.25em] text-gold-400 font-medium">Auditoría de Activos Intangibles</span>
          </div>
          
          {/* Main headline */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif leading-[0.95] mb-8 animate-fade-in-up animation-delay-100">
            <span className="text-white">Blindaje </span>
            <span className="text-gold-gradient">Federal</span>
            <br />
            <span className="text-white/90 text-[0.85em]">de Marcas</span>
          </h1>
          
          {/* Subheadline */}
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-14 font-light leading-relaxed animate-fade-in-up animation-delay-200">
            No registramos marcas; construimos la armadura jurídica que protege tu patrimonio contra infracciones y robo de identidad.
          </p>

          {/* CTA Form */}
          <div className="w-full max-w-3xl mx-auto animate-fade-in-up animation-delay-300">
            <div className="bg-vault-medium/80 backdrop-blur-sm border border-white/10 p-2 rounded-lg shadow-2xl shadow-black/50">
              <div className="grid md:grid-cols-3 gap-2">
                <input 
                  type="text"
                  placeholder="Tu nombre"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="bg-vault-light/50 text-white px-5 py-4 text-sm border border-white/5 placeholder-white/30 rounded focus:border-gold-400/50 transition-colors"
                />
                <input 
                  type="text"
                  placeholder="Nombre de la marca"
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  className="bg-vault-light/50 text-white px-5 py-4 text-sm border border-white/5 placeholder-white/30 rounded focus:border-gold-400/50 transition-colors"
                />
                <button 
                  onClick={handleWhatsApp}
                  className="btn-gold py-4 px-6 text-[10px] tracking-[0.15em] uppercase rounded font-bold"
                >
                  Diagnóstico Gratuito
                </button>
              </div>
            </div>
            <p className="text-[10px] text-white/30 mt-4 tracking-wide">
              ✓ Sin compromiso · ✓ Respuesta en 24 horas · ✓ 100% Confidencial
            </p>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap justify-center gap-8 mt-16 opacity-40 items-center animate-fade-in-up animation-delay-400">
            <span className="text-sm font-bold tracking-widest">IMPI</span>
            <span className="text-sm tracking-wider">mercadopago</span>
            <span className="text-sm italic tracking-wider">PayPal</span>
            <span className="text-sm font-serif italic tracking-widest">SPEI</span>
          </div>
        </div>
      </section>

      {/* Risk Section */}
      <section className="w-full py-28 px-6 bg-vault-darker border-t border-white/5">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div>
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold-400 font-bold">Vulnerabilidad Crítica</span>
            <h2 className="text-4xl md:text-5xl font-serif mt-4 mb-8 text-white leading-tight">
              El costo de operar<br />
              <span className="text-white/60">sin blindaje.</span>
            </h2>
            <p className="text-white/50 mb-10 leading-relaxed">
              Sin un Título de Registro, tu marca es invisible para la ley. Estás invirtiendo tiempo y dinero en un activo que legalmente no te pertenece.
            </p>
            
            <div className="space-y-8 border-l border-white/10 pl-8">
              <div className="group cursor-default">
                <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold-400 transition-colors">
                  Multas hasta $28.2 Millones MXN
                </h3>
                <p className="text-sm text-white/40">
                  El IMPI impone sanciones administrativas severas por uso no autorizado de marca registrada.
                </p>
              </div>
              <div className="group cursor-default">
                <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold-400 transition-colors">
                  Clausura de Canales Digitales
                </h3>
                <p className="text-sm text-white/40">
                  Pérdida inmediata de cuentas en redes sociales y dominios web ante una denuncia formal.
                </p>
              </div>
              <div className="group cursor-default">
                <h3 className="text-white font-serif text-xl mb-2 group-hover:text-gold-400 transition-colors">
                  Robo de Identidad Comercial
                </h3>
                <p className="text-sm text-white/40">
                  Un tercero puede registrar legalmente tu marca y demandarte por usarla.
                </p>
              </div>
            </div>
          </div>

          <div className="card-premium rounded-xl p-12 text-center h-[450px] flex flex-col justify-center items-center relative overflow-hidden group">
            <div className="absolute inset-0 bg-gradient-to-br from-gold-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <span className="text-7xl mb-8 relative z-10 filter drop-shadow-[0_0_30px_rgba(212,175,55,0.3)]">♟️</span>
            <p className="text-base uppercase tracking-[0.2em] text-white relative z-10 font-bold mb-4 leading-relaxed">
              "Aunque no quieras jugar,<br />estás en el tablero"
            </p>
            <p className="text-xs text-white/40 relative z-10 max-w-xs mx-auto">
              Crear tu negocio te metió al juego. Sin Blindaje Federal, tu patrimonio está en jaque desde el día uno.
            </p>
          </div>
        </div>
      </section>

      {/* Methodology Section */}
      <section id="metodologia" className="w-full py-28 px-6 section-gradient border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center mb-20">
          <span className="text-[10px] uppercase tracking-[0.3em] text-gold-400 font-bold">Metodología</span>
          <h2 className="text-4xl md:text-5xl font-serif text-white mt-4">
            Blindaje en <span className="text-gold-gradient">3 Etapas</span>
          </h2>
        </div>

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            {
              num: '01',
              title: 'Diagnóstico',
              desc: 'Auditoría fonética profunda para descartar conflictos con marcas similares antes de invertir.'
            },
            {
              num: '02', 
              title: 'Estrategia',
              desc: 'Redacción técnica bajo la Clasificación de Niza para blindar correctamente tus productos y servicios.'
            },
            {
              num: '03',
              title: 'Título Oficial',
              desc: 'Gestión burocrática total hasta la entrega del Título de Propiedad Intelectual en tu mano.'
            }
          ].map((step, i) => (
            <div 
              key={step.num}
              className="card-premium rounded-xl p-10 group"
            >
              <span className="text-5xl font-serif text-gold-400/80 group-hover:text-gold-400 transition-colors block mb-6">
                {step.num}
              </span>
              <h3 className="text-sm font-bold uppercase tracking-[0.2em] mb-4 text-white">
                {step.title}
              </h3>
              <p className="text-sm text-white/40 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing Section */}
      <section id="inversion" className="w-full py-28 px-6 bg-vault-darker border-t border-white/5">
        <div className="max-w-3xl mx-auto">
          <div className="relative p-[1px] rounded-2xl bg-gradient-to-br from-gold-400 via-gold-500 to-gold-600 shadow-2xl shadow-gold-400/20">
            <div className="bg-vault-black rounded-2xl p-12 md:p-16 relative overflow-hidden">
              {/* Decorative glow */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-32 bg-gold-400/10 blur-[80px]" />
              
              <div className="text-center relative z-10">
                <span className="text-[10px] uppercase tracking-[0.3em] text-white/50 font-medium">
                  Honorarios Profesionales
                </span>
                
                <div className="mt-8 mb-2">
                  <span className="text-7xl md:text-8xl font-serif text-white">$5,800</span>
                </div>
                <p className="text-[10px] uppercase tracking-[0.2em] text-gold-400 font-bold mb-12">
                  MXN + IVA • Por Clase Internacional
                </p>

                {/* Features */}
                <div className="grid grid-cols-2 gap-4 max-w-md mx-auto mb-12 text-left">
                  {[
                    'Pago de Derechos IMPI',
                    'Estrategia de Clasificación',
                    'Diagnóstico de Viabilidad',
                    'Título Digital Oficial'
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-3 text-xs text-white/60">
                      <span className="text-gold-400">✓</span>
                      {feature}
                    </div>
                  ))}
                </div>

                {/* Guarantee */}
                <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-6 py-3 mb-10 inline-block">
                  <p className="text-[10px] text-green-400 font-bold tracking-[0.15em] uppercase">
                    ✓ Garantía: Si no es registrable, no pagas honorarios
                  </p>
                </div>

                {/* CTA */}
                <div className="space-y-4">
                  <a 
                    href="https://mpago.la/2jfXZ5W" 
                    target="_blank"
                    className="btn-gold block w-full py-5 text-[11px] tracking-[0.15em] uppercase rounded-lg"
                  >
                    Iniciar Blindaje con Mercado Pago →
                  </a>
                  
                  <div className="flex justify-center gap-8 pt-4">
                    <button 
                      onClick={() => handlePayment('factura')}
                      className="text-[9px] text-white/40 uppercase tracking-[0.15em] hover:text-gold-400 transition-colors link-underline"
                    >
                      Solicitar Factura
                    </button>
                    <button 
                      onClick={() => handlePayment('spei')}
                      className="text-[9px] text-white/40 uppercase tracking-[0.15em] hover:text-gold-400 transition-colors link-underline"
                    >
                      Transferencia SPEI
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="w-full py-28 px-6 section-gradient border-t border-white/5">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-20">
            <span className="text-[10px] uppercase tracking-[0.3em] text-gold-400 font-bold">FAQ</span>
            <h2 className="text-4xl font-serif text-white mt-4">Preguntas Frecuentes</h2>
          </div>
          
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {[
              {
                q: '¿Los $5,800 ya incluyen el pago al Gobierno?',
                a: 'Sí, absolutamente. Es una tarifa "All-Inclusive". Nosotros cubrimos los Derechos Federales del IMPI por ti.'
              },
              {
                q: '¿Qué pasa si rechazan mi marca?',
                a: 'Aplicamos "Cero Riesgo". Antes de cobrarte, hacemos una auditoría profunda. Si vemos riesgo, te lo decimos y no gastas.'
              },
              {
                q: '¿Protege solo el nombre o también el logo?',
                a: 'Protegemos AMBOS sin costo adicional en la misma solicitud.'
              },
              {
                q: '¿Cuánto tarda el registro?',
                a: 'La resolución oficial toma de 4 a 6 meses. Sin embargo, tu protección legal inicia en 24 horas tras ingresar la solicitud.'
              },
              {
                q: '¿Tengo que ir a firmar papeles?',
                a: 'No. Todo el proceso es 100% digital y remoto. Nosotros gestionamos la burocracia con nuestra FIEL de gestores acreditados.'
              },
              {
                q: '¿Necesito estar dado de alta en el SAT?',
                a: 'No es obligatorio. Puedes proteger tu marca como Persona Física con tu CURP o como Empresa.'
              }
            ].map((item, i) => (
              <div key={i}>
                <h3 className="text-white font-serif text-lg mb-3 border-l-2 border-gold-400 pl-5">
                  {item.q}
                </h3>
                <p className="text-sm text-white/50 leading-relaxed pl-5">
                  {item.a}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="w-full py-24 px-6 bg-vault-black border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[10px] uppercase tracking-[0.25em] text-white/30 mb-8">Canal de Consultoría</p>
          <a 
            href="mailto:contacto@brandvault.mx" 
            className="text-2xl md:text-4xl font-serif text-white hover:text-gold-400 transition-colors duration-300"
          >
            contacto@brandvault.mx
          </a>
          
          <div className="flex justify-center gap-8 mt-12 text-white/30">
            <a 
              href="https://www.instagram.com/brandvaultmx/" 
              target="_blank"
              className="hover:text-gold-400 transition-colors"
            >
              <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-vault-black border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 text-center">
          <div className="flex items-center justify-center gap-2 mb-4 opacity-50">
            <img src="/logo.png" alt="BV" className="w-5 h-5 object-contain" />
            <span className="text-[10px] font-serif font-bold tracking-[0.2em]">BRANDVAULT</span>
          </div>
          <p className="text-[8px] uppercase tracking-[0.2em] text-white/30 mb-2">
            Metodología validada por talento del Tecnológico de Monterrey
          </p>
          <p className="text-[8px] uppercase tracking-[0.15em] text-white/20">
            © 2026 Firma de Blindaje Federal. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </main>
  )
}
