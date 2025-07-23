/* eslint-disable @typescript-eslint/no-explicit-any */
import { CustomChart, DaySection } from "../molecules";
import { SetStateAction, useRef, useState } from "react";
import { UnitTypes } from "../molecules/Stations/station.type";

const chartParameters = [
  { name: "Time", key: "timeUnit" },
  { name: "Temp", key: null },
  { name: "WSPD", key: "windUnit" },
  { name: "WDIR", key: null },
  { name: "Hs", key: "waveUnit" },
];

const AllInOneChart = ({
  data,
  units,
  setUnits,
  startTime = "0:00",
}: {
  data: any;
  units: UnitTypes;
  setUnits: React.Dispatch<SetStateAction<UnitTypes>>;
  startTime?: string;
}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);
  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [visibleDay, setVisibleDay] = useState<Record<string, string> | null>(
    null
  );

  const temperatures = data.flatMap((day: any) =>
    day.weather_info.map((info: any) => info.temperature.temperature)
  );

  // const formatPersianDate = (input: string) => {
  //   const digits = ["۰", "۱", "۲", "۳", "۴", "۵", "۶", "۷", "۸", "۹"];
  //   return input.replace(/-/g, "/").replace(/\d/g, (d) => digits[+d]);
  // };

  const getOptions = (key: keyof UnitTypes, value: string) => {
    if (key === "windUnit") return [value, value === "m/s" ? "knot" : "m/s"];
    if (key === "waveUnit") return [value, value === "m" ? "foot" : "m"];
    if (key === "timeUnit") return [value, value === "IRST" ? "UTC" : "IRST"];
    return [];
  };

  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="z-40 absolute -left-1 text-center text-gray-700 h-fit top-0 text-xs flex flex-col gap-1 ltr bg-white font-bold mb-2.5 py-1 px-2 border-r border-gray-300"
        style={{
          minWidth: 80,
          opacity: visibleDay?.day ? 1 : 0,
          transition: "opacity 0.4s",
          pointerEvents: visibleDay?.day ? "auto" : "none",
        }}
      >
        <h2>{visibleDay?.day}</h2>
        <span>{visibleDay?.date && visibleDay.date}</span>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex flex-row-reverse overflow-x-auto relative"
      >
        <div className="bg-[#5b55ed] sticky -left-1 rounded-xl p-1 mt-10 shrink-0 z-50">
          {chartParameters.map((item, index) => {
            const unitKey = item.key as keyof UnitTypes | null;
            const value = unitKey ? units[unitKey] : null;
            const options = unitKey && value ? getOptions(unitKey, value) : [];

            const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
              const val = e.target.value;
              if (!unitKey) return;
              setUnits((prev) => ({
                ...prev,
                [unitKey]: val,
              }));
            };

            return (
              <div
                key={index}
                className={`flex flex-col items-start justify-start px-1 pb-0.5 pt-3 gap-0.5 ${
                  index === 1 ? "pb-14 pt-2" : ""
                }`}
              >
                <div className="flex items-center gap-0.5">
                  <span className="text-xs whitespace-nowrap text-white">
                    {item.name}
                  </span>

                  {unitKey && (
                    <div className="relative text-xs">
                      <select
                        className="appearance-none bg-transparent pr-5 pl-1 py-0.5 text-white rounded focus:outline-none"
                        value={value!}
                        onChange={handleChange}
                      >
                        {options.map((opt) => (
                          <option
                            className="bg-white text-center text-black"
                            key={opt}
                            value={opt}
                          >
                            {opt}
                          </option>
                        ))}
                      </select>

                      {/* Custom arrow */}
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-1">
                        <svg
                          className="w-3 h-3 text-white"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <div className="flex flex-col relative">
          <div className="absolute bottom-10 bg-white z-10">
            <CustomChart
              startDateTime={startTime}
              chartData={temperatures}
              color="#D3D3D3"
            />
          </div>
          <div className="flex flex-row-reverse overflow-x-scroll z-20 px-1">
            {data.map((day: any, index: number) => (
              <DaySection
                key={index}
                day={day}
                nextDay={data[index + 1]}
                previousDay={data[index - 1]}
                selectedCardId={selectedCardId}
                setSelectedCardId={setSelectedCardId}
                setVisibleDay={setVisibleDay}
                dayIndex={index}
                scrollContainerRef={scrollContainerRef}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AllInOneChart };
