import React, { SetStateAction } from "react";
import { TimeUnitEnum, WaveUnitEnum, WindUnitEnum } from "../../../types";

interface StationInformationPropTypes {
  selectedStation: string;
  setStep: React.Dispatch<SetStateAction<"selection" | "information">>;
}

interface StationsPropTypes {
  setHideButtons: React.Dispatch<SetStateAction<boolean>>;
}

interface UnitTypes {
  waveUnit: WaveUnitEnum;
  timeUnit: TimeUnitEnum;
  windUnit: WindUnitEnum;
}

export type { StationInformationPropTypes, StationsPropTypes, UnitTypes };
