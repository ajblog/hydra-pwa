import { ChevronLeft } from "lucide-react";
import { SelectLocationBox } from "../../atoms";
import { DirectionOverviewPropTypes } from "./Direction.type";
import { SwitchIcon } from "../../../assets";
import { DirectionStations } from "./DirectionStations";
import { useState } from "react";

const DirectionOverview = ({
  setStationType,
  originStation,
  destinationStation,
  setDestinationStation,
  setOriginStation,
  setDirectionStep,
}: DirectionOverviewPropTypes) => {
  const [showMore, setShowMore] = useState(false);
  const handleSwitchStations = () => {
    setDestinationStation(originStation);
    setOriginStation(destinationStation);
  };
  return (
    <div className="flex flex-col ">
      <ChevronLeft
        color="#A6A6A6"
        className="self-end mb-2"
        onClick={() => {
          if (showMore) setShowMore(false);
          else setDirectionStep("selection");
        }}
      />

      <div className="flex flex-col gap-2 mt-3 px-3">
        <SelectLocationBox
          onClick={() => setStationType("origin")}
          title={originStation}
          selected
        />
        <div onClick={handleSwitchStations} className="translate-x-6">
          <SwitchIcon width="28" height="22" />
        </div>
        <SelectLocationBox
          onClick={() => setStationType("destination")}
          title={destinationStation}
          selected
        />
      </div>
      <DirectionStations
        setShowMore={setShowMore}
        showMore={showMore}
        originStation={originStation}
        destinationStation={destinationStation}
      />
    </div>
  );
};

export { DirectionOverview };
