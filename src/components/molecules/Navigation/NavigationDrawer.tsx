import { motion } from "framer-motion";
import { Button } from "../../atoms";
import { useEffect, useState } from "react";
import { Stations } from "../Stations/Stations";
import { Direction } from "../Direction/Direction";
import { useStationContext } from "../../../contexts/stationContext";

const NavigationDrawer = () => {
  const [navigationType, setNavigationType] = useState<
    "STATION" | "ROUTE" | null
  >(null);
  const [hideButtons, setHideButtons] = useState(false);
  const { selectedStationContext } = useStationContext();

  useEffect(() => {
    if (selectedStationContext) setNavigationType("STATION");
  }, [selectedStationContext]);
  return (
    <>
      <motion.div
        initial={{ y: 200 }}
        animate={{ y: 0 }}
        transition={{ bounce: 0.6, duration: 0.5, ease: "easeIn" }}
        className="bg-white rounded-t-[40px] shadow-[0_-4px_4px_0_rgba(0,0,0,0.25)] py-8 px-4 z-[4000] absolute bottom-0 w-full"
      >
        {!hideButtons && (
          <div className=" flex items-center justify-center gap-5 px-4">
            <Button
              onClick={() => setNavigationType("STATION")}
              variant={"default"}
              className="w-full text-xl py-6"
            >
              ایستگاه
            </Button>
            <Button
              onClick={() => setNavigationType("ROUTE")}
              variant={"default"}
              className="w-full text-white bg-[#A6A6A6] text-xl py-6"
            >
              مسیر
            </Button>
          </div>
        )}
        {navigationType === "STATION" && (
          <Stations setHideButtons={setHideButtons} />
        )}
        {navigationType === "ROUTE" && (
          <Direction setHideButtons={setHideButtons} />
        )}
      </motion.div>
    </>
  );
};

export { NavigationDrawer };
