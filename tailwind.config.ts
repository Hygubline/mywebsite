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
        // Midnight study room — a near-black with a faint violet undertone,
        // warm cream text, muted gold and amber glow, and a whisper of iris.
        background: '#0a090f',
        surface: {
          DEFAULT: '#141219',
          light: '#1c1922',
        },
        foreground: '#ece4d6',
        muted: '#988f82',
        warm: '#e3a86f', // amber glow
        gold: '#d8b878', // muted gold highlight
        iris: '#8c7bd6', // sparing blue/purple
        clay: '#c97c5d',
        sage: '#8aa394',
        // Legacy accents kept so older utility pages keep compiling.
        accent: {
          cyan: '#22d3ee',
          blue: '#3b82f6',
          gold: '#f59e0b',
        },
        border: 'rgba(236, 228, 214, 0.08)',
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'slide-up': 'slideUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'gradient-pan': 'gradientPan 18s ease infinite',
        'float-slow': 'float 9s ease-in-out infinite',
        'float-slower': 'float 14s ease-in-out infinite',
        shimmer: 'shimmer 2.4s linear infinite',
        'pulse-soft': 'pulseSoft 3.5s ease-in-out infinite',
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
      },
    },
  },
  plugins: [],
}
export default config
