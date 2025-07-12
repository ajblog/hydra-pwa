import { useEffect, useState } from "react";
import { TimeUnitEnum, WaveUnitEnum, WindUnitEnum } from "../../types";

type StationUnitPreferences = {
  timeUnit: TimeUnitEnum;
  waveUnit: WaveUnitEnum;
  windUnit: WindUnitEnum;
};

type UnitKey = keyof StationUnitPreferences;

export const useStationUnits = <T extends UnitKey[]>(
  ...keys: T
): Pick<StationUnitPreferences, T[number]> => {
  const [units, setUnits] = useState<Partial<StationUnitPreferences>>(() => {
    const stored = localStorage.getItem("station_unit_preferences");
    if (!stored) return {};
    const parsed = JSON.parse(stored);
    return keys.reduce((acc, key) => {
      acc[key] = parsed[key];
      return acc;
    }, {} as Partial<StationUnitPreferences>);
  });

  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem("station_unit_preferences");
      if (!stored) return;
      const parsed = JSON.parse(stored);
      const updated = keys.reduce((acc, key) => {
        acc[key] = parsed[key];
        return acc;
      }, {} as Partial<StationUnitPreferences>);
      setUnits(updated);
    };

    const interval = setInterval(handler, 500);
    return () => clearInterval(interval);
  }, [keys]);

  return units as Pick<StationUnitPreferences, T[number]>;
};
