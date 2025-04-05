import { useEffect, useState } from "react";
import { RadioGroup, RadioGroupItem } from "../../atoms";
import { StationInformation } from "./StationInformation";
import { StationsPropTypes } from "./station.type";
import { useStationContext } from "../../../contexts/stationContext";

const stationsInfo = [
  { name: "بوشهر" },
  { name: "دلوار" },
  { name: "بوالخیر" },
  { name: "متاف" },
  { name: "دیر" },
  { name: "عسلویه " },
  { name: "لاوان " },
  { name: "کیش" },
];

const Stations = ({ setHideButtons }: StationsPropTypes) => {
  const [step, setStep] = useState<"selection" | "information">("selection");
  const { selectedStationContext, setSelectedStationContext } =
    useStationContext();

  useEffect(() => {
    if (selectedStationContext) {
      setStep("information");
    }
  }, [selectedStationContext]);

  if (step === "information") {
    setHideButtons(true);
    return (
      <StationInformation
        selectedStation={selectedStationContext}
        setStep={setStep}
      />
    );
  } else {
    setHideButtons(false);
  }

  return (
    <div className="mt-3">
      <span className="text-sm text-[#FFA314] font-bold">
        ایستگاه موردنظر خود را از لیست زیر انتخاب کنید.
      </span>
      <RadioGroup
        defaultValue={selectedStationContext}
        className="grid grid-cols-2 gap-0 mt-4"
      >
        {stationsInfo.map((item, index) => (
          <div
            key={index}
            className={`flex items-center space-x-2 py-4 px-3 border-b-[4px] border-b-[#EAEAEA] ${index % 2 ? "" : "pl-0"} `}
          >
            <RadioGroupItem
              onClick={(e) => {
                setSelectedStationContext(e.currentTarget.value);
                setStep("information");
              }}
              value={item.name}
              id={index.toString()}
            />
            <label
              className={`w-full text-sm py-1 ${index % 2 ? "" : "border-l-[4px] border-l-[#EAEAEA]"}`}
              htmlFor={index.toString()}
            >
              ایستگاه {item.name}
            </label>
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export { Stations };
