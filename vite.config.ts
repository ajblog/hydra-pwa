import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  // server: {
  //   host: true, // Enables access from LAN
  //   https: {
  //     key: fs.readFileSync(path.resolve(__dirname, "localhost-key.pem")),
  //     cert: fs.readFileSync(path.resolve(__dirname, "localhost.pem")),
  //   },
  // },
  plugins: [
    react(),
    tailwindcss(),
    VitePWA({
      registerType: "autoUpdate",
      manifest: {
        name: "Hydra PWA",
        short_name: "Hydra",
        description: "A PWA built with React and Vite",
        theme_color: "#ffffff",
        icons: [
          {
            src: "/pwa-icon-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-icon-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
      devOptions: {
        enabled: true,
      },
    }),
  ],
});
