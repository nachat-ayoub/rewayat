/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        cairo: ["cairo", "sans-serif"],
      },
      colors: {
        lighterPurple: "#9B37F3",
        lightPurple: "#7E22CE",
        Purple: "#610094",
        darkPurple: "#3F0071",
        darkBlue: "#150050",
        Black: "#0E131A",
        Gray: "#c2c2c2",
        primary: {
          100: "#BF76FF",
          200: "#AC51FC",
          300: "#9B37F3",
          400: "#7E22CE",
          500: "#610094",
          600: "#3F0071",
          700: "#280049",
          800: "#22013D",
          900: "#19012C",
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
