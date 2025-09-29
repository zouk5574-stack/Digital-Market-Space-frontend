// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: "#2563eb",   // bleu principal
        secondary: "#1e293b", // gris foncé
        accent: "#f59e0b"     // orange/jaune accent
      }
    }
  },
  plugins: []
};
