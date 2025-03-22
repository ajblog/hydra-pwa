import React from "react";
import { HeaderPropTypes } from "./Header.type";
import { LogoIcon } from "../../../assets";

export function Header({ isLoggedIn }: HeaderPropTypes) {
  if (!isLoggedIn)
    return (
      <div className="relative">
        <div>
          <LogoIcon />
        </div>
      </div>
    );
  return <></>;
}
