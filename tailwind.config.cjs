module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2CB67D",
          dark: "#249866",
          light: "#3FD89B"
        },
        accent: {
          DEFAULT: "#FF7F32",
          dark: "#E56E28"
        },
        neutral: {
          50: "#FFFFFF",
          100: "#F9FAFB",
          900: "#111827"
        }
      }
    }
  },
  plugins: []
};
