'use client'

import { useState, useEffect, useRef } from 'react'
import { motion, useScroll, useTransform, useSpring, useInView, AnimatePresence, useMotionValue } from 'framer-motion'

// ============================================
// CONSTANTS - SOCIAL LINKS (EASY TO UPDATE)
// ============================================

const SOCIAL_LINKS = {
  whatsapp: 'https://wa.me/522294641516',
  instagram: 'https://www.instagram.com/brandvaultmx/',
  linkedin: 'https://linkedin.com/company/brandvaultmx',
  twitter: 'https://x.com/brandvaultmx',
  facebook: 'https://facebook.com/brandvaultmx',
  email: 'contacto@brandvault.mx',
  mercadopago: 'https://mpago.la/2jfXZ5W',
  calendly: 'https://calendly.com/brandvault/15min',
}

// ============================================
// ICONS (SVG Components)
// ============================================

const Icons = {
  Shield: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 2L4 6V12C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12V6L12 2Z"/>
      <path d="M9 12L11 14L15 10"/>
    </svg>
  ),
  Scale: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3V21M3 12L6 9M3 12L6 15M3 12H9M21 12L18 9M21 12L18 15M21 12H15"/>
    </svg>
  ),
  Document: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"/>
      <path d="M14 2V8H20M16 13H8M16 17H8M10 9H8"/>
    </svg>
  ),
  Alert: ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 9V13M12 17H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0377 2.66667 10.2679 4L3.33975 16C2.56995 17.3333 3.53223 19 5.07183 19Z"/>
    </svg>
  ),
  Check: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 6L9 17L4 12"/>
    </svg>
  ),
  Arrow: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12H19M19 12L12 5M19 12L12 19"/>
    </svg>
  ),
  ChevronDown: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 9L12 15L18 9"/>
    </svg>
  ),
  WhatsApp: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  ),
  Instagram: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
    </svg>
  ),
  LinkedIn: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
    </svg>
  ),
  Twitter: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
    </svg>
  ),
  Facebook: ({ className = "w-5 h-5" }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
    </svg>
  ),
}

// ============================================
// ANIMATION COMPONENTS
// ============================================

function FadeIn({ children, delay = 0, direction = 'up', className = '' }: { 
  children: React.ReactNode; delay?: number; direction?: 'up' | 'down' | 'left' | 'right' | 'none'; className?: string 
}) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  
  const dirs = { up: { y: 50 }, down: { y: -50 }, left: { x: 50 }, right: { x: -50 }, none: {} }
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...dirs[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

function CountUp({ target, suffix = '', duration = 2 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  useEffect(() => {
    if (!isInView) return
    let start = 0
    const step = target / (duration * 60)
    const timer = setInterval(() => {
      start += step
      if (start >= target) { setCount(target); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 1000 / 60)
    return () => clearInterval(timer)
  }, [isInView, target, duration])
  
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

function MagneticButton({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  
  const handleMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    const rect = ref.current.getBoundingClientRect()
    setPos({ x: (e.clientX - rect.left - rect.width / 2) * 0.3, y: (e.clientY - rect.top - rect.height / 2) * 0.3 })
  }
  
  return (
    <motion.div ref={ref} onMouseMove={handleMove} onMouseLeave={() => setPos({ x: 0, y: 0 })}
      animate={pos} transition={{ type: 'spring', stiffness: 150, damping: 15 }} className={className}>
      {children}
    </motion.div>
  )
}

// ============================================
// CURSOR GLOW (Desktop Only)
// ============================================

function CursorGlow() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [visible, setVisible] = useState(false)
  
  useEffect(() => {
    const move = (e: MouseEvent) => { setPos({ x: e.clientX, y: e.clientY }); setVisible(true) }
    const leave = () => setVisible(false)
    window.addEventListener('mousemove', move)
    document.addEventListener('mouseleave', leave)
    return () => { window.removeEventListener('mousemove', move); document.removeEventListener('mouseleave', leave) }
  }, [])
  
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null
  
  return (
    <motion.div
      className="fixed w-[400px] h-[400px] rounded-full pointer-events-none z-50"
      style={{ background: 'radial-gradient(circle, rgba(212, 175, 55, 0.06) 0%, transparent 70%)' }}
      animate={{ x: pos.x - 200, y: pos.y - 200, opacity: visible ? 1 : 0 }}
      transition={{ type: 'spring', damping: 30, stiffness: 200 }}
    />
  )
}

// ============================================
// SCROLL PROGRESS
// ============================================

function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 })
  
  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-gold-500 via-gold-400 to-gold-300 origin-left z-[100]"
      style={{ scaleX }}
    />
  )
}

// ============================================
// FLOATING WHATSAPP
// ============================================

function FloatingWhatsApp() {
  const [show, setShow] = useState(false)
  useEffect(() => { const t = setTimeout(() => setShow(true), 2500); return () => clearTimeout(t) }, [])
  
  return (
    <AnimatePresence>
      {show && (
        <motion.a
          href={`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent('Hola, me interesa proteger mi marca')}`}
          target="_blank" rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50"
          initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0, opacity: 0 }}
          whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
        >
          <div className="relative">
            <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-20" />
            <div className="relative w-14 h-14 bg-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30">
              <Icons.WhatsApp className="w-7 h-7 text-white" />
            </div>
          </div>
        </motion.a>
      )}
    </AnimatePresence>
  )
}

// ============================================
// LOGO
// ============================================

function Logo() {
  return (
    <div className="flex items-center gap-3">
      <motion.div className="relative w-10 h-10" whileHover={{ rotate: [0, -10, 10, 0] }} transition={{ duration: 0.5 }}>
        <svg viewBox="0 0 40 40" className="w-full h-full" fill="none">
          <defs>
            <linearGradient id="logoGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#B8962E"/><stop offset="50%" stopColor="#D4AF37"/><stop offset="100%" stopColor="#F1D592"/>
            </linearGradient>
          </defs>
          <path d="M20 2L4 8V18C4 28 20 38 20 38C20 38 36 28 36 18V8L20 2Z" stroke="url(#logoGold)" strokeWidth="2" fill="none"/>
          <path d="M20 10L12 14V20C12 25 20 30 20 30C20 30 28 25 28 20V14L20 10Z" fill="url(#logoGold)" opacity="0.2"/>
          <circle cx="20" cy="20" r="4" fill="url(#logoGold)"/>
        </svg>
      </motion.div>
      <div className="flex flex-col">
        <span className="text-xl font-bold tracking-wider text-white">BRANDVAULT</span>
        <span className="text-[10px] tracking-[0.3em] text-gold-400/80 uppercase">Firma de Blindaje</span>
      </div>
    </div>
  )
}

// ============================================
// NAVIGATION
// ============================================

function Navigation() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  
  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  
  const navItems = [{ label: 'Metodología', href: '#metodologia' }, { label: 'Inversión', href: '#inversion' }, { label: 'FAQ', href: '#faq' }]
  
  return (
    <motion.header
      initial={{ y: -100 }} animate={{ y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${scrolled ? 'bg-[#030303]/90 backdrop-blur-xl border-b border-white/5' : ''}`}
    >
      <nav className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <motion.a href="#" whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}><Logo /></motion.a>
          
          <div className="hidden md:flex items-center gap-10">
            {navItems.map((item, i) => (
              <motion.a key={item.href} href={item.href} className="relative text-sm text-white/70 hover:text-white transition-colors link-hover"
                initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} whileHover={{ y: -2 }}>
                {item.label}
              </motion.a>
            ))}
          </div>
          
          <MagneticButton>
            <motion.a
              href={`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent('Hola, me interesa una consultoría')}`}
              target="_blank" rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-2 px-6 py-2.5 text-xs tracking-wider btn-outline rounded-full"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >CONSULTORÍA</motion.a>
          </MagneticButton>
          
          <button className="md:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)}>
            <div className="w-6 h-5 flex flex-col justify-between">
              <motion.span className="w-full h-0.5 bg-white origin-left" animate={{ rotate: mobileOpen ? 45 : 0, y: mobileOpen ? -2 : 0 }} />
              <motion.span className="w-full h-0.5 bg-white" animate={{ opacity: mobileOpen ? 0 : 1 }} />
              <motion.span className="w-full h-0.5 bg-white origin-left" animate={{ rotate: mobileOpen ? -45 : 0, y: mobileOpen ? 2 : 0 }} />
            </div>
          </button>
        </div>
      </nav>
      
      <AnimatePresence>
        {mobileOpen && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-[#030303]/95 backdrop-blur-xl border-b border-white/5">
            <div className="px-6 py-6 space-y-4">
              {navItems.map(item => (
                <a key={item.href} href={item.href} className="block text-lg text-white/70" onClick={() => setMobileOpen(false)}>{item.label}</a>
              ))}
              <a href={SOCIAL_LINKS.whatsapp} target="_blank" className="block w-full text-center px-6 py-3 btn-premium rounded-full mt-4">CONSULTORÍA</a>
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
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.open(`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent(`Hola, soy ${nombre}. Me interesa proteger mi marca "${marca}". ¿Podrían ayudarme?`)}`, '_blank')
  }
  
  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Animated BG */}
      <div className="absolute inset-0 bg-[#030303]" />
      <motion.div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[700px]" style={{ background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.1) 0%, transparent 60%)', y }} />
      <motion.div className="absolute bottom-0 left-0 w-[600px] h-[400px]" style={{ background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.05) 0%, transparent 60%)' }}
        animate={{ x: [0, 50, 0], y: [0, -30, 0] }} transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute top-1/4 right-0 w-[400px] h-[400px]" style={{ background: 'radial-gradient(ellipse, rgba(212, 175, 55, 0.04) 0%, transparent 60%)' }}
        animate={{ x: [0, -30, 0], y: [0, 40, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} />
      
      <motion.div style={{ opacity }} className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20">
        {/* Social Proof Badge */}
        <FadeIn delay={0.1} className="text-center mb-8">
          <motion.div className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full border border-gold-400/20 bg-gold-400/5"
            whileHover={{ scale: 1.02, borderColor: 'rgba(212, 175, 55, 0.4)' }}>
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold-400" />
            </span>
            <span className="text-xs tracking-[0.15em] text-gold-400 uppercase">
              +1,200 marcas en riesgo de cancelación este trimestre
            </span>
          </motion.div>
        </FadeIn>
        
        {/* Headline */}
        <div className="text-center mb-8">
          <FadeIn delay={0.2}>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1] tracking-tight">
              <span className="text-white">Blindaje </span>
              <span className="text-gold-gradient">Federal</span>
            </h1>
          </FadeIn>
          <FadeIn delay={0.35}>
            <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-medium leading-[1.1] tracking-tight">
              <span className="text-white">de Marcas</span>
            </h1>
          </FadeIn>
        </div>
        
        {/* Subheadline */}
        <FadeIn delay={0.5} className="text-center mb-12">
          <p className="text-lg sm:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed font-light">
            No registramos marcas; construimos la armadura jurídica que protege tu patrimonio contra infracciones y robo de identidad.
          </p>
        </FadeIn>
        
        {/* Form */}
        <FadeIn delay={0.65} className="max-w-3xl mx-auto">
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-3 p-2 sm:p-2.5 rounded-2xl bg-white/[0.03] border border-white/5 backdrop-blur-sm">
              <input type="text" placeholder="Tu nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} required
                className="flex-1 px-5 py-4 rounded-xl bg-white/[0.05] border border-white/5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-all" />
              <input type="text" placeholder="Nombre de la marca" value={marca} onChange={(e) => setMarca(e.target.value)} required
                className="flex-1 px-5 py-4 rounded-xl bg-white/[0.05] border border-white/5 text-white text-sm placeholder:text-white/30 focus:outline-none focus:border-gold-400/50 transition-all" />
              <MagneticButton>
                <motion.button type="submit" className="btn-premium px-8 py-4 rounded-xl text-sm whitespace-nowrap"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  DIAGNÓSTICO GRATUITO
                </motion.button>
              </MagneticButton>
            </div>
          </form>
          
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-xs text-white/30">
            {['Sin compromiso', 'Respuesta en 24 horas', '100% Confidencial'].map(t => (
              <span key={t} className="flex items-center gap-2"><Icons.Check className="w-4 h-4 text-gold-400/60" />{t}</span>
            ))}
          </div>
        </FadeIn>
        
        {/* Trust Logos */}
        <FadeIn delay={0.8} className="mt-20">
          <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-12 opacity-30">
            {['IMPI', 'mercadopago', 'PayPal', 'SPEI'].map(l => <span key={l} className="text-lg font-medium tracking-wider">{l}</span>)}
          </div>
        </FadeIn>
      </motion.div>
      
      {/* Scroll Indicator */}
      <motion.div className="absolute bottom-10 left-1/2 -translate-x-1/2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.5, repeat: Infinity }} className="w-6 h-10 rounded-full border border-white/20 flex items-start justify-center p-2">
          <motion.div className="w-1 h-2 rounded-full bg-gold-400" animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1.5, repeat: Infinity }} />
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
    { title: 'Multas hasta $28.2 Millones MXN', desc: 'El IMPI impone sanciones administrativas severas por uso no autorizado de marca registrada.' },
    { title: 'Clausura de Canales Digitales', desc: 'Pérdida inmediata de cuentas en redes sociales y dominios web ante una denuncia formal.' },
    { title: 'Robo de Identidad Comercial', desc: 'Un tercero puede registrar legalmente tu marca y demandarte por usarla.' },
  ]
  
  return (
    <section className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#050505] to-[#030303]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <FadeIn><span className="text-xs tracking-[0.3em] text-red-400 uppercase font-medium">Vulnerabilidad Crítica</span></FadeIn>
            <FadeIn delay={0.15}><h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl mt-6 leading-[1.15]">El costo de operar<br /><span className="text-white/30">sin blindaje.</span></h2></FadeIn>
            <FadeIn delay={0.3}><p className="text-white/50 mt-8 text-lg leading-relaxed max-w-lg">Sin un Título de Registro, tu marca es invisible para la ley. Estás invirtiendo tiempo y dinero en un activo que legalmente no te pertenece.</p></FadeIn>
            
            <div className="mt-10 space-y-6">
              {risks.map((r, i) => (
                <FadeIn key={i} delay={0.4 + i * 0.12}>
                  <motion.div className="flex gap-5 group" whileHover={{ x: 8 }} transition={{ duration: 0.3 }}>
                    <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center group-hover:bg-red-500/20 transition-colors">
                      <Icons.Alert className="w-5 h-5 text-red-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-gold-400 transition-colors">{r.title}</h3>
                      <p className="text-sm text-white/40 mt-1">{r.desc}</p>
                    </div>
                  </motion.div>
                </FadeIn>
              ))}
            </div>
          </div>
          
          <FadeIn delay={0.3} direction="left">
            <div className="relative">
              <motion.div className="bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 rounded-3xl p-10 lg:p-12"
                whileHover={{ borderColor: 'rgba(212, 175, 55, 0.15)' }} transition={{ duration: 0.4 }}>
                <div className="flex justify-center mb-8">
                  <motion.svg width="80" height="120" viewBox="0 0 80 120" fill="none"
                    animate={{ y: [0, -12, 0], rotate: [0, 2, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}>
                    <defs><linearGradient id="pawn" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#4B5563"/><stop offset="50%" stopColor="#6B7280"/><stop offset="100%" stopColor="#4B5563"/>
                    </linearGradient></defs>
                    <ellipse cx="40" cy="105" rx="30" ry="8" fill="url(#pawn)"/>
                    <path d="M20 105 L25 85 L55 85 L60 105" fill="url(#pawn)"/>
                    <ellipse cx="40" cy="85" rx="18" ry="6" fill="url(#pawn)"/>
                    <path d="M28 85 L32 55 L48 55 L52 85" fill="url(#pawn)"/>
                    <ellipse cx="40" cy="55" rx="12" ry="5" fill="url(#pawn)"/>
                    <circle cx="40" cy="35" r="18" fill="url(#pawn)"/>
                  </motion.svg>
                </div>
                <blockquote className="text-center">
                  <p className="text-xl sm:text-2xl font-serif text-white/90 leading-relaxed">"Aunque no quieras jugar,<br /><span className="text-gold-400">estás en el tablero"</span></p>
                  <footer className="mt-6 text-sm text-white/40">Crear tu negocio te metió al juego. Sin Blindaje Federal, tu patrimonio está en jaque desde el día uno.</footer>
                </blockquote>
              </motion.div>
              <div className="absolute -top-4 -right-4 w-24 h-24 border border-gold-400/10 rounded-2xl pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-32 h-32 border border-gold-400/5 rounded-2xl pointer-events-none" />
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
    { n: '01', title: 'DIAGNÓSTICO', desc: 'Auditoría fonética profunda para descartar conflictos con marcas similares antes de invertir.', Icon: Icons.Scale },
    { n: '02', title: 'ESTRATEGIA', desc: 'Redacción técnica bajo la Clasificación de Niza para blindar correctamente tus productos y servicios.', Icon: Icons.Document },
    { n: '03', title: 'TÍTULO OFICIAL', desc: 'Gestión burocrática total hasta la entrega del Título de Propiedad Intelectual en tu mano.', Icon: Icons.Shield },
  ]
  
  return (
    <section id="metodologia" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#030303]" />
      <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `linear-gradient(rgba(212, 175, 55, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(212, 175, 55, 0.5) 1px, transparent 1px)`, backgroundSize: '60px 60px' }} />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-20">
          <FadeIn><span className="text-xs tracking-[0.3em] text-gold-400 uppercase">Metodología</span></FadeIn>
          <FadeIn delay={0.15}><h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl mt-6">Blindaje en <span className="text-gold-gradient">3 Etapas</span></h2></FadeIn>
        </div>
        
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {steps.map((s, i) => (
            <FadeIn key={i} delay={0.2 + i * 0.12}>
              <motion.div className="h-full p-8 lg:p-10 rounded-2xl bg-gradient-to-br from-white/[0.04] to-transparent border border-white/5 group"
                whileHover={{ y: -8, borderColor: 'rgba(212, 175, 55, 0.2)' }} transition={{ duration: 0.4 }}>
                <span className="font-serif text-5xl lg:text-6xl text-gold-400/20 group-hover:text-gold-400/40 transition-colors">{s.n}</span>
                <div className="mt-6 w-14 h-14 rounded-2xl bg-gold-400/5 border border-gold-400/10 flex items-center justify-center group-hover:bg-gold-400/10 transition-colors">
                  <s.Icon className="w-6 h-6 text-gold-400" />
                </div>
                <h3 className="text-sm tracking-[0.2em] text-white font-semibold mt-6 mb-4">{s.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{s.desc}</p>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// PRICING SECTION
// ============================================

function PricingSection() {
  const features = ['Pago de Derechos IMPI', 'Diagnóstico de Viabilidad', 'Estrategia de Clasificación', 'Título Digital Oficial']
  
  return (
    <section id="inversion" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-[#030303] via-[#050505] to-[#030303]" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        <FadeIn>
          <div className="relative">
            <div className="absolute inset-0 rounded-3xl p-px bg-gradient-to-br from-gold-400/30 via-transparent to-gold-400/10" />
            <div className="relative bg-[#0A0A0A] rounded-3xl p-10 sm:p-14 lg:p-16 text-center">
              <span className="text-xs tracking-[0.3em] text-white/40 uppercase">Honorarios Profesionales</span>
              
              <div className="mt-8 mb-10">
                <div className="flex items-start justify-center gap-1">
                  <span className="text-2xl text-gold-400 font-light mt-3">$</span>
                  <span className="font-serif text-7xl sm:text-8xl lg:text-9xl text-white"><CountUp target={5800} duration={1.5} /></span>
                </div>
                <p className="text-sm tracking-[0.2em] text-gold-400 mt-2 uppercase">MXN + IVA • Por Clase Internacional</p>
              </div>
              
              <div className="grid sm:grid-cols-2 gap-4 max-w-md mx-auto mb-10">
                {features.map((f, i) => (
                  <motion.div key={i} className="flex items-center gap-3 text-sm text-white/60"
                    initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + i * 0.1 }}>
                    <Icons.Check className="w-4 h-4 text-gold-400" />{f}
                  </motion.div>
                ))}
              </div>
              
              <motion.div className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-emerald-500/30 bg-emerald-500/5 mb-10" whileHover={{ scale: 1.02 }}>
                <Icons.Check className="w-5 h-5 text-emerald-400" />
                <span className="text-sm text-emerald-400 tracking-wide uppercase font-medium">Garantía: Si no es registrable, no pagas honorarios</span>
              </motion.div>
              
              <MagneticButton className="inline-block">
                <motion.a href={SOCIAL_LINKS.mercadopago} target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-10 py-5 rounded-xl btn-premium text-sm"
                  whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                  INICIAR PROTECCIÓN<Icons.Arrow className="w-4 h-4" />
                </motion.a>
              </MagneticButton>
              
              <div className="flex flex-wrap justify-center gap-6 mt-8 text-sm text-white/30">
                <a href={`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent('Hola, requiero factura')}`} target="_blank" className="hover:text-gold-400 transition-colors link-hover">SOLICITAR FACTURA</a>
                <a href={`${SOCIAL_LINKS.whatsapp}?text=${encodeURIComponent('Hola, deseo pagar por SPEI')}`} target="_blank" className="hover:text-gold-400 transition-colors link-hover">TRANSFERENCIA SPEI</a>
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
  const [open, setOpen] = useState<number | null>(null)
  const faqs = [
    { q: '¿Los $5,800 ya incluyen el pago al Gobierno?', a: 'Sí, absolutamente. Es una tarifa "All-Inclusive". Nosotros cubrimos los Derechos Federales del IMPI por ti.' },
    { q: '¿Qué pasa si rechazan mi marca?', a: 'Aplicamos "Cero Riesgo". Antes de cobrarte, hacemos una auditoría profunda. Si vemos riesgo, te lo decimos y no gastas.' },
    { q: '¿Protege solo el nombre o también el logo?', a: 'Protegemos AMBOS sin costo adicional en la misma solicitud.' },
    { q: '¿Cuánto tarda el registro?', a: 'La resolución oficial toma de 4 a 6 meses. Sin embargo, tu protección legal inicia en 24 horas tras ingresar la solicitud.' },
    { q: '¿Tengo que ir a firmar papeles?', a: 'No. Todo el proceso es 100% digital y remoto. Nosotros gestionamos la burocracia con nuestra FIEL de gestores acreditados.' },
    { q: '¿Necesito estar dado de alta en el SAT?', a: 'No es obligatorio. Puedes proteger tu marca como Persona Física con tu CURP o como Empresa.' },
  ]
  
  return (
    <section id="faq" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 bg-[#030303]" />
      
      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <FadeIn><span className="text-xs tracking-[0.3em] text-gold-400 uppercase">FAQ</span></FadeIn>
          <FadeIn delay={0.15}><h2 className="font-serif text-4xl sm:text-5xl mt-6">Preguntas Frecuentes</h2></FadeIn>
        </div>
        
        <div className="space-y-4">
          {faqs.map((f, i) => (
            <FadeIn key={i} delay={0.1 + i * 0.05}>
              <motion.div className="border-l-2 border-gold-400/20 hover:border-gold-400/50 transition-colors" whileHover={{ x: 4 }}>
                <button onClick={() => setOpen(open === i ? null : i)} className="w-full text-left px-6 py-5 flex items-start justify-between gap-4">
                  <span className="font-medium text-white/90">{f.q}</span>
                  <motion.div animate={{ rotate: open === i ? 180 : 0 }} transition={{ duration: 0.3 }}><Icons.ChevronDown className="w-5 h-5 text-gold-400/60" /></motion.div>
                </button>
                <AnimatePresence>
                  {open === i && (
                    <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                      <p className="px-6 pb-5 text-white/50 leading-relaxed">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}

// ============================================
// FOOTER
// ============================================

function Footer() {
  const socials = [
    { Icon: Icons.Instagram, href: SOCIAL_LINKS.instagram, label: 'Instagram' },
    { Icon: Icons.LinkedIn, href: SOCIAL_LINKS.linkedin, label: 'LinkedIn' },
    { Icon: Icons.Twitter, href: SOCIAL_LINKS.twitter, label: 'X' },
    { Icon: Icons.Facebook, href: SOCIAL_LINKS.facebook, label: 'Facebook' },
  ]
  
  return (
    <footer className="relative py-20 border-t border-white/5">
      <div className="absolute inset-0 bg-[#030303]" />
      
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8 text-center">
        <FadeIn><span className="text-xs tracking-[0.3em] text-white/30 uppercase">Canal de Consultoría</span></FadeIn>
        <FadeIn delay={0.15}>
          <a href={`https://mail.google.com/mail/?view=cm&fs=1&to=${SOCIAL_LINKS.email}&su=${encodeURIComponent('Consulta sobre protección de marca')}`} 
           target="_blank" rel="noopener noreferrer"
           className="block font-serif text-3xl sm:text-4xl lg:text-5xl mt-6 text-white hover:text-gold-400 transition-colors">
            {SOCIAL_LINKS.email}
          </a>
        </FadeIn>
        
        <FadeIn delay={0.3}>
          <div className="flex justify-center gap-4 mt-10">
            {socials.map((s, i) => (
              <motion.a key={i} href={s.href} target="_blank" rel="noopener noreferrer" aria-label={s.label}
                className="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-white/50 hover:text-gold-400 hover:border-gold-400/50 transition-all"
                whileHover={{ scale: 1.1, y: -3 }} whileTap={{ scale: 0.95 }}>
                <s.Icon className="w-5 h-5" />
              </motion.a>
            ))}
          </div>
        </FadeIn>
        
        <FadeIn delay={0.45}>
          <p className="mt-16 text-xs text-white/20">© {new Date().getFullYear()} BrandVault. Todos los derechos reservados. · Protección de Marcas en México.</p>
        </FadeIn>
      </div>
    </footer>
  )
}

// ============================================
// MAIN PAGE
// ============================================

export default function Home() {
  const [loading, setLoading] = useState(true)
  
  useEffect(() => { const t = setTimeout(() => setLoading(false), 1200); return () => clearTimeout(t) }, [])
  
  return (
    <>
      {/* Loading Screen */}
      <AnimatePresence>
        {loading && (
          <motion.div className="fixed inset-0 z-[200] bg-[#030303] flex items-center justify-center" exit={{ opacity: 0 }} transition={{ duration: 0.5 }}>
            <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center">
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-10 h-10 border-2 border-gold-400/20 border-t-gold-400 rounded-full mx-auto" />
              <p className="mt-4 text-xs tracking-[0.3em] text-gold-400/60">BRANDVAULT</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      
      <main className="relative">
        <CursorGlow />
        <ScrollProgress />
        <Navigation />
        <HeroSection />
        <RisksSection />
        <MethodologySection />
        <PricingSection />
        <FAQSection />
        <Footer />
        <FloatingWhatsApp />
        
        {/* Noise Overlay */}
        <div className="noise" />
      </main>
    </>
  )
}
