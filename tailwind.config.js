// tailwind.config.js

module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    // Add other directories if needed
  ],
  theme: {
    extend: {
      colors: {
        theme: "#fcb813",
        white: "#ffffff",
        black: "#343434",
        bggray: "#E8E8E9",
        themelight: "#fef08a",
        themedark: "#ffa17c",
        darkgray: "#797B7E",
      },
    },
  },
  plugins: [],
};
