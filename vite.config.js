// vite.config.js
import { defineConfig } from "vite";
  import{"@vitejs/plugin-react": "^4.3.1"}
  "vite": "^5.0.0"
}
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
