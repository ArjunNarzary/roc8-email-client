/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#E54065",
        backgroundColor: "#F4F5F9",
        borderColor: "#CFD2DC",
        textColor: "#636363",
        filterButton: "#E1E4EA",
        readBackground: "#F2F2F2"
      },
    },
  },
  plugins: [],
}

