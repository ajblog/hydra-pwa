import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { LatLngExpression, LatLngTuple } from "leaflet";
import L from "leaflet";

const customIcon = new L.DivIcon({
  html: `<div class="w-4 h-4 rounded-full border-[2px] border-red-500 flex items-center justify-center">
           <div class="w-2 h-2 rounded-full bg-red-500"></div>
         </div>`,
  className: "bg-transparent", // Avoid Leaflet default styles
  iconSize: [24, 24], // Adjust size
  iconAnchor: [12, 12], // Center the icon correctly
});

const FullScreenMap = () => {
  const center: LatLngExpression = [26.045226, 55.161312]; // persian gulf
  const zoom = 8; // Set the initial zoom level

  const locations: { id: number; name: string; coords: LatLngTuple }[] = [
    { id: 1, name: "Farsi Island, Iran", coords: [27.9948, 50.1747] },
    { id: 2, name: "Lavan Island, Iran", coords: [26.8133, 53.3522] },
    { id: 3, name: "Sirri Island, Iran", coords: [25.9, 54.55] },
    { id: 4, name: "Abu Musa Island, Iran/UAE", coords: [25.8675, 55.0311] },
    { id: 5, name: "Halul Island, Qatar", coords: [25.6744, 52.4061] },
    { id: 6, name: "Kharg Island, Iran", coords: [29.2536, 50.3146] },
    { id: 7, name: "Marjan Oil Field, Saudi Arabia", coords: [26.28, 50.1] },
    { id: 8, name: "Safa Oil Field, Kuwait", coords: [27.95, 48.45] },
    { id: 9, name: "Nowruz Oil Field, Iran", coords: [28.1, 49.9] },
    { id: 10, name: "Hendijan Oil Field, Iran", coords: [28.04, 49.44] },
  ];

  return (
    <div className="relative w-screen h-screen">
      <MapContainer
        center={center}
        zoom={zoom}
        className="absolute inset-0 w-full h-full"
      >
        <TileLayer
          url="https://tiles.stadiamaps.com/tiles/outdoors/{z}/{x}/{y}{r}.png"
          minZoom={0}
          maxZoom={20}
          attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        {locations.map((loc) => (
          <Marker key={loc.id} position={loc.coords} icon={customIcon}></Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default FullScreenMap;
