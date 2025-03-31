import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Workbox } from "workbox-window";
import "./index.css";
import "leaflet/dist/leaflet.css";
import App from "./App.tsx";

if ("serviceWorker" in navigator) {
  const wb = new Workbox("/sw.js");

  wb.addEventListener("installed", (event) => {
    if (event.isUpdate) {
      console.log("New content available, please refresh.");
    }
  });

  wb.register();
}
createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
