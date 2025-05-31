/* eslint-disable @typescript-eslint/no-explicit-any */
import { WeatherCard } from "../WeatherCard/WeatherCard";

function DaySection({
  day,
  isFirstDay,
  startTime,
  nextDay,
  selectedCardId,
  setSelectedCardId,
  dayIndex,
}: {
  day: any;
  isFirstDay: boolean;
  startTime: number;
  selectedCardId: string | null;
  setSelectedCardId: (id: string) => void;
  dayIndex: number;
  nextDay?: any;
}) {
  return (
    <div className="relative ltr ">
      {/* Sticky day name on the left */}
      <div className="ltr">
        <h2 className="z-30 w-fit sticky left-0  ltr bg-white font-bold text-left mb-2.5 py-1 px-2 border-r border-gray-300">
          {day.day_name}
        </h2>
      </div>
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
