/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          ivory: '#F4F1EA',
          charcoal: '#171717',
          orange: '#FF4D16',
          'orange-hover': '#E53E0B',
          'orange-light': '#FFF0EB',
          border: '#E2DED5',
          'border-dark': '#333333',
          muted: '#625E58',
          subtle: '#8C877D',
          dark: '#111111',
          card: '#FFFFFF',
        }
      },
      keyframes: {
        'pulse-ring': {
          '0%': { transform: 'scale(1)', opacity: '0.6' },
          '75%, 100%': { transform: 'scale(2.5)', opacity: '0' },
        },
      },
      animation: {
        'pulse-ring': 'pulse-ring 2s cubic-bezier(0, 0, 0.2, 1) infinite',
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
        display: ['Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(0, 0, 0, 0.03)',
        'premium': '0 10px 30px -5px rgba(23, 23, 23, 0.05), 0 4px 6px -2px rgba(23, 23, 23, 0.02)',
        'floating': '0 20px 40px -10px rgba(23, 23, 23, 0.1)',
        'glow-orange': '0 0 25px rgba(255, 77, 22, 0.25)',
      },
      borderRadius: {
        'xl': '0.875rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
      }
    },
  },
  plugins: [],
}

