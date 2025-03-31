import { MapContainer, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";

const FullScreenMap = () => {
  // Define the map center and zoom level
  const center: LatLngExpression = [26.045226, 55.161312]; // persian gulf
  const zoom = 8; // Set the initial zoom level

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
      </MapContainer>
    </div>
  );
};

export default FullScreenMap;
