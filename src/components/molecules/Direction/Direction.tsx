import { useEffect, useState } from "react";
import { SelectLocationBox } from "../../atoms";
import { StationSelection } from "../Navigation/StationSelection";
import { StationsPropTypes } from "../Stations/station.type";
import { DirectionOverview } from "./DirectionOverview";
import { useQueryClient } from "@tanstack/react-query";
import { StationsTypes } from "../../../types";

const Direction = ({ setHideButtons }: StationsPropTypes) => {
  const [originStation, setOriginStation] = useState<string>(
    "ایستگاه مبدا را انتخاب کنید"
  );
  const [destinationStation, setDestinationStation] = useState<string>(
    "ایستگاه مقصد را انتخاب کنید"
  );
  const [stationType, setStationType] = useState<
    "origin" | "destination" | null
  >(null);

  const [directionStep, setDirectionStep] = useState<"selection" | "overview">(
    "selection"
  );

   const query = useQueryClient();
   const stationsInfo: StationsTypes[] | undefined = query.getQueryData([
     "stations",
   ]);

  useEffect(() => {
    setHideButtons(false);
    const isSelectedOrigin = stationsInfo?.some(
      (item) => item.display_name === originStation
    );
    const isSelectedDestination = stationsInfo?.some(
      (item) => item.display_name === destinationStation
    );
    if (isSelectedDestination && isSelectedOrigin) setDirectionStep("overview");
  }, [setHideButtons, originStation, destinationStation,stationsInfo]);

  useEffect(() => {
    if (directionStep === "selection") {
      setHideButtons(false);
    } else {
      setHideButtons(true);
    }
  }, [setHideButtons, directionStep]);

  if (stationType === "origin") {
    setHideButtons(true);
    return (
      <StationSelection
        title="ایستگاه مبدا موردنظر خود را از لیست زیر انتخاب کنید."
        selectedStation={originStation}
        setSelectedStation={setOriginStation}
        setStationType={setStationType}
      />
    );
  } else if (stationType === "destination") {
    setHideButtons(true);
    return (
      <StationSelection
        title="ایستگاه مقصد موردنظر خود را از لیست زیر انتخاب کنید."
        selectedStation={destinationStation}
        setSelectedStation={setDestinationStation}
        setStationType={setStationType}
      />
    );
  }

  if (directionStep === "overview") {
    setHideButtons(true);
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
        ایستگاه های مبدا و مقصد خود را انتخاب کنید:
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
