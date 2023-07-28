/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./views/**/*.pug'],
  theme: {
    extend: {
      colors: {
        dkblue: {
          50: '#d6e7f5',
          100: '#accfec',
          200: '#98c3e7',
          300: '#83b7e2',
          400: '#5a9fd8',
          500: '#3087cf',
          600: '#276ca5',
          700: '#225f91',
          800: '#184467',
          900: '#12324d',
        },
        dkred: {
          50: '#fbd0d2',
          100: '#f6a2a6',
          200: '#f27379',
          300: '#ee444d',
          400: '#ea1d26',
          500: '#d2141d',
          600: '#bb111a',
          700: '#a30f17',
          800: '#8c0d13',
          900: '#750b10',
        },
      },
    },
  },
  plugins: [],
};
