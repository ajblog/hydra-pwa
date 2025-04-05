import { ChevronDownCircle } from "lucide-react";
import { MouseEventHandler } from "react";

const SelectLocationBox = ({
  title,
  onClick,
  selected,
}: {
  title: string;
  onClick: MouseEventHandler<HTMLDivElement>;
  selected?: boolean;
}) => {
  return (
    <div
      onClick={onClick}
      className={` py-3 px-5 flex items-center justify-between rounded-2xl ${selected ? "bg-[#5B55ED] text-white" : "bg-[#EFF0F0]"}`}
    >
      <span className={`text-lg w-full ${selected && "text-center"}`}>
        {title}
      </span>
      <ChevronDownCircle />
    </div>
  );
};

export { SelectLocationBox };
