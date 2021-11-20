module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    colors: {
      black: '#2E282A',
      white: '#FBF5F3',
      primary: {
        50: "#a6c6ff",
        100: "#9cbcff",
        200: "#92b2ff",
        300: "#88a8fe",
        400: "#7e9ef4",
        500: "#7494ea",
        600: "#6a8ae0",
        700: "#6080d6",
        800: "#5676cc",
        900: "#4c6cc2"
      },
      accent: {
        50: "#49f0ed",
        100: "#3fe6e3",
        200: "#35dcd9",
        300: "#2bd2cf",
        400: "#21c8c5",
        500: "#17bebb",
        600: "#0db4b1",
        700: "#03aaa7",
        800: "#00a09d",
        900: "#009693"
      },
      error: {
        50: "#fe5b68",
        100: "#f4515e",
        200: "#ea4754",
        300: "#e03d4a",
        400: "#d63340",
        500: "#cc2936",
        600: "#c21f2c",
        700: "#b81522",
        800: "#ae0b18",
        900: "#a4010e"
      }
    },
    extend: {
      gridTemplateColumns: {
        'navbar': '1fr auto 1fr'
      }
    }
  },
  plugins: [],
}
