import { RadioGroup, RadioGroupItem } from "../../atoms";
import { ChevronLeft } from "lucide-react";
import { StationSelectionPropTypes } from "./StationSelection.type";
import { useStationContext } from "../../../contexts/stationContext";
import { useQueryClient } from "@tanstack/react-query";
import { StationsTypes } from "../../../types";

const StationSelection = ({
  selectedStation,
  selectedDirectionStation,
  setSelectedStation,
  setStationType,
  title,
  stationType,
}: StationSelectionPropTypes) => {
  const { setSelectedStationContext } = useStationContext();

  const query = useQueryClient();
  const stationsInfo: StationsTypes[] | undefined = query.getQueryData([
    "stations",
  ]);

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between">
        <span className="text-[12px] text-[#FFA314] font-bold">{title}</span>
        <ChevronLeft onClick={() => setStationType(null)} />
      </div>
      <RadioGroup
        defaultValue={selectedStation}
        className="grid grid-cols-2 gap-0 mt-4"
      >
        {stationsInfo?.map((item, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 py-4 px-3 border-b-[4px] border-b-[#EAEAEA] ${index % 2 ? "" : "pl-0"} `}
          >
            <RadioGroupItem
              disabled={item.display_name === selectedDirectionStation}
              onClick={(e) => {
                const value = e.currentTarget.value;
                setSelectedStation(value);
                setSelectedStationContext(value);
                if (stationType === "destination" || stationType === "origin") {
                  const selectedStation = JSON.stringify(item);
                  sessionStorage.setItem(stationType, selectedStation);
                  const customEventName = `${stationType}Change`;
                  window.dispatchEvent(new Event(customEventName));
                }
                setStationType(null);
              }}
              value={item.display_name}
              id={index.toString()}
            />

            <label
              className={`w-full text-sm py-1 ${index % 2 ? "" : "border-l-[4px] border-l-[#EAEAEA]"} ${item.display_name === selectedDirectionStation ? "text-[#ccc]" : ""}`}
              htmlFor={index.toString()}
            >
              ایستگاه {item.display_name}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export { StationSelection };
