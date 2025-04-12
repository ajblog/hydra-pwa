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
          // {
          //   src: "/assets/Hydra-Logo-192.png", // Fallback PNG
          //   sizes: "192x192",
          //   type: "image/png",
          //   purpose: "any",
          // },
          // {
          //   src: "/assets/Hydra-Logo-512.png", // Fallback PNG
          //   sizes: "512x512",
          //   type: "image/png",
          //   purpose: "any",
          // },
          {
            src: "/assets/Hydra-Logo.svg", // SVG icon
            sizes: "any", // SVGs are scalable
            type: "image/svg+xml",
            purpose: "any",
          },
          // {
          //   src: "/assets/Hydra-Logo-Maskable.png", // Optional maskable icon
          //   sizes: "512x512",
          //   type: "image/png",
          //   purpose: "maskable",
          // },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
