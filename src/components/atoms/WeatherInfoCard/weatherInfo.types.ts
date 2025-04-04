import React, { SetStateAction } from "react";

interface WeatherInfoCardPropTypes {
  icon: string;
  title: string;
  data: string;
  isSelected: boolean;
  setSelectedDay: React.Dispatch<SetStateAction<string>>;
}

export type { WeatherInfoCardPropTypes };
