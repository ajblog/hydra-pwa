import {
  MapContainer,
  Marker,
  Polyline,
  TileLayer,
  useMap,
} from "react-leaflet";
import { SetStateAction, useEffect, useState } from "react";
import { LatLngExpression, LatLngTuple } from "leaflet";
import L from "leaflet";
import loadingWheel from "../../assets/images/loading.gif";
import { useStationContext } from "../../contexts/stationContext";
import { StationsTypes } from "../../types";
import { LocateFixed } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { getRoutesInformation } from "../../services";

const customIcon = new L.DivIcon({
  html: `<div class="w-4 h-4 rounded-full border-[2px] border-red-500 flex items-center justify-center">
           <div class="w-2 h-2 rounded-full bg-red-500"></div>
         </div>`,
  className: "bg-transparent",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

const LocateMe = ({
  setUserLocation,
}: {
  setUserLocation: React.Dispatch<SetStateAction<LatLngTuple | null>>;
}) => {
  return (
    <button
      onClick={() => {
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              const coords: LatLngTuple = [
                position.coords.latitude,
                position.coords.longitude,
              ];
              setUserLocation(coords);
            },
            (err) => {
              console.error("💀 Location access denied:", err.message);
            },
            {
              enableHighAccuracy: true,
            }
          );
        } else {
          alert("Your browser doesn't support geolocation.");
        }
      }}
      className="absolute bottom-32 right-4 z-[600] bg-[#5b55ed] p-4 rounded-full shadow-2xl transition"
    >
      <LocateFixed color="white" />
    </button>
  );
};

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

const RecenterMap = ({
  coords,
  zoomLevel,
}: {
  coords: LatLngTuple;
  zoomLevel?: number;
}) => {
  const map = useMap();

  useEffect(() => {
    if (coords) {
      const targetPoint = map.project(coords, map.getZoom());
      const offsetY = 200;
      const offsetPoint = L.point(targetPoint.x, targetPoint.y + offsetY);
      const offsetLatLng = map.unproject(offsetPoint, map.getZoom());

      map.setView(offsetLatLng, zoomLevel ?? map.getZoom(), {
        animate: true,
      });
    }
  }, [coords, zoomLevel, map]);

  return null;
};

const FullScreenMap = ({ data }: { data: StationsTypes[] }) => {
  const [loading, setLoading] = useState(true);
    // const [dashOffset, setDashOffset] = useState(0);
  const [userLocation, setUserLocation] = useState<LatLngTuple | null>(null);
  const { selectedStationContext, setSelectedStationContext } =
    useStationContext();
  const [stationsInfo, setStationsInfo] = useState<
    { id: number; name: string; display_name: string; coords: LatLngTuple }[]
  >([]);
  const [originStation, setOriginStation] = useState<{
    name: string;
    display_name: string;
  } | null>(null);
  const [destinationStation, setDestinationStation] = useState<{
    name: string;
    display_name: string;
  } | null>(null);

  const center: LatLngExpression = [27.10664, 52.271204]; // Persian Gulf
  const zoom = 6;

  const handleMarkerClick = (station: string) => {
    setSelectedStationContext(station);
  };

  useEffect(() => {
    const fetchStations = async () => {
      const mapped = data.map((station, index) => ({
        id: index + 1,
        name: station.name,
        display_name: station.display_name,
        coords: [station.lat, station.lon] as LatLngTuple,
      }));
      setStationsInfo(mapped);
    };

    fetchStations();
  }, [data]);

  useEffect(() => {
    const updateStations = () => {
      const origin = sessionStorage.getItem("origin");
      const destination = sessionStorage.getItem("destination");

      setOriginStation(origin ? JSON.parse(origin) : null);
      setDestinationStation(destination ? JSON.parse(destination) : null);
    };

    updateStations();

    window.addEventListener("originChange", updateStations);
    window.addEventListener("destinationChange", updateStations);

    return () => {
      window.removeEventListener("originChange", updateStations);
      window.removeEventListener("destinationChange", updateStations);
    };
  }, []);

  const { data: routeData } = useQuery({
    queryKey: ["routes", originStation?.name, destinationStation?.name], // smart key
    enabled: !!originStation && !!destinationStation, // only run when both exist
    queryFn: () =>
      getRoutesInformation({
        start: originStation!.name,
        end: destinationStation!.name,
      }),
  });


  const coordinates =
    routeData?.route.map(
      (station: { lat: number; lon: number }) => [station.lat , station.lon] as LatLngTuple
    ) ?? [];




  // useEffect(() => {
  //   let offset = 0;
  //   const interval = setInterval(() => {
  //     offset -= 1;
  //     setDashOffset(offset);
  //   }, 60); // Adjust speed here

  //   return () => clearInterval(interval);
  // }, []);

  return (
    <div className="relative w-screen h-screen">
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-white/60 backdrop-blur-sm z-[500]">
          <img alt="loading" src={loadingWheel} />
        </div>
      )}
      <MapContainer
        center={center}
        zoom={zoom}
        className="absolute inset-0 w-full h-full"
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          minZoom={0}
          maxZoom={20}
          eventHandlers={{
            loading: () => setLoading(true), // When tile loading starts
            load: () => setLoading(false), // When all tiles have loaded
          }}
        />
        {selectedStationContext && (
          <RecenterMap
            coords={
              stationsInfo.find(
                (s) => s.display_name === selectedStationContext
              )?.coords ?? center
            }
          />
        )}
        {stationsInfo.map((loc) => (
          <Marker
            eventHandlers={{
              click: () => handleMarkerClick(loc.display_name), // Handle click event
            }}
            key={loc.id}
            position={loc.coords}
            icon={
              selectedStationContext === loc.display_name
                ? selectedIcon
                : customIcon
            }
          ></Marker>
        ))}
        {coordinates && (
          <Polyline
            positions={coordinates}
            pathOptions={{
              color: "#5b55ed",
              weight: 4,
              dashArray: "6 12", // Dashed line pattern (10px dash, 10px gap)
              // dashOffset: `${dashOffset}`,
            }}
          />
        )}

        <LocateMe setUserLocation={setUserLocation} />
        {userLocation && <RecenterMap coords={userLocation} zoomLevel={14} />}
      </MapContainer>
    </div>
  );
};

export default FullScreenMap;
