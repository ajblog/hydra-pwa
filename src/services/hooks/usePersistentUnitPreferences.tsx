import { useEffect, useState } from "react";
import { UnitTypes } from "../../components/molecules/Stations/station.type";
import { TimeUnitEnum, WaveUnitEnum, WindUnitEnum } from "../../types";

const LOCAL_STORAGE_KEY = "station_unit_preferences";

const defaultUnits: UnitTypes = {
  timeUnit: TimeUnitEnum.IRST,
  waveUnit: WaveUnitEnum.M,
  windUnit: WindUnitEnum.METERPERSECOND,
};

export const usePersistentUnitPreferences = (): [
  UnitTypes,
  React.Dispatch<React.SetStateAction<UnitTypes>>
] => {
  const [units, setUnits] = useState<UnitTypes>(() => {
    if (typeof window === "undefined") return defaultUnits;
    try {
      const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          timeUnit: parsed.timeUnit ?? defaultUnits.timeUnit,
          waveUnit: parsed.waveUnit ?? defaultUnits.waveUnit,
          windUnit: parsed.windUnit ?? defaultUnits.windUnit,
        };
      }
    } catch (e) {
      console.warn("Failed to load unit preferences from localStorage", e);
    }
    return defaultUnits;
  });

  useEffect(() => {
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(units));
    } catch (e) {
      console.warn("Failed to save unit preferences to localStorage", e);
    }
  }, [units]);

  return [units, setUnits];
};
