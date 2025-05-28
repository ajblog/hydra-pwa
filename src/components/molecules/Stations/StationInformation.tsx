import { ChevronLeft } from "lucide-react";
import { StationInformationPropTypes } from "./station.type";
// import { Tab, WeatherInfoCard } from "../../atoms";
// import { useEffect, useState } from "react";
// import wave from "../../../assets/images/wave-icon.png";
// import temp from "../../../assets/images/temp-Icon.png";
// import wind from "../../../assets/images/Wind-Icon.png";
import loadingGif from "../../../assets/images/loading.gif";

// import { CustomChart } from "../CustomChart/CustomChart";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { getSingleStationDetails } from "../../../services";
import { StationsTypes } from "../../../types";
import { roundToPreviousHour } from "../../../utils";
import { AllInOneChart } from "../../organs";

const StationInformation = ({
  selectedStation,
  setStep,
}: StationInformationPropTypes) => {
  // const [isSelected, setIsSelected] = useState("موج");
  // const [selectedDay, setSelectedDay] = useState<string | null>(null);

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

  // ✅ Set default selected day when data loads
  // useEffect(() => {
  //   if (data?.weather_data?.[0]?.days?.length) {
  //     setSelectedDay(data.weather_data[0].days[0].day_name);
  //   }
  // }, [data]);

  // Guard if data still loading
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

  // // Find selected day details
  // const selectedDayDetail = data.weather_data[0].days.find(
  //   (item: { day_name: string }) => item.day_name === selectedDay
  // );

  // // Calculate selectedDayIndex
  // const selectedDayIndex = data.weather_data[0].days.findIndex(
  //   (item: { day_name: string }) => item.day_name === selectedDay
  // );

  return (
    <div className="mt-3">
      <div className="flex items-center justify-between border-b-[4px] border-b-[#EAEAEA] pb-5">
        <span className="font-bold text-xl text-[#5B55ED]">
          ایستگاه {selectedStation}
        </span>
        <ChevronLeft onClick={() => setStep("selection")} color="#A6A6A6" />
      </div>

      {/* <div className="flex items-center justify-center px-5 gap-9 mt-3.5">
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
        {data.weather_data[0].days
          .slice()
          .reverse()
          .map(
            (
              item: {
                day_name: string;
                weather_info: {
                  wave?: { hmax?: number };
                  wind?: { wind_speed?: number };
                  temperature?: { temperature?: number };
                }[];
              },
              index: number
            ) => (
              <WeatherInfoCard
                key={index}
                data={
                  isSelected === "موج"
                    ? `${item.weather_info[0]?.wave?.hmax ?? "-"}m`
                    : isSelected === "باد"
                    ? `${item.weather_info[0]?.wind?.wind_speed ?? "-"}m/s`
                    : `${
                        item.weather_info[0]?.temperature?.temperature ?? "-"
                      }°c`
                }
                title={item.day_name}
                icon={
                  isSelected === "موج"
                    ? wave
                    : isSelected === "باد"
                    ? wind
                    : temp
                }
                isSelected={selectedDay === item.day_name}
                setSelectedDay={setSelectedDay}
              />
            )
          )}
      </div> */}

      <div className="mt-4">
        {/* {selectedDayDetail && roundedStartDateTime ? (
          <CustomChart
            chartData={selectedDayDetail.weather_info}
            type={
              isSelected === "موج"
                ? "wave"
                : isSelected === "باد"
                  ? "wind"
                  : "temperature"
            }
            startDateTime={selectedDayIndex === 0 ? roundedStartDateTime : ""} 
          />
        ) : (
          <div className="text-center text-gray-500">
            داده‌ای برای این روز موجود نیست.
          </div>
        )} */}
        <AllInOneChart
          data={data.weather_data[0].days}
          startTime={roundToPreviousHour(data.weather_data[0].start_date_time)!}
        />
      </div>
    </div>
  );
};

export { StationInformation };
