/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#0b0c0e',
          subtle: '#121417',
          surface: '#181a1f',
          elevated: '#21242b',
        },
        border: {
          subtle: 'rgba(255, 255, 255, 0.08)',
          DEFAULT: 'rgba(255, 255, 255, 0.12)',
          hover: 'rgba(255, 255, 255, 0.22)',
        },
        accent: {
          stone: '#b8b2a7',
          sage: '#8fa89b',
          clay: '#c49a88',
          slate: '#8ea0b5',
          dune: '#d0c7b7',
        },
        muted: {
          foreground: '#8e939e',
          border: 'rgba(255, 255, 255, 0.06)',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Syne', 'Plus Jakarta Sans', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        }
      }
    },
  },
  plugins: [],
}
