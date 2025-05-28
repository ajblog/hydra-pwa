/* eslint-disable @typescript-eslint/no-explicit-any */
import { ClockIcon } from "lucide-react";

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

const windSpeedToRGB = (speed: number): [number, number, number] => {
  if (speed < 2) return [255, 255, 255]; // white - very low wind
  if (speed < 5) return [173, 216, 230]; // light blue (skyblue)
  if (speed < 10) return [144, 238, 144]; // light green (lightgreen)
  if (speed < 15) return [255, 255, 102]; // yellow (light yellow)
  return [255, 99, 71]; // tomato red
};

const waveHeightToRGB = (height: number): [number, number, number] => {
  if (height < 0.5) return [255, 255, 255]; // white - calm sea
  if (height < 1.5) return [224, 255, 255]; // light cyan
  if (height < 2.5) return [64, 224, 208]; // turquoise
  if (height < 3.5) return [60, 179, 113]; // medium sea green
  return [255, 127, 80]; // coral
};

const rgbToCss = ([r, g, b]: [number, number, number]) =>
  `rgb(${r}, ${g}, ${b})`;

function WeatherCard({
  hour,
  data,
  nextData,
  isSelected,
  onClick,
}: {
  hour: number;
  data: any;
  nextData?: any;
  isSelected?: boolean;
  onClick?: () => void;
}) {
  console.log(nextData, "nextData in hour", hour);
  const currentWindColor = rgbToCss(windSpeedToRGB(data.wind.wind_speed));
  const nextWindColor = nextData
    ? rgbToCss(windSpeedToRGB(nextData.wind.wind_speed))
    : currentWindColor;
  const windGradient = `linear-gradient(to right, ${currentWindColor}, ${nextWindColor})`;

  const currentWaveColor = rgbToCss(waveHeightToRGB(data.wave.hs));
  const nextWaveColor = nextData
    ? rgbToCss(waveHeightToRGB(nextData.wave.hs))
    : currentWaveColor;
  const waveGradient = `linear-gradient(to right, ${currentWaveColor}, ${nextWaveColor})`;

  return (
    <div
      className={`bg-white pt-2 h-full relative overflow-hidden cursor-pointer transition-all ${
        isSelected ? "outline-2 outline-blue-500 z-50 rounded-lg" : ""
      }`}
      onClick={onClick}
    >
      <div className="relative z-10">
        <h3 className="text-xs p-1 font-semibold pb-16 bg-white">{hour}:00</h3>
        <p className="p-1 pt-1.5 text-center bg-white">
          {data.temperature.temperature}
        </p>
        <p
          className="p-1 pt-2 pb-2 text-xs text-center"
          style={{ background: windGradient }}
        >
          {data.wind.wind_speed}
        </p>
        <p
          className="p-1 pt-2.5 pb-2 text-xs text-center"
          style={{ background: waveGradient }}
        >
          {data.wave.hs}
        </p>
      </div>
    </div>
  );
}

import { useState } from "react";
import { CustomChart } from "../molecules";

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
    <div className="flex flex-col items-start justify-start ltr">
      <h2 className="font-bold text-center sticky mb-4 z-50">{day.day_name}</h2>
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

const AllInOneChart = ({
  data,
  startTime = "0:00",
}: {
  data: any;
  startTime?: string;
}) => {
  console.log("AllInOneChart data:", data);
  const temperatures = data.flatMap((day: any) =>
    day.weather_info.map((info: any) => info.temperature.temperature)
  );
  return (
    <div className="relative">
      <div className="flex flex-row-reverse overflow-x-auto relative">
        <div className="bg-gray-200 py-2 px-3 mt-10 shrink-0">
          {chartParameters.map((item, index) => (
            <div
              key={index}
              className={`flex items-center justify-start p-1 gap-2 ${
                index === 0 ? "pb-16" : ""
              }`}
            >
              <div className="sticky left-0 bg-gray-200 z-10">
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
          <div className="  bg-white z-10">
            <CustomChart
              startDateTime={startTime}
              chartData={temperatures || []}
            />
          </div>
          <div className="flex flex-row-reverse overflow-x-scroll">
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
