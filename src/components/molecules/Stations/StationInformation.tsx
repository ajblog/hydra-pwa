import { ChevronLeft } from "lucide-react";
import { StationInformationPropTypes } from "./station.type";
import loadingGif from "../../../assets/images/loading.gif";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleStationDetails } from "../../../services";
import { StationsTypes } from "../../../types";
import { roundToPreviousHour } from "../../../utils";
import { AllInOneChart } from "../../organs";

const StationInformation = ({
  selectedStation,
  setStep,
}: StationInformationPropTypes) => {
  const query = useQueryClient();
  const stationsInfo: StationsTypes[] | undefined = query.getQueryData([
    "stations",
  ]);
  const selectedStationName = stationsInfo?.find(
    (item) => item.display_name === selectedStation
  );

  const { data, isLoading } = useQuery({
    queryKey: ["station-detail", selectedStation],
    enabled: !!selectedStationName, // only fetch if station is available
    queryFn: () =>
      getSingleStationDetails({ station_name: selectedStationName!.name }),
  });

  if (isLoading || !data) {
    return (
      <div className="flex my-4 items-center justify-center">
        <img
          alt="loading"
          src={loadingGif}
          width={160}
          height={350}
          className="w-[160px] h-[360px] m-auto"
        />
      </div>
    );
  }

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between border-b-[4px] border-b-[#EAEAEA] pb-5">
        <span className="font-bold text-xl text-[#5B55ED]">
          ایستگاه {selectedStation}
        </span>
        <ChevronLeft onClick={() => setStep("selection")} color="#A6A6A6" />
      </div>
      <div className="mt-4">
        <AllInOneChart
          data={data.weather_data[0].days}
          startTime={roundToPreviousHour(data.weather_data[0].start_date_time)!}
        />
      </div>
    </div>
  );
};

export { StationInformation };
