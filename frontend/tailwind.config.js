// tailwind.config.js
/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,scss,css}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "Nunito": ['Nunito'],
      },colors: {

        primary: {
          "400": "#00E78E"
        },
        secondary: {
          "50": "#FFFFFF",
          "200": "#F7F7F7",
          "400": "#EAEAEA",
          "600": "#BFBFBF",
          "800": "#121214"
        }
      }
    },
  },
  plugins: [],
};
