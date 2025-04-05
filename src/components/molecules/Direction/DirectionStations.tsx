import React, { useState } from "react";

const DirectionStations = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(2); // default active one

  const data = [
    { name: "بوشهر" },
    { name: "شیراز" },
    { name: "تهران" },
    { name: "مشهد" },
  ];

  return (
    <div className="flex flex-col items-center w-full my-7">
      {/* Top Labels */}
      <div className="flex w-full justify-between mb-2 px-1">
        {data.map((_, index) => (
          <div
            key={`top-label-${index}`}
            className={`flex-1 text-[#FFA314] font-bold ${
              index === data.length - 1 && "text-end"
            }`}
          >
            {index === 0 && <span className="text-xs">مبدا</span>}
            {index === data.length - 1 && <span className="text-xs">مقصد</span>}
          </div>
        ))}
      </div>

      {/* Dots + Dashes */}
      <div className="flex items-center w-full justify-between">
        {data.map((station, index) => (
          <React.Fragment key={`dot-${index}`}>
            {/* Dot + Label below */}
            <div
              className="flex flex-col items-center cursor-pointer"
              onClick={() => setActiveIndex(index)}
            >
              <div className="w-5 h-5 border border-black rounded-full flex items-center justify-center">
                <div
                  className={`w-3 h-3 rounded-full ${
                    activeIndex === index ? "bg-[#EDB232]" : "bg-[#522FD9]"
                  }`}
                />
              </div>
              <div className="mt-2 text-[12px] text-gray-700 text-center w-max">
                {station.name}
              </div>
            </div>

            {/* Dashes (only between dots) */}
            {index < data.length - 1 && (
              <div className="flex-1 flex gap-[3px] -translate-y-3 justify-between px-2">
                {Array.from({ length: 8 }).map((_, dashIndex) => (
                  <div
                    key={`dash-${index}-${dashIndex}`}
                    className="w-[2px] h-0.5 bg-gray-400"
                  />
                ))}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export { DirectionStations };
