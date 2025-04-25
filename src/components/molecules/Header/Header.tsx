import { HeaderPropTypes } from "./Header.type";
import { LogoIcon } from "../../../assets";
import { ChevronLeft } from "lucide-react";

export function Header({
  isLoggedIn,
  showBackButton,
  onBackButton,
}: HeaderPropTypes) {
  if (!isLoggedIn)
    return (
      <div className="relative z-50 flex items-start justify-between px-8">
        <div>
          <LogoIcon />
        </div>
        <div
          onClick={() => {
            onBackButton?.();
          }}
          className={`z-[100] ${!showBackButton ? "hidden" : "block"} pointer-events-auto`}
        >
          <ChevronLeft size={"24px"} color="#fff" />
        </div>
      </div>
    );
  return <></>;
}
