/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'warm-white': '#F5F5F0',
        'soft-white': '#F0F0EB',
        'muted-white': '#E8E8E2',
        'lime': '#C8F135',
        'ink': '#0A0A0A',
        'slate-muted': '#6B6B6B',
        'border-light': '#E2E2DC',
        'tag-bg': '#EFEFEA',
        'tag-text': '#3A3A3A',
        // keep brand colors if they are still referenced in logic somehow, or maybe safely map them
        'brand-violet': '#0A0A0A', // Remapping brand colors to ink just in case missed somewhere
        'brand-indigo': '#0A0A0A',
        'dark-base': '#F5F5F0',
        'dark-surface': '#FFFFFF',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 1px 3px rgba(0,0,0,0.06), 0 4px 16px rgba(0,0,0,0.04)',
        'card-hover': '0 8px 32px rgba(0,0,0,0.10), 0 2px 8px rgba(0,0,0,0.06)',
        'btn': '0 2px 8px rgba(200,241,53,0.4)',
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
