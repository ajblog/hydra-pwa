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
            src: "/assets/Logo-png.png",
            sizes: "61x74", // Small icon
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
