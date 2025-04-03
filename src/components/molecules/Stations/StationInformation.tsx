import { ChevronLeft } from "lucide-react";
import { StationInformationPropTypes } from "./station.type";

const StationInformation = ({
  selectedStation,
  setStep
}: StationInformationPropTypes) => {
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between border-b-[4px] border-b-[#EAEAEA] pb-5">
        <span className="font-bold text-xl text-[#5B55ED]">
          {selectedStation}
        </span>
        <ChevronLeft onClick={() => setStep('selection')} color="#A6A6A6" />
      </div>
    </div>
  );
};

export { StationInformation };
