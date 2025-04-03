import { WeatherInfoCardPropTypes } from "./weatherInfo.types";

const WeatherInfoCard = ({ title, icon, data }: WeatherInfoCardPropTypes) => {
  return (
    <div className="rounded-lg w-full py-2 px-1 border border-[#EAEAEA] flex flex-col items-center justify-center">
      <span className="text-[9px]">{title}</span>
      <img alt="weather icons"   src={icon} />   <span className="text-[8px]">{data}</span>
    </div>
  );
};

export { WeatherInfoCard };
