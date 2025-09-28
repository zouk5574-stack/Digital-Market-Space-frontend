/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#2CB67D", // vert principal (repris du logo)
          dark: "#249866",    // vert foncé (hover)
          light: "#3FD89B",   // vert clair (états secondaires)
        },
        accent: {
          DEFAULT: "#FF7F32", // orange du chariot
          dark: "#E56E28",
        },
        neutral: {
          light: "#FFFFFF",   // blanc pur
          DEFAULT: "#F9FAFB", // gris très clair (fonds)
          dark: "#1F2937",    // gris foncé (texte principal)
        },
      },
    },
  },
  plugins: [],
};
