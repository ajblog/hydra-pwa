/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronLeft } from "lucide-react";
import { StationInformationPropTypes } from "./station.type";
import { Tab, WeatherInfoCard } from "../../atoms";
import { useState } from "react";
import wave from "../../../assets/images/wave-icon.png";
import temp from "../../../assets/images/temp-Icon.png";
import wind from "../../../assets/images/Wind-Icon.png";
import loadingGif from "../../../assets/images/loading.gif";

import { CustomChart } from "../CustomChart/CustomChart";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleStationDetails } from "../../../services";
import { StationsTypes } from "../../../types";

const StationInformation = ({
  selectedStation,
  setStep,
}: StationInformationPropTypes) => {
  const [isSelected, setIsSelected] = useState("موج");
  const [selectedDay, setSelectedDay] = useState("شنبه");

  const query = useQueryClient();
  const stationsInfo: StationsTypes[] | undefined = query.getQueryData([
    "stations",
  ]);
  const selectedStationName = stationsInfo?.filter(
    (item) => item.display_name === selectedStation
  );
  const { data, isLoading } = useQuery({
    queryKey: ["station-detail", selectedStation],
    queryFn: () =>
      getSingleStationDetails({ station_name: selectedStationName![0].name }),
  });

  const selectedDayDetail = data?.weather_data![0].days.filter(
    (item: any) => item.day_name === selectedDay
  );

  // useEffect(() => {
  //   return () => {
  //     setSelectedDay(data?.weather_data![0].days[0].day_name);
  //   };
  // }, []);

  if (isLoading)
    return (
      <div className="flex my-4 items-center justify-center">
        <img
          alt="loading"
          src={loadingGif}
          width={160}
          height={350}
          className="w-[160px] h-[360px] m-auto"
        />{" "}
      </div>
    );
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between border-b-[4px] border-b-[#EAEAEA] pb-5">
        <span className="font-bold text-xl text-[#5B55ED]">
          ایستگاه {selectedStation}
        </span>
        <ChevronLeft onClick={() => setStep("selection")} color="#A6A6A6" />
      </div>
      <div className="flex items-center justify-center px-5 gap-9 mt-3.5">
        {["موج", "باد", "دما"].map((item, index) => (
          <Tab
            setIsSelected={setIsSelected}
            isSelected={isSelected === item}
            key={index}
            title={item}
          />
        ))}
      </div>
      <div className="flex items-center gap-1 w-full mt-7">
        {data?.weather_data![0].days.map((item: any, index: number) => (
          <WeatherInfoCard
            key={index}
            data={
              isSelected === "موج"
                ? item.weather_info[0].wave.hmax + "m"
                : isSelected === "باد"
                  ? item.weather_info[0].wind.wind_speed + "m/s"
                  : item.weather_info[0].temperature.temperature + "°c"
            }
            title={item.day_name}
            icon={
              isSelected === "موج" ? wave : isSelected === "باد" ? wind : temp
            }
            isSelected={selectedDay === item.day_name}
            setSelectedDay={setSelectedDay}
          />
        ))}
      </div>
      <div className="mt-4">
        <CustomChart
          chartData={selectedDayDetail[0].weather_info}
          type={
            isSelected === "موج"
              ? "wave"
              : isSelected === "باد"
                ? "wind"
                : "temperature"
          }
        />
      </div>
    </div>
  );
};

export { StationInformation };
