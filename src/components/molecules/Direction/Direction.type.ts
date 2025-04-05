import React, { SetStateAction } from "react";

export interface DirectionOverviewPropTypes {
  setStationType: React.Dispatch<
    SetStateAction<"origin" | "destination" | null>
  >;
  setDestinationStation: React.Dispatch<SetStateAction<string>>;
  setOriginStation: React.Dispatch<SetStateAction<string>>;
  originStation: string;
  destinationStation: string;
  setDirectionStep: React.Dispatch<SetStateAction<"selection" | "overview">>;
}

export interface DirectionStationsPropTypes {
  originStation: string;
  destinationStation: string;
}
