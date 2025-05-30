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
      className={`bg-white py-0.5 h-full relative overflow-visible cursor-pointer transition-all ${
        isSelected ? "rounded-lg outline-2 outline-[#4b10c9] z-50" : "z-40"
      }`}
      onClick={onClick}
    >
      <div className="relative z-10">
        <h3 className="text-xs p-1 font-semibold  bg-none z-[3000]">
          {/* {hour < 10 ? `0${hour}` : hour}:00 */}
          {hour}:00
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
          className="p-1 pt-2.5 pb-2 text-xs text-center"
          style={{ background: waveGradient }}
        >
          {data.wave.hs}
        </p>
      </div>
    </div>
  );
}

export { WeatherCard };
