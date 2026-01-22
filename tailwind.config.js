/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#F1D592',
          400: '#D4AF37',
          500: '#B8962E',
          600: '#967825',
          700: '#745B1C',
          800: '#523F13',
          900: '#30240B',
        },
        vault: {
          black: '#030303',
          darker: '#050505',
          dark: '#0A0A0A',
          medium: '#111111',
          light: '#1A1A1A',
          lighter: '#242424',
          border: '#2A2A2A',
        }
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gold-shimmer': 'linear-gradient(110deg, #B8962E 0%, #D4AF37 20%, #F1D592 40%, #D4AF37 60%, #B8962E 80%, #D4AF37 100%)',
        'hero-glow': 'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(212, 175, 55, 0.15) 0%, transparent 50%)',
      },
      boxShadow: {
        'gold': '0 0 30px rgba(212, 175, 55, 0.3)',
        'gold-sm': '0 0 15px rgba(212, 175, 55, 0.2)',
        'gold-lg': '0 0 60px rgba(212, 175, 55, 0.4)',
        'gold-glow': '0 4px 40px rgba(212, 175, 55, 0.3)',
        'premium': '0 25px 50px -12px rgba(0, 0, 0, 0.8)',
      },
      animation: {
        'shimmer': 'shimmer 3s linear infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.2)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.4)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-15px)' },
        },
      },
    },
  },
  plugins: [],
}
