import { LatLngTuple } from "leaflet";
import { LocateFixed } from "lucide-react";
import { SetStateAction } from "react";

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

export {LocateMe}