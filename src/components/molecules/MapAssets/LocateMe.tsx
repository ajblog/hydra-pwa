import { LatLngTuple } from "leaflet";
import { LocateFixed } from "lucide-react";
import { SetStateAction, useEffect, useState } from "react";

const LocateMe = ({
  setUserLocation,
}: {
  setUserLocation: React.Dispatch<SetStateAction<LatLngTuple | null>>;
}) => {
  const [watchId, setWatchId] = useState<number | null>(null);

  const startTracking = () => {
    if (navigator.geolocation) {
      const id = navigator.geolocation.watchPosition(
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
          enableHighAccuracy: true, // Use high accuracy if possible
          timeout: 10000, // Timeout after 10 seconds if no position is found
          maximumAge: 0, // Don't use cached location
        }
      );
      setWatchId(id); // Save the watch ID to state to clear the watch later
    } else {
      alert("Your browser doesn't support geolocation.");
    }
  };

  const stopTracking = () => {
    if (watchId !== null) {
      navigator.geolocation.clearWatch(watchId);
      setWatchId(null); // Reset the watch ID state
    }
  };

  useEffect(() => {
    // Cleanup the watch when component unmounts
    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, [watchId]);

  return (
    <button
      onClick={() => {
        if (watchId === null) {
          startTracking(); // Start tracking if not already tracking
        } else {
          stopTracking(); // Stop tracking if already tracking
        }
      }}
      className="absolute bottom-32 right-4 z-[600] bg-[#5b55ed] p-4 rounded-full shadow-2xl transition"
    >
      <LocateFixed color="white" />
    </button>
  );
};

export { LocateMe };
