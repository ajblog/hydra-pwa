/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClockIcon } from "lucide-react";
import { CustomChart, DaySection } from "../molecules";

const chartParameters = [
  {
    name: "ساعت",
    icon: "",
  },
  {
    name: "دما",
    icon: "°C",
  },
  {
    name: "سرعت باد",
    icon: "m/s",
  },
  {
    name: "ارتفاع موج",
    icon: "m",
  },
];

const AllInOneChart = ({
  data,
  startTime = "0:00",
}: {
  data: any;
  startTime?: string;
}) => {
  const temperatures = data.flatMap((day: any) =>
    day.weather_info.map((info: any) => info.temperature.temperature)
  );
  return (
    <div className="relative w-full h-full overflow-hidden">
      <div className="flex flex-row-reverse overflow-x-auto relative">
        <div className="bg-gray-200 sticky -left-1.5 rounded-xl py-2 px-3 mt-10 shrink-0 z-50">
          {chartParameters.map((item, index) => (
            <div
              key={index}
              className={`flex  items-center justify-start p-1 gap-2 ${
                index === 1 ? "pb-40 pt-2" : ""
              }`}
            >
              <div className=" bg-gray-200 z-10">
                {index === 0 ? (
                  <ClockIcon size={12} />
                ) : (
                  <span className="text-xs">{item.icon}</span>
                )}
              </div>
              <span className="text-xs whitespace-nowrap">{item.name}</span>
            </div>
          ))}
        </div>

        {/* This is the scrollable container */}
        <div className="flex flex-col  relative">
          <div className=" absolute bottom-20 bg-white z-40">
            <CustomChart
              startDateTime={startTime}
              chartData={temperatures || []}
            />
          </div>
          <div className="flex flex-row-reverse overflow-x-scroll z-30">
            {data.map((day: any, index: number) => (
              <DaySection
                key={index}
                day={day}
                nextDay={data[index + 1]}
                isFirstDay={index === 0}
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
