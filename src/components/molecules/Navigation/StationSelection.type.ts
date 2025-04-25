import { SetStateAction } from "react";

export interface StationSelectionPropTypes {
  selectedStation: string;
  title: string;
  selectedDirectionStation: string;
  stationType: "origin" | "destination" | null;
  setSelectedStation: React.Dispatch<SetStateAction<string>>;
  setStationType: React.Dispatch<
    SetStateAction<"origin" | "destination" | null>
  >;
}
