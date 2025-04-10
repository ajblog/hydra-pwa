/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDownCircle, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Tab, WeatherInfoCard } from "../../atoms";
import wave from "../../../assets/images/wave-icon.png";
import temp from "../../../assets/images/temp-Icon.png";
import wind from "../../../assets/images/Wind-Icon.png";
import { CustomChart } from "../CustomChart/CustomChart";
import { DirectionStationsPropTypes } from "./Direction.type";
import { useStationContext } from "../../../contexts/stationContext";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getRoutesInformation,
  getSingleStationDetails,
} from "../../../services";
import { StationsTypes } from "../../../types";

const DirectionStations = ({
  destinationStation,
  originStation,
  showMore,
  setShowMore,
}: DirectionStationsPropTypes) => {
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
  const { data: routesData } = useQuery({
    queryKey: ["routes" , originStation],
    queryFn: () =>
      getRoutesInformation({
        start: originStationName![0].name,
        end: destinationStationName![0].name,
      }),
    enabled: !!stationsInfo,
  });

  const data = [
    { name: originStation },
    { name: "متاف" },
    { name: "بوالخیر" },
    { name: destinationStation },
  ];
  const { setSelectedStationContext } = useStationContext();
  const [dashCounts, setDashCounts] = useState<number[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStationIndex, setActiveStationIndex] = useState<number>(0); // Now storing the index
  const [isSelected, setIsSelected] = useState("موج");
  const [selectedDay, setSelectedDay] = useState("شنبه");

  const getNextStation = (direction: "left" | "right") => {
    const currentIndex = activeStationIndex;
    if (direction === "left") {
      if (currentIndex < data.length - 1) {
        return currentIndex + 1; // Move to the next station
      }
    } else if (direction === "right") {
      if (currentIndex > 0) {
        return currentIndex - 1; // Move to the previous station
      }
    }
    return currentIndex; // No change if at bounds
  };

  const handleChevronClick = (direction: "left" | "right") => {
    const newIndex = getNextStation(direction);
    setActiveStationIndex(newIndex); // Update the active station by index
  };

  const { data: stationDetail, isLoading } = useQuery({
    queryKey: ["station-detail", routesData, activeStationIndex],
    queryFn: () =>
      getSingleStationDetails({
        station_name: routesData.route[activeStationIndex].name,
      }),
  });

  useEffect(() => {
    setSelectedStationContext(data[activeStationIndex].name);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeStationIndex, setSelectedStationContext]);

  useEffect(() => {
    const updateDashCounts = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      const totalStations = data.length;
      const gaps = totalStations - 1;

      const dashWidth = 2; // width of a single dash in px
      const dashGap = 3; // space between dashes
      const dashTotal = dashWidth + dashGap;

      const availableWidth = containerWidth - totalStations * 40; // subtract dot widths
      const dashPerGap = Math.floor(availableWidth / gaps / dashTotal);

      setDashCounts(Array(gaps).fill(dashPerGap));
    };

    updateDashCounts();
    window.addEventListener("resize", updateDashCounts);

    return () => {
      window.removeEventListener("resize", updateDashCounts);
    };
  }, [data.length]);

  const selectedDayDetail = stationDetail?.weather_data![0].days.filter(
    (item: any) => item.day_name === selectedDay
  );

  console.log(routesData, "reouts data");
  if (isLoading) return <p>Loading</p>;

  return (
    <>
      <div
        ref={containerRef}
        className="flex items-center w-full justify-between my-5 pt-3"
      >
        {routesData.route.map((station: StationsTypes, index: number) => (
          <React.Fragment key={`dot-${index}`}>
            {/* Dot */}
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setActiveStationIndex(index)}
            >
              <div className="w-5 h-5 border border-black rounded-full flex items-center justify-center">
                <div
                  className={`w-3 h-3 rounded-full ${
                    activeStationIndex === index
                      ? "bg-[#EDB232]"
                      : "bg-[#522FD9]"
                  }`}
                />
              </div>
              <div className="mt-2 text-[10px] text-gray-700 text-center w-max">
                {station.display_name}
              </div>
            </div>

            {/* Dashes */}
            {index < data.length - 1 && (
              <div className="flex-1 flex gap-[3px] -translate-y-3 justify-between px-2">
                {Array.from({ length: dashCounts[index] || 0 }).map(
                  (_, dashIndex) => (
                    <div
                      key={`dash-${index}-${dashIndex}`}
                      className="w-[2px] h-0.5 bg-gray-400"
                    />
                  )
                )}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      <div className="flex items-center gap-3 pb-4 border-b border-b-[#EAEAEA]">
        <ChevronRight
          color="#A6A6A6"
          onClick={() => handleChevronClick("right")}
        />
        <h4 className="text-[#5B55ED] font-bold text-lg">
          ایستگاه {data[activeStationIndex].name}{" "}
          {/* Show the station name based on index */}
        </h4>
        <ChevronLeft
          color="#A6A6A6"
          onClick={() => handleChevronClick("left")}
        />
      </div>

      <div>
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
          {stationDetail?.weather_data[0].days.map(
            (item: any, index: number) => (
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
        </div>
      </div>

      {showMore ? (
        <div className="mt-4">
          <CustomChart
            type={
              isSelected === "موج"
                ? "wave"
                : isSelected === "باد"
                  ? "wind"
                  : "temperature"
            }
            chartData={selectedDayDetail[0].weather_info}
          />
        </div>
      ) : (
        <div
          className="flex items-center gap-1 justify-center mt-3"
          onClick={() => setShowMore(true)}
        >
          <span>بیشتر...</span>
          <ChevronDownCircle color="purple" />
        </div>
      )}
    </>
  );
};

export { DirectionStations };
