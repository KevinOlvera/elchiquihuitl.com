const { nextui } = require("@nextui-org/react");
const colors = require('tailwindcss/colors')

const myColors = {
  'citron': {
    '50': '#fdfde8',
    '100': '#f7facd',
    '200': '#eff5a1',
    '300': '#e1ec6a',
    '400': '#cedf3c',
    '500': '#a4b71b',
    DEFAULT: '#a4b71b',
    '600': '#8a9d13',
    '700': '#687813',
    '800': '#535f15',
    '900': '#465116',
    '950': '#242c07',
    lightBackground: '#fdfde8',
    lightForeground: '#fdfde8',
    darkBackground: '#242c07',
    darkForeground: '#242c07',
  }
}

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: myColors,
      fontFamily: {
        sans: ['Open Sans', 'sans-serif'],
        serif: ['Open Sans', 'serif'],
      }
    },
  },
  darkMode: "class",
  plugins: [
    nextui({
      addCommonColors: true,
      defaultTheme: "light",
      themes: {
        light: {
          colors: {
            /* background: myColors.citron.lightBackground, */
            primary: {
              DEFAULT: myColors.citron[600],
              /* foreground: myColors.citron.lightForeground */
            },
          },
        },
        dark: {
          colors: {
            /* background: myColors.citron.darkBackground, */
            primary: {
              DEFAULT: myColors.citron[400],
              /* foreground: myColors.citron.darkForeground, */
            },
          },
        },
      }
    })
  ],
}

