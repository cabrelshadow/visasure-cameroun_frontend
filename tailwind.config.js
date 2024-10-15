/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        custom: ['Urbanist', 'sans-serif'],
        custom: ['Urbanist-bold', 'sans-serif'],
      },
      boxShadow: {
        'shadow-custom': '-10px -10px 0px black',
        'boxShadowBottom': '-10px 10px 0px black'
      },
    },
  },
  plugins: [require('daisyui')],
}

