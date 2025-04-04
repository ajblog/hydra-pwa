import React, { SetStateAction } from "react";

interface StationInformationPropTypes {
  selectedStation: string;
  setStep: React.Dispatch<SetStateAction<"selection" | "information">>;
}

interface StationsPropTypes {
  setHideButtons: React.Dispatch<SetStateAction<boolean>>;
}

export type { StationInformationPropTypes, StationsPropTypes };
