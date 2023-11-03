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
        'Poppins': ['Poppins'],
        "IBM": ['IBM Plex Mono']
      },colors: {

        primary: {
          "400": "#94C7F6"
        },
        secondary: {
          "50": "#FFFFFF",
          "100": "#F8F9FF",
          "600": "#ADB3BD",
          "700": "#8C929D",
          "800": "#060622"
        }
      }
    },
  },
  plugins: [],
};
