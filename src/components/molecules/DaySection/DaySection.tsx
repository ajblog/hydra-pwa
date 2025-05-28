/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { WeatherCard } from "../WeatherCard/WeatherCard";

function DaySection({
  day,
  isFirstDay,
  startTime,
  nextDay,
}: {
  day: any;
  isFirstDay: boolean;
  startTime: number;
  nextDay?: any;
}) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  return (
    <div className="relative ltr w-full">
      {/* Sticky day name on the left */}
      <div className="w-full sticky left-0 top-0 right-0">
        <h2 className="z-30 font-bold text-left mb-4 py-1 px-2 border-r border-gray-300">
          {day.day_name}
        </h2>
      </div>
      <div className="flex ltr">
        {day.weather_info.map((info: any, index: number) => {
          const hour = isFirstDay ? startTime + index : index;

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
              isSelected={selectedIndex === index}
              onClick={() => setSelectedIndex(index)}
            />
          );
        })}
      </div>
    </div>
  );
}

export { DaySection };
