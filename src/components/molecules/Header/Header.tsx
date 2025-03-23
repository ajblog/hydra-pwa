import { HeaderPropTypes } from "./Header.type";
import { LogoIcon } from "../../../assets";
import { ChevronLeft } from "lucide-react";

export function Header({ isLoggedIn }: HeaderPropTypes) {
  if (!isLoggedIn)
    return (
      <div className="relative flex items-start justify-between px-8">
        <div>
          <LogoIcon />
        </div>
        <div className="cu">
          <ChevronLeft size={"24px"} color="#fff" />
        </div>
      </div>
    );
  return <></>;
}
