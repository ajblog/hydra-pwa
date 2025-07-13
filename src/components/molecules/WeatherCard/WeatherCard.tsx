import {
  directionToDegrees,
  waveHeightColors,
  windSpeedColors,
} from "../../../constants";
import { useStationUnits } from "../../../services";
import { WaveUnitEnum, WindUnitEnum } from "../../../types";
import { ArrowIcon } from "../../../assets";

/* eslint-disable @typescript-eslint/no-explicit-any */
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
  const { windUnit, waveUnit } = useStationUnits("waveUnit", "windUnit");

  const windSpeedToRGB = (
    speed: number,
    type: WindUnitEnum
  ): [number, number, number] => {
    const thresholds = windSpeedColors[type];
    const match = thresholds.find((t) => speed <= t.max);
    return match?.rgb ?? [255, 255, 255];
  };

  const waveHeightToRGB = (
    height: number,
    unit: WaveUnitEnum
  ): [number, number, number] => {
    const thresholds = waveHeightColors[unit];
    const level = thresholds.find((l) => height <= l.max);
    return level?.rgb ?? [255, 255, 255];
  };

  const rgbToCss = ([r, g, b]: [number, number, number]) =>
    `rgb(${r}, ${g}, ${b})`;
  const currentWindColor = rgbToCss(
    windSpeedToRGB(data.wind.wind_speed, windUnit)
  );
  const nextWindColor = nextData
    ? rgbToCss(windSpeedToRGB(nextData.wind.wind_speed, windUnit))
    : currentWindColor;
  const windGradient = `linear-gradient(to right, ${currentWindColor}, ${nextWindColor})`;

  const currentWaveColor = rgbToCss(waveHeightToRGB(data.wave.hs, waveUnit));
  const nextWaveColor = nextData
    ? rgbToCss(waveHeightToRGB(nextData.wave.hs, waveUnit))
    : currentWaveColor;
  const waveGradient = `linear-gradient(to right, ${currentWaveColor}, ${nextWaveColor})`;

  function WindArrow({ direction }: { direction: string }) {
    const baseDegree = directionToDegrees[direction];
    const rotation = (baseDegree + 180) % 360;
    if (!rotation)
      return (
        <div className="text-purple-300 w-4 h-4 text-center" text-center>
          -
        </div>
      );
    else
      return (
        <div className=" transform" style={{ rotate: `${rotation}deg` }}>
          <ArrowIcon className="text-purple-300 w-4 h-4" />
        </div>
      );
  }

  return (
    <div
      className={`bg-white py-0.5 h-full relative overflow-visible cursor-pointer transition-all ${
        isSelected ? "rounded-lg outline-2 outline-[#4b10c9] z-50" : "z-40"
      }`}
      onClick={onClick}
    >
      <div className="relative z-10">
        <h3 className="text-xs p-1 font-semibold  bg-none z-[3000]">
          {hour < 10 ? `0${hour}` : hour}
        </h3>
        <p className="p-1 pt-2.5 text-center pb-20 bg-none">
          {data.temperature.temperature}
        </p>
        <p
          className="p-1 pt-2 pb-2 text-xs text-center"
          style={{ background: windGradient }}
        >
          {data.wind.wind_speed}
        </p>
        <p
          className="p-1 pt-2.5 pb-2 text-[10px] text-center"
          style={{ background: waveGradient }}
        >
          {data.wave.hs}
        </p>
        <p className="p-1 pt-3 pb-2 flex items-center justify-center bg-gray-100">
          <WindArrow direction={data.wind.wind_direction} />
        </p>
      </div>
    </div>
  );
}

export { WeatherCard };
