/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-red':   '#e63946',
        'brand-blue':  '#003049',
        'brand-gold':  '#e9c46a',
        'brand-brown': '#5b5159',
        
      }
    }
  }
}
