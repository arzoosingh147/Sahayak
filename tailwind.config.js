/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ff9ad7", // use soft pinks and vibrant tones like Wilf & Friends
        secondary: "#fff4ec",
        accent: "#e5f4ff"
      },
      fontFamily: {
        sans: ["'Nunito'", "sans-serif"],
      },
      animation: {
        'bounce-slow': 'bounce 2s infinite',
        'breath': "breath 6s ease-in-out infinite",
      },
      keyframes: {
        'breath': {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.5)" },
        },
      },
    },
  },  
  plugins: [],
}

