'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { FadeIn, StaggerContainer, StaggerItem, ScaleOnHover, Magnetic, ShimmerText } from '@/components/animations'

// ============================================
// ICONOS SVG PREMIUM
// ============================================

const ShieldIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L4 6V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V6L12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ScaleIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 3V21M12 3L6 8M12 3L18 8M3 12H9M15 12H21M3 12L8 7M3 12L8 17M21 12L16 7M21 12L16 17" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const DocumentIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M14 2V8H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 13H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 17H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M10 9H9H8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const AlertIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 9V13M12 17H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0377 2.66667 10.2679 4L3.33975 16C2.56995 17.3333 3.53223 19 5.07183 19Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const CheckIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ArrowRightIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const ChevronDownIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const InstagramIcon = ({ className = "w-5 h-5" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)

// ============================================
// LOGO COMPONENT
// ============================================

const Logo = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center gap-3 ${className}`}>
    <div className="relative w-10 h-10">
      {/* Shield base */}
      <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B8962E"/>
            <stop offset="50%" stopColor="#D4AF37"/>
            <stop offset="100%" stopColor="#F1D592"/>
          </linearGradient>
        </defs>
        <path 
          d="M20 2L4 8V18C4 28 20 38 20 38C20 38 36 28 36 18V8L20 2Z" 
          stroke="url(#goldGradient)" 
          strokeWidth="2" 
          fill="none"
        />
        <path 
          d="M20 10L12 14V20C12 25 20 30 20 30C20 30 28 25 28 20V14L20 10Z" 
          fill="url(#goldGradient)" 
          opacity="0.3"
        />
        <circle cx="20" cy="20" r="4" fill="url(#goldGradient)"/>
      </svg>
    </div>
    <div className="flex flex-col">
      <span className="text-xl font-bold tracking-wider text-white">BRANDVAULT</span>
      <span className="text-[10px] tracking-[0.3em] text-gold-400/80 uppercase">Firma de Blindaje</span>
    </div>
  </div>
)

// ============================================
// NAVIGATION
// ============================================

function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  const navItems = [
    { label: 'Metodología', href: '#metodologia' },
    { label: 'Inversión', href: '#inversion' },
    { label: 'FAQ', href: '#faq' },
  ]
  
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled 
          ? 'bg-[#030303]/80 backdrop-blur-xl border-b border-white/5' 
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <motion.a 
            href="#" 
            className="relative z-10"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Logo />
          </motion.a>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item) => (
              <motion.a
                key={item.href}
                href={item.href}
                className="text-sm text-white/70 hover:text-white transition-colors duration-300 link-underline"
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.label}
              </motion.a>
            ))}
          </div>
          
          {/* CTA Button */}
          <div className="hidden md:block">
            <Magnetic strength={0.2}>
              <motion.a
                href="https://wa.me/522294641516?text=Hola,%20me%20interesa%20una%20consultoría%20para%20proteger%20mi%20marca"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-outline-premium px-6 py-2.5 text-xs rounded-full inline-flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                CONSULTORÍA
              </motion.a>
            </Magnetic>
          </div>
          
          {/* Mobile Menu Button */}
          <button 
            className="md:hidden relative z-10 p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span 
                className="w-full h-0.5 bg-white origin-left"
                animate={{ rotate: isMobileMenuOpen ? 45 : 0, y: isMobileMenuOpen ? -2 : 0 }}
              />
              <motion.span 
                className="w-full h-0.5 bg-white"
                animate={{ opacity: isMobileMenuOpen ? 0 : 1 }}
              />
              <motion.span 
                className="w-full h-0.5 bg-white origin-left"
                animate={{ rotate: isMobileMenuOpen ? -45 : 0, y: isMobileMenuOpen ? 2 : 0 }}
              />
            </div>
          </button>
        </div>
      </nav>
      
      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#030303]/95 backdrop-blur-xl border-b border-white/5"
          >
            <div className="px-6 py-6 space-y-4">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="block text-lg text-white/70 hover:text-white transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href="https://wa.me/522294641516?text=Hola,%20me%20interesa%20una%20consultoría%20para%20proteger%20mi%20marca"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-premium block text-center px-6 py-3 rounded-full text-sm mt-4"
              >
                CONSULTORÍA
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  )
}

// ============================================
// HERO SECTION
// ============================================

function HeroSection() {
  const [nombre, setNombre] = useState('')
  const [marca, setMarca] = useState('')
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [0, 150])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = `Hola, soy ${nombre}. Me interesa proteger mi marca "${marca}". ¿Podrían ayudarme con un diagnóstico?`
    window.open(`https://wa.me/522294641516?text=${encodeURIComponent(message)}`, '_blank')
  }
  
  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden hero-gradient">
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div 
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full"
          style={{ 
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.08) 0%, transparent 60%)',
            y 
          }}
        />
        <motion.div 
          className="absolute top-1/2 -left-40 w-[400px] h-[400px] rounded-full"
          style={{ 
            background: 'radial-gradient(circle, rgba(212, 175, 55, 0.05) 0%, transparent 60%)',
          }}
          animate={{ 
            y: [0, -30, 0],
            scale: [1, 1.1, 1],
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        />
      </div>
      
      <motion.div style={{ opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        {/* Top badge */}
        <FadeIn delay={0.2} className="flex justify-center mb-10">
          <motion.div 
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-gold-400/20 bg-gold-400/5"
            whileHover={{ scale: 1.02, borderColor: 'rgba(212, 175, 55, 0.4)' }}
          >
            <span className="w-2 h-2 rounded-full bg-gold-400 animate-pulse" />
            <span className="text-xs tracking-[0.2em] text-gold-400 uppercase font-medium">
              Auditoría de Activos Intangibles
            </span>
          </motion.div>
        </FadeIn>
        
        {/* Main headline */}
        <FadeIn delay={0.4} className="text-center mb-8">
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1] tracking-tight">
            <span className="text-white">Blindaje </span>
            <span className="text-gold-gradient">Federal</span>
            <br />
            <span className="text-white">de Marcas</span>
          </h1>
        </FadeIn>
        
        {/* Subheadline */}
        <FadeIn delay={0.6} className="text-center mb-14">
          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light">
            No registramos marcas; construimos la armadura jurídica que protege 
            tu patrimonio contra infracciones y robo de identidad.
          </p>
        </FadeIn>
        
        {/* Form */}
        <FadeIn delay={0.8} className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit} className="relative">
            <div className="flex flex-col sm:flex-row gap-3 p-2 sm:p-2.5 rounded-2xl bg-vault-medium/50 border border-white/5 backdrop-blur-sm">
              <input
                type="text"
                placeholder="Tu nombre"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                required
                className="input-premium flex-1 px-5 py-4 rounded-xl text-sm"
              />
              <input
                type="text"
                placeholder="Nombre de la marca"
                value={marca}
                onChange={(e) => setMarca(e.target.value)}
                required
                className="input-premium flex-1 px-5 py-4 rounded-xl text-sm"
              />
              <motion.button
                type="submit"
                className="btn-premium px-8 py-4 rounded-xl text-sm whitespace-nowrap"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                DIAGNÓSTICO GRATUITO
              </motion.button>
            </div>
          </form>
          
          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-x-6 gap-y-2 mt-6 text-xs text-white/30">
            <span className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-gold-400/60" />
              Sin compromiso
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-gold-400/60" />
              Respuesta en 24 horas
            </span>
            <span className="flex items-center gap-2">
              <CheckIcon className="w-4 h-4 text-gold-400/60" />
              100% Confidencial
            </span>
          </div>
        </FadeIn>
        
        {/* Trust badges */}
        <FadeIn delay={1} className="mt-20">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-40">
            <span className="text-lg font-semibold tracking-wider">IMPI</span>
            <span className="text-lg font-medium tracking-wider">mercadopago</span>
            <span className="text-lg font-medium tracking-wider italic">PayPal</span>
            <span className="text-lg font-medium tracking-wider italic">SPEI</span>
          </div>
        </FadeIn>
      </motion.div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-10 left-1/2 -translate-x-1/2"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.5, duration: 0.8 }}
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2"
        >
          <motion.div 
            className="w-1 h-2 rounded-full bg-gold-400"
            animate={{ opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.div>
      </motion.div>
    </section>
  )
}

// ============================================
// RISKS SECTION
// ============================================

function RisksSection() {
  const risks = [
    {
      title: 'Multas hasta $28.2 Millones MXN',
      description: 'El IMPI impone sanciones administrativas severas por uso no autorizado de marca registrada.',
      icon: AlertIcon,
    },
    {
      title: 'Clausura de Canales Digitales',
      description: 'Pérdida inmediata de cuentas en redes sociales y dominios web ante una denuncia formal.',
      icon: AlertIcon,
    },
    {
      title: 'Robo de Identidad Comercial',
      description: 'Un tercero puede registrar legalmente tu marca y demandarte por usarla.',
      icon: AlertIcon,
    },
  ]
  
  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#050505] to-[#030303]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left content */}
          <div>
            <FadeIn>
              <span className="text-xs tracking-[0.3em] text-gold-400 uppercase font-medium">
                Vulnerabilidad Crítica
              </span>
            </FadeIn>
            
            <FadeIn delay={0.2}>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl mt-6 leading-[1.15]">
                El costo de operar
                <br />
                <span className="text-white/40">sin blindaje.</span>
              </h2>
            </FadeIn>
            
            <FadeIn delay={0.4}>
              <p className="text-white/50 mt-8 text-lg leading-relaxed max-w-lg">
                Sin un Título de Registro, tu marca es invisible para la ley. Estás invirtiendo 
                tiempo y dinero en un activo que legalmente no te pertenece.
              </p>
            </FadeIn>
            
            <StaggerContainer className="mt-10 space-y-6" staggerDelay={0.15} delayChildren={0.5}>
              {risks.map((risk, index) => (
                <StaggerItem key={index}>
                  <div className="group flex gap-5">
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:bg-red-500/20 transition-colors duration-300">
                      <risk.icon className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-gold-400 transition-colors duration-300">
                        {risk.title}
                      </h3>
                      <p className="text-sm text-white/40 mt-1 leading-relaxed">
                        {risk.description}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>
          
          {/* Right card */}
          <FadeIn delay={0.3} direction="left">
            <div className="relative">
              <div className="card-premium p-10 lg:p-12">
                {/* Chess piece illustration */}
                <div className="flex justify-center mb-8">
                  <motion.div
                    className="relative"
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                  >
                    <svg width="80" height="120" viewBox="0 0 80 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <linearGradient id="pawnGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                          <stop offset="0%" stopColor="#4B5563"/>
                          <stop offset="50%" stopColor="#6B7280"/>
                          <stop offset="100%" stopColor="#4B5563"/>
                        </linearGradient>
                      </defs>
                      {/* Pawn shape */}
                      <ellipse cx="40" cy="105" rx="30" ry="8" fill="url(#pawnGradient)"/>
                      <path d="M20 105 L25 85 L55 85 L60 105" fill="url(#pawnGradient)"/>
                      <ellipse cx="40" cy="85" rx="18" ry="6" fill="url(#pawnGradient)"/>
                      <path d="M28 85 L32 55 L48 55 L52 85" fill="url(#pawnGradient)"/>
                      <ellipse cx="40" cy="55" rx="12" ry="5" fill="url(#pawnGradient)"/>
                      <circle cx="40" cy="35" r="18" fill="url(#pawnGradient)"/>
                    </svg>
                    {/* Glow effect */}
                    <div className="absolute inset-0 blur-2xl opacity-30 bg-gray-400 rounded-full" />
                  </motion.div>
                </div>
                
                <blockquote className="text-center">
                  <p className="text-xl sm:text-2xl font-serif text-white/90 leading-relaxed">
                    "Aunque no quieras jugar,
                    <br />
                    <span className="text-gold-400">estás en el tablero"</span>
                  </p>
                  <footer className="mt-6 text-sm text-white/40">
                    Crear tu negocio te metió al juego. Sin Blindaje Federal, 
                    tu patrimonio está en jaque desde el día uno.
                  </footer>
                </blockquote>
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-gold-400/10 rounded-2xl" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-gold-400/5 rounded-2xl" />
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  )
}

// ============================================
// METHODOLOGY SECTION
// ============================================

function MethodologySection() {
  const steps = [
    {
      number: '01',
      title: 'DIAGNÓSTICO',
      description: 'Auditoría fonética profunda para descartar conflictos con marcas similares antes de invertir.',
      icon: ScaleIcon,
    },
    {
      number: '02',
      title: 'ESTRATEGIA',
      description: 'Redacción técnica bajo la Clasificación de Niza para blindar correctamente tus productos y servicios.',
      icon: DocumentIcon,
    },
    {
      number: '03',
      title: 'TÍTULO OFICIAL',
      description: 'Gestión burocrática total hasta la entrega del Título de Propiedad Intelectual en tu mano.',
      icon: ShieldIcon,
    },
  ]
  
  return (
    <section id="metodologia" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#030303]" />
      
      {/* Subtle grid pattern */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)`,
          backgroundSize: '60px 60px'
        }}
      />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-20">
          <FadeIn>
            <span className="text-xs tracking-[0.3em] text-gold-400 uppercase font-medium">
              Metodología
            </span>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl mt-6">
              Blindaje en <span className="text-gold-gradient">3 Etapas</span>
            </h2>
          </FadeIn>
        </div>
        
        {/* Steps */}
        <StaggerContainer className="grid md:grid-cols-3 gap-6 lg:gap-8" staggerDelay={0.2}>
          {steps.map((step, index) => (
            <StaggerItem key={index}>
              <ScaleOnHover scale={1.02}>
                <div className="card-premium p-8 lg:p-10 h-full group">
                  {/* Number */}
                  <div className="mb-8">
                    <span className="font-serif text-5xl lg:text-6xl text-gold-400/20 group-hover:text-gold-400/40 transition-colors duration-500">
                      {step.number}
                    </span>
                  </div>
                  
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-2xl bg-gold-400/5 border border-gold-400/10 flex items-center justify-center mb-6 group-hover:bg-gold-400/10 group-hover:border-gold-400/20 transition-all duration-500">
                    <step.icon className="w-6 h-6 text-gold-400" />
                  </div>
                  
                  {/* Content */}
                  <h3 className="text-sm tracking-[0.2em] text-white font-semibold mb-4">
                    {step.title}
                  </h3>
                  <p className="text-white/40 leading-relaxed text-sm">
                    {step.description}
                  </p>
                </div>
              </ScaleOnHover>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

// ============================================
// PRICING SECTION
// ============================================

function PricingSection() {
  const features = [
    'Pago de Derechos IMPI',
    'Diagnóstico de Viabilidad',
    'Estrategia de Clasificación',
    'Título Digital Oficial',
  ]
  
  return (
    <section id="inversion" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#050505] to-[#030303]" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="relative">
            {/* Main pricing card */}
            <div className="gradient-border rounded-3xl">
              <div className="bg-vault-dark rounded-3xl p-10 sm:p-14 lg:p-16 text-center">
                <span className="text-xs tracking-[0.3em] text-white/40 uppercase">
                  Honorarios Profesionales
                </span>
                
                {/* Price */}
                <div className="mt-8 mb-10">
                  <div className="flex items-start justify-center gap-1">
                    <span className="text-2xl text-gold-400 font-light mt-3">$</span>
                    <motion.span 
                      className="font-serif text-7xl sm:text-8xl lg:text-9xl text-white"
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: 0.2 }}
                    >
                      5,800
                    </motion.span>
                  </div>
                  <p className="text-sm tracking-[0.2em] text-gold-400 mt-2 uppercase">
                    MXN + IVA • Por Clase Internacional
                  </p>
                </div>
                
                {/* Features */}
                <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto mb-10">
                  {features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 text-sm text-white/60"
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                    >
                      <CheckIcon className="w-4 h-4 text-gold-400 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
                
                {/* Guarantee badge */}
                <motion.div
                  className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/5 mb-10"
                  whileHover={{ scale: 1.02, borderColor: 'rgba(16, 185, 129, 0.5)' }}
                >
                  <CheckIcon className="w-5 h-5 text-emerald-400" />
                  <span className="text-sm text-emerald-400 tracking-wide uppercase font-medium">
                    Garantía: Si no es registrable, no pagas honorarios
                  </span>
                </motion.div>
                
                {/* CTA Button */}
                <div>
                  <Magnetic strength={0.15}>
                    <motion.a
                      href="https://mpago.la/2jfXZ5W"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-premium inline-flex items-center gap-3 px-10 py-5 rounded-xl text-sm w-full sm:w-auto justify-center"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      INICIAR BLINDAJE CON MERCADO PAGO
                      <ArrowRightIcon className="w-4 h-4" />
                    </motion.a>
                  </Magnetic>
                </div>
                
                {/* Alternative payment */}
                <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-white/30">
                  <a 
                    href="https://wa.me/522294641516?text=Hola,%20me%20interesa%20el%20blindaje%20de%20marca%20y%20requiero%20factura"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold-400 transition-colors link-underline"
                  >
                    SOLICITAR FACTURA
                  </a>
                  <a 
                    href="https://wa.me/522294641516?text=Hola,%20me%20interesa%20el%20blindaje%20de%20marca%20y%20deseo%20pagar%20por%20transferencia%20SPEI"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gold-400 transition-colors link-underline"
                  >
                    TRANSFERENCIA SPEI
                  </a>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}

// ============================================
// FAQ SECTION
// ============================================

function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  
  const faqs = [
    {
      question: '¿Los $5,800 ya incluyen el pago al Gobierno?',
      answer: 'Sí, absolutamente. Es una tarifa "All-Inclusive". Nosotros cubrimos los Derechos Federales del IMPI por ti.',
    },
    {
      question: '¿Qué pasa si rechazan mi marca?',
      answer: 'Aplicamos "Cero Riesgo". Antes de cobrarte, hacemos una auditoría profunda. Si vemos riesgo, te lo decimos y no gastas.',
    },
    {
      question: '¿Protege solo el nombre o también el logo?',
      answer: 'Protegemos AMBOS sin costo adicional en la misma solicitud.',
    },
    {
      question: '¿Cuánto tarda el registro?',
      answer: 'La resolución oficial toma de 4 a 6 meses. Sin embargo, tu protección legal inicia en 24 horas tras ingresar la solicitud.',
    },
    {
      question: '¿Tengo que ir a firmar papeles?',
      answer: 'No. Todo el proceso es 100% digital y remoto. Nosotros gestionamos la burocracia con nuestra FIEL de gestores acreditados.',
    },
    {
      question: '¿Necesito estar dado de alta en el SAT?',
      answer: 'No es obligatorio. Puedes proteger tu marca como Persona Física con tu CURP o como Empresa.',
    },
  ]
  
  return (
    <section id="faq" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#030303]" />
      
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <FadeIn>
            <span className="text-xs tracking-[0.3em] text-gold-400 uppercase font-medium">
              FAQ
            </span>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <h2 className="font-serif text-4xl sm:text-5xl mt-6">
              Preguntas Frecuentes
            </h2>
          </FadeIn>
        </div>
        
        {/* FAQ Items */}
        <StaggerContainer className="space-y-4" staggerDelay={0.1}>
          {faqs.map((faq, index) => (
            <StaggerItem key={index}>
              <motion.div 
                className="border-l-2 border-gold-400/20 hover:border-gold-400/50 transition-colors duration-300"
                layout
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full text-left px-6 py-5 flex items-start justify-between gap-4"
                >
                  <span className="font-medium text-white/90 group-hover:text-white transition-colors">
                    {faq.question}
                  </span>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex-shrink-0 mt-1"
                  >
                    <ChevronDownIcon className="w-5 h-5 text-gold-400/60" />
                  </motion.div>
                </button>
                
                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="px-6 pb-5 text-white/50 leading-relaxed">
                        {faq.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

// ============================================
// FOOTER
// ============================================

function Footer() {
  return (
    <footer className="relative py-20 border-t border-white/5">
      <div className="absolute inset-0 bg-[#030303]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center">
          <FadeIn>
            <span className="text-xs tracking-[0.3em] text-white/30 uppercase">
              Canal de Consultoría
            </span>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <a 
              href="mailto:contacto@brandvault.mx"
              className="block font-serif text-3xl sm:text-4xl lg:text-5xl mt-6 text-white hover:text-gold-400 transition-colors duration-300"
            >
              contacto@brandvault.mx
            </a>
          </FadeIn>
          
          <FadeIn delay={0.4}>
            <div className="flex justify-center gap-6 mt-10">
              <motion.a
                href="https://instagram.com/brandvault.mx"
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-gold-400 hover:border-gold-400/50 transition-all duration-300"
                whileHover={{ scale: 1.1, y: -3 }}
                whileTap={{ scale: 0.95 }}
              >
                <InstagramIcon className="w-5 h-5" />
              </motion.a>
            </div>
          </FadeIn>
          
          <FadeIn delay={0.6}>
            <p className="mt-16 text-xs text-white/20">
              © {new Date().getFullYear()} BrandVault. Todos los derechos reservados.
              <br className="sm:hidden" />
              <span className="hidden sm:inline"> · </span>
              Protección de Marcas en México.
            </p>
          </FadeIn>
        </div>
      </div>
    </footer>
  )
}

// ============================================
// MAIN PAGE COMPONENT
// ============================================

export default function Home() {
  return (
    <main className="relative">
      <Navigation />
      <HeroSection />
      <RisksSection />
      <MethodologySection />
      <PricingSection />
      <FAQSection />
      <Footer />
    </main>
  )
}
