/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#ff6f61',
        'bg-color': '#fff8f0',
        'text-color': '#333',
        'card-bg': '#fff',
      },
      boxShadow: {
        card: '0 4px 12px rgba(0, 0, 0, 0.1)',
      },
      borderRadius: {
        card: '12px',
      },
    },
  },
  plugins: [],
}