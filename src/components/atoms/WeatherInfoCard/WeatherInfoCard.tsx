import { WeatherInfoCardPropTypes } from "./weatherInfo.types";

const WeatherInfoCard = ({
  title,
  icon,
  data,
  isSelected,
  setSelectedDay,
}: WeatherInfoCardPropTypes) => {
  return (
    <div
      onClick={() => setSelectedDay(title)}
      className={`rounded-lg w-full py-2 px-1 border border-[#EAEAEA] flex flex-col gap-0.5 items-center justify-center ${isSelected ? "bg-[#EDB232]" : "bg-[#FAFAFA]"}`}
    >
      <span className="text-[9px] text-nowrap">{title}</span>
      <img alt="weather icons" src={icon} className="w-[30px] h-[30px]" />{" "}
      <span className="text-[8px] text-nowrap">{data}</span>
    </div>
  );
};

export { WeatherInfoCard };
