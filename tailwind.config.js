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
          secondBackground: "#dce0e8",
          text: "#4c4f69",
          primary: "#fe6408",
          secondary: "#6c6f85",
          surface: "#ccd0da",
          links: "#1e66f5",
          grey1: "#9ca0b0",
          grey2: "#5c5f77",
          success: "#40a02b",
          warning: "#df8e1d",
          error: "#d20f39",
          generic: "#1e66f5",
          selectionBackground: "#7c7f93",
          red: "#d20f39",
          green: "#40a02b",
          yellow: "#df8e1d",
          blue: "#1e66f5",
          pink: "#e273c5",
          teal: "#179299",
          sky: "#04a5e5",
          maroon: "#e64553",
          lavender: "#7287fd",
          rosewater: "#dc8a78",
          sapphire: "#209fb5",
          mauve: "#8839ef",
        },
        dark: {
          background: "#1e1e2e",
          secondBackground: "#161a21",
          text: "#c6d0ed",
          primary: "#fab387",
          secondary: "#a6adc8",
          surface: "#313244",
          links: "#89b4fa",
          grey1: "#6c7086",
          grey2: "#bac2de",
          success: "#a6e3a1",
          warning: "#f9e2af",
          error: "#f38ba8",
          generic: "#89b4fa",
          selectionBackground: "#9399b2",
          red: "#f38ba8",
          green: "#a6e3a1",
          yellow: "#f9e2af",
          blue: "#89b4fa",
          pink: "#f5c2e7",
          teal: "#94e2d5",
          sky: "#89dceb",
          maroon: "#eba0ac",
          lavender: "#b4befe",
          rosewater: "#f5e0dc",
          sapphire: "#74c7ec",
          mauve: "#cba6f7",
        },
      },
      fontFamily: {
        // sansLight: ["OpenSans-Light", "sans-serif"],
        // sansRegular: ["OpenSans-Regular", "sans-serif"],
        // sansMedium: ["OpenSans-Medium", "sans-serif"],
        // sansSemiBold: ["OpenSans-SemiBold", "sans-serif"],
        // sansBold: ["OpenSans-Bold", "sans-serif"],
        // sansItalic: ["OpenSans-Italic", "sans-serif"],
        // sansLightItalic: ["OpenSans-LightItalic", "sans-serif"],
        // serifRegular: ["PlayfairDisplay-Regular", "serif"],
        // serifMedium: ["PlayfairDisplay-Medium", "serif"],
        // serifBold: ["PlayfairDisplay-Bold", "serif"],
        // serifSemiBold: ["PlayfairDisplay-SemiBold", "serif"],
        // serifBlack: ["PlayfairDisplay-Black", "serif"],
        // serifItalic: ["PlayfairDisplay-Italic", "serif"],
        sans: ["Open Sans", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "serif"],
        mono: ["Noto Sans Mono", "mono"],
      },
    },
  },
  plugins: [
    // function({ addBase, theme }) {
    //   addBase({
    //     "body": {
    //       fontFamily: theme('fontFamily.sans'),
    //     },
    //     ".font-sans": {
    //       fontFamily: theme('fontFamily.sans'),
    //     },
    //     ".font-serif": {
    //       fontFamily: theme('fontFamily.serif'),
    //     },
    //     ".font-mono": {
    //       fontFamily: theme('fontFamily.mono'),
    //     },
    //   })
    // }
  ],
}

