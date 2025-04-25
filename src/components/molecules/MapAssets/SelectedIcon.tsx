import L from "leaflet";

const selectedIcon = new L.DivIcon({
  html: `
    <div class="relative w-8 h-8 flex items-center justify-center">
      <!-- Outer ripple layers -->
      <div class="absolute w-full h-full rounded-full border-2 border-red-500 animate-ping"></div>
      <div class="absolute w-full h-full rounded-full border-2 border-red-500 animate-ping [animation-delay:200ms]"></div>
      <div class="absolute w-full h-full rounded-full border-2 border-red-500 animate-ping [animation-delay:400ms]"></div>

      <!-- Inner dot -->
      <div class="w-4 h-4 rounded-full bg-red-500 z-10"></div>
    </div>
  `,
  className: "bg-transparent",
  iconSize: [40, 40],
  iconAnchor: [20, 20],
});

export { selectedIcon };