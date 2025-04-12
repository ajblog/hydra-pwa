import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Hydra",
        short_name: "Hydra",
        description: "Your smart assistant on the seas",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/assets/192.png",
            sizes: "192x192", // Standard size for many devices
            type: "image/png",
            purpose: "any",
          },
          {
            src: "/assets/512.png",
            sizes: "512x512", // Larger icon for high-DPI displays
            type: "image/png",
            purpose: "any",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
