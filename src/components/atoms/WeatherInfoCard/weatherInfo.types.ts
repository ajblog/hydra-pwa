import React from "react";

interface WeatherInfoCardPropTypes {
  icon: string;
  title: string;
  data: string;
  isSelected: boolean;
  setSelectedDay: React.Dispatch<React.SetStateAction<string | null>>;
}

export type { WeatherInfoCardPropTypes };
