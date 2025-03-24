import { SVGPropTypes } from "../../types";

export function UsernameIcon({ width, height }: SVGPropTypes) {
  return (
    <svg
      width={width || "30"}
      height={height || "32"}
      viewBox="0 0 30 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_820_1037)">
        <path
          d="M15.15 7.87C11.8 7.87 9.08997 10.72 9.08997 14.23C9.08997 17.74 11.8 20.59 15.15 20.59C18.5 20.59 21.21 17.74 21.21 14.23C21.21 10.72 18.5 7.87 15.15 7.87Z"
          fill="#DBDBDB"
        />
        <mask
          id="mask0_820_1037"
          maskUnits="userSpaceOnUse"
          x="0"
          y="0"
          width="30"
          height="32"
        >
          <path d="M29.95 0H0V31.95H29.95V0Z" fill="white" />
        </mask>
        <g mask="url(#mask0_820_1037)">
          <path
            d="M25.21 26.9C23.87 23.62 21.05 21.58 15.14 21.58C9.23 21.58 6.42 23.62 5.07 26.89C2.34 24.12 0.64 20.23 0.64 15.92C0.64 7.5 7.14 0.67 15.15 0.67C23.16 0.67 29.66 7.5 29.66 15.91C29.66 20.23 27.96 24.12 25.21 26.89V26.9ZM15.15 0C6.79 0 0 7.13 0 15.92C0 20.52 1.86 24.66 4.82 27.57C7.53 30.22 11.16 31.84 15.15 31.84C19.14 31.84 22.76 30.23 25.46 27.58C28.43 24.67 30.29 20.53 30.29 15.92C30.3 7.13 23.52 0 15.15 0Z"
            fill="#DBDBDB"
          />
        </g>
      </g>
      <defs>
        <clipPath id="clip0_820_1037">
          <rect width="29.95" height="31.95" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}
