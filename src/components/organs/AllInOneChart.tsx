/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClockIcon } from "lucide-react";
import { CustomChart, DaySection } from "../molecules";
import { useRef, useState } from "react";

const chartParameters = [
  {
    name: "زمان",
    icon: "",
  },
  {
    name: "T",
    icon: "(c)",
  },
  {
    name: "WS",
    icon: "(m/s)",
  },
  {
    name: "H",
    icon: "(m)",
  },
];

const AllInOneChart = ({
  data,
  startTime = "0:00",
}: {
  data: any;
  startTime?: string;
}) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const [selectedCardId, setSelectedCardId] = useState<string | null>(null);
  const [visibleDay, setVisibleDay] = useState<string | null>(null);

  const temperatures = data.flatMap((day: any) =>
    day.weather_info.map((info: any) => info.temperature.temperature)
  );
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div
        className="z-40 absolute -left-1 text-center text-gray-700 h-fit top-0 ltr bg-white font-bold mb-2.5 py-1 px-2 border-r border-gray-300"
        style={{
          minWidth: 80,
          opacity: visibleDay && visibleDay.length > 0 ? 1 : 0,
          transition: "opacity 0.4s",
          pointerEvents: visibleDay && visibleDay.length > 0 ? "auto" : "none", // optional: disables interaction when hidden
        }}
      >
        {visibleDay}
      </div>

      <div
        ref={scrollContainerRef}
        className="flex flex-row-reverse overflow-x-auto relative"
      >
        <div className="bg-[#5b55ed] sticky -left-1 rounded-xl p-1 mt-10 shrink-0 z-50">
          {chartParameters.map((item, index) => (
            <div
              key={index}
              className={`flex  items-center justify-start p-1 gap-0.5 ${
                index === 1 ? "pb-20 pt-2" : ""
              }`}
            >
              <div className="  z-10">
                {index === 0 ? (
                  <ClockIcon size={12} color="white" />
                ) : (
                  <span className="text-xs text-white">{item.icon}</span>
                )}
              </div>
              <span className="text-xs whitespace-nowrap text-white">
                {item.name}
              </span>
            </div>
          ))}
        </div>

        {/* This is the scrollable container */}
        <div className="flex flex-col  relative">
          <div className=" absolute bottom-6 bg-white z-30">
            <CustomChart
              startDateTime={startTime}
              chartData={temperatures || []}
            />
          </div>
          <div className="flex flex-row-reverse overflow-x-scroll z-20 px-1">
            {data.map((day: any, index: number) => (
              <DaySection
                key={index}
                day={day}
                nextDay={data[index + 1]}
                previousDay={data[index - 1]}
                isFirstDay={index === 0}
                selectedCardId={selectedCardId}
                setSelectedCardId={setSelectedCardId}
                setVisibleDay={setVisibleDay}
                dayIndex={index}
                scrollContainerRef={scrollContainerRef}
                startTime={
                  startTime.split(":")[0]
                    ? parseInt(startTime.split(":")[0])
                    : 0
                }
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export { AllInOneChart };
