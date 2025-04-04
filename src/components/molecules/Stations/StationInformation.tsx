import { ChevronLeft } from "lucide-react";
import { StationInformationPropTypes } from "./station.type";
import { Tab, WeatherInfoCard } from "../../atoms";
import { useState } from "react";
import wave from "../../../assets/images/wave-icon.png";
import temp from "../../../assets/images/temp-Icon.png";
import wind from "../../../assets/images/Wind-Icon.png";
import { CustomChart } from "../CustomChart/CustomChart";

const StationInformation = ({
  selectedStation,
  setStep,
}: StationInformationPropTypes) => {
  const [isSelected, setIsSelected] = useState("موج");
  const [selectedDay, setSelectedDay] = useState("شنبه");
  const weekData = [
    {
      title: "شنبه",
      icon: isSelected === "موج" ? wave : isSelected === "باد" ? wind : temp,
      data: "12 (m/s)",
    },
    {
      title: "یکشنبه",
      icon: isSelected === "موج" ? wave : isSelected === "باد" ? wind : temp,
      data: "12 (m/s)",
    },
    {
      title: "دوشنبه",
      icon: isSelected === "موج" ? wave : isSelected === "باد" ? wind : temp,
      data: "12 (m/s)",
    },
    {
      title: "سه شنبه",
      icon: isSelected === "موج" ? wave : isSelected === "باد" ? wind : temp,
      data: "12 (m/s)",
    },
    {
      title: "چهارشنبه",
      icon: isSelected === "موج" ? wave : isSelected === "باد" ? wind : temp,
      data: "12 (m/s)",
    },
    {
      title: "پنج شنبه",
      icon: isSelected === "موج" ? wave : isSelected === "باد" ? wind : temp,
      data: "12 (m/s)",
    },
    {
      title: "جمعه",
      icon: isSelected === "موج" ? wave : isSelected === "باد" ? wind : temp,
      data: "12 (m/s)",
    },
  ];
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between border-b-[4px] border-b-[#EAEAEA] pb-5">
        <span className="font-bold text-xl text-[#5B55ED]">
          ایستگاه {selectedStation}
        </span>
        <ChevronLeft onClick={() => setStep("selection")} color="#A6A6A6" />
      </div>
      <div className="flex items-center px-5 gap-9 mt-3.5">
        {["موج", "باد", "دما"].map((item, index) => (
          <Tab
            setIsSelected={setIsSelected}
            isSelected={isSelected === item}
            key={index}
            title={item}
          />
        ))}
      </div>
      <div className="flex items-center gap-1 w-full mt-7">
        {weekData.map((item, index) => (
          <WeatherInfoCard
            key={index}
            data={item.data}
            title={item.title}
            icon={item.icon}
            isSelected={selectedDay === item.title}
            setSelectedDay={setSelectedDay}
          />
        ))}
      </div>
      <div>
        <CustomChart />
      </div>
    </div>
  );
};

export { StationInformation };
