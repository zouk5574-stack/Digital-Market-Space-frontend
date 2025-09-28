// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#3CA59D",
        secondary: "#FF7B00",
        dark: "#1E293B",
        light: "#F9FAFB",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #3CA59D, #005F73)",
      },
    },
  },
  plugins: [],
};
