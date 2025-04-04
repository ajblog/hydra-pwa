import React, { SetStateAction } from "react";

const Tab = ({
  title,
  isSelected,
  setIsSelected,
}: {
  title: string;
  isSelected: boolean;
  setIsSelected: React.Dispatch<SetStateAction<string>>;
}) => {
  return (
    <div
      onClick={() => setIsSelected(title)}
      className={`text-white py-2.5 w-20 text-center rounded-full ${isSelected ? "bg-[#5B55ED]" : "bg-[#A6A6A6]"}`}
    >
      {title}
    </div>
  );
};

export { Tab };
