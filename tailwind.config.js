/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          900: '#1e3a8a',
        },
        damage: {
          severe: '#ef4444',
          partial: '#f59e0b',
          undamaged: '#10b981',
        },
        priority: {
          p1: '#dc2626',
          p2: '#ea580c',
          p3: '#d97706',
          p4: '#16a34a',
        },
        navy: {
          800: '#0f172a',
          900: '#0a0f1d',
          950: '#060913',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      }
    },
  },
  plugins: [],
}
