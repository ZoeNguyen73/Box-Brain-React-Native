/** @type {import("tailwindcss").Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}", 
    "./components/**/*.{js,jsx,ts,tsx}"
  ],
  darkMode: "selector",
  theme: {
    screens: {
      "sm": "640px",
      "md": "768px",
      "lg": "1024px",
      "xl": "1280px",
      "2xl": "1536px",
    },
    extend: {
      colors: {
        light: {
          background: "#eff1f5",
          text: "#4c4f69",
        },
        dark: {
          background: "#1e1e2e",
          text: "#c6d0ed",
        },
      }
    },
  },
  plugins: [],
}

