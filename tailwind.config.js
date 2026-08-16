/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-dark': '#0A0A0A',
        'brand-accent': '#E5B268',
        'brand-text': '#FFFFFF',
        'brand-muted': 'rgba(255, 255, 255, 0.70)',
        'lime': '#E5B268',
        'ink': '#0A0A0A',
        'slate-muted': 'rgba(255, 255, 255, 0.70)',
        'border-light': 'rgba(255, 255, 255, 0.15)',
        'tag-bg': 'rgba(255, 255, 255, 0.10)',
        'tag-text': 'rgba(255, 255, 255, 0.85)',
        'warm-white': 'transparent',
        'soft-white': 'rgba(255, 255, 255, 0.10)',
        'muted-white': 'rgba(255, 255, 255, 0.15)',
      },
      borderRadius: {
        'card': '24px',
        'pill': '100px',
        'icon': '12px',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 8px 32px rgba(0,0,0,0.25)',
        'card-hover': '0 12px 40px rgba(0,0,0,0.35)',
        'btn': '0 0 20px rgba(229, 178, 104, 0.35)',
      },
      animation: {
        'float': 'float 3.5s ease-in-out infinite',
        'float-slow': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-8px)' },
        }
      }
    },
  },
  plugins: [],
}
