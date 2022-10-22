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
          50: "#b6a9c0",
          100: "#806991",
          200: "#492862",
          300: "#422458",
          400: "#371e4a",
          500: "#321A44",
          600: "#381652",
          700: "#32144a",
          800: "#2a113e",
          900: "#220d31",
        },
        // #f4f6f9
        secondary: {
          50: "#f6f6f6",
          100: "#ececed",
          200: "#d0d0d1",
          300: "#b3b4b5",
          400: "#7a7b7e",
          500: "#414347",
          600: "#3b3c40",
          700: "#313235",
          800: "#27282b",
          900: "#202123",
        },
      },
      animation: {
        // Top to Bottom
        openFromTop: "openFromTop 0.4s ease-in-out forwards",
        closeFromBottom: "closeFromBottom 0.4s ease-in-out forwards",
        // Right to Left
        openFromRight: "openFromRight 0.4s ease-in-out forwards",
        closeFromLeft: "closeFromLeft 0.4s ease-in-out forwards",
      },
      keyframes: {
        // Top to Bottom
        openFromTop: {
          "0%": {
            height: "0px",
          },
          "100%": {
            height: "104px",
          },
        },
        closeFromBottom: {
          "0%": {
            height: "104px",
          },
          "100%": {
            height: "0px",
          },
        },
        // Right To Left
        openFromRight: {
          "0%": {
            width: "64px",
          },
          "100%": {
            width: "240px",
          },
        },
        closeFromLeft: {
          "0%": {
            width: "240px",
          },
          "100%": {
            width: "64px",
          },
        },
      },
    },
  },
  plugins: [require("flowbite/plugin")],
};
