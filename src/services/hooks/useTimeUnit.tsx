import { useEffect, useState } from "react";
import { TimeUnitEnum } from "../../types";

export const useTimeUnit = () => {
  const [timeUnit, setTimeUnit] = useState<TimeUnitEnum>(() => {
    const stored = localStorage.getItem("station_unit_preferences");
    return stored ? JSON.parse(stored).timeUnit : TimeUnitEnum.UTC;
  });

  useEffect(() => {
    const handler = () => {
      const stored = localStorage.getItem("station_unit_preferences");
      if (!stored) return;
      const newTimeUnit = JSON.parse(stored).timeUnit;
      setTimeUnit(newTimeUnit);
    };

    // Listen for changes in the same tab
    const interval = setInterval(handler, 500); // polling every 500ms
    return () => clearInterval(interval);
  }, []);

  return timeUnit;
};
