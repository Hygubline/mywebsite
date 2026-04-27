import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'monospace'],
      },
      colors: {
        background: '#0a0a0a',
        foreground: '#e8e4df',
        warm: {
          50: '#faf8f5',
          100: '#f0ece6',
          200: '#e8e4df',
          300: '#d4cfc7',
          400: '#b5aea3',
          500: '#8a8278',
          600: '#6b6359',
          700: '#4a443c',
          800: '#2a2622',
          900: '#1a1714',
        },
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'fade-in-slow': 'fadeIn 2s ease-out forwards',
        'slide-up': 'slideUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-up-slow': 'slideUp 1.4s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'paper-drift': 'paperDrift 20s ease-in-out infinite',
        'paper-breathe': 'paperBreathe 8s ease-in-out infinite',
        'grain': 'grain 0.5s steps(1) infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(40px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        paperDrift: {
          '0%, 100%': {
            transform: 'translate3d(0, 0, 0) rotateX(-2deg) rotateY(3deg) rotateZ(-1deg)',
          },
          '25%': {
            transform: 'translate3d(8px, -12px, 20px) rotateX(3deg) rotateY(-2deg) rotateZ(2deg)',
          },
          '50%': {
            transform: 'translate3d(-5px, -20px, 10px) rotateX(-4deg) rotateY(5deg) rotateZ(-2deg)',
          },
          '75%': {
            transform: 'translate3d(10px, -8px, 30px) rotateX(2deg) rotateY(-3deg) rotateZ(1deg)',
          },
        },
        paperBreathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.02)' },
        },
        grain: {
          '0%, 100%': { transform: 'translate(0, 0)' },
          '10%': { transform: 'translate(-5%, -10%)' },
          '20%': { transform: 'translate(-15%, 5%)' },
          '30%': { transform: 'translate(7%, -25%)' },
          '40%': { transform: 'translate(-5%, 25%)' },
          '50%': { transform: 'translate(-15%, 10%)' },
          '60%': { transform: 'translate(15%, 0%)' },
          '70%': { transform: 'translate(0%, 15%)' },
          '80%': { transform: 'translate(3%, 35%)' },
          '90%': { transform: 'translate(-10%, 10%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
