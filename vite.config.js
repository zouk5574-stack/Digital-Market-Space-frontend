import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["logo.png", "icon-transparent.png"],
      manifest: {
        name: "Digital Market Space",
        short_name: "DMS",
        start_url: ".",
        display: "standalone",
        background_color: "#ffffff",
        theme_color: "#2563eb",
        icons: [
          {
            src: "/logo.png",
            sizes: "512x512",
            type: "image/png"
          },
          {
            src: "/icon-transparent.png",
            sizes: "512x512",
            type: "image/png",
            purpose: "any maskable"
          }
        ]
      }
    })
  ]
});
