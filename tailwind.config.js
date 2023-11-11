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
  },
  'blue': {
    '50': '#eff6ff',
    '100': '#dbeafe',
    '200': '#bfdbfe',
    '300': '#93c5fd',
    '400': '#60a5fa',
    '500': '#3b82f6',
    '600': '#2563eb',
    '700': '#1d4ed8',
    '800': '#1e40af',
    '900': '#1e3a8a',
    '950': '#172554',
  },
  'marshland': {
    '50': '#f6f8f5',
    '100': '#e1e8df',
    '200': '#c2d0bf',
    '300': '#9ab197',
    '400': '#749071',
    '500': '#597557',
    '600': '#455d44',
    '700': '#3b4c39',
    '800': '#313f30',
    '900': '#2c362b',
    '950': '#0b0f0b',
  },
  'travertine': {
    '50': '#fdfde8',
    '100': '#fcfcc5',
    '200': '#f9f68f',
    '300': '#f5ea4f',
    '400': '#f0d91f',
    '500': '#e1c111',
    '600': '#c2980c',
    '700': '#9b6e0d',
    '800': '#805713',
    '900': '#6d4716',
    '950': '#3f2509',
  },
  'cerise-red': {
    '50': '#fff0f3',
    '100': '#ffe2e8',
    '200': '#ffc9d7',
    '300': '#ff9cb6',
    '400': '#ff6591',
    '500': '#ff306e',
    '600': '#f31260',
    '700': '#cd034e',
    '800': '#ab0649',
    '900': '#920944',
    '950': '#520020',
  },
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

