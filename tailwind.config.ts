/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./app.vue",
  ],
  theme: {
    extend: {
      colors: {
        'turquoise': {
          '50': '#effefa',
          '100': '#cafdf3',
          '200': '#95faea',
          '300': '#58f0dc',
          '400': '#40e0d0',
          '500': '#0cc0b1',
          '600': '#079a91',
          '700': '#0a7b75',
          '800': '#0d625e',
          '900': '#10514e',
          '950': '#023131',
        },
        'teak': {
          '50': '#f8f6ee',
          '100': '#ede8d4',
          '200': '#ddd0ab',
          '300': '#cab27a',
          '400': '#c1a367',
          '500': '#ab8547',
          '600': '#926b3c',
          '700': '#765132',
          '800': '#64442f',
          '900': '#563b2d',
          '950': '#311f17',
        },

      },
      fontFamily: {
        "SF-Pro-Display": ["SF-Pro-Display", 'sans-serif'],
        "LibreBaskerville": ["LibreBaskerville", 'serif'],
        "Amethysta": ["Amethysta", "serif"]
      },
    },
  },
};
