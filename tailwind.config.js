/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#020617', // Main background
          900: '#0f172a', // Panels
          850: '#0a1628', // Deeper panels
          800: '#1e293b', // Borders
          700: '#334155', // Lighter borders
          400: '#818cf8', // Accents
        },
        tactical: {
          cyan: '#06b6d4',
          'cyan-light': '#22d3ee',
          'cyan-dark': '#0891b2',
          blue: '#3b82f6',
          'blue-light': '#60a5fa',
          indigo: '#6366f1',
          'indigo-light': '#818cf8',
          gray: '#64748b',
          'gray-light': '#94a3b8',
        }
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'Share Tech Mono', 'monospace'],
        sans: ['Inter', 'Rajdhani', 'sans-serif'],
        display: ['Orbitron', 'Rajdhani', 'sans-serif'],
      },
      animation: {
        'glow': 'glow 2s ease-in-out infinite alternate',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'scan': 'scan 8s linear infinite',
        'fadeIn': 'fadeIn 0.5s ease-in',
        'slideIn': 'slideIn 0.3s ease-out',
      },
      keyframes: {
        glow: {
          '0%': {
            boxShadow: '0 0 5px rgba(99, 102, 241, 0.5), 0 0 10px rgba(99, 102, 241, 0.3)',
          },
          '100%': {
            boxShadow: '0 0 20px rgba(99, 102, 241, 0.8), 0 0 30px rgba(99, 102, 241, 0.4)',
          },
        },
        scan: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideIn: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0)' },
        },
      },
      boxShadow: {
        'glow-sm': '0 0 10px rgba(99, 102, 241, 0.3)',
        'glow-md': '0 0 20px rgba(99, 102, 241, 0.4)',
        'glow-lg': '0 0 30px rgba(99, 102, 241, 0.5)',
        'tactical': '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(99, 102, 241, 0.2)',
        'tactical-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(99, 102, 241, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      }
    },
  },
  plugins: [],
}
