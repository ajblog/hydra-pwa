import { ChevronDownCircle, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useState } from "react";
import { Tab, WeatherInfoCard } from "../../atoms";
import wave from "../../../assets/images/wave-icon.png";
import temp from "../../../assets/images/temp-Icon.png";
import wind from "../../../assets/images/Wind-Icon.png";
import { CustomChart } from "../CustomChart/CustomChart";
import { DirectionStationsPropTypes } from "./Direction.type";

const DirectionStations = ({
  destinationStation,
  originStation,
}: DirectionStationsPropTypes) => {
  const [activeStation, setActiveStation] = useState<string | null>(
    originStation
  ); // default active one
  const [isSelected, setIsSelected] = useState("موج");
  const [selectedDay, setSelectedDay] = useState("شنبه");
  const [showMore, setShowMore] = useState(false);

  const getNextStation = (direction: "left" | "right") => {
    const currentIndex = data.findIndex(
      (station) => station.name === activeStation
    );
    if (direction === "left") {
      if (currentIndex < data.length - 1) {
        return data[currentIndex + 1].name;
      }
    } else if (direction === "right") {
      if (currentIndex > 0) {
        return data[currentIndex - 1].name;
      }
    }
    return activeStation; // no change if at bounds
  };

  const handleChevronClick = (direction: "left" | "right") => {
    const newStation = getNextStation(direction);
    setActiveStation(newStation);
  };

  const data = [
    { name: originStation },
    { name: "متاف" },
    { name: "بوالخیر" },
    { name: destinationStation },
  ];

  const weekData = [
    {
      title: "شنبه",
      icon: isSelected === "موج" ? wave : isSelected === "باد" ? wind : temp,
      data: "12 (m/s)",
    },
    {
      title: "یکشنبه",
      icon: isSelected === "موج" ? wave : isSelected === "باد" ? wind : temp,
      data: "12 (m/s)",
    },
    {
      title: "دوشنبه",
      icon: isSelected === "موج" ? wave : isSelected === "باد" ? wind : temp,
      data: "12 (m/s)",
    },
    {
      title: "سه شنبه",
      icon: isSelected === "موج" ? wave : isSelected === "باد" ? wind : temp,
      data: "12 (m/s)",
    },
    {
      title: "چهارشنبه",
      icon: isSelected === "موج" ? wave : isSelected === "باد" ? wind : temp,
      data: "12 (m/s)",
    },
    {
      title: "پنج شنبه",
      icon: isSelected === "موج" ? wave : isSelected === "باد" ? wind : temp,
      data: "12 (m/s)",
    },
    {
      title: "جمعه",
      icon: isSelected === "موج" ? wave : isSelected === "باد" ? wind : temp,
      data: "12 (m/s)",
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center w-full my-7">
        {/* Top Labels */}
        <div className="flex w-full justify-between mb-2 px-1">
          {data.map((_, index) => (
            <div
              key={`top-label-${index}`}
              className={`flex-1 text-[#FFA314] font-bold ${
                index === data.length - 1 && "text-end"
              }`}
            >
              {index === 0 && <span className="text-xs">مبدا</span>}
              {index === data.length - 1 && (
                <span className="text-xs">مقصد</span>
              )}
            </div>
          ))}
        </div>

        {/* Dots + Dashes */}
        <div className="flex items-center w-full justify-between">
          {data.map((station, index) => (
            <React.Fragment key={`dot-${index}`}>
              {/* Dot + Label below */}
              <div
                className="flex flex-col items-center cursor-pointer"
                onClick={() => setActiveStation(station.name)}
              >
                <div className="w-5 h-5 border border-black rounded-full flex items-center justify-center">
                  <div
                    className={`w-3 h-3 rounded-full ${
                      activeStation === station.name
                        ? "bg-[#EDB232]"
                        : "bg-[#522FD9]"
                    }`}
                  />
                </div>
                <div className="mt-2 text-[10px] text-gray-700 text-center w-max">
                  {station.name}
                </div>
              </div>

              {/* Dashes (only between dots) */}
              {index < data.length - 1 && (
                <div className="flex-1 flex gap-[3px] -translate-y-3 justify-between px-2">
                  {Array.from({ length: 8 }).map((_, dashIndex) => (
                    <div
                      key={`dash-${index}-${dashIndex}`}
                      className="w-[2px] h-0.5 bg-gray-400"
                    />
                  ))}
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-3 pb-4 border-b border-b-[#EAEAEA]">
        <ChevronRight
          color="#A6A6A6"
          onClick={() => handleChevronClick("right")}
        />
        <h4 className="text-[#5B55ED] font-bold text-lg">
          ایستگاه {activeStation}
        </h4>
        <ChevronLeft
          color="#A6A6A6"
          onClick={() => handleChevronClick("left")}
        />
      </div>
      <div>
        <div className="flex items-center px-5 gap-9 mt-3.5">
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
          {weekData.map((item, index) => (
            <WeatherInfoCard
              key={index}
              data={item.data}
              title={item.title}
              icon={item.icon}
              isSelected={selectedDay === item.title}
              setSelectedDay={setSelectedDay}
            />
          ))}
        </div>
      </div>
      {showMore ? (
        <CustomChart />
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
