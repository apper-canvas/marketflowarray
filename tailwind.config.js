/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2D3748',
        secondary: '#718096',
        accent: '#48BB78',
        surface: '#FFFFFF',
        background: '#F7FAFC',
        success: '#48BB78',
        warning: '#ED8936',
        error: '#E53E3E',
        info: '#3182CE',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        heading: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      animation: {
        'cart-bounce': 'bounce 0.6s ease-in-out',
        'price-pulse': 'pulse 1.5s ease-in-out infinite',
      },
      scale: {
        '102': '1.02',
      }
    },
  },
  plugins: [],
}