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
        display: ['var(--font-display)', 'Georgia', 'serif'],
      },
      colors: {
        // Gilded nocturne — velvet ink-blue night, ivory silk text,
        // champagne gold light, and a breath of wisteria violet.
        background: '#08080f',
        surface: {
          DEFAULT: '#100f1a',
          light: '#181624',
        },
        foreground: '#f1eadb',
        muted: '#a89d90',
        warm: '#e6b877', // champagne gold
        gold: '#d9c08a', // pale gold highlight
        iris: '#a08ee8', // wisteria violet
        clay: '#cf8663',
        sage: '#93ac9c',
        // Legacy accents kept so older utility pages keep compiling.
        accent: {
          cyan: '#22d3ee',
          blue: '#3b82f6',
          gold: '#f59e0b',
        },
        border: 'rgba(241, 234, 219, 0.09)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'gradient-pan': 'gradientPan 18s ease infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-slower': 'float 14s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        'pulse-soft': 'pulseSoft 3.5s ease-in-out infinite',
        aurora: 'aurora 26s ease-in-out infinite alternate',
        'aurora-slow': 'auroraSlow 38s ease-in-out infinite alternate',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradientPan: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0) rotate(var(--frag-rot, 0deg))' },
          '50%': { transform: 'translateY(-14px) rotate(var(--frag-rot, 0deg))' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '0.5' },
          '50%': { opacity: '1' },
        },
        aurora: {
          '0%': { transform: 'translate3d(-4%, -2%, 0) rotate(-2deg) scale(1)' },
          '100%': { transform: 'translate3d(4%, 3%, 0) rotate(2deg) scale(1.08)' },
        },
        auroraSlow: {
          '0%': { transform: 'translate3d(3%, 2%, 0) scale(1.05)' },
          '100%': { transform: 'translate3d(-3%, -3%, 0) scale(1)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
