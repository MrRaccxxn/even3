/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./node_modules/flowbite-react/**/*.js",
    './pages/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  plugins: [require("flowbite/plugin")],
  theme: {
    screens: {
      'xl': { 'max': '1279px' },
      // => @media (max-width: 1279px) { ... }
      'lg': { 'max': '1023px' },
      // => @media (max-width: 1023px) { ... }
      'md': { 'max': '767px' },
      // => @media (max-width: 767px) { ... }
      'sm': { 'max': '639px' },
      // => @media (max-width: 639px) { ... }
    },
    colors: {
      background: '#16161a',
      modalBackground: '#374151',
      headline: '#fffffe',
      paragraph: '#94a1b2',
      buttonBackground: '#7f5af0',
      buttonBackgroundSecondary: '#242629',
      buttonText: '#fffffe',
      box: '#16161a',
      hoverButtonText: '#DDDDDD',
      white: 'white',
      black: 'black',
      orange: '#ae6119'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    extend: {
      spacing: {
        128: '32rem',
        144: '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
};
