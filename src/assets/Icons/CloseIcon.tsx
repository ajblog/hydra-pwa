import { SVGPropTypes } from "../../types";

const CloseIcon = ({ width, height }: SVGPropTypes) => {
  return (
    <svg
      width={width || "21"}
      height={height || "21"}
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <mask
        id="mask0_820_2275"
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="21"
        height="21"
      >
        <path d="M20.96 0H0V20.96H20.96V0Z" fill="white" />
      </mask>
      <g mask="url(#mask0_820_2275)">
        <path
          d="M20.4799 20.01C20.6199 20.14 20.6199 20.36 20.4799 20.49L20.2399 20.59L19.9999 20.49L10.3099 10.8L0.609902 20.49L0.369902 20.59L0.129902 20.49C-0.0100977 20.35 -0.0100977 20.14 0.129902 20.01L9.8199 10.32L0.129902 0.620001C-9.76473e-05 0.480001 -9.76473e-05 0.270001 0.129902 0.130001C0.269902 1.2219e-06 0.479902 1.2219e-06 0.609902 0.130001L10.2999 9.82L19.9999 0.130001C20.1399 1.2219e-06 20.3499 1.2219e-06 20.4799 0.130001C20.6199 0.270001 20.6199 0.480001 20.4799 0.620001L10.7899 10.31L20.4799 20V20.01Z"
          fill="white"
        />
      </g>
    </svg>
  );
};

export { CloseIcon };
