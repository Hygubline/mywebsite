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
        // Warm "night studio" base — a deep, slightly warm dark rather than
        // a cold navy, so the whole place feels cozy instead of corporate.
        background: '#100e0c',
        surface: {
          DEFAULT: '#191613',
          light: '#221e1a',
        },
        foreground: '#ece6dd',
        muted: '#9b9085',
        // Primary accent: a warm amber, like lamplight.
        warm: '#e0a371',
        clay: '#c97c5d',
        sage: '#8aa394',
        // Kept for backwards compatibility with older sections/components.
        accent: {
          cyan: '#22d3ee',
          blue: '#3b82f6',
          gold: '#f59e0b',
        },
        border: 'rgba(236, 230, 221, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
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
      },
    },
  },
  plugins: [],
}
export default config
