/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2563EB', 
          hover: '#1D4ED8', // blue-700
          light: '#DBEAFE', // blue-100
          100: '#DBEAFE', // blue-100
          600: '#2563EB', // blue-600
          700: '#1D4ED8', // blue-700
        },
        success: {
          DEFAULT: '#10B981', // emerald-500
          light: '#ECFDF5', // emerald-50
          50: '#ECFDF5', // emerald-50
          500: '#10B981', // emerald-500
        },
        danger: {
          DEFAULT: '#EF4444', // red-500
          light: '#FEF2F2', // red-50
          50: '#FEF2F2', // red-50
          500: '#EF4444', // red-500
        },
        warning: {
          DEFAULT: '#F59E0B', // amber-500
        },
        info: {
          DEFAULT: '#0EA5E9', // sky-500
        },
        background: '#F8FAFC', // slate-50
        surface: '#FFFFFF', // white
        border: '#E2E8F0', // slate-200
        text: {
          primary: '#0F172A', // slate-900
          secondary: '#475569', // slate-600
          tertiary: '#94A3B8', // slate-400
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        display: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      gridTemplateColumns: {
        // 12-column grid system
        '12': 'repeat(12, minmax(0, 1fr))',
      },
      spacing: {
        // 16px gutters
        'gutter': '16px',
      },
      screens: {
        'xs': '475px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwindcss-animate'),
    require('@tailwindcss/typography'),
  ],
}