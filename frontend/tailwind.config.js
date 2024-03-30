/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        kalam:["Kalam",'sans-serif'],
        foundation:["Foundation","sans-serif"]
      },
      animation: {
        'lineThrough': 'lineThrough 10s linear'
      }
    },
  },
  plugins: [],
}

