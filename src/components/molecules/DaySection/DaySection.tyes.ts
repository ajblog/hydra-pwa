/* eslint-disable @typescript-eslint/no-explicit-any */
import { SetStateAction } from "react";

export type DaySectionPropTypes = {
  day: any;
  isFirstDay: boolean;
  startTime: number;
  selectedCardId: string | null;
  setSelectedCardId: (id: string) => void;
  dayIndex: number;
  setVisibleDay: React.Dispatch<SetStateAction<string | null>>;
  scrollContainerRef: React.RefObject<HTMLDivElement | null>;
  previousDay?: any;
  nextDay?: any;
};
