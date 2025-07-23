import { useEffect, useState } from "react";
import { SelectLocationBox } from "../../atoms";
import { StationSelection } from "../Navigation/StationSelection";
import { StationsPropTypes } from "../Stations/station.type";
import { DirectionOverview } from "./DirectionOverview";
import { useQueryClient } from "@tanstack/react-query";
import { StationsTypes } from "../../../types";

const Direction = ({ setHideButtons }: StationsPropTypes) => {
  const [originStation, setOriginStation] = useState<string>(
    "موقعیت مبدا را انتخاب کنید"
  );
  const [destinationStation, setDestinationStation] = useState<string>(
    "موقعیت مقصد را انتخاب کنید"
  );
  const [stationType, setStationType] = useState<
    "origin" | "destination" | null
  >(null);

  const [directionStep, setDirectionStep] = useState<"selection" | "overview">(
    sessionStorage.getItem("origin") && sessionStorage.getItem("destination")
      ? "overview"
      : "selection"
  );

  const query = useQueryClient();
  const stationsInfo: StationsTypes[] | undefined = query.getQueryData([
    "stations",
  ]);

  useEffect(() => {
    const isSelectedOrigin = stationsInfo?.some(
      (item) => item.display_name === originStation
    );
    const isSelectedDestination = stationsInfo?.some(
      (item) => item.display_name === destinationStation
    );
    if (isSelectedDestination && isSelectedOrigin) setDirectionStep("overview");
  }, [setHideButtons, originStation, destinationStation, stationsInfo]);

  useEffect(() => {
    // Show buttons only when user is on selection step and not choosing a specific station
    const shouldShowButtons =
      directionStep === "selection" && stationType === null;
    setHideButtons(!shouldShowButtons);
  }, [directionStep, stationType, setHideButtons]);

  useEffect(() => {
    const originRaw = sessionStorage.getItem("origin");
    const destinationRaw = sessionStorage.getItem("destination");

    if (originRaw) {
      try {
        const parsedOrigin = JSON.parse(originRaw);
        setOriginStation(parsedOrigin.display_name || "");
      } catch (err) {
        console.error("Failed to parse origin:", err);
      }
    }

    if (destinationRaw) {
      try {
        const parsedDestination = JSON.parse(destinationRaw);
        setDestinationStation(parsedDestination.display_name || "");
      } catch (err) {
        console.error("Failed to parse destination:", err);
      }
    }
  }, []);

  if (stationType === "origin") {
    return (
      <StationSelection
        title="موقعیت مبدا موردنظر خود را از لیست زیر انتخاب کنید."
        selectedStation={originStation}
        selectedDirectionStation={destinationStation}
        setSelectedStation={setOriginStation}
        setStationType={setStationType}
        stationType={stationType}
      />
    );
  } else if (stationType === "destination") {
    return (
      <StationSelection
        title="موقعیت مقصد موردنظر خود را از لیست زیر انتخاب کنید."
        selectedStation={destinationStation}
        selectedDirectionStation={originStation}
        setSelectedStation={setDestinationStation}
        setStationType={setStationType}
        stationType={stationType}
      />
    );
  }

  if (directionStep === "overview") {
    return (
      <DirectionOverview
        destinationStation={destinationStation}
        originStation={originStation}
        setStationType={setStationType}
        setDestinationStation={setDestinationStation}
        setOriginStation={setOriginStation}
        setDirectionStep={setDirectionStep}
      />
    );
  }

  return (
    <div className="mt-3  px-4">
      <span className="text-sm text-[#FFA314] font-bold">
        موقعیت های مبدا و مقصد خود را انتخاب کنید:
      </span>
      <div className="flex flex-col gap-4 mt-3">
        <SelectLocationBox
          onClick={() => setStationType("origin")}
          title={originStation}
        />
        <SelectLocationBox
          onClick={() => setStationType("destination")}
          title={destinationStation}
        />
      </div>
    </div>
  );
};

export { Direction };
