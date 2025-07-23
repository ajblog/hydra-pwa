/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";
import { WeatherCard } from "../WeatherCard/WeatherCard";
import { DaySectionPropTypes } from "./DaySection.tyes";

function DaySection({
  day,
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

      if (leftDistance <= 15) {
        setVisibleDay({ day: day.day_name, date: day.date });
      } else if (leftDistance >= 15 && leftDistance < 80) {
        setVisibleDay(null);
      }

      if (previousDay && leftDistance > 80 && leftDistance < 100) {
        setVisibleDay({ day: previousDay.day_name, date: previousDay.date });
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
  }, [day.date, day.day_name, previousDay, scrollContainerRef, setVisibleDay]);

  // function formatPersianDate(input: string) {
  //   const persianDigits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  //   const converted = input.replace(/-/g, "/");
  //   return converted.replace(/\d/g, (d) => persianDigits[+d]);
  // }

  return (
    <div className=" ltr  w-full">
      <div
        ref={dayRef}
        className="z-30 w-fit sticky left-0 bottom-0 ltr text-gray-700 bg-white text-xs font-bold text-center mb-2.5 py-1 px-0.5 border-l border-gray-300 flex flex-col gap-1"
      >
        <h2 style={{ minWidth: 60 }}>{day.day_name}</h2>
        <span>{day.date}</span>
      </div>
      <div className="flex ltr overflow-visible pb-0.5">
        {day.weather_info.map((info: any, index: number) => {
          const hour = info.time;
          const uniqueId = `${dayIndex}-${index}`;

          let nextData;
          if (index + 1 < day.weather_info.length) {
            nextData = day.weather_info[index + 1];
          } else if (nextDay?.weather_info.length) {
            nextData = nextDay.weather_info[0];
          }

          return (
            <div key={index} className="relative">
              {index === 0 && (
                <div className="absolute left-0 -top-[10px] h-full w-[1px] bg-gray-300 z-50" />
              )}
              <WeatherCard
                hour={hour}
                data={info}
                nextData={nextData}
                isSelected={selectedCardId === uniqueId}
                onClick={() => setSelectedCardId(uniqueId)}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export { DaySection };
