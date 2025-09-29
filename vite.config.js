// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,   // tu peux mettre 3000 si tu préfères
    open: true    // ouvre automatiquement le navigateur en local
  },
  build: {
    outDir: "dist"
  }
});
