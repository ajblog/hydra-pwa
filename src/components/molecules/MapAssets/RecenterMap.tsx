import { LatLngTuple } from "leaflet";
import { useEffect } from "react";
import { useMap } from "react-leaflet";
import L from "leaflet";

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

export { RecenterMap };