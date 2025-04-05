import { createContext, useContext, useState, ReactNode, JSX } from "react";

// Define the type for the context value
interface StationContextType {
  selectedStationContext: string;
  setSelectedStationContext: (station: string) => void;
}

// Create a context with a default value
const StationContext = createContext<StationContextType | undefined>(undefined);

// Create a provider component
export const StationProvider = ({
  children,
}: {
  children: ReactNode;
}): JSX.Element => {
  const [selectedStationContext, setSelectedStationContext] =
    useState<string>("");

  return (
    <StationContext.Provider
      value={{ selectedStationContext, setSelectedStationContext }}
    >
      {children} {/* Render the children here */}
    </StationContext.Provider>
  );
};

// Custom hook to use the context
export const useStationContext = (): StationContextType => {
  const context = useContext(StationContext);
  if (!context) {
    throw new Error("useStationContext must be used within a StationProvider");
  }
  return context;
};
