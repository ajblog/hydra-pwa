/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { WeatherCard } from "../WeatherCard/WeatherCard";
import { DaySectionPropTypes } from "./DaySection.tyes";

function DaySection({
  day,
  isFirstDay,
  startTime,
  nextDay,
  selectedCardId,
  setSelectedCardId,
  setVisibleDay,
  scrollContainerRef,
  dayIndex,
  previousDay,
}: DaySectionPropTypes) {
  const dayRef = useRef<HTMLHeadingElement | null>(null);

  useEffect(() => {
    function handleScroll() {
      if (!dayRef.current || !scrollContainerRef.current) return;

      const rect = dayRef.current.getBoundingClientRect();
      const containerRect = scrollContainerRef.current.getBoundingClientRect();

      const leftDistance = rect.left - containerRect.left;

      if (leftDistance <= 0) {
        console.log(day.day_name);
        setVisibleDay(day.day_name);
      } else if (leftDistance >= 0 && leftDistance < 80) {
        setVisibleDay("");
      }

      if (previousDay && leftDistance > 80 && leftDistance < 300) {
        setVisibleDay(previousDay.day_name);
      }
    }

    const container = scrollContainerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll, { passive: true });
      handleScroll();
    }

    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [day.day_name, previousDay, scrollContainerRef, setVisibleDay]);

  return (
    <div className=" ltr  w-full">
      <h2
        ref={dayRef}
        style={{ minWidth: 80 }}
        className="z-30 w-fit sticky left-0 bottom-0 ltr text-gray-700 bg-white font-bold text-center mb-2.5 py-1 px-2 border-r border-gray-300"
      >
        {day.day_name}
      </h2>
      <div className="flex ltr overflow-visible pb-0.5">
        {day.weather_info.map((info: any, index: number) => {
          const hour = isFirstDay ? startTime + index : index;
          const uniqueId = `${dayIndex}-${index}`;

          // Check if nextData is inside current day or next day's first hour
          let nextData;
          if (index + 1 < day.weather_info.length) {
            nextData = day.weather_info[index + 1];
          } else if (nextDay && nextDay.weather_info.length > 0) {
            nextData = nextDay.weather_info[0]; // first hour of next day
          } else {
            nextData = undefined; // fallback
          }

          return (
            <WeatherCard
              key={index}
              hour={hour}
              data={info}
              nextData={nextData}
              isSelected={selectedCardId === uniqueId}
              onClick={() => setSelectedCardId(uniqueId)}
            />
          );
        })}
      </div>
    </div>
  );
}

export { DaySection };
