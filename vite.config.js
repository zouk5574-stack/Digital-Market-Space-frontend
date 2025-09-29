// vite.config.js
import { defineConfig } from "vite";
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,   // ou 3000 si tu préfères, mais 5173 est standard avec Vite
    open: true    // ouvre automatiquement ton navigateur en local
  },
  build: {
    outDir: "dist"
  }
});
