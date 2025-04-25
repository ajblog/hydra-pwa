import L from "leaflet";

const customIcon = new L.DivIcon({
  html: `<div class="w-4 h-4 rounded-full border-[2px] border-red-500 flex items-center justify-center">
           <div class="w-2 h-2 rounded-full bg-red-500"></div>
         </div>`,
  className: "bg-transparent",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

export { customIcon };
