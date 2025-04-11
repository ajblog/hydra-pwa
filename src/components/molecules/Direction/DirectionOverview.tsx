import { ChevronLeft } from "lucide-react";
import { SelectLocationBox } from "../../atoms";
import { DirectionOverviewPropTypes } from "./Direction.type";
import { SwitchIcon } from "../../../assets";
import { DirectionStations } from "./DirectionStations";
import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getRoutesInformation } from "../../../services";
import { StationsTypes } from "../../../types";

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
    console.log("switiching");
    setDestinationStation(originStation);
    setOriginStation(destinationStation);
  };
  const query = useQueryClient();
  const stationsInfo: StationsTypes[] | undefined = query.getQueryData([
    "stations",
  ]);
  const originStationName = stationsInfo?.filter(
    (item) => item.display_name === originStation
  );
  const destinationStationName = stationsInfo?.filter(
    (item) => item.display_name === destinationStation
  );
  const { data } = useQuery({
    queryKey: ["routes"],
    queryFn: () =>
      getRoutesInformation({
        start: originStationName![0].name,
        end: destinationStationName![0].name,
      }),
  });

  console.log(data, "routes");
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
