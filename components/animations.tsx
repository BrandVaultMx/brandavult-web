'use client'

import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import { useRef, ReactNode } from 'react'

// ============================================
// FADE IN ON SCROLL
// ============================================
interface FadeInProps {
  children: ReactNode
  delay?: number
  duration?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  className?: string
  once?: boolean
}

export function FadeIn({ 
  children, 
  delay = 0, 
  duration = 0.8,
  direction = 'up',
  className = '',
  once = true
}: FadeInProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once, margin: '-100px' })
  
  const directions = {
    up: { y: 60, x: 0 },
    down: { y: -60, x: 0 },
    left: { x: 60, y: 0 },
    right: { x: -60, y: 0 },
    none: { x: 0, y: 0 }
  }
  
  return (
    <motion.div
      ref={ref}
      initial={{ 
        opacity: 0, 
        ...directions[direction]
      }}
      animate={isInView ? { 
        opacity: 1, 
        x: 0, 
        y: 0 
      } : {}}
      transition={{ 
        duration,
        delay,
        ease: [0.25, 0.4, 0.25, 1]
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// STAGGER CHILDREN
// ============================================
interface StaggerContainerProps {
  children: ReactNode
  className?: string
  staggerDelay?: number
  delayChildren?: number
}

export function StaggerContainer({ 
  children, 
  className = '',
  staggerDelay = 0.1,
  delayChildren = 0
}: StaggerContainerProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })
  
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: {
          transition: {
            staggerChildren: staggerDelay,
            delayChildren
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
}

export function StaggerItem({ children, className = '' }: StaggerItemProps) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { 
          opacity: 1, 
          y: 0,
          transition: {
            duration: 0.6,
            ease: [0.25, 0.4, 0.25, 1]
          }
        }
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// SCALE ON HOVER
// ============================================
interface ScaleOnHoverProps {
  children: ReactNode
  scale?: number
  className?: string
}

export function ScaleOnHover({ 
  children, 
  scale = 1.02,
  className = '' 
}: ScaleOnHoverProps) {
  return (
    <motion.div
      whileHover={{ 
        scale,
        transition: { duration: 0.4, ease: [0.25, 0.4, 0.25, 1] }
      }}
      whileTap={{ scale: 0.98 }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// PARALLAX EFFECT
// ============================================
interface ParallaxProps {
  children: ReactNode
  speed?: number
  className?: string
}

export function Parallax({ 
  children, 
  speed = 0.5,
  className = '' 
}: ParallaxProps) {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  })
  
  const y = useTransform(scrollYProgress, [0, 1], [100 * speed, -100 * speed])
  
  return (
    <motion.div
      ref={ref}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// COUNTER ANIMATION
// ============================================
interface CounterProps {
  from?: number
  to: number
  duration?: number
  prefix?: string
  suffix?: string
  className?: string
}

export function Counter({ 
  from = 0, 
  to, 
  duration = 2,
  prefix = '',
  suffix = '',
  className = ''
}: CounterProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  return (
    <motion.span
      ref={ref}
      className={className}
    >
      {prefix}
      <motion.span
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
      >
        {isInView && (
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <CounterNumber from={from} to={to} duration={duration} />
          </motion.span>
        )}
      </motion.span>
      {suffix}
    </motion.span>
  )
}

function CounterNumber({ from, to, duration }: { from: number, to: number, duration: number }) {
  const nodeRef = useRef<HTMLSpanElement>(null)
  
  return (
    <motion.span
      ref={nodeRef}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        {to.toLocaleString()}
      </motion.span>
    </motion.span>
  )
}

// ============================================
// GLOW EFFECT
// ============================================
interface GlowProps {
  children: ReactNode
  className?: string
  color?: string
}

export function Glow({ 
  children, 
  className = '',
  color = 'rgba(212, 175, 55, 0.15)'
}: GlowProps) {
  return (
    <motion.div
      className={`relative ${className}`}
      whileHover="hover"
    >
      <motion.div
        className="absolute inset-0 rounded-inherit blur-xl opacity-0"
        style={{ background: color }}
        variants={{
          hover: { opacity: 1, scale: 1.1 }
        }}
        transition={{ duration: 0.4 }}
      />
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  )
}

// ============================================
// TEXT REVEAL
// ============================================
interface TextRevealProps {
  children: string
  className?: string
  delay?: number
}

export function TextReveal({ 
  children, 
  className = '',
  delay = 0
}: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })
  
  const words = children.split(' ')
  
  return (
    <motion.span ref={ref} className={className}>
      {words.map((word, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ 
            duration: 0.5,
            delay: delay + (i * 0.05),
            ease: [0.25, 0.4, 0.25, 1]
          }}
          className="inline-block mr-[0.25em]"
        >
          {word}
        </motion.span>
      ))}
    </motion.span>
  )
}

// ============================================
// MAGNETIC BUTTON
// ============================================
interface MagneticProps {
  children: ReactNode
  className?: string
  strength?: number
}

export function Magnetic({ 
  children, 
  className = '',
  strength = 0.3
}: MagneticProps) {
  const ref = useRef<HTMLDivElement>(null)
  
  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return
    
    const rect = ref.current.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    
    ref.current.style.transform = `translate(${x * strength}px, ${y * strength}px)`
  }
  
  const handleMouseLeave = () => {
    if (!ref.current) return
    ref.current.style.transform = 'translate(0px, 0px)'
  }
  
  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-300 ease-out ${className}`}
    >
      {children}
    </motion.div>
  )
}

// ============================================
// SHIMMER TEXT
// ============================================
interface ShimmerTextProps {
  children: string
  className?: string
}

export function ShimmerText({ children, className = '' }: ShimmerTextProps) {
  return (
    <span 
      className={`
        bg-gradient-to-r from-gold-500 via-gold-300 to-gold-500 
        bg-[length:200%_100%] 
        bg-clip-text text-transparent 
        animate-shimmer
        ${className}
      `}
    >
      {children}
    </span>
  )
}
