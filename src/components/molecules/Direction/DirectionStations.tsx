/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronDownCircle, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { Tab, WeatherInfoCard } from "../../atoms";
import wave from "../../../assets/images/wave-icon.png";
import temp from "../../../assets/images/temp-Icon.png";
import wind from "../../../assets/images/Wind-Icon.png";
import loadingWheel from "../../../assets/images/loading.gif";
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
  const {
    data: routesData,
    isLoading: routeIsLoading,
    isFetching,
  } = useQuery({
    queryKey: ["routes", originStation],
    queryFn: () =>
      getRoutesInformation({
        start: originStationName![0].name,
        end: destinationStationName![0].name,
      }),
    enabled: !!stationsInfo,
  });

  const { setSelectedStationContext } = useStationContext();
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeStationIndex, setActiveStationIndex] = useState<number>(0);
  const [isSelected, setIsSelected] = useState("موج");
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const getNextStation = (direction: "left" | "right") => {
    const currentIndex = activeStationIndex;
    if (direction === "left") {
      if (currentIndex < (routesData?.route.length || 0) - 1) {
        return currentIndex + 1;
      }
    } else if (direction === "right") {
      if (currentIndex > 0) {
        return currentIndex - 1;
      }
    }
    return currentIndex;
  };

  const handleChevronClick = (direction: "left" | "right") => {
    const newIndex = getNextStation(direction);
    setActiveStationIndex(newIndex);
  };

  const shouldShowLabel = (index: number, totalStations: number): boolean => {
    if (totalStations <= 7) return true;

    const isEven = totalStations % 2 === 0;

    // Hide origin and destination always
    if (index === 0 || index === totalStations - 1) return false;

    // Extra rule: for even counts, always show second and second-last
    if (isEven && (index === 1 || index === totalStations - 2)) return true;

    const middleStations = totalStations - 2;
    const visibleCount = Math.max(2, Math.floor(middleStations / 1.5));
    const spacing = Math.ceil(middleStations / visibleCount);

    return (index - 1) % spacing === 0;
  }; // this function calculates labels based on the stations count dynamiclly

  const { data: stationDetail, isLoading } = useQuery({
    queryKey: ["station-detail", routesData, activeStationIndex],
    queryFn: () =>
      getSingleStationDetails({
        station_name: routesData.route[activeStationIndex].name,
      }),
  });

  useEffect(() => {
    if (routesData) {
      setSelectedStationContext(
        routesData.route[activeStationIndex].display_name
      );
    }
  }, [activeStationIndex, setSelectedStationContext, routesData]);

  // ✅ Set default selected day when data loads
  useEffect(() => {
    if (stationDetail?.weather_data?.[0]?.days?.length) {
      setSelectedDay(stationDetail.weather_data[0].days[0].day_name);
    }
  }, [stationDetail]);

  const selectedDayDetail = stationDetail?.weather_data![0].days.filter(
    (item: any) => item.day_name === selectedDay
  );

  if (isLoading || routeIsLoading || isFetching)
    return (
      <img
        alt="loading"
        src={loadingWheel}
        width={160}
        height={350}
        className="w-[160px] h-[300px] m-auto"
      />
    );

  return (
    <>
      <div
        ref={containerRef}
        className="flex justify-between items-start w-full my-5 pt-3"
      >
        {routesData.route.map((station: StationsTypes, index: number) => (
          <React.Fragment key={`dot-${index}`}>
            {/* Dot */}
            <div
              className="flex flex-col items-center cursor-pointer shrink-0 z-10  w-[1.5rem]"
              onClick={() => setActiveStationIndex(index)}
            >
              <div
                className={`${
                  routesData.route.length < 6 ? "w-5 h-5" : "w-4 h-4"
                } border border-black rounded-full flex items-center justify-center bg-white`}
              >
                <div
                  className={`${
                    routesData.route.length < 6 ? "w-3 h-3" : "w-2 h-2"
                  } rounded-full ${
                    activeStationIndex === index
                      ? "bg-[#EDB232]"
                      : "bg-[#522FD9]"
                  }`}
                />
              </div>
              <div className="mt-2 text-[10px] text-gray-700 text-center w-full whitespace-nowrap h-[1.25rem]">
                <span
                  className={
                    shouldShowLabel(index, routesData.route.length)
                      ? ""
                      : "invisible"
                  }
                >
                  {station.display_name}
                </span>
              </div>
            </div>

            {/* Dashed Line */}
            {index < routesData.route.length - 1 && (
              <div
                className="flex-grow h-[2px] mt-4 -translate-y-2"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(to right, #9ca3af 0px, #9ca3af 1px, transparent 1px, transparent 3px)",
                }}
              />
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
          ایستگاه {routesData.route[activeStationIndex].display_name}
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
          {stationDetail.weather_data[0].days
            .slice()
            .reverse()
            .map((item: any, index: number) => (
              <WeatherInfoCard
                key={index}
                data={
                  isSelected === "موج"
                    ? `${item.weather_info[0]?.wave?.hmax ?? "-"}m`
                    : isSelected === "باد"
                      ? `${item.weather_info[0]?.wind?.wind_speed ?? "-"}m/s`
                      : `${item.weather_info[0]?.temperature?.temperature ?? "-"}°c`
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
            ))}
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
            chartData={selectedDayDetail?.[0].weather_info}
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
