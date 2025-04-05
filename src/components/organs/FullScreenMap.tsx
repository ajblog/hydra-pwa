import { MapContainer, Marker, TileLayer } from "react-leaflet";
import { useState } from "react";
import { LatLngExpression } from "leaflet";
import L from "leaflet";
import loadingWheel from "../../assets/images/loading.gif";
import { stationsInfo } from "../../constants";
import { useStationContext } from "../../contexts/stationContext";

const customIcon = new L.DivIcon({
  html: `<div class="w-4 h-4 rounded-full border-[2px] border-red-500 flex items-center justify-center">
           <div class="w-2 h-2 rounded-full bg-red-500"></div>
         </div>`,
  className: "bg-transparent",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

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

const FullScreenMap = () => {
  const [loading, setLoading] = useState(true);
  const { selectedStationContext, setSelectedStationContext } =
    useStationContext();

  const center: LatLngExpression = [26.045226, 55.161312]; // Persian Gulf
  const zoom = 8;

  const handleMarkerClick = (station: string) => {
    setSelectedStationContext(station);
  };

  return (
    <div className="relative w-screen h-screen">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-[399]">
          <img alt="loading" src={loadingWheel} />
        </div>
      )}
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
          eventHandlers={{
            loading: () => setLoading(true), // When tile loading starts
            load: () => setLoading(false), // When all tiles have loaded
          }}
        />
        {stationsInfo.map((loc) => (
          <Marker
            eventHandlers={{
              click: () => handleMarkerClick(loc.name), // Handle click event
            }}
            key={loc.id}
            position={loc.coords}
            icon={
              selectedStationContext === loc.name ? selectedIcon : customIcon
            }
          ></Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default FullScreenMap;
